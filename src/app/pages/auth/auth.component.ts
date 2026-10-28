import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  loginError = '';
  registerError = '';
  isLoginPage = signal(this.router.url.includes('/login') || this.router.url === '/auth');
  returnUrl = signal(this.route.snapshot.queryParamMap.get('returnUrl') ?? '/');

  constructor() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    if (returnUrl) {
      this.returnUrl.set(returnUrl);
    }
  }

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  registerForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/)]]
  });

  onLogin(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }
    const { email, password } = this.loginForm.getRawValue();
    const error = this.auth.login(email, password);
    if (error) {
      this.loginError = error;
    } else {
      this.router.navigateByUrl(this.returnUrl());
    }
  }

  onRegister(): void {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) {
      return;
    }
    const { name, email, password } = this.registerForm.getRawValue();
    const error = this.auth.register(name, email, password);
    if (error) {
      this.registerError = error;
    } else {
      this.router.navigateByUrl(this.returnUrl());
    }
  }
}
