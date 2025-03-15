import {Component, computed, effect, Inject, inject, OnInit, signal, Signal} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';
import {IssueService} from '../../../services/issue.service';
import {IssuePriority} from '../../../types/issue.types';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {ProjectDataSource} from '../../../data-sources/project.data-source';

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

    private readonly _issueService = inject(IssueService);
    private readonly _dialogRef = inject(MatDialogRef<IssueCreateUpdateComponent>);

    protected presetProjectId = signal<string | null>(null);
    protected presetIssueId = signal<string | null>(null);

    public projectDataSource = new ProjectDataSource();

    public readonly selectablePriorities: IssuePriority[] = [
        "Critical",
        "Major",
        "Normal",
        "Minor"
    ];

    public readonly isInvalidState: Signal<boolean> = computed(() => {
        return this.createFormStatusChanges() != 'VALID';
    });

    public form: FormGroup<IIssueForm> = new FormGroup<IIssueForm>({
        projectId: new FormControl<string>("", {validators: [Validators.required], nonNullable: true}),
        name: new FormControl<string>("", {validators: [Validators.required], nonNullable: true}),
        priority: new FormControl<IssuePriority>("Normal", {validators: [Validators.required], nonNullable: true}),
        description: new FormControl<string>("", {validators: [Validators.required], nonNullable: true}),
    });

    public createFormStatusChanges = toSignal(this.form.statusChanges);

    public get name(): FormControl {
        return this.form.controls.name;
    }

    public onCancel() {
        this._dialogRef.close();
    }

    public onCreate() {
        if (this.isInvalidState()) return;

        this._issueService.createIssue(
            {
                projectId: this.form.controls.projectId.value,
                name: this.form.controls.name.value,
                priority: this.form.controls.priority.value,
                description: this.form.controls.description.value
            }
        ).subscribe({
            next: data => {
                this._dialogRef.close(data.id);
            }
        });
    }

    constructor(@Inject(MAT_DIALOG_DATA) data: { projectId: string }) {

        effect(() => {
            const presetProjectId = this.presetProjectId();
            if (presetProjectId) {
                this.form.controls.projectId.disable();
                this.form.controls.projectId.setValue(presetProjectId);
            }
        });

        if (data.projectId) {
            this.presetProjectId.set(data.projectId);
        }
    }

    ngOnInit() {

    }

}


export interface IIssueForm {
    projectId: FormControl<string>;
    name: FormControl<string>;
    priority: FormControl<IssuePriority>;
    description: FormControl<string>
}
