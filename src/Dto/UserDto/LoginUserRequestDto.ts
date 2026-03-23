import { z } from "zod"
/**
 * DTO para el inicio de sesión de usuarios.
 * incluyendo validaciones utilizando Zod. 
 * Este DTO se utiliza para validar las solicitudes entrantes en el controlador de autenticación.
 */
export const LoginUserRequestSchema = z.object({
  email:    z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Correo electrónico inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres")
})


export type LoginUserRequestDto = z.infer<typeof LoginUserRequestSchema>