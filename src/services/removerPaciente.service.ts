import { AppState } from "../types/appState";
import { salvarPacientesService } from "./pacientePersistence.service";

export async function removerPacienteService(
    codigoPaciente: number,
    state: AppState,
    filePath?: string
): Promise<AppState> {
    return new Promise((resolve, reject) => {
        console.log(`\nRemovendo paciente com código: ${codigoPaciente}...`);
		setTimeout(() => {
            const exists = state.pacientes.some((p) => p.codigo === codigoPaciente);

            if (!exists) {
                reject(`\nPaciente com código ${codigoPaciente} não encontrado!`);
                return;
            }

            const pacientes = state.pacientes.filter(paciente => paciente.codigo !== codigoPaciente);
            const newState = { ...state, pacientes };

            salvarPacientesService(pacientes, filePath)
                .then(() => resolve(newState))
                .catch(reject);
            
            console.log("\nPaciente removido com sucesso!");
        }, 1000);
    });
}