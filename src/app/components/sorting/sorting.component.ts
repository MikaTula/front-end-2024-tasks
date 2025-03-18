import {Component, effect, inject, input, linkedSignal, output, signal} from '@angular/core';
import {ISortRequest} from '../../interfaces/requests/sort-request';
import {IssueSortBy} from '../../types/issue.types';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {ProjectSortBy} from '../../types/project.types';
import {ButtonSelectArrowComponent} from '../button-select-arrow/button-select-arrow.component';
import {MatDivider} from '@angular/material/divider';
import {IssueSortByPipe} from '../../pipes/issue-sort-by.pipe';
import {NgIf} from '@angular/common';
import {BreakpointService} from '../../services/breakpoint.service';

@Component({
    selector: 'app-sorting',
    imports: [
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        ButtonSelectArrowComponent,
        MatDivider,
        IssueSortByPipe,
        NgIf,

    ],
    templateUrl: './sorting.component.html',
    styleUrl: './sorting.component.scss'
})
export class SortingComponent {
    public sortVariants = input<(IssueSortBy | ProjectSortBy)[]>([]);
    public sort = input.required<ISortRequest>();
    public sortPipeName = input.required<'issueSortBy' | 'projectSortBy'>();
    public change = output<ISortRequest>();

    public readonly sortBy = linkedSignal<string>(() => this.sort().sortBy);
    public readonly sortDir = linkedSignal<'asc' | 'desc'>(() => this.sort().sortDir);

    public readonly ascLabel = signal<string>('Ascending');
    public readonly descLabel = signal<string>('Descending');
    protected readonly breakpointService = inject(BreakpointService);

    constructor() {
        effect(() => {
            this.change?.emit({
                sortBy: this.sortBy(),
                sortDir: this.sortDir(),
            });
        })

        effect(() => {
            if (this.sortBy() === 'CreatedOn' || this.sortBy() === 'ModifiedOn') {
                this.ascLabel.set('Oldest');
                this.descLabel.set('Newest');
            } else {
                this.ascLabel.set('Ascending');
                this.descLabel.set('Descending');
            }
        })
    }

}
