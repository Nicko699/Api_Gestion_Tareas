
/**
 * Archivo de tipos personalizados para Express, 
 * extiende la interfaz Request para incluir un objeto user con las propiedades sub y email, 
 * que representan el ID del usuario y su correo electrónico respectivamente. 
 * Esto es útil para manejar la autenticación y autorización en la API de gestión de tareas.
 * @file express.types.ts
 */
declare global {
  namespace Express {
    interface Request {
      user?: { sub: number; email: string };
    }
  }
}

export {};