import { AppState } from "./appState";
import readline from "readline/promises";

export type ParamsMenu = {
    getAppState: () => AppState;
    setAppState: (state: AppState) => void;
    readonly rl: readline.Interface;
};