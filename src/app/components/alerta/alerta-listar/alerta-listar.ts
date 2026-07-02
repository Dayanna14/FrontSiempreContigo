import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Alerta } from '../../../models/alerta';
import { AlertaService } from '../../../services/alerta-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alerta-listar',
  imports: [MatTableModule, 
    CommonModule, 
    MatIconModule, 
    RouterLink],
  templateUrl: './alerta-listar.html',
  styleUrl: './alerta-listar.css',
})
export class AlertaListar implements OnInit {
  dataSource: MatTableDataSource<Alerta> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'fechaAlerta', 'fechaAtendida', 'estado', 'observacion', 'tipo', 'usuario', 'acciones'];

  constructor(private aS: AlertaService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // Escucha los cambios reactivos del Subject
    this.aS.getList().subscribe(data => {
      this.dataSource.data = this.procesarDatos(data);
    });
    // Primera carga al abrir el componente
    this.aS.list().subscribe(data => this.aS.setList(data));
  }

  procesarDatos(data: Alerta[]): Alerta[] {
    return data
      .sort((a, b) => b.idAlerta - a.idAlerta) // Ordena de la más reciente a la más antigua
      .map(alerta => ({
        ...alerta,
        // Capitalizamos el estado por estética (ej: "PENDIENTE" -> "Pendiente")
        estadoAlerta: alerta.estadoAlerta ? alerta.estadoAlerta.charAt(0).toUpperCase() + alerta.estadoAlerta.slice(1).toLowerCase() : ''
      }));
  }

  eliminar(id: number) {
    this.aS.delete(id).subscribe(() => {
      this.snackBar.open('Alerta eliminada correctamente', 'Cerrar', { duration: 3000 });
      // Refrescamos la lista
      this.aS.list().subscribe(data => this.aS.setList(data));
    });
  }
}
