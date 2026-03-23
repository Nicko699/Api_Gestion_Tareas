import { z } from "zod"
import { GlobalException } from "../Exception/GlobalException.js"

/**
 * Función para validar datos utilizando un esquema de Zod.
 * Si la validación falla, se lanza una excepción personalizada con los errores detallados.
 * Si la validación es exitosa, se retorna el resultado validado.
 * @param schema - Esquema de Zod que define las reglas de validación para los datos.
 * @param data    - Datos a validar, pueden ser de cualquier tipo.
 * @returns  - El resultado validado si la validación es exitosa.
 */
export function validate<T>(schema: z.ZodType<T>, data: unknown): T {

  const result = schema.safeParse(data)

  // Si la validación falla, se lanza una excepción con los errores detallados
  if (!result.success) {

    //Obtenemos los errores de validación y los formateamos en un mensaje legible
     const mensaje = result.error.issues
      .map(issue => `${issue.path.join(".")}: ${issue.message}`)
      .join(" | ")

    // Lanzamos una excepción personalizada con el mensaje de error  
    throw GlobalException.badRequestException(mensaje)
  }
  
  // Si la validación es exitosa, se retorna el resultado validado
  return result.data
}