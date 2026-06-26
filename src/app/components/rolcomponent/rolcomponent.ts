import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { RolListarComponent } from './rol-listar/rol-listar';

@Component({
  selector: 'app-rolcomponent',
  standalone: true,
  imports: [RouterOutlet,RolListarComponent],
  templateUrl: './rolcomponent.html',
  styleUrls: ['./rolcomponent.css'],
})
export class Rolcomponent {
    constructor(public route: ActivatedRoute) { }
}
