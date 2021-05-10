import {ISessionState, sessionReducer} from "./session";

export interface IRootState {
    session: ISessionState;
}

export const rootReducer = {
    session: sessionReducer,
};

export const selectSession = (state: IRootState) => state.session.value;
