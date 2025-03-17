import {inject, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {IssueCreateUpdateComponent} from '../components/dialogs/issue-create-update/issue-create-update.component';
import {CommonPopupService} from './common.popup.service';
import {IssueService} from './issue.service';

@Injectable({
    providedIn: 'root'
})
export class IssuePopupService {
    private readonly _dialog = inject(MatDialog);
    private readonly _commonPopupService = inject(CommonPopupService);
    private readonly _issueService = inject(IssueService);

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

    public deleteIssue(id: string) {
        const ref = this._commonPopupService.openConfirmPopup('Confirm deleting', 'Need confirm deleting')
        ref.afterClosed().subscribe(
            (confirm) => {
                if (confirm) {
                    this._issueService.delete(id).subscribe();
                }
            }
        )
        return ref;
    }
}


