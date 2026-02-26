window.addEventListener('load', async () => {

  // (debug) plugin visibility logs removed for clean UI



  try {

    if (window.BLEBridge && typeof window.BLEBridge.bleInit === "function") {

      await window.BLEBridge.bleInit();

      setBridgeReady(false);

    }

  } catch (e) {

  }

});

    

// ===================== LOCAL OFFLINE EFFECTS =====================

const LOCAL_EFFECTS = [

  mkEffect("ch1", 0, "static",        "Static",        { br:true, sp:false, le:false, p1:true,  p2:false, p3:false, co:true  }, defRange({p1:[0,100,0]})),

  mkEffect("ch1", 1, "blink",         "Blink",         { br:true, sp:true,  le:false, p1:true,  p2:false, p3:true,  co:true  }, defRange({p1:[0,100,50], p3:[0,100,0]})),

  mkEffect("ch1", 2, "breathe",       "Breathe",       { br:true, sp:true,  le:false, p1:true,  p2:false, p3:true,  co:true  }, defRange({p1:[0,100,50], p3:[0,100,0]})),

  mkEffect("ch1", 3, "snake",         "Snake",         { br:true, sp:true,  le:true,  p1:true,  p2:false, p3:false, co:true  }, defRange({p1:[0,100,100]})),

  mkEffect("ch1", 4, "gradient_flow", "Gradient Flow", { br:true, sp:true,  le:false, p1:true,  p2:false, p3:false, co:true  }, defRange({p1:[0,100,100]})),

  mkEffect("ch1", 5, "twinkle",       "Twinkle",       { br:true, sp:true,  le:false, p1:true,  p2:false, p3:false, co:true  }, defRange({p1:[0,100,35]})),

  mkEffect("ch1", 6, "rainbow",       "Rainbow",       { br:true, sp:true,  le:false, p1:true,  p2:false, p3:false, co:false }, defRange({p1:[0,100,100]})),

  mkEffect("ch1", 7, "spotlight",     "Spotlight",     { br:true, sp:false, le:false, p1:true,  p2:false, p3:false, co:true  }, defRange({p1:[0,100,50]})),

];



function defRange(overrides = {}) {

  return {

    speed_min: 0, speed_max: 255, speed_def: 128,

    length_min: 1, length_max: 300, length_def: 125,

    p1_min: 0, p1_max: 100, p1_def: 50,

    p2_min: 0, p2_max: 100, p2_def: 0,

    p3_min: 0, p3_max: 100, p3_def: 0,

    ...applyPOverrides(overrides)

  };

}

function applyPOverrides(ov) {

  const out = {};

  if (ov.p1) { out.p1_min = ov.p1[0]; out.p1_max = ov.p1[1]; out.p1_def = ov.p1[2]; }

  if (ov.p2) { out.p2_min = ov.p2[0]; out.p2_max = ov.p2[1]; out.p2_def = ov.p2[2]; }

  if (ov.p3) { out.p3_min = ov.p3[0]; out.p3_max = ov.p3[1]; out.p3_def = ov.p3[2]; }

  return out;

}

function mkEffect(group, id, key, name, show, ranges) {

  return {

    group, id, key, name,

    show_brightness: !!show.br,

    show_speed:      !!show.sp,

    show_length:     !!show.le,

    show_param1:     !!show.p1,

    show_param2:     !!show.p2,

    show_param3:     !!show.p3,

    show_colors:     !!show.co,

    param1Label: (key === "snake" || key === "gradient_flow" || key === "rainbow") ? "Direction" : (key === "static" ? "Blend" : "P1"),

    param2Label: "P2",

    param3Label: (key === "blink" || key === "breathe") ? "Blend" : "P3",

    ...ranges

  };

}



// ===================== LANG (EN/TR ONLY) =====================

const LANGS = [{ code: "en", label: "EN" }, { code: "tr", label: "TR" }];

const I18N = {

  en: { current_setting:"Current setting", reset_defaults:"Reset to defaults", channel_1:"Channel 1", channel_2:"Channel 2", languages:"Languages",

        brightness:"Brightness", speed:"Speed", length:"Length", colours:"Colours", linked:"Linked", are_you_sure:"Are you sure?", reset_ok:"Reset OK" },

  tr: { current_setting:"Mevcut ayar", reset_defaults:"Varsayılana sıfırla", channel_1:"Kanal 1", channel_2:"Kanal 2", languages:"Diller",

        brightness:"Parlaklık", speed:"Hız", length:"Uzunluk", colours:"Renkler", linked:"Bağlı", are_you_sure:"Emin misin?", reset_ok:"Sıfırlandı ?" }

};

const EFFECT_I18N = {

  en: {

    static:{name:"Static",p1:"Blend",p2:"P2",p3:"P3"},

    blink:{name:"Blink",p1:"Duty",p2:"P2",p3:"Blend"},

    breathe:{name:"Breathe",p1:"Duty",p2:"P2",p3:"Blend"},

    snake:{name:"Snake",p1:"Direction",p2:"P2",p3:"P3"},

    gradient_flow:{name:"Gradient Flow",p1:"Direction",p2:"P2",p3:"P3"},

    twinkle:{name:"Twinkle",p1:"Density",p2:"P2",p3:"P3"},

    rainbow:{name:"Rainbow",p1:"Direction",p2:"P2",p3:"P3"},

    spotlight:{name:"Spotlight",p1:"No. Spots",p2:"Thickness",p3:"Softness"},

  },

  tr: {

    static:{name:"Sabit",p1:"Karışım",p2:"P2",p3:"P3"},

    blink:{name:"Flaş",p1:"Görev",p2:"P2",p3:"Karışım"},

    breathe:{name:"Nefes",p1:"Görev",p2:"P2",p3:"Karışım"},

    snake:{name:"Yılan",p1:"Yön",p2:"P2",p3:"P3"},

    gradient_flow:{name:"Gradyan Akış",p1:"Yön",p2:"P2",p3:"P3"},

    twinkle:{name:"Parıltı",p1:"Yoğunluk",p2:"P2",p3:"P3"},

    rainbow:{name:"Gökkuşağı",p1:"Yön",p2:"P2",p3:"P3"},

    spotlight:{name:"Spot",p1:"Spot Sayısı",p2:"Kalınlık",p3:"Yumuşaklık"},

  }

};



function getLang() { return localStorage.getItem("ui_lang") || "en"; }

function setLang(code) { localStorage.setItem("ui_lang", code); }

function t(key) {

  const lang = getLang();

  return (I18N[lang] && I18N[lang][key]) ? I18N[lang][key] : (I18N.en[key] || key);

}

function effectT(effectKey) {

  const lang = getLang();

  const table = (EFFECT_I18N[lang] || EFFECT_I18N.en);

  return table[effectKey] || (EFFECT_I18N.en[effectKey] || null);

}



function getChName(ch) { return localStorage.getItem(`${ch}_name`) || ""; }

function setChName(ch, v) { localStorage.setItem(`${ch}_name`, v || ""); }

function channelDisplayName(ch) {

  const custom = getChName(ch);

  if (custom && custom.trim().length) return custom.trim();

  if (ch === "ch1") return t("channel_1");

  if (ch === "ch2") return t("channel_2");

  return ch;

}



function applyTranslations() {

  document.querySelectorAll("[data-i18n]").forEach(el => {

    const k = el.getAttribute("data-i18n");

    el.textContent = t(k);

  });

  $("titleCh1").textContent = channelDisplayName("ch1");

  $("titleCh2").textContent = channelDisplayName("ch2");

  $("menuRenameHint").textContent = `${channelDisplayName("ch1")} / ${channelDisplayName("ch2")}`;

  $("menuLangHint").textContent = (getLang() || "en").toUpperCase();

  $("ch1PickTitle").textContent = channelDisplayName("ch1");

  $("effectsTitle").textContent = channelDisplayName("ch1");

}



// -------------------- APP STATE --------------------

const CHANNELS = ["ch1","ch2"];

let effects = [];

let effectMetaByIdGroup = {};

let currentChannel = "ch1";

let selectedEffectIdByCh = { ch1: null, ch2: null };

let lastUpdateApp1ByCh = { ch1: { effectString: null, effectId: null }, ch2: { effectString: null, effectId: null } };

let cycleLogTimer = null;

const globalDefaults = { isOn:false, brightness:180, temperatureWarm:0, temperatureCold:0, primary:"#ffffff", secondary:"#ffffff", tertiary:"#ffffff", linked:false };

let globalStateByCh = { ch1: { ...globalDefaults }, ch2: { ...globalDefaults } };

let effectStateByCh = { ch1: {}, ch2: {} };

let currentControlsEffectId = null;



// Palette: 7 columns x 4 rows (blue, red, green, yellow, purple, orange, pink)

const PALETTE_20 = [

  // Row 1 (top tones)

  "#0B1F5B", "#7A0C0C", "#0B4A2B", "#8A6A00", "#3C1361", "#A34100", "#FF013D",

  // Row 2

  "#1F4DB8", "#FF0000", "#1F9D55", "#F5C400", "#6D28D9", "#FF7A00", "#FF4F86",

  // Row 3

  "#7CC7FF", "#FF2A2A", "#6EE7B7", "#FFE066", "#A78BFA", "#FF9F1C", "#FF8FB1",

  // Row 4 (light tones)

  "#40E0D0", "#FF4015", "#C9F7D5", "#FFF4B0", "#E9D5FF", "#FFD29A", "#FFD1DC"

];



let activeSeg = 1; // 1,2,3

let pendingPaletteHex = null;

let paletteMode = "controls";

let remoteColors = [];

let remoteEditIndex = 0;

let remoteActiveSeg = 1;

let remoteCycle = 0;

let savedModes = [];

let modeCapture = { active: false, channel: null };

let modeModalState = { onConfirm: null, onCancel: null };

let selectedModeIndex = null;

let selectedSceneId = null; // scenes highlight only



// Scenes

const SCENES = [

  { id: 0, name: "Cream Lounge",    c1:"#FF4015", c2:"#FF4015", c3:"#FF4015" },

  { id: 1, name: "Sunset",          c1:"#FF4015", c2:"#3C1361", c3:"#3C1361" },

  { id: 2, name: "Tokyo",           c1:"#0B4A2B", c2:"#3C1361", c3:"#FF013D" },

  { id: 3, name: "Soho",            c1:"#0B4A2B", c2:"#FF4015", c3:"#3C1361" },

  { id: 4, name: "Cool Breeze",     c1:"#0B4A2B", c2:"#0B4A2B", c3:"#6D28D9" },

  { id: 5, name: "Purple Midnight", c1:"#FF2A2A", c2:"#FF013D", c3:"#3C1361" },

];



const REMOTE_COLOR_DEFAULTS = [

  { primary:"#ff0000", secondary:"#00ff00", tertiary:"#0000ff" },

  { primary:"#800080", secondary:"#ff69b4", tertiary:"#ff0000" },

  { primary:"#00ff00", secondary:"#0000ff", tertiary:"#800080" },

  { primary:"#0000ff", secondary:"#800080", tertiary:"#ff69b4" },

  { primary:"#ff69b4", secondary:"#ff0000", tertiary:"#00ff00" },

];



function $(id) { return document.getElementById(id); }



// (function () {

//   try {

//     var el = document.getElementById("bleStatusFloating");

//     if (el) el.textContent = "Index21 v2026-01-29a";

//   } catch (e) {}

// })();

function metaKey(group, id) { return `${group}:${id}`; }

function getMeta(group, id) { return effectMetaByIdGroup[metaKey(group, id)]; }

function effectsInGroup(groupName) { return effects.filter(e => e.group === groupName); }

function validEffectIdInGroup(group, id) { return id !== null && id !== undefined && !!getMeta(group, id); }

function setBridgeReady(isReady) {

  bridgeReady = !!isReady;

  bleServer = bridgeReady;

  bleRxChar = bridgeReady;

}



function setLastBleDeviceId(id) {

  try { localStorage.setItem("ble_last_device_id", id || ""); } catch (e) {}

}



function getLastBleDeviceId() {

  try { return localStorage.getItem("ble_last_device_id") || ""; } catch (e) { return ""; }

}

