import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('starts with nobody logged in', () => {
    expect(service.isLoggedIn()).toBe(false);
  });

  it('logs in with the test account', () => {
    expect(service.login('landlord@test.com', 'Test@1234')).toBeNull();
    expect(service.currentUser()?.name).toBe('Landlord Demo');
  });

  it('gives an error for a wrong password', () => {
    expect(service.login('landlord@test.com', 'wrong')).toBe('Invalid email or password');
    expect(service.isLoggedIn()).toBe(false);
  });

  it('registers a new user and logs them in', () => {
    expect(service.register('Sam', 'sam@mail.com', 'abc123')).toBeNull();
    expect(service.currentUser()?.email).toBe('sam@mail.com');
  });

  it('does not allow the same email twice', () => {
    service.register('Sam', 'sam@mail.com', 'abc123');
    service.logout();
    expect(service.register('Sam 2', 'sam@mail.com', 'abc123')).toBe('This email is already registered');
  });

  it('logout clears the user', () => {
    service.login('renter@test.com', 'Test@1234');
    service.logout();
    expect(service.currentUser()).toBeNull();
  });
});
