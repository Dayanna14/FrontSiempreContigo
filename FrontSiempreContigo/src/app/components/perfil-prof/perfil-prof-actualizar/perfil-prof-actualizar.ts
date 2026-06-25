import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerfilProf } from '../../../models/perfil-prof';
import { PerfilProfService } from '../../../services/perfil-prof-service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-perfil-prof-actualizar',
  imports: [],
  templateUrl: './perfil-prof-actualizar.html',
  styleUrl: './perfil-prof-actualizar.css',
})
export class PerfilProfActualizar implements OnInit{

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
  this.route.params.subscribe((params: Params)=>{
    this.id = params['id'];
    this.initForm();
  });
this.form = this.formBuilder.group({
  codigo: [''],
  especialidad: ['', Validators.required],
  biografia: ['', Validators.required],
  idUsuario: ['', [Validators.required, Validators.pattern("^[0-9]+$")]]
});
}

aceptar():void{
  if (this.form.valid){

    this.perfilProf.idPerfilProfesional = this.form.value.codigo;
    this.perfilProf.especialidad = this.form.value.especialidad;
    this.perfilProf.usuario = {idUsuario: parseInt(this.form.value.idUsuario)};


    this.pP.update(this.perfilProf).subscribe({
      next: ()=>{
        this.router.navigate(['/perfilProfesional/actualiza'])
      }
    })
  }
}


initForm(){
  this.pP.listId(this.id).subscribe((data)=>{
    this.form.patchValue({
      codigo: data.idPerfilProfesional,
      especialidad: data.especialidad,
      biografia: data.biografia,
      idUsuario: data.usuario?.idUsuario

    });
  });
}

}
