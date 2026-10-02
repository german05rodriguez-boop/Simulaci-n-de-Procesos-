export class BloqueMemoria {
    inicio: number;
    tamano: number;
    libre: boolean;
    pid: string | null;

    constructor(inicio: number, tamano: number, libre: boolean = true, pid: string | null = null) {
        this.inicio = inicio;
        this.tamano = tamano;
        this.libre = libre;
        this.pid = pid;
    }
}