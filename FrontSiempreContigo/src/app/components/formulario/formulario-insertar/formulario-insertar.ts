import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Formulario } from '../../../models/formulario';
import { FormularioService } from '../../../services/formulario-service';
import { Route } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-insertar',
  imports: [],
  templateUrl: './formulario-insertar.html',
  styleUrl: './formulario-insertar.css',
})
export class FormularioInsertar implements OnInit{
  form: FormGroup = new FormGroup({});
  formulario: Formulario = new Formulario();


  constructor(
    private fI: FormularioService,
    private router: Router,
    private formBuilder: FormBuilder
  ){}


  ngOnInit(): void {
      this.form = this.formBuilder.group({
      mensaje: ['', Validators.required],
      correo: ['', Validators.required],
      idUsuario: ['', [Validators.required, Validators.pattern("^[0-9]+$")]]
      
    });
  }



  aceptar(): void{
    if(this.form.valid){
      this.formulario.mensaje = this.form.value.mensaje;
      this.formulario.correo = this.form.value.correo;
      this.formulario.usuario = {idUsuario: parseInt(this.form.value.idUsuario)};
    
    
      this.fI.insert(this.formulario).subscribe({
        next:()=>{
          this.router.navigate(['/Formulario/nuevo']);
        }
      });
    }
  }

}
