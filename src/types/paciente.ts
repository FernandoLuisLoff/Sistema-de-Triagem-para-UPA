import { PrioridadePaciente } from "./prioridadePaciente";
import { StatusAtendimento } from "./statusAtendimento";

export type Paciente = {
    readonly codigo: number;
    nome: string;
    cpf: string;
    idade: number;
    dataEntrada: string;
    sintomas: string;
    prioridade: PrioridadePaciente;
    status: StatusAtendimento;
}

export type PostPaciente = Omit<Paciente, "codigo" | "status">;