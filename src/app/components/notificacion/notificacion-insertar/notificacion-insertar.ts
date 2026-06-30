import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Notificacion } from '../../../models/notificacion';
import { NotificacionService } from '../../../services/notificacion-service';
import { Router } from '@angular/router';


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
  notif: Notificacion = new Notificacion();

  constructor(
    private nS: NotificacionService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      mensaje: ['', [Validators.required, Validators.maxLength(255)]],
      fechaNotificacion: ['', Validators.required],
      leido: [false, Validators.required],
      activo: [true, Validators.required],
      idUsuario: ['', [Validators.required, Validators.pattern("^[0-9]+$")]]
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.notif.mensaje = this.form.value.mensaje;
      this.notif.fechaNotificacion = this.form.value.fechaNotificacion;
      this.notif.leido = this.form.value.leido;
      this.notif.activo = this.form.value.activo;
      this.notif.usuario = { idUsuario: parseInt(this.form.value.idUsuario) };

      this.nS.insert(this.notif).subscribe({
        next: () => {
          this.router.navigate(['/notificacion/lista']);
        }
      });
    }
  }
}