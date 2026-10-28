import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AMENITY_LIST, Listing, PROPERTY_TYPES } from '../../models/models';
import { AuthService } from '../../services/auth.service';
import { ListingService } from '../../services/listing.service';

const MAX_PHOTOS = 3;
const MAX_PHOTO_SIZE = 300 * 1024; // 300 KB, localStorage has limited space

// at least one photo is needed
function photosRequired(control: AbstractControl): ValidationErrors | null {
  return control.value.length === 0 ? { noPhoto: true } : null;
}

@Component({
  selector: 'app-create-listing',
  imports: [ReactiveFormsModule, RouterLink, CurrencyPipe],
  templateUrl: './create-listing.component.html'
})
export class CreateListingComponent implements OnInit {
  // id is only there on the /edit/:id route
  id = input<string>();

  private fb = inject(FormBuilder);
  private listingService = inject(ListingService);
  private auth = inject(AuthService);
  private router = inject(Router);

  propertyTypes = PROPERTY_TYPES;
  amenityList = AMENITY_LIST;
  photoError = '';
  saveError = '';
  showPreview = false;

  form = this.fb.nonNullable.group({
    propertyType: ['', Validators.required],
    buildingName: ['', [Validators.required, Validators.minLength(2)]],
    shared: this.fb.control<boolean | null>(null, Validators.required),
    address: ['', [Validators.required, Validators.minLength(5)]],
    city: ['', Validators.required],
    sqft: this.fb.control<number | null>(null, [Validators.required, Validators.min(50)]),
    leaseType: ['', Validators.required],
    rent: this.fb.control<number | null>(null, [Validators.required, Validators.min(1)]),
    negotiable: false,
    priceMode: ['per-month', Validators.required],
    furnished: this.fb.control<boolean | null>(null, Validators.required),
    vegetarian: ['no-preference', Validators.required],
    amenities: this.fb.nonNullable.group(Object.fromEntries(AMENITY_LIST.map(a => [a, false]))),
    title: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(1400)]],
    contactName: ['', Validators.required],
    contactEmail: ['', [Validators.required, Validators.email]],
    contactPhone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s]{7,15}$/)]],
    photos: this.fb.nonNullable.control<string[]>([], photosRequired)
  });

  get isEdit(): boolean {
    return !!this.id();
  }

  get photos(): string[] {
    return this.form.controls.photos.value;
  }

  get previewListing(): Listing {
    const value = this.form.getRawValue();
    const user = this.auth.currentUser();

    return {
      id: 0,
      ownerId: user?.id ?? 0,
      ownerName: user?.name ?? (value.contactName || 'Owner'),
      title: value.title || 'Your listing preview',
      description: value.description || 'Your listing description will appear here once you add it.',
      propertyType: value.propertyType || 'Apartment',
      buildingName: value.buildingName || 'Property name',
      shared: !!value.shared,
      address: value.address || 'Address',
      city: value.city || 'City',
      sqft: Number(value.sqft) || 0,
      leaseType: value.leaseType || 'long',
      rent: Number(value.rent) || 0,
      negotiable: !!value.negotiable,
      priceMode: value.priceMode || 'per-month',
      furnished: !!value.furnished,
      vegetarian: value.vegetarian || 'no-preference',
      amenities: AMENITY_LIST.filter(a => value.amenities[a]),
      contactName: value.contactName || 'Contact name',
      contactEmail: value.contactEmail || 'contact@example.com',
      contactPhone: value.contactPhone || '0000000000',
      photos: value.photos.length > 0 ? value.photos : ['https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80'],
      featured: false
    };
  }

  togglePreview(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.showPreview = false;
      return;
    }
    this.showPreview = !this.showPreview;
  }

  ngOnInit(): void {
    const user = this.auth.currentUser();
    if (this.id()) {
      const listing = this.listingService.getById(Number(this.id()));
      // only the owner can edit
      if (!listing || listing.ownerId !== user?.id) {
        this.router.navigate(['/']);
        return;
      }
      const amenities = Object.fromEntries(AMENITY_LIST.map(a => [a, listing.amenities.includes(a)]));
      this.form.patchValue({ ...listing, amenities });
    } else {
      this.form.patchValue({ contactName: user?.name, contactEmail: user?.email });
    }
  }

  // true if the field should show its error message
  showError(control: AbstractControl): boolean {
    return control.invalid && control.touched;
  }

  onPhotosSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    input.value = '';
    this.photoError = '';

    for (const file of files) {
      if (this.photos.length >= MAX_PHOTOS) {
        this.photoError = `You can add only ${MAX_PHOTOS} photos`;
        break;
      }
      if (!file.type.startsWith('image/')) {
        this.photoError = 'Only image files are allowed';
        continue;
      }
      if (file.size > MAX_PHOTO_SIZE) {
        this.photoError = `${file.name} is larger than 300 KB`;
        continue;
      }
      const reader = new FileReader();
      reader.onload = () => {
        this.form.controls.photos.setValue([...this.photos, reader.result as string]);
        this.form.controls.photos.markAsTouched();
      };
      reader.readAsDataURL(file);
    }
  }

  removePhoto(index: number): void {
    this.form.controls.photos.setValue(this.photos.filter((_, i) => i !== index));
    this.form.controls.photos.markAsTouched();
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    const value = this.form.getRawValue();
    const data: Partial<Listing> = {
      ...value,
      shared: !!value.shared,
      furnished: !!value.furnished,
      sqft: Number(value.sqft),
      rent: Number(value.rent),
      amenities: AMENITY_LIST.filter(a => value.amenities[a])
    };

    let savedId: number | null = null;
    if (this.isEdit) {
      const id = Number(this.id());
      savedId = this.listingService.update(id, data) ? id : null;
    } else {
      savedId = this.listingService.add(data)?.id ?? null;
    }

    if (savedId === null) {
      this.saveError = 'Could not save the listing. Try removing a photo.';
      return;
    }
    this.router.navigate(['/listing', savedId]);
  }
}
