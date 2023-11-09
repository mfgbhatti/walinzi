import { Component, OnInit, inject } from "@angular/core";

import { User } from "@shared/interfaces/user.types";
import { AuthService } from "src/app/auth/data-access/auth.services";

@Component({
  selector: 'user-profile',
  templateUrl: './profile.component.html',
  styles: []
})

export class UserProfileComponent  implements OnInit{
  user!: User;
  _authService = inject(AuthService);

  ngOnInit(): void {
    this.user = this._authService.loginUser
  }
}