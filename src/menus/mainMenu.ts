import { ParamsMenu } from "../types/paramsMenu";
import { invalidOptionCase } from "../utils/invalidOptionCase";
import { pacientesMenu } from "./menusPacientes/pacientesMenu";

export async function mainMenu(params: ParamsMenu) {
    const {rl, getAppState, setAppState} = params;

    console.clear();
    console.log("=== Menu Principal ===");
    console.log("1. Pacientes");
    console.log("2. Exit");

    const option = await rl.question("\nSelecione uma opção: ");

    switch (option) {
        case "1":
            await pacientesMenu(params);
            break;
        case "2":
            setAppState({
                ...getAppState(),
                running: false
            });
            break;
        default:
            await invalidOptionCase(rl);
    }
}