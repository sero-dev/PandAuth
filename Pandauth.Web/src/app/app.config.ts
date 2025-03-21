import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  TitleStrategy,
  withComponentInputBinding,
  withDebugTracing,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { PageTitleStategyService } from './core/page-title-strategy/page-title-stategy.service';
import { OAuthService, provideOAuthClient } from 'angular-oauth2-oidc';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { authCodeFlowConfig } from './auth/auth.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions(), withDebugTracing()),
    provideHttpClient(withInterceptorsFromDi()),
    provideAppInitializer(async () => {
      const oauthService = inject(OAuthService);
      oauthService.configure(authCodeFlowConfig);
      await oauthService.loadDiscoveryDocumentAndTryLogin();
    }),
    provideOAuthClient({
      resourceServer: {
        sendAccessToken: true,
        allowedUrls: ['https://localhost:7046/api/books'],
      },
    }),
    {
      provide: TitleStrategy,
      useClass: PageTitleStategyService,
    },
  ],
};
