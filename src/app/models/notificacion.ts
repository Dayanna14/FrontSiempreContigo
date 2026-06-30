export class Notificacion {
    idNotificacion: number = 0;
    mensaje: string = '';
    fechaNotificacion: string = '';
    leido: boolean = false;
    activo: boolean = false;
    usuario: { idUsuario: number } = { idUsuario: 0 };
}
