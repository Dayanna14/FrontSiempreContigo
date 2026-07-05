export class Sesion {
    idSesion: number = 0; // Mapeado de ID_Sesion
    ordenCurso: number = 0; // Mapeado de orden_curso
    descripcionSesion: string = '';
    tituloSesion: string = '';
    cursos: { idCursos: number } = { idCursos: 0 };
}
