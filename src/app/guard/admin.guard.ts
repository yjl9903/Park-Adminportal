import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { User, UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.userService.isLogin.pipe(
      map((flag) => {
        if (flag) {
          const user: User = this.userService.user;
          if (user && user.type === 'admin') {
            return true;
          } else {
            return this.router.parseUrl('/home/park');
          }
        } else {
          return this.router.parseUrl('/home/park');
        }
      })
    );
  }
}
