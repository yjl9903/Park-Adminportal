import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';

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
  private readonly updateUserUrl = '/password';
  private readonly allUsersUrl = '/manage';

  private readonly storeKey = {
    accessToken: 'access_token',
    username: 'username',
  };

  user: User = undefined;

  private innerAccessToken: string = undefined;

  constructor(private readonly httpClient: HttpClient) {
    if (window.localStorage) {
      this.innerAccessToken = window.localStorage.getItem(
        this.storeKey.accessToken
      );
    }
  }

  login(username: string, password: string): Observable<User> {
    window.localStorage.setItem(this.storeKey.username, username);
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
        window.localStorage.setItem(this.storeKey.accessToken, cookieID);
        this.user = userInfo;
        return userInfo;
      })
    );
  }

  logout(): Observable<void> {
    this.user = undefined;
    window.localStorage.removeItem(this.storeKey.accessToken);
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

  updateUser(username: string, password: string): Observable<User> {
    return this.httpClient.put<User>(this.updateUserUrl, {
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
        timeout(1000),
        map((user: User) => {
          this.user = user;
          return true;
        }),
        catchError(() => {
          this.innerAccessToken = undefined;
          window.localStorage.removeItem(this.storeKey.accessToken);
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

  get defaultUsername(): string | undefined {
    return window.localStorage.getItem(this.storeKey.username);
  }

  get accessToken(): string | undefined {
    return this.innerAccessToken;
  }
}
