import type { VentureResearchInput } from "@/lib/research/fred-plan";

export type TrendQueryType =
  | "problem"
  | "category"
  | "solution"
  | "brand";

export interface TrendResearchQuery {
  term: string;
  type: TrendQueryType;
  reason: string;
}

export interface TrendResearchPlan {
  geography: string;
  timeframe: string;
  queries: TrendResearchQuery[];
}

export function buildTrendResearchPlan(
  input: VentureResearchInput
): TrendResearchPlan {
  const context = [
    input.product,
    input.audience,
    input.industry,
    input.tractionProblem,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const geography = input.geography?.trim() || "US";

  if (
    context.includes("meditation") ||
    context.includes("mindfulness") ||
    context.includes("stress") ||
    context.includes("anxiety") ||
    context.includes("wellness")
  ) {
    return {
      geography,
      timeframe: "12m",
      queries: [
        {
          term: "meditation",
          type: "category",
          reason:
            "Measures broad interest in the meditation category.",
        },
        {
          term: "mindfulness",
          type: "category",
          reason:
            "Measures demand for an adjacent category commonly associated with meditation.",
        },
        {
          term: "meditation app",
          type: "solution",
          reason:
            "Measures explicit demand for app-based meditation solutions.",
        },
        {
          term: "guided meditation",
          type: "solution",
          reason:
            "Measures demand for guided meditation as a solution format.",
        },
        {
          term: "learn meditation",
          type: "solution",
          reason:
            "Measures intent to learn meditation rather than simply consume meditation content.",
        },
        {
          term: "how to stop overthinking",
          type: "problem",
          reason:
            "Measures demand around a common problem meditation may address.",
        },
        {
          term: "racing thoughts",
          type: "problem",
          reason:
            "Measures demand around intrusive or persistent thought patterns.",
        },
        {
          term: "work stress",
          type: "problem",
          reason:
            "Measures demand around a common situational use case for meditation.",
        },
        {
          term: "how to focus better",
          type: "problem",
          reason:
            "Measures demand around attention and concentration problems.",
        },
        {
          term: input.product.trim(),
          type: "brand",
          reason:
            "Measures whether meaningful branded search demand already exists.",
        },
      ],
    };
  }

  const product = input.product.trim();
  const audience = input.audience?.trim();
  const industry = input.industry?.trim();

  return {
    geography,
    timeframe: "12m",
    queries: [
      {
        term: product,
        type: "brand",
        reason:
          "Measures branded search demand for the venture or product.",
      },
      ...(industry
        ? [
            {
              term: industry,
              type: "category" as const,
              reason:
                "Measures broad demand for the industry or product category.",
            },
          ]
        : []),
      ...(audience
        ? [
            {
              term: audience,
              type: "category" as const,
              reason:
                "Provides audience-related search context.",
            },
          ]
        : []),
    ],
  };
}