export class Chat {
    idMensaje: number = 0;
    usuarioEmisor: { idUsuario: number } = { idUsuario: 0 };
    usuarioReceptor: { idUsuario: number } = { idUsuario: 0 };
    contenidoMessage: string = '';
    fechaEnvio: string = '';
    horaEnvio: string = '';
    activo: boolean = false;
    programado: string = '';
}
