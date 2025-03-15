import {Component, computed} from '@angular/core';
import {ProjectListItemComponent} from '../project-list-item/project-list-item.component';
import {MatListSubheaderCssMatStyler, MatNavList} from '@angular/material/list';
import {MatDivider} from '@angular/material/divider';
import {IProject} from '../../../interfaces/project.interface';
import {IProjectResponse} from '../../../interfaces/responses/project/project-response';
import {MenuProjectDataSource} from '../../../data-sources/menu-project.data-source';
import {MatIcon} from '@angular/material/icon';
import {NgStyle} from '@angular/common';

@Component({
    selector: 'app-left-menu',
    imports: [
        ProjectListItemComponent,
        MatNavList,
        MatDivider,
        MatListSubheaderCssMatStyler,
        MatIcon,
        NgStyle
    ],
    templateUrl: './left-menu.component.html',
    styleUrl: './left-menu.component.scss',
    host: {
        'class': 'left-menu',
    }
})
export class LeftMenuComponent {
    protected projectOpen = true;

    public dataSource = new MenuProjectDataSource();

    public projectListItems = computed(() => {
        return this.dataSource.data().map(
            (project: IProjectResponse): IProject => {
                return {...project};
            }
        );
    });


    protected toggleProjects() {
        this.projectOpen = !this.projectOpen;
    }

}
