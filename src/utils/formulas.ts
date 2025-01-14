import { CellData } from '../types/sheet';

type FormulaFunction = (args: string[], data: { [key: string]: CellData }) => string;

const formulaFunctions: { [key: string]: FormulaFunction } = {
  SUM: (args, data) => {
    const values = args.map(ref => parseFloat(data[ref]?.value || '0')).filter(v => !isNaN(v));
    return values.reduce((a, b) => a + b, 0).toString();
  },
  
  AVERAGE: (args, data) => {
    const values = args.map(ref => parseFloat(data[ref]?.value || '0')).filter(v => !isNaN(v));
    return (values.reduce((a, b) => a + b, 0) / values.length).toString();
  },
  
  MAX: (args, data) => {
    const values = args.map(ref => parseFloat(data[ref]?.value || '-Infinity')).filter(v => !isNaN(v));
    return Math.max(...values).toString();
  },
  
  MIN: (args, data) => {
    const values = args.map(ref => parseFloat(data[ref]?.value || 'Infinity')).filter(v => !isNaN(v));
    return Math.min(...values).toString();
  },
  
  COUNT: (args, data) => {
    return args.filter(ref => !isNaN(parseFloat(data[ref]?.value || ''))).length.toString();
  },
  
  TRIM: (args, data) => {
    return (data[args[0]]?.value || '').trim();
  },
  
  UPPER: (args, data) => {
    return (data[args[0]]?.value || '').toUpperCase();
  },
  
  LOWER: (args, data) => {
    return (data[args[0]]?.value || '').toLowerCase();
  }
};

export const evaluateFormula = (formula: string, data: { [key: string]: CellData }): string => {
  if (!formula.startsWith('=')) return formula;
  
  const functionMatch = formula.match(/^=([A-Z]+)\((.*)\)$/);
  if (!functionMatch) return '#ERROR!';
  
  const [, functionName, argsString] = functionMatch;
  const args = argsString.split(',').map(arg => arg.trim());
  
  const fn = formulaFunctions[functionName];
  if (!fn) return '#NAME?';
  
  try {
    return fn(args, data);
  } catch (error) {
    return '#ERROR!';
  }
};