const TARGET_SERVICE_UUID = null;



function normalizeUuid(u) { return String(u || "").toLowerCase(); }



function deviceHasServiceUuid(dev, uuid) {

  if (!dev || !uuid) return false;

  var list = dev.serviceUuids || dev.serviceUUIDs || [];

  if (!Array.isArray(list) || !list.length) return false;

  var target = normalizeUuid(uuid);

  for (var i = 0; i < list.length; i++) {

    if (normalizeUuid(list[i]) === target) return true;

  }

  return false;

}



function filterDevicesByPrefix(devices, prefix) {

  if (!devices || !devices.length) return [];

  var out = [];

  for (var i = 0; i < devices.length; i++) {

    var d = devices[i];

    var name = d && d.name ? String(d.name) : "";

    var check = name;

    if (check.charAt(0) === "[") {

      var end = check.indexOf("]");

      if (end !== -1) check = check.slice(end + 1);

    }

    check = check.trim();

    if (prefix && check.indexOf(prefix) !== 0) continue;

    out.push(d);

  }

  return out;

}



function filterDevicesForBle(devices) {

  if (!devices || !devices.length) return [];

  return devices;

}

function normalizeEffectKey(value) {

  return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "");

}

function resolveEffectId(effectIdValue) {

  if (typeof effectIdValue === "number") return effectIdValue;

  if (typeof effectIdValue === "string") {

    const key = normalizeEffectKey(effectIdValue);

    if (!key) return null;

    const eff = effects.find(e => {

      return normalizeEffectKey(e.key) === key || normalizeEffectKey(e.name) === key;

    });

    return eff ? eff.id : null;

  }

  return null;

}

function resolveValidEffectId(group, value) {

  const id = resolveEffectId(value);

  if (id === null || id === undefined) return null;

  return validEffectIdInGroup(group, id) ? id : null;

}

function captureUpdateApp1Effect(chKey, src, data) {

  let effectString = null;

  if (src && typeof src.effect_string === "string") effectString = src.effect_string;

  else if (src && typeof src.effectString === "string") effectString = src.effectString;

  else if (data && typeof data.effect_string === "string") effectString = data.effect_string;

  else if (data && typeof data.effectString === "string") effectString = data.effectString;



  let effectId = null;

  if (src && typeof src.effectId !== "undefined") effectId = resolveValidEffectId(chKey, src.effectId);

  if (effectId === null && effectString) effectId = resolveValidEffectId(chKey, effectString);



  if (effectId !== null || effectString) {

    lastUpdateApp1ByCh[chKey] = { effectString, effectId };

  }

}

function pickEffectIdForSend(ch, effectIdOverride, preferLastUpdateEffect) {

  if (ch !== "ch1") return ((effectIdOverride !== null && effectIdOverride !== undefined) ? effectIdOverride : 0);



  if (preferLastUpdateEffect) {

    if (remoteCycle >= 1 && remoteCycle <= 4) return 4;

    if (remoteCycle !== 0) {

      const lastId = lastUpdateApp1ByCh.ch1 ? lastUpdateApp1ByCh.ch1.effectId : null;

      if (lastId !== null && lastId !== undefined) return lastId;

    }

  }



  const overrideId = resolveValidEffectId(ch, effectIdOverride);

  if (overrideId !== null && overrideId !== undefined) return overrideId;



  const selectedId = resolveValidEffectId(ch, selectedEffectIdByCh[ch]);

  return (selectedId !== null && selectedId !== undefined) ? selectedId : 0;

}



function ensureEffectState(ch, effectId) {

  if (effectId === null || effectId === undefined) return;

  if (!effectStateByCh[ch][effectId]) {

    const meta = getMeta(ch, effectId);

    effectStateByCh[ch][effectId] = {

      speed:  meta ? meta.speed_def  : 128,

      length: meta ? meta.length_def : 125,

      param1: meta ? (meta.p1_def / 100.0) : 0.50,

      param2: meta ? (meta.p2_def / 100.0) : 0.00,

      param3: meta ? (meta.p3_def / 100.0) : 0.00

    };

  }

}



function setVisible(id, on) { const el = $(id); if (el) el.style.display = on ? "block" : "none"; }

function setToggleVisual(el, on) { if (!el) return; el.classList.toggle("on", !!on); }



const BRIGHTNESS_LEVELS = 10;

const BRIGHTNESS_STEP = 255 / BRIGHTNESS_LEVELS;

