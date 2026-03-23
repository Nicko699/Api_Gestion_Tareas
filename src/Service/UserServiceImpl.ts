import type{IUserService} from "./IUserService.js";
import type { CreateUserRequestDto } from "../Dto/UserDto/CreateUserRequestDto.js";
import type { CreateUserResponseDto } from "../Dto/UserDto/CreateUserResponseDto.js";
import { GlobalException } from "../Exception/GlobalException.js";
import { UserPersistence } from "../Persistence/UserPersistence.js";
import bcrypt from "bcrypt";
import type { LoginUserRequestDto } from "../Dto/UserDto/LoginUserRequestDto.js";
import type { LoginUserResponseDto } from "../Dto/UserDto/LoginUserResponseDto.js";
import envConfig from "../../src/Config/env.config.js";
import jwt from "jsonwebtoken";

/**
 * Implementación del servicio de usuarios, maneja la lógica de negocio relacionada con los usuarios,
 * utilizando la persistencia para acceder a los datos de los usuarios y aplicando la lógica necesaria.
 * @class UserServiceImpl
 */
export class UserServiceImpl implements IUserService {

    private repo: UserPersistence;

     constructor() {
        this.repo = new UserPersistence();
    }

   // Clave secreta para la generación de tokens Jwt
  private readonly SECRET = Buffer.from(envConfig.jwtSecret, "utf-8");
    

// Método para crear un nuevo usuario
 async createUser(createUserRequestDto: CreateUserRequestDto): Promise<CreateUserResponseDto> {
  

    const usuarioExists = await this.repo.findByEmail(createUserRequestDto.email);

  //verificamos si el correo electrónico ya está registrado
  if (usuarioExists) throw GlobalException.badRequestException("El correo electronico ya está registrado");

 // Si no existe, se hashea la contraseña y se crea el usuario
  const hashed = await bcrypt.hash(createUserRequestDto.password, 10);
  const usuario = await this.repo.create({ ...createUserRequestDto, password: hashed });

  return { id: usuario.id, nombre: usuario.nombre, email: usuario.email };

}

// Método para iniciar sesión de un usuario
async login(loginRequestDto: LoginUserRequestDto): Promise<LoginUserResponseDto> {

  const usuario = await this.repo.findByEmail(loginRequestDto.email);

// Verificamos si el usuario existe
  if (!usuario) throw GlobalException.notFoundException("Correo electrónico o contraseña inválidos");

// Si existe, se compara la contraseña proporcionada con la hasheada en la base de datos
  const isPasswordValid = await bcrypt.compare(loginRequestDto.password, usuario.password);

// Si la contraseña no es válida, se lanza una excepción
  if (!isPasswordValid) throw GlobalException.badRequestException("Correo electrónico o contraseña inválidos");

  // Si la contraseña es válida, generamos un token JWT con la información del usuario
  const accessToken = jwt.sign(
    { sub: usuario.id, email: usuario.email },
    this.SECRET,
    { expiresIn: "1h" }
  );

  return { acesstoken: accessToken, typeToken: "Bearer" };
}

}