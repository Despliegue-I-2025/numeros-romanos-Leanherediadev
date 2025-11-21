import verificarEntradaDecimal from '../api/verificarEntradaDecimal.js';

describe('verificarEntradaDecimal', () => {

  describe('Casos de éxito', () => {
    test('debe devolver el número 1 para el string "1"', () => {
      expect(verificarEntradaDecimal("1")).toBe(1);
    });

    test('debe devolver el número 3999 para el string "3999"', () => {
      expect(verificarEntradaDecimal("3999")).toBe(3999);
    });

    test('debe devolver 1994 para "1994"', () => {
      expect(verificarEntradaDecimal("1994")).toBe(1994);
    });
  });

  describe('Casos de error', () => {
    
    test('debe lanzar error si no es un número (ej: "hola")', () => {
      expect(() => {
        verificarEntradaDecimal("hola",undefined);
      }).toThrow("Número ingresado incorrecto: debe ser un número en sistema decimal");
    });

    test('debe lanzar error si no es un número (ej: "12A")', () => {
        expect(() => {
          verificarEntradaDecimal("12A",undefined);
        }).toThrow("Número ingresado incorrecto: debe ser un número en sistema decimal");
      });

    test('debe lanzar error si el número es 0', () => {
      expect(() => {
        verificarEntradaDecimal("0",undefined);
      }).toThrow("Número ingresado incorrecto: debe estar entre 1 y 3999");
    });

    test('debe lanzar error si el número es negativo', () => {
        expect(() => {
          verificarEntradaDecimal("-10",undefined);
        }).toThrow("Número ingresado incorrecto: debe estar entre 1 y 3999");
      });

    test('debe lanzar error si el número es 4000', () => {
      expect(() => {
        verificarEntradaDecimal("4000",undefined);
      }).toThrow("Número ingresado incorrecto: debe estar entre 1 y 3999");
    });

    test('debe lanzar error si el número es 10000 (excede el rango)', () => {
        expect(() => {
          verificarEntradaDecimal("10000",undefined);
        }).toThrow("Número ingresado incorrecto: debe estar entre 1 y 3999");
      });

    test('debe lanzar error si el número es flotante (ej: "10.5")', () => {
        expect(() => {
          verificarEntradaDecimal("10.5",undefined);
        }).toThrow("Número ingresado incorrecto: el número debe ser un entero");
    });
   
  });
});