const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Romanos a Arabigos
app.get('/r2a', (req, res) => {
  const romanNumeral = req.query.roman;
  if (!romanNumeral) {
    return res.status(400).json({ 
      error: 'Parametro "roman" requerido.',
      code: 400
    });
  }

  const arabicNumber = romanToArabic(romanNumeral);
  if (arabicNumber === null) {
    return res.status(422).json({
        error: 'Número romano inválido.',
        code: 422 });
  }

  return res.json({ arabic: arabicNumber });
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

  const romanNumeral = arabicToRoman(arabicNumber);
  if (romanNumeral === null) {
    return res.status(422).json({ 
      error: 'Número arábigo inválido (debe estar entre 1 y 3999.',
      code: 422
    });
  }

  return res.json({ roman: romanNumeral });
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


function romanToArabic(roman) {
}

function arabicToRoman(arabic) {
}

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor de tateti escuchando en el puerto ${PORT}`);
  });
}


module.exports = { app, romanToArabic, arabicToRoman };
