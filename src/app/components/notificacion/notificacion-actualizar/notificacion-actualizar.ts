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
  notif: Notificacion = new Notificacion();
  id: number = 0;

  constructor(
    private nS: NotificacionService,
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
      mensaje: ['', [Validators.required, Validators.maxLength(255)]],
      fechaNotificacion: ['', Validators.required],
      leido: [false, Validators.required],
      activo: [true, Validators.required],
      idUsuario: ['', Validators.required]
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.notif.idNotificacion = this.form.value.codigo;
      this.notif.mensaje = this.form.value.mensaje;
      this.notif.fechaNotificacion = this.form.value.fechaNotificacion;
      this.notif.leido = this.form.value.leido;
      this.notif.activo = this.form.value.activo;
      this.notif.usuario = { idUsuario: parseInt(this.form.value.idUsuario) };

      this.nS.update(this.notif).subscribe({
        next: () => {
          this.router.navigate(['/notificacion/lista']);
        }
      });
    }
  }

  initForm() {
    this.nS.list().subscribe((data) => {
      const actual = data.find(x => x.idNotificacion == this.id);
      if (actual) {
        this.form.patchValue({
          codigo: actual.idNotificacion,
          mensaje: actual.mensaje,
          fechaNotificacion: actual.fechaNotificacion,
          leido: actual.leido,
          activo: actual.activo,
          idUsuario: actual.usuario?.idUsuario
        });
      }
    });
  }
}
