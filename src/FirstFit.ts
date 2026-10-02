import { BloqueMemoria } from "./BloqueMemoria";
import { Proceso } from "./Proceso";
import { IEstrategiaAsignacion } from "./IEstrategiaAsignacion";

export class FirstFit implements IEstrategiaAsignacion {

    asignar(bloques: BloqueMemoria[], proceso: Proceso): boolean {

        const indice = bloques.findIndex(
            bloque => bloque.libre && bloque.tamano >= proceso.tamanoMemoria
        );

        if (indice === -1) {
            return false;
        }

        const bloque = bloques[indice]!;

        const bloqueAsignado = new BloqueMemoria(
            bloque.inicio,
            proceso.tamanoMemoria,
            false,
            proceso.pid
        );

        const bloqueLibre = new BloqueMemoria(
            bloque.inicio + proceso.tamanoMemoria,
            bloque.tamano - proceso.tamanoMemoria
        );

        bloques.splice(
            indice,
            1,
            bloqueAsignado,
            bloqueLibre
        );

        return true;
    }
}