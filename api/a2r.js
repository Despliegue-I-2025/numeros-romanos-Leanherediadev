// api/a2r.js
const { arabicToRoman } = require('../romanos');

module.exports = (req, res) => {
  const valor = req.query.arabic;

  if (!valor) {
    return res.status(400).json({
      error: 'Parametro "arabic" requerido.',
      code: 400
    });
  }

  if (!/^\d+$/.test(valor)) {
    return res.status(400).json({
      error: 'Formato inválido: debe ser un número entero positivo.',
      code: 400
    });
  }

  const arabicNumber = parseInt(valor, 10);

  if (arabicNumber < 1 || arabicNumber > 3999) {
    return res.status(400).json({
      error: 'Número arábigo inválido (debe estar entre 1 y 3999).',
      code: 400
    });
  }

  try {
    const romanNumeral = arabicToRoman(arabicNumber);
    return res.status(200).json({ roman: romanNumeral });
  } catch (err) {
    return res.status(400).json({
      error: err.message || 'Error en conversión.',
      code: 400
    });
  }
};
