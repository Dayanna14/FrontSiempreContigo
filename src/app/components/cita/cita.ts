import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CitaListar } from './cita-listar/cita-listar';

@Component({
  selector: 'app-cita',
  imports: [CitaListar, RouterOutlet],
  templateUrl: './cita.html',
  styleUrl: './cita.css',
})
export class Cita {
  constructor(public route: ActivatedRoute){}
}

