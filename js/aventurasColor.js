// js/aventurasColor.js

window.App = window.App || {};

const { loadJSON, pick, shuffle } = App.utils;
const { showScreen, toast } = App.ui;

App.aventuras = {
  async init() {
    const fallback = {
      palette: ["rojo", "azul", "amarillo", "blanco", "negro", "verde"],
      mixRules: [
        { a: "rojo", b: "amarillo", result: "naranja" },
        { a: "amarillo", b: "azul", result: "verde" },
        { a: "rojo", b: "azul", result: "morado" }
      ],
      targets: ["naranja", "verde", "morado"]
    };

    const conf = await loadJSON("assets/colors.json", fallback);
    App.state = { colors: conf };

    showScreen("aventuras");
    this.renderPalette(conf.palette);
  },

  renderPalette(colors) {
    const cont = document.getElementById("colorPalette");
    cont.innerHTML = "";
    shuffle(colors).forEach(c => {
      const btn = document.createElement("button");
      btn.className = "swatch";
      btn.style.background = c;
      cont.appendChild(btn);
    });
  }
};
