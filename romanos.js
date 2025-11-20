// romanos.js

function arabicToRoman(num) {
  if (typeof num !== 'number' || Number.isNaN(num)) {
      throw new TypeError('El número debe ser un entero');
  }
  if (!Number.isInteger(num)) {
      throw new TypeError('El número debe ser entero');
  }
  if (num < 1 || num > 3999) {
      throw new RangeError('El número debe estar entre 1 y 3999');
  }

  const valores = [
      [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
      [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
      [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
  ];

  let resultado = "";
  for (const [valor, simbolo] of valores) {
      while (num >= valor) {
          resultado += simbolo;
          num -= valor;
      }
  }
  return resultado;
}

function romanToArabic(roman) {
  if (typeof roman !== 'string') {
      throw new TypeError('El parámetro debe ser una cadena');
  }

  roman = roman.toUpperCase().trim();
  if (roman.length === 0) {
      throw new Error('La cadena no puede estar vacía');
  }

  const valores = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 };

  if (!/^[IVXLCDM]+$/.test(roman)) {
      throw new Error('Número romano inválido');
  }

  const invalidas = ['IIII', 'VV', 'LL', 'DD'];
  if (invalidas.some(p => roman.includes(p))) {
      throw new Error('Repetición inválida en número romano');
  }

  let total = 0;
  let prev = 0;

  for (let i = roman.length - 1; i >= 0; i--) {
      const valor = valores[roman[i]];
      if (valor < prev) {
          total -= valor;
      } else {
          total += valor;
          prev = valor;
      }
  }

  // Valida formato estricto
  if (arabicToRoman(total) !== roman) {
      throw new Error('Número romano inválido o mal formado');
  }

  return total;
}

module.exports = { arabicToRoman, romanToArabic };
