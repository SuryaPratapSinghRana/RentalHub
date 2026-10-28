import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListingCardComponent } from '../../components/listing-card/listing-card.component';
import { AuthService } from '../../services/auth.service';
import { InterestService } from '../../services/interest.service';
import { ListingService } from '../../services/listing.service';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, CurrencyPipe, DatePipe, ListingCardComponent],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  auth = inject(AuthService);
  private listingService = inject(ListingService);
  private interest = inject(InterestService);

  myListings = computed(() => this.listingService.listings().filter(l => l.ownerId === this.auth.currentUser()?.id));
  favourites = computed(() => {
    const ids = this.interest.favouriteIds();
    return this.listingService.listings().filter(l => ids.includes(l.id));
  });
  inquiries = computed(() => this.interest.inquiries().filter(i => i.ownerId === this.auth.currentUser()?.id));

  deleteListing(id: number): void {
    if (confirm('Are you sure you want to delete this listing?')) {
      this.listingService.delete(id);
    }
  }

  openInquiryReply(email: string, listingTitle: string): void {
    const subject = encodeURIComponent(`Re: ${listingTitle}`);
    window.location.href = `mailto:${email}?subject=${subject}`;
  }
}
