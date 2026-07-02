import { Usuario } from './usuario';
export class Alerta {
idAlerta: number = 0;
  fechaHoraAlerta: Date = new Date(); // Asegúrate de que no diga string
  fechaHoraAtendida: Date | null = null; // Asegúrate de que admita null
  estadoAlerta: string = '';
  observacion: string = '';
  tipoAlerta: string = '';
  usuario: Usuario = new Usuario();
}
