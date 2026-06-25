import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PerfilProf } from '../perfil-prof';
import { PerfilProfService } from '../../../services/perfil-prof-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-prof-listar',
  imports: [],
  templateUrl: './perfil-prof-listar.html',
  styleUrl: './perfil-prof-listar.css',
})
export class PerfilProfListar implements OnInit{
  dataSource: MatTableDataSource<PerfilProf> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

constructor(
  private pP: PerfilProfService,
  private router: Router
){}


ngOnInit(): void {
  
}


cargarPerfil(){
  this.pP.list().subscribe({
    next: (data)=>{
      this.dataSource.data= data;
    },
  });
}


eliminar(id:number){
  this.pP.delete(id).subscribe(()=>{
    this.pP.list().subscribe((data)=>{
      this.dataSource.data=data;
    });
  });
}

}
