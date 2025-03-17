import {IssuePriority, IssueStage, IssueState} from '../../../types/issue.types';

export interface ICreateIssueRequest {
    projectId: string;
    priority: IssuePriority;
    name: string;
    description: string;
}


export interface IUpdateIssueRequest {
    priority?: IssuePriority;
    name?: string;
    description?: string;
    state?: IssueState,
    stage?: IssueStage
}
