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
  alerta: Alerta = new Alerta();
  id: number = 0;

  estados: string[] = ['Crítico', 'Moderado', 'Atendido', 'Pendiente'];
  tiposAlerta: string[] = ['Emocional', 'Física', 'Pánico', 'Sistema'];

  constructor(
    private aS: AlertaService,
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
      fechaHoraAlerta: ['', Validators.required],
      fechaHoraAtendida: [''],
      estadoAlerta: ['', Validators.required],
      tipoAlerta: ['', Validators.required],
      observacion: ['', [Validators.required, Validators.maxLength(500)]],
      idUsuario: ['', [Validators.required, Validators.pattern("^[0-9]+$")]]
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.alerta.idAlerta = this.form.value.codigo;
      this.alerta.fechaHoraAlerta = this.form.value.fechaHoraAlerta;
      this.alerta.fechaHoraAtendida = this.form.value.fechaHoraAtendida || null;
      this.alerta.estadoAlerta = this.form.value.estadoAlerta;
      this.alerta.tipoAlerta = this.form.value.tipoAlerta;
      this.alerta.observacion = this.form.value.observacion;
      this.alerta.usuario = { idUsuario: parseInt(this.form.value.idUsuario) };

      this.aS.update(this.alerta).subscribe({
        next: () => {
          this.router.navigate(['/alertas/lista']);
        }
      });
    }
  }

  initForm() {
    // Nota: Dado que en tu backend mapeaste listId dentro de los métodos comunes pero no declaraste un endpoint GET personalizado por ID, 
    // asumimos el flujo estándar pasándole el id directo si se implementó dinámicamente en el backend.
    this.aS.list().subscribe((data) => {
      const alertaEdicion = data.find(x => x.idAlerta == this.id);
      if (alertaEdicion) {
        this.form.patchValue({
          codigo: alertaEdicion.idAlerta,
          fechaHoraAlerta: alertaEdicion.fechaHoraAlerta,
          fechaHoraAtendida: alertaEdicion.fechaHoraAtendida,
          estadoAlerta: alertaEdicion.estadoAlerta,
          tipoAlerta: alertaEdicion.tipoAlerta,
          observacion: alertaEdicion.observacion,
          idUsuario: alertaEdicion.usuario?.idUsuario
        });
      }
    });
  }
}
