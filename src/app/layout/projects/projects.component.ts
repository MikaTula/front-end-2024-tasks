import {Component, effect, inject} from '@angular/core';
import {ProjectDataSource} from '../../data-sources/project.data-source';
import {MatTableModule} from '@angular/material/table';
import {MatButton, MatFabButton} from '@angular/material/button';
import {ProjectService} from '../../services/project.service';
import {MatDialog} from '@angular/material/dialog';
import {RouterModule, RouterOutlet} from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {CreateProjectComponent} from '../../components/projects/dialogs/create-project/create-project.component';
import {DialogService} from '../../services/dialog.service';
import {IProjectRequest} from '../../interfaces/requests/project-request.interface';
import {FormControl, FormGroup} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs';
import {ProjectListItemComponent} from '../../components/menu/project-item/project-list-item.component';

@Component({
  selector: 'app-projects',
  imports: [
    MatTableModule,
    MatButton,
    RouterOutlet,
    MatListModule,
    RouterModule,
    MatIcon,
    MatFabButton,
    ProjectListItemComponent
  ],
  templateUrl: './projects.component.html',
  standalone: true,
  host: {
    class: 'app-projects'
  },
  providers: [
    {
      provide: DialogService,
      useFactory: (dialog: MatDialog) => new DialogService(dialog),
      deps: [MatDialog],
    },
  ]
})
export class ProjectsComponent {

  private readonly _dialog = inject(DialogService);
  private readonly _projectService = inject(ProjectService);

  public dataSource = new ProjectDataSource();

  public filterForm: FormGroup = new FormGroup({
    searchTerm: new FormControl<string>("")
  });

  private readonly filterRequest = toSignal(this.filterForm.valueChanges.pipe(debounceTime(300)));

  public createProject() {
    const dialogRef = this._dialog.open(CreateProjectComponent);

    dialogRef.afterClosed().subscribe((request: IProjectRequest) => {
      if (!request) return;
      this._projectService.createProject(request).subscribe(
        //   {
        //   next: data => this.dataSource.refresh()
        // }
      );
    });
  }

  // public recreateProject() {
  //   this._projectService.recreateProjects().subscribe();
  // }


  constructor() {
    effect(() => {
      this.dataSource.changeFilter(this.filterRequest());
    });
  }
}
