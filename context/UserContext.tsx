import {createContext, Dispatch, useReducer, useState} from "react";
import reducer, {IAction, initialState} from "../hooks/reducer";

export interface IContextState {
    redirect: boolean
}

export interface InitialContextProps {
    userState: IContextState
    userDispatch: Dispatch<IAction>
}

export const UserContext = createContext({} as InitialContextProps);


export const UserContextProvider = ({ children }) => {
    const [userState, userDispatch] = useReducer(reducer, initialState);

    return (
        <UserContext.Provider
            value={{
                userState, userDispatch
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
export default UserContextProvider;
