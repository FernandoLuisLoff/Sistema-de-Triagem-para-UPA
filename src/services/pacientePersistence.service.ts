import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { Paciente } from "../types/paciente";
import { PrioridadePaciente } from "../types/prioridadePaciente";
import { StatusAtendimento } from "../types/statusAtendimento";

type PersistedPacientes = {
    pacientes: Paciente[];
};

export const DEFAULT_PACIENTES_FILE = path.resolve(process.cwd(), "data", "pacientes.json");

function isPrioridadePaciente(value: unknown): value is PrioridadePaciente {
    return value === 1 || value === 2 || value === 3;
}

function isStatusAtendimento(value: unknown): value is StatusAtendimento {
    return value === "aguardando" || value === "em_atendimento" || value === "atendido";
}

function normalizePaciente(rawPaciente: Partial<Paciente>, index: number): Paciente {
    return {
        codigo: typeof rawPaciente.codigo === "number" ? rawPaciente.codigo : index + 1,
        nome: rawPaciente.nome ?? "Paciente sem nome",
        cpf: rawPaciente.cpf ?? "00000000000",
        idade: typeof rawPaciente.idade === "number" ? rawPaciente.idade : 0,
        dataEntrada: rawPaciente.dataEntrada ?? "01/01/1970",
        sintomas: rawPaciente.sintomas ?? "Não informado",
        prioridade: isPrioridadePaciente(rawPaciente.prioridade) ? rawPaciente.prioridade : 1,
        status: isStatusAtendimento(rawPaciente.status) ? rawPaciente.status : "aguardando"
    };
}

async function ensurePacientesFile(filePath: string): Promise<void> {
    await mkdir(path.dirname(filePath), { recursive: true });

    try {
        await readFile(filePath, "utf-8");
    } catch {
        await writeFile(filePath, JSON.stringify({ pacientes: [] }, null, 2) + "\n", "utf-8");
    }
}

export async function carregarPacientesExternosService(filePath = DEFAULT_PACIENTES_FILE): Promise<Paciente[]> {
    await ensurePacientesFile(filePath);
    const jsonRaw = await readFile(filePath, "utf-8");
    const data = JSON.parse(jsonRaw) as Partial<PersistedPacientes>;

    if (!Array.isArray(data.pacientes)) {
        return [];
    }

    return data.pacientes.map((paciente, index) => normalizePaciente(paciente, index));
}

export async function salvarPacientesService(pacientes: Paciente[], filePath = DEFAULT_PACIENTES_FILE): Promise<void> {
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, JSON.stringify({ pacientes }, null, 2) + "\n", "utf-8");
}