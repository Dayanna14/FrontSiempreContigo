import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Notificacion } from '../../../models/notificacion';
import { NotificacionService } from '../../../services/notificacion-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario-service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-notificacion-actualizar',
  imports: [MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule],
  templateUrl: './notificacion-actualizar.html',
  styleUrl: './notificacion-actualizar.css',
})
export class NotificacionActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  notificacionObj: Notificacion = new Notificacion();
  listaUsuarios: Usuario[] = [];
  idNotificacionSeleccionada: number = 0;

  tiposNotificaciones: string[] = ['Alerta', 'Cita', 'Sistema', 'Recordatorio', 'Mensajería'];

  constructor(
    private formBuilder: FormBuilder,
    private nS: NotificacionService,
    private uS: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      mensaje: ['', [Validators.required, Validators.maxLength(250)]],
      tipoNotificacion: ['', Validators.required],
      usuarioId: ['', Validators.required]
    });

    // Cargar catálogo de usuarios destinatarios
    this.uS.list().subscribe(data => this.listaUsuarios = data);

    // Capturar el ID de la URL de forma segura y rellenar el formulario
    this.route.params.subscribe(params => {
      this.idNotificacionSeleccionada = +params['id'];
      
      if (this.idNotificacionSeleccionada && !isNaN(this.idNotificacionSeleccionada)) {
        // Buscamos la lista completa para extraer el registro a modificar
        this.nS.list().subscribe(lista => {
          const encontrado = lista.find(n => n.idNotificacion === this.idNotificacionSeleccionada);
          if (encontrado) {
            this.notificacionObj = encontrado; // Guardamos copia original
            this.form.patchValue({
              mensaje: encontrado.mensaje,
              tipoNotificacion: encontrado.tipoNotificacion.charAt(0).toUpperCase() + encontrado.tipoNotificacion.slice(1).toLowerCase(),
              usuarioId: encontrado.usuario?.idUsuario
            });
          }
        });
      }
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.notificacionObj.idNotificacion = this.idNotificacionSeleccionada;
      this.notificacionObj.mensaje = this.form.value.mensaje;
      this.notificacionObj.tipoNotificacion = this.form.value.tipoNotificacion.toUpperCase();

      let u = new Usuario();
      u.idUsuario = this.form.value.usuarioId;
      this.notificacionObj.usuario = u;

      // Invoca al endpoint /Modificar mediante el servicio
      this.nS.update(this.notificacionObj).subscribe({
        next: () => {
          this.snackBar.open('Notificación actualizada con éxito', 'Cerrar', { duration: 3000 });
          this.nS.list().subscribe(data => this.nS.setList(data));
          this.router.navigate(['/notificacion/lista']);
        },
        error: () => {
          this.snackBar.open('Error al modificar la notificación', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
