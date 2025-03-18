import {HttpEvent, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';
import {SnackBarService, SnackBarType} from '../services/snack-bar.service';

export const refreshInterceptor: HttpInterceptorFn = (req, next) => {

    const authService = inject(AuthService);
    const snackBarService = inject(SnackBarService);

    return new Observable<HttpEvent<any>>(subscriber => {
        let originalRequestSubscription = next(req).subscribe({
            next: response => subscriber.next(response),
            error: error => {
                if (error.status === 401) {
                    authService.handleUnauthorizedError(subscriber, req);
                } else if (error.status === 400) {
                    snackBarService.openSnackBar('Auth Error: ' + error.error.detail, SnackBarType.error);
                    subscriber.error(error);
                } else {
                    snackBarService.openSnackBar('Request Error', SnackBarType.error);
                    subscriber.error(error);
                }
            },
            complete: () => subscriber.complete()
        });

        return () => {
            originalRequestSubscription.unsubscribe();
        };
    });
};
