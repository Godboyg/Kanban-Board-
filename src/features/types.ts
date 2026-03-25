export type ColumnType = "todo" | "inProgress" | "inReview" | "done";

export interface Task {
  id: string;
  title?: string;
  description?: string;
  date?: Date;
}

export type BoardState = {
  columns: Record<ColumnType, Task[]>;
};