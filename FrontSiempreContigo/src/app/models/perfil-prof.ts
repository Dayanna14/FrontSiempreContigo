import { Usuario } from "./usuario";

export class PerfilProf {
    idPerfilProfesional: number = 0;
    especialidad: string = '';
    biografia: string = '';
    usuario: { idUsuario: number } = { idUsuario: 0 };
}
