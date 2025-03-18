import {inject, Injectable} from '@angular/core';
import {MenuProjectDataSource} from '../data-sources/menu-project.data-source';
import {MenuIssueDataSource} from '../data-sources/menu-issue.data-source';
import {ProjectService} from './project.service';
import {IssueService} from './issue.service';
import {forkJoin, of} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {faker} from '@faker-js/faker/locale/en';
import {selectablePriorities} from '../types/issue.types';
import {SnackBarService} from './snack-bar.service';

@Injectable({
    providedIn: 'root'
})
export class GenerateService {
    private _projectService = inject(ProjectService);
    private _projectDataSource = new MenuProjectDataSource();
    private _issueService = inject(IssueService);
    private _issueDataSource = new MenuIssueDataSource();
    private _snackBarService = inject(SnackBarService);

    regenerate() {
        forkJoin([
                ...this._projectDataSource.data().map((project) =>
                    this._projectService.delete(project.id)
                ),
                ...this._issueDataSource.data().map((project) =>
                    this._projectService.delete(project.id)
                ),
                of(null)
            ]
        ).pipe(
            switchMap(
                () => {
                    const countProjects = faker.number.int({min: 10, max: 30})
                    const projects = [];
                    for (let i = 0; i < countProjects; i++) {
                        projects.push(this._projectService.createProject(this.generateProjectData()));
                    }
                    return forkJoin(projects);
                }
            ),
            switchMap(
                (projects) => {
                    const issues = [];
                    for (const projectKey in projects) {
                        const countIssues = faker.number.int({min: 10, max: 30});

                        for (let i = 0; i < countIssues; i++) {
                            issues.push(this._issueService.createIssue(this.generateIssueData(projects[projectKey].id)));
                        }
                    }
                    return forkJoin(issues);
                }
            ),
            tap(() => this._snackBarService.openSnackBar('Data was generated'))
        ).subscribe();

    }

    generateProjectData() {
        return {
            code: faker.person.fullName().substring(0, 2),
            name: faker.book.publisher(),
            description: faker.lorem.words({min: 10, max: 30})
        };
    }

    generateIssueData(projectId: string) {
        return {
            projectId: projectId,
            priority: selectablePriorities[faker.number.int({min: 0, max: selectablePriorities.length - 1})],
            name: faker.lorem.words({min: 3, max: 10}),
            description: faker.lorem.words({min: 10, max: 30})
        };
    }
}
