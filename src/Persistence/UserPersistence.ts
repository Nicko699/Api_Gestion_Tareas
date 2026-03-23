import prisma from "../Config/Prisma.js";
import type { Usuario } from "@prisma/client";
/**
 * Clase de persistencia para usuarios, maneja las operaciones de acceso a datos relacionadas con los usuarios utilizando Prisma.
 * @class UserPersistence
 */
export class UserPersistence {

  async findByEmail(email: string): Promise<Usuario | null> {
    return prisma.usuario.findUnique({ where: { email } })
  }

  async findById(id: number): Promise<Usuario | null> {
    return prisma.usuario.findUnique({ where: { id } })
  }

  async create(data: { nombre: string; email: string; password: string }): Promise<Usuario> {
    return prisma.usuario.create({ data })
  }
}