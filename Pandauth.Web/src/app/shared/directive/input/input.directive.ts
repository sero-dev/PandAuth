import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appInput]',
})
export class InputDirective {
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  constructor() {
    this.elementRef.nativeElement.className =
      'py-3 px-4 block w-full border border-zinc-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600';
  }
}
