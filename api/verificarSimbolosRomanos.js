import { BadRequestError } from "./apiError.js";

function verificarSimbolosRomanos(array, path) {

    array.forEach((l, i) => {

        // --- Reglas de no repetición para V, L y D ---
        if (["V", "L", "D"].includes(l)) {
            if (array[i + 1] === l) {
                throw new BadRequestError(
                    "Número romano inválido",
                    "roman-invalid-group-vld",
                    path
                );
            }
        }

        // --- Reglas de repetición máxima para I, X, C y M ---
        if (["I", "X", "C", "M"].includes(l)) {
            if (
                array[i] === array[i + 1] &&
                array[i] === array[i + 2] &&
                array[i] === array[i + 3]
            ) {
                throw new BadRequestError(
                    "Número romano inválido",
                    "roman-invalid-group-four",
                    path
                );
            }
        }

    });
}

export default verificarSimbolosRomanos;
