
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Cita } from '../../../models/cita';
import { CitaService } from '../../../services/cita-service';
import { NavigationEnd, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario-service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cita-listar',
  standalone: true,
  imports: [MatTableModule,MatButtonModule, CommonModule ],
  templateUrl: './cita-listar.html',
  styleUrl: './cita-listar.css',
})
export class CitaListar implements OnInit{
  dataSource: MatTableDataSource<Cita> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];
  usuario: Usuario[]=[];

  constructor(
    private cT: CitaService,
    private uS: UsuarioService,
    private router: Router
  ){}


  ngOnInit(): void {
    this.uS.list().subscribe(data =>{
      this.usuario = data;
    });
    
    this.cargarCitas();

    this.router.events.subscribe(event =>{
      if(event instanceof NavigationEnd){
        this.cargarCitas();
      }
      });
    }
  

  cargarCitas(){
    this.cT.list().subscribe({
      next: (data) =>{
        this.dataSource.data = data;
      }
    })
  }

  eliminar (id:number){
    this.cT.delete(id).subscribe(()=>{
      this.cT.list().subscribe((data)=>{
        this.dataSource.data=data;
      });
    })
  }


  getNombreUsuario(id: number):String{
    return(
      this.usuario.find(tx => tx.idUsuario === id)?.username || 'Sin proyecto'
    );
  }

}

