import { Component, OnInit, inject } from "@angular/core";
import { Observable } from "rxjs";

import { User } from "@shared/interfaces/user.types";
import { UserService } from "src/app/user/data-access/user.service";

@Component({
  selector: 'user-profile',
  templateUrl: './profile.component.html',
  styles: []
})

export class UserProfileComponent  implements OnInit{
  user$!: Observable<User | null>
  private _userService = inject(UserService)

  ngOnInit(): void {
    this.user$ = this._userService.user$
  }
}