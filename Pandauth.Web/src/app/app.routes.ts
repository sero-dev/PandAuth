import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage),
    title: 'Login',
  },

  {
    path: 'books',
    loadChildren: () => import('./book/book.routes'),
    title: 'Books',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
