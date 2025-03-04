import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputDirective } from '../../../shared/directive/input/input.directive';
import { ButtonDirective } from '../../../shared/directive/button/button.directive';
import { BookService } from '../../data-access/book.service';
import { BookPage } from '../../book.page';

@Component({
  selector: 'app-create-book',
  imports: [InputDirective, ButtonDirective, ReactiveFormsModule],
  template: `
    <div
      class="bg-white p-4 rounded-md flex flex-col h-full justify-center border border-neutral-300 dark:bg-neutral-900 dark:border-neutral-700"
    >
      <div class="max-w-4xl w-full mx-auto">
        <form [formGroup]="form" (submit)="onFormSubmit($event)" class="flex flex-col gap-5">
          <div>
            <h1 class="text-2xl">Create a new book</h1>
            <small>
              Required fields are marked with an asterisk
              <span class="text-red-600">*</span>
            </small>
          </div>

          <div class="flex flex-col gap-2">
            <input formControlName="title" form appInput type="text" placeholder="Enter title of the book *" />
            <div class="flex gap-2">
              <input formControlName="authorName" appInput type="text" class="grow" placeholder="Enter author's name" />
              <input formControlName="year" appInput class="w-60" type="number" placeholder="Enter publishing year" />
            </div>
          </div>

          <div class="flex justify-end gap-2">
            <button appButton type="submit" icon="plus">Add</button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class CreateBookComponent {
  private readonly page = inject(BookPage);
  private readonly bookService = inject(BookService);

  protected readonly form = new FormGroup({
    title: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    authorName: new FormControl<string | undefined>(undefined),
    year: new FormControl<number | undefined>(undefined),
  });

  protected onFormSubmit(event: Event) {
    event.preventDefault();

    const { title, authorName, year } = this.form.value;

    if (!title) return;

    this.bookService.create(title, authorName, year).subscribe(() => {
      this.page.refresh();
      this.form.reset();
    });
  }
}
