import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../../service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  loading = true;
  users: User[] = [];

  constructor(private readonly userService: UserService) {
    this.userService.getAllUser().subscribe((users: User[]) => {
      this.users = users;
      this.loading = false;
    });
  }

  ngOnInit(): void {}
}
