import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PerfilProf } from '../../../models/perfil-prof';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PerfilProfService } from '../../../services/perfil-prof-service';
import { UsuarioService } from '../../../services/usuario-service';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-perfil-prof-listar',
  standalone: true, 
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterLink, CommonModule, MatSnackBarModule],
  templateUrl: './perfil-prof-listar.html',
  styleUrl: './perfil-prof-listar.css',
})
export class PerfilProfListar implements OnInit {
  dataSource: MatTableDataSource<PerfilProf> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'especialidad', 'biografia', 'usuario', 'acciones'];
  
  listaUsuarios: Usuario[] = [];

  constructor(
    private pS: PerfilProfService, 
    private uS: UsuarioService, 
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.uS.list().subscribe(data => {
      this.listaUsuarios = data;
    });
    this.pS.getList().subscribe(data => {
      this.dataSource.data = this.procesarDatos(data);
    });
    this.pS.list().subscribe(data => this.pS.setList(data));
  }

  obtenerNombreProfesional(idUsuario: number): string {
    const user = this.listaUsuarios.find(u => u.idUsuario === idUsuario);
    return user ? `${user.username} ${user.apellidoPaterno}` : 'Cargando...';
  }

  procesarDatos(data: PerfilProf[]): PerfilProf[] {
    return data
      .sort((a, b) => a.idPerfilProfesional - b.idPerfilProfesional)
      .map(p => ({
        ...p,
        especialidad: p.especialidad ? p.especialidad.charAt(0).toUpperCase() + p.especialidad.slice(1).toLowerCase() : ''
      }));
  }

  eliminar(id: number) {
    this.pS.delete(id).subscribe(() => {
      this.snackBar.open('Perfil eliminado correctamente', 'Cerrar', { duration: 3000 });
      this.pS.list().subscribe(data => this.pS.setList(data));
    });
  }
}