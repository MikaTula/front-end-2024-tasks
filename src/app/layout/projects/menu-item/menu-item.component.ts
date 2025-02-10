import {Component, input, ViewEncapsulation} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {RouterModule} from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {IProject} from '../../../interfaces/project.interface';

@Component({
  selector: 'app-project-menu-item',
  imports: [
    MatTableModule,
    MatListModule,
    RouterModule,
    MatIcon
  ],
  templateUrl: './menu-item.component.html',
  styleUrls: [
    'menu-item.component.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  host: {
    class: 'app-project-menu-item'
  }
})
export class MenuItemComponent {
  public project = input.required<IProject>();

}
