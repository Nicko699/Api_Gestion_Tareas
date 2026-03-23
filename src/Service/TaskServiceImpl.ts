import { TaskPersistence } from "../Persistence/TaskPersistence.js";
import type { CreateTaskDTO } from "../Dto/TaskDto/CreateTaskRequestDto.js";
import type { CreateTaskResponseDto } from "../Dto/TaskDto/CreateTaskResponseDto.js";
import type { TaskResponseDTO } from "../Dto/TaskDto/TaskResponseDto.js";
import type { UpdateTaskDTO } from "../Dto/TaskDto/UpdateTaskRequestDto.js";
import type { UpdateTaskResponseDto } from "../Dto/TaskDto/UpdateTaskResponseDto.js";
import type { ITaskService } from "./ITaskService.js";
import { GlobalException } from "../Exception/GlobalException.js";

/**
 * Implementación del servicio de tareas, maneja la lógica de negocio relacionada con las tareas,
 * utilizando la persistencia para acceder a los datos de las tareas y aplicando la lógica necesaria.
 * @class TaskServiceImpl
 */
export class TaskServiceImpl implements ITaskService {

  private taskPersistence = new TaskPersistence();

  //crear tarea
  async createTask(usuarioId: number, createTask: CreateTaskDTO): Promise<CreateTaskResponseDto> {
    return this.taskPersistence.create({ ...createTask, usuarioId });
  }

  // obtener lista tareas 
  async getAllTasks(usuarioId: number): Promise<TaskResponseDTO[]> {
    return this.taskPersistence.findAllByUser(usuarioId);
  }

  //obtener tarea por id 
  async getTaskById(id: number, usuarioId: number): Promise<TaskResponseDTO> {
    const task = await this.taskPersistence.findByIdAndUser(id, usuarioId);
    if (!task) throw GlobalException.notFoundException("Tarea no encontrada");
    return task;
  }

  //actualizar tarea 
async updateTask(id: number, usuarioId: number, data: UpdateTaskDTO): Promise<UpdateTaskResponseDto> {
  const task = await this.taskPersistence.update(id, usuarioId, data);
  if (!task) throw GlobalException.notFoundException("Tarea no encontrada");

  return {
    id: task.id,
    titulo: task.titulo,
    descripcion: task.descripcion,
    estado: task.estado,
    fechaVencimiento: task.fechaVencimiento,
  };
}

//eliminar tarea
  async deleteTask(id: number, usuarioId: number): Promise<void> {
    const task = await this.taskPersistence.delete(id, usuarioId);
    if (!task) throw GlobalException.notFoundException("Tarea no encontrada");
  }
}