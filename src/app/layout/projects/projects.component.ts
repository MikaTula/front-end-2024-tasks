import {Component, inject} from '@angular/core';
import {ProjectDataSource} from '../../data-sources/project.data-source';
import {MatTableModule} from '@angular/material/table';
import {MatButton, MatFabButton} from '@angular/material/button';
import {ProjectService} from '../../services/project.service';
import {IProjectRequest} from '../../interfaces/requests/project-request.interface';
import {MatDialog} from '@angular/material/dialog';
import {CreateProjectComponent} from './dialogs/create-project/create-project.component';
import {RouterModule, RouterOutlet} from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {MatListModule} from '@angular/material/list';

import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-projects',
  imports: [
    MatTableModule,
    MatButton,
    RouterOutlet,
    AsyncPipe,
    MatListModule,
    RouterModule,
    MatIcon,
    MatFabButton
  ],
  templateUrl: './projects.component.html',
  standalone: true,
  host: {
    class: 'app-projects'
  }
})
export class ProjectsComponent {

  private readonly _dialog = inject(MatDialog);
  private readonly _projectService = inject(ProjectService);

  public dataSource = new ProjectDataSource();

  public displayedColumns: string[] = ['id', 'code', 'name'];

  public createProject() {
    const dialogRef = this._dialog.open(CreateProjectComponent);

    dialogRef.afterClosed().subscribe((request: IProjectRequest) => {
      if(!request) return;

      // let request: IProjectRequest = {
      //   code: "TP2",
      //   name: "Test Project from Angular",
      // };

      this._projectService.createProject(request).subscribe({
        next: data => this.dataSource.refresh()
      });
    });
  }
}
