import { getGridInfo, minColumnWidth } from './get-grid-info';

export const initialiseCssGrid = (channels, programmes) => {
  const gridInfo = getGridInfo(channels, programmes);
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridInfo.numColumms}, minmax(${minColumnWidth}, 1fr))`,
    gridTemplateRows: `5rem repeat(${gridInfo.numRows - 1}, 7.5rem)`,
  };
};
