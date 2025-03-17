import {Component, input, output} from '@angular/core';
import {MatRipple} from '@angular/material/core';
import {RelativeTimePipe} from '../../../pipes/relative-time.pipe';
import {MatTooltipModule} from '@angular/material/tooltip';
import {IIssueListResponse} from '../../../interfaces/responses/issue/issue-list-response.interface';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {IssuePriority, IssueStage, IssueState, selectablePriorities, selectableStage} from '../../../types/issue.types';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {PriorityListItemComponent} from '../../priorities/priority-list-item/priority-list-item.component';
import {StageListItemComponent} from '../../stages/stage-list-item/stage-list-item.component';

@Component({
    selector: 'app-issue',
    imports: [
        RelativeTimePipe,
        MatTooltipModule,
        PriorityListItemComponent,
        MatMenu,
        MatMenuTrigger,
        MatMenuItem,
        MatButton,
        MatIcon,
        MatIconButton,
        PriorityListItemComponent,
        PriorityListItemComponent,
        StageListItemComponent
    ],
    templateUrl: './issue.component.html',
    styleUrls: ['./issue.component.scss'],
    hostDirectives: [
        MatRipple
    ],
    host: {
        class: 'app-issue'
    }
})
export class IssueComponent {
    public readonly issue = input.required<IIssueListResponse>();
    public readonly selectablePriorities = selectablePriorities;
    public readonly selectableStage = selectableStage;
    public readonly onSetPriority = output<IssuePriority>();
    public readonly onSetStage = output<IssueStage>();
    public readonly onSetState = output<IssueState>();
    public readonly onDelete = output();

    protected onStateChanged(): void {
        this.onSetState.emit(this.issue().state === "Open" ? "Closed" : "Open");
    }
}
