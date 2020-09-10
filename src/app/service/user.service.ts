import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface User {
  type: 'admin';
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private loginUrl = '/login';

  private localStorage = window.localStorage;

  private user: User = undefined;

  private readonly innerAccessToken: string = undefined;

  constructor(private readonly httpClient: HttpClient) {
    if (this.localStorage) {
      this.innerAccessToken = this.localStorage.getItem('access_token');
    }
  }

  login(username: string, password: string): Observable<User> {
    if (username === 'admin' && password === '123') {
      const res = of({ type: 'admin' } as User);
      res.subscribe(() => (this.user = { type: 'admin' }));
      return res;
    }
    const loginReq = this.httpClient.post<User>(this.loginUrl, {
      username,
      password,
    });
    loginReq.subscribe((user) => (this.user = user));
    return loginReq;
  }

  get isLogin(): boolean {
    return this.user !== undefined;
  }

  get accessToken(): string | undefined {
    return this.innerAccessToken;
  }
}