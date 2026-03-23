import { Estado } from '@prisma/client';
/**
 * DTO para la respuesta de una tarea
 */
export interface TaskResponseDTO {
  id: number;
  titulo: string;
  descripcion: string;
  estado: Estado;
  fechaVencimiento: Date;
}