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
    asignar(proceso: Proceso): boolean {
        return this.estrategia.asignar(
            this.bloques,
            proceso
        );
    }

    liberar(pid: string): boolean {
        const bloque = this.bloques.find(
            bloque => bloque.pid === pid
        );

        if (bloque === undefined) {
            return false;
        }

        bloque.libre = true;
        bloque.pid = null;

        this.coalescencia();

        return true;
    }
     private coalescencia(): void {
        for (let i = 0; i < this.bloques.length - 1; i++) {

            const actual = this.bloques[i]!;
            const siguiente = this.bloques[i + 1]!;

            if (actual.libre && siguiente.libre) {
                actual.tamano += siguiente.tamano;

                this.bloques.splice(i + 1, 1);

                i--;
            }
        }
    }

    obtenerMemoriaLibre(): number {
        return this.bloques
            .filter(bloque => bloque.libre)
            .reduce(
                (total, bloque) => total + bloque.tamano,
                0
            );
    }

    obtenerMayorHuecoLibre(): number {
        return this.bloques
            .filter(bloque => bloque.libre)
            .reduce(
                (mayor, bloque) =>
                    Math.max(mayor, bloque.tamano),
                0
            );
    }

    obtenerFragmentacionExterna(): number {
        const memoriaLibre = this.obtenerMemoriaLibre();
        const mayorHueco = this.obtenerMayorHuecoLibre();

        return memoriaLibre === 0
            ? 0
            : (1 - mayorHueco / memoriaLibre) * 100;
    }

    mostrarMapa(): void {
        console.log("\n--- MAPA DE MEMORIA ---");

        this.bloques.forEach(bloque => {

            const final = bloque.inicio + bloque.tamano;

            console.log(
                `[${bloque.inicio} - ${final}] KB | ` +
                `${bloque.libre ? "LIBRE" : bloque.pid}`
            );
        });
    }
}