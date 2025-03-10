import {computed, inject, signal} from '@angular/core';
import {ProjectService} from '../services/project.service';
import {IProjectResponse} from '../interfaces/response/projects/project-response';
import {IPageRequest} from '../interfaces/requests/page-request';
import {ISortRequest} from '../interfaces/requests/sort-request';
import {IProjectFilterRequest} from '../interfaces/requests/projects/project-filter-request';
import {rxResource} from '@angular/core/rxjs-interop';

export class ProjectDataSource {

  private readonly _projectService = inject(ProjectService);

  private readonly _pageRequest = signal<IPageRequest>({
    pageNumber: 1,
    pageSize: 25,
  });

  private readonly _sortRequest = signal<ISortRequest>({
    sortBy: 'updated',
    sortDir: 'desc',
  });

  private readonly _filterRequest = signal<IProjectFilterRequest>({});

  private readonly _projectResource = rxResource({
    request: () => ({
      pageRequest: this._pageRequest(),
      sortRequest: this._sortRequest(),
      filterRequest: this._filterRequest()
    }),
    loader: ({request}) => {
      return this._projectService.getProjects(request.pageRequest, request.sortRequest, request.filterRequest)
    }
  });

  public readonly data = computed<IProjectResponse[]>(() => {
    return this._projectResource.value()?.items ?? [];
  });

  public readonly isLoading = computed<boolean>(() => {
    return this._projectResource.isLoading();
  });

  public changeFilter(filterRequest: IProjectFilterRequest): void {
    this._filterRequest.set(filterRequest);
  }
}
