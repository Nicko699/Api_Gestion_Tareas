import { z } from 'zod';
import { Estado } from '@prisma/client';

/**
 * DTO para la creación de tareas, define la estructura de los datos necesarios para crear una tarea, 
 * incluyendo validaciones utilizando Zod. 
 * Este DTO se utiliza para validar las solicitudes entrantes en el controlador de tareas.
 * @module CreateTaskRequestDto
 * @property {string} titulo - Título de la tarea, es un campo requerido
 * @property {string} descripcion - Descripción de la tarea, es un campo requerido
 * @property {Date} fechaVencimiento - Fecha de vencimiento de la tarea, se convierte a tipo Date
 * @property {Estado} estado - Estado de la tarea, es un campo opcional que por defecto es PENDIENTE 
 */
export const CreateTaskRequestDto = z.object({
  titulo: z.string().min(1, 'El título es requerido'),
  descripcion: z.string().min(1, 'La descripción es requerida'),
  fechaVencimiento: z.coerce.date(),
  estado: z.enum(Estado).default(Estado.PENDIENTE),
});

export type CreateTaskDTO = z.infer<typeof CreateTaskRequestDto>;