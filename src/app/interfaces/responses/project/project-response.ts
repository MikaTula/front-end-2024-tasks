import {Dayjs} from 'dayjs';

export interface IProjectResponse {
    id: string;
    name: string;
    code: string;
    description: string;
    createdOn: Dayjs;
    modifiedOn: Dayjs;
}
