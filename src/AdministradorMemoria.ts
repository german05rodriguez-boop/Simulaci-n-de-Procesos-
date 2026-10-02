import { BloqueMemoria } from "./BloqueMemoria";
import { Proceso } from "./Proceso";
import { IEstrategiaAsignacion } from "./IEstrategiaAsignacion";

export class AdministradorMemoria {
    tamanoTotal: number;
    bloques: BloqueMemoria[];
    estrategia: IEstrategiaAsignacion;

    constructor(
        tamanoTotal: number,
        estrategia: IEstrategiaAsignacion
    ) {
        this.tamanoTotal = tamanoTotal;
        this.estrategia = estrategia;

        this.bloques = [
            new BloqueMemoria(0, tamanoTotal)
        ];
    }
}