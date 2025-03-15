import {Component, input} from '@angular/core';
import {NgStyle} from '@angular/common';
import {stringToColor} from '../../../utils/utils';

@Component({
    selector: 'app-code',
    imports: [
        NgStyle
    ],
    templateUrl: './code.component.html',
    styleUrl: './code.component.scss',
    host: {
        'class': 'code',
    }
})
export class CodeComponent {
    public code = input.required<string>();
    public name = input.required<string>();

    protected stringToColor(str: string): string {
        return stringToColor(str);
    }
}
