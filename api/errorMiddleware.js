import {ApiError} from "./apiError.js";

function errorMiddleware(err,req,res,next){
    let status = err.status || 500;
    let responseBody = {};
    if(err instanceof ApiError){
        responseBody = {
            type : err.type,
            title : err.title,
            status : err.status,
            detail : err.detail,
            instance : err.instance || req.originalUrl,
            ...err.extensions
        };
        status = err.status;
    }
    else{
        responseBody = {
            type: 'about:blank',
            title: 'Error Interno del Servidor',
            status: 500,
            detail: 'Ocurrió un error inesperado.',
            instance: req.originalUrl
        };
    }
    res.status(status)
        .set('Content-Type', 'application/problem+json')
        .json(responseBody);
}

export default errorMiddleware;
