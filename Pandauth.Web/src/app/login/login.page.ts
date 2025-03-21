import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonDirective } from '../shared/directive/button/button.directive';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login',
  imports: [ButtonDirective, ReactiveFormsModule],
  template: `
    <div class="h-screen w-screen flex flex-col justify-center items-center">
      <div
        class="bg-white border border-neutral-400 rounded-md shadow-2xl text-center py-8 px-14 max-w-xl w-full dark:bg-neutral-900 dark:border-none"
      >
        <h1 class="text-2xl font-semibold mt-5 mb-5">Log into Pandauth</h1>
        <div class="flex flex-col">
          <button appButton type="button" icon="key" color="blue" (click)="onSingleSignOnClick()">
            Sign in using Keycloak
          </button>
        </div>
      </div>
    </div>
  `,
})
export class LoginPage {
  private readonly oauthService = inject(OAuthService);

  protected onSingleSignOnClick() {
    this.oauthService.initCodeFlow();
  }
}
