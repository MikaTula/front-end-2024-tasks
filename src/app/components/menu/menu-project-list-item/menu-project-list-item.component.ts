import {Component, computed, inject, input, linkedSignal} from '@angular/core';
import {IProject} from '../../../interfaces/project.interface';
import {MatListItem} from '@angular/material/list';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {CodeComponent} from '../code/code.component';
import {BreakpointService, BreakpointView} from '../../../services/breakpoint.service';
import {NgIf} from '@angular/common';

@Component({
    selector: 'app-menu-project-list-item',
    imports: [
        MatListItem,
        RouterLink,
        RouterLinkActive,
        CodeComponent,
        NgIf
    ],
    templateUrl: 'menu-project-list-item.component.html',
    styleUrl: './menu-project-list-item.component.scss',
    host: {
        class: 'menu-project-list-item'
    }
})
export class MenuProjectListItemComponent {

    public readonly project = input.required<IProject>();
    private readonly _breakpointObserver = inject(BreakpointService);
    protected isVisible = linkedSignal<boolean>(() =>
        this._breakpointObserver.currentRange() === BreakpointView.Medium ||
        this._breakpointObserver.currentRange() === BreakpointView.Large
    );

    public readonly code = computed(() => this.project().code.substring(0, 2));
}
