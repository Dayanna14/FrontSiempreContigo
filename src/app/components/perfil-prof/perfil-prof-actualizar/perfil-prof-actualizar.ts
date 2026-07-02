import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PerfilProf } from '../../../models/perfil-prof';
import { PerfilProfService } from '../../../services/perfil-prof-service';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-prof-actualizar',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './perfil-prof-actualizar.html',
  styleUrl: './perfil-prof-actualizar.css',
})
export class PerfilProfActualizar implements OnInit {

  form: FormGroup = new FormGroup({});
  perfilProf: PerfilProf = new PerfilProf(); 
  id: number = 0;

  constructor(
    private pP: PerfilProfService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    
    this.form = this.formBuilder.group({
      codigo: [''],
      especialidad: ['', Validators.required],
      biografia: ['', Validators.required],
      usuarioN : ['', Validators.required]
      
    });

    
    this.route.params.subscribe((params: Params)=>{
      this.id = params['id'];
      this.initForm();
    });
  }

  initForm(){
    this.pP.listId(this.id).subscribe((data)=>{
      this.form.patchValue({
        codigo: data.idPerfilProfesional, 
        especialidad: data.especialidad,
        biografia: data.biografia,
        usuario: data.idUsuario
      });
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.perfilProf.idPerfilProfesional = this.form.value.codigo;
      this.perfilProf.especialidad = this.form.value.especialidad;
      this.perfilProf.biografia = this.form.value.biografia; 
      this.perfilProf.idUsuario = this.form.value.projectN;

      this.pP.update(this.perfilProf).subscribe({
        next: ()=>{
          
          this.router.navigate(['/perfilProfesional/actualiza']); 
        }
      });
    }
  }
}