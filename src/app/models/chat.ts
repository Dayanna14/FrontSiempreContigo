export class Chat {
    idMensaje: number = 0;
<<<<<<< HEAD
    usuarioEmisor: { idUsuario: number } = { idUsuario: 0 };
    usuarioReceptor: { idUsuario: number } = { idUsuario: 0 };
=======
    idUsuario: number = 0;
>>>>>>> origin/develop
    contenidoMessage: string = '';
    fechaEnvio: string = '';
    horaEnvio: string = '';
    activo: boolean = false;
    programado: string = '';
}
