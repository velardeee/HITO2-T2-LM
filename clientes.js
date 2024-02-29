document.addEventListener("DOMContentLoaded", function() {
    // Ruta al archivo JSON de clientes
    const jsonFilePath = "clientes.json";
    const trimestres = ["Q1", "Q2", "Q3", "Q4", "Q1", "Q2", "Q3", "Q4"];
  
    // Función para cargar los datos desde el archivo JSON
    function cargarClientes() {
      fetch(jsonFilePath)
        .then(response => response.json())
        .then(data => mostrarClientes(data.clientes))
        .catch(error => console.error("Error al cargar los clientes:", error));
    }
  
    // Función para mostrar los clientes en la tabla
    function mostrarClientes(clientes) {
      const clientesTable = document.createElement("table");
      clientesTable.innerHTML = `
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Correo Electrónico</th>
            <th>Fecha de Inclusión</th>
            <th>Trimestre</th>
          </tr>
        </thead>
        <tbody>
          ${clientes.map((cliente, index) => `
            <tr>
              <td>${cliente.nombre}</td>
              <td>${cliente.apellidos}</td>
              <td>${cliente.telefono}</td>
              <td>${cliente.direccion.calle}, ${cliente.direccion.ciudad}, ${cliente.direccion.codigo_postal}, ${cliente.direccion.provincia}</td>
              <td>${cliente.correo_electronico}</td>
              <td>${cliente.fecha_inclusion}</td>
              <td>${trimestres[Math.floor(index / 2)]}</td>
            </tr>
          `).join('')}
        </tbody>
      `;
      
      // Cambiar el año a 2021 cuando llegue al cuarto trimestre (Q4)
      const currentMonth = new Date().getMonth();
      if (currentMonth >= 9 && currentMonth <= 11) { // Si estamos en Q4 (octubre, noviembre o diciembre)
        const yearCells = clientesTable.querySelectorAll("tbody tr td:nth-child(7)");
        yearCells.forEach(cell => {
          if (cell.textContent === "Q4") {
            const parentRow = cell.parentNode;
            const fechaInclusionCell = parentRow.querySelector("td:nth-child(6)");
            const fechaInclusion = fechaInclusionCell.textContent;
            if (fechaInclusion.startsWith("2020")) {
              fechaInclusionCell.textContent = fechaInclusion.replace("2020", "2021");
            }
          }
        });
      }
      
      document.getElementById("clientes").appendChild(clientesTable); // Aquí se cambió document.body por getElementById("clientes")
    }
  
    // Cargar los clientes al cargar la página
    cargarClientes();
});
