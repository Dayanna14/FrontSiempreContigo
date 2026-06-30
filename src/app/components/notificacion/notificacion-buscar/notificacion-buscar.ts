import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { switchMap } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Notificacion } from '../../../models/notificacion';
import { NotificacionService } from '../../../services/notificacion-service';
@Component({
  selector: 'app-notificacion-buscar',
  imports: [MatTableModule, 
    CommonModule, 
    MatIconModule, 
    ReactiveFormsModule, 
    MatSelectModule],
  templateUrl: './notificacion-buscar.html',
  styleUrl: './notificacion-buscar.css',
})
export class NotificacionBuscar implements OnInit {
  dataSource: MatTableDataSource<Notificacion> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  form: FormGroup;
  userIdActual: number | null = null;

  constructor(private nS: NotificacionService, private fb: FormBuilder) {
    this.form = this.fb.group({
      usuarioId: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    });
  }

  ngOnInit(): void {
    // Inicialmente vacía o muestra la lista completa
    this.nS.list().subscribe(data => this.dataSource.data = data);
  }

  buscarAlertasActivas() {
    if (this.form.valid) {
      this.userIdActual = parseInt(this.form.value.usuarioId);
      this.nS.listActivas(this.userIdActual).subscribe((data) => {
        this.dataSource.data = data;
      });
    }
  }

  marcarTodoVisto() {
    if (this.userIdActual) {
      this.nS.leerTodo(this.userIdActual).subscribe(() => {
        // Refresca la lista de alertas activas del usuario posterior al limpiado
        this.nS.listActivas(this.userIdActual!).subscribe((data) => {
          this.dataSource.data = data;
        });
      });
    }
  }
}
