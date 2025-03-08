import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IProject} from '../interfaces/project.interface';
import {IProjectRequest} from '../interfaces/requests/project-request.interface';
import {IPageRequest} from '../interfaces/requests/page-request';
import {ISortRequest} from '../interfaces/requests/sort-request';
import {IProjectFilterRequest} from '../interfaces/requests/projects/project-filter-request';
import {IPageResponse} from '../interfaces/response/page-response';
import {IProjectResponse} from '../interfaces/response/projects/project-response';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly _http = inject(HttpClient);

  private readonly _apiPath = '/api/v1.0/projects';

  public getProjects(pageRequest?: IPageRequest, sortRequest?: ISortRequest, filterRequest?: IProjectFilterRequest):
    Observable<IPageResponse<IProjectResponse>> {

    console.log('getProjects')

    let params = new HttpParams();

    if (!!pageRequest) {
      params = params.append("pageNumber", pageRequest.pageNumber);
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

    return this._http.get<IPageResponse<IProjectResponse>>(this._apiPath, {params: params});
  }

  public createProject(request: IProjectRequest): Observable<IProject> {
    console.log('request', request)
    return this._http.post<IProject>(this._apiPath, JSON.stringify(request));
  }

  // public deleteProjects(): Observable<void> {
  //   return this._http.delete<void>(`${this._apiPath}/all`);
  // }
  //
  // public generateProjects(count: number): Observable<IProject> {
  //   const headers = new HttpHeaders({'Content-Type': 'application/json'});
  //   return this._http.post<IProject>(`${this._apiPath}/generate/${count}`, JSON.stringify({}));
  // }
  //
  // public recreateProjects(): Observable<IProject> {
  //   return this.deleteProjects().pipe(
  //     switchMap(() => this.generateProjects(10))
  //   )
  // }

}
