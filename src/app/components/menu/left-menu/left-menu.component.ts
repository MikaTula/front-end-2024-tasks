import {Component, computed, inject} from '@angular/core';
import {MatListSubheaderCssMatStyler, MatNavList} from '@angular/material/list';
import {MatDivider} from '@angular/material/divider';
import {IProject} from '../../../interfaces/project.interface';
import {IProjectResponse} from '../../../interfaces/responses/project/project-response';
import {MatIcon} from '@angular/material/icon';
import {NgStyle} from '@angular/common';
import {MenuProjectListItemComponent} from '../menu-project-list-item/menu-project-list-item.component';
import {ProjectCachedService} from '../../../services/project-cached.service';

@Component({
    selector: 'app-left-menu',
    imports: [
        MatNavList,
        MatDivider,
        MatListSubheaderCssMatStyler,
        MatIcon,
        NgStyle,
        MenuProjectListItemComponent
    ],
    templateUrl: './left-menu.component.html',
    styleUrl: './left-menu.component.scss',
    host: {
        'class': 'left-menu',
    }
})
export class LeftMenuComponent {

    protected projectOpen = true;
    private _projectCachedService = inject(ProjectCachedService);
    public projectListItems = computed(() => {
        return this._projectCachedService.getProjectsSignal().map(
            (project: IProjectResponse): IProject => {
                return {...project};
            }
        );
    });

    protected toggleProjects() {
        this.projectOpen = !this.projectOpen;
    }

}
