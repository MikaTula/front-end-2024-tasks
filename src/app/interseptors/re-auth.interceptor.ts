import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import {inject} from '@angular/core';
import {filter, Observable, take, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';

export const ReAuthInterceptor: HttpInterceptorFn = (request, next) => {

  const _authService = inject(AuthService);
  const http = inject(HttpClient)
  // let _isRefreshing = false;
  // const _isRefreshing$: BehaviorSubject<boolean> = new BehaviorSubject<any>(false);

  return next(request).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return _handle401Answer(request, next);
      } else {
        console.error(error);
        return throwError(() => error);
      }
    })
  );


  function _handle401Answer(request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    if (!_authService.isRefreshing$.value) {

      _authService.isRefreshing$.next(true);

      return _authService
        .refreshToken()
        .pipe(
          switchMap(() => {
            _authService.isRefreshing$.next(false);
            return http.request(request);
          })
        );
    } else {
      return _authService.isRefreshing$.pipe(
        filter((refreshing) => refreshing),
        take(1),
        switchMap((jwt) => {
          return next(request);
        })
      );
    }
  }

}
