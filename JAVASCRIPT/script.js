// Obtener referencias a los elementos del formulario y resultados
const formularioPrestamo = document.getElementById('formulario-prestamo');
const montoPrestamo = document.getElementById('monto-prestamo');
const tasaInteres = document.getElementById('tasa-interes');
const plazoPrestamo = document.getElementById('plazo-prestamo');
const cuotaMensual = document.getElementById('cuota-mensual');
const tablaDesglosePagos = document.getElementById('tabla-desglose-pagos');

// Recuperar la variable de localStorage
let Usuario = localStorage.getItem('Usuario');

// Verificar si la variable existe y no es nula
if (Usuario) {
    // Actualizar el contenido del span "user-name"
    let userSpan = document.getElementById('user-name');
    userSpan.textContent = Usuario;
    
    // Mostrar el elemento "user-section" que estaba oculto
    let userSection = document.getElementById('user-section');
    userSection.classList.remove('hidden');
    
}

// Función para obtener datos de la API mediante AJAX y promesas
function getAPIData(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            resolve(data);
          } else {
            reject('Error al obtener los datos');
          }
        }
      };
  
      xhr.open('GET', url);
      xhr.send();
    });
  }
  
  // Función que simula un retraso con setTimeout
  function simulateDelay() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Han pasado dos segundos');
      }, 2000);
    });
  }
  
  // Obtener la API, retraso y mostrar los datos
  getAPIData('https://jsonplaceholder.typicode.com/posts')
    .then((data) => {
      updateLoanSimulator(data); // Actualizar el simulador con los datos obtenidos
  
      return simulateDelay(); // Espera simulada
    })
    .then((message) => {
      console.log(message); // Esto se imprimirá después de dos segundos
    })
    .catch((error) => {
      console.error(error); // Manejo de errores
    });
  

function updateLoanSimulator(data) {
    // Aquí puedes manipular los datos y actualizar tu simulador de préstamos
    const select = document.getElementById('plazo-prestamo'); // Obtener referencia al select
  
    data.forEach(post => {
      const option = document.createElement('option');
      option.value = post.id;
      option.textContent = post.id;
      select.appendChild(option);
    });
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

