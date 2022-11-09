

import React, { FC, useEffect, useReducer } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';
import { IComponentProps } from '../../types';

export interface FocusControlInfo {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
}
export interface KeyBoardInfo {
    KeyBoardVisible?: boolean;
    KeyBoardEndCoordinate?: number;
}
export interface FocusControlContextState {
    focusControl?: {
        x?: number;
        y?: number;
        width?: number;
        height?: number
    },
    keyBoard?: KeyBoardInfo;
    distanceControlKeyBoard?: number;
    lastControlY?: number;
}



export type UpdatFocusControlAction = {
    type: 'updateFocusControl';
    payload: FocusControlInfo;
};
export type KeyBoardShowAction = {
    type: 'keyBoardShow';
    payload: KeyBoardInfo;
};
export type KeyBoardHideAction = {
    type: 'keyBoardHide';
    payload: KeyBoardInfo;
};
type FocusControlActions = UpdatFocusControlAction | KeyBoardShowAction | KeyBoardHideAction;
export interface FocusControlContextType {
    state: FocusControlContextState;
    dispatch: React.Dispatch<FocusControlActions>;
}
export const FocusControleContext = React.createContext<FocusControlContextType>(
    { state: {}, dispatch: () => {/* */ } }
);
export type FocusControlReducer = (
    state: FocusControlContextState,
    action: FocusControlActions
) => FocusControlContextState;

export const FocusControlContextProvider: FC<IComponentProps> = (props: IComponentProps) => {
    const { children } = props;
    const [state, dispatch] = useReducer<FocusControlReducer>(
        (currentState: FocusControlContextState, action: FocusControlActions) => {
            switch (action.type) {
                case 'updateFocusControl': {
                    let distance: number | undefined = currentState.distanceControlKeyBoard;
                    let controlY: number | undefined;

                    if (currentState.keyBoard?.KeyBoardVisible &&
                        action.payload.y !== undefined &&
                        currentState.keyBoard?.KeyBoardEndCoordinate !== undefined) {

                        controlY = (action.payload.y + (action.payload.height ? (action.payload.height * 2) : 0));

                        if (currentState.lastControlY !== controlY) {

                            distance = (currentState.keyBoard?.KeyBoardEndCoordinate - controlY);
                            if (currentState.distanceControlKeyBoard !== undefined && currentState.distanceControlKeyBoard < 0 && distance > 0) {
                                distance = currentState.distanceControlKeyBoard;
                            }
                        }

                    }
                    return {
                        ...currentState,
                        distanceControlKeyBoard: distance,
                        lastControlY: controlY,
                        focusControl: { ...action.payload }
                    };
                }
                case 'keyBoardShow': {
                    let distance: number | undefined = currentState.distanceControlKeyBoard;
                    let controlY: number | undefined;

                    if (currentState.focusControl?.y !== undefined &&
                        action.payload.KeyBoardEndCoordinate !== undefined) {

                        controlY = (currentState.focusControl.y + (currentState.focusControl.height ? (currentState.focusControl.height * 2) : 0));
                        if (currentState.lastControlY !== controlY) {

                            distance = action.payload.KeyBoardEndCoordinate - controlY;
                            if (currentState.distanceControlKeyBoard !== undefined && currentState.distanceControlKeyBoard < 0 && distance > 0) {
                                distance = currentState.distanceControlKeyBoard;
                            }

                        }
                    }
                    return {
                        ...currentState,
                        distanceControlKeyBoard: distance,
                        lastControlY: controlY,
                        keyBoard: { ...action.payload, KeyBoardVisible: true }
                    };
                }
                case 'keyBoardHide': {
                    return {
                        ...currentState,
                        distanceControlKeyBoard: undefined,
                        keyBoard: { ...action.payload, KeyBoardVisible: false }
                    };
                }
                default:
                    return (currentState);
            }
        },
        {}
    );
    const _keyboardDidShow = (e: KeyboardEvent) => {

        dispatch({
            type: 'keyBoardShow', payload: {
                KeyBoardEndCoordinate: e.endCoordinates.screenY,
                KeyBoardVisible: true
            }
        });

    };
    const _keyboardDidHide = (e: KeyboardEvent) => {
        dispatch({
            type: 'keyBoardHide', payload: {
                KeyBoardEndCoordinate: e.endCoordinates.screenY,
                KeyBoardVisible: false
            }
        });

    };
    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        // cleanup function
        return () => {
            Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
            Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
        };
    }, []);


    return (
        <FocusControleContext.Provider value={{ state, dispatch }}>
            {children}
        </FocusControleContext.Provider>
    );
};
