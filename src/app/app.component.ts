import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html'
})
export class AppComponent {
  auth = inject(AuthService);
  private router = inject(Router);
  menuOpen = signal(false);

  logout(): void {
    this.auth.logout();
    this.menuOpen.set(false);
    this.router.navigate(['/']);
  }
}
