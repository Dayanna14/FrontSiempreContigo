import { Component } from '@angular/core';
<<<<<<< HEAD

@Component({
  selector: 'app-usuario',
  imports: [],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
})
export class Usuario {}
=======
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-usuariocomponent',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
})
export class Usuariocomponent {}
>>>>>>> origin/develop
