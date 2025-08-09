export interface CreatePolicyParams {
  name: string;
  description: string;
}
export interface DeletePolicyParams {
  id: string;
}

export interface EditPolicyParams {
  id: string;
  name: string;
  description: string;
}

export interface AddVisitParams {
  start: number;
  exit: number;
  countryId: string;
}
