import { PerfilProf } from './perfil-prof';
export class Cursos {
  idCursos: number = 0;
  tipoCurso: string = '';
  nombreCurso: string = '';
  descripcion: string = '';
  objetivos: string = '';
  perfilProfesional: PerfilProf = new PerfilProf();
}