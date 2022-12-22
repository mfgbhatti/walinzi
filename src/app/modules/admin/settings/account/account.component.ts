import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import { UserService } from '@core/user/user.service';
import { User } from '@core/user/user.types';
import { Destroy } from '@fuse/services/utils/destroy';
import { takeUntil } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'settings-account',
  templateUrl: './account.component.html',
  providers : [Destroy],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsAccountComponent implements OnInit {
  accountForm!: UntypedFormGroup;
  _user!: User

  /**
   * Constructor
   */
  constructor(
    private _formBuilder: UntypedFormBuilder,
    private readonly _userService: UserService,
    private readonly _unsubscribeAll: Destroy
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._userService.user$.pipe(takeUntil(this._unsubscribeAll)).subscribe((user) => {
        this._user = user;
    });


    // Create the form
    this.accountForm = this._formBuilder.group({
      name: [this._user.name],
      username: [this._user.username],
      title: [this._user.title],
      company: [this._user.customer],
      about: [
        "Hey! This is Brian; husband, father and gamer. I'm mostly passionate about bleeding edge tech and chocolate! 🍫",
      ],
      email: [this._user.email, Validators.email],
      phone: [this._user.phone],
    });
  }
}
