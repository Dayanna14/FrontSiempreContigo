import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Rol } from '../../../models/rol';
import { Rolservice } from '../../../services/rolservice';
@Component({
  selector: 'app-rol-insertar',
imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule
  ],  templateUrl: './rol-insertar.html',
  styleUrl: './rol-insertar.css',
})
export class RolInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  rolObj: Rol = new Rol();
  mensajeError: string = '';
  mensajeExito: string = '';

  constructor(
    private rS: Rolservice,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // Definimos el formulario con nombre y descripción del rol
    this.form = this.formBuilder.group({
      nombreRol: ['', [Validators.required, Validators.maxLength(50)]],
      descripcionRol: ['', [Validators.maxLength(200)]]
    });
  }

  aceptar(): void {
    this.mensajeError = '';
    this.mensajeExito = '';

    if (!this.form.valid) {
      this.mensajeError = 'Complete todos los campos requeridos antes de registrar el rol.';
      this.form.markAllAsTouched();
      return;
    }

    this.rolObj.nameRol = this.form.value.nombreRol;
    this.rolObj.descriptionRol = this.form.value.descripcionRol;
    console.log(JSON.stringify(this.rolObj));
    
    this.rS.insert(this.rolObj).subscribe({
      next: () => {
        this.mensajeExito = 'Rol registrado correctamente.';
        alert(this.mensajeExito);
        this.router.navigate(['/roles']);
      },
      error: () => {
        this.mensajeError = 'No se pudo registrar el rol. Verifique los datos e intente nuevamente.';
      }
    });
  }
}
