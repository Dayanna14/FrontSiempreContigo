import { Component, OnInit } from '@angular/core';
import { Rol } from '../../../models/rol';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Rolservice } from '../../../services/rolservice';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rol-listar',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatButtonModule, MatSnackBarModule],  
  templateUrl: './rol-listar.html',
  styleUrl: './rol-listar.css',
})
export class RolListarComponent implements OnInit {
  dataSource: MatTableDataSource<Rol> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  constructor(private rS: Rolservice, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cargarRoles();
  }

  cargarRoles() {
    this.rS.list().subscribe(data => {
      // Ordenar y Formatear
      const procesado = data
        .sort((a, b) => a.idRol - b.idRol)
        .map(r => ({
          ...r,
          nameRol: r.nameRol.charAt(0).toUpperCase() + r.nameRol.slice(1).toLowerCase()
        }));
      this.dataSource.data = procesado;
    });
  }

  eliminar(id: number) {
    this.rS.delete(id).subscribe(() => {
      this.snackBar.open('Rol eliminado correctamente', 'Cerrar', { duration: 3000 });
      this.cargarRoles();
    });
  }
}