export class ProgSesion {
    idProgresoSesion: number = 0;
    progreso: number = 0;
    completa: boolean = false;
    fechaCompletado: string = '';
    sesion: { idSesion: number } = { idSesion: 0 }; // Mapeado de ID_Sesion
    usuarioCurso: { idUsuarioCurso: number } = { idUsuarioCurso: 0 };
}
