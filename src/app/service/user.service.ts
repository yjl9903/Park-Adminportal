import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface User {
  id: number;
  username: string;
  type: 'admin' | 'normal';
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly loginUrl = '/login';
  private readonly logoutUrl = '/logout';
  private readonly createUserUrl = '/manage';
  private readonly infoUrl = '/info';
  private readonly allUsersUrl = '/manage';

  private readonly accessTokenKey = 'access_token';

  user: User = undefined;

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

  logout(): Observable<void> {
    this.user = undefined;
    window.localStorage.removeItem(this.accessTokenKey);
    return this.httpClient.post(this.logoutUrl, {}).pipe(
      map(() => {
        this.innerAccessToken = undefined;
      })
    );
  }

  createUser(username: string, password: string): Observable<User> {
    return this.httpClient.post<User>(this.createUserUrl, {
      username,
      password,
    });
  }

  getAllUser(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.allUsersUrl);
  }

  get isLogin(): Observable<boolean> {
    if (this.user) {
      return of(true);
    } else if (this.innerAccessToken) {
      return this.httpClient.get<User>(this.infoUrl).pipe(
        map((user: User) => {
          this.user = user;
          return true;
        }),
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

  get isAdmin(): boolean {
    if (this.user) {
      return this.user.type === 'admin';
    } else {
      return false;
    }
  }

  get accessToken(): string | undefined {
    return this.innerAccessToken;
  }
}
