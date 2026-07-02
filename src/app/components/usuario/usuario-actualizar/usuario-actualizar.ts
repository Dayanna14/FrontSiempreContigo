import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario-service';
import { MatRadioModule } from '@angular/material/radio';
@Component({
  selector: 'app-usuario-actualizar',
standalone: true,
  imports: [
    FormsModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './usuario-actualizar.html',
  styleUrl: './usuario-actualizar.css',
})
export class UsuarioActualizar implements OnInit {
  form: FormGroup = new FormGroup({});
  usuarioObj: Usuario = new Usuario(); 
  id: number = 0;
  mensajeError: string = '';
  tieneFoto: boolean = false;

  constructor(
    private uS: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      fotoPerfil: [''] 
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });
  }

  init() {
    this.uS.listId(this.id).subscribe((data) => {
      this.usuarioObj = data; 

      this.tieneFoto = !!data.fotoPerfil && data.fotoPerfil !== 'no';

      this.form.patchValue({
        username: data.username,
        apellidoPaterno: data.apellidoPaterno,
        apellidoMaterno: data.apellidoMaterno,
        fotoPerfil: data.fotoPerfil
      });
    });
  }

  onFotoChange() {
    if (!this.tieneFoto) {
      this.form.patchValue({ fotoPerfil: 'no' });
    } else {
      this.form.patchValue({ fotoPerfil: '' });
    }
  }

  aceptar(): void {
    this.mensajeError = '';

    if (this.form.valid) {
      this.usuarioObj.username = this.form.value.username;
      this.usuarioObj.apellidoPaterno = this.form.value.apellidoPaterno;
      this.usuarioObj.apellidoMaterno = this.form.value.apellidoMaterno;
      this.usuarioObj.fotoPerfil = this.form.value.fotoPerfil;

      if ((this.usuarioObj as any).rol && (this.usuarioObj as any).rol.idRol) {
        this.usuarioObj.idRol = (this.usuarioObj as any).rol.idRol;
      }

      this.uS.update(this.usuarioObj).subscribe({
        next: () => {
          this.uS.list().subscribe(data => this.uS.setList(data));
          this.router.navigate(['/usuario']);
        },
        error: (err) => {
          console.error(err);
          this.mensajeError = 'Error al actualizar en la base de datos.';
        }
      });
    } else {
      this.mensajeError = 'Verifique que todos los campos estén completos correctamente.';
      this.form.markAllAsTouched();
    }
  }

}

