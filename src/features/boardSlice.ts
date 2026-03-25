import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { BoardState, ColumnType, Task } from "./types";

const initialState: BoardState = {
  columns: {
    todo: [],
    inProgress: [],
    inReview: [],
    done: [],
  },
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{ column: ColumnType; task: Task }>
    ) => {
      state.columns[action.payload.column].push(action.payload.task);
    },

    moveTask: (
      state,
      action: PayloadAction<{
        from: ColumnType;
        to: ColumnType;
        taskId: string;
      }>
    ) => {
      const { from, to, taskId } = action.payload;

      const taskIndex = state.columns[from].findIndex(
        (t) => t.id === taskId
      );
      if (taskIndex === -1) return;

      const [task] = state.columns[from].splice(taskIndex, 1);
      state.columns[to].push(task);
    },

    deleteTask: (
      state,
      action: PayloadAction<{ column: ColumnType; taskId: string }>
    ) => {
      state.columns[action.payload.column] = state.columns[
        action.payload.column
      ].filter((t) => t.id !== action.payload.taskId);
    },
  },
});

export const { addTask, moveTask, deleteTask } = boardSlice.actions;
export default boardSlice.reducer;