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
        PaginatorComponent
    ],
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
    public readonly dataSource = new ProjectDataSource();
    public readonly searchControl = new FormControl<string>(this.dataSource.filterRequest().searchTerm ?? '');
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
            this.dataSource.reload();
            this._router.navigate(['projects', result?.id]).then();
        });
    }

}
