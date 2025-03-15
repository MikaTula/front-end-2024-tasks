import {DatePipe} from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'dateView',
})
export class DateViewPipe implements PipeTransform {
    constructor() {
    }

    // use only format date (without timezones)
    transform(date: Date | any, needDate: boolean = true, needTime: boolean = true): string {
        if (!date) {
            return '';
        }
        let format = '';
        const dateFormat = "dd.MM.yyyy";
        if (needDate) {
            format += dateFormat;
        }
        if (needTime) {
            if (needDate) {
                format += ' ';
            }

            format += 'hh:mm aa';
        }
        return new DatePipe('en-US').transform(date, format) ?? '';
    }
}
