import {Component, input} from '@angular/core';
import {IssuePriority, priorityClass} from '../../../types/issue.types';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {NgClass, NgIf} from '@angular/common';

@Component({
    selector: 'app-priority-list-item',
    imports: [
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        NgClass,
        NgIf
    ],
    templateUrl: './priority-list-item.component.html',
    styleUrl: './priority-list-item.component.scss'
})
export class PriorityListItemComponent {
    public priority = input.required<IssuePriority>();
    public showLabel = input<boolean>(true);
    public priorityClass = priorityClass;
}
