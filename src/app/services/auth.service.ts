import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {IAuthData} from '../interfaces/auth/auth.interfaces';
import {ILoginRequest} from '../interfaces/requests/login-request';
import {IAuthResponse} from '../interfaces/response/auth/auth-response';
import {LocalStorage} from '../utils/storage/local-storage';
import {Router} from '@angular/router';

const AUTH_DATA = 'AUTH_DATA';
const ACCESS_TOKEN = 'ACCESS_TOKEN';
const PASSWORD_DATA = 'PASSWORD_DATA';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _http = inject(HttpClient);
  private readonly _router = inject(Router);

  private readonly _apiPath = '/api/v1.0/auth';

  public readonly isRefreshing$: BehaviorSubject<boolean> = new BehaviorSubject<any>(false);

  private readonly _accessToken = signal<string>('');
  private readonly _authData = signal<IAuthData | undefined>(undefined);

  public readonly isAuthorized = computed(() => {
    return !!this._authData();
  });

  public readonly authData = computed(() => {
    return this._authData();
  });

  public readonly accessToken = computed(() => {
    return this._accessToken();
  });

  constructor() {
    const accessToken = LocalStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      this.updateAuthData(accessToken)
    }
  }

  public login(request: ILoginRequest): Observable<IAuthResponse> {

    return this._http.post<IAuthResponse>(`${this._apiPath}/login`, JSON.stringify(request));
  }

  public updateAuthData(accessToken: string): void {
    this._accessToken.set(accessToken);

    const base64Url = accessToken.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const json = window.atob(base64);
    const payload = JSON.parse(json);

    this._authData.set({
      email: payload.email,
      name: payload.name
    });

    LocalStorage.setItem(ACCESS_TOKEN, accessToken);
    LocalStorage.setItem(AUTH_DATA, json);
  }

  public savePassData(email: string, password: string): void {
    LocalStorage.setItem(PASSWORD_DATA, JSON.stringify({email: email, password: password}));
  }

  public reset(): void {
    LocalStorage.setItem(ACCESS_TOKEN, undefined);
    LocalStorage.setItem(AUTH_DATA, undefined);
    LocalStorage.setItem(PASSWORD_DATA, undefined);

    this._accessToken.set('');
    this._authData.set(undefined);
  }

  public refreshToken(): Observable<IAuthResponse> {
    const json = LocalStorage.getItem(PASSWORD_DATA);
    if (json) {
      const payload = JSON.parse(json);
      return this.login({
        email: payload.email,
        password: payload.password
      }).pipe(
        tap(
          result => this.updateAuthData(result.accessToken)
        )
      )
    }
    this._router.navigateByUrl('/auth/login').then();
    throw new Error();
  }

}
