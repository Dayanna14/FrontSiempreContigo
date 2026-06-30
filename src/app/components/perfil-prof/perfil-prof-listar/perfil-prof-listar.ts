import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'; 
import { MatButtonModule } from '@angular/material/button'; 
import { PerfilProf } from '../../../models/perfil-prof'; 
import { PerfilProfService } from '../../../services/perfil-prof-service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario-service';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-perfil-prof-listar',
  standalone: true, 
  imports: [
    MatTableModule, 
    MatButtonModule 
  ],
  templateUrl: './perfil-prof-listar.html',
  styleUrl: './perfil-prof-listar.css',
})
export class PerfilProfListar implements OnInit {
  dataSource: MatTableDataSource<PerfilProf> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  usuario: Usuario[]=[];
  constructor(
    private uS: UsuarioService,
    private pP: PerfilProfService,
    private router: Router
    
  ){}

  ngOnInit(): void {
  this.uS.list().subscribe(data =>{
    this.usuario = data;
  });
  this.cargarPerfil();

  this.router.events.subscribe(event =>{
    if(event instanceof NavigationEnd){
      this.cargarPerfil();
    }
  });
}

  cargarPerfil(){
    this.uS.list().subscribe({
      next: (data)=>{
        this.dataSource.data = data;
      },
    });
  }

  getProyectName(id:number): string{
  return(
    this.usuario.find(tas => tas.idUsuario === id)
    ?.username || 'Sin proyecto'
  );
}

  
  eliminar(id: number){ 
    this.pP.delete(id).subscribe(()=>{
      this.cargarPerfil(); 
    });
  }
}