import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';       
import { RouterLink, RouterOutlet,  } from '@angular/router';

@Component({
  selector: 'app-menucomponent',
  standalone: true,
  imports: [MatToolbarModule, 
    MatIconModule, 
    MatButtonModule, 
    MatMenuModule, 
    RouterLink, 
    RouterOutlet],
  templateUrl: './menucomponent.html',
  styleUrls: ['./menucomponent.css'],
})
export class Menucomponent {}
