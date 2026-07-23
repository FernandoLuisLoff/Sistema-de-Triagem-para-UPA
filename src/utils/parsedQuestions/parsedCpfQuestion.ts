import { parsedQuestion, ParsedQuestionParams } from "./parsedQuerstion";

type ParsedCpfQuestionParams = Omit<ParsedQuestionParams, "regex">;

export async function parsedCpfQuestion({
    rl, question, invalidMsg = "CPF inválido. Digite um CPF no formato XXX.XXX.XXX-XX ou apenas números."
}: ParsedCpfQuestionParams): Promise<string> {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/; // Aceita CPF no formato XXX.XXX.XXX-XX ou apenas números (11 dígitos)

    return await parsedQuestion({
        rl, regex, question, invalidMsg
    });
}