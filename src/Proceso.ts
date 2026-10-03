import { EstadoProceso } from "./EstadoProceso";

export class Proceso {
    pid: string;
    tamanoMemoria: number;
    tiempoCPUTotal: number;
    tiempoCPURestante: number;
    estado: EstadoProceso;
    quantumConsumido: number;
    tiempoBloqueoRestante: number;

    constructor(pid: string, tamanoMemoria: number, tiempoCPUTotal: number) {
        this.pid = pid;
        this.tamanoMemoria = tamanoMemoria;
        this.tiempoCPUTotal = tiempoCPUTotal;
        this.tiempoCPURestante = tiempoCPUTotal;
        this.estado = EstadoProceso.NUEVO;
        this.quantumConsumido = 0;
        this.tiempoBloqueoRestante = 0;
    }
}