import verificarSimbolosRomanos from "./verificarSimbolosRomanos.js";
import romanToArabic from "./romanToArabic.js";
import { BadRequestError } from "./apiError.js";
import arabicToRoman from "./arabicToRoman.js";

function convertirEntradaRomano(array, path) {
    // 1. Validación de símbolos
    verificarSimbolosRomanos(array, path);

    // 2. Convertir a decimal
    const NROMANO = romanToArabic(array, path);

    // 3. Generar la forma romana canónica
    const formaCanonica = arabicToRoman(NROMANO, path);

    // 4. Comparar con la entrada original
    const entradaOriginal = array.join("");

    if (formaCanonica !== entradaOriginal) {
        throw new BadRequestError(
            `El número romano no es canónico (mal formado). La forma correcta es: ${formaCanonica}`,
            "roman-not-canonical",  // <--- código RFC 7807
            path                     // <--- instance
        );
    }

    return NROMANO;
}

export default convertirEntradaRomano;
