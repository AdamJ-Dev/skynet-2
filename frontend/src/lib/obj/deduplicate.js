export const deduplicate = (objs, idKey) => {
  const uniques = [];
  const ids = new Set();
  for (const obj of objs) {
    const value = obj[idKey];
    if (!ids.has(value)) {
      uniques.push(obj);
      ids.add(value);
    }
  }
  return uniques;
};
