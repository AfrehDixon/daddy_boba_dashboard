// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent] ,
  template: '<router-outlet></router-outlet>',

  styleUrls: ['./app.component.css']
})
export class AppComponent { }