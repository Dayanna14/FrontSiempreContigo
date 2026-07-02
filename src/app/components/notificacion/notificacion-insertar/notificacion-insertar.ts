import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Notificacion } from '../../../models/notificacion';
import { NotificacionService } from '../../../services/notificacion-service';
import { Router } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario-service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-notificacion-insertar',
  imports: [MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule],
  templateUrl: './notificacion-insertar.html',
  styleUrl: './notificacion-insertar.css',
})
export class NotificacionInsertar implements OnInit {
 form: FormGroup = new FormGroup({});
  notificacionObj: Notificacion = new Notificacion();
  listaUsuarios: Usuario[] = [];

  // Categorías estéticas para el tipo de alerta/aviso
  tiposNotificaciones: string[] = ['Alerta', 'Cita', 'Sistema', 'Recordatorio', 'Mensajería'];

  constructor(
    private formBuilder: FormBuilder,
    private nS: NotificacionService,
    private uS: UsuarioService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      mensaje: ['', [Validators.required, Validators.maxLength(250)]],
      tipoNotificacion: ['', Validators.required],
      usuarioId: ['', Validators.required]
    });

    // Cargar los usuarios para definir el destinatario
    this.uS.list().subscribe(data => {
      this.listaUsuarios = data;
      this.cdr.detectChanges();
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.notificacionObj.fechaEnvio = new Date();
      this.notificacionObj.mensaje = this.form.value.mensaje;
      this.notificacionObj.tipoNotificacion = this.form.value.tipoNotificacion.toUpperCase();

      // Instanciamos de forma limpia el Usuario (FK)
      let u = new Usuario();
      u.idUsuario = this.form.value.usuarioId;
      this.notificacionObj.usuario = u;

      this.nS.insert(this.notificacionObj).subscribe({
        next: () => {
          this.snackBar.open('Notificación emitida con éxito', 'Cerrar', { duration: 3000 });
          // Refrescamos la lista reactivamente antes de salir
          this.nS.list().subscribe(data => this.nS.setList(data));
          this.router.navigate(['/notificacion/lista']);
        },
        error: () => {
          this.snackBar.open('Error al registrar la notificación', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}