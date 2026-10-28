import { inject, Injectable, signal } from '@angular/core';
import { Comment } from '../models/models';
import { AuthService } from './auth.service';
import { loadData, saveData } from './storage';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private auth = inject(AuthService);
  comments = signal<Comment[]>(loadData<Comment[]>('rh_comments', []));

  getForListing(listingId: number): Comment[] {
    return this.comments().filter(c => c.listingId === listingId);
  }

  // parentId is set when the comment is a reply
  add(listingId: number, text: string, parentId: number | null = null): void {
    const user = this.auth.currentUser();
    if (!user || !text.trim()) {
      return;
    }
    const comment: Comment = {
      id: Date.now(),
      listingId,
      parentId,
      userId: user.id,
      userName: user.name,
      text: text.trim(),
      date: new Date().toISOString()
    };
    const updated = [...this.comments(), comment];
    this.comments.set(updated);
    saveData('rh_comments', updated);
  }
}
