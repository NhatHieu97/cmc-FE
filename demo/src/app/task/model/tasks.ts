import {Project} from './project';

export interface Tasks {
  id ?: number;
  name?: String;
  date?: string;
  end?: string;
  progress?: number;
  main?: boolean;
  sub?: boolean;
  project?: Project;
}
