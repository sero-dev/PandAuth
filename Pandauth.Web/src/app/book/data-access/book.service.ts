import { HttpClient, HttpResourceRef, httpResource } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://localhost:7046/api/books';

  public getAll(): HttpResourceRef<BookHttp[] | undefined> {
    return httpResource<BookHttp[]>(this.baseUrl);
  }

  public get(id: number): Observable<BookHttp> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<BookHttp>(url);
  }

  public create(title: string, authorName?: string, year?: number): Observable<BookHttp> {
    const body = { title, authorName, year };
    return this.http.post<BookHttp>(this.baseUrl, body);
  }

  public delete(id: number): Observable<BookHttp> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<BookHttp>(url);
  }
}

export interface BookHttp {
  id: number;
  title: string;
  authorName?: string;
  year?: number;
}

export interface CreateBookHttp {
  title: string;
  authorName?: string;
  year?: number;
}
