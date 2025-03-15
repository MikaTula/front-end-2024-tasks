import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {CommonEventEnum} from '../enums/common-event.enum';

@Injectable({
    providedIn: 'root'
})
export class IssueRootService {
    readonly event$: Subject<CommonEventEnum> = new Subject<CommonEventEnum>();
}
