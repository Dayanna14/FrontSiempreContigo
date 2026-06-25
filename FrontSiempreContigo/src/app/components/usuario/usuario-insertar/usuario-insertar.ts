import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-usuario-insertar',
  imports: [],
  templateUrl: './usuario-insertar.html',
  styleUrl: './usuario-insertar.css',
})
export class UsuarioInsertar implements OnInit{

  usuario: Usuario = new Usuario();
  form: FormGroup = new FormGroup({});

  constructor(
    private fI: UsuarioService,
    private router: Router,
    private formBuilder: FormBuilder
  ){}


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      tokenUnico: ['', Validators.required],
      username: ['', Validators.required],
      dni: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['',Validators.required],
      autorizacionFamiliar: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      contrasena: ['',Validators.required],
      estadoCuenta: ['', Validators.required],
      fechaPrimerAcceso: ['',Validators.required],
      tutorialCompletado: ['',Validators.required],
      fotoPerfil: ['', Validators.required],
      idRol: ['', [Validators.required, Validators.pattern("^[0-9]+$")]]
    });
  }


  
}
