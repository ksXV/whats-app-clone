import * as Redux from "redux";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import rootReducer from "./rootreducer";
import logger from "redux-logger";
const middlewares: Array<never | Redux.Middleware> = [];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
