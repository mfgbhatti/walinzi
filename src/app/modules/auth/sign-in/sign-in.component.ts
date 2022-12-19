import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from '@core/auth/auth.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class AuthSignInComponent implements OnInit {
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  signInForm!: UntypedFormGroup;
  showAlert = false;

  /**
   * Constructor
   */
  constructor(
    private _authService: AuthService,
    private _formBuilder: UntypedFormBuilder
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.signInForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Sign in
   */

  signIn(): void {
    this._authService.signIn(this.signInForm.value).subscribe(
      (response) => {
        // Handle success
        this.alert.type = 'success';
        this.alert.message = 'You have been signed in successfully!';
        this.showAlert = true;
      },
      (error) => {
        // Handle error
        this.alert.type = 'error';
        this.alert.message = error.error.message;
        this.showAlert = true;
      }
    );
  }
}
