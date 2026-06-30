import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AlertaListar } from './alerta-listar/alerta-listar';

@Component({
  selector: 'app-alerta',
  imports: [RouterOutlet,AlertaListar],
  templateUrl: './alerta.html',
  styleUrl: './alerta.css',
})
export class Alerta {
  constructor(public route: ActivatedRoute) { }
}
