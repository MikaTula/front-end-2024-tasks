import {Component, computed, HostBinding, input} from '@angular/core';
import {IProject} from '../../../interfaces/project.interface';
import {MatListItem} from '@angular/material/list';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {stringToColor} from '../../../utils/utils';
import {CodeComponent} from '../code/code.component';

@Component({
    selector: 'app-menu-project-list-item',
    imports: [
        MatListItem,
        RouterLink,
        RouterLinkActive,
        CodeComponent
    ],
    templateUrl: 'menu-project-list-item.component.html',
    styleUrl: './menu-project-list-item.component.scss',
    host: {
        class: 'menu-project-list-item'
    }
})
export class MenuProjectListItemComponent {

    public readonly project = input.required<IProject>();

    public readonly code = computed(() => this.project().code.substring(0, 2));

    @HostBinding('class') get class() {
        // switch (this.issue().priority) {
        //   case IssuePriority.Minor: return 'issue--minor';
        //   case IssuePriority.Normal: return 'issue--normal';
        //   case IssuePriority.Major: return 'issue--major';
        //   case IssuePriority.Critical: return 'issue--critical';
        //   default: return '';
        // }
        return '';
    }

    protected stringToColor(str: string): string {
        return stringToColor(str);
    }

}
