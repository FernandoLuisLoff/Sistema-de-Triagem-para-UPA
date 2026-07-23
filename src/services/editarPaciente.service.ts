import { AppState } from "../types/appState";
import { Paciente, PostPaciente } from "../types/paciente";
import { salvarPacientesService } from "./pacientePersistence.service";

async function editarPacienteService(
    codigoPaciente: number,
    paciente: PostPaciente,
    state: AppState,
    filePath?: string
): Promise<AppState> {
    return new Promise((resolve, reject) => {
        console.log(`\nEditando paciente: ${paciente.nome}...`);
        setTimeout(() => {
            const exists = state.pacientes.some((p) => p.codigo === codigoPaciente);

            if (!exists) {
                reject(`\nPaciente com código ${codigoPaciente} não encontrado!`);
                return;
            }

            const pacienteAtual = state.pacientes.find((currentPaciente) => currentPaciente.codigo === codigoPaciente);

            if (!pacienteAtual) {
                reject(`\nPaciente com código ${codigoPaciente} não encontrado!`);
                return;
            }

            const updatedPaciente: Paciente = {
                ...pacienteAtual,
                ...paciente
            };

            const pacientes = state.pacientes.map((pacienteAtual) =>
                pacienteAtual.codigo === codigoPaciente ? updatedPaciente : pacienteAtual
            );

            const newState = { ...state, pacientes };

            salvarPacientesService(pacientes, filePath)
                .then(() => resolve(newState))
                .catch(reject);
            
            console.log("\nPaciente editado com sucesso!");
        }, 1000);
    });
}

export default editarPacienteService;