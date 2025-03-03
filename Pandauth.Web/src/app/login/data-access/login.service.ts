import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public basicLogIn(username: string, password: string): Observable<boolean> {
    return of<boolean>(username === 'serodev' && password === 'abc123');
  }
}
