import { Component, input } from '@angular/core';
import { BookHttp } from '../../data-access/book.service';

@Component({
  selector: 'app-book-list-item',
  template: `
    @let book = input();
    <div
      class="p-3 flex flex-col border-b border-zinc-300 dark:border-zinc-800 dark:text-zinc-300 hover:cursor-pointer hover:bg-blue-50 dark:hover:bg-zinc-800"
    >
      <div class="flex justify-between">
        <span class="font-semibold">{{ book.title }}</span>
        <span>{{ book.year }}</span>
      </div>
      <span class="text-sm">{{ book.authorName }}</span>
    </div>
  `,
})
export class BookListItemComponent {
  public readonly input = input.required<BookHttp>({ alias: 'book' });
}
