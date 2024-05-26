export const returnCell = ({
  data,
  cells,
}: {
  data: Record<string, any>[];
  cells: string[][];
}) => {
  const newData = cells.map((cell) => {
    const itemTab = cell[0];
    const letterCode = String.fromCharCode(Number(cell[1]) + 64);
    const newData = data[itemTab as any];
    if (cell.length === 3) {
      const newCell = `${letterCode}${cell[2]}`;
      return newData[newCell].v;
    }
    if (cell.length === 5) {
      const startRow = Number(cell[2]);
      const startCol = Number(cell[1]);
      const endRow = Number(cell[4]);
      const endCol = Number(cell[3]);
      const filteredData = filterData(
        newData,
        startRow,
        startCol,
        endRow,
        endCol
      );

      return filteredData;
    }
  });
  return newData;
};

function filterData(
  data: Record<string, any>,
  startRow: number,
  startCol: number,
  endRow: number,
  endCol: number
) {
  const filteredData: Record<string, any> = {};
  for (const key in data) {
    const row = parseInt(key.substring(1));
    const col = key.charCodeAt(0) - "A".charCodeAt(0) + 1;
    if (row >= startRow && row <= endRow && col >= startCol && col <= endCol) {
      filteredData[key] = data[key].v;
    }
  }
  return filteredData;
}
