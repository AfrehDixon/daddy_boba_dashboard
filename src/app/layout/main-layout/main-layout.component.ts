// main-layout.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [ SidebarComponent, RouterModule, CommonModule ],
  template: `
    <div class="layout-container">
      <app-sidebar></app-sidebar>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {}