export interface AppState {
    width: number;
    height: number;
}

export interface Props {
    appState: AppState;
    sources: Array<string>;
}

export interface State {
    sourceIndex: number;
}

export interface Vars {
    amplitude: number;
}

export interface Uniforms {
    [key: string]: {
        type: string,
        value: any,
    };
}