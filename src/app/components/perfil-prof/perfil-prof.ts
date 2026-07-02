import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

import { PerfilProfListar } from './perfil-prof-listar/perfil-prof-listar';


@Component({
  selector: 'app-perfil-prof',
  imports: [PerfilProfListar, RouterOutlet],
  templateUrl: './perfil-prof.html',
  styleUrl: './perfil-prof.css',
})
export class PerfilProf {
  constructor(public route: ActivatedRoute){
  }
}
