import {Component, computed, inject} from '@angular/core';
import {MatListItem, MatListSubheaderCssMatStyler, MatNavList} from '@angular/material/list';
import {IProject} from '../../../interfaces/project.interface';
import {IProjectResponse} from '../../../interfaces/responses/project/project-response';
import {MatIcon} from '@angular/material/icon';
import {NgStyle} from '@angular/common';
import {MenuProjectListItemComponent} from '../menu-project-list-item/menu-project-list-item.component';
import {ProjectCachedService} from '../../../services/project-cached.service';
import {GenerateService} from '../../../services/generate.service';
import {CdkFixedSizeVirtualScroll, CdkVirtualScrollViewport} from '@angular/cdk/scrolling';

@Component({
    selector: 'app-left-menu',
    imports: [
        MatNavList,
        MatListSubheaderCssMatStyler,
        MatIcon,
        NgStyle,
        MenuProjectListItemComponent,
        MatListItem,
        CdkVirtualScrollViewport,
        CdkFixedSizeVirtualScroll
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
    private _generateService = inject(GenerateService);

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

    protected generate() {
        this._generateService.regenerate();
    }

}
