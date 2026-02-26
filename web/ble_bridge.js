// web/ble_bridge.js (plain script for older WebView)
(function () {
  var CAP = window.Capacitor;
  var BLE = CAP && CAP.Plugins ? CAP.Plugins.BluetoothLe : null;
  var DEBUG_OVERLAY = false;

  // BLE service/characteristic UUIDs (must match device firmware)
  var SERVICE_UUID = "12345678-1234-1234-1234-1234567890ab";
  var RX_UUID = "12345678-1234-1234-1234-1234567890ac"; // write
  var TX_UUID = "12345678-1234-1234-1234-1234567890ad"; // notify (optional)

  var TARGET_BLE_PREFIX = null; // no filtering
  var TARGET_SERVICE_UUID = null;
  var WRITE_CHUNK_BYTES = 120;

  var _initialized = false;
  var _deviceId = null;
  var _notifyStarted = false;
  var _notifyHandler = null;

  function setBootStatus(msg) {
    if (!DEBUG_OVERLAY) return;
    var el = document.getElementById("bleStatusFloating");
    if (el) el.textContent = "BLE: " + msg;
  }

  function logBleDebug(msg) {
    if (!DEBUG_OVERLAY) return;
    try {
      var box = document.getElementById("bleDebugLog");
      if (!box) {
        box = document.createElement("div");
        box.id = "bleDebugLog";
        box.style.position = "fixed";
        box.style.bottom = "10px";
        box.style.left = "10px";
        box.style.zIndex = "99999";
        box.style.background = "rgba(0,0,0,0.75)";
        box.style.color = "#0f0";
        box.style.padding = "6px 8px";
        box.style.fontSize = "11px";
        box.style.borderRadius = "6px";
        box.style.maxWidth = "90%";
        box.style.whiteSpace = "pre-wrap";
        document.body.appendChild(box);
      }
      box.textContent = msg + " " + box.textContent;
    } catch (e) {}
  }

  function normalizeUuid(u) {
    return String(u || "").toLowerCase();
  }

  function normalizeName(v) {
    return String(v || "").trim().toLowerCase();
  }

  function getServiceUuidsFromScan(res) {
    var list = [];
    if (res && Array.isArray(res.serviceUuids)) list = list.concat(res.serviceUuids);
    if (res && res.advertisementData && Array.isArray(res.advertisementData.serviceUuids)) {
      list = list.concat(res.advertisementData.serviceUuids);
    }
    if (res && res.device && Array.isArray(res.device.serviceUuids)) list = list.concat(res.device.serviceUuids);
    return list;
  }

  function hasTargetServiceUuid(list, target) {
    if (!target) return true;
    var t = normalizeUuid(target);
    for (var i = 0; i < list.length; i++) {
      if (normalizeUuid(list[i]) === t) return true;
    }
    return false;
  }

  function bytesToHex(bytes) {
    var hex = "";
    for (var i = 0; i < bytes.length; i++) {
      var h = bytes[i].toString(16);
      if (h.length === 1) h = "0" + h;
      hex += h;
    }
    return hex;
  }

  function textToBytes(text) {
    if (window.TextEncoder) return new TextEncoder().encode(text);
    var utf8 = unescape(encodeURIComponent(text));
    var bytes = new Uint8Array(utf8.length);
    for (var i = 0; i < utf8.length; i++) bytes[i] = utf8.charCodeAt(i);
    return bytes;
  }

  function b64ToText(b64) {
    try {
      var bin = atob(b64 || "");
      var bytes = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      if (window.TextDecoder) return new TextDecoder().decode(bytes);
      var s = "";
      for (var j = 0; j < bytes.length; j++) s += String.fromCharCode(bytes[j]);
      return decodeURIComponent(escape(s));
    } catch (e) {
      return "";
    }
  }

  function showBridgeMarker(msg) {
    if (!DEBUG_OVERLAY) return;
    try {
      var marker = document.getElementById("bleBridgeMarker");
      if (!marker) {
        marker = document.createElement("div");
        marker.id = "bleBridgeMarker";
        marker.style.position = "fixed";
        marker.style.top = "10px";
        marker.style.right = "10px";
        marker.style.zIndex = "99999";
        marker.style.background = "#0a0";
        marker.style.color = "#fff";
        marker.style.padding = "6px 8px";
        marker.style.fontSize = "12px";
        marker.style.borderRadius = "6px";
        document.body.appendChild(marker);
      }
      marker.textContent = msg;
    } catch (e) {}
  }

  showBridgeMarker("BLEBridge v2026-02-26a");

  function mustHavePlugin() {
    if (!CAP) throw new Error("Capacitor not found (capacitor.js missing)");
    if (!BLE) throw new Error("BluetoothLe plugin not found (plugin not installed/synced?)");
  }

  async function logBleState() {
    try {
      if (BLE.isEnabled) {
        var en = await BLE.isEnabled();
        logBleDebug("bt enabled: " + (en && en.value));
      }
    } catch (e) { logBleDebug("bt enabled check err: " + (e && e.message ? e.message : e)); }

    try {
      if (BLE.isLocationEnabled) {
        var le = await BLE.isLocationEnabled();
        logBleDebug("location enabled: " + (le && le.value));
      }
    } catch (e) { logBleDebug("location check err: " + (e && e.message ? e.message : e)); }

    try {
      if (BLE.getPermissions) {
        var p = await BLE.getPermissions();
        logBleDebug("permissions: " + JSON.stringify(p));
      }
    } catch (e) { logBleDebug("permissions check err: " + (e && e.message ? e.message : e)); }
  }

  function withTimeout(promise, ms, label) {
    return new Promise(function (resolve, reject) {
      var t = setTimeout(function () {
        reject(new Error((label || "Operation") + " timed out after " + ms + "ms"));
      }, ms);
      promise.then(function (v) { clearTimeout(t); resolve(v); })
             .catch(function (e) { clearTimeout(t); reject(e); });
    });
  }

  async function bleInit() {
    mustHavePlugin();
    if (_initialized) {
      setBootStatus("ready");
      return true;
    }

    setBootStatus("initializing...");

    try {
      if (BLE.requestPermissions) {
        setBootStatus("requesting permissions...");
        await withTimeout(BLE.requestPermissions(), 8000, "requestPermissions");
        logBleDebug("permissions requested");
      }
    } catch (e) {
      // Continue; we'll still try initialize
    }

    await withTimeout(BLE.initialize(), 8000, "initialize");
    logBleDebug("BLE initialized");
    await logBleState();
    _initialized = true;

    try {
      if (BLE.isEnabled) {
        var en = await BLE.isEnabled();
        if (en && en.value === false && BLE.enable) {
          setBootStatus("enabling Bluetooth...");
          await withTimeout(BLE.enable(), 8000, "enable");
        }
      }
    } catch (e2) {}

    setBootStatus("ready");
    return true;
  }

  async function bleScan(ms) {
    mustHavePlugin();
    if (!_initialized) await bleInit();

    setBootStatus("scanning...");
    logBleDebug("scan start");

    var packets = 0;
    var found = {};

    try {
      await withTimeout(BLE.requestLEScan({ allowDuplicates: true }, function (res) {
        packets++;
        setBootStatus("scanning... packets=" + packets);

        var dev = res && res.device ? res.device : null;
        if (!dev || !dev.deviceId) return;

        var name = dev.name || "(no name)";
        if (TARGET_BLE_PREFIX && normalizeName(name).indexOf(normalizeName(TARGET_BLE_PREFIX)) !== 0) return;

        var serviceUuids = getServiceUuidsFromScan(res);
        if (!hasTargetServiceUuid(serviceUuids, TARGET_SERVICE_UUID)) return;

        if (!found[dev.deviceId]) {
          found[dev.deviceId] = { deviceId: dev.deviceId, name: name, serviceUuids: serviceUuids };
          logBleDebug("found: " + name + " - " + dev.deviceId);
        }
      }), 8000, "requestLEScan");
    } catch (e) {
      setBootStatus("scan error");
      logBleDebug("scan error: " + (e && (e.message || e.name || e)));
      return [];
    }

    await new Promise(function (r) { setTimeout(r, ms || 5000); });

    try {
      await withTimeout(BLE.stopLEScan(), 4000, "stopLEScan");
    } catch (e2) {
      logBleDebug("stop scan err: " + (e2 && (e2.message || e2.name || e2)));
    }

    var arr = [];
    for (var k in found) arr.push(found[k]);

    setBootStatus("done. found=" + arr.length + " packets=" + packets);
    logBleDebug("scan done: found=" + arr.length + " packets=" + packets);
    return arr;
  }

  async function bleConnect(deviceId) {
    mustHavePlugin();
    if (!_initialized) await bleInit();

    setBootStatus("connecting...");
    await withTimeout(BLE.connect({ deviceId: deviceId }), 12000, "connect");

    _deviceId = deviceId;
    _notifyStarted = false;
    _notifyHandler = null;

    setBootStatus("connected");
    return true;
  }

  async function bleStopNotifications() {
    mustHavePlugin();

    if (!_deviceId || !_notifyStarted) {
      _notifyStarted = false;
      _notifyHandler = null;
      return true;
    }

    if (!BLE.stopNotifications) {
      _notifyStarted = false;
      _notifyHandler = null;
      return true;
    }

    try {
      await withTimeout(BLE.stopNotifications({
        deviceId: _deviceId,
        service: SERVICE_UUID,
        characteristic: TX_UUID
      }), 6000, "stopNotifications");
    } catch (e) {
      logBleDebug("stopNotifications error: " + (e && (e.message || e.name || e)));
    } finally {
      _notifyStarted = false;
      _notifyHandler = null;
    }
    return true;
  }

  async function bleDisconnect() {
    mustHavePlugin();
    if (!_deviceId) return;

    try {
      await bleStopNotifications();
      await withTimeout(BLE.disconnect({ deviceId: _deviceId }), 8000, "disconnect");
      setBootStatus("disconnected");
    } catch (e) {
      logBleDebug("disconnect error: " + (e && (e.message || e.name || e)));
    } finally {
      _deviceId = null;
      _notifyStarted = false;
      _notifyHandler = null;
    }
  }

  async function bleGetBondedDevices() {
    mustHavePlugin();
    if (!_initialized) await bleInit();

    try {
      var res = await BLE.getBondedDevices();
      if (res && Array.isArray(res.devices)) return res.devices;
      if (Array.isArray(res)) return res;
      return [];
    } catch (e) {
      logBleDebug("getBondedDevices error: " + (e && (e.message || e.name || e)));
      return [];
    }
  }

  async function bleRequestDevice() {
    mustHavePlugin();
    if (!_initialized) await bleInit();

    setBootStatus("requesting device...");
    try {
      var dev = await withTimeout(BLE.requestDevice({}), 12000, "requestDevice");
      return dev || null;
    } catch (e) {
      logBleDebug("requestDevice error: " + (e && (e.message || e.name || e)));
      return null;
    }
  }

  async function bleWrite(textOrObj) {
    mustHavePlugin();
    if (!_deviceId) throw new Error("Not connected");
    if (!SERVICE_UUID || !RX_UUID) throw new Error("RX UUID not set");

    var value = (typeof textOrObj === "string") ? textOrObj : JSON.stringify(textOrObj);
    var bytes = textToBytes(value);

    for (var offset = 0; offset < bytes.length; offset += WRITE_CHUNK_BYTES) {
      var chunk = bytes.slice(offset, offset + WRITE_CHUNK_BYTES);
      var hex = bytesToHex(chunk);
      await withTimeout(BLE.write({
        deviceId: _deviceId,
        service: SERVICE_UUID,
        characteristic: RX_UUID,
        value: hex
      }), 10000, "write");
    }
  }

  async function bleStartNotifications(onText) {
    mustHavePlugin();
    if (!_deviceId) throw new Error("Not connected");
    if (!SERVICE_UUID || !TX_UUID) throw new Error("TX UUID not set");

    _notifyHandler = onText || null;
    if (_notifyStarted) return true;

    await withTimeout(BLE.startNotifications(
      { deviceId: _deviceId, service: SERVICE_UUID, characteristic: TX_UUID },
      function (res) {
        var txt = b64ToText((res && res.value) ? res.value : "");
        if (_notifyHandler) _notifyHandler(txt);
      }
    ), 10000, "startNotifications");

    _notifyStarted = true;
    return true;
  }

  // expose
  window.BLEBridge = {
    bleInit: bleInit,
    bleScan: bleScan,
    bleConnect: bleConnect,
    bleDisconnect: bleDisconnect,
    bleGetBondedDevices: bleGetBondedDevices,
    bleRequestDevice: bleRequestDevice,
    bleWrite: bleWrite,
    bleStartNotifications: bleStartNotifications,
    bleStopNotifications: bleStopNotifications
  };
})();
