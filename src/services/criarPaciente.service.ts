import { AppState } from "../types/appState";
import { Paciente, PostPaciente } from "../types/paciente";

async function criarPacienteService(
    paciente: PostPaciente,
    state: AppState
): Promise<AppState> {
    return new Promise((resolve) => {
        console.log(`\nCriando paciente: ${paciente.nome}...`);
        setTimeout(() => {
            const codigoPaciente = state.pacientes.length > 0 ? Math.max(...state.pacientes.map(p => p.codigo)) + 1 : 1;

            const newPaciente: Paciente = {
                codigo: codigoPaciente,
                ...paciente
            };

            const pacientes = [...state.pacientes, newPaciente];
            const newState = { ...state, pacientes };            

            resolve(newState);

            console.log("\nPaciente criado com sucesso!");
        }, 1000);
    });
}

export default criarPacienteService;