import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { EstadoEmocional } from '../../../models/estado-emocional';
import { EstadoEmocionalservice } from '../../../services/estado-emocionalservice';
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
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'];

  constructor(private eeS: EstadoEmocionalservice, private router: Router) {}

  ngOnInit(): void {
    this.cargarRegistros();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.cargarRegistros();
      }
    });
  }

  cargarRegistros() {
    this.eeS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });
  }

  eliminar(id: number) {
    this.eeS.delete(id).subscribe(() => {
      this.cargarRegistros();
    });
  }
}
