export const matchesQuery = (query, string) => {
  const normedString = string.toLowerCase();
  const normedQuery = query.toLowerCase();
  return normedString.includes(normedQuery);
};
