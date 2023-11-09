import { Component, OnInit, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntil } from 'rxjs';

import { AuthService } from 'src/app/auth/data-access/auth.services';
import { Destroy } from '@shared/utils/destroy';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [Destroy]
})
export class LoginComponent implements OnInit {
  form!: UntypedFormGroup;
  private formBuilder = inject(UntypedFormBuilder)
  private _authService = inject(AuthService);
  private _destroy = inject(Destroy);
  private _activatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);

  constructor() {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  submit() {
    this._authService.signIn(this.form.value).pipe(takeUntil(this._destroy)).subscribe(() => {
      const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

      // Navigate to the redirect url
      this._router.navigateByUrl(redirectURL);

    })
  }

}
