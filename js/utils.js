// js/utils.js
window.App = window.App || {};
App.utils = {};

// 🔹 Función: generar código aleatorio
App.utils.uid = (len = 6) => Math.random().toString(36).slice(2, 2 + len).toUpperCase();

// 🔹 Limitar valores
App.utils.clamp = (n, min, max) => Math.max(min, Math.min(max, n));

// 🔹 Guardar / leer en localStorage
App.utils.lsGet = (key, fallback = null) => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
};

App.utils.lsSet = (key, val) => {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
};

// 🔹 Guardar una sala
App.utils.saveRoom = (room) => {
  App.utils.lsSet("room_" + room.code, room);
  App.utils.lsSet("last_room_code", room.code);
  App.state = { room };
};

// 🔹 Cargar una sala
App.utils.loadRoom = (code) => App.utils.lsGet("room_" + code);

// 🔹 Cargar JSON (con fallback)
App.utils.loadJSON = async (url, fallback) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return fallback;
  }
};

// 🔹 Ayudas
App.utils.shuffle = (a) => a.sort(() => Math.random() - 0.5);
App.utils.pick = (a) => a[Math.floor(Math.random() * a.length)];
