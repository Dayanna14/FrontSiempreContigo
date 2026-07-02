<<<<<<< HEAD
import { Component } from '@angular/core';

@Component({
  selector: 'app-usuario-listar',
  imports: [],
  templateUrl: './usuario-listar.html',
  styleUrl: './usuario-listar.css',
})
export class UsuarioListar {}
=======
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario-service';

@Component({
  selector: 'app-usuario-listar',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './usuario-listar.html',
  styleUrl: './usuario-listar.css',
})
export class UsuarioListar implements OnInit {
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'username', 'dni', 'estado', 'actualizar', 'eliminar']; 

  constructor(private uS: UsuarioService) { }

  ngOnInit(): void {
    this.uS.getList().subscribe(data => {
      this.dataSource.data = this.procesarDatos(data);
    });
    this.uS.list().subscribe(data => this.uS.setList(data));
  }

  procesarDatos(data: Usuario[]): Usuario[] {
    return data
      .sort((a, b) => a.idUsuario - b.idUsuario) 
      .map(u => ({
        ...u,
        username: u.username ? u.username.charAt(0).toUpperCase() + u.username.slice(1).toLowerCase() : '',
        apellidoPaterno: u.apellidoPaterno ? u.apellidoPaterno.charAt(0).toUpperCase() + u.apellidoPaterno.slice(1).toLowerCase() : '',
        apellidoMaterno: u.apellidoMaterno ? u.apellidoMaterno.charAt(0).toUpperCase() + u.apellidoMaterno.slice(1).toLowerCase() : ''
      }));
  }

  eliminar(id: number) {
    this.uS.delete(id).subscribe(() => {
      this.uS.list().subscribe(data => this.uS.setList(data));
    });
  }
}
>>>>>>> origin/develop
