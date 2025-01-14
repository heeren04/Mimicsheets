import React from 'react';
import Toolbar from './components/Toolbar';
import FormulaBar from './components/FormulaBar';
import Sheet from './components/Sheet';

function App() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex items-center justify-between p-2 bg-white border-b">
        <div className="flex items-center gap-2">
          <img
            src="https://www.google.com/images/about/sheets-icon.svg"
            alt="Sheets"
            className="w-8 h-8"
          />
          <h1 className="text-lg font-medium">Simple Sheets</h1>
        </div>
      </div>
      <Toolbar />
      <FormulaBar />
      <Sheet />
    </div>
  );
}

export default App;