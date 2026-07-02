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
import { Usuario } from '../../../models/usuario';
import { PerfilProf } from '../../../models/perfil-prof';
import { UsuarioService } from '../../../services/usuario-service';
import { PerfilProfService } from '../../../services/perfil-prof-service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  estEmocionalObj: EstadoEmocional = new EstadoEmocional();
  listaUsuarios: Usuario[] = [];
  listaProfesionales: PerfilProf[] = [];
  idEstadoSeleccionado: number = 0;

  tiposEmocionales: string[] = ['Alegre', 'Triste', 'Ansioso', 'Estresado', 'Enojado', 'Calmado', 'Neutro'];

  constructor(
    private formBuilder: FormBuilder,
    private eeS: EstadoEmocionalservice,
    private uS: UsuarioService,
    private pS: PerfilProfService,
    private router: Router,
    private route: ActivatedRoute, 
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

    // Cargar Catálogos/Listas de llaves foráneas
    this.uS.list().subscribe(data => this.listaUsuarios = data);
    this.pS.list().subscribe(data => this.listaProfesionales = data);

    // Capturar ID de la ruta activa y recuperar el registro de la base de datos
    this.route.params.subscribe(params => {
      this.idEstadoSeleccionado = params['id'];
      
      if (this.idEstadoSeleccionado) {
        this.eeS.listId(this.idEstadoSeleccionado).subscribe(data => {
          this.estEmocionalObj = data; // Respaldamos el objeto original con su fechaRegistro original
          this.form.patchValue({
            nivelBienestar: data.nivelBienestar,
            tipoEstadoEmocional: data.tipoEstadoEmocional,
            observacion: data.observacion,
            usuarioId: data.usuario?.idUsuario,
            perfilProfesionalId: data.perfilProfesional?.idPerfilProfesional
          });
        });
      }
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.estEmocionalObj.idEstadoEmocional = this.idEstadoSeleccionado;
      this.estEmocionalObj.nivelBienestar = parseInt(this.form.value.nivelBienestar);
      this.estEmocionalObj.tipoEstadoEmocional = this.form.value.tipoEstadoEmocional;
      this.estEmocionalObj.observacion = this.form.value.observacion;

      let u = new Usuario();
      u.idUsuario = this.form.value.usuarioId;
      this.estEmocionalObj.usuario = u;

      let p = new PerfilProf();
      p.idPerfilProfesional = this.form.value.perfilProfesionalId;
      this.estEmocionalObj.perfilProfesional = p;

      this.eeS.update(this.estEmocionalObj).subscribe({
        next: () => {
          this.snackBar.open('Registro emocional actualizado con éxito', 'Cerrar', { duration: 3000 });
          this.eeS.list().subscribe(data => this.eeS.setList(data)); 
          this.router.navigate(['/est-emocional/lista']);
        },
        error: () => {
          this.snackBar.open('Error al actualizar el registro emocional', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}