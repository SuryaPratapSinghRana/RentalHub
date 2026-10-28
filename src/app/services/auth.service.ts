import { Injectable, signal } from '@angular/core';
import { User } from '../models/models';
import { loadData, saveData } from './storage';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users: User[] = loadData<User[]>('rh_users', []);
  currentUser = signal<User | null>(loadData<User | null>('rh_current_user', null));

  constructor() {
    if (this.users.length === 0) {
      this.users = [
        { id: 1, name: 'Landlord Demo', email: 'landlord@test.com', password: 'Test@1234' },
        { id: 2, name: 'Renter Demo', email: 'renter@test.com', password: 'Test@1234' }
      ];
      saveData('rh_users', this.users);
    }
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }

  // returns an error message, or null when it worked
  register(name: string, email: string, password: string): string | null {
    const exists = this.users.some(u => u.email === email.toLowerCase());
    if (exists) {
      return 'This email is already registered';
    }
    const user: User = {
      id: Date.now(),
      name: name.trim(),
      email: email.toLowerCase(),
      password: password
    };
    this.users.push(user);
    saveData('rh_users', this.users);
    this.setCurrentUser(user);
    return null;
  }

  login(email: string, password: string): string | null {
    const user = this.users.find(u => u.email === email.toLowerCase() && u.password === password);
    if (!user) {
      return 'Invalid email or password';
    }
    this.setCurrentUser(user);
    return null;
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('rh_current_user');
  }

  private setCurrentUser(user: User): void {
    this.currentUser.set(user);
    saveData('rh_current_user', user);
  }
}
