import criarPacienteService from "../../services/criarPaciente.service";
import editarPacienteService from "../../services/editarPaciente.service";
import { ParamsMenu } from "../../types/paramsMenu";
import { errorCase } from "../../utils/errorCase";
import { parsedCpfQuestion } from "../../utils/parsedQuestions/parsedCpfQuestion";
import { parsedDataQuestion } from "../../utils/parsedQuestions/parsedDataQuestion";
import { parsedNumberQuestion } from "../../utils/parsedQuestions/parsedNumberQuestion";
import { parsedPrioridadeQuestion } from "../../utils/parsedQuestions/parsedPrioridadeQuestion";
import { parsedQuestion } from "../../utils/parsedQuestions/parsedQuerstion";
import { PostPaciente } from "../../types/paciente";

type FormPacienteMenuParams = ParamsMenu & ({
    type: "create";
} | {
    type: "update";
    codigoPaciente: number;
});

export async function formPacienteMenu(params: FormPacienteMenuParams) {
    const { rl, type, getAppState, setAppState } = params;

    console.clear();
    if (type === "create") {
        console.log("=== Criar Paciente ===");
    } else if (type === "update") {
        console.log("=== Atualizar Paciente ===");
    }

    const nome = await parsedQuestion({
        rl,
        regex: /^(?=(?:.*[a-zA-Z]){10,})[a-zA-Z\s]+$/,
        question: "Digite o NOME do paciente: ",
        invalidMsg: "Nome inválido. Digite apenas letras e espaços. Mínimo de 10 caracteres."
    });

    const cpf = await parsedCpfQuestion({
        rl,
        question: "Digite o CPF do paciente: "
    });

    const idade = await parsedNumberQuestion({
        rl,
        question: "Digite a IDADE do paciente: "
    });

    const dataEntrada = await parsedDataQuestion({
        rl,
        question: "Digite a DATA DE ENTRADA do paciente (dd/mm/aaaa): "
    });

    const sintomas = await parsedQuestion({
        rl,
        regex: /^.{10,}$/,
        question: "Digite os SINTOMAS do paciente: ",
        invalidMsg: "Sintomas inválidos. Digite no mínimo 10 caracteres."
    });

    const prioridade = await parsedPrioridadeQuestion({
        rl,
        question: "Digite a PRIORIDADE do paciente (1 - Baixa, 2 - Média, 3 - Alta): "
    });

    const paciente: PostPaciente = {
        nome,
        cpf,
        idade,
        dataEntrada,
        sintomas,
        prioridade
    };

    try {
        if (type === "create") {
            const newState = await criarPacienteService(paciente, getAppState());
            setAppState(newState);
        } else if (type === "update") {
            const newState = await editarPacienteService(
                params.codigoPaciente, paciente, getAppState()
            );
            setAppState(newState);
        }
        await rl.question("\nPressione ENTER para continuar...");
    } catch (error) {
        await errorCase(error, rl);
    }
}