// Obtener referencias a los elementos del formulario y resultados
const formularioPrestamo = document.getElementById('formulario-prestamo');
const montoPrestamo = document.getElementById('monto-prestamo');
const tasaInteres = document.getElementById('tasa-interes');
const plazoPrestamo = document.getElementById('plazo-prestamo');
const cuotaMensual = document.getElementById('cuota-mensual');
const tablaDesglosePagos = document.getElementById('tabla-desglose-pagos');

// Recuperar la variable de localStorage
var Usuario = localStorage.getItem('Usuario');

// Verificar si la variable existe y no es nula
if (Usuario) {
    // Actualizar el contenido del span "user-name"
    var userSpan = document.getElementById('user-name');
    userSpan.textContent = Usuario;
    
    // Mostrar el elemento "user-section" que estaba oculto
    var userSection = document.getElementById('user-section');
    userSection.classList.remove('hidden');
    
    // Ocultar el enlace "Iniciar Sesión"
    var loginLink = document.getElementById('login-link');
    loginLink.style.display = 'none';
}

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
            alert('Por favor, ingrese valores numséricos positivos válidos.');
            return;
        }

        // Calcular la cuota mensual sin descuento
        let cuotaMensualSinDescuento = calcularCuotaMensual(principal, tasa, plazo);
        
        // Calcular la cuota mensual con descuento
        let cuotaMensualConDescuento = cuotaMensualSinDescuento;

        // Verificar si el monto del préstamo es igual o mayor a 100,000 pesos para aplicar el descuento
        if (principal >= 100000) {
            cuotaMensualConDescuento = (cuotaMensualSinDescuento * 0.9).toFixed(2); // Aplicar el descuento del 10%
            // Mostrar ambas cuotas mensuales en la página
            cuotaMensual.textContent = `$${cuotaMensualSinDescuento} (Antes) - $${cuotaMensualConDescuento} (ahora)`;
        }
        else
        {      
            // Mostrar  cuotas mensuales en la página
            cuotaMensual.textContent = `$${cuotaMensualSinDescuento} `;
        }


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

