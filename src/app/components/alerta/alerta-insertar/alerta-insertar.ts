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
  alerta: Alerta = new Alerta();
  
  estados: string[] = ['Crítico', 'Moderado', 'Atendido', 'Pendiente'];
  tiposAlerta: string[] = ['Emocional', 'Física', 'Pánico', 'Sistema'];

  constructor(
    private aS: AlertaService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fechaHora: ['', Validators.required],
      fechaHoraAtendida: [''],
      estado: ['', Validators.required],
      tipo: ['', Validators.required],
      observacion: ['', [Validators.required, Validators.maxLength(500)]],
      idUsuario: ['', [Validators.required, Validators.pattern("^[0-9]+$")]]
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.alerta.fechaHoraAlerta = this.form.value.fechaHoraAlerta;
      this.alerta.fechaHoraAtendida = this.form.value.fechaHoraAtendida || null;
      this.alerta.estadoAlerta = this.form.value.estadoAlerta;
      this.alerta.tipoAlerta = this.form.value.tipoAlerta;
      this.alerta.observacion = this.form.value.observacion;
      this.alerta.usuario = { idUsuario: parseInt(this.form.value.idUsuario) };

      this.aS.insert(this.alerta).subscribe({
        next: () => {
          this.router.navigate(['/alertas/lista']);
        }
      });
    }
  }
}
