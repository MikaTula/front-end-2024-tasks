import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'projectSortBy'
})
export class ProjectSortByPipe implements PipeTransform {

    transform(sortBy: string): string {
        switch (sortBy) {
            case 'Name':
                return 'Name';
            case "Code":
                return 'Project Code';
            case "CreatedOn":
                return 'Created On';
            case "ModifiedOn":
                return 'Last Updated';
            default:
                return 'Unknown';
        }
    }

}
