import {Routes} from '@angular/router';
import {ProjectsComponent} from './layout/projects/projects.component';
import {TasksComponent} from './layout/tasks/tasks.component';
import {IssuesComponent} from './layout/projects/issues/issues.component';
import {HomeComponent} from './layout/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    children: [
      {
        path: ':projectId',
        component: IssuesComponent
      }
    ]
  },
  {
    path: 'tasks',
    component: TasksComponent
  }
];
