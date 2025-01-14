import { create } from 'zustand';
import { produce } from 'immer';
import { SheetState, CellData, CellStyle } from '../types/sheet';
import { evaluateFormula } from '../utils/formulas';

const INITIAL_ROWS = 100;
const INITIAL_COLS = 26;

const createEmptyCell = (): CellData => ({
  value: '',
  formula: '',
  style: {
    bold: false,
    italic: false,
    fontSize: 12,
    color: '#000000'
  }
});

const useSheetStore = create<SheetState>((set) => ({
  data: {},
  rows: INITIAL_ROWS,
  cols: INITIAL_COLS,
  selectedCell: null,
  selectedRange: null,
  isDragging: false,

  setCellValue: (cellId: string, value: string) =>
    set(
      produce((state: SheetState) => {
        if (!state.data[cellId]) {
          state.data[cellId] = createEmptyCell();
        }
        state.data[cellId].value = value;
        state.data[cellId].formula = value.startsWith('=') ? value : '';
        
        if (state.data[cellId].formula) {
          state.data[cellId].value = evaluateFormula(state.data[cellId].formula, state.data);
        }
      })
    ),

  setCellStyle: (cellId: string, style: Partial<CellStyle>) =>
    set(
      produce((state: SheetState) => {
        if (!state.data[cellId]) {
          state.data[cellId] = createEmptyCell();
        }
        state.data[cellId].style = { ...state.data[cellId].style, ...style };
      })
    ),

  setSelectedCell: (cellId: string | null) =>
    set({ selectedCell: cellId, selectedRange: null }),

  setSelectedRange: (range: string[] | null) =>
    set({ selectedRange: range, selectedCell: null }),

  setDragging: (isDragging: boolean) =>
    set({ isDragging })
}));

export default useSheetStore;