import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { TApplicationAction } from "../actions"

import { store } from "../store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationAction>  
>;