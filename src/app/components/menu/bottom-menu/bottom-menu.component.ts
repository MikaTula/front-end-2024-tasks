import {Component, inject} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {GenerateService} from '../../../services/generate.service';

@Component({
    selector: 'app-bottom-menu',
    imports: [
        MatIcon,
        MatIconButton,
        RouterLink
    ],
    templateUrl: './bottom-menu.component.html',
    styleUrl: './bottom-menu.component.scss',
    host: {
        'class': 'app-bottom-menu',
    }
})
export class BottomMenuComponent {
    private _generateService = inject(GenerateService);

    protected generate() {
        this._generateService.regenerate();
    }

}
