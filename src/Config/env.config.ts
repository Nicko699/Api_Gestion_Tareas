import dotenv from 'dotenv'

dotenv.config()

/**
 * Clase de configuración de entorno, implementa el patrón singleton para cargar las variables de entorno una sola vez y proporcionar acceso global a ellas. Carga las variables de entorno desde un archivo .env y las expone como propiedades de la clase.
 * @class EnvConfig
 * @property {number} port - Puerto en el que se ejecuta la aplicación (por defecto 3000)
 * @property {string} jwtSecret - Clave secreta para firmar los tokens JWT
 * @property {string} dbUrl - URL de conexión a la base de datos
 * @method getInstance - Método estático para obtener la instancia de la configuración
 */
class EnvConfig {

  private static instance: EnvConfig;
 
  public readonly port: number;
  public readonly jwtSecret: string;
  public readonly dbUrl: string;

  private constructor() {

    this.port = Number(process.env.PORT) ?? 3000;
    this.jwtSecret = process.env.JWT_SECRET ?? '';
    this.dbUrl = process.env.DATABASE_URL ?? '';
  }
  
  public static getInstance(): EnvConfig {

    if (!EnvConfig.instance) {
      EnvConfig.instance = new EnvConfig();
    }

    return EnvConfig.instance;
  }
}

export default EnvConfig.getInstance();