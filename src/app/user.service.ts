import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private loginUrl = '/login';

  private user: any = undefined;

  constructor(private readonly httpClient: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const loginReq = this.httpClient.post<any>(this.loginUrl, {
      username,
      password,
    });
    loginReq.subscribe((user: any) => (this.user = user));
    return loginReq;
  }

  get isLogin(): boolean {
    return this.user === undefined;
  }
}
