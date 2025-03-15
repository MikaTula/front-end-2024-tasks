import {ProjectDataSource} from './project.data-source';

export class MenuProjectDataSource extends ProjectDataSource {
    constructor() {
        super();
        this.changePage({
            pageNumber: 1,
            pageSize: 1000,
        });
    }
}
