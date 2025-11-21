import arabicToRoman from '../api/arabicToRoman.js';

describe('arabicToRoman', () => {

  test('debe convertir 1 a "I"', () => {
    expect(arabicToRoman(1)).toBe("I");
  });

  test('debe convertir 3 a "III"', () => {
    expect(arabicToRoman(3)).toBe("III");
  });

  test('debe convertir 58 a "LVIII"', () => {
    expect(arabicToRoman(58)).toBe("LVIII");
  });

  test('debe convertir 15 a "XV"', () => {
    expect(arabicToRoman(15)).toBe("XV");
  });

  test('debe convertir 3000 a "MMM"', () => {
    expect(arabicToRoman(3000)).toBe("MMM");
  });

  test('debe convertir 4 a "IV"', () => {
    expect(arabicToRoman(4)).toBe("IV");
  });

  test('debe convertir 9 a "IX"', () => {
    expect(arabicToRoman(9)).toBe("IX");
  });

  test('debe convertir 40 a "XL"', () => {
    expect(arabicToRoman(40)).toBe("XL");
  });

  test('debe convertir 90 a "XC"', () => {
    expect(arabicToRoman(90)).toBe("XC");
  });

  test('debe convertir 400 a "CD"', () => {
    expect(arabicToRoman(400)).toBe("CD");
  });

  test('debe convertir 900 a "CM"', () => {
    expect(arabicToRoman(900)).toBe("CM");
  });

  test('debe convertir 444 a "CDXLIV"', () => {
    expect(arabicToRoman(444)).toBe("CDXLIV");
  });

  test('debe convertir 888 a "DCCCLXXXVIII"', () => {
    expect(arabicToRoman(888)).toBe("DCCCLXXXVIII");
  });

  test('debe convertir 1994 a "MCMXCIV"', () => {
    expect(arabicToRoman(1994)).toBe("MCMXCIV");
  });

  test('debe convertir 3999 a "MMMCMXCIX"', () => {
    expect(arabicToRoman(3999)).toBe("MMMCMXCIX");
  });

  test('debe convertir 0 a un string vacío', () => {
    expect(arabicToRoman(0)).toBe("");
  });

});

