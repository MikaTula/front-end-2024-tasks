﻿import {inject, ResourceRef} from '@angular/core';
import {IssueService} from '../services/issue.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {BaseDataSource} from './base.data-source';
import {IIssueFilterRequest} from '../interfaces/requests/project/issue-filter-request';
import {IPageResponse} from '../interfaces/responses/page-response';
import {IIssueListResponse} from '../interfaces/responses/issue/issue-list-response.interface';
import {IssueRootService} from '../services/issue-root.service';

export class IssueDataSource extends BaseDataSource<IIssueListResponse, IIssueFilterRequest> {

    private readonly _issueService = inject(IssueService);
    private readonly _rootService = inject(IssueRootService);

    private readonly _issuesResource = rxResource({
        request: () => ({
            pageRequest: this.pageRequest(),
            sortRequest: this.sortRequest(),
            filterRequest: this.filterRequest(),
        }),
        loader: ({request}) =>
            this._issueService.getIssues(request.pageRequest, request.sortRequest, request.filterRequest)
    });

    constructor() {
        super();
        this._rootService.event$.subscribe(() => {
            this._issuesResource.reload()
        });
    }

    protected override dataResource(): ResourceRef<IPageResponse<IIssueListResponse>> {
        return this._issuesResource;
    }

    protected override defaultFilterRequest(): IIssueFilterRequest {
        return {
            searchTerm: '',
            state: "Open",
            projectIds: [],
            priorities: []
        };
    }
}
