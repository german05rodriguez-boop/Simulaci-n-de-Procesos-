import { BloqueMemoria } from "./BloqueMemoria";
import { Proceso } from "./Proceso";

export interface IEstrategiaAsignacion {
    asignar(bloques: BloqueMemoria[], proceso: Proceso): boolean;
}