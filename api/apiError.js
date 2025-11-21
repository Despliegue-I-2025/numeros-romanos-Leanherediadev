export class ApiError extends Error{
    constructor(status,title,detail,type = "about:blank",extensions={}){
        super(detail);
        this.status = status;
        this.title = title;
        this.detail = detail;
        this.type = type;
        this.extensions = extensions;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class BadRequestError extends ApiError {
    constructor(detail, instancePath) {
      super(
        400,
        'Solicitud Inválida',
        detail,
        'https://numeros-romanos-leanherediadev.vercel.app/'
      );
      this.instance = instancePath;
    }
  }