 import { Task } from './Task.js';
 /**
  * Clase que representa un usuario en la API de gestión de tareas, 
  * con sus propiedades y relación con las tareas.
  */
 export class Usuario {

    public id!: number;
    public nombre!: string;
    public email!: string;
    public password!: string;
    public tasks!: Array<Task>;
    
    
}