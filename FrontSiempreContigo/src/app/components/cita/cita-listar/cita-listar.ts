import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Cita } from '../../../models/cita';
import { CitaService } from '../../../services/cita-service';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-cita-listar',
  standalone: true,
  imports: [MatTableModule,MatButtonModule ],
  templateUrl: './cita-listar.html',
  styleUrl: './cita-listar.css',
})
export class CitaListar implements OnInit{
  dataSource: MatTableDataSource<Cita> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];

  constructor(
    private cT: CitaService,
    private router: Router
  ){}


  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas(){
    this.cT.list().subscribe({
      next: (data) =>{
        this.dataSource.data = data;
      },
    });
  }

  eliminar (id:number){
    this.cT.delete(id).subscribe(()=>{
      this.cT.list().subscribe((data)=>{
        this.dataSource.data=data;
      });
    })
  }

}
