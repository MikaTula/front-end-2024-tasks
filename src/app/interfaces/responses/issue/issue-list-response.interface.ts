import {IssuePriority, IssueStage, IssueState} from '../../../types/issue.types';
import {Dayjs} from 'dayjs';

export interface IIssueListResponse {
    id: string;
    projectId: string;
    projectCode: string;
    name: string;
    priority: IssuePriority;
    state: IssueState;
    stage: IssueStage;
    createdOn: Dayjs;
    modifiedOn: Dayjs;
}
