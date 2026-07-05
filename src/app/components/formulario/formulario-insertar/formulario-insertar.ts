import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormularioDTO } from '../../../models/formulario';
import { FormularioService } from '../../../services/formulario-service';
import { Router } from '@angular/router'; 
import {  MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario-service';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-formulario-insertar',
  imports: [
    MatIconModule,MatInputModule, MatButtonModule,ReactiveFormsModule, MatDatepickerModule, MatSelectModule, CommonModule, MatFormFieldModule,MatNativeDateModule
  ],
  templateUrl: './formulario-insertar.html',
  styleUrl: './formulario-insertar.css',
})
export class FormularioInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  formulario: FormularioDTO = new FormularioDTO(); 
  listasUsuario: Usuario[] = [];

  constructor(
    private fI: FormularioService,
    private uS: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {

    this.uS.list().subscribe((data)=>{
      this.listasUsuario = data
    });
    this.form = this.formBuilder.group({
      idFormulario: [0],
      mensaje: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]], 
      usuarioN: ['',Validators.required]
    });
  }

  aceptar(): void {
    if(this.form.valid){
      this.formulario.mensaje = this.form.value.mensaje;
      this.formulario.correo = this.form.value.correo;
      this.formulario.idUsuario = this.form.value.usuarioN;
    
      this.fI.insert(this.formulario).subscribe({
        next:()=>{
          
          this.router.navigate(['/formulario/nuevo']); 
        }
      });
    }
  }
}