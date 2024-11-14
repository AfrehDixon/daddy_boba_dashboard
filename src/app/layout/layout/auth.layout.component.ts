import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="auth-layout">
      <router-outlet></router-outlet>
    </div>
  `,
  // styleUrl: './auth.layout.component.css'
})
export class LayoutComponent {

}
