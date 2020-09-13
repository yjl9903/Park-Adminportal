import { Component } from '@angular/core';
import { User, UserService } from '../../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent {
  user: User;

  changePass = false;
  password: string;

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {
    this.user = this.userService.user;
  }

  updateInfo(): void {
    if (this.changePass) {
    } else {
      this.changePass = true;
    }
  }

  logout(): void {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['login']);
    });
  }
}
