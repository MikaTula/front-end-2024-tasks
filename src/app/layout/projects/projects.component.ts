import {Component, effect, inject} from '@angular/core';
import {ProjectDataSource} from '../../data-sources/project.data-source';
import {MatTableModule} from '@angular/material/table';
import {MatAnchor} from '@angular/material/button';
import {ProjectService} from '../../services/project.service';
import {RouterModule} from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {toSignal} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs';

@Component({
    selector: 'app-projects',
    imports: [
        MatTableModule,
        MatListModule,
        RouterModule,
        MatAnchor,
        FormsModule,
        MatFormField,
        MatInput,
        MatLabel,
        ReactiveFormsModule
    ],
    templateUrl: './projects.component.html',
    host: {
        class: 'app-projects'
    }
})
export class ProjectsComponent {

    private readonly _projectService = inject(ProjectService);

    public dataSource = new ProjectDataSource();

    public filterForm: FormGroup = new FormGroup({
        searchTerm: new FormControl<string>("")
    });

    private readonly filterRequest = toSignal(this.filterForm.valueChanges.pipe(debounceTime(300)));

    constructor() {
        effect(() => {
            this.dataSource.changeFilter(this.filterRequest());
        });
    }
}
