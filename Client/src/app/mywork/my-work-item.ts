/**
 * RunItem - interface for a run item.
 */
export interface RunItem {
  runId: number;
  workId: number;
  routeNumber: number;
  runNumber: number;
  daysOn: string;
  releasePoint: string;
  timeOn: string;
  timeOff: string;
  endPoint: string;
  platformTime: string;
  reportTime: string;
  travelTime: string;
  pays: string;
  spreadTime: string;
  specialDetails: string;
  isShowUp: boolean;
}


/**
 * WorkItem - interface for work item.
 */
export interface WorkItem {
  workId: number;
  hasDetails: boolean;
  daysOff: string[];
  runs: RunItem[];
}

