const FRED_BASE_URL = "https://api.stlouisfed.org/fred";

function getFredApiKey() {
  const apiKey = process.env.FRED_API_KEY;

  if (!apiKey) {
    throw new Error("FRED_API_KEY is not configured.");
  }

  return apiKey;
}

async function fredFetch<T>(
  endpoint: string,
  params: Record<string, string>
): Promise<T> {
  const url = new URL(`${FRED_BASE_URL}/${endpoint}`);

  url.searchParams.set("api_key", getFredApiKey());
  url.searchParams.set("file_type", "json");

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url, {
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error(
      `FRED request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json() as Promise<T>;
}

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

export interface FredSeries {
  id: string;
  realtime_start: string;
  realtime_end: string;
  title: string;
  observation_start: string;
  observation_end: string;
  frequency: string;
  frequency_short: string;
  units: string;
  units_short: string;
  seasonal_adjustment: string;
  seasonal_adjustment_short: string;
  last_updated: string;
  popularity: number;
  notes?: string;
}

export interface FredObservation {
  realtime_start: string;
  realtime_end: string;
  date: string;
  value: string;
}

interface FredSeriesSearchResponse {
  count: number;
  offset: number;
  limit: number;
  seriess: FredSeries[];
}

interface FredSeriesResponse {
  seriess: FredSeries[];
}

interface FredObservationsResponse {
  realtime_start: string;
  realtime_end: string;
  observation_start: string;
  observation_end: string;
  units: string;
  output_type: number;
  file_type: string;
  order_by: string;
  sort_order: string;
  count: number;
  offset: number;
  limit: number;
  observations: FredObservation[];
}

/*
|--------------------------------------------------------------------------
| Search FRED
|--------------------------------------------------------------------------
*/

export async function searchFredSeries(
  query: string,
  limit = 10
): Promise<FredSeries[]> {
  const data = await fredFetch<FredSeriesSearchResponse>("series/search", {
    search_text: query,
    limit: String(limit),
    order_by: "search_rank",
  });

  return data.seriess;
}

/*
|--------------------------------------------------------------------------
| Get information about a specific series
|--------------------------------------------------------------------------
*/

export async function getFredSeries(
  seriesId: string
): Promise<FredSeries | null> {
  const data = await fredFetch<FredSeriesResponse>("series", {
    series_id: seriesId,
  });

  return data.seriess[0] ?? null;
}

/*
|--------------------------------------------------------------------------
| Get observations for a specific series
|--------------------------------------------------------------------------
*/

export async function getFredObservations(
  seriesId: string,
  options?: {
    observationStart?: string;
    observationEnd?: string;
    limit?: number;
    sortOrder?: "asc" | "desc";
  }
): Promise<FredObservation[]> {
  const params: Record<string, string> = {
    series_id: seriesId,
    sort_order: options?.sortOrder ?? "desc",
  };

  if (options?.observationStart) {
    params.observation_start = options.observationStart;
  }

  if (options?.observationEnd) {
    params.observation_end = options.observationEnd;
  }

  if (options?.limit) {
    params.limit = String(options.limit);
  }

  const data = await fredFetch<FredObservationsResponse>(
    "series/observations",
    params
  );

  return data.observations;
}