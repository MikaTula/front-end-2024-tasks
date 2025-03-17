import {effect, Injectable} from '@angular/core';
import {MenuProjectDataSource} from '../data-sources/menu-project.data-source';
import {IProjectResponse} from '../interfaces/responses/project/project-response';

@Injectable({
    providedIn: 'root'
})
export class ProjectCachedService {
    private _menuProjectDataSource = new MenuProjectDataSource();

    private cachedProject: Map<string, IProjectResponse> = new Map();

    constructor() {
        effect(() => {
            this.cachedProject.clear();
            this._menuProjectDataSource.data().map((project) => this.cachedProject.set(project.id, project));
        });
    }

    public getProjectById(id: string) {
        const project = this.cachedProject.get(id);
        if (project) {
            return project;
        } else {
            throw new Error('Все сломалось');
        }
    }

    public getProjectsSignal() {
        return this._menuProjectDataSource.data()
    }

}
