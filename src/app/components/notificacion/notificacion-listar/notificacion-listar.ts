import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Notificacion } from '../../../models/notificacion';
import { NotificacionService } from '../../../services/notificacion-service';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-notificacion-listar',
  imports: [MatTableModule, 
    CommonModule, 
    MatIconModule, 
    RouterLink],
  templateUrl: './notificacion-listar.html',
  styleUrl: './notificacion-listar.css',
})
export class NotificacionListar  implements OnInit {
  dataSource: MatTableDataSource<Notificacion> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'mensaje', 'fecha', 'tipo', 'usuario', 'acciones'];

  constructor(
    private nS: NotificacionService, 
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Escuchar el estado reactivo del Subject
    this.nS.getList().subscribe(data => {
      this.dataSource.data = data.sort((a, b) => b.idNotificacion - a.idNotificacion);
    });

    // Primera carga inicial del listado general
    this.nS.list().subscribe(data => this.nS.setList(data));
  }

  eliminar(id: number) {
    this.nS.delete(id).subscribe(() => {
      this.snackBar.open('Notificación eliminada correctamente', 'Cerrar', { duration: 3000 });
      // Refrescar reactivamente
      this.nS.list().subscribe(data => this.nS.setList(data));
    });
  }
}

