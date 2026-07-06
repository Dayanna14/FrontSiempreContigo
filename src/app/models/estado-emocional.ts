export class EstadoEmocional {
    idEstadoEmocional: number = 0;
    fechaRegistro: string = '';
    nivelBienestar: number = 0;
    tipoEstadoEmocional: string = '';
    observacion: string = '';
    usuario: { idUsuario: number } = { idUsuario: 0 };
    perfilProfesional: { idPerfilProfesional: number } = { idPerfilProfesional: 0 };
}
