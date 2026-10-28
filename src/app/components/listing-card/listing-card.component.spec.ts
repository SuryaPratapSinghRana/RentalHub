import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SAMPLE_LISTINGS } from '../../services/sample-data';
import { AuthService } from '../../services/auth.service';
import { ListingCardComponent } from './listing-card.component';

describe('ListingCardComponent', () => {
  let fixture: ComponentFixture<ListingCardComponent>;
  const html = () => fixture.nativeElement as HTMLElement;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [ListingCardComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ListingCardComponent);
    fixture.componentRef.setInput('listing', SAMPLE_LISTINGS[0]);
    await fixture.whenStable();
  });

  it('shows the listing info and makes the card clickable', () => {
    const card = html().querySelector('.listing-card') as HTMLAnchorElement;
    const favouriteButton = html().querySelector('button[aria-label="Toggle favourite"]') as HTMLButtonElement | null;

    expect(html().querySelector('.card-title')?.textContent).toContain(SAMPLE_LISTINGS[0].title);
    expect(html().textContent).toContain('₹1,400');
    expect(card).not.toBeNull();
    expect(card.getAttribute('tabindex')).toBe('0');
    expect(card.getAttribute('href')).toContain('/listing/1');
    expect(favouriteButton).not.toBeNull();
    expect(favouriteButton?.getAttribute('aria-label')).toBe('Toggle favourite');
  });
});
