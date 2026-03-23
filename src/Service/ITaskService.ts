import type { CreateTaskDTO } from "../Dto/TaskDto/CreateTaskRequestDto.js";
import type { UpdateTaskDTO } from "../Dto/TaskDto/UpdateTaskRequestDto.js";
import type { TaskResponseDTO } from "../Dto/TaskDto/TaskResponseDto.js";
import type { UpdateTaskResponseDto } from "../Dto/TaskDto/UpdateTaskResponseDto.js";
/**
 * Interfaz para el servicio de tareas. 
 * define los métodos que deben implementarse para manejar la lógica de negocio relacionada con las tareas.
 */
export interface ITaskService {

  createTask(usuarioId: number, createTaskDto: CreateTaskDTO): Promise<TaskResponseDTO>;

  getAllTasks(usuarioId: number): Promise<TaskResponseDTO[]>;

  getTaskById(id: number, usuarioId: number): Promise<TaskResponseDTO>;

  updateTask(id: number, usuarioId: number, updateTaskDto: UpdateTaskDTO): Promise<UpdateTaskResponseDto>;

  deleteTask(id: number, usuarioId: number): Promise<void>;

}