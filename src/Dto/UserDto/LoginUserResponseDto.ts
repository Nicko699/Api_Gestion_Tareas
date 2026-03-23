
/**
 * DTO para la respuesta del inicio de sesión de usuarios
 * incluyendo el token de acceso y el tipo de token. 
 * Este DTO se utiliza para estructurar la respuesta del controlador de autenticación.
 */
export interface LoginUserResponseDto {
  acesstoken: string;
  typeToken: string;
}