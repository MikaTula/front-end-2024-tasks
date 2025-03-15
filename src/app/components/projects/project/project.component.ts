import {Component, input} from '@angular/core';
import {MatRipple} from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {IProjectResponse} from '../../../interfaces/responses/project/project-response';
import {RelativeTimePipe} from '../../../pipes/relative-time.pipe';

@Component({
    selector: 'app-project',
    imports: [
        MatTooltipModule,
        RelativeTimePipe
    ],
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss'],
    hostDirectives: [
        MatRipple
    ],
    host: {
        class: 'app-project'
    }
})
export class ProjectComponent {

    public readonly project = input.required<IProjectResponse>();

    // @HostBinding('class') get class() {
    //     switch (this.project().priority) {
    //         case "Minor":
    //             return 'app-issue--minor';
    //         case "Normal":
    //             return 'app-issue--normal';
    //         case "Major":
    //             return 'app-issue--major';
    //         case "Critical":
    //             return 'app-issue--critical';
    //         default:
    //             return '';
    //     }
    // }

}
