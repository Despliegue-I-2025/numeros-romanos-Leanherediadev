// test/romanos.test.js
const { romanToArabic, arabicToRoman } = require('../index');

describe('arabicToRoman', () => {
    test('convierte números básicos', () => {
        expect(arabicToRoman(1)).toBe('I');
        expect(arabicToRoman(4)).toBe('IV');
        expect(arabicToRoman(9)).toBe('IX');
        expect(arabicToRoman(58)).toBe('LVIII');
        expect(arabicToRoman(1994)).toBe('MCMXCIV');
    });

    test('valores límites', () => {
        expect(arabicToRoman(1)).toBe('I');
        expect(arabicToRoman(3999)).toBe('MMMCMXCIX');
    });

    test('entrada inválida', () => {
        expect(() => arabicToRoman(0)).toThrow(RangeError);
        expect(() => arabicToRoman(4000)).toThrow(RangeError);
        expect(() => arabicToRoman(3.14)).toThrow(TypeError);
        expect(() => arabicToRoman('10')).toThrow(TypeError);
    });
});

describe('romanToArabic', () => {
    test('convierte números básicos', () => {
        expect(romanToArabic('I')).toBe(1);
        expect(romanToArabic('IV')).toBe(4);
        expect(romanToArabic('iX')).toBe(9); // prueba con minúscula
        expect(romanToArabic('LVIII')).toBe(58);
        expect(romanToArabic('MCMXCIV')).toBe(1994);
    });

    test('elimina espacios y mayúsculas', () => {
        expect(romanToArabic('mmxix')).toBe(2019);
    });

    test('entrada inválida', () => {
        expect(() => romanToArabic('')).toThrow(); // cadena vacía
        expect(() => romanToArabic('A')).toThrow(); // símbolo inválido
        expect(() => romanToArabic(123)).toThrow(TypeError); // no es cadena
    });

    //  Tests agregados (validaciones estrictas de números romanos)
    test('rechaza repeticiones inválidas como IIII', () => {
        expect(() => romanToArabic('IIII')).toThrow();
    });

    test('rechaza VV', () => {
        expect(() => romanToArabic('VV')).toThrow();
    });

    test('rechaza LL', () => {
        expect(() => romanToArabic('LL')).toThrow();
    });

    test('rechaza DD', () => {
        expect(() => romanToArabic('DD')).toThrow();
    });
});

