// js/ui.js
window.App = window.App || {};
App.ui = App.ui || {};

App.ui.$ = (sel, ctx = document) => ctx.querySelector(sel);
App.ui.$$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

App.ui.showScreen = function(id) {
  this.$$(".screen").forEach(s => s.classList.remove("active"));
  this.$(`#${id}`)?.classList.add("active");
  const rm = this.$("#resultMessage");
  if (rm) { rm.className = "result"; rm.textContent = ""; }
};

App.ui.toast = function(msg, ms = 1800) {
  const t = this.$("#toast");
  t.textContent = msg;
  t.classList.remove("hidden");
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), ms);
  setTimeout(() => t.classList.add("hidden"), ms + 200);
};
