import {inject, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {
    ProjectCreateUpdateComponent
} from '../components/dialogs/project-create-update/project-create-update.component';
import {CommonPopupService} from './common.popup.service';
import {ProjectService} from './project.service';

@Injectable({
    providedIn: 'root'
})
export class ProjectPopupService {
    private readonly _commonPopupService = inject(CommonPopupService);
    private readonly _projectService = inject(ProjectService);
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

    public deleteProject(projectId: string) {
        const ref = this._commonPopupService.openConfirmPopup('Confirm deleting', 'Need confirm deleting')
        ref.afterClosed().subscribe(
            (confirm) => {
                if (confirm) {
                    this._projectService.delete(projectId).subscribe();
                }
            }
        )
        return ref;
    }
}


