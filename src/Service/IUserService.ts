import type { CreateUserRequestDto } from "../Dto/UserDto/CreateUserRequestDto.js";
import type { CreateUserResponseDto } from "../Dto/UserDto/CreateUserResponseDto.js";
import type { LoginUserRequestDto } from "../Dto/UserDto/LoginUserRequestDto.js";
import type { LoginUserResponseDto } from "../Dto/UserDto/LoginUserResponseDto.js";
/** 
 * Interfaz para el servicio de usuarios. 
 * Define los métodos que deben implementarse para manejar la lógica de negocio relacionada con los usuarios.
*/
export interface IUserService  {

 createUser(createUserRequestDto: CreateUserRequestDto): Promise<CreateUserResponseDto>;

 login(loginRequestDto: LoginUserRequestDto): Promise<LoginUserResponseDto>;

} 