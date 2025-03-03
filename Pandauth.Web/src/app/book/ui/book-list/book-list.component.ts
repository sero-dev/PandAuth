import { Component, input, output } from '@angular/core';
import { BookHttp } from '../../data-access/book.service';
import { BookListItemComponent } from '../book-list-item/book-list-item.component';

@Component({
  selector: 'app-book-list',
  imports: [BookListItemComponent],
  template: `
    @if (books(); as books) { @for (book of books; track $index) {
    <app-book-list-item [book]="book" (click)="select.emit(book.id)" />
    } @empty {
    <div class="mt-5 text-center text-zinc-400 text-sm">No books available</div>
    } } @else {
    <div>Loading...</div>
    }
  `,
  styles: `
    :host {
      display: flex;
      height: 100%;
      flex-direction: column;
      flex-grow: 1;
      overflow-y: auto;
      border-radius: 0.375rem;
      background-color: var(--color-white);

      &:where(.dark, .dark *) {
        background-color: var(--color-zinc-900);
        border-color: var(--color-zinc-800);
      }
    }
  `,
})
export class BookListComponent {
  public readonly books = input.required<BookHttp[] | undefined>();
  public readonly select = output<number>();
}
