import { Route } from '@angular/router';
import { BookPage } from './book.page';

export default [
  {
    path: '',
    component: BookPage,
    children: [
      {
        path: 'create',
        loadComponent: () => import('./feature/create-book/create-book.component').then(m => m.CreateBookComponent),
      },
      {
        path: ':id',
        loadComponent: () => import('./feature/book-detail/book-detail.component').then(m => m.BookDetailComponent),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
] satisfies Route[];
