import { mainMenu } from "./menus/mainMenu";
import { AppState } from "./types/appState";
import { appStateInit } from "./utils/appStateInit";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

async function main() {
    let appState = await appStateInit();
    const rl = readline.createInterface({ input, output });

    while (appState.running) {
        await mainMenu({
            rl,
            getAppState: () => appState,
            setAppState: (newState: AppState) => {
                appState = newState;
            }
        });
    }

    rl.close();

    console.log("\nAplicação encerrada!");
}

main();