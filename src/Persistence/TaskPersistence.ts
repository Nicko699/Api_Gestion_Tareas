import prisma from "../Config/Prisma.js";
import type { Task } from "@prisma/client";
import type { CreateTaskDTO} from "../Dto/TaskDto/CreateTaskRequestDto.js";
import type { UpdateTaskDTO } from "../Dto/TaskDto/UpdateTaskRequestDto.js";

/**
 * Clase de persistencia para tareas, maneja las operaciones de acceso a datos relacionadas con las tareas utilizando Prisma.
 * @class TaskPersistence
 */
export class TaskPersistence {

  async findAllByUser(usuarioId: number): Promise<Task[]> {
    return prisma.task.findMany({ where: { usuarioId } });
  }

  async findByIdAndUser(id: number, usuarioId: number): Promise<Task | null> {
    return prisma.task.findFirst({ where: { id, usuarioId } });
  }

  async create(createTask: CreateTaskDTO & { usuarioId: number }): Promise<Task> {
    return prisma.task.create({ data: createTask });
  }

async update(id: number, usuarioId: number, updateTask: UpdateTaskDTO): Promise<Task | null> {
  const task = await this.findByIdAndUser(id, usuarioId);
  if (!task) return null;

  const cleanData = Object.fromEntries(
    Object.entries(updateTask).filter(([_, v]) => v !== undefined)
  );

  return prisma.task.update({ where: { id }, data: cleanData });
}

  async delete(id: number, usuarioId: number): Promise<Task | null> {
    const task = await this.findByIdAndUser(id, usuarioId);
    if (!task) return null;

    return prisma.task.delete({ where: { id } });
  }
}