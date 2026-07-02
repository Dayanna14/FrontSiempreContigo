import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { switchMap } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EstadoEmocional } from '../../../models/estado-emocional';
import { EstadoEmocionalservice } from '../../../services/estado-emocionalservice';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario-service';

@Component({
  selector: 'app-est-emocional-buscar',
  imports: [MatTableModule, 
    CommonModule, 
    MatIconModule, 
    ReactiveFormsModule, 
    MatSelectModule, 
    FormsModule],
  templateUrl: './est-emocional-buscar.html',
  styleUrl: './est-emocional-buscar.css',
})
export class EstEmocionalBuscar implements OnInit {
  dataSource: MatTableDataSource<EstadoEmocional> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  
  listaUsuarios: Usuario[] = [];
  usuarioSeleccionadoId!: number;

  constructor(
    private eeS: EstadoEmocionalservice,
    private uS: UsuarioService
  ) { }

  ngOnInit(): void {
    // Cargamos los usuarios disponibles para el filtro de selección
    this.uS.list().subscribe({
      next: (data) => {
        this.listaUsuarios = data;
      }
    });
  }

  filtrarPorPaciente() {
    if (!this.usuarioSeleccionadoId) {
      this.dataSource.data = [];
      return;
    }

    // Consumimos el endpoint US007 del backend por ID de paciente
    this.eeS.buscarHistorial(this.usuarioSeleccionadoId).subscribe({
      next: (data) => {
        this.dataSource.data = data.sort((a, b) => b.idEstadoEmocional - a.idEstadoEmocional);
      }
    });
  }
}
