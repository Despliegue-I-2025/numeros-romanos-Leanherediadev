import verificarSimbolosRomanos from '../api/verificarSimbolosRomanos.js';

const strToArray = (str) => Array.from(str);

describe('verificarSimbolosRomanos', () => {

  describe('Casos de éxito (repeticiones válidas)', () => {
    test('no debe lanzar error para números válidos', () => {
      expect(() => {
        verificarSimbolosRomanos(strToArray("MCMXCIV"));
      }).not.toThrow();
    });

    test('no debe lanzar error para repeticiones máximas válidas', () => {
      expect(() => {
        verificarSimbolosRomanos(strToArray("III"));
      }).not.toThrow();
    });

    test('no debe lanzar error para repeticiones máximas válidas complejas', () => {
        expect(() => {
          verificarSimbolosRomanos(strToArray("MMMCMXCIX"));
        }).not.toThrow();
      });

    test('no debe lanzar error para símbolos no repetibles (V, L, D) si están solos', () => {
      expect(() => {
        verificarSimbolosRomanos(strToArray("MDCLXVI"));
      }).not.toThrow();
    });

    test('no debe lanzar error para un array vacío', () => {
        expect(() => {
          verificarSimbolosRomanos([]);
        }).not.toThrow();
      });
  });

  describe('Casos de error (lanzar Error por repetición)', () => {
    
    test('debe lanzar un error por "VV"', () => {
      expect(() => {
        verificarSimbolosRomanos(strToArray("VV"));
      }).toThrow("Número romano inválido");
    });

    test('debe lanzar un error por "LL"', () => {
      expect(() => {
        verificarSimbolosRomanos(strToArray("LL"));
      }).toThrow("Número romano inválido");
    });

    test('debe lanzar un error por "DD"', () => {
      expect(() => {
        verificarSimbolosRomanos(strToArray("DD"));
      }).toThrow("Número romano inválido");
    });

    test('debe lanzar un error por repetición de V, L, D dentro de un número', () => {
        expect(() => {
          verificarSimbolosRomanos(strToArray("CVV"));
        }).toThrow("Número romano inválido");
      });

    test('debe lanzar un error por "IIII"', () => {
      expect(() => {
        verificarSimbolosRomanos(strToArray("IIII"));
      }).toThrow("Número romano inválido");
    });

    test('debe lanzar un error por "XXXX"', () => {
      expect(() => {
        verificarSimbolosRomanos(strToArray("XXXX"));
      }).toThrow("Número romano inválido");
    });

    test('debe lanzar un error por "CCCC"', () => {
      expect(() => {
        verificarSimbolosRomanos(strToArray("CCCC"));
      }).toThrow("Número romano inválido");
    });

    test('debe lanzar un error por "MMMM"', () => {
      expect(() => {
        verificarSimbolosRomanos(strToArray("MMMM"));
      }).toThrow("Número romano inválido");
    });

    test('debe lanzar un error por repetición de 4 dentro de un número', () => {
        expect(() => {
          verificarSimbolosRomanos(strToArray("CXXXX"));
        }).toThrow("Número romano inválido");
      });
    
    test('debe lanzar un error por "IIV" (regla de no repetición de V después de sustracción)', () => {
        expect(() => {
          verificarSimbolosRomanos(strToArray("IVV"));
        }).toThrow("Número romano inválido");
    });
  });
});