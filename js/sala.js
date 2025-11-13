// js/sala.js

window.App = window.App || {};

// Acceder solo a las funciones definidas en utils y ui (sin redeclarar nada)
const { uid, clamp, saveRoom, loadRoom, loadJSON } = App.utils;
const { showScreen, toast } = App.ui;

App.sala = {
  async populateJuegos() {
    const fallback = {
      juegos: [
        { id: "aventuras", nombre: "🎨 Aventuras del Color", habilitado: true },
        { id: "mates", nombre: "🔢 Matemáticas Mágicas", habilitado: false },
        { id: "sonidos", nombre: "🔊 Sonidos del Mundo", habilitado: false },
        { id: "puzzle", nombre: "🧩 Puzzle de Formas", habilitado: false },
        { id: "planeta", nombre: "🌍 Guardianes del Planeta", habilitado: false }
      ]
    };

    const catalog = await loadJSON("data/juegos.json", fallback);
    const select = document.getElementById("juegoSelect");
    select.innerHTML = "";
    catalog.juegos.forEach(j => {
      const opt = document.createElement("option");
      opt.value = j.id;
      opt.textContent = j.nombre;
      if (!j.habilitado) opt.disabled = true;
      select.appendChild(opt);
    });
  },

  bindSalaEvents() {
    document.getElementById("btnCrear").addEventListener("click", () => showScreen("crearSala"));
    document.getElementById("btnUnirse").addEventListener("click", () => showScreen("unirseSala"));
    document.querySelectorAll(".back").forEach(b => b.addEventListener("click", () => showScreen("home")));

    document.getElementById("btnCrearSala").addEventListener("click", () => {
      const groups = clamp(parseInt(document.getElementById("numGrupos").value), 1, 10);
      const members = clamp(parseInt(document.getElementById("numIntegrantes").value), 2, 15);
      const game = document.getElementById("juegoSelect").value;
      const code = uid(6);
      const room = { code, groups, members, game };
      saveRoom(room);
      document.getElementById("codigoSala").textContent = code;
      document.getElementById("infoSala").textContent = `${groups} grupo(s), ${members} integrante(s) por grupo. Juego: ${game}`;
      showScreen("sala");
    });

    document.getElementById("btnComenzar").addEventListener("click", () => {
      const r = loadRoom(document.getElementById("codigoSala").textContent);
      if (r?.game === "aventuras") App.aventuras.init();
      else toast("Juego no disponible aún");
    });
  }
};
