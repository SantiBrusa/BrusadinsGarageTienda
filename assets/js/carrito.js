async function mostrarServicios() {
  try {
    let container = document.querySelector(".servicios");
    let servMostrados = "";

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
      container.innerHTML = "<p>No hay servicios en el carrito.</p>";
      return;
    }

    carrito.forEach((s, i) => {
      servMostrados += `
        <div class="servicio">
          <h2>${s.nombre}</h2>
          <p>$${s.precio}</p>
          <button onclick="eliminarServicio(${i})">Eliminar</button>
        </div>`;
    });

    container.innerHTML = servMostrados;
  } catch (error) {
    console.error("Error al mostrar los servicios: ", error);
    Toastify({
      text: "Error al mostrar los servicios",
      duration: 3000,
      backgroundColor: "red",
      position: "center",
    }).showToast();
  }
}

mostrarServicios();

const eliminarServicio = (i) => {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito.splice(i, 1);

  localStorage.setItem("carrito", JSON.stringify(carrito));

  mostrarServicios();

  Toastify({
    text: "Se elimino el servicio del carrito",
    duration: 3000,
    backgroundColor: "green",
    position: "center",
  }).showToast();
};

document.getElementById("buy").addEventListener("click", () => {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carrito.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Carrito vacío",
      text: "No hay servicios en el carrito.",
    });
    return;
  }

  let total = 0;

  carrito.forEach((s) => {
    total += parseFloat(s.precio);
  });

  Swal.fire({
    title: "Confirmar compra",
    html: `<p>Total: $${total}</p>`,
    icon: "info",
    showCancelButton: true,
    confirmButtonText: "Comprar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("carrito");

      Swal.fire({
        icon: "success",
        title: "¡Pedido de Servicios Realizado!",
        text: "Gracias por elegirnos.",
        timer: 3000,
        showConfirmButton: false,
      });
      mostrarServicios();
    }
  });
});
