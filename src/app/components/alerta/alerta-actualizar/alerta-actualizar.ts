import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Alerta } from '../../../models/alerta';
import { AlertaService } from '../../../services/alerta-service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alerta-actualizar',
  imports: [MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule],
  templateUrl: './alerta-actualizar.html',
  styleUrl: './alerta-actualizar.css',
})
export class AlertaActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  alertaObj: Alerta = new Alerta();
  listaUsuarios: Usuario[] = [];
  idAlertaSeleccionada: number = 0; 
  
  tiposAlerta: string[] = ['S.O.S', 'Médica', 'Emocional', 'Seguimiento', 'Otro'];
  estadosAlerta: string[] = ['PENDIENTE', 'EN PROCESO', 'ATENDIDA'];

  constructor(
    private formBuilder: FormBuilder,
    private aS: AlertaService,
    private uS: UsuarioService,
    private router: Router,
    private route: ActivatedRoute, 
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      estadoAlerta: ['', [Validators.required, Validators.maxLength(50)]],
      observacion: ['', [Validators.required]],
      tipoAlerta: ['', [Validators.required, Validators.maxLength(50)]],
      usuarioId: ['', Validators.required],
      fechaHoraAlerta: [''] // Campo auxiliar para retener el valor original
    });

    this.uS.list().subscribe(data => {
      this.listaUsuarios = data;
    });

    this.route.params.subscribe(params => {
      this.idAlertaSeleccionada = params['id'];
      
      if (this.idAlertaSeleccionada) {
        // Buscamos en la lista general para encontrar la alerta por ID
        this.aS.list().subscribe(alertas => {
          const alerta = alertas.find(a => a.idAlerta == this.idAlertaSeleccionada);
          if (alerta) {
            this.alertaObj = alerta; // Respaldamos las fechas originales aquí
            this.form.patchValue({
              estadoAlerta: alerta.estadoAlerta,
              observacion: alerta.observacion,
              tipoAlerta: alerta.tipoAlerta,
              usuarioId: alerta.usuario?.idUsuario,
              fechaHoraAlerta: alerta.fechaHoraAlerta
            });
          }
        });
      }
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.alertaObj.idAlerta = this.idAlertaSeleccionada;
      this.alertaObj.estadoAlerta = this.form.value.estadoAlerta;
      this.alertaObj.observacion = this.form.value.observacion;
      this.alertaObj.tipoAlerta = this.form.value.tipoAlerta;
      
      // Si el estado cambia a ATENDIDA y no tenía fecha de atención, la asignamos ahora
      if (this.form.value.estadoAlerta === 'ATENDIDA' && !this.alertaObj.fechaHoraAtendida) {
        this.alertaObj.fechaHoraAtendida = new Date(); // o .toISOString() según tu modelo string/Date
      }

      let u = new Usuario();
      u.idUsuario = this.form.value.usuarioId;
      this.alertaObj.usuario = u; 

      this.aS.update(this.alertaObj).subscribe({
        next: () => {
          this.snackBar.open('Alerta actualizada correctamente', 'Cerrar', { duration: 3000 });
          this.aS.list().subscribe(data => this.aS.setList(data)); 
          this.router.navigate(['/alertas']);
        },
        error: () => {
          this.snackBar.open('Error al actualizar la alerta', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
