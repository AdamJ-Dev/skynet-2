export const gatherClasses = (...classNames) => {
  const trueNames = classNames.filter((className) => !!className);
  return trueNames.join(' ');
};

export const optionalClass = (className, condition) => {
  return condition ? className : '';
};
