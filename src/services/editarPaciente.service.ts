import { AppState } from "../types/appState";
import { Paciente, PostPaciente } from "../types/paciente";

async function editarPacienteService(
    codigoPaciente: number,
    paciente: PostPaciente,
    state: AppState
): Promise<AppState> {
    return new Promise((resolve, reject) => {
        console.log(`\nEditando paciente: ${paciente.nome}...`);
        setTimeout(() => {
            const exists = state.pacientes.some((p) => p.codigo === codigoPaciente);

            if (!exists) {
                reject(`\nPaciente com código ${codigoPaciente} não encontrado!`);
                return;
            }

            const updatedPaciente: Paciente = {
                codigo: codigoPaciente,
                ...paciente
            };

            const pacientes = state.pacientes.map((pacienteAtual) =>
                pacienteAtual.codigo === codigoPaciente ? updatedPaciente : pacienteAtual
            );

            const newState = { ...state, pacientes };            

            resolve(newState);
            
            console.log("\nPaciente editado com sucesso!");
        }, 1000);
    });
}

export default editarPacienteService;