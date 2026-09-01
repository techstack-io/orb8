export type PollfishMetric = {
  label: string;
  value: string;
  note?: string;
};

export type PollfishSignal = {
  label: string;
  strength:
    | "Strong"
    | "Moderate"
    | "Weak"
    | "Uncertain"
    | "Emerging";
  score?: number;
  finding: string;
};

export type PollfishSegment = {
  segment: string;
  value: string;
  index?: string;
  note?: string;
};

export type PollfishQuestion = {
  id: string;
  question: string;
  responses: Array<{
    label: string;
    count?: number;
    percent?: number;
  }>;
};

export type PollfishEvidence = {
  surveyTitle: string;
  venture: string;
  respondentCount?: number;
  fieldDates?: string;
  completionTime?: string;
  statusLabel?: string;

  metrics: PollfishMetric[];
  signals: PollfishSignal[];
  segments: PollfishSegment[];
  questions: PollfishQuestion[];

  conclusion?: string;

  known?: string[];
  unknown?: string[];

  recommendedTest?: {
    title: string;
    description: string;
    emphasis?: string;
  };
};

export const pollfishEvidence: PollfishEvidence = {
  surveyTitle: "Single Product Concept Testing",
  venture: "Mettavia",
  statusLabel: "Primary Research",

  respondentCount: undefined,
  fieldDates: undefined,
  completionTime: undefined,

  metrics: [],

  signals: [],

  segments: [],

  questions: [],

  conclusion: undefined,

  known: [],

  unknown: [],

  recommendedTest: undefined,
};
