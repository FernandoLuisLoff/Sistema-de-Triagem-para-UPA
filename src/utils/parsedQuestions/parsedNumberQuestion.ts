import { parsedQuestion, ParsedQuestionParams } from "./parsedQuerstion";

type ParsedNumberQuestionParams = Omit<ParsedQuestionParams, "regex">;

export async function parsedNumberQuestion({
    rl, question, invalidMsg = "Inválido"
}: ParsedNumberQuestionParams): Promise<number> {
    const regex = /^[0-9]+$/; // Aceita apenas números inteiros positivos

    const input = await parsedQuestion({
        rl, regex, question, invalidMsg
    });

    return Number(input);
}