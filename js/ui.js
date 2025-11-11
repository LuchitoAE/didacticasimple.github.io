// Manejo visual básico: pantallas y toasts
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

function showScreen(id){
  $$(".screen").forEach(s => s.classList.remove("active"));
  $("#"+id)?.classList.add("active");
  // limpiar estados de mensaje
  const rm = $("#resultMessage");
  if(rm){ rm.className = "result"; rm.textContent = ""; }
}

function toast(msg, ms=1800){
  const t = $("#toast");
  t.textContent = msg;
  t.classList.remove("hidden");
  t.classList.add("show");
  setTimeout(()=> t.classList.remove("show"), ms);
  setTimeout(()=> t.classList.add("hidden"), ms+200);
}

App.ui = { showScreen, toast, $, $$ };
