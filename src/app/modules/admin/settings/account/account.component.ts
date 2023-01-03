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
    selector: 'settings-account',
    templateUrl: './account.component.html',
    providers: [Destroy],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsAccountComponent implements OnInit {
    accountForm: UntypedFormGroup;
    user: User;

    /**
     * Constructor
     */
    constructor(
        private readonly _formBuilder: UntypedFormBuilder,
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
            .subscribe((user) => (this.user = user));
        this.buildForm();
    }

    // Create the form
    buildForm(): void {
        this.accountForm = this._formBuilder.group({
            name: [this.user.name, Validators.required],
            username: [this.user.username],
            title: [this.user.title],
            company: [this.user.customer],
            about: [this.user.about],
            email: [this.user.email, Validators.email],
            phone: [this.user.phone],
        });
    }

    updateUserData(): void {
        this._userService
            .update({id: this.user.id,...this.accountForm.value})
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user:User) => (this.user = user));
    }
}
