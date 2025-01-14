import React, { useCallback } from 'react';
import classNames from 'classnames';
import useSheetStore from '../store/useSheetStore';
import { CellPosition } from '../types/sheet';

const Sheet: React.FC = () => {
  const { data, rows, cols, selectedCell, setSelectedCell, setCellValue } = useSheetStore();

  const getCellId = (row: number, col: number) => {
    const colLetter = String.fromCharCode(65 + col);
    return `${colLetter}${row + 1}`;
  };

  const handleCellClick = useCallback((cellId: string) => {
    setSelectedCell(cellId);
  }, [setSelectedCell]);

  const handleCellChange = useCallback((cellId: string, value: string) => {
    setCellValue(cellId, value);
  }, [setCellValue]);

  const renderHeaderRow = () => (
    <div className="flex">
      <div className="w-10 h-8 bg-gray-100 border-r border-b flex items-center justify-center" />
      {Array.from({ length: cols }, (_, i) => (
        <div
          key={i}
          className="w-24 h-8 bg-gray-100 border-r border-b flex items-center justify-center font-medium"
        >
          {String.fromCharCode(65 + i)}
        </div>
      ))}
    </div>
  );

  const renderCell = (row: number, col: number) => {
    const cellId = getCellId(row, col);
    const cellData = data[cellId];
    const isSelected = selectedCell === cellId;

    return (
      <div
        key={col}
        className={classNames(
          'w-24 h-8 border-r border-b relative',
          isSelected && 'ring-2 ring-blue-500 z-10'
        )}
      >
        <input
          type="text"
          value={cellData?.value || ''}
          onChange={(e) => handleCellChange(cellId, e.target.value)}
          onClick={() => handleCellClick(cellId)}
          className={classNames(
            'w-full h-full px-1 focus:outline-none',
            cellData?.style?.bold && 'font-bold',
            cellData?.style?.italic && 'italic'
          )}
          style={{
            fontSize: `${cellData?.style?.fontSize || 12}px`,
            color: cellData?.style?.color || '#000000'
          }}
        />
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-auto">
      {renderHeaderRow()}
      {Array.from({ length: rows }, (_, row) => (
        <div key={row} className="flex">
          <div className="w-10 h-8 bg-gray-100 border-r border-b flex items-center justify-center font-medium">
            {row + 1}
          </div>
          {Array.from({ length: cols }, (_, col) => renderCell(row, col))}
        </div>
      ))}
    </div>
  );
};

export default Sheet;