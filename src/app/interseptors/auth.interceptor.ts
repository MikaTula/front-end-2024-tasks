import {HttpInterceptorFn} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {inject} from '@angular/core';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  let headers = req.headers;
  headers = headers.set('Content-Type', 'application/json');

  if (authService.isAuthorized()) {
    headers = headers.set('Authorization', `Bearer ${authService.accessToken()}`);
  }

  req = req.clone({headers: headers});

  return next(req);
};
