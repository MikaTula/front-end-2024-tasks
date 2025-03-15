import {inject, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {IssueCreateUpdateComponent} from '../components/dialogs/issue-create-update/issue-create-update.component';

@Injectable({
    providedIn: 'root'
})
export class IssuePopupService {
    private readonly _dialog = inject(MatDialog);

    public openCreateIssue(projectId: string | null | undefined) {
        return this._dialog.open(IssueCreateUpdateComponent, {
            data: {
                projectId: projectId
            }
        });
    }

    public openEditIssue(issueId: string) {
        return this._dialog.open(IssueCreateUpdateComponent, {
            data: {
                issueId: issueId
            }
        });
    }
}


