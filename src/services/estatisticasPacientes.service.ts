import { AppState } from "../types/appState";
import { Paciente } from "../types/paciente";
import { PrioridadePaciente } from "../types/prioridadePaciente";
import { listarPacientesEmEspera, ordenarFilaPacientes } from "../utils/pacienteQueue";

export type EstatisticasPacientes = {
    totalPacientes: number;
    aguardando: number;
    emAtendimento: number;
    atendidos: number;
    porPrioridade: Record<PrioridadePaciente, number>;
    mediaIdade: number;
    proximoPaciente: string | null;
    filaAtual: string;
    cpfsCadastrados: string;
    haAltaPrioridadeEmEspera: boolean;
};

export function buscarPacienteService(termo: string, state: AppState): Paciente | undefined {
    const termoNormalizado = termo.trim().toLowerCase();

    return state.pacientes.find((paciente) =>
        paciente.codigo.toString() === termoNormalizado
        || paciente.cpf.toLowerCase() === termoNormalizado
        || paciente.nome.toLowerCase().includes(termoNormalizado)
    );
}

export function listarPacientesPorPrioridadeService(prioridade: PrioridadePaciente, state: AppState): Paciente[] {
    return ordenarFilaPacientes(state.pacientes.filter((paciente) => paciente.prioridade === prioridade));
}

export function gerarEstatisticasPacientesService(state: AppState): EstatisticasPacientes {
    const fila = listarPacientesEmEspera(state.pacientes);
    const totalPacientes = state.pacientes.length;
    const aguardando = state.pacientes.filter((paciente) => paciente.status === "aguardando").length;
    const emAtendimento = state.pacientes.filter((paciente) => paciente.status === "em_atendimento").length;
    const atendidos = state.pacientes.filter((paciente) => paciente.status === "atendido").length;
    const porPrioridade = state.pacientes.reduce<Record<PrioridadePaciente, number>>((accumulator, paciente) => {
        accumulator[paciente.prioridade] += 1;
        return accumulator;
    }, { 1: 0, 2: 0, 3: 0 });
    const somaIdades = state.pacientes.reduce((total, paciente) => total + paciente.idade, 0);

    return {
        totalPacientes,
        aguardando,
        emAtendimento,
        atendidos,
        porPrioridade,
        mediaIdade: totalPacientes > 0 ? somaIdades / totalPacientes : 0,
        proximoPaciente: fila[0]?.nome ?? null,
        filaAtual: fila.map((paciente) => `${paciente.nome} (${paciente.codigo})`).join(" -> "),
        cpfsCadastrados: state.pacientes.map((paciente) => paciente.cpf).join(", "),
        haAltaPrioridadeEmEspera: state.pacientes.some((paciente) => paciente.prioridade === 3 && paciente.status === "aguardando")
    };
}