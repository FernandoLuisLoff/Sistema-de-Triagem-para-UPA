import readline from "readline/promises";

export type ParsedQuestionParams = {
    rl: readline.Interface;
    question: string;
    regex: RegExp;
    invalidMsg?: string;
}

export async function parsedQuestion({
    rl, question, regex, invalidMsg = "Inválido"
}: ParsedQuestionParams): Promise<string> {
    let value: string = "";
    let validInput = false;

    while (!validInput) {
        value = await rl.question(question);

        validInput = regex.test(value);

        if (!validInput) {
            console.log(`${invalidMsg}\n`);
        }
    }

    return value;
}