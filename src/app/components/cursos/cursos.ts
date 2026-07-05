import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CursosListar } from './cursos-listar/cursos-listar';

@Component({
  selector: 'app-cursos',
  imports: [RouterOutlet,CursosListar],
  templateUrl: './cursos.html',
  styleUrl: './cursos.css',
})
export class Cursos { 
  constructor(public route: ActivatedRoute) { }
}