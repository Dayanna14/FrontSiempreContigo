
import { Component, OnInit } from '@angular/core';
import { FormularioDTO } from '../../../models/formulario';
import { FormularioService } from '../../../services/formulario-service';
import { NavigationEnd, Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioService } from '../../../services/usuario-service';
import { Usuario } from '../../../models/usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-listar',
  standalone: true,
  imports: [
    MatTableModule,  
    MatButtonModule, CommonModule 
  ],
  templateUrl: './formulario-listar.html',
  styleUrl: './formulario-listar.css',
})
export class FormularioListar implements OnInit {

  dataSource: MatTableDataSource<FormularioDTO> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  usuario: Usuario[]=[];

  constructor(
    private uS: UsuarioService,
    private fS: FormularioService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.uS.list().subscribe(data=>{
      this.usuario = data;
    });
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

  getUsuarioNombre(id:number): string{
    return(
      this.usuario.find(fx=>fx.idUsuario === id)?.username || 'Sin proyecto'
    );
  }

}

