import { ParamsMenu } from "../../types/paramsMenu";
import { invalidOptionCase } from "../../utils/invalidOptionCase";
import { formPacienteMenu } from "./formPacienteMenu";
import { removerPacienteMenu } from "./removerPacienteMenu";
import { parsedNumberQuestion } from "../../utils/parsedQuestions/parsedNumberQuestion";
import { listarPacientesMenu } from "./listarPacientesMenu";
import { chamarProximoPacienteService } from "../../services/chamarProximoPaciente.service";
import { finalizarAtendimentoPacienteService } from "../../services/finalizarAtendimentoPaciente.service";
import { errorCase } from "../../utils/errorCase";

export async function pacientesMenu(params: ParamsMenu) {
    const {rl, getAppState, setAppState} = params;
    let stayInMenu = true;

    while (stayInMenu) {
        console.clear();
        console.log("=== Pacientes ===");
        console.log("1. Novo Paciente");
        console.log("2. Lista, Busca e Estatísticas");
        console.log("3. Editar Paciente");
        console.log("4. Remover Paciente");
        console.log("5. Chamar Próximo Paciente");
        console.log("6. Finalizar Atendimento Atual");
        console.log("7. Voltar");

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
                try {
                    const newState = await chamarProximoPacienteService(getAppState());
                    setAppState(newState);
                    console.log("\nPróximo paciente chamado com sucesso.");
                    await rl.question("\nPressione ENTER para continuar...");
                } catch (error) {
                    await errorCase(error, rl);
                }
                break;
            case "6":
                try {
                    const newState = await finalizarAtendimentoPacienteService(getAppState());
                    setAppState(newState);
                    console.log("\nAtendimento finalizado com sucesso.");
                    await rl.question("\nPressione ENTER para continuar...");
                } catch (error) {
                    await errorCase(error, rl);
                }
                break;
            case "7":
                stayInMenu = false;
                break;
            default:
                await invalidOptionCase(rl);
        }
    }
}