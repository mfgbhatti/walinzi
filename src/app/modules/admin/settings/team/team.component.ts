import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '@core/user/user.service';

import { User } from '@core/user/user.types';
import { Destroy } from '@fuse/services/utils/destroy';
import { filter, takeUntil, tap } from 'rxjs';
import { UserFormComponent } from './form/form.component';

export type Role = {
  label: string;
  value: string;
  description: string;
};

@Component({
  selector: 'settings-team',
  templateUrl: './team.component.html',
  providers: [Destroy],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsTeamComponent implements OnInit {
  @Input() _user!: User;
  @Input() _members!: User[];
  user: User;
  members: User[] = [];
  roles: Role[];

  /**
   * Constructor
   */
  constructor(
    private readonly _unsubscribeAll: Destroy,
    private readonly _userService: UserService,
    private readonly _dialog: MatDialog,
  ) { }
  ngOnInit(): void {
    // Setup the roles
    this.roles = [
      {
        label: 'Controller',
        value: 'control',
        description:
          'Can read and clone this repository. Can also open and comment on issues and pull requests.',
      },
      {
        label: 'Human Resources',
        value: 'humres',
        description:
          'Can read and clone this repository. Can also open and comment on issues and pull requests.',
      },
      {
        label: 'Accounts',
        value: 'account',
        description:
          'Can read, clone, and push to this repository. Can also manage issues and pull requests.',
      },
      {
        label: 'Admin',
        value: 'admin',
        description:
          'Can read, clone, and push to this repository. Can also manage issues, pull requests, and repository settings, including adding collaborators.',
      },
    ];
  }

  add(): void {
    const dialogRef = this._dialog.open(UserFormComponent, {
      data: { customer: this._user.customerId },
      width: '40%',
      disableClose: true
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((data) => this._userService.create(data)),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe();
  }

  delete(userId): void {
    this._userService.delete(userId);
    console.log('delete:', userId);
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
