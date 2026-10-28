import { CurrencyPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Listing } from '../../models/models';
import { AuthService } from '../../services/auth.service';
import { InterestService } from '../../services/interest.service';

@Component({
  selector: 'app-listing-card',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './listing-card.component.html'
})
export class ListingCardComponent {
  listing = input.required<Listing>();

  private auth = inject(AuthService);
  private router = inject(Router);
  interest = inject(InterestService);

  toggleFavourite(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.interest.toggleFavourite(this.listing().id);
  }
}
