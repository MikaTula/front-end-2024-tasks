import {Component, computed, Inject, inject, OnInit, signal, Signal} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {ProjectService} from '../../../services/project.service';
import {Router} from '@angular/router';
import {take} from 'rxjs';

@Component({
    selector: 'app-project-create-update',
    imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule,
        MatButtonModule
    ],
    templateUrl: './project-create-update.component.html',
    styleUrl: './project-create-update.component.scss'
})
export class ProjectCreateUpdateComponent implements OnInit {

    private readonly _projectService = inject(ProjectService);
    private readonly _router = inject(Router);
    private readonly _dialogRef = inject(MatDialogRef<ProjectCreateUpdateComponent>);

    public readonly isInvalidState: Signal<boolean> = computed(() => {
        return this.createFormStatusChanges() != 'VALID';
    });

    public form: FormGroup<IProjectForm> = new FormGroup<IProjectForm>({
        code: new FormControl<string>("", {
            validators: [Validators.required, Validators.minLength(2), Validators.maxLength(2),],
            nonNullable: true
        }),
        name: new FormControl<string>("", {validators: [Validators.required], nonNullable: true}),
        description: new FormControl<string>(""),
    });

    public createFormStatusChanges = toSignal(this.form.statusChanges);

    protected presetProjectId = signal<string | null>(null);

    public get code(): FormControl {
        return this.form.controls.code;
    }

    public get name(): FormControl {
        return this.form.controls.name;
    }

    public onSave() {
        if (this.isInvalidState()) return;


        const presetProjectId = this.presetProjectId();
        if (presetProjectId) {
            this._projectService.updateProject(presetProjectId, {
                code: this.form.controls.code.value,
                name: this.form.controls.name.value,
                description: this.form.controls.description.value ?? null
            }).subscribe(() => this._dialogRef.close())
        } else {
            this._projectService.createProject({
                code: this.form.controls.code.value,
                name: this.form.controls.name.value,
                description: this.form.controls.description.value ?? null
            }).subscribe(() => this._dialogRef.close())
            // {
            //     next: data => {
            //         let projectUrl = this._router.createUrlTree([data.id]);
            //         this._router.navigateByUrl(projectUrl).then();
            //     })
        }
    }

    constructor(@Inject(MAT_DIALOG_DATA) data: { projectId: string }) {
        if (data.projectId) {
            this.presetProjectId.set(data.projectId);
        }
    }

    ngOnInit() {
        const projectId = this.presetProjectId();
        if (projectId) {
            this._projectService.getById(projectId).pipe(take(1)).subscribe(
                project => this.form.patchValue(project)
            );
        }
    }

    public onCancel() {
        this._dialogRef.close();
    }

}

export interface IProjectForm {
    code: FormControl<string>;
    name: FormControl<string>;
    description: FormControl<string | null | undefined>
}
