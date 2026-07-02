import { Usuario } from "./usuario";

export class Notificacion {
   idNotificacion: number = 0;
  mensaje: string = '';
  fechaEnvio: Date = new Date();
  leido: boolean = false;
  tipoNotificacion: string = ''; // Ej. 'ALERTA', 'SISTEMA', 'CITA'
  usuario: Usuario = new Usuario(); // FK del usuario que recibe la notificación
}