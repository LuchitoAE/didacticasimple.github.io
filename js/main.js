document.addEventListener("DOMContentLoaded", async () => {
  // Aseguramos que el objeto App exista
  window.App = window.App || {};
  App.sala = App.sala || {};
  App.ui = App.ui || {};

  console.log("✅ DOM listo, iniciando app...");

  // Cargar lista de juegos
  if (App.sala.populateJuegos) {
    await App.sala.populateJuegos();
  } else {
    console.warn("⚠️ populateJuegos no disponible aún");
  }

  // Enlazar eventos
  if (App.sala.bindSalaEvents) {
    App.sala.bindSalaEvents();
  } else {
    console.warn("⚠️ bindSalaEvents no disponible aún");
  }

  // Asignar navegación manual si no se enlazaron
  const { showScreen } = App.ui;
  const btnCrear = document.getElementById("btnCrear");
  const btnUnirse = document.getElementById("btnUnirse");

  if (btnCrear) btnCrear.addEventListener("click", () => showScreen("crearSala"));
  if (btnUnirse) btnUnirse.addEventListener("click", () => showScreen("unirseSala"));

  console.log("✅ Botones enlazados correctamente");
});
