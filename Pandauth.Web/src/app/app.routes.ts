import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage),
  },

  {
    path: 'books',
    loadChildren: () => import('./book/book.routes'),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
