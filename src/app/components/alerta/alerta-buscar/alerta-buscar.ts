import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Alerta } from '../../../models/alerta';
import { AlertaService } from '../../../services/alerta-service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-alerta-buscar',
  imports: [MatTableModule, 
    CommonModule, 
    MatIconModule, 
    ReactiveFormsModule, 
    MatSelectModule],
  templateUrl: './alerta-buscar.html',
  styleUrl: './alerta-buscar.css',
})
export class AlertaBuscar implements OnInit {
  dataSource: MatTableDataSource<Alerta> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  form: FormGroup;
  
  tiposAlerta: string[] = ['Emocional', 'Física', 'Pánico', 'Sistema'];

  constructor(private aS: AlertaService, private fb: FormBuilder) {
    this.form = this.fb.group({
      fbusqueda: [''],
    });
  }

  ngOnInit(): void {
    this.aS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });

    this.form.get('fbusqueda')?.valueChanges.pipe(
      switchMap((tipo) => (tipo ? this.aS.searchTipo(tipo) : this.aS.list()))
    ).subscribe((data) => {
      this.dataSource.data = data;
    });
  }
}
