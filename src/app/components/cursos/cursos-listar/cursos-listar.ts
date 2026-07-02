import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Cursos } from '../../../models/cursos';
import { CursosService } from '../../../services/cursos-service';
import { PerfilProfService } from '../../../services/perfil-prof-service';
import { UsuarioService } from '../../../services/usuario-service';
import { PerfilProf } from '../../../models/perfil-prof';
import { Usuario } from '../../../models/usuario';
@Component({
  selector: 'app-cursos-listar',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink, CommonModule, MatSnackBarModule],
  templateUrl: './cursos-listar.html',
  styleUrl: './cursos-listar.css',
})
export class CursosListar implements OnInit {
  dataSource: MatTableDataSource<Cursos> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'tipo', 'nombre', 'descripcion', 'perfil', 'acciones'];

  listaPerfiles: PerfilProf[] = [];
  listaUsuarios: Usuario[] = [];

  constructor(
    private curS: CursosService, 
    private pS: PerfilProfService, 
    private uS: UsuarioService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.pS.list().subscribe(data => this.listaPerfiles = data);
    this.uS.list().subscribe(data => this.listaUsuarios = data);

    this.curS.getList().subscribe(data => {
      this.dataSource.data = this.procesarDatos(data);
    });
    this.curS.list().subscribe(data => this.curS.setList(data));
  }

  obtenerResponsableCurso(idPerfil: number): string {
    const perfil = this.listaPerfiles.find(p => p.idPerfilProfesional === idPerfil);
    if (perfil) {
      const user = this.listaUsuarios.find(u => u.idUsuario === (perfil as any).idUsuario);
      return user ? `${user.username} ${user.apellidoPaterno}` : perfil.especialidad;
    }
    return 'Cargando...';
  }

  procesarDatos(data: Cursos[]): Cursos[] {
    return data
      .sort((a, b) => a.idCursos - b.idCursos)
      .map(c => ({
        ...c,
        tipoCurso: c.tipoCurso ? c.tipoCurso.charAt(0).toUpperCase() + c.tipoCurso.slice(1).toLowerCase() : '',
        nombreCurso: c.nombreCurso ? c.nombreCurso.charAt(0).toUpperCase() + c.nombreCurso.slice(1).toLowerCase() : ''
      }));
  }

  eliminar(id: number) {
    this.curS.delete(id).subscribe(() => {
      this.snackBar.open('Curso eliminado correctamente', 'Cerrar', { duration: 3000 });
      this.curS.list().subscribe(data => this.curS.setList(data));
    });
  }
}