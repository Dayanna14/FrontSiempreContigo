import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'; 

import { PerfilProf } from '../../../models/perfil-prof';
import { PerfilProfService } from '../../../services/perfil-prof-service';
import { Usuario } from '../../../models/usuario';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-perfil-prof-insertar',
  standalone: true, 
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule, MatSelectModule, CommonModule
  ],
  templateUrl: './perfil-prof-insertar.html',
  styleUrl: './perfil-prof-insertar.css',
})
export class PerfilProfInsertar implements OnInit {

  form: FormGroup = new FormGroup({});
  perfilprof: PerfilProf = new PerfilProf(); 
  listasUsuario: Usuario[]=[];

  constructor(
    private pP: PerfilProfService,
    private router: Router,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idPerfilProfesional: [0],
      especialidad: ['', Validators.required],
      biografia: ['', Validators.required],
      usuarioN : ['', Validators.required]
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.perfilprof.especialidad = this.form.value.especialidad;
      this.perfilprof.biografia = this.form.value.biografia;
      this.perfilprof.idUsuario = this.form.value.projectN;
      
      this.pP.insert(this.perfilprof).subscribe({
        next: () => {
          
          this.router.navigate(['/perfil-prof/nuevo']); 
        }
      });
    }
  }
}