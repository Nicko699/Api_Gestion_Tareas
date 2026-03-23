import type { Request, Response, NextFunction } from "express";
import type { ITaskService } from "../Service/ITaskService.js";
import { CreateTaskRequestDto } from "../Dto/TaskDto/CreateTaskRequestDto.js";
import { UpdateTaskRequestDto } from "../Dto/TaskDto/UpdateTaskRequestDto.js";
import { validate } from "../Validators/Validate.js";

/**
 * Controlador de tareas, maneja las solicitudes HTTP relacionadas con las tareas
 * @class TaskController
 */
export class TaskController {

  constructor(private readonly taskService: ITaskService) {}

  async createTask(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const usuarioId = req.user!.sub;
    const data = validate(CreateTaskRequestDto, req.body);
    const result = await this.taskService.createTask(usuarioId, data);
    res.status(201).json(result);
  }

  async getAllTasks(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const usuarioId = req.user!.sub;
    const result = await this.taskService.getAllTasks(usuarioId);
    res.status(200).json(result);
  }

  async getTaskById(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const usuarioId = req.user!.sub;
    const id = Number(req.params.id);
    const result = await this.taskService.getTaskById(id, usuarioId);
    res.status(200).json(result);
  }

  async updateTask(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const usuarioId = req.user!.sub;
    const id = Number(req.params.id);
    const data = validate(UpdateTaskRequestDto, req.body);
    const result = await this.taskService.updateTask(id, usuarioId, data);
    res.status(200).json(result);
  }

  async deleteTask(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const usuarioId = req.user!.sub;
    const id = Number(req.params.id);
    await this.taskService.deleteTask(id, usuarioId);
    res.status(204).send();
  }
}