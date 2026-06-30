import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EstadoEmocionalservice } from '../../../services/estado-emocionalservice';
import { Router } from '@angular/router';
import { EstadoEmocional } from '../../../models/estado-emocional';
@Component({
  selector: 'app-est-emocional-insertar',
  imports: [MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule],
  templateUrl: './est-emocional-insertar.html',
  styleUrl: './est-emocional-insertar.css',
})
export class EstEmocionalInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  reg: EstadoEmocional = new EstadoEmocional();
  
  // US002: Las 5 emociones requeridas con sus etiquetas
  emociones = [
    { value: 'Feliz', label: 'Feliz 😊' },
    { value: 'Triste', label: 'Triste 😢' },
    { value: 'Ansioso', label: 'Ansioso 😰' },
    { value: 'Motivado', label: 'Motivado 💪' },
    { value: 'Solo', label: 'Solo 😔' }
  ];

  niveles = [1, 2, 3, 4, 5];

  constructor(
    private eeS: EstadoEmocionalservice,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fechaRegistro: ['', Validators.required],
      nivelBienestar: ['', [Validators.required]],
      tipoEstadoEmocional: ['', Validators.required],
      observacion: ['', [Validators.required, Validators.maxLength(200)]],
      idUsuario: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      idPerfilProfesional: ['', [Validators.required, Validators.pattern("^[0-9]+$")]]
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.reg.fechaRegistro = this.form.value.fechaRegistro;
      this.reg.nivelBienestar = parseInt(this.form.value.nivelBienestar);
      this.reg.tipoEstadoEmocional = this.form.value.tipoEstadoEmocional;
      this.reg.observacion = this.form.value.observacion;
      this.reg.usuario = { idUsuario: parseInt(this.form.value.idUsuario) };
      this.reg.perfilProfesional = { idPerfilProfesional: parseInt(this.form.value.idPerfilProfesional) };

      this.eeS.insert(this.reg).subscribe({
        next: () => {
          this.router.navigate(['/est-emocional/lista']);
        }
      });
    }
  }
}