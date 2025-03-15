import {Component, computed} from '@angular/core';
import {MatListSubheaderCssMatStyler, MatNavList} from '@angular/material/list';
import {MatDivider} from '@angular/material/divider';
import {IProject} from '../../../interfaces/project.interface';
import {IProjectResponse} from '../../../interfaces/responses/project/project-response';
import {MenuProjectDataSource} from '../../../data-sources/menu-project.data-source';
import {MatIcon} from '@angular/material/icon';
import {NgStyle} from '@angular/common';
import {MenuProjectListItemComponent} from '../menu-project-list-item/menu-project-list-item.component';

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
    public dataSource = new MenuProjectDataSource();
    public projectListItems = computed(() => {
        return this.dataSource.data().map(
            (project: IProjectResponse): IProject => {
                return {...project};
            }
        );
    });
    protected projectOpen = true;

    protected toggleProjects() {
        this.projectOpen = !this.projectOpen;
    }

}
