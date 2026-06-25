import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerfilProf } from '../../../models/perfil-prof';
import { PerfilProfService } from '../../../services/perfil-prof-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-prof-insertar',
  imports: [],
  templateUrl: './perfil-prof-insertar.html',
  styleUrl: './perfil-prof-insertar.css',
})
export class PerfilProfInsertar implements OnInit{

  form: FormGroup = new FormGroup({});
  perfilprof: PerfilProf = new PerfilProf();


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
      idUsuario: ['', [Validators.required, Validators.pattern("^[0-9]+$")]]
    });
  }

  aceptar(): void{
    if (this.form.valid){
      this.perfilprof.especialidad = this.form.value.especialidad;
      this.perfilprof.biografia = this.form.value.biografia;
      this.perfilprof.usuario = { idUsuario: parseInt(this.form.value.idUsuario) };
      
      this.pP.insert(this.perfilprof).subscribe({
        next: ()=>{
          this.router.navigate(['/perfilProfesional/nuevo'])
        }
      });
    }
  }
}
