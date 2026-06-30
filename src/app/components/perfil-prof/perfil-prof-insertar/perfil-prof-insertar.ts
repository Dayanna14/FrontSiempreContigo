import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
  selector: 'app-perfil-prof-insertar',
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
  templateUrl: './perfil-prof-insertar.html',
  styleUrl: './perfil-prof-insertar.css',
})
export class PerfilProfInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  perfilObj: PerfilProf = new PerfilProf();
  listaUsuarios: Usuario[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private pS: PerfilProfService,
    private uS: UsuarioService, 
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      especialidad: ['', [Validators.required, Validators.maxLength(50)]],
      biografia: ['', [Validators.required, Validators.maxLength(150)]],
      usuarioId: ['', Validators.required] 
    });

    this.uS.list().subscribe(data => {
      this.listaUsuarios = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.perfilObj.especialidad = this.form.value.especialidad;
      this.perfilObj.biografia = this.form.value.biografia;
            let u = new Usuario();
      u.idUsuario = this.form.value.usuarioId;
      this.perfilObj.usuario = u; 
      this.pS.insert(this.perfilObj).subscribe({
        next: () => {
          this.snackBar.open('Perfil registrado correctamente', 'Cerrar', { duration: 3000 });
          // Actualizamos la lista para que la tabla reaccione
          this.pS.list().subscribe(data => this.pS.setList(data)); 
          this.router.navigate(['/perfil-profesional']);
        },
        error: () => {
          this.snackBar.open('Error al registrar el perfil', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}