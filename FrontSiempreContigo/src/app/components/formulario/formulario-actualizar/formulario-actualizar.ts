import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Formulario } from '../../../models/formulario';
import { FormularioService } from '../../../services/formulario-service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-formulario-actualizar',
  imports: [],
  templateUrl: './formulario-actualizar.html',
  styleUrl: './formulario-actualizar.css',
})
export class FormularioActualizar implements OnInit{

  form: FormGroup = new FormGroup({});
  formulario: Formulario = new Formulario();
  id: number = 0;



  constructor(

    private fS: FormularioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ){}


  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.initForm();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      mensaje: ['',Validators.required],
      correo: ['', Validators.required],
      idUsuario: ['', [Validators.required, Validators.pattern("^[0-9]+$")]]
    })
  }

aceptar():void{
  if(this.form.valid){
    this.formulario.idFormulario = this.form.value.codigo;
    this.formulario.mensaje = this.form.value.mensaje;
    this.formulario.correo = this.form.value.correo;
    this.formulario.usuario = { idUsuario: parseInt(this.form.value.idUsuario) };

    this.fS.update(this.formulario).subscribe({
      next:()=>{
        this.router.navigate(['Formulario']) // en revision
      }
    })
  }
}


initForm(){
  this.fS.list().subscribe((data)=>{
    const FormEdicion = data.find(x=> x.idFormulario == this.id);
    if(FormEdicion){
      this.form.patchValue({
        codigo: FormEdicion.idFormulario,
        mensaje: FormEdicion.mensaje,
        correo: FormEdicion.correo,
        idUsuario: FormEdicion.usuario?.idUsuario
      });
    }
  });
}

}
