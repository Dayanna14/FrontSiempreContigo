import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Alerta } from '../../../models/alerta';
import { AlertaService } from '../../../services/alerta-service';

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
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'];

  constructor(private aS: AlertaService, private router: Router) {}

  ngOnInit(): void {
    this.cargarAlertas();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.cargarAlertas();
      }
    });
  }

  cargarAlertas() {
    this.aS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });
  }

  eliminar(id: number) {
    this.aS.delete(id).subscribe(() => {
      this.aS.list().subscribe((data) => {
        this.dataSource.data = data;
      });
    });
  }
}
