import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.userService.isLogin.pipe(
      map((flag) => {
        if (flag) {
          return true;
        } else {
          return this.router.parseUrl('/login');
        }
      })
    );
  }
}
