import {Component, input} from '@angular/core';
import {IssueStage, stageClass} from '../../../types/issue.types';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {NgClass, NgIf} from '@angular/common';

@Component({
    selector: 'app-stage-list-item',
    imports: [
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        NgClass,
        NgIf
    ],
    templateUrl: 'stage-list-item.component.html',
    styleUrl: 'stage-list-item.component.scss'
})
export class StageListItemComponent {
    public stage = input.required<IssueStage>();
    public showLabel = input<boolean>(true);
    protected stageClass = stageClass;
}
