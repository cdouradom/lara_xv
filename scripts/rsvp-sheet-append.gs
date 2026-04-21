/**
 * RSVP → planilha Lara_XV
 * Web App: Executar como = Eu | Quem tem acesso = Qualquer pessoa.
 *
 * Preferido: parâmetro único **g** = JSON array [{"nome":"...","idade":11},...]
 * (vários n0,i0,n1,i1 na query faziam HTTP 400 com 2+ convidados na infra Google.)
 *
 * Fallbacks: c+n0+i0+... ou payload= {"guests":[...]}
 */
var SPREADSHEET_ID = '1-gs_GycqLCKqa1l2B0R9OlK0rIHl6iTurf-HnjypqQw';

function parseUrlEncodedParams_(raw) {
  var out = {};
  if (!raw) return out;
  String(raw).split('&').forEach(function (pair) {
    var eq = pair.indexOf('=');
    if (eq === -1) return;
    var k = decodeURIComponent(pair.substring(0, eq).replace(/\+/g, ' '));
    var v = decodeURIComponent(pair.substring(eq + 1).replace(/\+/g, ' '));
    out[k] = v;
  });
  return out;
}

function effectiveParams_(e) {
  var m = {};
  if (e && e.parameter) {
    for (var k in e.parameter) {
      if (Object.prototype.hasOwnProperty.call(e.parameter, k)) {
        m[k] = e.parameter[k];
      }
    }
  }
  if (e && e.postData && e.postData.contents) {
    var raw = String(e.postData.contents);
    var type = String(e.postData.type || '').toLowerCase();
    if (type.indexOf('application/x-www-form-urlencoded') !== -1 || raw.indexOf('=') !== -1) {
      var parsed = parseUrlEncodedParams_(raw);
      for (var k2 in parsed) {
        if (Object.prototype.hasOwnProperty.call(parsed, k2)) {
          m[k2] = parsed[k2];
        }
      }
    }
  }
  return m;
}

function guestsFromGParam_(p) {
  if (!p || p.g === undefined || p.g === null || String(p.g).trim() === '') {
    return [];
  }
  try {
    var arr = JSON.parse(String(p.g));
    if (!Array.isArray(arr)) return [];
    var out = [];
    for (var i = 0; i < arr.length; i++) {
      var x = arr[i];
      if (!x || typeof x !== 'object') continue;
      var nome = x.nome;
      var idade = x.idade;
      if (nome !== undefined && String(nome).trim() !== '' &&
          idade !== undefined && String(idade).trim() !== '') {
        out.push({ nome: String(nome).trim(), idade: Number(idade) });
      }
    }
    return out;
  } catch (ex) {
    return [];
  }
}

function guestsFromFlatForm_(p) {
  var out = [];
  if (!p) return out;
  var c = parseInt(p.c, 10);
  if (isNaN(c) || c < 1 || c > 50) {
    return out;
  }
  for (var i = 0; i < c; i++) {
    var nk = 'n' + i;
    var ik = 'i' + i;
    var nome = p[nk];
    var idade = p[ik];
    if (nome !== undefined && String(nome).trim() !== '' &&
        idade !== undefined && String(idade).trim() !== '') {
      out.push({ nome: String(nome).trim(), idade: Number(idade) });
    }
  }
  return out;
}

function guestsFromJsonPayload_(p) {
  if (!p || !p.payload) {
    return [];
  }
  var body = JSON.parse(String(p.payload));
  return body.guests || [];
}

function resolveGuests_(e) {
  var p = effectiveParams_(e);
  var guests = guestsFromGParam_(p);
  if (!guests.length) {
    guests = guestsFromFlatForm_(p);
  }
  if (!guests.length) {
    try {
      guests = guestsFromJsonPayload_(p);
    } catch (err) {
      guests = [];
    }
  }
  return guests;
}

function hasRsvpPayload_(p) {
  if (!p) return false;
  if (p.g !== undefined && p.g !== null && String(p.g).trim() !== '') return true;
  if (p.payload !== undefined && p.payload !== null && String(p.payload).trim() !== '') return true;
  if (p.c !== undefined && p.c !== null && String(p.c).trim() !== '' && parseInt(p.c, 10) >= 1) return true;
  return Object.prototype.hasOwnProperty.call(p, 'n0');
}

function appendRows_(guests) {
  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0];
  var ts = new Date();
  for (var j = 0; j < guests.length; j++) {
    var row = guests[j];
    sheet.appendRow([String(row.nome), Number(row.idade), ts]);
  }
}

function jsonOut_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  var p = e && e.parameter ? e.parameter : {};
  if (!hasRsvpPayload_(p)) {
    return ContentService.createTextOutput('OK').setMimeType(ContentService.MimeType.TEXT);
  }
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var guests = resolveGuests_(e);
    if (!guests.length) {
      return jsonOut_({ ok: false, error: 'no_guests' });
    }
    appendRows_(guests);
    return jsonOut_({ ok: true, count: guests.length });
  } catch (err) {
    return jsonOut_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var guests = resolveGuests_(e);
    if (!guests.length) {
      return jsonOut_({ ok: false, error: 'no_guests' });
    }
    appendRows_(guests);
    return jsonOut_({ ok: true, count: guests.length });
  } catch (err) {
    return jsonOut_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}
