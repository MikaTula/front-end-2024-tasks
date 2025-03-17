import {inject, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../components/dialogs/confirmation/confirmation.component';

@Injectable({
    providedIn: 'root'
})
export class CommonPopupService {
    private readonly _dialog = inject(MatDialog);

    public openConfirmPopup(title: string, message: string) {
        return this._dialog.open(ConfirmDialogComponent, {
            data: {
                title: title,
                message: message
            }
        });
    }

}


