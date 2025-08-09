export const deleteAccount = async ({ userId }: { userId: string }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`,
      {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      console.error('Failed to delete account', result.message);
    }
    return result;
  } catch (error) {
    console.error('Failed to delete account', error);
  }
};
