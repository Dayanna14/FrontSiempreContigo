import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cita } from '../../../models/cita';
import { CitaService } from '../../../services/cita-service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-cita-actualizar',
  imports: [],
  templateUrl: './cita-actualizar.html',
  styleUrl: './cita-actualizar.css',
})
export class CitaActualizar implements OnInit{

  form: FormGroup = new FormGroup({});
  cita: Cita = new Cita();
  id: number = 0;


  constructor(
    private cT:CitaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) =>{
      this.id = params['id'];
      this.initForm();
    });
  
    this.form = this.formBuilder.group({
      codigo: [0],
      idUsuario: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      fechaCita: ['', Validators.required],
      motivo: ['', [Validators.required, Validators.maxLength(500)]],
      horaCita: ['', Validators.required],
      estadoCita: ['', Validators.required]
    });
  }

  aceptar():void{
    if (this.form.valid){
      this.cita.idCita = this.form.value.codigo;
      this.cita.motivo = this.form.value.motivo;
      this.cita.estadoCita = this.form.value.estadoCita;
      this.cita.usuario = { idUsuario: parseInt(this.form.value.idUsuario) };
    
    this.cT.update(this.cita).subscribe({
      next: ()=>{
        this.router.navigate(['/citas/actualiza'])
      }
    });
    }
  }

  initForm(){
    this.cT.listId(this.id).subscribe((data)=>{
      this.form.patchValue({
        codigo: data.idCita,
        motivo: data.motivo,
        estadoCita: data.estadoCita,
        idUsuario: data.usuario?.idUsuario
      });
    });
  }

}
