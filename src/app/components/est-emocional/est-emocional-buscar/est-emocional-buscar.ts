import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { switchMap } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EstadoEmocional } from '../../../models/estado-emocional';
import { EstadoEmocionalservice } from '../../../services/estado-emocionalservice';

@Component({
  selector: 'app-est-emocional-buscar',
  imports: [MatTableModule, 
    CommonModule, 
    MatIconModule, 
    ReactiveFormsModule, 
    MatSelectModule],
  templateUrl: './est-emocional-buscar.html',
  styleUrl: './est-emocional-buscar.css',
})
export class EstEmocionalBuscar implements OnInit {
  dataSource: MatTableDataSource<EstadoEmocional> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  form: FormGroup;

  constructor(private eeS: EstadoEmocionalservice, private fb: FormBuilder) {
    this.form = this.fb.group({
      pacienteId: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    });
  }

  ngOnInit(): void {
    // Inicialmente carga todo el historial base
    this.eeS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });
  }

  buscar() {
    if (this.form.valid) {
      const id = this.form.value.pacienteId;
      this.eeS.buscarHistorialPorPaciente(id).subscribe((data) => {
        this.dataSource.data = data;
      });
    } else {
      this.eeS.list().subscribe((data) => {
        this.dataSource.data = data;
      });
    }
  }
}
