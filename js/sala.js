// Lógica de creación/unión de sala
const { uid, clamp, saveRoom, loadRoom } = App.utils;
const { showScreen, toast, $, $$ } = App.ui;

async function populateJuegos(){
  // Carga catálogo (con fallback local)
  const fallback = {
    juegos: [
      { id:"aventuras", nombre:"🎨 Aventuras del Color", habilitado:true, desc:"Mezcla de colores cooperativa" },
      { id:"mates", nombre:"🔢 Matemáticas Mágicas", habilitado:false },
      { id:"sonidos", nombre:"🔊 Sonidos del Mundo", habilitado:false },
      { id:"puzzle", nombre:"🧩 Puzzle de Formas", habilitado:false },
      { id:"planeta", nombre:"🌍 Guardianes del Planeta", habilitado:false }
    ]
  };
  const catalog = await App.utils.loadJSON("data/juegos.json", fallback);
  App.state.juegosCatalog = catalog;

  const select = $("#juegoSelect");
  select.innerHTML = "";
  catalog.juegos.forEach(j=>{
    const opt = document.createElement("option");
    opt.value = j.id;
    opt.textContent = j.nombre;
    if(!j.habilitado) opt.disabled = true;
    select.appendChild(opt);
  });
}

function bindSalaEvents(){
  $("#btnCrear")?.addEventListener("click", ()=> showScreen("crearSala"));
  $("#btnUnirse")?.addEventListener("click", ()=> showScreen("unirseSala"));

  $$(".back").forEach(b => b.addEventListener("click", ()=> showScreen("home")));

  $("#btnCrearSala")?.addEventListener("click", ()=>{
    const groups = clamp(parseInt($("#numGrupos").value||"2",10), 1, 10);
    const members = clamp(parseInt($("#numIntegrantes").value||"5",10), 2, 15);
    const game = $("#juegoSelect").value || "aventuras";
    const code = uid(6);

    const room = {
      code, groups, members, game,
      createdAt: Date.now()
    };
    saveRoom(room);

    $("#codigoSala").textContent = code;
    $("#infoSala").textContent = `${groups} grupo(s), ${members} integrante(s) por grupo. Juego: ${game}`;
    showScreen("sala");
  });

  $("#btnIngresarSala")?.addEventListener("click", ()=>{
    const code = ($("#codigoEntrada").value||"").trim().toUpperCase();
    if(!code){ toast("Ingresa un código"); return; }
    const r = loadRoom(code);
    if(!r){ toast("Sala no encontrada (en este navegador)"); return; }
    $("#codigoSala").textContent = r.code;
    $("#infoSala").textContent = `${r.groups} grupo(s), ${r.members} integrante(s) por grupo. Juego: ${r.game}`;
    showScreen("sala");
  });

  $("#btnComenzar")?.addEventListener("click", ()=>{
    const r = App.state.room || loadRoom($("#codigoSala").textContent);
    if(!r){ toast("No hay sala cargada"); return; }
    if(r.game === "aventuras"){ App.aventuras.init(); }
    else{ toast("Juego aún no disponible"); }
  });
}

App.sala = { populateJuegos, bindSalaEvents };
