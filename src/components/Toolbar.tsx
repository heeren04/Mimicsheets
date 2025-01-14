import React from 'react';
import {
  Bold,
  Italic,
  Type,
  Palette,
  Plus,
  Minus,
  Search,
  Save,
  FileUp
} from 'lucide-react';
import useSheetStore from '../store/useSheetStore';

const Toolbar: React.FC = () => {
  const { selectedCell, setCellStyle } = useSheetStore();

  const handleStyleClick = (styleKey: string) => {
    if (!selectedCell) return;
    setCellStyle(selectedCell, { [styleKey]: true });
  };

  return (
    <div className="flex items-center gap-2 p-2 border-b bg-white">
      <div className="flex items-center gap-1 border-r pr-2">
        <button className="p-1 hover:bg-gray-100 rounded" onClick={() => handleStyleClick('bold')}>
          <Bold size={18} />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded" onClick={() => handleStyleClick('italic')}>
          <Italic size={18} />
        </button>
      </div>
      
      <div className="flex items-center gap-1 border-r pr-2">
        <button className="p-1 hover:bg-gray-100 rounded">
          <Type size={18} />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <Palette size={18} />
        </button>
      </div>
      
      <div className="flex items-center gap-1 border-r pr-2">
        <button className="p-1 hover:bg-gray-100 rounded">
          <Plus size={18} />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <Minus size={18} />
        </button>
      </div>
      
      <div className="flex items-center gap-1">
        <button className="p-1 hover:bg-gray-100 rounded">
          <Search size={18} />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <Save size={18} />
        </button>
        <button className="p-1 hover:bg-gray-100 rounded">
          <FileUp size={18} />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;