import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Cursos } from '../../../models/cursos';
import { PerfilProf } from '../../../models/perfil-prof';
import { CursosService } from '../../../services/cursos-service';
import { PerfilProfService } from '../../../services/perfil-prof-service';

@Component({
  selector: 'app-cursos-insertar',
standalone: true,
  imports: [
    MatInputModule, 
    MatButtonModule, 
    ReactiveFormsModule, 
    MatSelectModule, 
    MatSnackBarModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './cursos-insertar.html',
  styleUrl: './cursos-insertar.css',
})
export class CursosInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  cursoObj: Cursos = new Cursos();
  listaPerfiles: PerfilProf[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private curS: CursosService,
    private pS: PerfilProfService, 
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      tipoCurso: ['', [Validators.required, Validators.maxLength(100)]],
      nombreCurso: ['', [Validators.required, Validators.maxLength(150)]],
      descripcion: ['', Validators.required],
      objetivos: ['', Validators.required],
      idPerfilProfesional: ['', Validators.required] 
    });

    // Cargamos la lista de Perfiles Profesionales
    this.pS.list().subscribe(data => {
      this.listaPerfiles = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.cursoObj.tipoCurso = this.form.value.tipoCurso;
      this.cursoObj.nombreCurso = this.form.value.nombreCurso;
      this.cursoObj.descripcion = this.form.value.descripcion;
      this.cursoObj.objetivos = this.form.value.objetivos;
      
      (this.cursoObj as any).idPerfilProfesional = this.form.value.idPerfilProfesional;

      this.curS.insert(this.cursoObj).subscribe({
        next: () => {
          this.snackBar.open('Curso registrado correctamente', 'Cerrar', { duration: 3000 });
          this.curS.list().subscribe(data => this.curS.setList(data)); 
          this.router.navigate(['/cursos']);
        },
        error: () => {
          this.snackBar.open('Error al registrar el curso', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}