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
import { Usuario } from '../../../models/usuario';
import { PerfilProf } from '../../../models/perfil-prof';
import { UsuarioService } from '../../../services/usuario-service';
import { PerfilProfService } from '../../../services/perfil-prof-service';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  estEmocionalObj: EstadoEmocional = new EstadoEmocional();
  listaUsuarios: Usuario[] = [];
  listaProfesionales: PerfilProf[] = [];

  // Opciones estéticas predefinidas para el estado de ánimo
  tiposEmocionales: string[] = ['Alegre', 'Triste', 'Ansioso', 'Estresado', 'Enojado', 'Calmado', 'Neutro'];

  constructor(
    private formBuilder: FormBuilder,
    private eeS: EstadoEmocionalservice,
    private uS: UsuarioService, 
    private pS: PerfilProfService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nivelBienestar: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      tipoEstadoEmocional: ['', [Validators.required, Validators.maxLength(30)]],
      observacion: ['', [Validators.required, Validators.maxLength(200)]],
      usuarioId: ['', Validators.required],
      perfilProfesionalId: ['', Validators.required]
    });

    // Cargar pacientes
    this.uS.list().subscribe(data => {
      this.listaUsuarios = data;
    });

    // Cargar especialistas
    this.pS.list().subscribe(data => {
      this.listaProfesionales = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      // Seteo automático de la fecha y hora del registro
      this.estEmocionalObj.fechaRegistro = new Date();

      this.estEmocionalObj.nivelBienestar = parseInt(this.form.value.nivelBienestar);
      this.estEmocionalObj.tipoEstadoEmocional = this.form.value.tipoEstadoEmocional;
      this.estEmocionalObj.observacion = this.form.value.observacion;

      // Instancia limpia para la FK de Usuario
      let u = new Usuario();
      u.idUsuario = this.form.value.usuarioId;
      this.estEmocionalObj.usuario = u;

      // Instancia limpia para la FK de PerfilProfesional
      let p = new PerfilProf();
      p.idPerfilProfesional = this.form.value.perfilProfesionalId;
      this.estEmocionalObj.perfilProfesional = p;

      this.eeS.insert(this.estEmocionalObj).subscribe({
        next: () => {
          this.snackBar.open('Estado emocional registrado correctamente', 'Cerrar', { duration: 3000 });
          // Notificamos el cambio a la lista
          this.eeS.list().subscribe(data => this.eeS.setList(data)); 
          this.router.navigate(['/est-emocional/lista']);
        },
        error: () => {
          this.snackBar.open('Error al registrar el estado emocional', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}