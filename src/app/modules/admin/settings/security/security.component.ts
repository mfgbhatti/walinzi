import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/auth/auth.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { FuseValidators } from '@fuse/validators';

@Component({
  selector: 'settings-security',
  templateUrl: './security.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations
})
export class SettingsSecurityComponent implements OnInit {
  securityForm: UntypedFormGroup;

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ' '
  };
  showAlert: boolean = false;

  /**
   * Constructor
   */
  constructor(
    private readonly _formBuilder: UntypedFormBuilder,
    private readonly _authService: AuthService

  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.setForm();
  }

  setForm(): void {
    this.securityForm = this._formBuilder.group(
      {
        oldPassword: ['', Validators.required],
        // , Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?\/~_+-=|\]).{8,32}$')
        password1: ['', [Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\\w\\d\\s:])([^\\s]){8,32}$')]],
        password2: ['', Validators.required,],
        // twoStep          : [true],
        // askPasswordChange: [false]
      },
      {
        validators: FuseValidators.mustMatch('password1', 'password2')
      }
    );
  }

  submit(): void {
    this.securityForm.disable();
    this.showAlert = false;
    this._authService.changePassword(this.securityForm.value).subscribe(
      (response) => {
        this.securityForm.enable();
        this.securityForm.reset();
        this.showAlert = true;
        // console.log(response); // null
        if (response == null || response.length == 0) {
          this.alert = {
            type: 'success',
            message: 'Your password has been changed successfully!'
          }
        } else {
          this.alert = {
            type: 'error',
            message: 'Your current password is incorrect!'
          };
        }
      }
    );
  }
}
