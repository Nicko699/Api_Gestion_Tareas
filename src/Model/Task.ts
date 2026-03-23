import { Estado } from './Enum/Estado.js';
import { Usuario } from './User.js';
/**
 * Clase que representa una tarea en la API de gestión de tareas.
 */
export class Task{

    public id!: number;
    public titulo!: string;
    public descripcion!: string;
    public estado!: Estado;
    public fechaVencimiento!: Date;
    public usuario!: Usuario;

}