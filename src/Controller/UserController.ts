import type { Request, Response, NextFunction } from "express";
import type { IUserService } from "../Service/IUserService.js";
import { CreateUserRequestSchema } from "../Dto/UserDto/CreateUserRequestDto.js";
import { LoginUserRequestSchema } from "../Dto/UserDto/LoginUserRequestDto.js";
import { validate } from "../Validators/Validate.js";

/**
 * @class UserController
 * @description Este controlador se encarga de manejar las solicitudes HTTP relacionadas con los usuarios.
 * Utiliza el servicio de usuario para realizar las operaciones necesarias y devuelve las respuestas correspondientes.
 */
export class UserController {

  constructor(private readonly userService: IUserService) {}

  async createUser(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const createUserDto = validate(CreateUserRequestSchema, req.body);
    const result = await this.userService.createUser(createUserDto);
    res.status(201).json(result);
  }

  async login(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const loginUserDto = validate(LoginUserRequestSchema, req.body);
    const result = await this.userService.login(loginUserDto);
    res.status(200).json(result);
  }
}