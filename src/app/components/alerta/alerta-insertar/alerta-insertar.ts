import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertaService } from '../../../services/alerta-service';
import { Router } from '@angular/router';
import { Alerta } from '../../../models/alerta';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alerta-insertar',
  imports: [MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule],
  templateUrl: './alerta-insertar.html',
  styleUrl: './alerta-insertar.css',
})
export class AlertaInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  alertaObj: Alerta = new Alerta();
  listaUsuarios: Usuario[] = [];

  // Tipos predefinidos para simplificar la selección en la alerta
  tiposAlerta: string[] = ['S.O.S', 'Médica', 'Emocional', 'Seguimiento', 'Otro'];

  constructor(
    private formBuilder: FormBuilder,
    private aS: AlertaService,
    private uS: UsuarioService, 
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      estadoAlerta: ['PENDIENTE', [Validators.required, Validators.maxLength(50)]], // Por defecto inicia pendiente
      observacion: ['', [Validators.required]],
      tipoAlerta: ['', [Validators.required, Validators.maxLength(50)]],
      usuarioId: ['', Validators.required] 
    });

    this.uS.list().subscribe(data => {
      this.listaUsuarios = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      // Seteamos la fecha-hora actual del sistema de forma automática para fechaHoraAlerta
      this.alertaObj.fechaHoraAlerta = new Date();
      this.alertaObj.fechaHoraAtendida = null; // Al ser nueva, aún no se atiende

      this.alertaObj.estadoAlerta = this.form.value.estadoAlerta;
      this.alertaObj.observacion = this.form.value.observacion;
      this.alertaObj.tipoAlerta = this.form.value.tipoAlerta;

      // Solución limpia al error TS2740 asignando correctamente la instancia
      let u = new Usuario();
      u.idUsuario = this.form.value.usuarioId;
      this.alertaObj.usuario = u; 

      this.aS.insert(this.alertaObj).subscribe({
        next: () => {
          this.snackBar.open('Alerta registrada correctamente', 'Cerrar', { duration: 3000 });
          // Avisamos a la tabla para que se actualice dinámicamente
          this.aS.list().subscribe(data => this.aS.setList(data)); 
          this.router.navigate(['/alertas']); // Asegúrate de que coincida con tu ruta en app.routes
        },
        error: () => {
          this.snackBar.open('Error al registrar la alerta', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
