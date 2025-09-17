async function cargarServicios() {
  try {
    const res = await fetch(`assets/db/db.json`);
    const servicios = await res.json();
    return servicios;
  } catch (error) {
    console.error("Error al cargar los servicios: ", error);
    Toastify({
      text: "Error al cargar los servicios",
      duration: 3000,
      backgroundColor: "red",
      position: "center",
    }).showToast();
    return [];
  }
}

async function mostrarServicios() {
  try {
    let container = document.querySelector(".servicios");
    let servMostrados = "";
    const servicios = await cargarServicios();

    if (servicios.length === 0) {
      container.innerHTML = "<p>No hay servicios disponibles.</p>";
      return;
    }

    servicios.forEach((s) => {
      servMostrados += `
      <div class="servicio">
        <h2>${s.nombre}</h2>
        <p>$${s.precio}</p>
        <button onclick="aniadirServicio(${s.id})">Añadir</button>
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

async function aniadirServicio(id) {
  try {
    const servicios = await cargarServicios();
    let servicio = servicios[id - 1];

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(servicio);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    Toastify({
      text: "Se añadio el Servicio al carrito",
      duration: 3000,
      backgroundColor: "gray",
      position: "center",
    }).showToast();
  } catch (error) {
    console.error("Error al añadir el servicio al carrito: ", error);
    Toastify({
      text: "Error al añadir el servicio al carrito",
      duration: 3000,
      backgroundColor: "red",
      position: "center",
    }).showToast();
  }
}

mostrarServicios();
