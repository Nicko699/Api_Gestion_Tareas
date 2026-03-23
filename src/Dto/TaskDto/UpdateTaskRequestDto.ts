import { z } from 'zod';
import { Estado } from '@prisma/client';
/**
 * DTO para la actualización de tareas.
 * incluyendo validaciones utilizando Zod. 
 * Este DTO se utiliza para validar las solicitudes entrantes en el controlador de tareas.
 */
export const UpdateTaskRequestDto = z.object({
  titulo: z.string().min(1, 'El título es requerido').optional(),
  descripcion: z.string().min(1, 'La descripción es requerida').optional(),
  fechaVencimiento: z.coerce.date().optional(),
  estado: z.enum(Estado).optional(),
});

export type UpdateTaskDTO = z.infer<typeof UpdateTaskRequestDto>;