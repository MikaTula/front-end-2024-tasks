import {Component, Inject, inject, signal, ViewEncapsulation} from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {
    MAT_SNACK_BAR_DATA,
    MatSnackBarAction,
    MatSnackBarActions,
    MatSnackBarLabel,
    MatSnackBarRef
} from '@angular/material/snack-bar';
import {ISnackBarData, SnackBarType} from '../../services/snack-bar.service';

@Component({
    selector: 'app-snack-bar',
    templateUrl: 'snack-bar.component.html',
    styleUrl: 'snack-bar.component.scss',
    imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
    encapsulation: ViewEncapsulation.None
})
export class SnackBarComponent {
    protected snackBarRef = inject(MatSnackBarRef);
    protected dataInner = signal<string>('');
    protected typeInner = signal<SnackBarType>(SnackBarType.normal);

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: ISnackBarData) {
        if (data.message) {
            this.dataInner.set(data.message)
        }
        if (data.type) {
            this.typeInner.set(data.type)
        }
    }
}
