import { AppState } from "../types/appState";
import { salvarPacientesService } from "./pacientePersistence.service";
import { listarPacientesEmEspera } from "../utils/pacienteQueue";

export async function chamarProximoPacienteService(
    state: AppState,
    filePath?: string
): Promise<AppState> {
    const pacienteEmAtendimento = state.pacientes.find((paciente) => paciente.status === "em_atendimento");

    if (pacienteEmAtendimento) {
        throw `\nJá existe um paciente em atendimento: ${pacienteEmAtendimento.nome}.`;
    }

    const proximoPaciente = listarPacientesEmEspera(state.pacientes)[0];

    if (!proximoPaciente) {
        throw "\nNenhum paciente aguardando atendimento.";
    }

    const pacientes = state.pacientes.map((paciente) =>
        paciente.codigo === proximoPaciente.codigo
            ? { ...paciente, status: "em_atendimento" as const }
            : paciente
    );
    const newState = { ...state, pacientes };

    await salvarPacientesService(pacientes, filePath);
    return newState;
}