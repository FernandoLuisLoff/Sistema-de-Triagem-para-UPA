export type StatusAtendimento = "aguardando" | "em_atendimento" | "atendido";

export const statusAtendimentoLabel: Record<StatusAtendimento, string> = {
    aguardando: "Aguardando",
    em_atendimento: "Em atendimento",
    atendido: "Atendido"
};