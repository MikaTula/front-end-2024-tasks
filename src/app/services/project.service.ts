import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {concat, Observable, of, shareReplay, switchMap, tap} from 'rxjs';
import {IProject} from '../interfaces/project.interface';
import {IProjectRequest} from '../interfaces/requests/project-request.interface';
import {IPageResponse} from '../interfaces/responses/page-response';
import {IProjectResponse} from '../interfaces/responses/project/project-response';
import {IPageRequest} from '../interfaces/requests/page-request';
import {ISortRequest} from '../interfaces/requests/sort-request';
import {IProjectFilterRequest} from '../interfaces/requests/project/project-filter-request';
import {ProjectRootService} from './project-root.service';
import {CommonEventEnum} from '../enums/common-event.enum';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    private readonly _http = inject(HttpClient);
    private readonly _projectRootService = inject(ProjectRootService);

    private readonly _apiPath = '/api/v1.0/projects';

    public getProjects(pageRequest?: IPageRequest, sortRequest?: ISortRequest, filterRequest?: IProjectFilterRequest):
        Observable<IPageResponse<IProjectResponse>> {

        let params = new HttpParams();

        if (!!pageRequest) {
            params = params.append("pageNumber", pageRequest.pageNumber + 1);
            params = params.append("pageSize", pageRequest.pageSize);
        }

        if (!!sortRequest) {
            params = params.append("sortBy", sortRequest.sortBy);
            params = params.append("sortDir", sortRequest.sortDir);
        }

        if (!!filterRequest) {
            if (!!filterRequest.searchTerm) {
                params = params.append("searchTerm", filterRequest.searchTerm);
            }
        }

        return concat(of(0), this._projectRootService.event$).pipe(
            switchMap(() =>
                this._http.get<IPageResponse<IProjectResponse>>(this._apiPath, {params: params})
            ));
    }

    public createProject(request: IProjectRequest): Observable<IProject> {
        return this._http.post<IProject>(this._apiPath, JSON.stringify(request)).pipe(
            tap(() => this._projectRootService.event$.next(CommonEventEnum.created))
        );
    }

    public updateProject(id: string, request: IProjectRequest): Observable<IProject> {
        return this._http.put<IProject>(`${this._apiPath}/${id}`, JSON.stringify(request)).pipe(
            tap(() => this._projectRootService.event$.next(CommonEventEnum.created))
        );
    }

    public delete(id: string): Observable<void> {
        return this._http.delete<void>(`${this._apiPath}/${id}`).pipe(
            tap(() => this._projectRootService.event$.next(CommonEventEnum.deleted))
        );
    }

    public getById(id: string): Observable<IProjectResponse> {
        return concat(of(0), this._projectRootService.event$).pipe(
            switchMap(() => this._http.get<IProjectResponse>(`${this._apiPath}/${id}`)),
            shareReplay({
                refCount: true,
                bufferSize: 1
            })
        );
    }
}
