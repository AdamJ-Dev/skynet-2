import { getGridInfo } from './getGridInfo';

export const initialiseCssGrid = (channels, programmes) => {
  const gridInfo = getGridInfo(channels, programmes);
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridInfo.numColumms}, 1fr)`,
    gridTemplateRows: `repeat(${gridInfo.numRows}, 1fr)`,
  };
};
