// Topics offered by the support form. The API rejects anything else.
export const TOPICS = {
  app: "App help",
  bug: "Bug report",
  account: "Account, data or deletion",
  billing: "Subscription or billing",
  sensor: "Plantiemoji sensor",
  partnership: "Partnerships or press",
  other: "Something else",
} as const;

export type TopicKey = keyof typeof TOPICS;

export const LIMITS = { name: 100, email: 200, message: 5000 };
