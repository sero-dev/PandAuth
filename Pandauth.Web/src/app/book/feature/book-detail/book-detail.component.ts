import { Component, input, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-book-detail',
  imports: [],
  template: `
    <p>book-detail works!</p>
    {{ id() }}
  `,
  styles: ``,
})
export class BookDetailComponent {
  public readonly id = input.required<number, string>({ transform: numberAttribute });
}
