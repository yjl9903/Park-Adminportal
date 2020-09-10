import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly baseUrl;

  constructor() {
    console.log(environment);
    this.baseUrl = environment.baseUrl;
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const url = this.baseUrl + request.url.replace(/^\//, '');
    request = request.clone({ url });
    return next.handle(request);
  }
}
