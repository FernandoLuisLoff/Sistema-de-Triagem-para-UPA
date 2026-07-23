export type PrioridadePaciente = 1 | 2 | 3;

export const prioridadePacienteLabel: Record<PrioridadePaciente, string> = {
    1: "Baixa",
    2: "Média",
    3: "Alta"
};