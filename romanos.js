const express = require('express');
const cors = require('cors'); // Importar el paquete cors

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Habilitar CORS para todas las rutas

// Romanos a Arabigos
app.get('/r2a', (req, res) => {
  const romanNumeral = req.query.roman;
  if (!romanNumeral) {
    return res.status(400).json({ 
      error: 'Parametro "roman" requerido.',
      code: 400
    });
  }

  try {
    const arabicNumber = romanToArabic(romanNumeral);
    return res.status(200).json({ arabic: arabicNumber });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
      code: 400
    });
  }
});

// Arabigos a Romanos
app.get('/a2r', (req, res) => {
  const arabicNumber = parseInt(req.query.arabic, 10);
  if (isNaN(arabicNumber)) {
    return res.status(400).json({ 
      error: 'Parametro arabic requerido y debe ser un número.' ,
        code: 400
    });
  }

  try {
    const romanNumeral = arabicToRoman(arabicNumber);
    return res.status(200).json({ roman: romanNumeral });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
      code: 400
    });
  }
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    code: 404
  });
});

// Manejo de errores internos del servidor
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Error interno del servidor',
    code: 500
  });
});


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

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor de tateti escuchando en el puerto ${PORT}`);
  });
}


module.exports = { app, romanToArabic, arabicToRoman };
