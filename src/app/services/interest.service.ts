import { inject, Injectable, signal } from '@angular/core';
import { Inquiry, Listing } from '../models/models';
import { AuthService } from './auth.service';
import { loadData, saveData } from './storage';

// handles favourites and inquiries ("show interest")
@Injectable({ providedIn: 'root' })
export class InterestService {
  private auth = inject(AuthService);
  // favourites are saved per user: { userId: [listingId, ...] }
  private favourites = signal<Record<number, number[]>>(loadData('rh_favourites', {}));
  inquiries = signal<Inquiry[]>(loadData<Inquiry[]>('rh_inquiries', []));

  favouriteIds(): number[] {
    const user = this.auth.currentUser();
    return user ? this.favourites()[user.id] ?? [] : [];
  }

  isFavourite(listingId: number): boolean {
    return this.favouriteIds().includes(listingId);
  }

  toggleFavourite(listingId: number): void {
    const user = this.auth.currentUser();
    if (!user) {
      return;
    }
    const ids = this.favouriteIds();
    const newIds = ids.includes(listingId) ? ids.filter(id => id !== listingId) : [...ids, listingId];
    const all = { ...this.favourites(), [user.id]: newIds };
    this.favourites.set(all);
    saveData('rh_favourites', all);
  }

  sendInquiry(listing: Listing, message: string): void {
    const user = this.auth.currentUser();
    if (!user) {
      return;
    }
    const inquiry: Inquiry = {
      id: Date.now(),
      listingId: listing.id,
      listingTitle: listing.title,
      ownerId: listing.ownerId,
      fromName: user.name,
      fromEmail: user.email,
      message: message.trim(),
      date: new Date().toISOString()
    };
    const updated = [inquiry, ...this.inquiries()];
    this.inquiries.set(updated);
    saveData('rh_inquiries', updated);
  }

}
