// Lógica del juego Aventuras del Color
const { loadJSON, pickRandom, shuffle, lsSet, lsGet } = App.utils;
const { showScreen, toast, $, $$ } = App.ui;

const Aventuras = {
  selected: [],
  target: null,
  rules: null,
  palette: null
};

async function loadColorsConfig(){
  // Fallback para abrir desde file:// sin servidor
  const fallback = {
    palette: ["rojo","azul","amarillo","blanco","negro","verde","marrón","naranja","morado","rosa","gris","celeste","cian","magenta","lima","turquesa"],
    mixRules: [
      {a:"rojo",b:"amarillo",result:"naranja"},
      {a:"amarillo",b:"rojo",result:"naranja"},
      {a:"azul",b:"amarillo",result:"verde"},
      {a:"amarillo",b:"azul",result:"verde"},
      {a:"rojo",b:"azul",result:"morado"},
      {a:"azul",b:"rojo",result:"morado"},
      {a:"rojo",b:"blanco",result:"rosa"},
      {a:"blanco",b:"rojo",result:"rosa"},
      {a:"negro",b:"blanco",result:"gris"},
      {a:"blanco",b:"negro",result:"gris"},
      {a:"azul",b:"blanco",result:"celeste"},
      {a:"blanco",b:"azul",result:"celeste"},
      {a:"rojo",b:"verde",result:"marrón"},
      {a:"verde",b:"rojo",result:"marrón"},
      {a:"amarillo",b:"negro",result:"oliva"},
      {a:"negro",b:"amarillo",result:"oliva"},
      /* extras */
      {a:"azul",b:"verde",result:"turquesa"},
      {a:"rojo",b:"blanco",result:"rosa"},
      {a:"azul",b:"magenta",result:"morado"},
      {a:"amarillo",b:"cian",result:"verde"},
      {a:"rojo",b:"cian",result:"magenta"},
      {a:"amarillo",b:"magenta",result:"naranja"},
      {a:"azul",b:"rojo",result:"morado"},
      {a:"blanco",b:"morado",result:"lila"}
    ],
    targets: ["naranja","verde","morado","rosa","gris","celeste","marrón","oliva","turquesa","lila"]
  };
  const conf = await loadJSON("assets/colors.json", fallback);
  Aventuras.rules = conf.mixRules;
  Aventuras.palette = conf.palette;
  Aventuras.targets = conf.targets || ["naranja","verde","morado","rosa","gris","celeste"];
}

function colorToCSS(name){
  // map básico (nombres CSS comunes + aproximaciones)
  const map = {
    rojo:"#ff3b30", azul:"#007aff", amarillo:"#ffd60a", blanco:"#ffffff", negro:"#111111",
    verde:"#34c759", marrón:"#8B5E3C", naranja:"#ff9500", morado:"#9b59b6", rosa:"#ff2d55",
    gris:"#9aa0a6", celeste:"#72c6ff", cian:"#00ffff", magenta:"#ff00ff", oliva:"#6b8e23",
    lima:"#7bed9f", turquesa:"#40E0D0", lila:"#c8a2c8"
  };
  return map[name] || name; // si el navegador reconoce el nombre, lo usará
}

function renderPalette(){
  const cont = $("#colorPalette");
  cont.innerHTML = "";
  const order = shuffle(Aventuras.palette);
  order.forEach(c => {
    const sw = document.createElement("button");
    sw.className = "swatch";
    sw.title = c;
    sw.style.background = colorToCSS(c);
    sw.addEventListener("click", ()=> toggleSelect(sw, c));
    cont.appendChild(sw);
  });
}

function toggleSelect(el, color){
  // máximo 2
  if(!el.classList.contains("selected") && Aventuras.selected.length >= 2){
    toast("Solo puedes elegir dos colores");
    return;
  }
  el.classList.toggle("selected");
  if(el.classList.contains("selected")) Aventuras.selected.push(color);
  else Aventuras.selected = Aventuras.selected.filter(x => x!==color);
}

function newTarget(){
  Aventuras.selected = [];
  $$(".swatch").forEach(s=> s.classList.remove("selected"));

  Aventuras.target = pickRandom(Aventuras.targets);
  $("#targetColor").style.background = colorToCSS(Aventuras.target);
  $("#targetName").textContent = Aventuras.target.toUpperCase();
  const res = $("#resultMessage");
  res.textContent = "";
  res.className = "result";
}

function check(){
  if(Aventuras.selected.length<2){ toast("Elige dos colores"); return; }
  const [a,b] = Aventuras.selected;
  const ok = Aventuras.rules.find(r=> r.a===a && r.b===b);
  const result = ok?.result || "—";
  const res = $("#resultMessage");

  if(result === Aventuras.target){
    res.textContent = "¡Excelente! 🌟 Combinación correcta.";
    res.className = "result ok";
    // marcador simple por ronda ganada
    const score = (lsGet("aventuras_score",0) || 0) + 1;
    lsSet("aventuras_score", score);
  }else{
    res.textContent = "❌ Esa combinación no forma el color objetivo.";
    res.className = "result bad";
  }
}

function bindGameEvents(){
  $("#btnComprobar")?.addEventListener("click", check);
  $("#btnNuevaRonda")?.addEventListener("click", newTarget);
}

App.aventuras = {
  async init(){
    await loadColorsConfig();
    showScreen("aventuras");
    renderPalette();
    bindGameEvents();
    newTarget();
  }
};
