import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, inject, input, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Comment } from '../../models/models';
import { AuthService } from '../../services/auth.service';
import { CommentService } from '../../services/comment.service';
import { InterestService } from '../../services/interest.service';
import { ListingService } from '../../services/listing.service';

@Component({
  selector: 'app-listing-details',
  imports: [CurrencyPipe, DatePipe, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './listing-details.component.html'
})
export class ListingDetailsComponent {
  // route param :id (string)
  id = input.required<string>();

  auth = inject(AuthService);
  interest = inject(InterestService);
  private listingService = inject(ListingService);
  private commentService = inject(CommentService);
  private router = inject(Router);

  listing = computed(() => this.listingService.getById(Number(this.id())));
  photoIndex = signal(0);

  newComment = signal('');
  replyText = signal('');
  replyingTo = signal<number | null>(null);

  showInquiry = signal(false);
  inquirySent = signal(false);
  inquiryMessage = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10)] });

  // top level comments, each with its replies
  threads = computed(() => {
    const all = this.commentService.getForListing(Number(this.id()));
    return all
      .filter(c => c.parentId === null)
      .map(c => ({ comment: c, replies: all.filter(r => r.parentId === c.id) }));
  });

  isOwner(): boolean {
    return this.listing()?.ownerId === this.auth.currentUser()?.id;
  }

  goToLogin(): void {
    this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
  }

  changePhoto(step: number): void {
    const total = this.listing()!.photos.length;
    this.photoIndex.set((this.photoIndex() + step + total) % total);
  }

  toggleFavourite(): void {
    if (!this.auth.isLoggedIn()) {
      this.goToLogin();
      return;
    }
    this.interest.toggleFavourite(this.listing()!.id);
  }

  deleteListing(): void {
    const listing = this.listing();
    if (!listing) {
      return;
    }

    if (confirm(`Are you sure you want to delete "${listing.title}"?`)) {
      this.listingService.delete(listing.id);
      this.router.navigate(['/profile']);
    }
  }

  openInquiry(): void {
    if (!this.auth.isLoggedIn()) {
      this.goToLogin();
      return;
    }
    this.inquirySent.set(false);
    this.showInquiry.set(true);
  }

  sendInquiry(): void {
    this.inquiryMessage.markAsTouched();
    if (this.inquiryMessage.invalid) {
      return;
    }
    this.interest.sendInquiry(this.listing()!, this.inquiryMessage.value);
    this.inquiryMessage.reset();
    this.showInquiry.set(false);
    this.inquirySent.set(true);
  }

  postComment(): void {
    this.commentService.add(this.listing()!.id, this.newComment());
    this.newComment.set('');
  }

  startReply(comment: Comment): void {
    this.replyText.set('');
    this.replyingTo.set(comment.id);
  }

  postReply(parentId: number): void {
    this.commentService.add(this.listing()!.id, this.replyText(), parentId);
    this.replyingTo.set(null);
  }
}
