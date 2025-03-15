import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

export enum CommonEventEnum {
    created = 'created',
    updated = 'updated',
    deleted = 'deleted'
}

@Injectable({
    providedIn: 'root'
})
export class ProjectRootService {
    readonly event$: Subject<CommonEventEnum> = new Subject<CommonEventEnum>();
}
