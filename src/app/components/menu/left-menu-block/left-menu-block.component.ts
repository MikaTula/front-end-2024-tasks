// import {Component, computed} from '@angular/core';
// import {IProject} from '../../../interfaces/project.interface';
// import {IProjectResponse} from '../../../interfaces/responses/project/project-response';
// import {MenuProjectDataSource} from '../../../data-sources/menu-project.data-source';
//
// @Component({
//     selector: 'app-left-menu-block',
//     imports: [],
//     templateUrl: './left-menu.component.html',
//     styleUrl: './left-menu.component.scss',
//     host: {
//         'class': 'left-menu',
//     }
// })
// export class LeftMenuComponent {
//     public dataSource = new MenuProjectDataSource();
//
//     public projectListItems = computed(() => {
//         return this.dataSource.data().map(
//             (project: IProjectResponse): IProject => {
//                 return {...project};
//             }
//         );
//     });
//
// }
