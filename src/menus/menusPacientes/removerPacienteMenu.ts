import { removerPacienteService } from "../../services/removerPaciente.service";
import { ParamsMenu } from "../../types/paramsMenu";
import { errorCase } from "../../utils/errorCase";
import { parsedNumberQuestion } from "../../utils/parsedQuestions/parsedNumberQuestion";

export async function removerPacienteMenu(params: ParamsMenu) {
    const {rl, getAppState, setAppState} = params;

    console.clear();
    console.log("=== Remover Paciente ===");

    const codigoPaciente = await parsedNumberQuestion({
        rl,
        question: "Digite o CÓDIGO do paciente a ser removido: ",
        invalidMsg: "Código inválido. Digite apenas números."
    });

    try {
        const newState = await removerPacienteService(codigoPaciente, getAppState());
        setAppState(newState);
        await rl.question("\nPressione ENTER para continuar...");
    } catch (error) {
        await errorCase(error, rl);
    }
}