import { DateTime } from "luxon";
import { ErrorMessage } from "./ErrorMessage.js";
import type { Request, Response, NextFunction } from "express";
/**
 * Clase para manejar excepciones globales en la API. 
 * @extends Error
 * @method notFoundException - Crea una excepción personalizada para recursos no encontrados (404)
 * @method badRequestException - Crea una excepción personalizada para solicitudes inválidas (400)
 * @method unauthorizedException - Crea una excepción personalizada para accesos no autorizados (401)
 * @method handleException - Maneja cualquier excepción, verificando si es una instancia de GlobalException y respondiendo con el mensaje de error correspondiente. Si no es una instancia de GlobalException, responde con un mensaje de error genérico para errores internos del servidor (500).
 */
export class GlobalException extends Error {
    
    private errorMessage: ErrorMessage;

   constructor(status: number, typeError: string, message: string) {
    super(message);
    this.errorMessage = new ErrorMessage(DateTime.utc(), status, typeError, message);

    }

    public getErrorMessage(): ErrorMessage {

    return this.errorMessage;
}
       
    //excepcion personalizada para manejar errores de tipo Not Found
     static notFoundException(message = 'Recurso no encontrado'): GlobalException {
        return new GlobalException( 404, 'Not Found', message);
    }
    
    //excepcion personalizada para manejar errores de tipo Bad Request
    static badRequestException(message = 'Solicitud inválida'): GlobalException {
    return new GlobalException(400, 'Bad Request', message);
}
//excepcion personalizada para manejar errores de tipo Unauthorized
    static unauthorizedException(message = 'No autorizado'): GlobalException {
    return new GlobalException(401, 'Unauthorized', message);
}

  //excepcion personalizada para manejar errores de tipo Internal Server Error

    static handleException(error: Error, req: Request, res: Response, _next: NextFunction): void {
        
        if (error instanceof GlobalException) {

            const errorMessage = error.getErrorMessage()

            res.status(errorMessage.getStatus()).json({
                status:errorMessage.getStatus(),
                path:req.path, 
                typeError: errorMessage.getTypeError(),
                message:   errorMessage.getMessage(),
                timestamp: errorMessage.getTimestamp().toISO(),
            })
            return
        }

        res.status(500).json({
            status:    500,
            path:      req.path,
            typeError: 'Internal Server Error',
            message:   'Error interno del servidor',
            timestamp: new Date().toISOString(),
        })
    }
} 