import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { InterestService } from '../../services/interest.service';
import { SAMPLE_LISTINGS } from '../../services/sample-data';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
    let fixture: ComponentFixture<ProfileComponent>;
    let auth: AuthService;
    let interest: InterestService;

    beforeEach(async () => {
        localStorage.clear();
        await TestBed.configureTestingModule({
            imports: [ProfileComponent],
            providers: [provideRouter([])]
        }).compileComponents();

        auth = TestBed.inject(AuthService);
        interest = TestBed.inject(InterestService);

        auth.login('renter@test.com', 'Test@1234');
        interest.sendInquiry(SAMPLE_LISTINGS[0], 'I am interested in this property');

        auth.login('landlord@test.com', 'Test@1234');
        fixture = TestBed.createComponent(ProfileComponent);
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('allows the owner to reply to an inquiry', () => {
        const replyField = fixture.nativeElement.querySelector('textarea[aria-label="Reply to inquiry"]');
        expect(replyField).not.toBeNull();
    });
});
