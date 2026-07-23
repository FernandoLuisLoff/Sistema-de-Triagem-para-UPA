import { match } from "ts-pattern";
import { Paciente } from "../types/paciente";

export type OrdenacaoPaciente = "dataEntrada" | "prioridade" | "fila";

function parseDataEntrada(dataEntrada: string): number {
    return new Date(dataEntrada.split("/").reverse().join("-")).getTime();
}

export function comparePacientesFila(a: Paciente, b: Paciente): number {
    const prioridadeComparacao = b.prioridade - a.prioridade;

    if (prioridadeComparacao !== 0) {
        return prioridadeComparacao;
    }

    return parseDataEntrada(a.dataEntrada) - parseDataEntrada(b.dataEntrada);
}

export function ordenarFilaPacientes(pacientes: Paciente[]): Paciente[] {
    return [...pacientes].sort(comparePacientesFila);
}

export function listarPacientesEmEspera(pacientes: Paciente[]): Paciente[] {
    return ordenarFilaPacientes(pacientes.filter((paciente) => paciente.status === "aguardando"));
}

export function ordenarPacientes(pacientes: Paciente[], ordenacao: OrdenacaoPaciente): Paciente[] {
    return [...pacientes].sort((a, b) => match(ordenacao)
        .with("dataEntrada", () => parseDataEntrada(a.dataEntrada) - parseDataEntrada(b.dataEntrada))
        .with("prioridade", () => comparePacientesFila(a, b))
        .with("fila", () => comparePacientesFila(a, b))
        .exhaustive());
}