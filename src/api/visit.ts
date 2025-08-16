import { AddVisitParams } from 'src/types/api-types';

export const addVisit = async ({ start, exit, countryId }: AddVisitParams) => {
  try {
    const response = await fetch(`/api/proxy/visit`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        startDate: start,
        endDate: exit,
        policyId: countryId
      })
    });
    const result = await response.json();
    if (response.ok) {
      return result;
    } else {
      console.error('Failed to fetch visit:', result.message);
    }
    return result;
  } catch (error) {
    console.error('Failed to fetch visit:', error);
  }
};

export const deleteVisit = async (id: string) => {
  try {
    const response = await fetch(`/api/proxy/visit/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (response.ok) {
      return;
    }
  } catch (error) {
    console.error('Failed to delete visit aaa:', error);
  }
};