function clampNum(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

function levelFromValue(value) {

  const raw = Math.round(value / BRIGHTNESS_STEP);

  return clampNum(raw, 0, BRIGHTNESS_LEVELS);

}

function valueFromLevel(level) {

  const lv = clampNum(level, 0, BRIGHTNESS_LEVELS);

  return clampNum(Math.round(lv * BRIGHTNESS_STEP), 0, 255);

}

function setCircleFill(circleId, fillId, levelTextId, value) {

  const lv = levelFromValue(value);

  const fill = $(fillId);

  if (fill) fill.style.height = `${lv * 10}%`;

  const circle = $(circleId);

  if (circle) {

    circle.classList.add("pulse");

    setTimeout(() => circle.classList.remove("pulse"), 1000);

  }

}

function setBrightnessUiFor(wrapId, circleId, fillId, value, pulse) {

  const wrap = $(wrapId);

  if (!wrap) return;

  wrap.dataset.value = String(clampNum(value, 0, 255));

  if (pulse) setCircleFill(circleId, fillId, "", value);

  else {

    const fill = $(fillId);

    if (fill) fill.style.height = `${levelFromValue(value) * 10}%`;

  }

}

function setBrightnessUi(value, pulse) {

  setBrightnessUiFor("brightnessLevel", "brightnessCircle", "brightnessFill", value, pulse);

  setBrightnessUiFor("brightnessPickLevel", "brightnessPickCircle", "brightnessPickFill", value, pulse);

}

function isBlendLabelText(labelText) {

  return String(labelText || "").trim().toLowerCase() === "blend";

}

function syncBlendToggle(paramId, wrapId, toggleId, labelText) {

  const input = $(paramId);

  const wrap = $(wrapId);

  const toggle = $(toggleId);

  if (!input || !wrap || !toggle) return;

  const show = isBlendLabelText(labelText);

  wrap.style.display = show ? "flex" : "none";

  input.style.display = show ? "none" : "block";

  if (show && paramId === "param1") {

    $("param1Special").classList.remove("show");

    $("p1DirWrap").style.display = "none";

  }

  if (!show) return;

  const min = parseInt(input.min || "0", 10);

  const val = parseInt(input.value || "0", 10);

  setToggleVisual(toggle, val > min);

}

function toggleBlendParam(paramId, toggleId) {

  const input = $(paramId);

  const toggle = $(toggleId);

  if (!input || !toggle) return;

  const min = parseInt(input.min || "0", 10);

  const max = parseInt(input.max || "100", 10);

  const on = !toggle.classList.contains("on");

  setToggleVisual(toggle, on);

  input.value = on ? String(max) : String(min);

  input.dispatchEvent(new Event("change"));

}



function applyBlendMode(meta) {

  if (!meta) return;

  const isDirection = (meta.key === "snake" || meta.key === "gradient_flow" || meta.key === "rainbow");

  if (isDirection) {

    const wrap1 = $("blendWrapParam1");

    const wrap3 = $("blendWrapParam3");

    if (wrap1) wrap1.style.display = "none";

    if (wrap3) wrap3.style.display = "none";

    return;

  }

  const blendGroup = $("blendLinkedGroup");

  const blendToggle = $("blendToggleLinked");

  const isStatic = meta.key === "static";

  const isBlink = meta.key === "blink";

  const isBreathe = meta.key === "breathe";

  if (blendGroup) blendGroup.style.display = "none";



  if (isStatic || isBlink || isBreathe) {

    const paramId = isStatic ? "param1" : "param3";

    if (blendGroup) blendGroup.style.display = "inline-flex";

    if (blendToggle) blendToggle.dataset.param = paramId;

    setVisible(paramId === "param1" ? "controlParam1" : "controlParam3", false);

    const input = $(paramId);

    if (input && blendToggle) {

      const min = parseInt(input.min || "0", 10);

      const val = parseInt(input.value || "0", 10);

      setToggleVisual(blendToggle, val > min);

    }

    const wrap1 = $("blendWrapParam1");

    const wrap3 = $("blendWrapParam3");

    if (wrap1) wrap1.style.display = "none";

    if (wrap3) wrap3.style.display = "none";

    return;

  }



  syncBlendToggle("param1", "blendWrapParam1", "blendToggleParam1", $("labelParam1").textContent);

  syncBlendToggle("param3", "blendWrapParam3", "blendToggleParam3", $("labelParam3").textContent);

}



function applySpotlightMode(meta) {

  const stepper = $("spotlightStepper");

  const input = $("param1");

  if (!stepper || !input || !meta) return;

  const isSpot = meta.key === "spotlight";

  stepper.style.display = isSpot ? "flex" : "none";

  if (isSpot) {

    input.style.display = "none";

    updateSpotlightValue();

  } else {

    input.style.display = "block";

  }

}



function updateSpotlightValue() {

  const input = $("param1");

  const out = $("spotlightValue");

  if (!input || !out) return;

  const min = parseInt(input.min || "0", 10);

  const max = parseInt(input.max || "100", 10);

  const step = Math.max(1, Math.round((max - min) / 10));

  const val = clampNum(parseInt(input.value || "0", 10), min, max);

  const spots = Math.round((val - min) / step) + 1;

  out.textContent = String(spots);

}



function stepSpotlight(delta) {

  const input = $("param1");

  if (!input) return;

  const min = parseInt(input.min || "0", 10);

  const max = parseInt(input.max || "100", 10);

  const step = Math.max(1, Math.round((max - min) / 10));

  const val = clampNum(parseInt(input.value || "0", 10) + delta * step, min, max);

  input.value = String(val);

  updateSpotlightValue();

  input.dispatchEvent(new Event("change"));

}

function setWarmUi(value, pulse) {

  const wrap = $("warmLevel");

  if (wrap) wrap.dataset.value = String(clampNum(value, 0, 255));

  if (pulse) setCircleFill("warmCircle", "warmFill", "warmLevelText", value);

  else {

    const fill = $("warmFill");

    if (fill) fill.style.height = `${levelFromValue(value) * 10}%`;

  }

}

function setColdUi(value, pulse) {

  const wrap = $("coldLevel");

  if (wrap) wrap.dataset.value = String(clampNum(value, 0, 255));

  if (pulse) setCircleFill("coldCircle", "coldFill", "coldLevelText", value);

  else {

    const fill = $("coldFill");

    if (fill) fill.style.height = `${levelFromValue(value) * 10}%`;

  }

}

function getUiValueOrState(id, fallback) {

  const wrap = $(id);

  if (!wrap) return fallback;

  const v = parseInt(wrap.dataset.value || "", 10);

  return isNaN(v) ? fallback : v;

}

function setBrightnessValue(value, send, pulse) {

  const v = clampNum(value, 0, 255);

  globalStateByCh.ch1.brightness = v;

  setBrightnessUi(v, !!pulse);

  if (send) sendChannelState("ch1", selectedEffectIdByCh.ch1, true);

}

function sceneByName(name) {

  const key = String(name || "").trim().toLowerCase();

  return SCENES.find(s => String(s.name || "").trim().toLowerCase() === key) || null;

}

function sendPickBrightnessForCycle() {

  if (remoteCycle === 0) {

    if (selectedSceneId !== null && selectedSceneId !== undefined) {

      sendChannelState("ch1", 4, false);

    } else {

      sendChannelState("ch1", selectedEffectIdByCh.ch1, false);

    }

    return;

  }

  let sc = null;

  if (remoteCycle === 1) sc = sceneByName("Cream Lounge");

  else if (remoteCycle === 2) sc = sceneByName("Purple Midnight");

  else if (remoteCycle === 3) sc = sceneByName("Cool Breeze");

  else if (remoteCycle === 4) sc = sceneByName("Soho");



  if (!sc) {

    sendChannelState("ch1", selectedEffectIdByCh.ch1, false);

    return;

  }



  globalStateByCh.ch1.linked = false;

  globalStateByCh.ch1.primary = sc.c1;

  globalStateByCh.ch1.secondary = sc.c2;

  globalStateByCh.ch1.tertiary = sc.c3;

  updateSwatchesUi();

  saveOfflineState();

  readGlobalFromUi("ch1");

  const eff = selectedEffectIdByCh.ch1;

  if (eff !== null && eff !== undefined) readPerEffectFromUi("ch1", eff);

  const payload = buildFullPacket("ch1", "ch1", ((eff !== null && eff !== undefined) ? eff : 0));

  payload.effectId = 99;

  bleWriteJson(payload).catch(() => { handleBleWriteError(); });

}

function setBrightnessPickValue(value, send, pulse) {

  const v = clampNum(value, 0, 255);

  globalStateByCh.ch1.brightness = v;

  setBrightnessUi(v, !!pulse);

  if (send) sendPickBrightnessForCycle();

}

function setWarmValue(value, send, pulse) {

  const v = clampNum(value, 0, 255);

  globalStateByCh.ch2.temperatureWarm = v;

  const input = $("warmWhiteCh2");

  if (input) input.value = String(v);

  const warmVal = $("warmWhiteCh2Value");

  if (warmVal) warmVal.textContent = String(v);

  setWarmUi(v, !!pulse);

  if (send) sendChannelState("ch2", 0);

}

function setColdValue(value, send, pulse) {

  const v = clampNum(value, 0, 255);

  globalStateByCh.ch2.temperatureCold = v;

  const input = $("coldWhiteCh2");

  if (input) input.value = String(v);

  const coldVal = $("coldWhiteCh2Value");

  if (coldVal) coldVal.textContent = String(v);

  setColdUi(v, !!pulse);

  if (send) sendChannelState("ch2", 0);

}



function updateSegButtonsUi() {

  const gs = globalStateByCh.ch1;

  $("segBtn1").classList.toggle("active", activeSeg === 1);

  $("segBtn2").classList.toggle("active", activeSeg === 2);

  $("segBtn3").classList.toggle("active", activeSeg === 3);



  const linked = !!gs.linked;

  $("segBtn2").disabled = linked;

  $("segBtn3").disabled = linked;



  const hint = $("activeSegHint");

  if (hint) hint.textContent = "";

}



function updateSwatchesUi() {

  const gs = globalStateByCh.ch1;

  $("swatch1").style.background = gs.primary;

  $("swatch2").style.background = gs.secondary;

  $("swatch3").style.background = gs.tertiary;

}



function hideAllSpecial() {

  $("param1Special").classList.remove("show");

  $("p1DirWrap").style.display = "none";

  $("param1").style.display = "block";

}



function setRangeToMinOrMax(rangeEl, useMax) {

  const lo = parseInt(rangeEl.min, 10);

  const hi = parseInt(rangeEl.max, 10);

  rangeEl.value = useMax ? hi : lo;

}



function syncSpecialFromRanges(meta) {

  if (!meta) return;

  const p1 = $("param1");

  const p1Min = parseInt(p1.min,10), p1Max = parseInt(p1.max,10), p1Val = parseInt(p1.value,10);

  const p1On = (p1Val >= Math.round((p1Min + p1Max)/2));

  const isDirectionP1 = (meta.key === "snake" || meta.key === "gradient_flow" || meta.key === "rainbow");

  if (isDirectionP1) $("p1DirLabel").textContent = p1On ? "Left" : "Right";

}



function setupSpecialParamControls(meta) {

  hideAllSpecial();

  if (!meta) return;

  const isDirectionP1 = (meta.key === "snake" || meta.key === "gradient_flow" || meta.key === "rainbow");

  if (isDirectionP1) {

    $("param1Special").classList.add("show");

    $("param1").style.display = "block";

    $("p1DirWrap").style.display = "inline-flex";

    setRangeToMinOrMax($("param1"), true);

    syncSpecialFromRanges(meta);

    return;

  }

  syncSpecialFromRanges(meta);

}



function applyEffectMetaToControls(meta) {

  if (!meta) return;



  setVisible("controlBrightness", !!meta.show_brightness);

  setVisible("controlSpeed",      !!meta.show_speed);

  setVisible("controlLength",     !!meta.show_length);

  setVisible("controlParam1",     !!meta.show_param1);

  setVisible("controlParam2",     !!meta.show_param2);

  setVisible("controlParam3",     !!meta.show_param3);

  setVisible("controlColors",     !!meta.show_colors);



  const hideLinked = (meta.key === "gradient_flow");

  setVisible("linkedRow", !hideLinked);



  const eff = effectT(meta.key);

  $("labelParam1").textContent = (eff && eff.p1) ? eff.p1 : (meta.param1Label || "P1");

  $("labelParam2").textContent = (eff && eff.p2) ? eff.p2 : (meta.param2Label || "P2");

  $("labelParam3").textContent = (eff && eff.p3) ? eff.p3 : (meta.param3Label || "P3");



  $("speed").min   = meta.speed_min; $("speed").max   = meta.speed_max;

  $("length").min  = meta.length_min; $("length").max  = meta.length_max;

  $("param1").min  = meta.p1_min; $("param1").max  = meta.p1_max;

  $("param2").min  = meta.p2_min; $("param2").max  = meta.p2_max;

  $("param3").min  = meta.p3_min; $("param3").max  = meta.p3_max;



  setupSpecialParamControls(meta);

  applyBlendMode(meta);

  applySpotlightMode(meta);

}



function updateHomeToggleVisuals() {

  setToggleVisual($("toggleCh1"), !!globalStateByCh.ch1.isOn);

  setToggleVisual($("toggleCh2"), !!globalStateByCh.ch2.isOn);

  setToggleVisual($("toggleCh2Header"), !!globalStateByCh.ch2.isOn);

  setToggleVisual($("toggleCh1Header"), !!globalStateByCh.ch1.isOn);

  const power = (currentChannel === "ch2") ? globalStateByCh.ch2.isOn : globalStateByCh.ch1.isOn;

  setToggleVisual($("toggleControlsPower"), !!power);

  const masterOn = !!globalStateByCh.ch1.isOn && !!globalStateByCh.ch2.isOn;

  setToggleVisual($("toggleMaster"), masterOn);

}



function applyGlobalToUi(ch) {

  const gs = globalStateByCh[ch];

  if (ch === "ch2") {

    $("warmWhiteCh2").value = gs.temperatureWarm;

    $("coldWhiteCh2").value = gs.temperatureCold;

    const warmVal = $("warmWhiteCh2Value");

    if (warmVal) warmVal.textContent = gs.temperatureWarm;

    const coldVal = $("coldWhiteCh2Value");

    if (coldVal) coldVal.textContent = gs.temperatureCold;

    setWarmUi(gs.temperatureWarm, false);

    setColdUi(gs.temperatureCold, false);

    return;

  }

  setBrightnessUi(gs.brightness, false);

  updateSegButtonsUi();

  updateSwatchesUi();

  applyLinkedUiState("ch1");

  updateHomeToggleVisuals();

}



function applyEffectToUi(ch, effectId) {

  if (!validEffectIdInGroup(ch, effectId)) return;

  ensureEffectState(ch, effectId);

  const st = effectStateByCh[ch][effectId];

  $("speed").value  = st.speed;

  $("length").value = st.length;

  $("param1").value = Math.round(st.param1 * 100);

  $("param2").value = Math.round(st.param2 * 100);

  $("param3").value = Math.round(st.param3 * 100);

  const meta = getMeta(ch, effectId);

  if (meta) syncSpecialFromRanges(meta);

  if (meta) {

    applyBlendMode(meta);

    applySpotlightMode(meta);

  }

}



function readPerEffectFromUi(ch, effectId) {

  if (!validEffectIdInGroup(ch, effectId)) return;

  ensureEffectState(ch, effectId);

  effectStateByCh[ch][effectId].speed  = parseInt($("speed").value, 10);

  effectStateByCh[ch][effectId].length = parseInt($("length").value, 10);

  effectStateByCh[ch][effectId].param1 = parseInt($("param1").value, 10)/100.0;

  effectStateByCh[ch][effectId].param2 = parseInt($("param2").value, 10)/100.0;

  effectStateByCh[ch][effectId].param3 = parseInt($("param3").value, 10)/100.0;

}



function readGlobalFromUi(ch) {

  const gs = globalStateByCh[ch];

  if (ch === "ch2") {

    gs.temperatureWarm = getUiValueOrState("warmLevel", gs.temperatureWarm);

    gs.temperatureCold = getUiValueOrState("coldLevel", gs.temperatureCold);

    const warmVal = $("warmWhiteCh2Value");

    if (warmVal) warmVal.textContent = gs.temperatureWarm;

    const coldVal = $("coldWhiteCh2Value");

    if (coldVal) coldVal.textContent = gs.temperatureCold;

    return;

  }

  gs.brightness = getUiValueOrState("brightnessLevel", gs.brightness);

  if (gs.linked) { gs.secondary = gs.primary; gs.tertiary  = gs.primary; }

}



function saveOfflineState() {

  try {

    localStorage.setItem("offline_state", JSON.stringify({

      globalStateByCh,

      effectStateByCh,

      selectedEffectIdByCh,

      activeSeg,

      selectedSceneId

    }));

  } catch(e) {}

}



function loadOfflineState() {

  try {

    const saved = JSON.parse(localStorage.getItem("offline_state") || "null");

    if (saved && typeof saved === "object") {

      if (saved.globalStateByCh) globalStateByCh = saved.globalStateByCh;

      if (saved.effectStateByCh) effectStateByCh = saved.effectStateByCh;

      if (saved.selectedEffectIdByCh) selectedEffectIdByCh = saved.selectedEffectIdByCh;

      if (typeof saved.activeSeg === "number") activeSeg = saved.activeSeg;

      if (typeof saved.selectedSceneId === "number") selectedSceneId = saved.selectedSceneId;

      CHANNELS.forEach(ch => {

        if (!globalStateByCh[ch]) globalStateByCh[ch] = { ...globalDefaults };

        if (!effectStateByCh[ch]) effectStateByCh[ch] = {};

        if (!(ch in selectedEffectIdByCh)) selectedEffectIdByCh[ch] = null;

      });

    }

  } catch(e) {}

}



function loadModes() {

  try {

    const saved = JSON.parse(localStorage.getItem("saved_modes") || "[]");

    if (Array.isArray(saved)) savedModes = saved;

    const idx = parseInt(localStorage.getItem("selected_mode_index") || "", 10);

    selectedModeIndex = (Number.isInteger(idx) && idx >= 0 && idx < savedModes.length) ? idx : null;

  } catch (e) { savedModes = []; }

}

function saveModes() {

  try { localStorage.setItem("saved_modes", JSON.stringify(savedModes)); } catch (e) {}

}

function renderModes() {

  const container = $("modesList");

  if (!container) return;

  container.innerHTML = "";



  const wrap = document.createElement("div");

  wrap.className = "mode-list";



  savedModes.forEach((m, idx) => {

    const row = document.createElement("div");

    row.className = "effect-card mode-card";



    const body = document.createElement("div");

    body.className = "body";



    const name = document.createElement("div");

    name.className = "effect-name";

    name.textContent = m.name || `Mode ${idx + 1}`;



    const actions = document.createElement("div");

    actions.className = "mode-actions";



    const del = document.createElement("button");

    del.className = "btn mode-delete";

    del.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6h8l-.6 13H8.6L8 6zm2-2h4l1 2H9l1-2zm-4 2h12v2H6V6z"/></svg>';

    del.onclick = (ev) => {

      ev.stopPropagation();

      openModeConfirmModal("Delete this mode?", () => {

        savedModes.splice(idx, 1);

        if (selectedModeIndex === idx) selectedModeIndex = null;

        else if (selectedModeIndex !== null && selectedModeIndex > idx) selectedModeIndex -= 1;

        try { localStorage.setItem("selected_mode_index", selectedModeIndex === null ? "" : String(selectedModeIndex)); } catch (e) {}

        saveModes();

        renderModes();

      });

    };



    actions.appendChild(del);

    body.appendChild(name);

    body.appendChild(actions);

    row.appendChild(body);



    row.onclick = async () => {

      if (!bleRxChar || !bleServer) return;

      if (m && m.payload) {

        const ch = m.channel || "ch1";

        const payload = { ...m.payload, on: true };

        const wasOn = !!globalStateByCh[ch].isOn;

        if (!wasOn) {

          try { await sendPowerAsFullPacket(ch, true); } catch (e) {}

        }

        bleWriteJson(payload).catch(() => { handleBleWriteError(); });

        globalStateByCh[ch].isOn = true;

        if (ch === "ch1") {

          const incomingId = resolveEffectId(payload.effectId);

          if (incomingId !== null && validEffectIdInGroup("ch1", incomingId)) {

            selectedSceneId = null;

            selectedEffectIdByCh.ch1 = incomingId;

            applyEffectToUi("ch1", incomingId);

          }

        }

        applyGlobalToUi(ch);

        updateHomeToggleVisuals();

      }

      document.querySelectorAll(".mode-card").forEach(el => el.classList.remove("selected"));

      row.classList.add("selected");

      selectedModeIndex = idx;

      try { localStorage.setItem("selected_mode_index", String(idx)); } catch (e) {}

    };



    if (selectedModeIndex === idx) row.classList.add("selected");

    wrap.appendChild(row);

  });



  container.appendChild(wrap);

  const btn = $("btnModeAdd");

  if (btn) btn.style.display = savedModes.length >= 5 ? "none" : "grid";

}



function buildModePayload(ch) {

  readGlobalFromUi(ch);

  if (ch === "ch1") {

    const eff = selectedEffectIdByCh[ch];

    if (eff !== null && eff !== undefined) readPerEffectFromUi(ch, eff);

  }

  const effectId = (ch === "ch1") ? ((selectedEffectIdByCh[ch] !== null && selectedEffectIdByCh[ch] !== undefined) ? selectedEffectIdByCh[ch] : 0) : 0;

  return buildFullPacket(ch, ch, effectId);

}



function openModeNameModal(onConfirm) {

  const overlay = $("modeModalOverlay");

  const input = $("modeModalInput");

  const title = $("modeModalTitle");

  if (!overlay || !input || !title) return;

  title.textContent = "Mode name";

  input.style.display = "block";

  input.value = "";

  overlay.classList.add("show");

  modeModalState.onConfirm = onConfirm;

  modeModalState.onCancel = null;

  setTimeout(() => input.focus(), 0);

}

function openModeConfirmModal(message, onConfirm) {

  const overlay = $("modeModalOverlay");

  const input = $("modeModalInput");

  const title = $("modeModalTitle");

  if (!overlay || !input || !title) return;

  title.textContent = message;

  input.style.display = "none";

  overlay.classList.add("show");

  modeModalState.onConfirm = onConfirm;

  modeModalState.onCancel = null;

}

function closeModeModal() {

  const overlay = $("modeModalOverlay");

  if (overlay) overlay.classList.remove("show");

  modeModalState.onConfirm = null;

  modeModalState.onCancel = null;

}



// -------------------- Linked behaviour --------------------

function applyLinkedUiState(ch) {

  const gs = globalStateByCh[ch];

  const linked = !!gs.linked;

  setToggleVisual($("toggleLinked"), linked);



  if (ch !== "ch1") return;



  if (linked) {

    gs.secondary = gs.primary;

    gs.tertiary  = gs.primary;

    activeSeg = 1;

  }

  updateSegButtonsUi();

  updateSwatchesUi();

}



// ===================== PALETTE POPUP =====================

function openPalette() {

  paletteMode = "controls";

  const gs = globalStateByCh.ch1;

  pendingPaletteHex = (activeSeg === 1) ? gs.primary : (activeSeg === 2 ? gs.secondary : gs.tertiary);

  $("paletteSegRemote").style.display = "none";

  $("paletteOverlay").classList.add("show");

  $("paletteModal").classList.add("show");

  renderPaletteModal();

}

function closePalette() {

  $("paletteOverlay").classList.remove("show");

  $("paletteModal").classList.remove("show");

  pendingPaletteHex = null;

  $("paletteSegRemote").style.display = "none";

  paletteMode = "controls";

}

function renderPaletteModal() {

  const grid = $("paletteGrid");

  grid.innerHTML = "";



  let selectedHex = "";

  if (paletteMode === "remote") {

    if (!Array.isArray(remoteColors) || remoteColors.length !== 5) loadRemoteColors();

    const fallback = REMOTE_COLOR_DEFAULTS[remoteEditIndex] || { primary:"#ffffff", secondary:"#ffffff", tertiary:"#ffffff" };

    const rc = remoteColors[remoteEditIndex] || fallback;

    selectedHex = pendingPaletteHex || ((remoteActiveSeg === 1) ? rc.primary : (remoteActiveSeg === 2 ? rc.secondary : rc.tertiary));

  } else {

    const gs = globalStateByCh.ch1;

    selectedHex = pendingPaletteHex || ((activeSeg === 1) ? gs.primary : (activeSeg === 2 ? gs.secondary : gs.tertiary));

  }



    PALETTE_20.forEach(hex => {

      const d = document.createElement("div");

      d.className = "palDot" + ((hex.toLowerCase() === (selectedHex || "").toLowerCase()) ? " selected" : "");

      d.style.background = hex; // solid, no gradient

      d.onclick = () => {

        pendingPaletteHex = hex;

        applyPaletteColor(hex);

        renderPaletteModal();

      };

      grid.appendChild(d);

    });



  if (paletteMode === "remote") {

    const segLabel = (remoteActiveSeg === 1) ? "Primary" : (remoteActiveSeg === 2 ? "Secondary" : "Tertiary");

    $("paletteTitle").textContent = `Pick a colour (Colour ${remoteEditIndex + 1} - ${segLabel})`;

  } else {

    const gs = globalStateByCh.ch1;

    $("paletteTitle").textContent = gs.linked ? "Pick a colour (Linked)" : `Pick a colour (Seg ${activeSeg})`;

  }

}



function applyPaletteColor(hex) {

  if (paletteMode === "remote") {

    const rc = remoteColors[remoteEditIndex];

    if (remoteActiveSeg === 1) rc.primary = hex;

    if (remoteActiveSeg === 2) rc.secondary = hex;

    if (remoteActiveSeg === 3) rc.tertiary = hex;

    renderRemoteColors();

    saveRemoteColors();

    sendRemoteColorUpdate(remoteEditIndex);

    return;

  }



  const gs = globalStateByCh.ch1;

  if (gs.linked) {

    gs.primary = hex; gs.secondary = hex; gs.tertiary = hex;

  } else {

    if (activeSeg === 1) gs.primary = hex;

    if (activeSeg === 2) gs.secondary = hex;

    if (activeSeg === 3) gs.tertiary = hex;

  }



  updateSwatchesUi();

  saveOfflineState();



  // Send current effect update (normal behaviour)

  sendChannelState("ch1", selectedEffectIdByCh.ch1, true);

}



function loadRemoteColors() {

  try {

    const saved = JSON.parse(localStorage.getItem("remote_colors") || "null");

    if (Array.isArray(saved) && saved.length === 5) {

      remoteColors = saved.map((item, i) => {

        const fallback = REMOTE_COLOR_DEFAULTS[i] || REMOTE_COLOR_DEFAULTS[0];

        return {

          primary: (item && item.primary) || fallback.primary,

          secondary: (item && item.secondary) || fallback.secondary,

          tertiary: (item && item.tertiary) || fallback.tertiary

        };

      });

      return;

    }

  } catch (e) {}

  remoteColors = REMOTE_COLOR_DEFAULTS.map(c => ({ ...c }));

}



function saveRemoteColors() {

  try { localStorage.setItem("remote_colors", JSON.stringify(remoteColors)); } catch (e) {}

}



function renderRemoteColors() {

  document.querySelectorAll(".remote-color-card").forEach(card => {

    const idx = parseInt(card.getAttribute("data-remote-slot") || "0", 10);

    const rc = remoteColors[idx];

    if (!rc) return;

    const swatches = card.querySelectorAll(".remote-swatch");

    if (swatches[0]) swatches[0].style.background = rc.primary;

    if (swatches[1]) swatches[1].style.background = rc.secondary;

    if (swatches[2]) swatches[2].style.background = rc.tertiary;

  });

}



function updateRemoteSegButtons() {

  $("remoteSeg1").classList.toggle("active", remoteActiveSeg === 1);

  $("remoteSeg2").classList.toggle("active", remoteActiveSeg === 2);

  $("remoteSeg3").classList.toggle("active", remoteActiveSeg === 3);

}



function openRemotePalette(slotIndex) {

  if (!Array.isArray(remoteColors) || remoteColors.length !== 5) loadRemoteColors();

  paletteMode = "remote";

  remoteEditIndex = slotIndex;

  remoteActiveSeg = 1;

  const rc = remoteColors[remoteEditIndex];

  pendingPaletteHex = rc ? rc.primary : null;

  updateRemoteSegButtons();

  $("paletteSegRemote").style.display = "flex";

  $("paletteOverlay").classList.add("show");

  $("paletteModal").classList.add("show");

  renderPaletteModal();

}



function setRemotePaletteSeg(seg) {

  remoteActiveSeg = seg;

  updateRemoteSegButtons();

  const rc = remoteColors[remoteEditIndex];

  pendingPaletteHex = (remoteActiveSeg === 1) ? rc.primary : (remoteActiveSeg === 2 ? rc.secondary : rc.tertiary);

  renderPaletteModal();

}



async function sendRemoteColorUpdate(slotIndex) {

  if (!bleRxChar || !bleServer) return;

  const rc = remoteColors[slotIndex];

  if (!rc) return;

  try {

    await bleWriteJson({

      mode: "remote_color",

      slot: slotIndex + 1,

      colorPrimary: rc.primary,

      colorSecondary: rc.secondary,

      colorTertiary: rc.tertiary

    });

  } catch (e) {

    handleBleWriteError();

  }

}



// =========================================================================

// BLE COMMAND SENDING

// =========================================================================

const TARGET_BLE_NAME = "ARSLAN_LED";



// Must match ESP32

const SERVICE_UUID = "12345678-1234-1234-1234-1234567890ab";

const RX_UUID      = "12345678-1234-1234-1234-1234567890ac"; // browser -> esp32 (write)

const TX_UUID      = "12345678-1234-1234-1234-1234567890ad"; // esp32 -> browser (notify) optional



let bleDevice = null;

let bleServer = null;

let bleService = null;

let bleRxChar = null;

let bleTxChar = null;

let bridgeDeviceId = null;

let bridgeReady = false;

let bridgeReconnectTimer = null;

let bridgeReconnectAttempts = 0;

const BRIDGE_RECONNECT_MAX = 5;

const BRIDGE_RECONNECT_BASE_MS = 1500;

const BLE_CONSOLE_MAX_LINES = 800;

let bleConsoleLines = [];



function logBleConsole(line) {

  const el = $("bleConsole");

  if (!el) return;

  const text = String(line || "").trim();

  if (!text) return;

  bleConsoleLines.push(text);

  if (bleConsoleLines.length > BLE_CONSOLE_MAX_LINES) {

    bleConsoleLines.splice(0, bleConsoleLines.length - BLE_CONSOLE_MAX_LINES);

  }

  el.textContent = bleConsoleLines.join("\n");

  el.scrollTop = el.scrollHeight;

}



function updateBrightnessFromLine(line) {

  const text = String(line || "");

  if (!text) return;

  const m = text.match(/"ch1"\s*:\s*\{[^}]*"brightness"\s*:\s*("?)(\d+)\1/i);

  if (!m) return;

  const b = parseInt(m[2], 10);

  if (isNaN(b)) return;

  globalStateByCh.ch1.brightness = b;

  setBrightnessUi(b, false);

}



function clearBleConsole() {

  bleConsoleLines = [];

  const el = $("bleConsole");

  if (el) el.textContent = "";

}



function bleSupported() { return !!((window.BLEBridge && typeof window.BLEBridge.bleInit === "function") || (navigator.bluetooth && navigator.bluetooth.requestDevice)); }



let bleNotifyBuffer = "";

async function requestRemoteStatus() {

  if (!bleRxChar) return;

  try { await bleWriteJson({ mode: "remote_status_request" }); } catch (e) {}

  if (!bleTxChar) return;

  try {

    const v = await bleTxChar.readValue();

    const msg = new TextDecoder().decode(v);

    if (msg) handleBleNotify(msg.trim());

  } catch (e) {}

}



function handleBleNotify(msg) {

  const raw = String(msg || "");

  updateBrightnessFromLine(raw);

  const m = raw.match(/"cycle"\s*:\s*(-?\d+)/);

  if (m) {

    const cycleNum = parseInt(m[1], 10);

    if (!isNaN(cycleNum)) {

      setRemoteCycle(cycleNum);

    }

  }

  applyStateToggleFromRaw(msg);

  bleNotifyBuffer += String(msg || "");

  const frames = extractJsonFrames(bleNotifyBuffer);

  bleNotifyBuffer = frames.remainder;

  frames.items.forEach(item => {

    let data = null;

    try { data = JSON.parse(item); } catch (e) {}

    const isUpdateApp1 = !!(data && data.type === "state");

    if (isUpdateApp1) {

      window.__lastBleFrame = item;

      logBleConsole(`-- frame len=${item.length} --`);

      const chunkSize = 200;

      for (let i = 0; i < item.length; i += chunkSize) {

        logBleConsole(item.slice(i, i + chunkSize));

      }

      logBleConsole("-- frame end --");

    }

    if (data && typeof data.cycle !== "undefined") {

      setRemoteCycle(data.cycle);

    }

    handleBleNotifyJson(item);

  });

}



function extractJsonFrames(input) {

  const items = [];

  let depth = 0;

  let inString = false;

  let escape = false;

  let start = -1;



  for (let i = 0; i < input.length; i++) {

    const ch = input[i];



    if (escape) {

      escape = false;

      continue;

    }



    if (ch === "\\") {

      if (inString) escape = true;

      continue;

    }



    if (ch === "\"") {

      inString = !inString;

      continue;

    }



    if (inString) continue;



    if (ch === "{") {

      if (depth === 0) start = i;

      depth++;

      continue;

    }



    if (ch === "}") {

      depth--;

      if (depth === 0 && start >= 0) {

        items.push(input.slice(start, i + 1));

        start = -1;

      }

    }

  }



  let remainder = "";

  if (depth > 0 && start >= 0) {

    remainder = input.slice(start);

  }



  return { items, remainder };

}



function applyStateToggleFromRaw(raw) {

  const text = String(raw || "");

  if (!text.includes("\"type\":\"state\"")) return;



  const pickOn = (key) => {

    const re = new RegExp(`"${key}"\\s*:\\s*\\{[^}]*"on"\\s*:\\s*(true|false|0|1)`, "i");

    const m = text.match(re);

    if (!m) return undefined;

    const v = m[1].toLowerCase();

    return (v === "true" || v === "1");

  };



  const ch1On = pickOn("ch1");

  if (typeof ch1On !== "undefined") {

    globalStateByCh.ch1.isOn = ch1On;

    setToggleVisual($("toggleCh1"), ch1On);

  }



  const ch2On = pickOn("ch2");

  if (typeof ch2On !== "undefined") {

    globalStateByCh.ch2.isOn = ch2On;

    setToggleVisual($("toggleCh2"), ch2On);

  }

}



function setRemoteUi(connected) {

  const dot = document.getElementById("remoteStatusDot");

  if (dot) dot.classList.toggle("on", connected);

  const text = document.getElementById("remoteStatusText");

  if (text) text.textContent = connected ? "Remote connected" : "Remote disconnected";

  const header = document.getElementById("remoteDisconnectedHeader");

  if (header) header.style.display = connected ? "none" : "block";

  const modes = document.getElementById("remoteModesWrap");

  if (modes) modes.style.display = connected ? "grid" : "none";

  if (connected) updateRemoteModesUi();

}



function updateRemoteModesUi() {

  const wrap = document.getElementById("remoteModesWrap");

  if (!wrap) return;

  wrap.querySelectorAll(".remote-mode-card").forEach(card => {

    const val = parseInt(card.getAttribute("data-remote-cycle") || "-1", 10);

    const isActive = (val == remoteCycle);

    card.classList.toggle("selected", isActive);

  });

}



function setRemoteCycle(value) {

  const num = (typeof value === "number") ? value : parseInt(String(value || ""), 10);

  if (isNaN(num)) return;

  remoteCycle = num;

  const modes = document.getElementById("remoteModesWrap");

  if (modes) modes.style.display = "grid";

  updateRemoteModesUi();

}





function handleBleNotifyJson(line) {

  let data = null;

  try { data = JSON.parse(line); }

  catch (e) {

    return;

  }

  if (!data || !data.type) return;



  updateBrightnessFromLine(line);



  if (data.type === "remote_status") {

    const connected = !!data.connected;

    setRemoteUi(connected);

    return;

  }



  if (data.type === "state") {

    const normalizeOn = (v) => {

      if (typeof v === "boolean") return v;

      if (typeof v === "number") return v !== 0;

      if (typeof v === "string") {

        if (v === "true" || v === "1") return true;

        if (v === "false" || v === "0") return false;

      }

      return undefined;

    };



    let ch1Payload = data.ch1;

    if (!ch1Payload && data.p1) ch1Payload = data.p1;

    let ch2Payload = data.ch2;

    if (typeof ch1Payload === "string") {

      try { ch1Payload = JSON.parse(ch1Payload); } catch (e) { ch1Payload = null; }

    }

    if (typeof ch2Payload === "string") {

      try { ch2Payload = JSON.parse(ch2Payload); } catch (e) { ch2Payload = null; }

    }

    if (ch1Payload && typeof ch1Payload.brightness !== "undefined") {

      const b = parseInt(ch1Payload.brightness, 10);

      if (!isNaN(b)) {

        globalStateByCh.ch1.brightness = b;

        setBrightnessUi(b, false);

      }

    }

    if (data.params && typeof data.params.brightness !== "undefined") {

      const b = parseInt(data.params.brightness, 10);

      if (!isNaN(b)) globalStateByCh.ch1.brightness = b;

    } else if (data.p && typeof data.p.brightness !== "undefined") {

      const b = parseInt(data.p.brightness, 10);

      if (!isNaN(b)) globalStateByCh.ch1.brightness = b;

    }



    captureUpdateApp1Effect("ch1", ch1Payload, data);

    captureUpdateApp1Effect("ch2", ch2Payload, data);



    const applyFromState = (chKey, src) => {

      if (!src) return;

      const gs = globalStateByCh[chKey];

      const onVal = normalizeOn(src.on);

      if (typeof onVal !== "undefined") gs.isOn = onVal;

      if (typeof src.brightness === "number") gs.brightness = src.brightness;

      else if (typeof src.brightness === "string") {

        const b = parseInt(src.brightness, 10);

        if (!isNaN(b)) gs.brightness = b;

      }

      const c1 = (typeof src.colorPrimary === "string") ? src.colorPrimary : src.clr1;

      const c2 = (typeof src.colorSecondary === "string") ? src.colorSecondary : src.clr2;

      const c3 = (typeof src.colorTertiary === "string") ? src.colorTertiary : src.clr3;

      if (typeof c1 === "string") gs.primary = c1;

      if (typeof c2 === "string") gs.secondary = c2;

      if (typeof c3 === "string") gs.tertiary = c3;

      if (typeof src.temperatureWarm === "number") gs.temperatureWarm = src.temperatureWarm;

      if (typeof src.temperatureCold === "number") gs.temperatureCold = src.temperatureCold;



      if (chKey === "ch1" && typeof src.effectId !== "undefined") {

        const incomingId = resolveEffectId(src.effectId);

        if (incomingId !== null && validEffectIdInGroup("ch1", incomingId)) {

          selectedSceneId = null;

          selectedEffectIdByCh.ch1 = incomingId;

        }

      }



      const effectId = selectedEffectIdByCh[chKey];

      if (validEffectIdInGroup(chKey, effectId)) {

        ensureEffectState(chKey, effectId);

        const st = effectStateByCh[chKey][effectId];

        if (typeof src.speed === "number") st.speed = src.speed;

        if (typeof src.length === "number") st.length = src.length;

        if (typeof src.param1 === "number") st.param1 = src.param1;

        if (typeof src.param2 === "number") st.param2 = src.param2;

        if (typeof src.param3 === "number") st.param3 = src.param3;

      }

    };



    applyFromState("ch1", ch1Payload);

    applyFromState("ch2", ch2Payload);

    applyGlobalToUi("ch1");

    applyGlobalToUi("ch2");

    if (validEffectIdInGroup("ch1", selectedEffectIdByCh.ch1)) {

      applyEffectToUi("ch1", selectedEffectIdByCh.ch1);

    }

    if (ch1Payload && typeof ch1Payload.on !== "undefined") {

      const onVal = normalizeOn(ch1Payload.on);

      if (typeof onVal !== "undefined") setToggleVisual($("toggleCh1"), onVal);

    }

    if (ch2Payload && typeof ch2Payload.on !== "undefined") {

      const onVal = normalizeOn(ch2Payload.on);

      if (typeof onVal !== "undefined") setToggleVisual($("toggleCh2"), onVal);

    }

    if (currentChannel === "ch1") {

      applyEffectToUi("ch1", selectedEffectIdByCh.ch1);

    }

    updateHomeToggleVisuals();

    updateSwatchesUi();

    saveOfflineState();

    return;

  }

}



async function ensureBleEncrypted() {

  // Trigger OS pairing prompt for encrypted write.

  try {

    await bleWriteJson({});

    return true;

  } catch (e) {

    return false;

  }

}



async function bridgeStartNotifications() {

  try {

    return window.BLEBridge.bleStartNotifications(function (txt) {

      handleBleNotify(String(txt || "").trim());

    });

  } catch (e) {

    return Promise.resolve();

  }

}



function clearBridgeReconnect() {

  if (bridgeReconnectTimer) {

    clearTimeout(bridgeReconnectTimer);

    bridgeReconnectTimer = null;

  }

}



function scheduleBridgeReconnect() {

  if (!bridgeDeviceId || bridgeReconnectAttempts >= BRIDGE_RECONNECT_MAX) return;

  if (bridgeReconnectTimer) return;

  var delay = BRIDGE_RECONNECT_BASE_MS * (bridgeReconnectAttempts + 1);

  bridgeReconnectTimer = setTimeout(function () {

    bridgeReconnectTimer = null;

    attemptBridgeReconnect();

  }, delay);

}



function attemptBridgeReconnect() {

  if (!bridgeDeviceId) return;

  bridgeReconnectAttempts++;

  setBleChip("Reconnecting...", false);

  setBleStatus("Reconnecting...");

  window.BLEBridge.bleConnect(bridgeDeviceId)

    .then(function () { return bridgeStartNotifications(); })

    .then(function () {

      setBridgeReady(true);

      bridgeReconnectAttempts = 0;

      setBleChip("Connected", false);

      setBleStatus("Connected");

    })

    .catch(function () {

      setBridgeReady(false);

      scheduleBridgeReconnect();

    });

}



function handleBleWriteError() {

  setBridgeReady(false);

  setBleChip("Not connected", false);

  setBleStatus("Write failed. Pairing may be required.");

  scheduleBridgeReconnect();

}



async function initBleUart() {

  if (!bleServer) throw new Error("BLE server not connected");

  bleService = await bleServer.getPrimaryService(SERVICE_UUID);

  bleRxChar  = await bleService.getCharacteristic(RX_UUID);

  try {

    bleTxChar = await bleService.getCharacteristic(TX_UUID);

    await bleTxChar.startNotifications();

    bleTxChar.addEventListener("characteristicvaluechanged", (e) => {

      const msg = new TextDecoder().decode(e.target.value);

      handleBleNotify(msg.trim());

    });

  } catch (e) { bleTxChar = null; }

}



async function bleWriteJson(obj) {

  if (window.BLEBridge && typeof window.BLEBridge.bleWrite === "function") {

    if (!bridgeReady) throw new Error("BLE bridge not ready");

    return window.BLEBridge.bleWrite(obj);

  }

  if (!bleRxChar) throw new Error("BLE RX characteristic not ready");

  const json = JSON.stringify(obj) + "";

  const bytes = new TextEncoder().encode(json);

  const chunkSize = 120;

  for (let i = 0; i < bytes.length; i += chunkSize) {

    const chunk = bytes.slice(i, i + chunkSize);

    await bleRxChar.writeValue(chunk);

  }

}





function buildFullPacket(modeStr, chForState, effectIdOverride) {

  const ch = chForState;

  const gs = globalStateByCh[ch];

  let effectId = ((effectIdOverride !== null && effectIdOverride !== undefined) ? effectIdOverride : ((selectedEffectIdByCh[ch] !== null && selectedEffectIdByCh[ch] !== undefined) ? selectedEffectIdByCh[ch] : 0));



  if (ch === "ch2") {

    return {

      mode: modeStr, on: !!gs.isOn, effectId: 0, brightness: gs.brightness,

      speed: 128, length: 125, param1: 0.5, param2: 0.0, param3: 0.0,

      colorPrimary: "#ffffff", colorSecondary: "#ffffff", colorTertiary: "#ffffff",

      temperatureWarm: gs.temperatureWarm,

      temperatureCold: gs.temperatureCold

    };

  }



  ensureEffectState(ch, effectId);

  const st = effectStateByCh[ch][effectId];



  return {

    mode: modeStr,

    on: !!gs.isOn,

    effectId: effectId,

    brightness: gs.brightness,

    speed: st ? st.speed : 128,

    length: st ? st.length : 125,

    param1: st ? st.param1 : 0.5,

    param2: st ? st.param2 : 0.0,

    param3: st ? st.param3 : 0.0,

    colorPrimary: gs.primary,

    colorSecondary: gs.linked ? gs.primary : gs.secondary,

    colorTertiary: gs.linked ? gs.primary : gs.tertiary

  };

}



async function sendChannelState(ch, effectIdOverride, preferLastUpdateEffect = false) {

  readGlobalFromUi(ch);

  if (ch === "ch1") {

    const eff = ((effectIdOverride !== null && effectIdOverride !== undefined) ? effectIdOverride : selectedEffectIdByCh[ch]);

    if (eff !== null && eff !== undefined) readPerEffectFromUi(ch, eff);

  }

  saveOfflineState();

  if (!bleRxChar || !bleServer) return;



  try {

    const effectId = pickEffectIdForSend(ch, effectIdOverride, preferLastUpdateEffect);

    const payload = buildFullPacket(ch, ch, effectId);

    await bleWriteJson(payload);

  } catch (e) {

    handleBleWriteError();

  }

}



function powerModeForChannel(ch) { return (ch === "ch1") ? "power1" : "power2"; }



async function sendPowerAsFullPacket(ch, newOn) {

  globalStateByCh[ch].isOn = newOn;

  updateHomeToggleVisuals();



  saveOfflineState();

  if (!bleRxChar || !bleServer) return;



  try {

    const modeStr = powerModeForChannel(ch);

    readGlobalFromUi(ch);

    if (ch === "ch1") {

      const eff = selectedEffectIdByCh[ch];

      if (eff !== null && eff !== undefined) readPerEffectFromUi(ch, eff);

    }

    saveOfflineState();

    const effectId = pickEffectIdForSend(ch, selectedEffectIdByCh[ch], true);

    const payload = buildFullPacket(modeStr, ch, effectId);

    await bleWriteJson(payload);

  } catch (e) {

    handleBleWriteError();

  }

}



// -------------------- SCREENS --------------------

function hideAllScreens() {

  $("homeScreen").style.display = "none";

  $("ch1PickScreen").style.display = "none";

  $("effectsScreen").style.display = "none";

  $("scenesScreen").style.display = "none";

  $("controlsScreen").style.display = "none";

  $("remoteScreen").style.display = "none";

  $("modesScreen").style.display = "none";

  $("settingsScreen").style.display = "none";

}

function setTopbarVisible(on) { $("topbar").style.display = on ? "flex" : "none"; }

function setBottomNavActive(id) {

  ["navHome","navModes","navRemote","navSettings"].forEach(n => {

    const el = $(n);

    if (el) el.classList.toggle("active", n === id);

  });

}

function navForModeCapture() { return modeCapture.active ? "navModes" : "navHome"; }

function showHome() { hideAllScreens(); setTopbarVisible(true); $("homeScreen").style.display = "block"; setBottomNavActive("navHome"); }

function showCh1Pick() { hideAllScreens(); setTopbarVisible(false); $("ch1PickScreen").style.display = "block"; $("ch1PickTitle").textContent = channelDisplayName("ch1"); setBottomNavActive(navForModeCapture()); }

function showModes() { hideAllScreens(); setTopbarVisible(false); $("modesScreen").style.display = "block"; setBottomNavActive("navModes"); renderModes(); }



function showEffects(ch) {

  currentChannel = ch;

  if (ch === "ch2") { showControls("ch2", 0); return; }

  hideAllScreens();

  setTopbarVisible(false);

  $("effectsScreen").style.display = "block";

  $("effectsTitle").textContent = channelDisplayName(ch);

  renderEffectsList(ch);

  setBottomNavActive(navForModeCapture());

}



function showScenes() {

  currentChannel = "ch1";

  hideAllScreens();

  setTopbarVisible(false);

  $("scenesScreen").style.display = "block";

  renderScenes();

  setBottomNavActive(navForModeCapture());

}



function showControls(ch, effectId) {

  currentChannel = ch;

  currentControlsEffectId = effectId;



  hideAllScreens();

  setTopbarVisible(false);

  $("controlsScreen").style.display = "block";

  setBottomNavActive(navForModeCapture());



  $("controlsCh1").style.display = (ch === "ch1") ? "block" : "none";

  $("controlsCh2").style.display = (ch === "ch2") ? "flex" : "none";



  const headerRight = $("controlsHeaderRight");

  if (headerRight) headerRight.style.display = "flex";



  const applyCh1 = $("btnApplyMode");

  const applyCh2 = $("btnApplyModeCh2");

  if (applyCh1) applyCh1.style.display = modeCapture.active ? "inline-flex" : "none";

  if (applyCh2) applyCh2.style.display = (modeCapture.active && ch === "ch2") ? "inline-flex" : "none";



  if (ch === "ch2") {

    const title = $("controlsTitle");

    if (title) {

      title.textContent = channelDisplayName("ch2");

      title.classList.add("is-ch2");

    }

    applyGlobalToUi("ch2");

    updateHomeToggleVisuals();

    return;

  }



  const title = $("controlsTitle");

  if (title) title.classList.remove("is-ch2");



  const meta = getMeta(ch, effectId);

  const effT = meta ? effectT(meta.key) : null;

  const effectName = (effT && effT.name) ? effT.name : (meta ? meta.name : "Controls");

  $("controlsTitle").textContent = `${effectName}`;



  if (meta) applyEffectMetaToControls(meta);

  applyGlobalToUi(ch);

  applyEffectToUi(ch, effectId);

}



function renderEffectsList(ch) {

  const container = $("effectsList");

  container.innerHTML = "";



  const wrap = document.createElement("div");

  wrap.className = "list-wrap";



  const head = document.createElement("div");

  head.className = "list-head";

  head.innerHTML = `<div class="list-head-title">Effects</div>`;

  wrap.appendChild(head);



  const grid = document.createElement("div");

  grid.className = "effects-grid";



  const list = effectsInGroup(ch);

  list.forEach(e => {

    const card = document.createElement("div");

    const isSel = ((selectedSceneId === null || selectedSceneId === undefined) && e.id === selectedEffectIdByCh[ch]);

    card.className = "effect-card" + (isSel ? " selected" : "");



    const body = document.createElement("div");

    body.className = "body";



    const name = document.createElement("div");

    name.className = "effect-name";

    const eff = effectT(e.key);

    name.textContent = (eff && eff.name) ? eff.name : e.name;



    body.appendChild(name);

    card.appendChild(body);



    card.onclick = () => {

      selectedSceneId = null;

      selectedEffectIdByCh[ch] = e.id;

      saveOfflineState();

      renderEffectsList(ch);

      showControls(ch, e.id);

      sendChannelState(ch, e.id);

    };



    grid.appendChild(card);

  });



  wrap.appendChild(grid);

  container.appendChild(wrap);

}



function renderScenes() {

  const container = $("scenesList");

  container.innerHTML = "";



  const wrap = document.createElement("div");

  wrap.className = "list-wrap";



  const head = document.createElement("div");

  head.className = "list-head";

  head.innerHTML = `<div class="list-head-title">Scenes</div>`;

  wrap.appendChild(head);



  const grid = document.createElement("div");

  grid.className = "scenes-grid";



  SCENES.forEach(sc => {

    const card = document.createElement("div");

    card.className = "scene-card" + ((selectedSceneId === sc.id) ? " selected" : "");



    const body = document.createElement("div");

    body.className = "body";



    const name = document.createElement("div");

    name.className = "scene-name";

    name.textContent = sc.name;



    body.appendChild(name);

    card.appendChild(body);



    card.onclick = () => {

      selectedSceneId = sc.id;

      saveOfflineState();

      renderScenes(); // highlight stays on scenes page

      applySceneAndSend(sc); // send JSON but do NOT navigate

    };



    grid.appendChild(card);

  });



  wrap.appendChild(grid);

  container.appendChild(wrap);

}



function showRemote() {

  hideAllScreens();

  setTopbarVisible(false);

  $("remoteScreen").style.display = "block";

  setBottomNavActive("navRemote");

  updateRemoteModesUi();

  if (bleTxChar) {

    bleTxChar.readValue()

      .then(v => {

        const msg = new TextDecoder().decode(v);

        if (msg) handleBleNotify(msg.trim());

      })

      .catch(() => {});

  }

}

function showSettings() { hideAllScreens(); setTopbarVisible(false); $("settingsScreen").style.display = "block"; setBottomNavActive("navSettings"); }



// Scene behaviour:

// - stay on scenes page

// - send Gradient Flow packet (effectId=4) with scene colours

// - params default (for gradient flow) + speed/direction updated across all effects (CH1)

function applySceneAndSend(sc) {

  const gradientId = 4;

  const gfMeta = getMeta("ch1", gradientId);



  // Update global colours (forces palette swatches everywhere)

  globalStateByCh.ch1.linked = false;

  globalStateByCh.ch1.primary = sc.c1;

  globalStateByCh.ch1.secondary = sc.c2;

  globalStateByCh.ch1.tertiary = sc.c3;



  // Update speed + direction across ALL effects (CH1)

  const all = effectsInGroup("ch1");

  all.forEach(e => {

    ensureEffectState("ch1", e.id);



    // Speed: use Gradient Flow default speed (or 100 if you prefer)

    effectStateByCh.ch1[e.id].speed = (gfMeta ? gfMeta.speed_def : 128);



    // Direction: use Gradient Flow default param1 (usually 1.0 in your table)

    effectStateByCh.ch1[e.id].param1 = (gfMeta ? (gfMeta.p1_def / 100.0) : 0.50);

  });



  // IMPORTANT: We DO NOT change selectedEffectIdByCh or open controls

  // We only send a packet as Gradient Flow (effectId 4)

  saveOfflineState();



  // If user later goes to controls, make sure swatches show the scene colours

  updateSwatchesUi();



  // Send gradient flow packet (default params already in effectStateByCh for id=4)

  sendChannelState("ch1", gradientId);

}



// -------------------- Reset --------------------

let resetConfirmArmed = false;

let resetConfirmTimer = null;



function clearResetButtonState() {

  const btn = $("btnReset");

  btn.classList.remove("confirm");

  btn.classList.remove("success");

  btn.textContent = t("reset_defaults");

  resetConfirmArmed = false;

  if (resetConfirmTimer) { clearTimeout(resetConfirmTimer); resetConfirmTimer = null; }

}

function armResetConfirm() {

  const btn = $("btnReset");

  resetConfirmArmed = true;

  btn.classList.add("confirm");

  btn.textContent = t("are_you_sure");

  resetConfirmTimer = setTimeout(() => { clearResetButtonState(); }, 2500);

}

function showResetSuccess() {

  const btn = $("btnReset");

  btn.classList.remove("confirm");

  btn.classList.add("success");

  btn.textContent = t("reset_ok");

  setTimeout(() => { clearResetButtonState(); }, 1200);

}

function resetToDefaults() {

  globalStateByCh = { ch1:{...globalDefaults}, ch2:{...globalDefaults} };

  effectStateByCh = { ch1: {}, ch2: {} };

  activeSeg = 1;

  selectedSceneId = null;



  effects.forEach(e => ensureEffectState(e.group, e.id));

  seedSelectionsIfMissing();



  saveOfflineState();

  applyTranslations();

  updateHomeToggleVisuals();

  updateSwatchesUi();

  updateSegButtonsUi();

  setRemoteUi(false);

  loadRemoteColors();

  renderRemoteColors();



  showHome();

  showResetSuccess();

  sendChannelState("ch1", selectedEffectIdByCh.ch1);

}



// -------------------- Menu --------------------

function openMenu() {

  $("menuOverlay").classList.add("show");

  $("menuDrawer").classList.add("show");

  $("menuDrawer").setAttribute("aria-hidden", "false");

  showMenuMain();

}

function closeMenu() {

  $("menuOverlay").classList.remove("show");

  $("menuDrawer").classList.remove("show");

  $("menuDrawer").setAttribute("aria-hidden", "true");

}

function showMenuMain() {

  $("menuPageMain").style.display = "block";

  $("menuPageLanguages").style.display = "none";

  $("menuPageRename").style.display = "none";

  $("menuLangHint").textContent = (getLang() || "en").toUpperCase();

  $("menuRenameHint").textContent = `${channelDisplayName("ch1")} / ${channelDisplayName("ch2")}`;

}

function showMenuLanguages() {

  $("menuPageMain").style.display = "none";

  $("menuPageLanguages").style.display = "block";

  $("menuPageRename").style.display = "none";

  renderLangsInMenu();

}

function showMenuRename() {

  $("menuPageMain").style.display = "none";

  $("menuPageLanguages").style.display = "none";

  $("menuPageRename").style.display = "block";

  $("inpCh1Name").value = getChName("ch1");

  $("inpCh2Name").value = getChName("ch2");

}

function renderLangsInMenu() {

  const current = getLang();

  const list = $("langListMenu");

  list.innerHTML = "";

  LANGS.forEach(l => {

    const row = document.createElement("div");

    row.className = "menu-card";

    row.style.marginBottom = "8px";

    row.style.padding = "10px 12px";



    const left = document.createElement("div");

    left.className = "left";



    const t1 = document.createElement("div");

    t1.className = "t1";

    t1.textContent = l.label;



    const t2 = document.createElement("div");

    t2.className = "t2";

    t2.textContent = (l.code === current) ? "Selected" : "";



    left.appendChild(t1); left.appendChild(t2);



    const arrow = document.createElement("div");

    arrow.className = "arrow";

    arrow.textContent = (l.code === current) ? "OK" : "Select";



    row.appendChild(left);

    row.appendChild(arrow);



    row.onclick = () => {

      setLang(l.code);

      applyTranslations();

      renderLangsInMenu();

    };

    list.appendChild(row);

  });

}



// -------------------- Gate screens --------------------

function showGateIntro() {

  $("introScreen").classList.add("show");

  $("bleScreen").classList.remove("show");

  $("appRoot").classList.remove("show");

}

function showGateBle() {

  $("bleScreen").classList.add("show");

}

function showApp() {

  $("introScreen").classList.remove("show");

  $("bleScreen").classList.remove("show");

  $("appRoot").classList.add("show");

  if (bleTxChar) {

    bleTxChar.readValue()

      .then(v => {

        const msg = new TextDecoder().decode(v);

        if (msg) handleBleNotify(msg.trim());

      })

      .catch(() => {});

  }

}

function setBleChip(text, connected) {

  const chip = $("bleChip");

  if (!chip) return;

  chip.textContent = text;

  chip.classList.remove("chip-success");

  chip.classList.toggle("chip-connected", !!connected);

  chip.style.borderColor = connected ? "rgba(64,224,208,0.92)" : "rgba(255, 246, 230, 0.14)";

  chip.style.boxShadow = connected ? "0 0 0 1px rgba(64,224,208,0.45)" : "none";

}

function setBleStatus(msg) {

  var el1 = document.getElementById("bleStatusFloating");

  if (el1) el1.textContent = msg;

  var el2 = document.getElementById("bleStatusCard");

  if (el2 && el2.dataset.mode !== "list") el2.textContent = msg;

}

function renderBleDeviceList(devices) {

  var card = document.getElementById("bleStatus");

  if (!card) return;

  card.dataset.mode = "list";

  card.innerHTML = "";



  devices = filterDevicesForBle(devices);

  if (!devices || !devices.length) {

    card.textContent = "No devices found";

    return;

  }



  var list = document.createElement("div");

  list.style.display = "flex";

  list.style.flexDirection = "column";

  list.style.gap = "6px";



  for (var i = 0; i < devices.length; i++) {

    var dev = devices[i];

    var btn = document.createElement("button");

    btn.className = "btn";

    btn.type = "button";

    btn.textContent = (dev.name ? dev.name : "(no name)") + " - " + dev.deviceId;

    btn.addEventListener("click", (function (d) {

      return function () { connectToBleDevice(d); };

    })(dev));

    list.appendChild(btn);

  }



  card.appendChild(list);

}



function connectToBleDevice(dev) {

  if (!dev || !dev.deviceId) return;

  var card = document.getElementById("bleStatus");

  if (card) card.dataset.mode = "text";

  setBleChip("Connecting...", false);

  setBleStatus("Connecting to " + (dev.name || dev.deviceId));



  window.BLEBridge.bleConnect(dev.deviceId)

    .then(function () {

      bridgeDeviceId = dev.deviceId;

      setLastBleDeviceId(dev.deviceId);

      return bridgeStartNotifications();

    })

    .then(function () {

      clearBridgeReconnect();

      setBridgeReady(true);

      var btnDisc = document.getElementById("btnBleDisconnect");

      if (btnDisc) btnDisc.style.display = "inline-block";

      setBleStatus("Connected");

      return runConnectedTransition(dev.name || "LED");

    })

    .catch(function (e) {

      setBridgeReady(false);

      setBleChip("Not connected", false);

      setBleStatus("Connect error: " + ((e && e.message) ? e.message : e));

      logOnScreenError("bleConnect", e);

    });

}





function ensureErrorOverlay() {

  var box = document.getElementById("errorOverlay");

  if (!box) {

    box = document.createElement("div");

    box.id = "errorOverlay";

    box.style.position = "fixed";

    box.style.bottom = "10px";

    box.style.right = "10px";

    box.style.maxWidth = "80%";

    box.style.background = "rgba(0,0,0,0.85)";

    box.style.color = "#fff";

    box.style.padding = "8px 10px";

    box.style.fontSize = "12px";

    box.style.borderRadius = "8px";

    box.style.zIndex = "99999";

    box.style.whiteSpace = "pre-wrap";

    box.textContent = "BLE log ready";

    document.body.appendChild(box);

  }

  return box;

}



function logOnScreenError(label, err) {

  var box = ensureErrorOverlay();

  var msg = (err && (err.message || err.name)) ? (err.message || err.name) : String(err || "");

  var line = label + ": " + msg;

  box.textContent = line + " " + box.textContent;

}



function onBleDisconnected() {

  setBridgeReady(false);

  bleServer = null; bleService = null; bleRxChar = null; bleTxChar = null;

  setBleChip("Not connected", false);

  setBleStatus("Disconnected");

  $("btnBleDisconnect").style.display = "none";

  bleDevice = null;

  statusRemoteConnected = null;

  if (bridgeDeviceId) scheduleBridgeReconnect();

}



function startAppWithoutBle() {

  bleDevice = null; bleServer = null; bleService = null; bleRxChar = null; bleTxChar = null;

  setBleChip("Offline mode", false);

  setBleStatus("Continuing without pairing");

  $("btnBleDisconnect").style.display = "none";

  startApp();

}



async function scanAndConnectBle() {



  if (!bleSupported()) {

    setBleChip("Unsupported", false);

    setBleStatus("BLE not supported");

    logOnScreenError("bleSupported", "not supported");

    return;

  }



  var card = document.getElementById("bleStatusCard");

  if (card) card.dataset.mode = "text";



  try {

    await window.BLEBridge.bleInit();



    if (!window.BLEBridge || typeof window.BLEBridge.bleRequestDevice !== "function") {

      setBleChip("Not supported", false);

      setBleStatus("OS picker not available");

      return;

    }



    setBleChip("Select device", false);

    setBleStatus("Select a device to connect");

    var picked = await window.BLEBridge.bleRequestDevice();

    if (!picked || !picked.deviceId) {

      setBleChip("Not found", false);

      setBleStatus("No device selected");

      return;

    }



    setBleChip("Connecting...", false);

    setBleStatus("Connecting to " + (picked.name || picked.deviceId));

    await window.BLEBridge.bleConnect(picked.deviceId);

    bridgeDeviceId = picked.deviceId;

    setLastBleDeviceId(picked.deviceId);

    await bridgeStartNotifications();



    setBleChip("Connected", false);

    setBleStatus("Connected to " + (picked.name || picked.deviceId));



    clearBridgeReconnect();

    setBridgeReady(true);



    return runConnectedTransition(picked.name || "LED");

  } catch (err) {

    setBridgeReady(false);

    setBleChip("Not connected", false);

    setBleStatus("BLE error");

    logOnScreenError("scanAndConnectBle", err);

  }

}





async function runConnectedTransition(deviceName) {

  const chip = $("bleChip");

  if (chip) {

    setBleChip("Not connected", false);

    chip.textContent = "Connected";

    chip.classList.add("chip-success");

    await sleep(500);

    chip.classList.remove("chip-success");

  }

  startApp();

}



function disconnectBle() {

  if (window.BLEBridge && typeof window.BLEBridge.bleDisconnect === "function") {

    clearBridgeReconnect();

    bridgeDeviceId = null;

    setBridgeReady(false);

    window.BLEBridge.bleDisconnect()

      .then(function () { onBleDisconnected(); })

      .catch(function () { onBleDisconnected(); });

    return;

  }

  try {

    if (bleDevice && bleDevice.gatt && bleDevice.gatt.connected) bleDevice.gatt.disconnect();

  } catch(e) {}

  onBleDisconnected();

}



// -------------------- Palette / selection seed --------------------

function seedSelectionsIfMissing() {

  if (!validEffectIdInGroup("ch1", selectedEffectIdByCh.ch1)) {

    const list = effectsInGroup("ch1");

    selectedEffectIdByCh.ch1 = list.length ? list[0].id : 0;

  }

  selectedEffectIdByCh.ch2 = 0;

}



function loadEffects() {

  effects = LOCAL_EFFECTS.slice();

  effectMetaByIdGroup = {};

  effects.forEach(e => { effectMetaByIdGroup[metaKey(e.group, e.id)] = e; });

  effectsInGroup("ch1").forEach(e => ensureEffectState("ch1", e.id));

  seedSelectionsIfMissing();

}



// -------------------- App init --------------------

function startApp() {

  showApp();



  loadEffects();

  loadOfflineState();

  loadModes();

  seedSelectionsIfMissing();

  loadRemoteColors();

  renderRemoteColors();



  $("warmWhiteCh2").value = globalStateByCh.ch2.temperatureWarm || 0;

  $("coldWhiteCh2").value = globalStateByCh.ch2.temperatureCold || 0;

  const warmVal = $("warmWhiteCh2Value");

  if (warmVal) warmVal.textContent = globalStateByCh.ch2.temperatureWarm || 0;

  const coldVal = $("coldWhiteCh2Value");

  if (coldVal) coldVal.textContent = globalStateByCh.ch2.temperatureCold || 0;

  setBrightnessUi(globalStateByCh.ch1.brightness || 0, false);

  setWarmUi(globalStateByCh.ch2.temperatureWarm || 0, false);

  setColdUi(globalStateByCh.ch2.temperatureCold || 0, false);



  applyTranslations();

  updateHomeToggleVisuals();

  updateSwatchesUi();

  updateSegButtonsUi();



  if (!cycleLogTimer) {

    cycleLogTimer = setInterval(() => {

    }, 2000);

  }



  // Menu

  $("btnMenu").addEventListener("click", (ev) => { ev.preventDefault(); openMenu(); });

  $("menuOverlay").addEventListener("click", () => closeMenu());

  $("menuClose").addEventListener("click", () => closeMenu());



  $("menuOpenLanguages").addEventListener("click", () => showMenuLanguages());

  $("menuOpenRename").addEventListener("click", () => showMenuRename());

  $("menuBackFromLanguages").addEventListener("click", () => showMenuMain());

  $("menuBackFromRename").addEventListener("click", () => showMenuMain());



  $("btnSaveNames").addEventListener("click", () => {

    setChName("ch1", $("inpCh1Name").value);

    setChName("ch2", $("inpCh2Name").value);

    applyTranslations();

    showMenuMain();

  });



  // Remote colors

  document.querySelectorAll(".remote-color-card").forEach(card => {

    card.addEventListener("click", () => {

      const idx = parseInt(card.getAttribute("data-remote-slot") || "0", 10);

      openRemotePalette(idx);

    });

  });

  $("remoteSeg1").addEventListener("click", () => setRemotePaletteSeg(1));

  $("remoteSeg2").addEventListener("click", () => setRemotePaletteSeg(2));

  $("remoteSeg3").addEventListener("click", () => setRemotePaletteSeg(3));



  // Power toggles

  $("toggleCh1").addEventListener("click", (ev) => { ev.stopPropagation(); sendPowerAsFullPacket("ch1", !globalStateByCh.ch1.isOn); });

  $("toggleCh2").addEventListener("click", (ev) => { ev.stopPropagation(); sendPowerAsFullPacket("ch2", !globalStateByCh.ch2.isOn); });

  $("toggleControlsPower").addEventListener("click", (ev) => {

    ev.stopPropagation();

    const ch = (currentChannel === "ch2") ? "ch2" : "ch1";

    sendPowerAsFullPacket(ch, !globalStateByCh[ch].isOn);

  });

  $("toggleCh1Header").addEventListener("click", (ev) => { ev.stopPropagation(); sendPowerAsFullPacket("ch1", !globalStateByCh.ch1.isOn); });

  $("toggleMaster").addEventListener("click", async (ev) => {

    ev.stopPropagation();

    const anyOn = !!globalStateByCh.ch1.isOn || !!globalStateByCh.ch2.isOn;

    if (anyOn) {

      await sendPowerAsFullPacket("ch1", false);

      await sendPowerAsFullPacket("ch2", false);

    } else {

      await sendPowerAsFullPacket("ch1", true);

      await sendPowerAsFullPacket("ch2", true);

    }

  });



  // Home navigation

  $("cardCh1").addEventListener("click", () => showCh1Pick());

  $("cardCh2").addEventListener("click", () => showEffects("ch2"));



  // Bottom nav

  $("navHome").addEventListener("click", () => showHome());

  $("navModes").addEventListener("click", () => showModes());

  $("navRemote").addEventListener("click", () => showRemote());

  $("navSettings").addEventListener("click", () => showSettings());



  // Back buttons

  $("btnBackCh1Pick").addEventListener("click", () => showHome());

  $("btnBackEffects").addEventListener("click", () => showCh1Pick());

  $("btnBackScenes").addEventListener("click", () => showCh1Pick());

  $("btnBackControls").addEventListener("click", () => {

    if (currentChannel === "ch2") showHome();

    else showEffects("ch1");

  });



  // Pick buttons

  $("pickEffects").addEventListener("click", () => showEffects("ch1"));

  $("pickScenes").addEventListener("click", () => showScenes());



  // CH1 sliders

  ["speed","length","param1","param2","param3"].forEach(id => {

    $(id).addEventListener("change", () => {

      const meta = getMeta("ch1", selectedEffectIdByCh.ch1);

      if (meta) syncSpecialFromRanges(meta);

      sendChannelState("ch1", selectedEffectIdByCh.ch1, true);

    });

  });

  $("brightnessDown").addEventListener("click", () => {

    const current = getUiValueOrState("brightnessLevel", globalStateByCh.ch1.brightness);

    setBrightnessValue(current - BRIGHTNESS_STEP, true, true);

  });

  $("brightnessUp").addEventListener("click", () => {

    const current = getUiValueOrState("brightnessLevel", globalStateByCh.ch1.brightness);

    setBrightnessValue(current + BRIGHTNESS_STEP, true, true);

  });

  $("brightnessPickDown").addEventListener("click", () => {

    const current = getUiValueOrState("brightnessPickLevel", globalStateByCh.ch1.brightness);

    setBrightnessPickValue(current - BRIGHTNESS_STEP, true, true);

  });

  $("brightnessPickUp").addEventListener("click", () => {

    const current = getUiValueOrState("brightnessPickLevel", globalStateByCh.ch1.brightness);

    setBrightnessPickValue(current + BRIGHTNESS_STEP, true, true);

  });

  $("blendToggleParam1").addEventListener("click", () => { toggleBlendParam("param1", "blendToggleParam1"); });

  $("blendToggleParam3").addEventListener("click", () => { toggleBlendParam("param3", "blendToggleParam3"); });

  $("blendToggleLinked").addEventListener("click", () => {

    const paramId = $("blendToggleLinked").dataset.param || "param1";

    toggleBlendParam(paramId, "blendToggleLinked");

  });

  $("spotlightDown").addEventListener("click", () => { stepSpotlight(-1); });

  $("spotlightUp").addEventListener("click", () => { stepSpotlight(1); });

  $("btnApplyMode").addEventListener("click", () => {

    const ch = (currentChannel === "ch2") ? "ch2" : "ch1";

    if (modeCapture.active) {

      if (savedModes.length >= 5) { modeCapture.active = false; return; }

      openModeNameModal((raw) => {

        const name = String(raw || "").trim().slice(0, 15);

        if (!name.length) { modeCapture.active = false; return; }

        const payload = buildModePayload(modeCapture.channel || ch);

        savedModes.push({ name, channel: modeCapture.channel || ch, payload });

        saveModes();

        renderModes();

        modeCapture.active = false;

        showModes();

      });

      return;

    }

    const eff = selectedEffectIdByCh.ch1;

    if (eff !== null && eff !== undefined) sendChannelState("ch1", eff);

  });

  $("btnApplyModeCh2").addEventListener("click", () => {

    if (modeCapture.active) {

      if (savedModes.length >= 5) { modeCapture.active = false; return; }

      openModeNameModal((raw) => {

        const name = String(raw || "").trim().slice(0, 15);

        if (!name.length) { modeCapture.active = false; return; }

        const payload = buildModePayload("ch2");

        savedModes.push({ name, channel: "ch2", payload });

        saveModes();

        renderModes();

        modeCapture.active = false;

        showModes();

      });

      return;

    }

    sendChannelState("ch2", 0);

  });



  $("toggleLinked").addEventListener("click", (ev) => {

    ev.preventDefault();

    globalStateByCh.ch1.linked = !globalStateByCh.ch1.linked;

    applyLinkedUiState("ch1");

    readGlobalFromUi("ch1");

    sendChannelState("ch1", selectedEffectIdByCh.ch1, true);

  });



  // Segment selectors

  $("segBtn1").addEventListener("click", (ev) => { ev.preventDefault(); activeSeg = 1; updateSegButtonsUi(); saveOfflineState(); openPalette(); });

  $("segBtn2").addEventListener("click", (ev) => { ev.preventDefault(); if (globalStateByCh.ch1.linked) return; activeSeg = 2; updateSegButtonsUi(); saveOfflineState(); openPalette(); });

  $("segBtn3").addEventListener("click", (ev) => { ev.preventDefault(); if (globalStateByCh.ch1.linked) return; activeSeg = 3; updateSegButtonsUi(); saveOfflineState(); openPalette(); });



  // Direction arrows

  $("p1Left").addEventListener("click", (ev) => { ev.preventDefault(); ev.stopPropagation(); setRangeToMinOrMax($("param1"), true); $("param1").dispatchEvent(new Event("change")); });

  $("p1Right").addEventListener("click", (ev) => { ev.preventDefault(); ev.stopPropagation(); setRangeToMinOrMax($("param1"), false); $("param1").dispatchEvent(new Event("change")); });



  // CH2 brightness

  $("warmDown").addEventListener("click", () => {

    const current = getUiValueOrState("warmLevel", globalStateByCh.ch2.temperatureWarm);

    setWarmValue(current - BRIGHTNESS_STEP, true, true);

  });

  $("warmUp").addEventListener("click", () => {

    const current = getUiValueOrState("warmLevel", globalStateByCh.ch2.temperatureWarm);

    setWarmValue(current + BRIGHTNESS_STEP, true, true);

  });

  $("coldDown").addEventListener("click", () => {

    const current = getUiValueOrState("coldLevel", globalStateByCh.ch2.temperatureCold);

    setColdValue(current - BRIGHTNESS_STEP, true, true);

  });

  $("coldUp").addEventListener("click", () => {

    const current = getUiValueOrState("coldLevel", globalStateByCh.ch2.temperatureCold);

    setColdValue(current + BRIGHTNESS_STEP, true, true);

  });



  // Palette popup

  $("paletteOverlay").addEventListener("click", () => closePalette());

  $("paletteClose").addEventListener("click", () => closePalette());

  $("paletteSelect").addEventListener("click", () => closePalette());



  $("btnModeAdd").addEventListener("click", () => {

    if (savedModes.length >= 5) return;

    const picker = $("modeChannelPicker");

    if (picker) picker.style.display = "block";

  });

  $("modeModalCancel").addEventListener("click", () => closeModeModal());

  $("modeModalOverlay").addEventListener("click", (ev) => {

    if (ev.target && ev.target.id === "modeModalOverlay") closeModeModal();

  });

  $("modeModalConfirm").addEventListener("click", () => {

    const input = $("modeModalInput");

    const val = input && input.style.display !== "none" ? input.value : "";

    const cb = modeModalState.onConfirm;

    closeModeModal();

    if (cb) cb(val);

  });

  $("modeModalInput").addEventListener("input", (ev) => {

    const el = ev.target;

    if (!el) return;

    if (el.value.length > 15) el.value = el.value.slice(0, 15);

  });

  $("modePickCh1").addEventListener("click", () => {

    const picker = $("modeChannelPicker");

    if (picker) picker.style.display = "none";

    modeCapture.active = true;

    modeCapture.channel = "ch1";

    showEffects("ch1");

  });

  $("modePickCh2").addEventListener("click", () => {

    const picker = $("modeChannelPicker");

    if (picker) picker.style.display = "none";

    modeCapture.active = true;

    modeCapture.channel = "ch2";

    showControls("ch2", 0);

  });



  showHome();



  // optional initial send (disabled)

}



// -------------------- Utility --------------------

function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }



// -------------------- Boot --------------------

window.addEventListener("load", async () => {

  // intro must last at least 500ms, THEN transition to BLE

  $("introScreen").classList.add("show");

  $("bleScreen").classList.remove("show");



  await sleep(500);



  $("introScreen").classList.add("fadeout");

  showGateBle();

  setTimeout(() => { $("introScreen").classList.remove("show"); }, 320);

  // BLE buttons

  $("btnBleScanConnect").addEventListener("click", function () { scanAndConnectBle(); });

  $("btnBleDisconnect").addEventListener("click", function () { disconnectBle(); });

  $("btnBleSkip").addEventListener("click", function () { startAppWithoutBle(); });

  $("btnBleConsoleClear").addEventListener("click", function () { clearBleConsole(); });



  if (!bleSupported()) {

    setBleChip("Unsupported", false);

    setBleStatus("Web Bluetooth not supported");

  } else {

    setBleChip("Not connected", false);

    setBleStatus("");

  }

});

  

(function () {

  function setText(id, txt) {

    var el = document.getElementById(id);

    if (el) el.textContent = txt;

  }



  window.addEventListener("load", function () {

    // debug overlay disabled for clean UI

    return;

  });

})();



