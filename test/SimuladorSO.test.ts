import { describe, it, expect } from "vitest";

import { AdministradorMemoria } from "../src/AdministradorMemoria";
import { FirstFit } from "../src/FirstFit";
import { Proceso } from "../src/Proceso";
import { SimuladorSO } from "../src/SimuladorSO";
import { EstadoProceso } from "../src/EstadoProceso";


describe("SimuladorSO", () => {

    it("debe cargar un proceso y dejarlo listo", () => {

        const memoria = new AdministradorMemoria(
            1024,
            new FirstFit()
        );

        const simulador = new SimuladorSO(
            memoria,
            2
        );

        const p1 = new Proceso(
            "P1",
            200,
            4
        );

        simulador.agregarProceso(p1);

        simulador.avanzarTick();

        expect(p1.estado).toBe(EstadoProceso.EJECUTANDO);
    });

});

it("debe devolver el proceso a LISTO cuando termina su quantum", () => {

    const memoria = new AdministradorMemoria(
        1024,
        new FirstFit()
    );

    const simulador = new SimuladorSO(
        memoria,
        2
    );

    const p1 = new Proceso(
        "P1",
        200,
        4
    );

    simulador.agregarProceso(p1);

    simulador.avanzarTick();
    simulador.avanzarTick();

    expect(p1.estado).toBe(EstadoProceso.LISTO);
});