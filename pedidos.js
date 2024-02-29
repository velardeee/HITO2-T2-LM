document.addEventListener("DOMContentLoaded", function() {
  // Ruta al archivo JSON de pedidos
  const jsonFilePath = "pedidos.json";
  const trimestres = ["Q1", "Q2", "Q3", "Q4", "Q1", "Q2", "Q3", "Q4"];

  // Función para cargar los datos desde el archivo JSON
  function cargarPedidos() {
    fetch(jsonFilePath)
      .then(response => response.json())
      .then(data => mostrarPedidos(data.pedidos))
      .catch(error => console.error("Error al cargar los pedidos:", error));
  }

  // Función para mostrar los pedidos en la tabla
  function mostrarPedidos(pedidos) {
    if (!pedidos) {
      console.error("El array de pedidos es nulo o indefinido.");
      return;
    }

    const pedidosTable = document.createElement("table");
    pedidosTable.innerHTML = `
      <thead>
        <tr>
          <th>Número de Facturación</th>
          <th>Producto</th>
          <th>Trimestre</th>
        </tr>
      </thead>
      <tbody>
        ${pedidos.map(pedido => `
          <tr>
            <td>${pedido.numero_factura}</td>
            <td>${pedido.producto}</td>
            <td>${pedido.Trimestre}</td>
          </tr>
        `).join('')}
      </tbody>
    `;
    
    document.getElementById("pedidos").appendChild(pedidosTable);
  }

  // Cargar los pedidos al cargar la página
  cargarPedidos();
});
