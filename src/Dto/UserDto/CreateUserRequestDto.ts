import { z } from "zod"

/**
 * DTO para la creación de usuarios, define la estructura de los datos necesarios para crear un usuario,
 * incluyendo validaciones utilizando Zod. 
 * Este DTO se utiliza para validar las solicitudes entrantes en el controlador de usuarios.
 */
export const CreateUserRequestSchema = z.object({
  nombre:   z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email:    z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Correo electrónico inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres")
})

export type CreateUserRequestDto = z.infer<typeof CreateUserRequestSchema>