export const omit = (obj, properties) => {
  const propertySet = new Set(properties);
  return Object.keys(obj)
    .filter((key) => !propertySet.has(key))
    .reduce((newObj, key) => {
      newObj[key] = obj[key];
      return newObj;
    }, {});
};

export const omitFromAll = (objs, properties) => {
  return objs.map((obj) => omit(obj, properties));
};
