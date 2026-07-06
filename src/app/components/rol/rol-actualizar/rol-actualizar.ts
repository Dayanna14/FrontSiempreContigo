import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Rol } from '../../../models/rol';
import { Rolservice } from '../../../services/rolservice';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rol-actualizar',
imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    CommonModule
  ],  templateUrl: './rol-actualizar.html',
  styleUrl: './rol-actualizar.css',
})
export class RolActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  rolObj: Rol = new Rol();
  id: number = 0;
  mensajeError: string = '';

  constructor(
    private rS: Rolservice,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      nombreRol: ['', [Validators.required, Validators.maxLength(50)]],
      descripcionRol: ['', [Validators.maxLength(100)]]
    });
  }

  aceptar(): void {
    this.mensajeError = ''; 
    if (this.form.valid) {
      this.rolObj.idRol = this.form.value.codigo;
      this.rolObj.nameRol = this.form.value.nombreRol;
      this.rolObj.descriptionRol = this.form.value.descripcionRol;
      console.log(JSON.stringify(this.rolObj));
      this.rS.update(this.rolObj).subscribe({
        next: () => {
          this.snackBar.open('Rol actualizado correctamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/roles']);
        }
      });
    } else {
      this.mensajeError = 'Verifique los datos antes de actualizar.';
      this.form.markAllAsTouched();
    }
  }

  init() {
    this.rS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.idRol,
        nombreRol: data.nameRol,
        descripcionRol: data.descriptionRol
      });
    });
  }
}