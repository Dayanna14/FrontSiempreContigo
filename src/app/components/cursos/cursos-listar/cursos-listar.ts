import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Cursos } from '../../../models/cursos';
import { CursosService } from '../../../services/cursos-service';
@Component({
  selector: 'app-cursos-listar',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink, CommonModule, MatSnackBarModule],  templateUrl: './cursos-listar.html',
  styleUrl: './cursos-listar.css',
})
export class CursosListar implements OnInit {
  dataSource: MatTableDataSource<Cursos> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'tipo', 'nombre', 'descripcion', 'perfil', 'acciones'];

  constructor(private curS: CursosService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.curS.getList().subscribe(data => {
      this.dataSource.data = this.procesarDatos(data);
    });
    this.curS.list().subscribe(data => this.curS.setList(data));
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