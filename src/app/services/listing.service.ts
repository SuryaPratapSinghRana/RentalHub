import { inject, Injectable, signal } from '@angular/core';
import { Listing } from '../models/models';
import { AuthService } from './auth.service';
import { SAMPLE_LISTINGS } from './sample-data';
import { loadData, saveData } from './storage';

@Injectable({ providedIn: 'root' })
export class ListingService {
  private auth = inject(AuthService);
  listings = signal<Listing[]>(loadData<Listing[] | null>('rh_listings', null) ?? SAMPLE_LISTINGS);

  getById(id: number): Listing | undefined {
    return this.listings().find(l => l.id === id);
  }

  // new listing gets the logged in user as owner; returns null if saving failed
  add(data: Partial<Listing>): Listing | null {
    const user = this.auth.currentUser();
    if (!user) {
      return null;
    }
    const listing = {
      ...data,
      id: Date.now(),
      ownerId: user.id,
      ownerName: user.name,
      featured: false
    } as Listing;
    return this.save([listing, ...this.listings()]) ? listing : null;
  }

  update(id: number, data: Partial<Listing>): boolean {
    return this.save(this.listings().map(l => (l.id === id ? { ...l, ...data } : l)));
  }

  delete(id: number): void {
    this.save(this.listings().filter(l => l.id !== id));
  }

  private save(list: Listing[]): boolean {
    if (!saveData('rh_listings', list)) {
      return false;
    }
    this.listings.set(list);
    return true;
  }
}
