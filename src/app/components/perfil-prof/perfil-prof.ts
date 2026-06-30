import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PerfilProfListar } from './perfil-prof-listar/perfil-prof-listar';
import {}

@Component({
  selector: 'app-perfil-prof',
  imports: [PerfilProfListar],
  templateUrl: './perfil-prof.html',
  styleUrl: './perfil-prof.css',
})
export class PerfilProf {
  constructor(public route: ActivatedRoute){}
}
