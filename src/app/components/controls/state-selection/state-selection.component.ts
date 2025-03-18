import {Component, output, signal} from '@angular/core';
import {IssueState, issueStateVariants} from '../../../types/issue.types';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {ButtonSelectArrowComponent} from '../../button-select-arrow/button-select-arrow.component';

@Component({
    selector: 'app-state-selection',
    imports: [
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        ButtonSelectArrowComponent
    ],
    templateUrl: './state-selection.component.html',
    styleUrl: './state-selection.component.scss'
})
export class StateSelectionComponent {
    public change = output<IssueState>();
    public readonly issueStateVariants = issueStateVariants
    private readonly selectedStates = signal<IssueState>('Open');

    public isSelected(state: IssueState): boolean {
        return this.selectedStates().indexOf(state) > -1;
    }

    public onItemClick(state: IssueState) {
        this.selectedStates.set(state)
        this.change.emit(state);
    }
}
