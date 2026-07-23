import { carregarPacientesExternosService } from "../services/pacientePersistence.service";
import { type AppState } from "./../types/appState";

export async function appStateInit(): Promise<AppState> {
    const initialState: AppState = {
        pacientes: await carregarPacientesExternosService(),
        running: true
    };
    return initialState;
}