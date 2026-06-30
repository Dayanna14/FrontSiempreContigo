import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { EstEmocionalListar } from './est-emocional-listar/est-emocional-listar';

@Component({
  selector: 'app-est-emocional',
  imports: [RouterOutlet, EstEmocionalListar],
  templateUrl: './est-emocional.html',
  styleUrl: './est-emocional.css',
})
export class EstEmocional {
  constructor(public route: ActivatedRoute) {}
}
