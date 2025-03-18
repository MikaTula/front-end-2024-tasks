import {Component, computed, effect, inject} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatChipsModule} from '@angular/material/chips';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {ProjectPopupService} from '../../services/project.popup.service';
import {ProjectDataSource} from '../../data-sources/project.data-source';
import {IProjectFilterRequest} from '../../interfaces/requests/project/project-filter-request';
import {Router} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {ProjectComponent} from '../../components/projects/project/project.component';
import {PaginatorComponent} from '../../components/paginator/paginator.component';
import {SortingComponent} from '../../components/sorting/sorting.component';
import {projectSortVariants} from '../../types/project.types';
import {BreakpointService} from '../../services/breakpoint.service';
import {NgIf} from '@angular/common';


@Component({
    selector: 'app-issues',
    imports: [
        MatListModule,
        MatProgressBarModule,
        MatChipsModule,
        MatButtonModule,
        MatMenuModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIcon,
        ProjectComponent,
        PaginatorComponent,
        SortingComponent,
        NgIf
    ],
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
    protected readonly breakpointService = inject(BreakpointService);
    public readonly dataSource = new ProjectDataSource();
    public readonly searchControl = new FormControl<string>(this.dataSource.filterRequest().searchTerm ?? '');

    public readonly sortVariants = projectSortVariants;
    private _router = inject(Router);
    private readonly _projectPopupService = inject(ProjectPopupService);


    private readonly searchControlChanges = toSignal(this.searchControl.valueChanges.pipe(debounceTime(250)));
    private readonly filterRequest = computed<IProjectFilterRequest>(() => {
        return {
            searchTerm: this.searchControlChanges() ?? '',
        };
    });

    constructor() {
        effect(() => {
            if (!this.filterRequest()) return;
            this.dataSource.changeFilter(this.filterRequest()!);
        });
    }

    public createProject() {
        const popupRef = this._projectPopupService.openCreateProject()
        popupRef.afterClosed().subscribe(result => {
            if (!result) return;
            this.goToProject(result?.id)
        });
    }

    public editProject(id: string) {
        this._projectPopupService.openEditProject(id);
    }


    public deleteProject(id: string) {
        this._projectPopupService.deleteProject(id);
    }

    public goToProject(id: string) {
        this._router.navigate(['projects', id]).then();
    }


}
