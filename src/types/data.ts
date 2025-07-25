export type User = {
  email: string;
  exp: number;
  iat: number;
  id: string;
  name: string;
  picture: string;
  policies: Policy[];
};

export type Visit = {
  entry: string;
  exit: string;
  policyId: string;
  _id: string;
};

export type Policy = {
  allowedRuleWindow: number;
  description: string;
  name: string;
  ruleWindow: number;
  userId: string;
  visits: Visit[];
  _id: string;
};

export type ExtendedPolicy = Policy & {
  totalDays: number;
};
