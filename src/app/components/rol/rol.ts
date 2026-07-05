import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { RolListar } from './rol-listar/rol-listar';

@Component({
  selector: 'app-rol',
  standalone: true,
  imports: [RouterOutlet,RolListar],
  templateUrl: './rol.html',
  styleUrl: './rol.css',
})
export class Rolcomponent {
    constructor(public route: ActivatedRoute) { }
}
