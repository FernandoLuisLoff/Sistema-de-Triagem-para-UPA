import { PrioridadePaciente } from "./prioridadePaciente";

export type Paciente = {
    readonly codigo: number;
    nome: string;
    cpf: string;
    idade: number;
    dataEntrada: string;
    sintomas: string;
    prioridade: PrioridadePaciente;
}

export type PostPaciente = Omit<Paciente, "codigo">;