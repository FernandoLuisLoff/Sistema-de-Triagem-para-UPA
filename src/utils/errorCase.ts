import readline from "readline/promises";

export async function errorCase(error: unknown, rl: readline.Interface) {
    console.error(error);
    await rl.question("Pressione ENTER para continuar...");
}