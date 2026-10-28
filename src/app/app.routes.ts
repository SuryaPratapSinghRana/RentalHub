import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { AuthComponent } from './pages/auth/auth.component';
import { CreateListingComponent } from './pages/create-listing/create-listing.component';
import { HomeComponent } from './pages/home/home.component';
import { ListingDetailsComponent } from './pages/listing-details/listing-details.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: AuthComponent },
  { path: 'register', component: AuthComponent },
  { path: 'auth', redirectTo: 'login', pathMatch: 'full' },
  { path: 'listing/:id', component: ListingDetailsComponent },
  { path: 'create', component: CreateListingComponent, canActivate: [authGuard] },
  { path: 'edit/:id', component: CreateListingComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
