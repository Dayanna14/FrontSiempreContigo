import { Component, OnInit } from '@angular/core';
import { Rol } from '../../../models/rol';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Rolservice } from '../../../services/rolservice';

@Component({
  selector: 'app-rol-listar',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink],
  templateUrl: './rol-listar.html',
  styleUrl: './rol-listar.css',
})
export class RolListarComponent implements OnInit {
  dataSource: MatTableDataSource<Rol> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];  
  constructor(private rS: Rolservice, private router: Router) { }

  ngOnInit(): void {
    this.cargarRoles();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.cargarRoles();
      }
    });
  }

  cargarRoles() {
    this.rS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      }
    });
  }

  eliminar(id: number) {
    this.rS.delete(id).subscribe(data => {
      this.rS.list().subscribe(data => {
        this.dataSource.data = data;
      })
    })
  }
}
