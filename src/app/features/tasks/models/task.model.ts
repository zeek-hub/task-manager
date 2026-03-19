export interface TaskModel {
  id?: number;
  title: string;
  status: 'TODO' | 'In-Progress' | 'Done';
  lastEdit: Date;
}
