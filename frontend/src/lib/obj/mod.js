export const mod = (objs, key) => {
  const objsModKey = [];
  const values = new Set();
  for (const obj of objs) {
    const value = obj[key];
    if (!values.has(value)) {
      objsModKey.push(obj);
      values.add(value);
    }
  }
  return objsModKey;
};
