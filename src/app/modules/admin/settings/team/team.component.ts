import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';

import { User } from '@core/user/user.types';
import { UserService } from '@core/user/user.service';
import { Destroy } from '@fuse/services/utils/destroy';
import { takeUntil } from 'rxjs';

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
    user: User;
    members: User[] = [];
    roles: Role[];

    /**
     * Constructor
     */
    constructor(
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
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.user = user;
            });
        // Setup the team members
        this._userService
            .getUsers(this.user.customerId)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((users: User[]) => {
                this.members = users;
            });

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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
