// api/r2a.js
const { romanToArabic } = require('../romanos');

module.exports = (req, res) => {
  const romanNumeral = req.query.roman;

  if (!romanNumeral) {
    return res.status(400).json({
      error: 'Parametro "roman" requerido.',
      code: 400
    });
  }

  const validRomanRegex = /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i;
  if (!validRomanRegex.test(romanNumeral)) {
    return res.status(400).json({
      error: 'Número romano inválido.',
      code: 400
    });
  }

  try {
    const arabicNumber = romanToArabic(romanNumeral);
    return res.status(200).json({ arabic: arabicNumber });
  } catch (err) {
    return res.status(400).json({
      error: err.message || 'Error de conversión.',
      code: 400
    });
  }
};
