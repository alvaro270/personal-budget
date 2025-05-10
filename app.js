// Permitir al usuario registrar ingresos y egresos, calcular el saldo total y mostrar un resumen de los movimientos registrados.
let movimientos = [];
function registrarMovimiento() {
  while (true) {
    // Bucle para permitir múltiples registros
    // Solicitar datos al usuario
    // Se utiliza prompt() para capturar datos del usuario
    // Se utiliza parseFloat() para convertir el monto a un número decimal
    let nombre = prompt(
      "Control de ingresos y egresos:\nIngrese el nombre del movimiento:"
    );
    let tipo = prompt("Tipo de movimiento (Ingreso/Egreso):").toLowerCase();
    let monto = parseFloat(prompt("Ingrese el monto:"));

    // Validaciones
    if (!nombre || nombre.trim() === "") {
      // Verifica si el nombre está vacío o solo contiene espacios
      alert("El nombre no puede estar vacío.");
      return;
    }

    if (tipo !== "ingreso" && tipo !== "egreso") {
      // Verifica si el tipo es diferente de 'Ingreso' o 'Egreso'
      alert("El tipo debe ser 'Ingreso' o 'Egreso'.");
      return;
    }

    if (isNaN(monto) || monto <= 0) {
      // Verifica si el monto no es un número o es menor o igual a cero
      alert("El monto debe ser un número mayor a cero.");
      return;
    }

    // Guardar movimiento
    movimientos.push({ nombre, tipo, monto });
    let continuar = prompt(
      "¿Desea registrar otro movimiento? (si/no)"
    ).toLowerCase();
    if (continuar !== "si") break; // Si el usuario no quiere continuar, se sale del bucle
  }
}
function calcularTotalSaldo() {
  let saldo = 0;

  for (let mov of movimientos) {
    // Recorre el array de movimientos
    if (mov.tipo === "ingreso") {
      // Si el tipo es 'Ingreso', suma el monto al saldo
      saldo += mov.monto;
    } else if (mov.tipo === "egreso") {
      // Si el tipo es 'Egreso', resta el monto del saldo
      saldo -= mov.monto;
    }
    return saldo; // Devuelve el saldo total
  }
}
function mostrarResumen() {
  let totalIngreso = 0;
  let totalEgreso = 0;
  let mayorIngreso = { nombre: "", monto: 0 };
  let mayorEgreso = { nombre: "", monto: 0 };

  for (let mov of movimientos) {
    // Recorre el array de movimientos
    if (mov.tipo === "ingreso") {
      // Si el tipo es 'Ingreso', suma el monto al total de ingresos
      totalIngreso += mov.monto;
      if (mov.monto > mayorIngreso.monto) {
        // Verifica si el monto es mayor al mayor ingreso registrado
        mayorIngreso = { mov };
      }
    } else if (mov.tipo === "egreso") {
      // Si el tipo es 'Egreso', suma el monto al total de egresos
      totalEgreso += mov.monto;
      if (mov.monto > mayorEgreso.monto) {
        // Verifica si el monto es mayor al mayor egreso registrado
        mayorEgreso = { mov };
      }
    }
  }
  let saldo = calcularTotalSaldo(); // Llama a la función para calcular el saldo total
  let resumen =
    `Resumen Final:\n` +
    `Cantidad de movimientos: ${movimientos.length}\n` +
    `Saldo total: ${saldo}\n` +
    `Desglose por tipo:\n`;
  if (totalIngreso > 0) resumen += `- Ingresos: $${totalIngreso.toFixed(2)}\n`;
  if (totalEgreso > 0) resumen += `- Egresos: $${totalEgreso.toFixed(2)}\n`;
  if (mayorIngreso.monto > 0)
    resumen += `Mayor ingreso: ${
      mayorIngreso.nombre
    } - $${mayorIngreso.monto.toFixed(2)}\n`;
  if (mayorEgreso.monto > 0)
    resumen += `Mayor egreso: ${
      mayorEgreso.nombre
    } - $${mayorEgreso.monto.toFixed(2)}\n`;

  alert(resumen); // Muestra el resumen final al usuario
  console.log(resumen); // También lo muestra en la consola
}
function eliminarMovimientoPorNombre() {
  let nombre = prompt("Ingrese el nombre del movimiento a eliminar:");
  let index = movimientos.findIndex(
    (mov) => mov.nombre.toLowerCase() === nombre.toLowerCase()
  ); // Busca el índice del movimiento por nombre
  if (index !== -1) {
    // Si se encuentra el movimiento
    movimientos.splice(index, 1); // Elimina el movimiento del array
    alert(`Movimiento "${nombre}" eliminado.`); // Muestra un mensaje de confirmación
  } else {
    alert(`No se encontró ningún movimiento con el nombre "${nombre}".`); // Muestra un mensaje de error si no se encuentra el movimiento
  }
}

registrarMovimiento(); // Llama a la función para registrar movimientos
mostrarResumen(); // Llama a la función para mostrar el resumen

const deseaEliminar = prompt(
  "¿Desea eliminar un movimiento? (si/no)"
).toLowerCase(); // Pregunta al usuario si desea eliminar un movimiento
if (deseaEliminar === "si") {
  // Si el usuario desea eliminar un movimiento
  eliminarMovimientoPorNombre(); // Llama a la función para eliminar un movimiento por nombre
  mostrarResumen(); // Muestra el resumen nuevamente después de la eliminación
}
