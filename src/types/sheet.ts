export interface CellData {
  value: string;
  formula: string;
  style: CellStyle;
}

export interface CellStyle {
  bold: boolean;
  italic: boolean;
  fontSize: number;
  color: string;
}

export interface SheetState {
  data: { [key: string]: CellData };
  rows: number;
  cols: number;
  selectedCell: string | null;
  selectedRange: string[] | null;
  isDragging: boolean;
}

export type CellPosition = {
  row: number;
  col: number;
};