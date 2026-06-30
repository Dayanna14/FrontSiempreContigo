export interface Cita{
    idCita: number;
    idUsuarioEmisor: number;
    idUsuarioReceptor: number;
    fechaCita: Date;
    motivo : string;
    horaCita: Date;
    estadoCita: string;
}