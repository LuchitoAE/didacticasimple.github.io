// Utilidades generales y almacenamiento local

window.App = window.App || {};
App.state = {
  room: null,
  juegosCatalog: null,
  coloresConfig: null
};

function uid(len=6){
  return Math.random().toString(36).slice(2, 2+len).toUpperCase();
}

function clamp(n, min, max){ return Math.max(min, Math.min(max, n)); }

function lsGet(key, fallback=null){
  try{ const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch(e){ return fallback; }
}
function lsSet(key, value){
  try{ localStorage.setItem(key, JSON.stringify(value)); }catch(e){}
}

function saveRoom(room){
  lsSet("room_"+room.code, room);
  lsSet("last_room_code", room.code);
  App.state.room = room;
}
function loadRoom(code){
  const r = lsGet("room_"+code);
  if(r) App.state.room = r;
  return r;
}
function lastRoomCode(){ return lsGet("last_room_code"); }

async function loadJSON(url, fallback){
  try{
    const res = await fetch(url);
    if(!res.ok) throw new Error("bad status");
    return await res.json();
  }catch(e){
    return fallback;
  }
}

function shuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}
function pickRandom(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

App.utils = { uid, clamp, lsGet, lsSet, saveRoom, loadRoom, lastRoomCode, loadJSON, shuffle, pickRandom };
