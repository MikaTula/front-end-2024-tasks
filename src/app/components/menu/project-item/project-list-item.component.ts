import {Component, computed, HostBinding, input} from '@angular/core';
import {IProject} from '../../../interfaces/project.interface';
import {MatListItem} from '@angular/material/list';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'project-list-item',
  imports: [
    MatListItem,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: 'project-list-item.component.html',
  host: {
    class: 'project-list-item'
  }
})
export class ProjectListItemComponent {

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

}
