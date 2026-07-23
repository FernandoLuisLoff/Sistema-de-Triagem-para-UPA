import { ParamsMenu } from "../../types/paramsMenu";
import { invalidOptionCase } from "../../utils/invalidOptionCase";
import { formPacienteMenu } from "./formPacienteMenu";
import { removerPacienteMenu } from "./removerPacienteMenu";
import { parsedNumberQuestion } from "../../utils/parsedQuestions/parsedNumberQuestion";
import { listarPacientesMenu } from "./listarPacientesMenu";

export async function pacientesMenu(params: ParamsMenu) {
    const {rl} = params;
    let stayInMenu = true;

    while (stayInMenu) {
        console.clear();
        console.log("=== Pacientes ===");
        console.log("1. Novo Paciente");
        console.log("2. Lista de Pacientes");
        console.log("3. Editar Paciente");
        console.log("4. Remover Paciente");
        console.log("5. Voltar");

        const option = await rl.question("\nSelecione uma opção: ");
        
        switch (option) {
            case "1":
                await formPacienteMenu({
                    ...params,
                    type: "create"
                });
                break;
            case "2":
                await listarPacientesMenu(params);
                break;
            case "3":
                const codigoPaciente = await parsedNumberQuestion({
                    rl,
                    question: "Digite o CÓDIGO do paciente a ser editado: ",
                    invalidMsg: "Código inválido. Digite apenas números."
                });
                await formPacienteMenu({
                    ...params,
                    type: "update",
                    codigoPaciente
                });
                break;
            case "4":
                await removerPacienteMenu(params);
                break;
            case "5":
                stayInMenu = false;
                break;
            default:
                await invalidOptionCase(rl);
        }
    }
}