import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface User {
  id: number;
  userName: string;
  type: 'admin';
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly loginUrl = '/login';
  private readonly infoUrl = '/info';

  private readonly accessTokenKey = 'access_token';

  private user: User = undefined;

  private innerAccessToken: string = undefined;

  constructor(private readonly httpClient: HttpClient) {
    if (window.localStorage) {
      this.innerAccessToken = window.localStorage.getItem(this.accessTokenKey);
    }
  }

  login(username: string, password: string): Observable<User> {
    const loginReq = this.httpClient.post<{ cookieID: string; userInfo: User }>(
      this.loginUrl,
      {
        username,
        password,
      }
    );
    return loginReq.pipe(
      map(({ cookieID, userInfo }) => {
        this.innerAccessToken = cookieID;
        window.localStorage.setItem(this.accessTokenKey, cookieID);
        this.user = userInfo;
        return userInfo;
      })
    );
  }

  get isLogin(): Observable<boolean> {
    if (this.user) {
      return of(true);
    } else if (this.innerAccessToken) {
      return this.httpClient.get<User>(this.infoUrl).pipe(
        map(() => true),
        catchError(() => {
          this.innerAccessToken = undefined;
          window.localStorage.removeItem(this.accessTokenKey);
          return of(false);
        })
      );
    } else {
      return of(false);
    }
  }

  get accessToken(): string | undefined {
    return this.innerAccessToken;
  }
}
