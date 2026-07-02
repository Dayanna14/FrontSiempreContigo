import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { EstadoEmocional } from '../../../models/estado-emocional';
import { EstadoEmocionalservice } from '../../../services/estado-emocionalservice';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-est-emocional-listar',
  imports: [MatTableModule, 
    CommonModule, 
    MatIconModule, 
    RouterLink],
  templateUrl: './est-emocional-listar.html',
  styleUrl: './est-emocional-listar.css',
})
export class EstEmocionalListar implements OnInit {
  dataSource: MatTableDataSource<EstadoEmocional> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'fecha', 'bienestar', 'tipo', 'observacion', 'usuario', 'profesional', 'acciones'];

  constructor(private eeS: EstadoEmocionalservice, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // Escucha los cambios reactivos del Subject
    this.eeS.getList().subscribe(data => {
      this.dataSource.data = this.procesarDatos(data);
    });

    // Primera carga al abrir el componente
    this.eeS.list().subscribe(data => this.eeS.setList(data));
  }

  procesarDatos(data: EstadoEmocional[]): EstadoEmocional[] {
    return data
      .sort((a, b) => b.idEstadoEmocional - a.idEstadoEmocional) // Ordena de los más recientes primero
      .map(ee => ({
        ...ee,
        // Formateamos el tipo de estado emocional (ej: "ANSIEDAD" -> "Ansiedad")
        tipoEstadoEmocional: ee.tipoEstadoEmocional ? ee.tipoEstadoEmocional.charAt(0).toUpperCase() + ee.tipoEstadoEmocional.slice(1).toLowerCase() : 'N/A'
      }));
  }

  eliminar(id: number) {
    this.eeS.delete(id).subscribe(() => {
      this.snackBar.open('Registro emocional eliminado correctamente', 'Cerrar', { duration: 3000 });
      // Refrescamos la lista reactiva
      this.eeS.list().subscribe(data => this.eeS.setList(data));
    });
  }
}
