import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

import { Usuario } from '../../../models/usuario';
import { Rol } from '../../../models/rol';
import { Rolservice } from '../../../services/rolservice';
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
  listaRoles: Rol[] = [];
  mensajeError: string = '';
  tieneFoto: boolean = false;

  onFotoChange() {
    if (!this.tieneFoto) {
      this.form.patchValue({ fotoPerfil: 'no' });
    } else {
      this.form.patchValue({ fotoPerfil: '' });
    }
  }

  constructor(
    private uS: UsuarioService,
    private rS: Rolservice,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.rS.list().subscribe(data => {
      this.listaRoles = data;
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      username: ['', Validators.required],
      contrasena: ['', Validators.required],
      dni: ['', [Validators.required, Validators.maxLength(8)]],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      tokenUnico: ['', Validators.required],
      fotoPerfil: ['', Validators.required],
      estadoCuenta: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      fechaPrimerAcceso: ['', Validators.required],
      autorizacionFamiliar: [false, Validators.required],
      tutorialCompletado: [false, Validators.required],
      idRol: ['', Validators.required]
    });
  }

  aceptar(): void {
    this.mensajeError = '';

    if (this.form.valid) {
      this.usuarioObj.idUsuario = this.form.value.codigo;
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

      console.log(JSON.stringify(this.usuarioObj)); 
      this.uS.update(this.usuarioObj).subscribe({
        next: () => {
          this.uS.list().subscribe(data => {
            this.uS.setList(data);
          });
          this.router.navigate(['/usuario']);
        }
      });
    } else {
      this.mensajeError = 'Verifique que todos los campos estén completos correctamente.';
      this.form.markAllAsTouched();
    }
  }

  init() {
    this.uS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.idUsuario,
        username: data.username,
        contrasena: data.contrasena,
        dni: data.dni,
        apellidoPaterno: data.apellidoPaterno,
        apellidoMaterno: data.apellidoMaterno,
        tokenUnico: data.tokenUnico,
        fotoPerfil: data.fotoPerfil,
        estadoCuenta: data.estadoCuenta,
        fechaNacimiento: data.fechaNacimiento,
        fechaPrimerAcceso: data.fechaPrimerAcceso,
        autorizacionFamiliar: data.autorizacionFamiliar,
        tutorialCompletado: data.tutorialCompletado,
        idRol: data.idRol 
      });
    });
  }
}