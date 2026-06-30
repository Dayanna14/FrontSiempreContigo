import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menucomponent } from './components/menu/menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Menucomponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('FrontSiempreContigo');
}
