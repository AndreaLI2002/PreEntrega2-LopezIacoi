const transferencias = [
    {alias: "mono.jardin.corredor", CVU: 3000458948, fecha: "2023/13/04", monto: 32.000}, 
    {alias: "malvarez.mp", CVU: 153443453, fecha: "2023/07/06", monto: 2.000},
    {alias: "karina.sampini", CVU: 234234254, fecha: "2023/10/07", monto: 1.500},
    {alias: "adrian.gonzales.bru", CVU: 26756782, fecha: "2023/15/07", monto: 20.000}
];

function inicio() {
    let CVU = prompt("¡Bienvenido al Cajero Automático!\nIngrese el número de su tarjeta");

    if (CVU) {
        let opcion = prompt(
            "¿Qué desea hacer?\n1. Depositar\n" +
            "2. Ver Monto\n" +
            "3. Transferir\n" +
            "4. Ver Actividad\n" +
            "0. Salir"
        ); 
        let dinero_en_cta = 0
        if (opcion) {
            while (opcion !== "0") {
                if (opcion === "1") {
                    dinero_en_cta = depositar(dinero_en_cta);
                } else if (opcion === "2") {
                    monto(dinero_en_cta);
                } else if (opcion === "3") {
                    transferir();
                } else if (opcion === "4") {
                    actividad(); 
                } else {
                    alert("La opción es inválida");
                }

                opcion = prompt(
                    "¿Qué desea hacer?\n1. Depositar\n" +
                    "2. Ver Monto\n" +
                    "3. Transferir\n" +
                    "4. Ver Actividad\n" +
                    "0. Salir"
                );
            }

        } else {
            return;
        }
    } else {
        return;
    }
}

function transferir() {
    let transferencia_a = prompt("Por favor, ingrese el número de CVU o alias a transferir");
    let transferenciaEncontrada = false;

    transferencias.forEach((transferencia) => {
        if (transferencia_a === transferencia.alias || transferencia_a === transferencia.CVU) {
            let dinero_transferir = prompt("¿Cuánto dinero desea transferir?");
            let transf = confirm("¿Desea transferir " + dinero_transferir + " a esta cuenta: " + transferencia_a + " ?");
            
            if (transf) {
                alert("Transferencia realizada");
            } else {
                alert("Transferencia cancelada.");
                inicio();
            }
            
            transferenciaEncontrada = true;
        }
    });

    if (!transferenciaEncontrada) {
        alert("No se ha encontrado coincidencia de datos.");
        transferir();
    }
}

function depositar(dinero_en_cta) {    
    const deposito = Number(prompt("¿Cuánto desea depositar?"));
    dinero_en_cta += deposito;
    alert("Se ha depositado " + deposito + "\nDinero en cuenta: " + dinero_en_cta);
    return dinero_en_cta;
}

function monto(dinero_en_cta) {
    alert("Su dinero en cuenta: " + dinero_en_cta);
}

function actividad() {
    let transferenciaVista = false;

    transferencias.forEach(transferencia => {
        alert(
            "Alias: " + transferencia.alias + "\n" +
            "CVU: " + transferencia.CVU + "\n" +
            "Fecha: " + transferencia.fecha + "\n" +
            "Monto: " +  transferencia.monto + "\n"
        );

        let opc_actividad = prompt("¿Desea ver la última actividad?\n 1. Si\n 2. No");

        if (opc_actividad === "1") {
            let ult_actividad = transferencias.filter(t => t.fecha > "2023/10/07");
            let volver = confirm(
                "Alias: " + ult_actividad[0].alias + "\n" +
                "CVU: " + ult_actividad[0].CVU + "\n" +
                "Fecha: " + ult_actividad[0].fecha + "\n" +
                "Monto: " +  ult_actividad[0].monto + "\n" +
                "\n ¿Desea volver al inicio?"
            );

            transferenciaVista = true;

            if (volver) {
                inicio();
            } else {
                actividad();
            }
        } else {
            inicio();
        }
    });

    if (!transferenciaVista) {
        alert("No se han encontrado datos.");
        actividad();
    }
}

inicio();