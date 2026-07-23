import { ParamsMenu } from "../../types/paramsMenu";
import { invalidOptionCase } from "../../utils/invalidOptionCase";
import { Paciente } from "../../types/paciente";
import { prioridadePacienteLabel } from "../../types/prioridadePaciente";

export async function listarPacientesMenu(params: ParamsMenu) {
    let stayInMenu = true;
    const {rl, getAppState} = params;
    const state = getAppState();
    let pacientesSorted: Paciente[] = [];

    while (stayInMenu) {
        console.clear();
        console.log("=== Lista de Pacientes ===");
        console.log("1. Ordenar por data de entrada");
        console.log("2. Ordenar por prioridade");
        console.log("3. Voltar");

        const option = await rl.question("\nSelecione uma opção: ");

        switch (option) {
            case "1":
                if (state.pacientes.length === 0) {
                    console.log("\nNenhum paciente cadastrado.");
                } else {
                    pacientesSorted = [...state.pacientes].sort((a, b) => {
                        const dataA = new Date(a.dataEntrada.split("/").reverse().join("-"));
                        const dataB = new Date(b.dataEntrada.split("/").reverse().join("-"));
                        return dataA.getTime() - dataB.getTime();
                    });
                    pacientesSorted.map((paciente) => {
                        console.log(`${paciente.codigo} - Entrada: ${paciente.dataEntrada} | Prioridade: ${prioridadePacienteLabel[paciente.prioridade]} | Nome: ${paciente.nome} | Idade: ${paciente.idade} | CPF: ${paciente.cpf} \nSintomas: ${paciente.sintomas}`);
                    });
                }
                await rl.question("\nPressione ENTER para continuar...");
                break;
            case "2":
                if (state.pacientes.length === 0) {
                    console.log("\nNenhum paciente cadastrado.");
                } else {
                    pacientesSorted = [...state.pacientes].sort((a, b) => b.prioridade - a.prioridade);
                    pacientesSorted.map((paciente) => {
                        console.log(`${paciente.codigo} - Prioridade: ${prioridadePacienteLabel[paciente.prioridade]} | Entrada: ${paciente.dataEntrada} | Nome: ${paciente.nome} | Idade: ${paciente.idade} | CPF: ${paciente.cpf} \nSintomas: ${paciente.sintomas}`);
                    });
                }
                await rl.question("\nPressione ENTER para continuar...");
                break;
            case "3":
                stayInMenu = false;
                break;
            default:
                await invalidOptionCase(rl);
        }
    }
}