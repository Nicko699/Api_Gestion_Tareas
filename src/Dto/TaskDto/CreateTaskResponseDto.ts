import { Estado } from '@prisma/client';
/**
 * DTO para la respuesta de la creación de tareas, 
 */
export interface CreateTaskResponseDto {

     id: number;
     titulo: string;
     descripcion: string;
     estado: Estado;
     fechaVencimiento: Date;
     usuarioId: number;

}