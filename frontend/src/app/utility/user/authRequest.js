export const getAuthHeader = (token) => {
  return { Authorization: `Bearer ${token}` };
};
