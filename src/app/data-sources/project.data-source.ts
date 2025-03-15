import {inject, ResourceRef} from '@angular/core';
import {ProjectService} from '../services/project.service';
import {IProjectFilterRequest} from '../interfaces/requests/project/project-filter-request';
import {IProjectResponse} from '../interfaces/responses/project/project-response';
import {BaseDataSource} from "./base.data-source";
import {rxResource} from "@angular/core/rxjs-interop";
import {IPageResponse} from "../interfaces/responses/page-response";
import {ProjectRootService} from '../services/project-root.service';

export class ProjectDataSource extends BaseDataSource<IProjectResponse, IProjectFilterRequest> {

    private readonly _projectService = inject(ProjectService);
    private readonly _projectRootService = inject(ProjectRootService);

    private readonly _projectResource = rxResource({
        request: () => ({
            pageRequest: this.pageRequest(),
            sortRequest: this.sortRequest(),
            filterRequest: this.filterRequest(),
        }),
        loader: ({request}) =>
            this._projectService.getProjects(request.pageRequest, request.sortRequest, request.filterRequest)
    });

    protected override dataResource(): ResourceRef<IPageResponse<IProjectResponse>> {
        return this._projectResource;
    }

    protected override defaultFilterRequest(): IProjectFilterRequest {
        return {
            searchTerm: ""
        };
    }

    constructor() {
        super();
        this._projectRootService.event$.subscribe(() => this._projectResource.reload());
    }
}
