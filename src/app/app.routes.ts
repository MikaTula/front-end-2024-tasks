import {Routes} from '@angular/router';
import {ProjectsComponent} from './layout/projects/projects.component';
import {LoginComponent} from './layout/auth/login/login.component';
import {authGuard} from './guards/auth.guard';
import {SecuredAreaComponent} from './layout/secured-area/secured-area.component';
import {AuthComponent} from './layout/auth/auth.component';
import {SignUpComponent} from './layout/auth/sign-up/sign-up.component';
import {ProjectDetailComponent} from './layout/projects/project-detail/project-detail.component';

export const routes: Routes = [
    {
        path: '',
        component: SecuredAreaComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'projects',
                component: ProjectsComponent,
                children: [
                    // {
                    //     path: 'new',
                    //     component: AddProjectComponent
                    // },
                    // {
                    //     path: ':projectId',
                    //     component: ProjectDetailComponent
                    // }
                ]
            },
            {
                path: 'projects/:projectId',
                component: ProjectDetailComponent
            },
            {
                path: '',
                component: ProjectsComponent
            }
        ]
    },
    {
        path: 'auth',
        component: AuthComponent,
        children: [
            {
                path: 'sign-in',
                component: LoginComponent
            },
            {
                path: 'sign-up',
                component: SignUpComponent
            }
        ]
    }
];
