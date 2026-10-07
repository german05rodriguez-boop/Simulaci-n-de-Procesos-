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
}