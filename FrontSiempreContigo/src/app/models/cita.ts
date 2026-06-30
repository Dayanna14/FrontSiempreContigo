import { Usuario } from "./usuario";

export class Cita{
    idCita: number = 0;
    fechaCita: Date = new Date();
    motivo : string = '';
    horaCita: Date = new Date();
    estadoCita: string = '';
    idUsuario: number = 0;
}