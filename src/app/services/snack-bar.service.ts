import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackBarComponent} from '../components/snack-bar/snack-bar.component';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {
    private _snackBar = inject(MatSnackBar);

    openSnackBar(message: string, type: SnackBarType = SnackBarType.normal) {
        this._snackBar.openFromComponent(SnackBarComponent, {
            duration: this.getDurationInSeconds(type),
            panelClass: [this.getPanelClass(type)],
            data: {message: message, type: type}
        });
    }

    private getPanelClass(type: SnackBarType): string {
        switch (type) {
            case SnackBarType.error:
                return 'snack-bar--error';
            case SnackBarType.normal:
            default:
                return 'snack-bar--normal';
        }
    }

    private getDurationInSeconds(type: SnackBarType): number {
        switch (type) {
            case SnackBarType.error:
                return 3 * 1000;
            case SnackBarType.normal:
            default:
                return 1.5 * 1000;
        }
    }
}

export enum SnackBarType {
    normal,
    error
}

export interface ISnackBarData {
    message: string;
    type: SnackBarType;
}
