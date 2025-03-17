import {Component, input, output} from '@angular/core';
import {MatRipple} from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {IProjectResponse} from '../../../interfaces/responses/project/project-response';
import {RelativeTimePipe} from '../../../pipes/relative-time.pipe';
import {CodeComponent} from '../../menu/code/code.component';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

@Component({
    selector: 'app-project',
    imports: [
        MatTooltipModule,
        RelativeTimePipe,
        CodeComponent,
        MatIcon,
        MatIconButton
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
    public readonly onEdit = output<string>();
    public readonly onDelete = output<string>();

}
