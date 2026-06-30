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
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];

  constructor(private nS: NotificacionService, private router: Router) {}

  ngOnInit(): void {
    this.cargarNotificaciones();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.cargarNotificaciones();
      }
    });
  }

  cargarNotificaciones() {
    this.nS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });
  }

  eliminar(id: number) {
    this.nS.delete(id).subscribe(() => {
      this.cargarNotificaciones();
    });
  }
}

