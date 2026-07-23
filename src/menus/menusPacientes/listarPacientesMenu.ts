import { ParamsMenu } from "../../types/paramsMenu";
import { invalidOptionCase } from "../../utils/invalidOptionCase";
import { Paciente } from "../../types/paciente";
import { prioridadePacienteLabel } from "../../types/prioridadePaciente";
import { statusAtendimentoLabel } from "../../types/statusAtendimento";
import { parsedPrioridadeQuestion } from "../../utils/parsedQuestions/parsedPrioridadeQuestion";
import { buscarPacienteService, gerarEstatisticasPacientesService, listarPacientesPorPrioridadeService } from "../../services/estatisticasPacientes.service";
import { listarPacientesEmEspera, ordenarPacientes } from "../../utils/pacienteQueue";

function printPaciente(paciente: Paciente) {
    console.log(`${paciente.codigo} - Status: ${statusAtendimentoLabel[paciente.status]} | Prioridade: ${prioridadePacienteLabel[paciente.prioridade]} | Entrada: ${paciente.dataEntrada} | Nome: ${paciente.nome} | Idade: ${paciente.idade} | CPF: ${paciente.cpf} \nSintomas: ${paciente.sintomas}`);
}

export async function listarPacientesMenu(params: ParamsMenu) {
    let stayInMenu = true;
    const {rl, getAppState} = params;
    let pacientesSorted: Paciente[] = [];

    while (stayInMenu) {
        console.clear();
        console.log("=== Lista de Pacientes ===");
        console.log("1. Ordenar por data de entrada");
        console.log("2. Ordenar por prioridade");
        console.log("3. Visualizar fila de atendimento");
        console.log("4. Filtrar por prioridade");
        console.log("5. Buscar paciente");
        console.log("6. Ver estatísticas");
        console.log("7. Voltar");

        const option = await rl.question("\nSelecione uma opção: ");
        const state = getAppState();

        switch (option) {
            case "1":
                if (state.pacientes.length === 0) {
                    console.log("\nNenhum paciente cadastrado.");
                } else {
                    pacientesSorted = ordenarPacientes(state.pacientes, "dataEntrada");
                    pacientesSorted.map(printPaciente);
                }
                await rl.question("\nPressione ENTER para continuar...");
                break;
            case "2":
                if (state.pacientes.length === 0) {
                    console.log("\nNenhum paciente cadastrado.");
                } else {
                    pacientesSorted = ordenarPacientes(state.pacientes, "prioridade");
                    pacientesSorted.map(printPaciente);
                }
                await rl.question("\nPressione ENTER para continuar...");
                break;
            case "3":
                pacientesSorted = listarPacientesEmEspera(state.pacientes);
                pacientesSorted.length === 0
                    ? console.log("\nNenhum paciente aguardando atendimento.")
                    : pacientesSorted.map(printPaciente);
                await rl.question("\nPressione ENTER para continuar...");
                break;
            case "4": {
                const prioridade = await parsedPrioridadeQuestion({
                    rl,
                    question: "Digite a prioridade desejada (1 - Baixa, 2 - Média, 3 - Alta): "
                });
                pacientesSorted = listarPacientesPorPrioridadeService(prioridade, state);
                pacientesSorted.length === 0
                    ? console.log("\nNenhum paciente encontrado para essa prioridade.")
                    : pacientesSorted.map(printPaciente);
                await rl.question("\nPressione ENTER para continuar...");
                break;
            }
            case "5": {
                const termo = await rl.question("Digite nome, CPF ou código do paciente: ");
                const paciente = buscarPacienteService(termo, state);
                paciente ? printPaciente(paciente) : console.log("\nPaciente não encontrado.");
                await rl.question("\nPressione ENTER para continuar...");
                break;
            }
            case "6": {
                const estatisticas = gerarEstatisticasPacientesService(state);

                console.log(`\nTotal de pacientes: ${estatisticas.totalPacientes}`);
                console.log(`Aguardando atendimento: ${estatisticas.aguardando}`);
                console.log(`Em atendimento: ${estatisticas.emAtendimento}`);
                console.log(`Atendidos: ${estatisticas.atendidos}`);
                console.log(`Pacientes de alta prioridade aguardando: ${estatisticas.haAltaPrioridadeEmEspera ? "Sim" : "Não"}`);
                console.log(`Média de idade: ${estatisticas.mediaIdade.toFixed(1)}`);
                console.log(`Totais por prioridade: Baixa=${estatisticas.porPrioridade[1]}, Média=${estatisticas.porPrioridade[2]}, Alta=${estatisticas.porPrioridade[3]}`);
                console.log(`Próximo paciente da fila: ${estatisticas.proximoPaciente ?? "Nenhum"}`);
                console.log(`Fila atual: ${estatisticas.filaAtual || "Nenhum paciente aguardando"}`);
                console.log(`CPFs cadastrados: ${estatisticas.cpfsCadastrados || "Nenhum"}`);
                await rl.question("\nPressione ENTER para continuar...");
                break;
            }
            case "7":
                stayInMenu = false;
                break;
            default:
                await invalidOptionCase(rl);
        }
    }
}