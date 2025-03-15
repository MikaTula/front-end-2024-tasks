import {inject, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {
    ProjectCreateUpdateComponent
} from '../components/dialogs/project-create-update/project-create-update.component';

@Injectable({
    providedIn: 'root'
})
export class ProjectPopupService {
    private readonly _dialog = inject(MatDialog);

    public openCreateProject() {
        return this._dialog.open(ProjectCreateUpdateComponent);
    }

    public openEditProject(projectId: string) {
        return this._dialog.open(ProjectCreateUpdateComponent, {
            data: {
                projectId: projectId
            }
        });
    }
}


