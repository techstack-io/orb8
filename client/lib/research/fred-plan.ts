export interface VentureResearchInput {
    product: string;
    audience?: string;
    industry?: string;
    geography?: string;
    tractionProblem?: string;
  }
  
  export interface FredResearchQuestion {
    question: string;
    searchQuery: string;
    reason: string;
  }
  
  export function buildFredResearchPlan(
    input: VentureResearchInput
  ): FredResearchQuestion[] {
    const context = [
      input.product,
      input.audience,
      input.industry,
      input.tractionProblem,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
  
    /*
    |--------------------------------------------------------------------------
    | Meditation / wellness / mental-health ventures
    |--------------------------------------------------------------------------
    */
  
    if (
      context.includes("meditation") ||
      context.includes("mindfulness") ||
      context.includes("mental health") ||
      context.includes("wellness") ||
      context.includes("stress") ||
      context.includes("anxiety")
    ) {
      return [
        {
          question:
            "Is consumer spending on health and wellness-related services growing?",
          searchQuery: "personal consumption expenditures health care services",
          reason:
            "Consumer spending helps establish whether households are increasing or reducing spending in adjacent health and wellness categories.",
        },
        {
          question:
            "Is economic activity in mental-health-related services expanding?",
          searchQuery: "mental health services",
          reason:
            "Growth in adjacent mental health services can provide context about broader demand and sector activity.",
        },
        {
          question:
            "Is employment in health and wellness-related services increasing?",
          searchQuery: "health care employment",
          reason:
            "Employment growth can indicate whether the broader service category is expanding or contracting.",
        },
        {
          question:
            "Are consumers increasing discretionary spending on recreation and personal services?",
          searchQuery: "personal consumption expenditures recreation services",
          reason:
            "Meditation subscriptions compete for discretionary consumer spending, so recreation and service spending provides useful macro context.",
        },
      ];
    }
  
    /*
    |--------------------------------------------------------------------------
    | Generic fallback
    |--------------------------------------------------------------------------
    */
  
    const industry =
      input.industry?.trim() ||
      input.audience?.trim() ||
      input.product.trim();
  
    return [
      {
        question: `Is activity in ${industry} expanding or contracting?`,
        searchQuery: `${industry} economic activity`,
        reason:
          "Industry activity can help distinguish a venture-specific traction problem from broader market contraction.",
      },
      {
        question: `Is employment related to ${industry} growing?`,
        searchQuery: `${industry} employment`,
        reason:
          "Employment trends provide another signal of underlying industry health.",
      },
      {
        question: `Is spending related to ${industry} changing?`,
        searchQuery: `${industry} personal consumption expenditures`,
        reason:
          "Spending trends can indicate whether demand conditions are strengthening or weakening.",
      },
    ];
  }