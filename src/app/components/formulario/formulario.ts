import { Component } from '@angular/core';

import { FormularioListar } from './formulario-listar/formulario-listar';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-formulario',
  imports: [FormularioListar, RouterOutlet],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario {
  constructor(public route:ActivatedRoute){}
}
