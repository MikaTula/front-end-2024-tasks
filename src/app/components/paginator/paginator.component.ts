import {Component, inject, input} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {BaseDataSource} from '../../data-sources/base.data-source';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {BreakpointService} from '../../services/breakpoint.service';
import {stageClass} from '../../types/issue.types';

@Component({
    selector: 'app-paginator',
    imports: [
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatPaginator
    ],
    templateUrl: './paginator.component.html',
    styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
    public dataSource = input.required<BaseDataSource<any, any>>();
    protected readonly breakpointService = inject(BreakpointService);

    protected handlePageEvent($event: PageEvent) {
        this.dataSource().changePage({
            pageNumber: $event.pageIndex,
            pageSize: $event.pageSize
        })
    }

    protected readonly stageClass = stageClass;
}
