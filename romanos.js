import express from "express";
import convertirEntradaRomanos from "./api/convertirEntradaRomanos.js";
import verificarEntradaRomanos from "./api/verificarEntradaRomanos.js";
import arabicToRoman from "./api/arabicToRoman.js";
import verificarEntradaDecimal from "./api/verificarEntradaDecimal.js";
import errorMiddleware from "./api/errorMiddleware.js";
import { BadRequestError } from "./api/apiError.js";
import cors from "cors";

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());


// ------------------------------
// GET /r2a  (Roman → Arabic)
// ------------------------------
app.get("/r2a", (req, res, next) => {
    try {
        const path = req.originalUrl;
        const RNUMBER = req.query.roman;

        if (!RNUMBER) {
            throw new BadRequestError(
                "Se necesita el parámetro 'roman'. Ejemplo: /r2a?roman=IV",
                "missing-query-param",
                path
            );
        }

        const arrayRomano = verificarEntradaRomanos(RNUMBER, path);
        const numero = convertirEntradaRomanos(arrayRomano, path);

        res.status(200).json({ arabic: numero });
    } catch (error) {
        next(error);
    }
});


// ------------------------------
// GET /a2r  (Arabic → Roman)
// ------------------------------
app.get("/a2r", (req, res, next) => {
    try {
        const path = req.originalUrl;
        const DNUMBER = req.query.arabic;

        if (!DNUMBER) {
            throw new BadRequestError(
                "Se necesita el parámetro 'arabic'. Ejemplo: /a2r?arabic=10",
                "missing-query-param",
                path
            );
        }

        const numeroDecimal = verificarEntradaDecimal(DNUMBER, path);
        const numeroRomano = arabicToRoman(numeroDecimal, path);

        res.status(200).json({ roman: numeroRomano });
    } catch (error) {
        next(error);
    }
});


// ------------------------------
// Middleware global de errores RFC 7807
// ------------------------------
app.use(errorMiddleware);


// ------------------------------
// Start server
// ------------------------------
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
