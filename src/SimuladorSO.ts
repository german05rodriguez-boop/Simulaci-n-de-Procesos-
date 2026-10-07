import { AdministradorMemoria } from "./AdministradorMemoria";
import { Proceso } from "./Proceso";
import { EstadoProceso } from "./EstadoProceso";

export class SimuladorSO {
    memoria: AdministradorMemoria;
    procesos: Proceso[];
    listos: Proceso[];
    bloqueados: Proceso[];
    terminados: Proceso[];
    procesoActual: Proceso | null;
    quantum: number;
    reloj: number;

    constructor(memoria: AdministradorMemoria, quantum: number) {
        this.memoria = memoria;
        this.quantum = quantum;
        this.reloj = 0;

        this.procesos = [];
        this.listos = [];
        this.bloqueados = [];
        this.terminados = [];

        this.procesoActual = null;
    }

    agregarProceso(proceso: Proceso): void {
        this.procesos.push(proceso);
    }

    asignarMemoria(): void {
        for (const proceso of this.procesos) {
            if (proceso.estado === EstadoProceso.NUEVO) {

                if (this.memoria.asignar(proceso)) {
                    proceso.estado = EstadoProceso.LISTO;
                    this.listos.push(proceso);
                } else {
                    proceso.estado = EstadoProceso.ESPERANDO;
                }
            }
        }
    }

    ejecutar(): void {
        if (this.procesoActual === null && this.listos.length > 0) {
            this.procesoActual = this.listos.shift()!;
            this.procesoActual.estado = EstadoProceso.EJECUTANDO;
        }
    }

    avanzarTick(): void {
        this.reloj++;

        this.asignarMemoria();
        this.ejecutar();

        if (this.procesoActual !== null) {
            this.procesoActual.tiempoCPURestante--;
            this.procesoActual.quantumConsumido++;

            if (this.procesoActual.tiempoCPURestante === 0) {
                this.procesoActual.estado = EstadoProceso.TERMINADO;
                this.memoria.liberar(this.procesoActual.pid);
                this.terminados.push(this.procesoActual);
                this.procesoActual = null;
            }
            else if (this.procesoActual.quantumConsumido === this.quantum) {
                this.procesoActual.estado = EstadoProceso.LISTO;
                this.procesoActual.quantumConsumido = 0;
                this.listos.push(this.procesoActual);
                this.procesoActual = null;
            }
        }
    }
}