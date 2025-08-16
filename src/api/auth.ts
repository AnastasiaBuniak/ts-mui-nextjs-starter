export const logout = async () => {
  try {
    return await fetch(`/api/proxy/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
