import {Component, inject, output, signal} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {ButtonSelectArrowComponent} from '../../button-select-arrow/button-select-arrow.component';
import {MatIconModule} from '@angular/material/icon';
import {MenuProjectDataSource} from '../../../data-sources/menu-project.data-source';
import {CodeComponent} from '../../menu/code/code.component';
import {BreakpointService} from '../../../services/breakpoint.service';
import {NgIf} from '@angular/common';

@Component({
    selector: 'app-projects-selection',
    imports: [
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        ButtonSelectArrowComponent,
        CodeComponent,
        NgIf
    ],
    templateUrl: './projects-selection.component.html',
    styleUrl: './projects-selection.component.scss'
})
export class ProjectsSelectionComponent {

    public change = output<string[]>();

    public dataSource = new MenuProjectDataSource();

    private readonly selectedIds = signal<string[]>([]);
    protected readonly breakpointService = inject(BreakpointService);

    public isSelected(projectId: string): boolean {
        return this.selectedIds().indexOf(projectId) > -1;
    }

    public onItemClick(projectId: string) {
        this.selectedIds.update(selectedIds => {
            let projectIdIndex = selectedIds.indexOf(projectId);
            if (projectIdIndex >= 0)
                selectedIds.splice(projectIdIndex, 1);
            else
                selectedIds.push(projectId);
            return selectedIds;
        });
        this.change.emit([...this.selectedIds()]);
    }

}
