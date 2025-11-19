// test/romanos.test.js
const { integerToRoman, romanToInteger } = require('../index');

describe('integerToRoman', () => {
    test('convierte números básicos', () => {
        expect(integerToRoman(1)).toBe('I');
        expect(integerToRoman(4)).toBe('IV');
        expect(integerToRoman(9)).toBe('IX');
        expect(integerToRoman(58)).toBe('LVIII');
        expect(integerToRoman(1994)).toBe('MCMXCIV');
    });

    test('valores límites', () => {
        expect(integerToRoman(1)).toBe('I');
        expect(integerToRoman(3999)).toBe('MMMCMXCIX');
    });

    test('entrada inválida', () => {
        expect(() => integerToRoman(0)).toThrow(RangeError);
        expect(() => integerToRoman(4000)).toThrow(RangeError);
        expect(() => integerToRoman(3.14)).toThrow(TypeError);
        expect(() => integerToRoman('10')).toThrow(TypeError);
    });
});

describe('romanToInteger', () => {
    test('convierte números básicos', () => {
        expect(romanToInteger('I')).toBe(1);
        expect(romanToInteger('IV')).toBe(4);
        expect(romanToInteger('iX')).toBe(9); // prueba con minúscula
        expect(romanToInteger('LVIII')).toBe(58);
        expect(romanToInteger('MCMXCIV')).toBe(1994);
    });

    test('elimina espacios y mayúsculas', () => {
        expect(romanToInteger('mmxix')).toBe(2019);
    });

    test('entrada inválida', () => {
        expect(() => romanToInteger('')).toThrow(); // cadena vacía
        expect(() => romanToInteger('A')).toThrow(); // símbolo inválido
        expect(() => romanToInteger(123)).toThrow(TypeError); // no es cadena
    });

    //  Tests agregados (validaciones estrictas de números romanos)
    test('rechaza repeticiones inválidas como IIII', () => {
        expect(() => romanToInteger('IIII')).toThrow();
    });

    test('rechaza VV', () => {
        expect(() => romanToInteger('VV')).toThrow();
    });

    test('rechaza LL', () => {
        expect(() => romanToInteger('LL')).toThrow();
    });

    test('rechaza DD', () => {
        expect(() => romanToInteger('DD')).toThrow();
    });
});
