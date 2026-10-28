import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ListingCardComponent } from '../../components/listing-card/listing-card.component';
import { AMENITY_LIST } from '../../models/models';
import { AuthService } from '../../services/auth.service';
import { InterestService } from '../../services/interest.service';
import { ListingService } from '../../services/listing.service';

@Component({
  selector: 'app-home',
  imports: [FormsModule, RouterLink, CurrencyPipe, ListingCardComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  private listingService = inject(ListingService);
  private auth = inject(AuthService);
  private router = inject(Router);
  interest = inject(InterestService);

  amenityList = AMENITY_LIST;
  pageSize = 6;

  // filter values (bound with ngModel)
  searchText = signal('');
  city = signal('');
  minPrice = signal<number | null>(null);
  maxPrice = signal<number | null>(null);
  selectedAmenities = signal<string[]>([]);
  sortBy = signal('newest');
  currentPage = signal(1);
  slideIndex = signal(0);

  featured = computed(() => this.listingService.listings().filter(l => l.featured));
  currentSlide = computed(() => this.featured()[this.slideIndex()]);
  cities = computed(() => [...new Set(this.listingService.listings().map(l => l.city))].sort());

  filtered = computed(() => {
    const text = this.searchText().trim().toLowerCase();
    const min = this.minPrice();
    const max = this.maxPrice();

    const result = this.listingService.listings().filter(l => {
      const matchesText = !text || (l.title + ' ' + l.address + ' ' + l.city).toLowerCase().includes(text);
      const matchesCity = !this.city() || l.city === this.city();
      const matchesMin = min === null || l.rent >= min;
      const matchesMax = max === null || l.rent <= max;
      const matchesAmenities = this.selectedAmenities().every(a => l.amenities.includes(a));
      return matchesText && matchesCity && matchesMin && matchesMax && matchesAmenities;
    });

    if (this.sortBy() === 'low') {
      result.sort((a, b) => a.rent - b.rent);
    } else if (this.sortBy() === 'high') {
      result.sort((a, b) => b.rent - a.rent);
    } else if (this.sortBy() === 'size') {
      result.sort((a, b) => b.sqft - a.sqft);
    }
    // 'newest' keeps the stored order (new listings are added at the top)
    return result;
  });

  totalPages = computed(() => Math.max(1, Math.ceil(this.filtered().length / this.pageSize)));
  pageNumbers = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));
  pageListings = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize);
  });

  filterChanged(): void {
    this.currentPage.set(1);
  }

  clearFilters(): void {
    this.searchText.set('');
    this.city.set('');
    this.minPrice.set(null);
    this.maxPrice.set(null);
    this.selectedAmenities.set([]);
    this.currentPage.set(1);
  }

  toggleAmenity(name: string): void {
    const list = this.selectedAmenities();
    this.selectedAmenities.set(list.includes(name) ? list.filter(a => a !== name) : [...list, name]);
    this.currentPage.set(1);
  }

  nextSlide(): void {
    this.slideIndex.set((this.slideIndex() + 1) % this.featured().length);
  }

  prevSlide(): void {
    this.slideIndex.set((this.slideIndex() - 1 + this.featured().length) % this.featured().length);
  }

  favouriteSlide(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.interest.toggleFavourite(this.currentSlide().id);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }
}
