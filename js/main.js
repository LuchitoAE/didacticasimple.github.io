// Punto de entrada: enlaza eventos y carga datos iniciales
document.addEventListener("DOMContentLoaded", async ()=>{
  await App.sala.populateJuegos();
  App.sala.bindSalaEvents();

  // Navegación botones iniciales
  const { showScreen } = App.ui;
  document.getElementById("btnCrear")?.addEventListener("click", ()=> showScreen("crearSala"));
  document.getElementById("btnUnirse")?.addEventListener("click", ()=> showScreen("unirseSala"));

  // Si hay sala reciente, precargar datos (opcional)
  const last = App.utils.lastRoomCode();
  if(last){
    const r = App.utils.loadRoom(last);
    if(r){
      document.getElementById("codigoSala").textContent = r.code;
      document.getElementById("infoSala").textContent = `${r.groups} grupo(s), ${r.members} integrante(s) por grupo. Juego: ${r.game}`;
    }
  }
});
