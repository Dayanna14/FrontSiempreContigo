import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { switchMap } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Notificacion } from '../../../models/notificacion';
import { NotificacionService } from '../../../services/notificacion-service';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario-service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-notificacion-buscar',
  imports: [MatTableModule, 
    CommonModule, 
    MatIconModule, 
    ReactiveFormsModule, 
    MatSelectModule, 
    FormsModule],
  templateUrl: './notificacion-buscar.html',
  styleUrl: './notificacion-buscar.css',
})
export class NotificacionBuscar implements OnInit {
  dataSource: MatTableDataSource<Notificacion> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'mensaje', 'fecha', 'tipo'];
  
  listaUsuarios: Usuario[] = [];
  usuarioSeleccionadoId!: number;

  constructor(
    private nS: NotificacionService,
    private uS: UsuarioService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.uS.list().subscribe(data => {
      this.listaUsuarios = data;
    });
  }

  buscarNotificaciones() {
    if (!this.usuarioSeleccionadoId) {
      this.dataSource.data = [];
      return;
    }

    // Consumimos el endpoint para obtener las activas por usuario
    this.nS.listarActivas(this.usuarioSeleccionadoId).subscribe(data => {
      this.dataSource.data = data.sort((a, b) => b.idNotificacion - a.idNotificacion);
    });
  }

  marcarTodoLeido() {
    if (!this.usuarioSeleccionadoId) return;

    // Consumimos el endpoint de "Marcar todas como leídas"
    this.nS.leerTodo(this.usuarioSeleccionadoId).subscribe(() => {
      this.snackBar.open('Todas las notificaciones marcadas como leídas', 'Cerrar', { duration: 3000 });
      // Refrescamos la tabla (ahora debería salir vacía o actualizar su estado)
      this.buscarNotificaciones();
    });
  }
}
