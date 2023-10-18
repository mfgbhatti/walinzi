import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { takeUntil } from 'rxjs';

import { UserService } from '../../data-access/user.service';
import { Destroy } from '@shared/utils/destroy';
import { matchValidator } from '../../util/password.validator';


@Component({
  selector: 'activate-user',
  template: `
    <div class="container">
      <div class="d-flex justify-content-center pt-5">
        <ng-container *ngIf="is_user && is_invalid == false">
        <form [formGroup]="form" class="py-5 my_form row">
          <mat-form-field class="pb-2">
            <mat-label>Password</mat-label>
            <input
              matInput
              required
              formControlName="password1"
              type="password"
            />
            <mat-error *ngIf="this.form.controls['password1'].hasError('minlength')">
              Password must be 10 characters long, contain mix of alphabets, numbers and symbols.
            </mat-error>
          </mat-form-field>
          <mat-form-field class="pb-2">
            <mat-label>Confirm Password</mat-label>
            <input
              matInput
              required
              formControlName="password2"
              type="password"
            />
            <mat-error *ngIf="this.form.controls['password2'].hasError('matching')">
              Password must match.
            </mat-error>
          </mat-form-field>
          <div>
            <button
              type="button"
              mat-raised-button
              (click)="submit()"
              color="primary"
              class="btn submit col-3"
              [disabled]="!this.form.valid"
            >
              Submit
            </button>
            <button
              type="button"
              mat-raised-button
              (click)="resetForm()"
              color="accent"
              class="btn submit col-3 ms-4"
            >
              Reset
            </button>
          </div>
        </form>
        </ng-container>
      </div>
      <div class="row d-flex justify-content-center">
        <ng-container *ngIf="is_user == false">
          <h2>User activatin</h2>
          <p>Please wait</p>
        </ng-container>
        <ng-container *ngIf="is_invalid">
          <h2>500 - Internal server error</h2>
          <p>There is something wrong with your request.</p>
          <p>Please contact your system administrator.</p>
        </ng-container>
      </div>
    </div>
  `,
  styles: [`.my_form{width: 600px}`],
  providers: [Destroy],
})
export class ActivateUserComponent implements OnInit {

  is_user: boolean = false;
  is_invalid: boolean = false;
  form!: UntypedFormGroup;
  user_id: string = '';
  activation_key: string = '';

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  formBuilder = inject(UntypedFormBuilder);
  userService = inject(UserService);
  _destroy = inject(Destroy);

  ngOnInit(): void {
    this.setForm();
    this.user_id = this.activatedRoute.snapshot.params['user_id'];
    this.activation_key = this.activatedRoute.snapshot.params['activation_key'];
    this.userService
      .activate(this.user_id, this.activation_key)
      .pipe(takeUntil(this._destroy))
      .subscribe((response) => {
        if (response.success) {
          // this.router.navigate(['/user']);
          this.is_user = true;
          console.log(response.success);
        } else {
          this.is_invalid = true
          console.log('Invalid activation key');
        }
      });
  }

  setForm() {
    this.form = this.formBuilder.group({
      password1: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(8),
        matchValidator('password2', true)
      ]],
      password2: ['', [Validators.required, matchValidator('password1')]],
    });
  }

  resetForm() {
    this.form.reset();
  }

  submit() {
    this.userService
      .setUserPassword(
        this.form.controls['password1'].value,
        this.user_id,
        this.activation_key,
      ).pipe(takeUntil(this._destroy))
      .subscribe((response) => {
        if (response.success) {
          // this.router.navigate(['/user']);
          console.log('Password is set');
        } else {
          console.log('Invalid request');
        }
      });
  }
}
