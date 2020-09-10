import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { UserService } from '../service/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly baseUrl;

  constructor(private readonly userService: UserService) {
    this.baseUrl = environment.baseUrl;
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const url = this.baseUrl + request.url.replace(/^\//, '');
    const params = this.userService.accessToken
      ? { cookie: this.userService.accessToken }
      : {};
    request = request.clone({ url, setParams: { ...params } });
    return next.handle(request);
  }
}
