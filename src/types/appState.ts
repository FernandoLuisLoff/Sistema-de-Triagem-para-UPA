import { Paciente } from "./paciente";

export type AppState = {
    pacientes: Paciente[];
    running: boolean;
}