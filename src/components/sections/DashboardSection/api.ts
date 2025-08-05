interface AddVisitInput {
  start: number;
  exit: number;
  countryId: string;
}
export const addVisit = async ({ start, exit, countryId }: AddVisitInput) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/visit`, {
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/visit/${id}`,
      {
        method: 'DELETE',
        credentials: 'include'
      }
    );
    if (response.ok) {
      return;
    }
  } catch (error) {
    console.error('Failed to delete visit aaa:', error);
  }
};

export const createPolicy = async ({ name, description }) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/policy`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        description
      })
    });
    const result = await response.json();
    if (response.ok) {
      return result;
    } else {
      console.error('Failed to create policy:', result.message);
    }
    return result;
  } catch (error) {
    console.error('Failed to create policy:', error);
  }
};

export const deletePolicy = async ({ id }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/policy/${id}`,
      {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    console.log(response);

    if (response.ok) {
      return { success: true, message: 'Policy deleted successfully' };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error('Failed to delete policy:', error);
    return { success: false };
  }
};
