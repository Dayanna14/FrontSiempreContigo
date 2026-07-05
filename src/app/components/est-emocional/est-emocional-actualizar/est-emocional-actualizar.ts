import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EstadoEmocional } from '../../../models/estado-emocional';
import { EstadoEmocionalservice } from '../../../services/estado-emocionalservice';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-est-emocional-actualizar',
  imports: [MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule],
  templateUrl: './est-emocional-actualizar.html',
  styleUrl: './est-emocional-actualizar.css',
})
export class EstEmocionalActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  reg: EstadoEmocional = new EstadoEmocional();
  id: number = 0;

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
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.initForm();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      fechaRegistro: ['', Validators.required],
      nivelBienestar: ['', Validators.required],
      tipoEstadoEmocional: ['', Validators.required],
      observacion: ['', [Validators.required, Validators.maxLength(200)]],
      idUsuario: ['', Validators.required],
      idPerfilProfesional: ['', Validators.required]
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.reg.idEstadoEmocional = this.form.value.codigo;
      this.reg.fechaRegistro = this.form.value.fechaRegistro;
      this.reg.nivelBienestar = parseInt(this.form.value.nivelBienestar);
      this.reg.tipoEstadoEmocional = this.form.value.tipoEstadoEmocional;
      this.reg.observacion = this.form.value.observacion;
      this.reg.usuario = { idUsuario: parseInt(this.form.value.idUsuario) };
      this.reg.perfilProfesional = { idPerfilProfesional: parseInt(this.form.value.idPerfilProfesional) };

      this.eeS.update(this.reg).subscribe({
        next: () => {
          this.router.navigate(['/est-emocional/lista']);
        }
      });
    }
  }

  initForm() {
    this.eeS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.idEstadoEmocional,
        fechaRegistro: data.fechaRegistro,
        nivelBienestar: data.nivelBienestar,
        tipoEstadoEmocional: data.tipoEstadoEmocional,
        observacion: data.observacion,
        idUsuario: data.usuario?.idUsuario,
        idPerfilProfesional: data.perfilProfesional?.idPerfilProfesional
      });
    });
  }
}