import { parsedQuestion, ParsedQuestionParams } from "./parsedQuerstion";

type ParsedDataQuestionParams = Omit<ParsedQuestionParams, "regex">;

export async function parsedDataQuestion({
    rl, question, invalidMsg = "Data inválida. Digite no formato DD/MM/AAAA."
}: ParsedDataQuestionParams): Promise<string> {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/; // Formato de data: DD/MM/AAAA

    return await parsedQuestion({
        rl, regex, question, invalidMsg
    });
}