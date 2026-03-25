import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "../features/boardSlice";

import storage from "redux-persist/lib/storage";

import { persistReducer, persistStore } from "redux-persist";

const fixedStorage = (storage as any).default ?? storage;

const persistConfig = {
  key: "kanban-board",
  storage: fixedStorage,
};

const persistedReducer = persistReducer(persistConfig, boardReducer);

export const store = configureStore({
  reducer: {
    board: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;