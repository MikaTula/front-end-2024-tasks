import {Component, DestroyRef, effect, inject, Input, signal, viewChild} from '@angular/core';

import {MatTableModule} from '@angular/material/table';

import {RouterModule} from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProjectService} from '../../../services/project.service';
import {IProjectResponse} from '../../../interfaces/responses/project/project-response';
import {CodeComponent} from '../../../components/menu/code/code.component';
import {DateViewPipe} from '../../../pipes/date-view.pipe';
import {IssuesComponent} from '../../issues/issues.component';
import {MatButton, MatFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {ProjectPopupService} from '../../../services/project.popup.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-project-detail-detail',
    imports: [
        MatTableModule,
        MatListModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        CodeComponent,
        DateViewPipe,
        IssuesComponent,
        MatButton,
        MatIcon,
        MatFabButton
    ],
    templateUrl: './project-detail.component.html',
    styleUrl: './project-detail.component.scss',
    host: {
        class: 'project-detail-detail'
    }
})
export class ProjectDetailComponent {

    protected projectIdInner = signal<string | null>(null);
    protected project = signal<IProjectResponse | null>(null);
    protected readonly _destroyRef = inject(DestroyRef);
    private readonly _projectService = inject(ProjectService);
    private readonly _projectPopupService = inject(ProjectPopupService);
    private issuesComponent = viewChild.required(IssuesComponent);

    constructor() {
        effect(() => {
            const projectId = this.projectIdInner();
            if (projectId) {
                this._projectService.getById(projectId).pipe(takeUntilDestroyed(this._destroyRef)).subscribe(
                    (project) => this.project.set(project)
                );
            }
        });
    }

    @Input()
    set projectId(projectId: string) {
        this.projectIdInner.set(projectId)
    }


    protected editProject() {

        const projectId = this.projectIdInner();
        if (projectId) {
            this._projectPopupService.openEditProject(projectId);
        }
    }

    protected createIssue() {
        this.issuesComponent().createIssue();
    }
}
