import { DateTime } from 'luxon';

/**
 * Clase para representar un mensaje de error en la API.
 * Esta clase se utiliza para estructurar la respuesta de error que se envía al cliente cuando ocurre una excepción.
 * Contiene información sobre el error, como la marca de tiempo, el código de estado HTTP, el tipo de error y un mensaje descriptivo.
 * @class ErrorMessage
 */
export class ErrorMessage {

    private timestamp: DateTime;
    private status: number;
    private typeError: string;
    private message: string;

    constructor( timestamp: DateTime, status: number, typeError: string, message: string) {
        this.timestamp = timestamp;
        this.status = status;
        this.typeError = typeError;
        this.message = message;
    }

    public getTimestamp(): DateTime {
        return this.timestamp;
    }

    public getStatus(): number {
        return this.status;
    }


    public getTypeError(): string {
        return this.typeError;
    }

    public getMessage(): string {
        return this.message;
    }


    setTimestamp(timestamp: DateTime): void {
        this.timestamp = timestamp;
    }

    setStatus(status: number): void {
        this.status = status;
    }

    setTypeError(typeError: string): void {
        this.typeError = typeError;
    }

    setMessage(message: string): void {
        this.message = message;
    }

}