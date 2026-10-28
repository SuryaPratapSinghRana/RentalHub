import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, provideRouter, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  const runGuard = () =>
    TestBed.runInInjectionContext(() => authGuard({} as ActivatedRouteSnapshot, { url: '/create' } as RouterStateSnapshot));

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  it('allows a logged in user', () => {
    TestBed.inject(AuthService).login('renter@test.com', 'Test@1234');
    expect(runGuard()).toBe(true);
  });
});
