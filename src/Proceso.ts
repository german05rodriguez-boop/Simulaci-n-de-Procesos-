export class Proceso {
    pid: string;
    tamanoMemoria: number;
    tiempoCPUTotal: number;
    tiempoCPURestante: number;

    constructor(pid: string, tamanoMemoria: number, tiempoCPUTotal: number) {
        
        this.pid = pid;
        this.tamanoMemoria = tamanoMemoria;
        this.tiempoCPUTotal = tiempoCPUTotal;
        this.tiempoCPURestante = tiempoCPUTotal;
    }
}