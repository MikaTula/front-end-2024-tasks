import {Component, inject, output, signal} from '@angular/core';
import {IssuePriority, selectablePriorities} from '../../../types/issue.types';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {PriorityListItemComponent} from '../priority-list-item/priority-list-item.component';
import {BreakpointService} from '../../../services/breakpoint.service';
import {ButtonSelectArrowComponent} from '../../button-select-arrow/button-select-arrow.component';
import {NgIf} from '@angular/common';

@Component({
    selector: 'app-priorities-selection',
    imports: [
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        PriorityListItemComponent,
        ButtonSelectArrowComponent,
        NgIf
    ],
    templateUrl: './priorities-selection.component.html',
    styleUrl: './priorities-selection.component.scss'
})
export class PrioritiesSelectionComponent {

    public change = output<IssuePriority[]>();
    public readonly selectablePriorities = selectablePriorities
    private readonly selectedPriorities = signal<IssuePriority[]>([]);
    protected readonly breakpointService = inject(BreakpointService);

    public isSelected(priority: IssuePriority): boolean {
        return this.selectedPriorities().indexOf(priority) > -1;
    }

    public onItemClick(priority: IssuePriority) {
        this.selectedPriorities.update(selectedPriorities => {
            let priorityIdIndex = selectedPriorities.indexOf(priority);
            if (priorityIdIndex >= 0)
                selectedPriorities.splice(priorityIdIndex, 1);
            else
                selectedPriorities.push(priority);
            return selectedPriorities;
        });
        this.change.emit([...this.selectedPriorities()]);
    }
}
