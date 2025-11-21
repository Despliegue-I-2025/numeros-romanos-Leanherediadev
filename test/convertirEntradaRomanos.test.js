import convertirEntradaRomano from '../api/convertirEntradaRomanos.js';
import verificarSimbolosRomanos from "../api/verificarSimbolosRomanos.js";
import arabicToRoman from "../api/arabicToRoman.js";
import romanToArabic from '../api/romanToArabic.js';

jest.mock("../api/verificarSimbolosRomanos.js");
jest.mock("../api/arabicToRoman.js");
jest.mock("../api/romanToArabic.js");

const strToArray = (str) => Array.from(str);

describe('convertirEntradaRomano (Orquestador)', () => {

  beforeEach(() => {
    verificarSimbolosRomanos.mockClear();
    arabicToRoman.mockClear();
    romanToArabic.mockClear();
  });

  test('debe llamar a verificar y convertir, y devolver el número final', () => {
    const arrayValido = strToArray("MCMXCIV");
    
    verificarSimbolosRomanos.mockImplementation(() => {}); 
    arabicToRoman.mockReturnValue("MCMXCIV");
    romanToArabic.mockReturnValue(1994);

    const resultado = convertirEntradaRomano(arrayValido);

    expect(verificarSimbolosRomanos).toHaveBeenCalledWith(arrayValido, undefined);
    expect(arabicToRoman).toHaveBeenCalledWith(1994, undefined);
    expect(romanToArabic).toHaveBeenCalledWith(arrayValido, undefined);
    
    expect(resultado).toBe(1994);
  });

  test('debe lanzar un error formateado si la verificación de símbolos falla', () => {
    const arrayInvalido = strToArray("IIII");
    const errorOriginal = new Error("Numero ingresado incorrecto");

    verificarSimbolosRomanos.mockImplementation(() => {
      throw errorOriginal;
    });

    expect(() => {
      convertirEntradaRomano(arrayInvalido);
    }).toThrow("Numero ingresado incorrecto");

    expect(arabicToRoman).not.toHaveBeenCalled();
    expect(romanToArabic).not.toHaveBeenCalled();
  });
});