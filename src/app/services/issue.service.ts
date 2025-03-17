import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {concat, Observable, of, shareReplay, switchMap, tap} from 'rxjs';
import {IPageRequest} from '../interfaces/requests/page-request';
import {ISortRequest} from '../interfaces/requests/sort-request';
import {IPageResponse} from '../interfaces/responses/page-response';
import {IIssueFilterRequest} from '../interfaces/requests/project/issue-filter-request';
import {IIssueListResponse} from '../interfaces/responses/issue/issue-list-response.interface';
import {IIssueDetailResponse} from '../interfaces/responses/issue/issue-detail-response.interface';
import {ICreateIssueRequest, IUpdateIssueRequest} from '../interfaces/requests/issue/create-issue-request.interface';
import {IssueRootService} from './issue-root.service';
import {CommonEventEnum} from '../enums/common-event.enum';
import {IssuePriority, IssueStage, IssueState} from '../types/issue.types';

@Injectable({
    providedIn: 'root'
})
export class IssueService {
    private readonly _http = inject(HttpClient);
    private readonly _issueRootService = inject(IssueRootService);


    private readonly _apiPath = '/api/v1.0/issues';

    public getIssues(pageRequest?: IPageRequest, sortRequest?: ISortRequest, filterRequest?: IIssueFilterRequest):
        Observable<IPageResponse<IIssueListResponse>> {

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
            if (!!filterRequest.state) {
                params = params.append("state", filterRequest.state);
            }
            if (!!filterRequest.priorities) {
                filterRequest.priorities.forEach(priority => {
                    params = params.append("priority", priority);
                })
            }
            if (!!filterRequest.projectIds) {
                filterRequest.projectIds.forEach(priority => {
                    params = params.append("projectId", priority);
                })
            }
        }

        return concat(of(0), this._issueRootService.event$).pipe(
            switchMap(() =>
                this._http.get<IPageResponse<IIssueListResponse>>(this._apiPath, {params: params})
            ));
    }

    public getById(issueId: string): Observable<IIssueDetailResponse> {
        return concat(of(0), this._issueRootService.event$).pipe(
            switchMap(() => this._http.get<IIssueDetailResponse>(`${this._apiPath}/${issueId}`)),
            shareReplay({
                refCount: true,
                bufferSize: 1
            })
        );
    }

    public createIssue(request: ICreateIssueRequest): Observable<IIssueListResponse> {
        return this._http.post<IIssueListResponse>(this._apiPath, JSON.stringify(request)).pipe(
            tap(() => this._issueRootService.event$.next(CommonEventEnum.updated))
        );
    }

    public updateIssue(id: string, request: IUpdateIssueRequest): Observable<string> {
        return this._http.put<string>(`${this._apiPath}/${id}`, JSON.stringify(request)).pipe(
            tap(() => this._issueRootService.event$.next(CommonEventEnum.updated))
        );
    }


    public setPriority(id: string, priority: IssuePriority): Observable<string> {
        const update = {
            priority: priority
        };
        return this.updateIssue(id, update);
    }

    public setState(id: string, state: IssueState): Observable<string> {
        const update = {
            state: state
        };
        return this.updateIssue(id, update);
    }

    public setStage(id: string, stage: IssueStage): Observable<string> {
        const update = {
            stage: stage
        };
        return this.updateIssue(id, update);
    }

    public delete(id: string): Observable<void> {
        return this._http.delete<void>(`${this._apiPath}/${id}`).pipe(
            tap(() => this._issueRootService.event$.next(CommonEventEnum.deleted))
        );
    }
}
