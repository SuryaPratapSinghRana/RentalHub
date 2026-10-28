import { routes } from './app.routes';
import { authGuard } from './guards/auth.guard';

// checks the route setup of the app
describe('App routes', () => {
  const find = (path: string) => routes.find(r => r.path === path);

  it('protects create, edit and profile pages with authGuard', () => {
    expect(find('create')?.canActivate).toContain(authGuard);
    expect(find('edit/:id')?.canActivate).toContain(authGuard);
    expect(find('profile')?.canActivate).toContain(authGuard);
  });

  it('keeps public pages accessible without auth guards', () => {
    expect(find('')?.canActivate).toBeUndefined();
    expect(find('login')?.canActivate).toBeUndefined();
    expect(find('register')?.canActivate).toBeUndefined();
    expect(find('listing/:id')?.canActivate).toBeUndefined();
  });

  it('redirects the legacy auth path and unknown urls', () => {
    expect(find('auth')?.redirectTo).toBe('login');
    expect(find('**')?.redirectTo).toBe('');
  });
});
