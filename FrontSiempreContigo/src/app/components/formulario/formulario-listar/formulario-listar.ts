import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Formulario } from '../../../models/formulario';
import { FormularioService } from '../../../services/formulario-service';
import { NavigationEnd, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-formulario-listar',
  imports: [],
  templateUrl: './formulario-listar.html',
  styleUrl: './formulario-listar.css',
})
export class FormularioListar implements OnInit{

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
      this.fS.list().subscribe((data)=>{
        this.dataSource.data = data;
      });
    });
  }


}