import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective } from '../shared/directive/button/button.directive';
import { InputDirective } from '../shared/directive/input/input.directive';
import { LoginService } from './data-access/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ButtonDirective, InputDirective, ReactiveFormsModule],
  template: `
    <div class="h-screen w-screen flex flex-col justify-center items-center">
      <div
        class="bg-white border border-zinc-400 rounded-md shadow-2xl py-8 px-14 max-w-xl w-full dark:bg-zinc-800 dark:border-none"
      >
        <h1 class="text-4xl font-bold uppercase mt-5">Login</h1>
        <form [formGroup]="form" (submit)="onSubmit()" class="mt-5">
          <div class="flex flex-col gap-2">
            <input appInput formControlName="username" type="username" placeholder="Username" />
            <input appInput formControlName="password" type="password" placeholder="Password" />
          </div>
          @if(errorMessage(); as errorMessage) {
          <div
            class="mt-5 bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500"
          >
            <span id="hs-soft-color-danger-label" class="font-bold">Error</span>
            {{ errorMessage }}
          </div>
          }
          <div class="flex justify-between items-center gap-2 mt-8">
            <button appButton type="button" icon="key" color="blue" variant="ghost" (click)="onSingleSignOnClick()">
              SSO Sign In
            </button>
            <button
              appButton
              icon="right-to-bracket"
              iconPlacement="end"
              [disabled]="form.invalid"
              [isLoading]="isLoggingIn()"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class LoginPage {
  private readonly router = inject(Router);
  private readonly loginService = inject(LoginService);
  private readonly fb = inject(NonNullableFormBuilder);

  protected form = this.fb.group({
    username: ['serodev', Validators.required],
    password: ['abc123', Validators.required],
  });

  protected errorMessage = signal<string | undefined>(undefined);
  protected isLoggingIn = signal<boolean>(false);

  constructor() {
    this.form.valueChanges.subscribe(() => this.errorMessage.set(undefined));
  }

  protected onSubmit() {
    if (this.form.invalid) return;
    this.isLoggingIn.set(true);

    const username = this.form.value.username!;
    const password = this.form.value.password!;

    this.loginService.basicLogIn(username, password).subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        this.form.reset();
        this.errorMessage.set('Failed to login. Please try again!');
        this.isLoggingIn.set(false);
      } else this.router.navigate(['/books']);
    });
  }

  protected onSingleSignOnClick() {}
}
