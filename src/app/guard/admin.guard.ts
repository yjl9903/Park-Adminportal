import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.userService.isAdmin.pipe(
      map((flag) => {
        if (flag) {
          return this.router.parseUrl('/home/park');
        } else {
          return true;
        }
      })
    );
  }
}
