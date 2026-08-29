export interface TrendsDataPoint {
    dateFrom: string;
    dateTo: string;
    timestamp: number;
    values: Record<string, number>;
  }
  
  export interface TrendsInterestResult {
    keywords: string[];
    locationCode: number;
    languageCode: string;
    type: string;
    items: TrendsDataPoint[];
  }
  
  interface DataForSEOTrendItem {
    date_from?: string;
    date_to?: string;
    timestamp?: number;
    values?: Array<{
      keyword?: string;
      value?: number;
    }>;
  }
  
  interface DataForSEOResult {
    keywords?: string[];
    location_code?: number;
    language_code?: string;
    type?: string;
    items?: DataForSEOTrendItem[];
  }
  
  interface DataForSEOTask {
    status_code?: number;
    status_message?: string;
    result?: DataForSEOResult[];
  }
  
  interface DataForSEOResponse {
    status_code?: number;
    status_message?: string;
    tasks?: DataForSEOTask[];
  }
  
  function getCredentials() {
    const login = process.env.DATAFORSEO_LOGIN;
    const password = process.env.DATAFORSEO_PASSWORD;
  
    if (!login || !password) {
      throw new Error(
        "DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD are required"
      );
    }
  
    return {
      login,
      password,
    };
  }
  
  function getAuthorizationHeader() {
    const { login, password } = getCredentials();
  
    return `Basic ${Buffer.from(`${login}:${password}`).toString("base64")}`;
  }
  
  export async function getGoogleTrendsInterest(params: {
    keywords: string[];
    locationCode?: number;
    languageCode?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<TrendsInterestResult> {
    if (!params.keywords.length) {
      throw new Error("At least one Trends keyword is required");
    }
  
    const response = await fetch(
      "https://api.dataforseo.com/v3/keywords_data/google_trends/explore/live",
      {
        method: "POST",
        headers: {
          Authorization: getAuthorizationHeader(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            keywords: params.keywords,
            location_code: params.locationCode ?? 2840,
            language_code: params.languageCode ?? "en",
            date_from: params.dateFrom,
            date_to: params.dateTo,
            type: "web",
          },
        ]),
        cache: "no-store",
      }
    );
  
    if (!response.ok) {
      const text = await response.text();
  
      throw new Error(
        `DataForSEO request failed (${response.status}): ${text}`
      );
    }
  
    const data = (await response.json()) as DataForSEOResponse;
  
    if (data.status_code && data.status_code !== 20000) {
      throw new Error(
        `DataForSEO error ${data.status_code}: ${
          data.status_message ?? "Unknown error"
        }`
      );
    }
  
    const task = data.tasks?.[0];
  
    if (!task) {
      throw new Error("DataForSEO returned no task");
    }
  
    if (task.status_code && task.status_code !== 20000) {
      throw new Error(
        `DataForSEO task error ${task.status_code}: ${
          task.status_message ?? "Unknown task error"
        }`
      );
    }
  
    const result = task.result?.[0];
  
    if (!result) {
      throw new Error("DataForSEO returned no Google Trends result");
    }
  
    const items: TrendsDataPoint[] = (result.items ?? []).map((item) => {
      const values: Record<string, number> = {};
  
      for (const entry of item.values ?? []) {
        if (
          entry.keyword &&
          typeof entry.value === "number" &&
          Number.isFinite(entry.value)
        ) {
          values[entry.keyword] = entry.value;
        }
      }
  
      return {
        dateFrom: item.date_from ?? "",
        dateTo: item.date_to ?? "",
        timestamp: item.timestamp ?? 0,
        values,
      };
    });
  
    return {
      keywords: result.keywords ?? params.keywords,
      locationCode: result.location_code ?? params.locationCode ?? 2840,
      languageCode: result.language_code ?? params.languageCode ?? "en",
      type: result.type ?? "web",
      items,
    };
  }