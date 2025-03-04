import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  TitleStrategy,
  withComponentInputBinding,
  withDebugTracing,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { PageTitleStategyService } from './core/page-title-strategy/page-title-stategy.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions(), withDebugTracing()),
    provideHttpClient(),
    {
      provide: TitleStrategy,
      useClass: PageTitleStategyService,
    },
  ],
};
