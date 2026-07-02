import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Alerta } from '../../../models/alerta';
import { AlertaService } from '../../../services/alerta-service';
import { switchMap } from 'rxjs';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-alerta-buscar',
  imports: [MatTableModule, 
    CommonModule, 
    MatIconModule, 
    ReactiveFormsModule, 
    MatSelectModule,
    MatRadioModule, // <-- Este habilita <mat-radio-group> y <mat-radio-button>
    FormsModule // <-- Este habilita el uso de [(ngModel)]],
    ],  
  templateUrl: './alerta-buscar.html',
  styleUrl: './alerta-buscar.css',
})
export class AlertaBuscar implements OnInit {
  dataSource: MatTableDataSource<Alerta> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  tipoSeleccionado: string = 'todos';

  constructor(private aS: AlertaService) { }

  ngOnInit(): void {
    this.cargarAlertas();
  }

  cargarAlertas() {
    this.aS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      }
    });
  }

  buscarPorTipo() {
    if (this.tipoSeleccionado === 'todos') {
      this.cargarAlertas();
      return;
    }

    this.aS.buscarPorTipo(this.tipoSeleccionado).subscribe({
      next: (data) => {
        this.dataSource.data = data;
      }
    });
  }
}
