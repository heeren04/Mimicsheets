import React, { useState, useEffect } from 'react';
import useSheetStore from '../store/useSheetStore';

const FormulaBar: React.FC = () => {
  const { selectedCell, data, setCellValue } = useSheetStore();
  const [formula, setFormula] = useState('');

  useEffect(() => {
    if (selectedCell && data[selectedCell]) {
      setFormula(data[selectedCell].formula || data[selectedCell].value);
    } else {
      setFormula('');
    }
  }, [selectedCell, data]);

  const handleFormulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormula(e.target.value);
    if (selectedCell) {
      setCellValue(selectedCell, e.target.value);
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 border-b bg-white">
      <div className="w-10 text-gray-500 font-mono">{selectedCell || ''}</div>
      <input
        type="text"
        value={formula}
        onChange={handleFormulaChange}
        className="flex-1 px-2 py-1 border rounded"
        placeholder="Enter a value or formula"
      />
    </div>
  );
};

export default FormulaBar;