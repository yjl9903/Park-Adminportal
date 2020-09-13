import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {}

  isAdmin(): Observable<boolean> {
    return this.userService.isAdmin;
  }
}
