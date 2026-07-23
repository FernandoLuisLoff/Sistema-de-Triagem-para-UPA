import { AppState } from "../types/appState";
import { salvarPacientesService } from "./pacientePersistence.service";

export async function finalizarAtendimentoPacienteService(
    state: AppState,
    filePath?: string
): Promise<AppState> {
    const pacienteEmAtendimento = state.pacientes.find((paciente) => paciente.status === "em_atendimento");

    if (!pacienteEmAtendimento) {
        throw "\nNenhum paciente está em atendimento no momento.";
    }

    const pacientes = state.pacientes.map((paciente) =>
        paciente.codigo === pacienteEmAtendimento.codigo
            ? { ...paciente, status: "atendido" as const }
            : paciente
    );
    const newState = { ...state, pacientes };

    await salvarPacientesService(pacientes, filePath);
    return newState;
}