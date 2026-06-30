<<<<<<< HEAD
export interface Cita{
    idCita: number;
    idUsuarioEmisor: number;
    idUsuarioReceptor: number;
    fechaCita: Date;
    motivo : string;
    horaCita: Date;
    estadoCita: string;
=======
import { Usuario } from "./usuario";

export class Cita{
    idCita: number = 0;
    fechaCita: Date = new Date();
    motivo : string = '';
    horaCita: Date = new Date();
    estadoCita: string = '';
    idUsuario: number = 0;
>>>>>>> origin/develop
}