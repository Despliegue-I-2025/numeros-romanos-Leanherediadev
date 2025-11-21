import { BadRequestError } from "./apiError.js";

function verificarEntradaDecimal(string, path) {
  const numero = Number(string);

  if (isNaN(numero)) {
    throw new BadRequestError(
      "Número ingresado incorrecto: debe ser un número en sistema decimal.",
      path
    );
  }

  if (!Number.isInteger(numero)) {
    throw new BadRequestError(
      "Número ingresado incorrecto: el número debe ser un entero.",
      path
    );
  }

  if (numero < 1 || numero > 3999) {
    throw new BadRequestError(
      "Número ingresado incorrecto: debe estar entre 1 y 3999.",
      path
    );
  }

  return numero;
}

export default verificarEntradaDecimal;
