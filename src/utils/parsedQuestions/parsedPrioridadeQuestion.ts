import { PrioridadePaciente } from "../../types/prioridadePaciente";
import { parsedQuestion, ParsedQuestionParams } from "./parsedQuerstion";

type ParsedPrioridadeQuestionParams = Omit<ParsedQuestionParams, "regex">;

export async function parsedPrioridadeQuestion({
    rl, question, invalidMsg = "Inválido. Digite um número de prioridade válido (1, 2 ou 3)."
}: ParsedPrioridadeQuestionParams): Promise<PrioridadePaciente> {
    const regex = /^[1-3]$/; // Prioridade válida: 1, 2 ou 3

    const input = await parsedQuestion({
        rl, regex, question, invalidMsg
    });

    return Number(input) as PrioridadePaciente;
}