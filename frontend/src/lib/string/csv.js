export const arrayToCsv = (arr) => {
  return arr.join(',');
};

export const csvToArray = (csvStr) => {
  return csvStr.split(',');
};
