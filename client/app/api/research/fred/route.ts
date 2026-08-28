import { NextRequest, NextResponse } from "next/server";

import {
  getFredObservations,
  searchFredSeries,
  type FredObservation,
  type FredSeries,
} from "@/lib/research/fred";

import {
  buildFredResearchPlan,
  type VentureResearchInput,
} from "@/lib/research/fred-plan";

function getNumericObservations(
  observations: FredObservation[]
): FredObservation[] {
  return observations.filter((observation) => {
    if (observation.value === ".") {
      return false;
    }

    return Number.isFinite(Number(observation.value));
  });
}

function calculateChange(observations: FredObservation[]) {
  const valid = getNumericObservations(observations);

  if (valid.length < 2) {
    return null;
  }

  const latest = Number(valid[0].value);
  const previous = Number(valid[1].value);

  if (previous === 0) {
    return null;
  }

  return {
    latest: {
      date: valid[0].date,
      value: latest,
    },
    previous: {
      date: valid[1].date,
      value: previous,
    },
    changePercent: Number(
      (((latest - previous) / Math.abs(previous)) * 100).toFixed(2)
    ),
  };
}

async function analyzeSeries(series: FredSeries) {
  const observations = await getFredObservations(series.id, {
    limit: 24,
    sortOrder: "desc",
  });

  return {
    series: {
      id: series.id,
      title: series.title,
      frequency: series.frequency,
      units: series.units,
      seasonalAdjustment: series.seasonal_adjustment,
      lastUpdated: series.last_updated,
      popularity: series.popularity,
    },

    change: calculateChange(observations),

    recentObservations: getNumericObservations(observations)
      .slice(0, 6)
      .map((observation) => ({
        date: observation.date,
        value: Number(observation.value),
      })),
  };
}

export async function GET() {
  return NextResponse.json({
    success: true,
    provider: "FRED",
    message: "ORB8 FRED research provider is available.",
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as VentureResearchInput;

    if (!body.product?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "product is required",
        },
        {
          status: 400,
        }
      );
    }

    const researchPlan = buildFredResearchPlan(body);

    const researchResults = await Promise.all(
      researchPlan.map(async (researchQuestion) => {
        const candidates = await searchFredSeries(
          researchQuestion.searchQuery,
          5
        );

        const bestCandidate = candidates[0];

        if (!bestCandidate) {
          return {
            ...researchQuestion,
            match: null,
            alternatives: [],
          };
        }

        const match = await analyzeSeries(bestCandidate);

        return {
          ...researchQuestion,
          match,
          alternatives: candidates.slice(1).map((series) => ({
            id: series.id,
            title: series.title,
            frequency: series.frequency,
            units: series.units,
            popularity: series.popularity,
          })),
        };
      })
    );

    return NextResponse.json({
      success: true,
      venture: {
        product: body.product,
        audience: body.audience ?? null,
        industry: body.industry ?? null,
        geography: body.geography ?? "United States",
        tractionProblem: body.tractionProblem ?? null,
      },
      provider: "FRED",
      researchPlan,
      results: researchResults,
    });
  } catch (error) {
    console.error("ORB8 FRED research failed:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown FRED research error",
      },
      {
        status: 500,
      }
    );
  }
}