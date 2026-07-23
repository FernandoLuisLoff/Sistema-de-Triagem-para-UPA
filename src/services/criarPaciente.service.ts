import { AppState } from "../types/appState";
import { Paciente, PostPaciente } from "../types/paciente";
import { salvarPacientesService } from "./pacientePersistence.service";

async function criarPacienteService(
    paciente: PostPaciente,
    state: AppState,
    filePath?: string
): Promise<AppState> {
    return new Promise((resolve, reject) => {
        console.log(`\nCriando paciente: ${paciente.nome}...`);
        setTimeout(() => {
            const codigoPaciente = state.pacientes.length > 0 ? Math.max(...state.pacientes.map(p => p.codigo)) + 1 : 1;

            const newPaciente: Paciente = {
                codigo: codigoPaciente,
                status: "aguardando",
                ...paciente
            };

            const pacientes = [...state.pacientes, newPaciente];
            const newState = { ...state, pacientes };

            salvarPacientesService(pacientes, filePath)
                .then(() => resolve(newState))
                .catch(reject);

            console.log("\nPaciente criado com sucesso!");
        }, 1000);
    });
}

export default criarPacienteService;