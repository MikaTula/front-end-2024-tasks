import {Component, inject, signal} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {LeftMenuComponent} from '../../components/menu/left-menu/left-menu.component';
import {MatIcon} from '@angular/material/icon';
import {BreakpointService} from '../../services/breakpoint.service';
import {MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';

@Component({
    selector: 'app-secured-area',
    imports: [
        RouterOutlet,
        MatToolbarModule,
        MatButtonModule,
        MatMenuModule,
        LeftMenuComponent,
        RouterLink,
        MatIcon,
        MatSidenavContainer,
        MatSidenavModule

    ],
    templateUrl: './secured-area.component.html',
    styleUrl: './secured-area.component.scss'
})
export class SecuredAreaComponent {

    public readonly authService = inject(AuthService);

    protected readonly showSlideMenu = signal<boolean>(false);
    protected readonly breakpointService = inject(BreakpointService);

}
