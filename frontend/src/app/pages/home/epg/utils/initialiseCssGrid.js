import { getGridInfo, minColumnWidth } from './getGridInfo';

export const initialiseCssGrid = (channels, programmes) => {
  const gridInfo = getGridInfo(channels, programmes);
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridInfo.numColumms}, minmax(${minColumnWidth}, 1fr)`,
    gridTemplateRows: `repeat(${gridInfo.numRows}, 1fr)`,
  };
};
