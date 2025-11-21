import romanToArabic from '../api/romanToArabic.js';

const strToArray = (str) => Array.from(str);

describe('romanToArabic', () => {

  describe('Casos de conversión válida', () => {
    test('debe convertir números simples (solo suma)', () => {
      expect(romanToArabic(strToArray("I"))).toBe(1);
      expect(romanToArabic(strToArray("VI"))).toBe(6);
      expect(romanToArabic(strToArray("MDCLXVI"))).toBe(1666);
    });

    test('debe convertir números con resta (válida)', () => {
      expect(romanToArabic(strToArray("IV"))).toBe(4);
      expect(romanToArabic(strToArray("IX"))).toBe(9);
      expect(romanToArabic(strToArray("XL"))).toBe(40);
      expect(romanToArabic(strToArray("XC"))).toBe(90);
      expect(romanToArabic(strToArray("CD"))).toBe(400);
      expect(romanToArabic(strToArray("CM"))).toBe(900);
    });

    test('debe convertir números complejos (válidos)', () => {
      expect(romanToArabic(strToArray("MCMXCIV"))).toBe(1994);
      expect(romanToArabic(strToArray("CDXLIV"))).toBe(444);
      expect(romanToArabic(strToArray("MMDCCCXLIX"))).toBe(2849);
      expect(romanToArabic(strToArray("MMMCMXCIX"))).toBe(3999);
    });
  });

  describe('Casos de error (restas inválidas)', () => {

    test('debe lanzar error si "V" resta (ej: VX)', () => {
      expect(() => {
        romanToArabic(strToArray("VX"));
      }).toThrow("Numero ingresado incorrecto: 'V' (V, L, D) no pueden restar.");
    });

    test('debe lanzar error si "L" resta (ej: LD)', () => {
      expect(() => {
        romanToArabic(strToArray("LD"));
      }).toThrow("Numero ingresado incorrecto: 'L' (V, L, D) no pueden restar.");
    });

    test('debe lanzar error si "D" resta (ej: DM)', () => {
      expect(() => {
        romanToArabic(strToArray("DM"));
      }).toThrow("Numero ingresado incorrecto: 'D' (V, L, D) no pueden restar.");
    });

    test('debe lanzar error si "I" resta a "L" (IL)', () => {
      expect(() => {
        romanToArabic(strToArray("IL"));
      }).toThrow("Numero ingresado incorrecto: 'I' solo puede restar a 'V' y 'X'.");
    });
    
    test('debe lanzar error si "I" resta a "C" (IC)', () => {
        expect(() => {
          romanToArabic(strToArray("IC"));
        }).toThrow("Numero ingresado incorrecto: 'I' solo puede restar a 'V' y 'X'.");
    });

    test('debe lanzar error si "I" resta a "M" (IM)', () => {
        expect(() => {
          romanToArabic(strToArray("IM"));
        }).toThrow("Numero ingresado incorrecto: 'I' solo puede restar a 'V' y 'X'.");
    });

    test('debe lanzar error si "X" resta a "D" (XD)', () => {
      expect(() => {
        romanToArabic(strToArray("XD"));
      }).toThrow("Numero ingresado incorrecto: 'X' solo puede restar a 'L' y 'C'.");
    });

    test('debe lanzar error si "X" resta a "M" (XM)', () => {
        expect(() => {
          romanToArabic(strToArray("XM"));
        }).toThrow("Numero ingresado incorrecto: 'X' solo puede restar a 'L' y 'C'.");
    });
    
    test('debe lanzar error si el símbolo que resta está a más de un orden de magnitud', () => {
        expect(() => {
          romanToArabic(strToArray("IC"));
        }).toThrow("Numero ingresado incorrecto: 'I' solo puede restar a 'V' y 'X'.");
    });

  });

  describe('Casos borde', () => {
    test('debe devolver 0 para un array vacío', () => {
      expect(romanToArabic([])).toBe(0);
    });

    test('debe devolver NaN si el array contiene caracteres no romanos', () => {
      expect(romanToArabic(strToArray("A"))).toBeNaN();
    });
  });
});
