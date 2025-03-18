export type IssuePriority = 'Minor' | 'Normal' | 'Major' | 'Critical';
export type IssueState = 'Open' | 'Closed';
export type IssueStage = 'Backlog' | 'ToDo' | 'InProgress' | 'Done';
export type IssueSortBy = 'Name' | 'ProjectCode' | 'Priority' | 'CreatedOn' | 'ModifiedOn';

export const issueSortVariants: IssueSortBy[] = [
    "Name",
    "ProjectCode",
    "Priority",
    "CreatedOn",
    "ModifiedOn",
];


export const selectablePriorities: IssuePriority[] = [
    "Critical",
    "Major",
    "Normal",
    "Minor"
];

export const selectableStage: IssueStage[] = [
    'Backlog', 'ToDo', 'InProgress', 'Done'
];

export const issueStateVariants: IssueState[] = [
    "Open",
    "Closed"
];

export function priorityClass(priority: IssuePriority) {
    switch (priority) {
        case "Minor":
            return 'app-issue--minor';
        case "Normal":
            return 'app-issue--normal';
        case "Major":
            return 'app-issue--major';
        case "Critical":
            return 'app-issue--critical';
        default:
            return '';
    }
}

export function stageClass(stage: IssueStage) {
    switch (stage) {
        case "Backlog":
            return 'app-issue--backlog';
        case "ToDo":
            return 'app-issue--to-do';
        case "InProgress":
            return 'app-issue--in-progress';
        case "Done":
            return 'app-issue--done';
        default:
            return '';
    }
}
