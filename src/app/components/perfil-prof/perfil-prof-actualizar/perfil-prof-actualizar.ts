import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { PerfilProf } from '../../../models/perfil-prof';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario-service';
import { PerfilProfService } from '../../../services/perfil-prof-service';

@Component({
  selector: 'app-perfil-prof-actualizar',
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
  templateUrl: './perfil-prof-actualizar.html',
  styleUrl: './perfil-prof-actualizar.css',
})
export class PerfilProfActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  perfilObj: PerfilProf = new PerfilProf();
  listaUsuarios: Usuario[] = [];
  idPerfilSeleccionado: number = 0; 
  
  constructor(
    private formBuilder: FormBuilder,
    private pS: PerfilProfService,
    private uS: UsuarioService,
    private router: Router,
    private route: ActivatedRoute, 
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      especialidad: ['', [Validators.required, Validators.maxLength(50)]],
      biografia: ['', [Validators.required, Validators.maxLength(150)]],
      idUsuario: ['', Validators.required] 
    });

    this.uS.list().subscribe(data => {
      this.listaUsuarios = data;
    });

    this.route.params.subscribe(params => {
      this.idPerfilSeleccionado = params['id'];
      
      if (this.idPerfilSeleccionado) {
        this.pS.listId(this.idPerfilSeleccionado).subscribe(data => {
          this.form.patchValue({
            especialidad: data.especialidad,
            biografia: data.biografia,
            idUsuario: data.usuario?.idUsuario 
          });
        });
      }
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.perfilObj.idPerfilProfesional = this.idPerfilSeleccionado;
      this.perfilObj.especialidad = this.form.value.especialidad;
      this.perfilObj.biografia = this.form.value.biografia;
      
      (this.perfilObj as any).idUsuario = this.form.value.idUsuario;

      this.pS.update(this.perfilObj).subscribe({
        next: () => {
          this.snackBar.open('Perfil actualizado correctamente', 'Cerrar', { duration: 3000 });
          this.pS.list().subscribe(data => this.pS.setList(data)); 
          this.router.navigate(['/perfilProfesional']);
        },
        error: () => {
          this.snackBar.open('Error al actualizar el perfil', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}