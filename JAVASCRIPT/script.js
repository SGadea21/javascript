// Obtener referencias a los elementos del formulario y resultados
const formularioPrestamo = document.getElementById('formulario-prestamo');
const montoPrestamo = document.getElementById('monto-prestamo');
const tasaInteres = document.getElementById('tasa-interes');
const plazoPrestamo = document.getElementById('plazo-prestamo');
const cuotaMensual = document.getElementById('cuota-mensual');
const tablaDesglosePagos = document.getElementById('tabla-desglose-pagos');
// Usuarios validos
const usuariosValidos = {
    sofia: "1234",
    prueba: "prueba",
   
};


// Función para realizar el inicio de sesión
function iniciarSesion() {
    // Obtener el nombre de usuario y contraseña mediante prompts
    const usuarioIngresado = prompt("Ingrese su nombre de usuario:");
    const contraseñaIngresada = prompt("Ingrese su contraseña:");

    // Verificar si el nombre de usuario y contraseña son válidos
    if (usuariosValidos.hasOwnProperty(usuarioIngresado) && usuariosValidos[usuarioIngresado] === contraseñaIngresada) {
        alert("¡Inicio de sesión exitoso!");
        return true; // Devuelve true si el inicio de sesión es exitoso
    } else {
        alert("Nombre de usuario o contraseña incorrectos. Inténtelo de nuevo.");
        return false; // Devuelve false si el inicio de sesión falla
    }
}

// Función para realizar un cálculo de préstamo
function calcularPrestamo() {
    // Código para calcular un préstamo
    // ... (código existente)
}

// Función principal
function main() {
    // Realizar el inicio de sesión una vez al principio
    const sesionExitosa = iniciarSesion();

    // Si el inicio de sesión es exitoso, permite realizar cálculos
    if (sesionExitosa) {
        do {
            calcularPrestamo(); // Llama a la función para calcular un préstamo

            // Preguntar al usuario si desea realizar otro cálculo
            const continuar = confirm("¿Desea realizar otro cálculo?");
        } while (continuar);
    }
}

// Llamar a la función principal para iniciar el programa
main();

// Función para calcular la cuota mensual
function calcularCuotaMensual(principal, tasa, plazo) {
    tasa = tasa / 100 / 12;
    const cuotaMensualValor = (principal * tasa) / (1 - Math.pow(1 + tasa, -plazo));
    return cuotaMensualValor.toFixed(2);
}

// Función para generar un desglose de pagos
function generarDesglosePagos(principal, tasa, plazo) {
    const tasaPorMes = tasa / 100 / 12;
    const desglosePagos = [];

    for (let mes = 1; mes <= plazo; mes++) {
        const pagoInteres = principal * tasaPorMes;
        const pagoPrincipal = calcularCuotaMensual(principal, tasa, plazo) - pagoInteres;
        principal -= pagoPrincipal;
        desglosePagos.push({ mes, pagoPrincipal, pagoInteres, saldoRestante: principal });
    }

    // Ordena el desglose de pagos por mes (ascendente)
    desglosePagos.sort((a, b) => a.mes - b.mes);

    return desglosePagos;
}

// Función para manejar el envío del formulario
function manejarEnvioFormulario(e) {
    e.preventDefault();

    // Obtener los valores ingresados por el usuario
    const principal = parseFloat(montoPrestamo.value);
    const tasa = parseFloat(tasaInteres.value);
    const plazo = parseFloat(plazoPrestamo.value);

    // Validar que los valores sean numéricos y positivos
    if (isNaN(principal) || isNaN(tasa) || isNaN(plazo) || principal <= 0 || tasa <= 0 || plazo <= 0) {
        alert('Por favor, ingrese valores numéricos positivos válidos.');
        return;
    }

    // Calcular la cuota mensual
    const cuotaMensualValor = calcularCuotaMensual(principal, tasa, plazo);

    // Mostrar la cuota mensual en la página
    cuotaMensual.textContent = `$${cuotaMensualValor}`;

    // Generar y mostrar el desglose de pagos
    const desglosePagosData = generarDesglosePagos(principal, tasa, plazo);
    mostrarDesglosePagos(desglosePagosData);
}

// Función para mostrar el desglose de pagos
function mostrarDesglosePagos(desglosePagosData) {
    const cuerpoTabla = document.getElementById('cuerpo-tabla-desglose-pagos');
    cuerpoTabla.innerHTML = ''; // Borra cualquier contenido existente en la tabla

    for (const pago of desglosePagosData) {
        cuerpoTabla.innerHTML += `<tr>
            <td>${pago.mes}</td>
            <td>$${pago.pagoPrincipal.toFixed(2)}</td>
            <td>$${pago.pagoInteres.toFixed(2)}</td>
            <td>$${pago.saldoRestante.toFixed(2)}</td>
        </tr>`;
    }
}

// Escuchar el evento submit del formulario
formularioPrestamo.addEventListener('submit', manejarEnvioFormulario);
