import { Component, OnInit } from '@angular/core';

import { Formulario } from '../../../models/formulario';
import { FormularioService } from '../../../services/formulario-service';
import { NavigationEnd, Router } from '@angular/router';

// Imports de Angular Material
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-formulario-listar',
  standalone: true,
  imports: [
    MatTableModule,  
    MatButtonModule  
  ],
  templateUrl: './formulario-listar.html',
  styleUrl: './formulario-listar.css',
})
export class FormularioListar implements OnInit {

  dataSource: MatTableDataSource<Formulario> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  constructor(
    private fS: FormularioService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.cargarFormulario();
    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationEnd){
        this.cargarFormulario();
      }
    });
  }

  cargarFormulario(){
    this.fS.list().subscribe({
      next:(data) =>{
        this.dataSource.data = data;
      },
    });
  }

  eliminar(id: number){
    this.fS.delete(id).subscribe(()=>{
      this.cargarFormulario(); 
    });
  }

}