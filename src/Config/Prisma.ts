import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Configuración de Prisma, crea una instancia de PrismaClient utilizando el adaptador de PostgreSQL y la URL de conexión a la base de datos obtenida de las variables de entorno. Esta instancia se exporta para ser utilizada en toda la aplicación para interactuar con la base de datos.
 * @module Prisma
 */
const adapter = new PrismaPg({ connectionString: process.env["DATABASE_URL"] });

const prisma = new PrismaClient({ adapter });

export default prisma;