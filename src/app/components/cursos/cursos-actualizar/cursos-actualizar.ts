import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  selector: 'app-cursos-actualizar',
  standalone: true,
  imports: [
    MatInputModule, 
    MatButtonModule, 
    ReactiveFormsModule, 
    MatSelectModule, 
    MatSnackBarModule,
    CommonModule,
    RouterLink
  ],  templateUrl: './cursos-actualizar.html',
  styleUrl: './cursos-actualizar.css',
})
export class CursosActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  cursoObj: Cursos = new Cursos();
  listaPerfiles: PerfilProf[] = [];
  idCursoSeleccionado: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private curS: CursosService,
    private pS: PerfilProfService,
    private router: Router,
    private route: ActivatedRoute, 
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

    this.pS.list().subscribe(data => {
      this.listaPerfiles = data;
    });

    this.route.params.subscribe(params => {
      this.idCursoSeleccionado = params['id'];
      
      if (this.idCursoSeleccionado) {
        this.curS.listId(this.idCursoSeleccionado).subscribe(data => {
          this.form.patchValue({
            tipoCurso: data.tipoCurso,
            nombreCurso: data.nombreCurso,
            descripcion: data.descripcion,
            objetivos: data.objetivos,
            idPerfilProfesional: data.perfilProfesional?.idPerfilProfesional
          });
        });
      }
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.cursoObj.idCursos = this.idCursoSeleccionado;
      this.cursoObj.tipoCurso = this.form.value.tipoCurso;
      this.cursoObj.nombreCurso = this.form.value.nombreCurso;
      this.cursoObj.descripcion = this.form.value.descripcion;
      this.cursoObj.objetivos = this.form.value.objetivos;
      
      (this.cursoObj as any).idPerfilProfesional = this.form.value.idPerfilProfesional;

      this.curS.update(this.cursoObj).subscribe({
        next: () => {
          this.snackBar.open('Curso actualizado correctamente', 'Cerrar', { duration: 3000 });
          this.curS.list().subscribe(data => this.curS.setList(data)); 
          this.router.navigate(['/cursos']);
        },
        error: () => {
          this.snackBar.open('Error al actualizar el curso', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}