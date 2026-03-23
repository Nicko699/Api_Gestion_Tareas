import { Estado } from '@prisma/client';
/**
 * DTO para la respuesta de la actualización de tareas,
 */
export interface UpdateTaskResponseDto {

     id: number;
     titulo: string;
     descripcion: string;
     estado: Estado;
     fechaVencimiento: Date;

}