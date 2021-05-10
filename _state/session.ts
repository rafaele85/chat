import {GenericState, IGenericState} from './generic';
import {ISession} from "../types/session";
import {Dispatch} from "react";

export type ISessionState = IGenericState<ISession|undefined>;

const st = new GenericState<ISession|undefined>(undefined, "session");

export const sessionReducer = st.reducer();

export const setSession = (dispatch: Dispatch<any>, value: ISession) => dispatch(st.setValue()(value));
