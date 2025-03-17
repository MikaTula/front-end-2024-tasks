import {Component, computed, effect, Inject, inject, OnInit, signal, Signal} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';
import {IssueService} from '../../../services/issue.service';
import {IssuePriority, selectablePriorities} from '../../../types/issue.types';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {ProjectDataSource} from '../../../data-sources/project.data-source';
import {take} from 'rxjs';

@Component({
    selector: 'app-issue-create-update',
    imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        MatButtonModule
    ],
    templateUrl: './issue-create-update.component.html',
    styleUrl: './issue-create-update.component.scss'
})
export class IssueCreateUpdateComponent implements OnInit {

    public projectDataSource = new ProjectDataSource();
    public readonly selectablePriorities = selectablePriorities;
    public form: FormGroup<IIssueForm> = new FormGroup<IIssueForm>({
        projectId: new FormControl<string>("", {validators: [Validators.required], nonNullable: true}),
        name: new FormControl<string>("", {validators: [Validators.required], nonNullable: true}),
        priority: new FormControl<IssuePriority>("Normal", {validators: [Validators.required], nonNullable: true}),
        description: new FormControl<string>("", {validators: [Validators.required], nonNullable: true}),
    });
    public createFormStatusChanges = toSignal(this.form.statusChanges);
    public readonly isInvalidState: Signal<boolean> = computed(() => {
        return this.createFormStatusChanges() != 'VALID';
    });
    protected presetProjectId = signal<string | null>(null);
    protected presetIssueId = signal<string | null>(null);
    private readonly _issueService = inject(IssueService);
    private readonly _dialogRef = inject(MatDialogRef<IssueCreateUpdateComponent>);

    constructor(@Inject(MAT_DIALOG_DATA) data: { projectId?: string, issueId?: string }) {

        effect(() => {
            const presetProjectId = this.presetProjectId();
            if (presetProjectId) {
                this.form.controls.projectId.setValue(presetProjectId);
                this.form.controls.projectId.disable();
            }
        });

        if (data.projectId) {
            this.presetProjectId.set(data.projectId);
        }
        if (data.issueId) {
            this.presetIssueId.set(data.issueId);
        }

    }

    public get name(): FormControl {
        return this.form.controls.name;
    }

    public get projectId(): string {
        return this.form.controls.projectId.value;
    }

    public onCancel() {
        this._dialogRef.close();
    }

    public onSave() {
        if (this.isInvalidState()) return;

        const presetIssieId = this.presetIssueId();
        if (presetIssieId) {
            this._issueService.updateIssue(presetIssieId,
                {
                    name: this.form.controls.name.value,
                    priority: this.form.controls.priority.value,
                    description: this.form.controls.description.value
                }
            ).subscribe(() => this._dialogRef.close())
        } else {
            this._issueService.createIssue(
                {
                    projectId: this.form.controls.projectId.value,
                    name: this.form.controls.name.value,
                    priority: this.form.controls.priority.value,
                    description: this.form.controls.description.value
                }
            ).subscribe(() => this._dialogRef.close())
        }
    }

    ngOnInit() {
        const issueId = this.presetIssueId();
        if (issueId) {
            this._issueService.getById(issueId).pipe(take(1)).subscribe(
                issue => {
                    this.form.patchValue(issue)
                    this.presetProjectId.set(issue.projectId);
                }
            );
        }
    }

}


export interface IIssueForm {
    projectId: FormControl<string>;
    name: FormControl<string>;
    priority: FormControl<IssuePriority>;
    description: FormControl<string>
}
