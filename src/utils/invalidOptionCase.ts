import readline from "readline/promises";

export async function invalidOptionCase(rl: readline.Interface) {
    console.log("\nOpção inválida. Por favor, tente novamente.");
    await rl.question("Pressione ENTER para continuar...");
}