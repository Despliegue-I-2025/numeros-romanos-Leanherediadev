import { BadRequestError } from './apiError.js';

const ROMANOS_VALIDOS = ["I", "V", "X", "L", "C", "D", "M"];

function verificarEntradaRomanos(string, path) {

  // Validación: debe ser string no vacío
  if (typeof string !== "string" || string.trim().length === 0) {
    throw new BadRequestError(
      "Entrada inválida: debe ingresar un número romano no vacío.",
      path
    );
  }

  // Convertimos string en array de mayúsculas
  const arrayRomano = Array.from(string.toUpperCase());

  // Validación de caracteres
  arrayRomano.forEach(l => {
    if (!ROMANOS_VALIDOS.includes(l)) {
      throw new BadRequestError(
        `Entrada inválida: se encontró un símbolo romano no permitido: ${l}.`,
        path)
    }
  });

  return arrayRomano;
}

export default verificarEntradaRomanos;
