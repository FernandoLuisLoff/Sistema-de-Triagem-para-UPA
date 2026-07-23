import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { AppState } from "../types/appState";
import { Paciente } from "../types/paciente";
import { chamarProximoPacienteService } from "./chamarProximoPaciente.service";
import { finalizarAtendimentoPacienteService } from "./finalizarAtendimentoPaciente.service";
import { carregarPacientesExternosService } from "./pacientePersistence.service";
import { buscarPacienteService, gerarEstatisticasPacientesService } from "./estatisticasPacientes.service";

const pacientes: Paciente[] = [
    {
        codigo: 1,
        nome: "Ana Pereira da Silva",
        cpf: "11111111111",
        idade: 25,
        dataEntrada: "20/07/2026",
        sintomas: "Dor de cabeça intensa há dois dias.",
        prioridade: 2,
        status: "aguardando"
    },
    {
        codigo: 2,
        nome: "Bruno Almeida Costa",
        cpf: "22222222222",
        idade: 62,
        dataEntrada: "21/07/2026",
        sintomas: "Dor forte no peito e dificuldade para respirar.",
        prioridade: 3,
        status: "aguardando"
    },
    {
        codigo: 3,
        nome: "Carla Souza Martins",
        cpf: "33333333333",
        idade: 44,
        dataEntrada: "19/07/2026",
        sintomas: "Febre alta persistente e dor muscular.",
        prioridade: 3,
        status: "atendido"
    }
];

function createState(): AppState {
    return { pacientes: structuredClone(pacientes), running: true };
}

async function createTempFile(): Promise<{ directory: string; filePath: string }> {
    const directory = await mkdtemp(path.join(os.tmpdir(), "upa-triagem-"));
    return { directory, filePath: path.join(directory, "pacientes.json") };
}

test("chama o paciente aguardando de maior prioridade", async () => {
    const { directory, filePath } = await createTempFile();

    try {
        const state = await chamarProximoPacienteService(createState(), filePath);
        assert.equal(state.pacientes.find((paciente) => paciente.codigo === 2)?.status, "em_atendimento");
    } finally {
        await rm(directory, { recursive: true, force: true });
    }
});

test("finaliza o atendimento atual", async () => {
    const { directory, filePath } = await createTempFile();

    try {
        const chamado = await chamarProximoPacienteService(createState(), filePath);
        const finalizado = await finalizarAtendimentoPacienteService(chamado, filePath);
        assert.equal(finalizado.pacientes.find((paciente) => paciente.codigo === 2)?.status, "atendido");
    } finally {
        await rm(directory, { recursive: true, force: true });
    }
});

test("busca e calcula estatísticas dos pacientes", () => {
    const state = createState();
    const estatisticas = gerarEstatisticasPacientesService(state);

    assert.equal(buscarPacienteService("bruno", state)?.codigo, 2);
    assert.equal(estatisticas.totalPacientes, 3);
    assert.equal(estatisticas.aguardando, 2);
    assert.equal(estatisticas.porPrioridade[3], 2);
    assert.equal(estatisticas.proximoPaciente, "Bruno Almeida Costa");
});

test("carrega pacientes a partir de JSON e assume status pendente quando ausente", async () => {
    const { directory, filePath } = await createTempFile();

    try {
        await writeFile(filePath, JSON.stringify({ pacientes: [{ ...pacientes[0], status: undefined }] }), "utf-8");
        const carregados = await carregarPacientesExternosService(filePath);
        assert.equal(carregados[0]?.status, "aguardando");
    } finally {
        await rm(directory, { recursive: true, force: true });
    }
});