import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { ListingService } from './listing.service';
import { SAMPLE_LISTINGS } from './sample-data';

describe('ListingService', () => {
  let service: ListingService;
  let auth: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    auth = TestBed.inject(AuthService);
    service = TestBed.inject(ListingService);
  });

  it('shows sample listings on first load', () => {
    expect(service.listings().length).toBe(SAMPLE_LISTINGS.length);
  });

  it('finds a listing by id', () => {
    expect(service.getById(1)?.title).toBe(SAMPLE_LISTINGS[0].title);
    expect(service.getById(9999)).toBeUndefined();
  });

  it('does not add a listing when logged out', () => {
    expect(service.add({ title: 'Test' })).toBeNull();
  });

  it('adds, updates and deletes a listing', () => {
    auth.login('renter@test.com', 'Test@1234');
    const added = service.add({ title: 'My flat', rent: 500 })!;
    expect(added.ownerName).toBe('Renter Demo');
    expect(service.listings()[0].id).toBe(added.id);

    service.update(added.id, { rent: 700 });
    expect(service.getById(added.id)?.rent).toBe(700);

    service.delete(added.id);
    expect(service.getById(added.id)).toBeUndefined();
  });
});
