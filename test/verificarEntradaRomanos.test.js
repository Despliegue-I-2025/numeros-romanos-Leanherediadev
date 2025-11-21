import verificarEntradaRomanos from '../api/verificarEntradaRomanos.js';

describe('verificarEntradaRomanos', () => {

  describe('Casos de éxito', () => {
    test('debe devolver un array de caracteres para un string válido', () => {
      const input = "MCMXCIV";
      const expected = ['M', 'C', 'M', 'X', 'C', 'I', 'V'];

      expect(verificarEntradaRomanos(input, '/test')).toEqual(expected);
    });

    test('debe funcionar con un solo caracter', () => {
      expect(verificarEntradaRomanos("V", '/test')).toEqual(['V']);
    });
  });

  describe('Casos de error (lanzar Error)', () => {
    

    const TYPE_FAIL_MSG = "Entrada inválida: debe ingresar un número romano no vacío.";

    test('debe lanzar un error si el string está vacío', () => {
      expect(() => {
        verificarEntradaRomanos("", '/test');
      }).toThrow(TYPE_FAIL_MSG);
    });

    test('debe lanzar un error si el input no es un string (null)', () => {
      expect(() => {
        verificarEntradaRomanos(null, '/test');
      }).toThrow(TYPE_FAIL_MSG);
    });

    test('debe lanzar un error si el input no es un string (number)', () => {
      expect(() => {
        verificarEntradaRomanos(1994, '/test');
      }).toThrow(TYPE_FAIL_MSG);
    });

    test('debe lanzar un error si el input no es un string (undefined)', () => {
      expect(() => {
        verificarEntradaRomanos(undefined, '/test');
      }).toThrow(TYPE_FAIL_MSG);
    });

    test('debe lanzar un error si el input es un array', () => {
        expect(() => {
          verificarEntradaRomanos(['M'], '/test');
        }).toThrow(TYPE_FAIL_MSG);
      });
    
    test('debe lanzar un error si el input es un objeto', () => {
        expect(() => {
          verificarEntradaRomanos({a: 1}, '/test');
        }).toThrow(TYPE_FAIL_MSG);
      });


    const SYMBOL_FAIL_MSG_PREFIX = "Entrada inválida: se encontró un símbolo romano no permitido:";

    test('debe lanzar un error si contiene caracteres inválidos', () => {
      expect(() => {
        verificarEntradaRomanos("MCMA", '/test');
      }).toThrow(SYMBOL_FAIL_MSG_PREFIX);
    });
    test('debe lanzar un error si contiene números (como string)', () => {
      expect(() => {
        verificarEntradaRomanos("MCM10", '/test');
      }).toThrow(SYMBOL_FAIL_MSG_PREFIX);
    });

    test('debe lanzar un error si contiene espacios', () => {
      expect(() => {
        verificarEntradaRomanos("M CM", '/test');
      }).toThrow(SYMBOL_FAIL_MSG_PREFIX);
    });
  });
});