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

  pricing?: Array<{
    price: string;
    tooCheap: number;
    goodValue: number;
    gettingExpensive: number;
    tooExpensive: number;
  }>;

  benefits?: Array<{
    label: string;
    topTwoBox: number;
    stronglyAgree: number;
  }>;

  features?: Array<{
    label: string;
    appeal: number;
    veryAppealing: number;
  }>;

  qualitativeThemes?: Array<{
    theme: string;
    finding: string;
    direction: "positive" | "negative" | "mixed";
  }>;

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

  respondentCount: 100,

  fieldDates: undefined,
  completionTime: undefined,

  metrics: [
    {
      label: "Concept Appeal",
      value: "67%",
      note: "Like very much + like somewhat",
    },
    {
      label: "Subscription Intent",
      value: "39%",
      note: "Definitely + probably subscribe at $59/year",
    },
    {
      label: "Learning Thesis",
      value: "78%",
      note: "Agree Mettavia would develop meditation as a skill",
    },
    {
      label: "Differentiation",
      value: "56%",
      note: "Very + somewhat different",
    },
    {
      label: "Concept Clarity",
      value: "81%",
      note: "Very + somewhat easy to explain",
    },
  ],

  signals: [
    {
      label: "Structured learning proposition",
      strength: "Strong",
      score: 78,
      finding:
        "78% agree Mettavia would help them develop meditation as a skill.",
    },
    {
      label: "Meditation understanding",
      strength: "Strong",
      score: 78,
      finding:
        "78% agree Mettavia would make meditation easier to understand.",
    },
    {
      label: "Clear path to improvement",
      strength: "Strong",
      score: 77,
      finding:
        "77% agree Mettavia would give them a clear path for improving their meditation practice.",
    },
    {
      label: "Working through difficulty",
      strength: "Strong",
      score: 72,
      finding:
        "72% agree Mettavia would help them work through distraction and difficulty during meditation.",
    },
    {
      label: "Concept appeal",
      strength: "Strong",
      score: 67,
      finding:
        "67% like the Mettavia concept very much or somewhat.",
    },
    {
      label: "Concept clarity",
      strength: "Strong",
      score: 81,
      finding:
        "81% say Mettavia would be very or somewhat easy to describe to a friend.",
    },
    {
      label: "Subscription intent",
      strength: "Moderate",
      score: 39,
      finding:
        "39% say they definitely or probably would subscribe at the tested $59 annual price.",
    },
    {
      label: "Differentiation",
      strength: "Moderate",
      score: 56,
      finding:
        "56% perceive Mettavia as very or somewhat different from other meditation apps or programs.",
    },
    {
      label: "Meaningful differentiation",
      strength: "Moderate",
      score: 58,
      finding:
        "58% agree Mettavia would offer something meaningfully different from other meditation apps.",
    },
    {
      label: "Regular-use expectation",
      strength: "Moderate",
      score: 58,
      finding:
        "58% agree Mettavia would be something they would use regularly.",
    },
    {
      label: "Competitive usage",
      strength: "Moderate",
      score: 61,
      finding:
        "61% say they would use Mettavia instead of or in addition to another meditation product.",
    },
  ],

  segments: [
    {
      segment: "Meditation app users",
      value: "51%",
      note:
        "Used a meditation app within the past 12 months.",
    },
    {
      segment: "Current regular meditators",
      value: "41.2%",
      note:
        "Among the 51 respondents routed into the meditation-experience question.",
    },
    {
      segment: "Current occasional meditators",
      value: "51.0%",
      note:
        "Among the 51 respondents routed into the meditation-experience question.",
    },
    {
      segment: "Weekly meditators",
      value: "64.7%",
      note:
        "Among the 51 respondents who answered meditation frequency.",
    },
  ],

  pricing: [
    {
      price: "$59/year",
      tooCheap: 12,
      goodValue: 42,
      gettingExpensive: 30,
      tooExpensive: 16,
    },
    {
      price: "$79/year",
      tooCheap: 4,
      goodValue: 25,
      gettingExpensive: 40,
      tooExpensive: 31,
    },
    {
      price: "$99/year",
      tooCheap: 4,
      goodValue: 17,
      gettingExpensive: 26,
      tooExpensive: 53,
    },
  ],

  benefits: [
    {
      label: "Develop meditation as a skill",
      topTwoBox: 78,
      stronglyAgree: 36,
    },
    {
      label: "Make meditation easier to understand",
      topTwoBox: 78,
      stronglyAgree: 29,
    },
    {
      label: "Clear path for improving meditation",
      topTwoBox: 77,
      stronglyAgree: 32,
    },
    {
      label: "Understand what I am doing",
      topTwoBox: 72,
      stronglyAgree: 33,
    },
    {
      label: "Work through distraction and difficulty",
      topTwoBox: 72,
      stronglyAgree: 30,
    },
    {
      label: "Something I would want to try / meets my needs",
      topTwoBox: 64,
      stronglyAgree: 28,
    },
    {
      label: "Become less dependent on guided meditation",
      topTwoBox: 58,
      stronglyAgree: 21,
    },
    {
      label: "Meaningfully different from other apps",
      topTwoBox: 58,
      stronglyAgree: 27,
    },
    {
      label: "Would use regularly",
      topTwoBox: 58,
      stronglyAgree: 30,
    },
    {
      label: "Relevant to current meditation practice",
      topTwoBox: 57,
      stronglyAgree: 25,
    },
  ],

  features: [
    {
      label: "Reflection exercises",
      appeal: 72,
      veryAppealing: 41,
    },
    {
      label: "Guided meditation practices",
      appeal: 70,
      veryAppealing: 34,
    },
    {
      label: "Structured meditation curriculum",
      appeal: 68,
      veryAppealing: 37,
    },
    {
      label: "Progressive skill development",
      appeal: 62,
      veryAppealing: 36,
    },
    {
      label: "Audio parables",
      appeal: 55,
      veryAppealing: 32,
    },
    {
      label: "AI-powered personalized guidance",
      appeal: 39,
      veryAppealing: 24,
    },
  ],

  qualitativeThemes: [
    {
      theme: "Learning and education",
      direction: "positive",
      finding:
        "Respondents repeatedly describe Mettavia as teaching, explaining, or helping users understand meditation rather than simply supplying meditation sessions.",
    },
    {
      theme: "Structure and progression",
      direction: "positive",
      finding:
        "Open-ended responses independently mention structure, classes, routines, guided learning, progressive paths, and improvement over time.",
    },
    {
      theme: "Independent practice",
      direction: "positive",
      finding:
        "Several respondents specifically identify the gradual reduction of guidance and eventual ability to practice independently as a distinguishing idea.",
    },
    {
      theme: "Parables and explanation",
      direction: "positive",
      finding:
        "Some respondents specifically identify stories, parables, audio, and explanations as differentiating elements.",
    },
    {
      theme: "Price sensitivity",
      direction: "negative",
      finding:
        "Price and cost recur as explicit concerns in the open-ended feedback, consistent with the deterioration in value perception at $79 and $99.",
    },
    {
      theme: "Differentiation uncertainty",
      direction: "mixed",
      finding:
        "Some respondents clearly identify Mettavia's teaching and progressive-independence model as different, while others say it appears similar or that they lack enough category experience to compare.",
    },
    {
      theme: "AI",
      direction: "mixed",
      finding:
        "A small number of open-ended responses identify AI as differentiating, but the quantitative feature test makes AI-powered conversation the weakest tested feature.",
    },
  ],

  questions: [
    {
      id: "Q1",
      question:
        "Which of the following types of meditation products or services, if any, have you used in the past 12 months?",
      responses: [
        { label: "Meditation apps", count: 51, percent: 51 },
        {
          label: "Meditation courses or programs",
          count: 33,
          percent: 33,
        },
        { label: "None of the above", count: 35, percent: 35 },
      ],
    },

    {
      id: "Q2",
      question:
        "Which best describes your experience with meditation?",
      responses: [
        {
          label: "I currently meditate regularly",
          count: 21,
          percent: 41.18,
        },
        {
          label: "I currently meditate occasionally",
          count: 26,
          percent: 50.98,
        },
        {
          label:
            "I have meditated in the past, but do not currently meditate",
          count: 1,
          percent: 1.96,
        },
        {
          label: "I have tried meditation a few times",
          count: 2,
          percent: 3.92,
        },
        {
          label:
            "I have never meditated, but I am interested in trying it",
          count: 1,
          percent: 1.96,
        },
        {
          label:
            "I have never meditated and am not interested in trying it",
          count: 0,
          percent: 0,
        },
      ],
    },

    {
      id: "Q3",
      question: "How often do you typically meditate?",
      responses: [
        {
          label: "At least once a week",
          count: 33,
          percent: 64.71,
        },
        {
          label: "2-3 times a month",
          count: 10,
          percent: 19.61,
        },
        {
          label: "About once a month",
          count: 6,
          percent: 11.76,
        },
        {
          label: "Once every 2-3 months",
          count: 2,
          percent: 3.92,
        },
        { label: "2-4 times a year", count: 0, percent: 0 },
        {
          label: "About once a year or less often",
          count: 0,
          percent: 0,
        },
      ],
    },

    {
      id: "Q5",
      question:
        "How likely would you be to subscribe to Mettavia if it were available today?",
      responses: [
        {
          label: "Definitely would subscribe",
          count: 19,
          percent: 19,
        },
        {
          label: "Probably would subscribe",
          count: 20,
          percent: 20,
        },
        {
          label: "Might or might not subscribe",
          count: 26,
          percent: 26,
        },
        {
          label: "Probably would not subscribe",
          count: 21,
          percent: 21,
        },
        {
          label: "Definitely would not subscribe",
          count: 14,
          percent: 14,
        },
      ],
    },

    {
      id: "Q8",
      question:
        "Compared with other meditation apps or programs, how different does Mettavia appear to be?",
      responses: [
        { label: "Very different", count: 10, percent: 10 },
        {
          label: "Somewhat different",
          count: 46,
          percent: 46,
        },
        { label: "The same", count: 28, percent: 28 },
        {
          label: "Somewhat similar",
          count: 13,
          percent: 13,
        },
        { label: "Very similar", count: 3, percent: 3 },
      ],
    },

    {
      id: "Q10",
      question:
        "How much do you like or dislike the idea of Mettavia?",
      responses: [
        { label: "Like very much", count: 24, percent: 24 },
        { label: "Like somewhat", count: 43, percent: 43 },
        {
          label: "Neither like nor dislike",
          count: 24,
          percent: 24,
        },
        { label: "Dislike somewhat", count: 7, percent: 7 },
        { label: "Dislike a lot", count: 2, percent: 2 },
      ],
    },

    {
      id: "Q11",
      question:
        "If you wanted to tell a friend about Mettavia, how easy or difficult do you think it would be to describe the product?",
      responses: [
        { label: "Very easy", count: 31, percent: 31 },
        { label: "Somewhat easy", count: 50, percent: 50 },
        { label: "Not very easy", count: 16, percent: 16 },
        { label: "Not easy at all", count: 3, percent: 3 },
      ],
    },

    {
      id: "Q14",
      question:
        "If Mettavia were available today, would you be more likely to use it instead of or in addition to another meditation app or program you already use?",
      responses: [
        {
          label: "Instead of other products I already use",
          count: 26,
          percent: 26,
        },
        {
          label: "In addition to other products I already use",
          count: 35,
          percent: 35,
        },
        {
          label: "I do not buy any products like this",
          count: 39,
          percent: 39,
        },
      ],
    },

    {
      id: "Q15",
      question: "Who would you primarily expect to use Mettavia?",
      responses: [
        { label: "Myself", count: 89, percent: 89 },
        {
          label: "Myself and my spouse or partner",
          count: 18,
          percent: 18,
        },
        {
          label:
            "Child or children 17 years old or younger in my household",
          count: 9,
          percent: 9,
        },
      ],
    },
  ],

  conclusion:
    "The Pollfish evidence supports Mettavia's core structured-learning thesis more strongly than any individual technology feature. Respondents show strong agreement that Mettavia could help them develop meditation as a skill, understand meditation, and follow a clear path of improvement. Overall concept appeal is positive and stated subscription intent at $59/year is meaningful, although behavioral conversion remains untested. Differentiation is promising but not decisive. The strongest positioning opportunity is therefore Mettavia as a structured way to learn meditation and become increasingly capable of practicing independently, rather than positioning the product primarily around AI or a larger library of guided content.",

  known: [
    "67% express positive overall concept appeal.",
    "39% say they definitely or probably would subscribe at $59/year.",
    "19% say they definitely would subscribe.",
    "78% agree Mettavia would help develop meditation as a skill.",
    "78% agree Mettavia would make meditation easier to understand.",
    "77% agree Mettavia would provide a clear path for improving meditation practice.",
    "72% agree it would help with distraction and difficulty.",
    "56% perceive Mettavia as very or somewhat different.",
    "58% agree it would offer something meaningfully different.",
    "81% say the concept is very or somewhat easy to explain.",
    "42% characterize $59/year as a good value they would consider subscribing to.",
    "Price acceptance deteriorates substantially at $79 and $99.",
    "Reflection exercises received the highest feature appeal at 72%.",
    "AI-powered conversation received the lowest feature appeal at 39%.",
  ],

  unknown: [
    "Whether stated subscription intent will translate into actual signup or payment behavior.",
    "Whether $4.99/month framing would perform differently from presenting the equivalent cost primarily as an annual price.",
    "Which positioning message produces the highest real-world conversion rate.",
    "Whether users will maintain engagement with a structured curriculum over time.",
    "Which respondent segments have materially higher signup or retention potential.",
    "Whether progressive independence is strong enough to function as the primary acquisition message rather than a supporting product benefit.",
  ],

  recommendedTest: {
    title: "Validate positioning with real behavior",
    description:
      "Test a Mettavia landing page centered on learning meditation as a structured skill. Compare messaging around structured learning, working through distraction, and progressive independence. Measure early-access signup behavior rather than stated purchase intent.",
    emphasis:
      "The next question is no longer simply whether people like Mettavia. Test whether the structured-learning proposition causes people to act.",
  },
};
