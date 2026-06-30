import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../models/usuario';
import { Rol } from '../../../models/rol';
import { Rolservice } from '../../../services/rolservice';
import { UsuarioService } from '../../../services/usuario-service';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-usuario-insertar',
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
  templateUrl: './usuario-insertar.html',
  styleUrl: './usuario-insertar.css',
})
export class UsuarioInsertar implements OnInit {
  form: FormGroup = new FormGroup({});
  usuarioObj: Usuario = new Usuario();
  listaRoles: Rol[] = [];
  tieneFoto: boolean = false;
  passwordVisible: boolean = false;

  constructor(
    private uS: UsuarioService,
    private rS: Rolservice, 
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.rS.list().subscribe(data => {
      this.listaRoles = data;
    });

    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      dni: ['', [Validators.required, Validators.maxLength(8)]],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      fotoPerfil: [''] 
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
    if (this.form.valid) {
      this.usuarioObj.username = this.form.value.username;
      this.usuarioObj.contrasena = this.form.value.contrasena;
      this.usuarioObj.dni = this.form.value.dni;
      this.usuarioObj.apellidoPaterno = this.form.value.apellidoPaterno;
      this.usuarioObj.apellidoMaterno = this.form.value.apellidoMaterno;
      this.usuarioObj.tokenUnico = this.form.value.tokenUnico;
      this.usuarioObj.fotoPerfil = this.form.value.fotoPerfil;
      this.usuarioObj.estadoCuenta = this.form.value.estadoCuenta;
      this.usuarioObj.fechaNacimiento = this.form.value.fechaNacimiento;
      this.usuarioObj.fechaPrimerAcceso = this.form.value.fechaPrimerAcceso;
      this.usuarioObj.autorizacionFamiliar = this.form.value.autorizacionFamiliar;
      this.usuarioObj.tutorialCompletado = this.form.value.tutorialCompletado;
      this.usuarioObj.idRol = this.form.value.idRol;

      this.uS.insert(this.usuarioObj).subscribe({
        next: () => {
          // Actualizamos la tabla reactivamente y volvemos
          this.uS.list().subscribe(data => {
            this.uS.setList(data);
          });
          this.router.navigate(['/usuario']);
        }
      });
    }
  }
}