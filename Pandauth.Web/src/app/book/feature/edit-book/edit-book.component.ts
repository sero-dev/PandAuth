import { Component, computed, inject, input, numberAttribute } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { BookPage } from '../../book.page';
import { BookService } from '../../data-access/book.service';
import { InputDirective } from '../../../shared/directive/input/input.directive';
import { ButtonDirective } from '../../../shared/directive/button/button.directive';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-book',
  imports: [ReactiveFormsModule, InputDirective, ButtonDirective],
  template: `
    <div
      class="bg-white p-4 rounded-md flex flex-col h-full justify-center border border-neutral-300 dark:bg-neutral-900 dark:border-neutral-700"
    >
      <div class="max-w-4xl w-full mx-auto">
        @if (form(); as form) {

        <form [formGroup]="form" (submit)="onFormSubmit($event)" class="flex flex-col gap-5">
          <div>
            <h1 class="text-2xl">Update book information</h1>
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
            <button appButton type="button" color="black" icon="x" variant="ghost" (click)="navigateBack()">
              Cancel
            </button>
            <button appButton type="submit" color="purple" icon="check">Update</button>
          </div>
        </form>
        }
      </div>
    </div>
  `,
})
export class EditBookComponent {
  public readonly id = input.required<number, string>({ transform: numberAttribute });

  private readonly page = inject(BookPage);
  private readonly bookService = inject(BookService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected resource = this.bookService.get(this.id);
  protected readonly form = computed(() => {
    const book = this.resource.value();

    if (!book) return;

    return new FormGroup({
      title: new FormControl<string>(book.title, { nonNullable: true, validators: Validators.required }),
      authorName: new FormControl<string | undefined>(book.authorName),
      year: new FormControl<number | undefined>(book.year),
    });
  });

  protected onFormSubmit(event: Event) {
    event.preventDefault();

    const form = this.form();

    if (!form) return;

    const { title, authorName, year } = form.value;
    const id = this.id();

    if (!title || id === undefined) return;

    this.bookService.update(id, title, authorName, year).subscribe(() => {
      this.page.refresh();
      this.navigateBack();
    });
  }

  protected navigateBack(): void {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
