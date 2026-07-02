import { PerfilProf } from "./perfil-prof";
import { Usuario } from "./usuario";

export class EstadoEmocional {
    idEstadoEmocional: number = 0;
  fechaRegistro: Date = new Date(); // Se manejará como Date en el frontend
  nivelBienestar: number = 0;
  tipoEstadoEmocional: string = '';
  observacion: string = '';
  usuario: Usuario = new Usuario();
  perfilProfesional: PerfilProf = new PerfilProf();
}

