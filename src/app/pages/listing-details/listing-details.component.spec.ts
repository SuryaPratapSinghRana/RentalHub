import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ListingService } from '../../services/listing.service';
import { ListingDetailsComponent } from './listing-details.component';

describe('ListingDetailsComponent', () => {
    let fixture: ComponentFixture<ListingDetailsComponent>;
    let auth: AuthService;
    let listingService: ListingService;

    beforeEach(async () => {
        localStorage.clear();
        await TestBed.configureTestingModule({
            imports: [ListingDetailsComponent],
            providers: [provideRouter([])]
        }).compileComponents();

        auth = TestBed.inject(AuthService);
        listingService = TestBed.inject(ListingService);
        auth.login('landlord@test.com', 'Test@1234');

        fixture = TestBed.createComponent(ListingDetailsComponent);
        fixture.componentRef.setInput('id', '1');
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('shows a delete button for the owner and removes the listing', () => {
        const router = TestBed.inject(Router);
        spyOn(router, 'navigate');
        spyOn(window, 'confirm').and.returnValue(true);

        const deleteButton = fixture.nativeElement.querySelector('button.btn-danger');
        expect(deleteButton).not.toBeNull();

        deleteButton.click();

        expect(listingService.getById(1)).toBeUndefined();
        expect(router.navigate).toHaveBeenCalledWith(['/profile']);
    });
});
