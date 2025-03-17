import {Component, inject, Inject, signal} from '@angular/core';
import {IConfirmDialog} from '../../../interfaces/confirm-dialog-model';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
    MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
    selector: 'app-confirmation',
    templateUrl: 'confirmation.component.html',
    imports: [
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,
        MatButton
    ],
    styleUrls: ['confirmation.component.scss']
})
export class ConfirmDialogComponent {
    protected readonly title = signal<string>('')
    protected readonly message = signal<string>('')
    protected readonly _dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);

    constructor(@Inject(MAT_DIALOG_DATA) public data: IConfirmDialog) {
        this.title.set(data.title);
        this.message.set(data.message);
    }

    public onConfirm(): void {
        this._dialogRef.close(true);
    }

    public onDismiss(): void {
        this._dialogRef.close(false);
    }
}
