import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cita } from '../../../models/cita';
import { Router } from '@angular/router'; 
import { CitaService } from '../../../services/cita-service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-cita-insertar',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule , MatButtonModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './cita-insertar.html',
  styleUrl: './cita-insertar.css',
})
export class CitaInsertar implements OnInit{

  form: FormGroup = new FormGroup({});
  cita: Cita = new Cita();  

  constructor(
    private cT:CitaService,
    private router: Router,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idCita: [0],
      idUsuario: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      fechaCita: ['', Validators.required],
      motivo: ['', [Validators.required, Validators.maxLength(500)]],
      horaCita: ['', Validators.required],
      estadoCita: ['', Validators.required]

    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.cita.horaCita = this.form.value.horaCita;
      this.cita.motivo = this.form.value.motivo;
      this.cita.estadoCita = this.form.value.estadoCita;
      this.cita.usuario = { idUsuario: parseInt(this.form.value.idUsuario) };
      
      
    }
  }


}
