import {AfterViewInit, Component, computed, inject, Signal, ViewEncapsulation} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';
import {ILoginForm} from '../../../interfaces/auth/auth.interfaces';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-component',
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-login'
  }
})
export class LoginComponent implements AfterViewInit {
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  public readonly loginForm = new FormGroup<ILoginForm>({
    email: new FormControl<string>("", {nonNullable: true, validators: [Validators.required]}),
    password: new FormControl<string>("", {nonNullable: true, validators: [Validators.required]}),
  });

  public loginFormStatusChanges = toSignal(this.loginForm.statusChanges);

  public readonly isInvalidState: Signal<boolean> = computed(() => {
    return this.loginFormStatusChanges() != 'VALID';
  });


  public get email(): FormControl {
    return this.loginForm.controls.email;
  }

  public get password(): FormControl {
    return this.loginForm.controls.password;
  }

  ngAfterViewInit() {
    this.loginForm.setValue(
      {
        email: "user-email@test.test",
        password: "password"
      }
    );
  }

  public login() {
    if (this.isInvalidState()) return;

    this._authService.login({
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    }).subscribe({
      next: async result => {
        this._authService.savePassData(this.loginForm.controls.email.value, this.loginForm.controls.password.value);
        this._authService.updateAuthData(result.accessToken);
        await this._router.navigateByUrl('');
      }
    });
  }
}

