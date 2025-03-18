import {Component, computed, effect, inject, input, signal} from '@angular/core';
import {IssueDataSource} from '../../data-sources/issue.data-source';
import {IssueComponent} from '../../components/issues/issue/issue.component';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs';
import {IssuePriority, issueSortVariants, IssueStage, IssueState} from '../../types/issue.types';
import {IIssueFilterRequest} from '../../interfaces/requests/project/issue-filter-request';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatChipListboxChange, MatChipsModule} from '@angular/material/chips';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {ProjectsSelectionComponent} from '../../components/controls/projects-selection/projects-selection.component';
import {MatInputModule} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {
    PrioritiesSelectionComponent
} from '../../components/priorities/priority-selection/priorities-selection.component';
import {NgIf} from '@angular/common';
import {ProjectPopupService} from '../../services/project.popup.service';
import {IssuePopupService} from '../../services/issue.popup.service';
import {PaginatorComponent} from '../../components/paginator/paginator.component';
import {SortingComponent} from '../../components/sorting/sorting.component';
import {IssueService} from '../../services/issue.service';
import {BreakpointService} from '../../services/breakpoint.service';
import {StateSelectionComponent} from '../../components/controls/state-selection/state-selection.component';

@Component({
    selector: 'app-issues',
    imports: [
        IssueComponent,
        MatListModule,
        MatProgressBarModule,
        MatChipsModule,
        MatButtonModule,
        MatMenuModule,
        ProjectsSelectionComponent,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatIcon,
        PrioritiesSelectionComponent,
        NgIf,
        PaginatorComponent,
        SortingComponent,
        StateSelectionComponent,

    ],
    templateUrl: './issues.component.html',
    styleUrl: './issues.component.scss'
})
export class IssuesComponent {
    public readonly projectId = input<string | null | undefined>(null);
    public readonly dataSource = new IssueDataSource();
    public readonly searchControl = new FormControl<string>(this.dataSource.filterRequest().searchTerm ?? '');
    public readonly selectedState = signal<IssueState>(this.dataSource.filterRequest().state ?? "Open");
    public readonly selectedProjectIds = signal<string[]>(this.dataSource.filterRequest().projectIds ?? []);
    public readonly selectedPriorities = signal<IssuePriority[]>(this.dataSource.filterRequest().priorities ?? []);
    public readonly sortVariants = issueSortVariants;
    protected readonly isOneProject = computed(() => {
            const projectId = this.projectId();
            return typeof (projectId) === 'string';
        }
    );
    protected readonly isAllProject = signal<boolean>(false);
    private readonly _projectPopupService = inject(ProjectPopupService);
    private readonly _issuePopupService = inject(IssuePopupService);
    private readonly _issueService = inject(IssueService);
    private readonly searchControlChanges = toSignal(this.searchControl.valueChanges.pipe(debounceTime(250)));
    private readonly filterRequest = computed<IIssueFilterRequest>(() => {
        return {
            searchTerm: this.searchControlChanges() ?? '',
            state: this.selectedState(),
            projectIds: this.selectedProjectIds(),
            priorities: this.selectedPriorities(),
        };
    });

    protected readonly breakpointService = inject(BreakpointService);

    constructor() {
        effect(() => {
            if (!this.filterRequest()) return;
            this.dataSource.changeFilter(this.filterRequest()!);
        });

        effect(() => {
            const projectId = this.projectId();
            if (projectId) {
                this.selectedProjectIds.set([projectId])
            }
        });
        effect(() => {
            this.isAllProject.set(!this.isOneProject());

        });
    }

    public onStateChanged(change: MatChipListboxChange) {
        if (!change.value) return;
        this.selectedState.set(change.value);
    }

    public onStateChangedValue(state: IssueState) {
        this.selectedState.set(state);
    }

    public editIssue(id: string) {
        this._issuePopupService.openEditIssue(id);
    }

    public createIssue() {
        this._issuePopupService.openCreateIssue(this.projectId());
    }

    public createProject() {
        this._projectPopupService.openCreateProject()
    }

    public onSetPriority(priority: IssuePriority, id: string) {
        this._issueService.setPriority(id, priority).subscribe();
    }

    public onSetStage(stage: IssueStage, id: string) {
        this._issueService.setStage(id, stage).subscribe();
    }

    public onSetState(state: IssueState, id: string) {
        this._issueService.setState(id, state).subscribe();
    }


    public onDelete(id: string) {
        this._issuePopupService.deleteIssue(id);
    }

}
