import { type AppState } from "./../types/appState";

export function appStateInit(): AppState {
    const initialState: AppState = {
        pacientes: [],
        running: true
    };
    return initialState;
}