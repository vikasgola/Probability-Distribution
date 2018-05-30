/*!
 * Controls.js - controls.js
 * http://controlsjs.com/
 *
 * Copyright (c) 2014 Position s.r.o.  All rights reserved.
 *
 * This version of Controls.js is licensed under the terms of GNU General Public License v3.
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * The commercial license can be purchased at Controls.js website.
 */

/*! Hammer.JS - v1.0.6 - 2014-04-20
* http://eightmedia.github.com/hammer.js
*
* Copyright (c) 2014 Jorik Tangelder <j.tangelder@gmail.com>;
* Licensed under the MIT license */

var ngHTTPProtocol = "http://",
  ua = navigator.userAgent.toLowerCase(),
  ngOpera = ua.indexOf("opera") != -1,
  ngOperaVersion = ngOpera ? parseFloat(window.opera.version()) : undefined,
  ngIExplorer = eval("/*@cc_on!@*/false"),
  ngIExplorerVersion = ngIExplorer
    ? parseInt(ua.match(/msie (\d+)/)[1])
    : undefined;
if (!ngIExplorer && ua.match(/trident/)) {
  var v = ua.match(/rv\:(\d+)/);
  v || (v = ua.match(/msie (\d+)/));
  if (v) {
    ngIExplorer = true;
    ngIExplorerVersion = parseInt(v[1]);
  }
}
var ngIExplorer6 = ngIExplorer && ngIExplorerVersion < 7,
  ngFireFox = ua.indexOf("firefox") != -1,
  ngFireFoxVersion = ngFireFox
    ? parseInt(ua.match(/firefox\/(.*)$/)[1])
    : undefined,
  ngFireFox1x = ngFireFox && ua.indexOf("firefox/1.") != -1,
  ngFireFox2x = ngFireFox && ua.indexOf("firefox/2.") != -1,
  ngChrome = ua.indexOf("chrome") != -1,
  ngSafari = ua.indexOf("safari") != -1,
  ngAndroid = ua.indexOf("android") != -1,
  ngiOS = ua.match(/(ipad|iphone|ipod)/g) ? true : false,
  ngWindowsPhone = ua.indexOf("windows phone") != -1,
  ngFireFoxOS = ngFireFox && ua.indexOf("mobile") != -1,
  ngCordova = typeof window.cordova !== "undefined",
  ngWinStoreApp = typeof Windows !== "undefined",
  ngSupportsTouch =
    "ontouchstart" in window ||
    (window.DocumentTouch && document instanceof DocumentTouch) ||
    navigator.msMaxTouchPoints
      ? true
      : false,
  ngUsingTouch =
    ngSupportsTouch &&
    (ngAndroid ||
      ngiOS ||
      ngWindowsPhone ||
      ua.indexOf("mobile") != -1 ||
      ua.indexOf("tablet") != -1),
  ngFirebug = !!(
    window.console &&
    (window.console.firebug || window.console.exception)
  ),
  ngDEBUG = typeof ngDEBUG === "undefined" ? 0 : ngDEBUG,
  ngASSERT,
  ngDEBUGLOG,
  ngDEBUGWARN,
  ngDEBUGERROR;
(function() {
  if (ngDEBUG && typeof console !== "undefined") {
    var a = console,
      b = function(d, e) {
        return typeof d.bind === "undefined" || typeof d.bind === "unknown"
          ? typeof Function.prototype.bind === "function"
            ? Function.prototype.bind.call(d, e)
            : d
          : d.bind(e);
      };
    ngDEBUGLOG = b(a.log, a);
    ngDEBUGWARN = b(a.warn, a);
    ngDEBUGERROR = b(a.error, a);
    ngASSERT = a.assert
      ? b(a.assert, a)
      : function(d, e) {
          d ||
            ngDEBUGERROR(
              "Assertion failed" + (typeof e === "undefined" ? "" : ": " + e)
            );
        };
  } else {
    ngDEBUG = 0;
    ngDEBUGERROR = ngDEBUGWARN = ngDEBUGLOGEX = ngDEBUGLOG = ngASSERT = a = function() {};
  }
})();
function ngHASDEBUG() {
  return ngDEBUG;
}
function ngHammerJS() {
  return (
    typeof Hammer === "function" &&
    (typeof ngHammerJSDisabled === "undefined" || !ngHammerJSDisabled) &&
    (!ngIExplorer || ngIExplorerVersion >= 9) &&
    (!ngOpera || ngOperaVersion >= 10.5)
  );
}
var ngPointerStartEvents;
function ngPtrStartEvents() {
  if (typeof ngPointerStartEvents === "undefined")
    if (ngHammerJS()) {
      Hammer.READY || Hammer.event.determineEventTypes();
      ngPointerStartEvents = Hammer.EVENT_TYPES[Hammer.EVENT_START].split(" ");
    } else ngPointerStartEvents = ["mousedown"];
  return ngPointerStartEvents;
}
function ngPtrHTMLStartEvents(a, b) {
  var d = ngPtrStartEvents();
  if (typeof a === "object") {
    if (a && a.append)
      for (var e = 0; e < d.length; e++)
        a.append(" on" + d[e] + '="' + b + '"');
  } else for (e = 0; e < d.length; e++) a += " on" + d[e] + '="' + b + '"';
  return a;
}
var ngURLParams = [],
  ngURLParamsParsed = false,
  ngURLDefaultEscaping =
    typeof ngURLDefaultEscaping !== "undefined" ? ngURLDefaultEscaping : 0,
  URL_ESCAPING_UTF8 = 0,
  URL_ESCAPING_UNICODE = 1,
  ngURLSafeChars = { 45: 1, 46: 1, 95: 1, 126: 1 },
  ngHashSafeChars = {
    33: 1,
    36: 1,
    95: 1,
    39: 1,
    40: 1,
    41: 1,
    42: 1,
    44: 1,
    45: 1,
    46: 1,
    38: 1,
    47: 1,
    58: 1,
    59: 1,
    126: 1
  };
function ScreenPt(a, b) {
  this.x = a;
  this.y = b;
}
function ngVal(a, b) {
  return typeof a === "undefined" ? b : a;
}
function ngNullVal(a, b) {
  return typeof a === "undefined" || a === null ? b : a;
}
function ngLibPath(a, b) {
  if (a == "") return ngVal(b, "");
  if (typeof ngLib === "undefined") return "";
  a = a.toLowerCase();
  a = ngLib[a];
  if (!a || typeof a !== "object") return "";
  return ng_URL(ngLibsURL + ngVal(a.path, "") + ngVal(b, ""));
}
function ngLibVersion(a) {
  if (a == "" || typeof ngLib === "undefined") return false;
  a = a.toLowerCase();
  a = ngLib[a];
  if (!a || typeof a !== "object") return false;
  return ngVal(a.version, false);
}
function ng_SetLibsURL(a) {
  if (a != "") {
    if (a.charAt(a.length - 1) == "/") a = a.substring(0, a.length - 1);
    if (ngEmptyURL.substring(0, ngLibsURL.length) == ngLibsURL)
      ngEmptyURL = ng_URL(
        a + ngEmptyURL.substring(ngLibsURL.length, ngEmptyURL.length)
      );
    ngLibsURL = a;
  }
}
function ng_DetectLibsURL(a, b) {
  if (typeof ngLibsURL === "undefined") {
    try {
      a = ngVal(a, 0);
      if (typeof b === "undefined") b = document.getElementsByTagName("script");
      for (var d, e, f = 0; f < b.length; f++)
        if (typeof b[f].src !== "undefined") {
          e = b[f].src;
          switch (a) {
            case 0:
              d = e.indexOf("ng_basic");
              break;
            case 1:
              d = e.indexOf("controls.js");
              break;
            case 2:
              d = e.indexOf("basic.js");
              break;
            case 3:
              d = e.indexOf("controls");
              if (d >= 0 && e.indexOf(".js") < 0) d = -1;
              break;
          }
          if (d >= 0) {
            ngLibsURL = e.substring(0, d);
            d = ngLibsURL.indexOf("://");
            if (d < 0) {
              var g = location.href;
              d = g.indexOf("://");
              if (ngLibsURL.charAt(0) == "/") {
                d = g.indexOf("/", d + 3);
                if (d > 0) g = g.substr(0, d);
              } else {
                var j = g.lastIndexOf("/");
                if (d + 3 < j) g = g.substr(0, j + 1);
              }
              ngLibsURL = g + ngLibsURL;
            }
            return;
          }
        }
    } catch (k) {}
    if (a != 4) ng_DetectLibsURL(++a, b);
    else ngLibsURL = "libs/";
  }
}
var ngPreloadedImages = [],
  ngPreloadImgCnt = 0,
  ngPreloadImgCallback = null;
function ng_PreloadImage(a) {
  var b = ngPreloadedImages[a];
  if (typeof b === "undefined") {
    b = new Image();
    b.onload = ng_PreloadImgDone;
    b.onfailure = ng_PreloadImgDone;
    b.onerror = ng_PreloadImgDone;
    ngPreloadImgCnt++;
    ngPreloadedImages[a] = b;
    b.src = ng_URL(a);
  }
  return b;
}
function ng_PreloadImgDone() {
  ngPreloadImgCnt--;
  if (ngPreloadImgCnt <= 0 && typeof ngPreloadImgCallback === "function") {
    ngPreloadImgCnt = 0;
    var a = ngPreloadImgCallback;
    ngPreloadImgCallback = null;
    a();
  }
}
function ng_PreloadImagesBegin() {
  ngPreloadImgCnt++;
}
function ng_PreloadImagesEnd(a) {
  ngPreloadImgCallback = ngAddEvent(ngPreloadImgCallback, a);
  ng_PreloadImgDone();
}
function ng_ReloadImage(a) {
  delete ngPreloadedImages[a];
  return ng_PreloadImage(a);
}
function ng_AddURLParam(a, b) {
  a += a.indexOf("?") != -1 ? "&" : "?";
  a += b;
  return a;
}
function ng_StripURLParams(a) {
  var b = a.indexOf("?");
  if (b >= 0) a = a.substr(0, b);
  b = a.indexOf("#");
  if (b >= 0) a = a.substr(0, b);
  return a;
}
function ng_URLCWP(a) {
  return ngrpc_domain(a) == window.location.hostname ? ng_StripURLParams(a) : a;
}
function ng_URLStd(a) {
  return a;
}
var ng_URL = ngCordova && ngWindowsPhone ? ng_URLCWP : ng_URLStd;
function ng_unescape(a, b) {
  if (typeof b === "undefined")
    b = /%u[0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F]/.test(a)
      ? 1
      : ngURLDefaultEscaping;
  switch (b) {
    case 0:
      return ng_UTF8ParamDecode(a);
    case 1:
      a = "" + a;
      for (b = a.indexOf("+"); b >= 0; ) {
        a = a.substring(0, b) + "%20" + a.substring(b + 1, a.length);
        b = a.indexOf("+");
      }
      return unescape(a);
  }
  return a;
}
function ng_htmlEncode(a, b) {
  a = "" + a;
  if (a == "") return a;
  a = a.replace(/&/g, "&amp;");
  a = a.replace(/</g, "&lt;");
  a = a.replace(/>/g, "&gt;");
  a = a.replace(/"/g, "&quot;");
  if (ngVal(b, false)) a = a.replace(/\r\n|[\r\n]/g, "<br />");
  return a;
}
function ng_htmlDecode(a, b, d) {
  a = "" + a;
  if (a == "") return a;
  a = a.replace(/\<\/div\>\</g, "</div>\n<");
  if (ngVal(b, false)) a = a.replace(/\r\n|[\r\n]/g, " ");
  a = a.replace(/\<br(|[/ \t].*?)\>/g, "\n");
  a = a.replace(/\<p.*?\>/g, "\n");
  a = a.replace(/\<\/p\>/g, "\n\n");
  a = a.replace(/\<.*?\>/g, "");
  if (d) {
    a = a.replace(/[ \t]*([\r\n])/g, "$1");
    a = a.replace(/[ \t]+/g, " ");
  }
  a = a.replace(/&amp;/g, "&");
  a = a.replace(/&lt;/g, "<");
  a = a.replace(/&gt;/g, ">");
  a = a.replace(/&quot;/g, '"');
  return (a = a.replace(/&nbsp;/g, " "));
}
function ng_sprintf() {
  if (!(!arguments || arguments.length < 1)) {
    var a = arguments[0];
    a = a.replace(/\n/g, "\\n");
    a = a.replace(/\r/g, "\\r");
    var b = /([^%]*)%('.|0|\x20)?(-)?(\d+)?(\.\d+)?(%|b|c|d|u|f|o|s|x|X)(.*)/,
      d,
      e,
      f = 0,
      g = 0;
    for (e = []; (d = b.exec(a)); ) {
      var j = d[1],
        k = d[2],
        n = d[3],
        o = d[4],
        t = d[5],
        q = d[6];
      d = d[7];
      g++;
      if (q == "%") {
        t = "_";
        e[e.length] = j.length;
        q = "";
      } else {
        f++;
        if (f >= arguments.length) {
          ngDEBUGERROR(
            "Error! Not enough function arguments (" +
              (arguments.length - 1) +
              ', excluding the string) for the number of substitution parameters in string "' +
              arguments[0] +
              '".'
          );
          break;
        }
        var u = arguments[f];
        a = "";
        if (k && k.substr(0, 1) == "'") a = k.substr(1, 1);
        else if (k) a = k;
        var x = true;
        if (n && n === "-") x = false;
        k = -1;
        if (o) k = parseInt(o);
        o = -1;
        if (t && q == "f") o = parseInt(t.substring(1));
        t = u;
        switch (q) {
          case "b":
            t = parseInt(u).toString(2);
            break;
          case "c":
            t = String.fromCharCode(parseInt(u));
            break;
          case "d":
            t = parseInt(u) ? parseInt(u) : 0;
            break;
          case "u":
            t = Math.abs(u);
            break;
          case "o":
            t = parseInt(u).toString(8);
            break;
          case "s":
            t = "" + u;
            break;
          case "x":
            t = ("" + parseInt(u).toString(16)).toLowerCase();
            break;
          case "X":
            t = ("" + parseInt(u).toString(16)).toUpperCase();
            break;
          case "f":
            u = parseFloat(u);
            if (isNaN(u)) u = 0;
            if (o > -1) {
              for (
                q = Math.round(u * Math.pow(10, o)).toString();
                q.length < o;

              )
                q = "0" + q;
              t =
                q.substr(0, q.length - o) +
                (o > 0 ? "." + q.substr(q.length - o, o) : "");
            } else t = u;
            break;
        }
        q = k - t.toString().length;
        q = q > 0 ? new Array(q + 1).join(a ? a : " ") : "";
      }
      a = j + (x ? q + t : t + q) + d;
    }
    for (b = 0; b < e.length; b++)
      a = a.substring(0, e[b]) + "%" + a.substring(e[b] + 1, a.length);
    a = a.replace(/\\n/g, "\n");
    return (a = a.replace(/\\r/g, "\r"));
  }
}
function ng_URLEncode(a, b, d, e) {
  var f = "";
  a = "" + a;
  switch (ngVal(e, ngURLDefaultEscaping)) {
    case 0:
      f = ng_UTF8Encode(a, d);
      break;
    case 1:
      e = a.length;
      var g;
      if (typeof d === "undefined") d = ngURLSafeChars;
      b = ngVal(b, false);
      for (var j = 0; j < e; j++) {
        g = a.charCodeAt(j);
        if (
          (g >= 65 && g <= 90) ||
          (g >= 97 && g <= 122) ||
          (g >= 48 && g <= 57) ||
          d[g]
        )
          f += a.charAt(j);
        else if (g == 37) f += "%u0025";
        else {
          if (b) {
            f += "%u";
            if (g <= 255) f += "00";
          } else {
            f += "%";
            if (g > 255) f += "u";
          }
          g = g.toString(16);
          if (g.length % 2 == 1) g = "0" + g;
          f += g;
        }
      }
      break;
    default:
      f = a;
      break;
  }
  return f;
}
function ng_HashEncode(a, b, d) {
  return ng_URLEncode(a, true, ngVal(b, ngHashSafeChars), d);
}
var utf8_decToHexChar = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F"
  ],
  utf8_charCodeToDec = {
    48: 0,
    49: 1,
    50: 2,
    51: 3,
    52: 4,
    53: 5,
    54: 6,
    55: 7,
    56: 8,
    57: 9,
    65: 10,
    66: 11,
    67: 12,
    68: 13,
    69: 14,
    70: 15,
    97: 10,
    98: 11,
    99: 12,
    100: 13,
    101: 14,
    102: 15
  };
function utf8_decToStrHex(a) {
  return utf8_decToHexChar[a >> 4] + utf8_decToHexChar[a & 15];
}
function utf8_strHexToDec(a, b) {
  if (a.charCodeAt(b) == 37) {
    var d = utf8_charCodeToDec[a.charCodeAt(++b)];
    if (typeof d != "undefined") {
      a = utf8_charCodeToDec[a.charCodeAt(++b)];
      if (typeof a !== "undefined") return (d << 4) + a;
    }
  }
  return 0;
}
function ng_UTF8Encode(a, b) {
  var d = a.length,
    e = new String(),
    f = new String(),
    g = new Number(),
    j = 0;
  if (typeof b === "undefined") b = ngURLSafeChars;
  for (i = 0; i < d; i++) {
    g = a.charCodeAt(i);
    if (
      !(
        (g >= 65 && g <= 90) ||
        (g >= 97 && g <= 122) ||
        (g >= 48 && g <= 57) ||
        b[g]
      )
    ) {
      if (g < 128) f = "%" + utf8_decToStrHex(g);
      else {
        if (g < 2048) f = "%" + utf8_decToStrHex((g >> 6) | 192);
        else {
          if (g < 65536) f = "%" + utf8_decToStrHex((g >> 12) | 224);
          else {
            f = "%" + utf8_decToStrHex((g >> 18) | 240);
            f += "%" + utf8_decToStrHex(((g >> 12) & 63) | 128);
          }
          f += "%" + utf8_decToStrHex(((g >> 6) & 63) | 128);
        }
        f += "%" + utf8_decToStrHex((g & 63) | 128);
      }
      if (j < i) e += a.substring(j, i);
      e += f;
      j = i + 1;
    }
  }
  if (j) {
    if (j < d) e += a.substring(j, d);
    return e;
  }
  return a;
}
function ng_UTF8Decode(a) {
  for (
    var b = a.length,
      d = new String(),
      e = 0,
      f = 0,
      g = 0,
      j = 0,
      k = 0,
      n = 0,
      o = 0,
      t = 0;
    o < b;

  )
    if ((g = utf8_strHexToDec(a, o))) {
      e = 0;
      if (g < 128) {
        f = 3;
        e = g;
      } else if (g < 192) f = 3;
      else if (g < 224) {
        f = 6;
        j = utf8_strHexToDec(a, o + 3);
        if (j > 127 && j < 192) e = ((g & 31) << 6) | (j & 63);
      } else if (g < 240) {
        f = 9;
        j = utf8_strHexToDec(a, o + 3);
        if (j > 127 && j < 192) {
          k = utf8_strHexToDec(a, o + 6);
          if (k > 127 && k < 192)
            e = ((g & 15) << 12) | ((j & 63) << 6) | (k & 63);
        }
      } else {
        f = 12;
        j = utf8_strHexToDec(a, o + 3);
        if (j > 127 && j < 192) {
          k = utf8_strHexToDec(a, o + 6);
          if (k > 127 && k < 192) {
            n = utf8_strHexToDec(a, o + 9);
            if (n > 127 && n < 192)
              e =
                ((g & 7) << 18) | ((j & 63) << 12) | ((k & 63) << 6) | (n & 63);
          }
        }
      }
      if (e) {
        if (t < o) d += a.substring(t, o);
        d += String.fromCharCode(e);
        o += f;
        t = o;
      } else o += f;
    } else o++;
  if (t) {
    if (t < b) d += a.substring(t, b);
    return d;
  }
  return a;
}
function ng_UTF8ParamEncode(a) {
  return ng_UTF8Encode(a);
}
function ng_UTF8ParamDecode(a) {
  a = "" + a;
  for (var b = a.indexOf("+"); b >= 0; ) {
    a = a.substring(0, b) + "%20" + a.substring(b + 1, a.length);
    b = a.indexOf("+");
  }
  return ng_UTF8Decode(a);
}
function ng_inDOM(a) {
  if (typeof a === "object")
    for (; a; ) {
      if (a.tagName == "BODY") return true;
      a = a.parentNode;
    }
  return false;
}
function ng_containsDOM(a, b) {
  var d = false;
  do {
    if ((d = a == b)) break;
    b = b.parentNode;
  } while (b != null);
  return d;
}
function ng_WindowWidth() {
  var a = 0;
  if (typeof window.innerWidth == "number") a = window.innerWidth;
  else if (document.documentElement && document.documentElement.clientWidth)
    a = document.documentElement.clientWidth;
  else if (document.body && document.body.clientWidth)
    a = document.body.clientWidth;
  a || (a = 100);
  return a;
}
function ng_WindowHeight() {
  var a = 0;
  if (typeof window.innerHeight == "number") a = window.innerHeight;
  else if (document.documentElement && document.documentElement.clientHeight)
    a = document.documentElement.clientHeight;
  else if (document.body && document.body.clientHeight)
    a = document.body.clientHeight;
  a || (a = 100);
  return a;
}
function ng_SetInnerHTML_Std(a, b, d) {
  if (d) {
    if (b === "") return;
    b = a.innerHTML + b;
  }
  a.innerHTML = b;
}
function ng_SetInnerHTML_WinStore(a, b, d) {
  MSApp.execUnsafeLocalFunction(function() {
    if (d) {
      if (b === "") return;
      b = a.innerHTML + b;
    }
    a.innerHTML = b;
  });
}
var ng_SetInnerHTML = ngWinStoreApp
  ? ng_SetInnerHTML_WinStore
  : ng_SetInnerHTML_Std;
function ng_AppendInnerHTML(a, b) {
  ng_SetInnerHTML(a, b, true);
}
function ng_DocumentDeselect() {
  if (document.selection && document.selection.empty)
    document.selection.empty();
  else window.getSelection && window.getSelection().removeAllRanges();
}
function ng_DocumentScrollX() {
  var a = 0;
  if (typeof window.pageYOffset == "number") a = window.pageXOffset;
  else if (
    document.body &&
    (document.body.scrollLeft || document.body.scrollTop)
  )
    a = document.body.scrollLeft;
  else if (
    document.documentElement &&
    (document.documentElement.scrollLeft || document.documentElement.scrollTop)
  )
    a = document.documentElement.scrollLeft;
  return a;
}
function ng_DocumentScrollY() {
  var a = 0;
  if (typeof window.pageYOffset == "number") a = window.pageYOffset;
  else if (
    document.body &&
    (document.body.scrollLeft || document.body.scrollTop)
  )
    a = document.body.scrollTop;
  else if (
    document.documentElement &&
    (document.documentElement.scrollLeft || document.documentElement.scrollTop)
  )
    a = document.documentElement.scrollTop;
  return a;
}
function ng_findPosX(a) {
  var b = 0;
  if (a.offsetParent)
    for (; a.offsetParent; ) {
      b += a.offsetLeft;
      a = a.offsetParent;
    }
  else if (a.x) b += a.x;
  return b;
}
function ng_findPosY(a) {
  var b = 0;
  if (a.offsetParent)
    for (; a.offsetParent; ) {
      b += a.offsetTop;
      a = a.offsetParent;
    }
  else if (a.y) b += a.y;
  return b;
}
function ng_findMousePosX(a) {
  var b = 0;
  if (a.offsetParent)
    for (; a.offsetParent; ) {
      b += a.offsetLeft;
      b -= a.scrollLeft;
      if (ngFireFox)
        b +=
          ng_GetCurrentStyle(a, "overflow") !== "auto" ||
          ngFireFox1x ||
          ngFireFox2x
            ? 2 * ng_GetCurrentStylePx(a, "border-left-width")
            : ng_GetCurrentStylePx(a, "border-left-width");
      else ngOpera || (b += ng_GetCurrentStylePx(a, "border-left-width"));
      a = a.offsetParent;
    }
  else if (a.x) b += a.x;
  b -= ng_DocumentScrollX();
  return b;
}
function ng_findMousePosY(a) {
  var b = 0;
  if (a.offsetParent)
    for (; a.offsetParent; ) {
      b += a.offsetTop;
      b -= a.scrollTop;
      if (ngFireFox)
        b +=
          ng_GetCurrentStyle(a, "overflow") !== "auto" ||
          ngFireFox1x ||
          ngFireFox2x
            ? 2 * ng_GetCurrentStylePx(a, "border-top-width")
            : ng_GetCurrentStylePx(a, "border-top-width");
      else ngOpera || (b += ng_GetCurrentStylePx(a, "border-top-width"));
      a = a.offsetParent;
    }
  else if (a.y) b += a.y;
  b -= ng_DocumentScrollY();
  return b;
}
function ng_ParentPosition(a, b) {
  a = a;
  var d,
    e = {};
  e.x = 0;
  e.y = 0;
  if (typeof b === "undefined") b = document.body;
  for (; a && a != b; ) {
    d = a.offsetParent;
    e.x += a.offsetLeft + ng_GetCurrentStylePx(a, "border-left-width");
    e.y += a.offsetTop + ng_GetCurrentStylePx(a, "border-top-width");
    if (d && d != b) {
      e.x -= d.scrollLeft;
      e.y -= d.scrollTop;
    }
    if (ngFireFox) {
      if (
        ng_GetCurrentStyle(a, "overflow") !== "auto" ||
        ngFireFox1x ||
        ngFireFox2x
      ) {
        e.x += ng_GetCurrentStylePx(a, "border-left-width");
        e.y += ng_GetCurrentStylePx(a, "border-top-width");
      }
    } else if (ngOpera) {
      e.x -= ng_GetCurrentStylePx(a, "border-left-width");
      e.y -= ng_GetCurrentStylePx(a, "border-top-width");
    }
    a = d;
  }
  return e;
}
function ng_nullAttr(a) {
  if (typeof a === "number") return false;
  if (typeof a === "string" && a == "") return true;
  if (typeof a === "object" && a == null) return true;
  return false;
}
function ng_GetStylePx2(a) {
  a = ngVal(a, "");
  if (a != "") {
    if (a.length > 2 && a.substring(a.length - 2) == "px")
      a = ng_GetStylePx(a.substring(0, a.length - 2));
    return a;
  }
}
function ng_GetStylePx(a) {
  var b = typeof a;
  if (b === "number") return a;
  if (a == "" || b === "undefined") return 0;
  a = parseInt(a, 10);
  return isNaN(a) ? 0 : a;
}
function ng_GetCurrentStyle(a, b) {
  var d;
  if (document.defaultView && document.defaultView.getComputedStyle) {
    if ((a = document.defaultView.getComputedStyle(a, "")))
      d = a.getPropertyValue(b);
  } else if (a.currentStyle) {
    b = b.replace(/\-(\w)/g, function(e, f) {
      return f.toUpperCase();
    });
    d = a.currentStyle[b];
  }
  return d;
}
function ng_BeginMeasureElement(a) {
  if (a && (!a.offsetHeight || !a.offsetWidth)) {
    if (typeof a.measure_info !== "undefined") return a.measure_info;
    for (
      var b = [], d = a, e = ngIExplorer ? "" : "inherit";
      d && d != document;

    ) {
      if (typeof d.measure_info !== "undefined") break;
      if (d && d.style && d.style.display === "none") {
        b.push(d);
        d.style.display = e;
      }
      d = d.parentNode;
    }
    if (b.length) return (a.measure_info = b);
  }
}
function ng_EndMeasureElement(a) {
  if (a && typeof a.measure_info !== "undefined") {
    var b = a.measure_info;
    a.measure_info = void 0;
    for (var d = b.length - 1; d >= 0; d--)
      if ((a = b[d]) && a.style) a.style.display = "none";
  }
}
function ng_GetCurrentStylePx(a, b) {
  return ng_GetStylePx(ng_GetCurrentStyle(a, b));
}
function ng_StyleWidth(a) {
  return typeof a.style.pixelWidth !== "undefined"
    ? ng_GetStylePx(a.style.pixelWidth)
    : ng_GetStylePx(a.style.width);
}
function ng_StyleHeight(a) {
  return typeof a.style.pixelHeight !== "undefined"
    ? ng_GetStylePx(a.style.pixelHeight)
    : ng_GetStylePx(a.style.height);
}
function ng_SetStyleWidth(a, b) {
  if (typeof a.style.pixelWidth !== "undefined") a.style.pixelWidth = b;
  else a.style.width = b + "px";
}
function ng_SetStyleHeight(a, b) {
  if (typeof a.style.pixelHeight !== "undefined") a.style.pixelHeight = b;
  else a.style.height = b + "px";
}
function ng_OuterWidth(a) {
  var b = ng_GetStylePx(a.offsetWidth);
  if (!b) {
    ng_BeginMeasureElement(a);
    b = ng_GetStylePx(a.offsetWidth);
    ng_EndMeasureElement(a);
  }
  return (
    b +
    ng_GetCurrentStylePx(a, "margin-left") +
    ng_GetCurrentStylePx(a, "margin-right")
  );
}
function ng_OuterHeight(a) {
  var b = ng_GetStylePx(a.offsetHeight);
  if (!b) {
    ng_BeginMeasureElement(a);
    b = ng_GetStylePx(a.offsetHeight);
    ng_EndMeasureElement(a);
  }
  return (
    b +
    ng_GetCurrentStylePx(a, "margin-top") +
    ng_GetCurrentStylePx(a, "margin-bottom")
  );
}
function ng_SetOuterWidth(a, b) {
  b -=
    ng_GetCurrentStylePx(a, "margin-left") +
    ng_GetCurrentStylePx(a, "margin-right");
  b -=
    ng_GetCurrentStylePx(a, "border-left-width") +
    ng_GetCurrentStylePx(a, "border-right-width");
  b -=
    ng_GetCurrentStylePx(a, "padding-left") +
    ng_GetCurrentStylePx(a, "padding-right");
  ng_SetStyleWidth(a, b);
}
function ng_SetOuterHeight(a, b) {
  b -=
    ng_GetCurrentStylePx(a, "margin-top") +
    ng_GetCurrentStylePx(a, "margin-bottom");
  b -=
    ng_GetCurrentStylePx(a, "border-top-width") +
    ng_GetCurrentStylePx(a, "border-bottom-width");
  b -=
    ng_GetCurrentStylePx(a, "padding-top") +
    ng_GetCurrentStylePx(a, "padding-bottom");
  ng_SetStyleHeight(a, b);
}
function ng_ClientWidth(a) {
  if (!a) return 0;
  var b = ng_GetStylePx(a.clientWidth);
  if (!b) {
    ng_BeginMeasureElement(a);
    b = ng_GetStylePx(a.clientWidth);
    ng_EndMeasureElement(a);
    if (!b) {
      b = ng_StyleWidth(a);
      b +=
        ng_GetCurrentStylePx(a, "padding-left") +
        ng_GetCurrentStylePx(a, "padding-right");
    }
  }
  return b;
}
function ng_ClientHeight(a) {
  if (!a) return 0;
  var b = ng_GetStylePx(a.clientHeight);
  if (!b) {
    ng_BeginMeasureElement(a);
    b = ng_GetStylePx(a.clientHeight);
    ng_EndMeasureElement(a);
    if (!b) {
      b = ng_StyleHeight(a);
      b +=
        ng_GetCurrentStylePx(a, "padding-top") +
        ng_GetCurrentStylePx(a, "padding-bottom");
    }
  }
  return b;
}
function ng_SetClientWidth(a, b) {
  b -=
    ng_GetCurrentStylePx(a, "padding-left") +
    ng_GetCurrentStylePx(a, "padding-right");
  ng_SetStyleWidth(a, b);
}
function ng_SetClientHeight(a, b) {
  b -=
    ng_GetCurrentStylePx(a, "padding-top") +
    ng_GetCurrentStylePx(a, "padding-bottom");
  ng_SetStyleHeight(a, b);
}
function ng_setLeftTopNotIE(a, b, d) {
  a.style.left = b + "px";
  a.style.top = d + "px";
}
function ng_setLeftTopIE(a, b, d) {
  a.style.pixelLeft = b;
  a.style.pixelTop = d;
}
var ng_setLeftTop = ngIExplorer ? ng_setLeftTopIE : ng_setLeftTopNotIE;
function ng_setBoundsNotIE(a, b, d, e, f) {
  a.style.left = b + "px";
  a.style.top = d + "px";
  a.style.width = e + "px";
  a.style.height = f + "px";
}
function ng_setBoundsIE(a, b, d, e, f) {
  a.style.pixelLeft = b;
  a.style.pixelTop = d;
  a.style.pixelWidth = e;
  a.style.pixelHeight = f;
}
var ng_setBounds = ngIExplorer ? ng_setBoundsIE : ng_setBoundsNotIE;
function ng_ProcessURLParams2(a, b) {
  if (a != "") {
    a = a.split(b);
    for (b = 0; b < a.length; b++) {
      s = a[b].split("=");
      if (s[0].substr(0, 4) == "amp;") s[0] = s[0].substr(4);
      ngURLParams[ng_unescape(s[0])] = s.length > 1 ? ng_unescape(s[1]) : null;
    }
  }
}
function ng_ProcessURLParams(a) {
  ngURLParams = [];
  a = ngVal(a, window.location.href);
  var b = a.indexOf("?"),
    d = a.indexOf("#"),
    e = "",
    f = "";
  if (d >= 0) {
    f = a.substr(d + 1);
    a = a.substr(0, d);
  }
  if (b >= 0) e = a.substr(b + 1);
  ng_ProcessURLParams2(e, "&");
  ng_ProcessURLParams2(f, "@");
  ngURLParamsParsed = true;
}
function ng_GET(a) {
  ngURLParamsParsed || ng_ProcessURLParams();
  return ngURLParams[a];
}
function ng_GetURLSafeCharsEncoded() {
  if (typeof ngURLSafeCharsEncoded == "undefined") {
    ngURLSafeCharsEncoded = {};
    for (var a in ngURLSafeChars)
      ngURLSafeCharsEncoded[
        "%" + parseInt(a).toString(16)
      ] = String.fromCharCode(a);
  }
  return ngURLSafeCharsEncoded;
}
function ng_Redirect(a, b) {
  a = ng_URL(a);
  b = ngVal(b, true);
  try {
    var d = parent;
    if (b && d != window) {
      for (; d; ) {
        if (d.parent == d) break;
        d = d.parent;
      }
      d.location.href = a;
    } else document.location.href = a;
    return true;
  } catch (e) {
    return false;
  }
}
function ng_InIFRAME() {
  return parent != window;
}
function ng_SetByRef(a, b, d) {
  if (!(!a || !b || b == "")) {
    if (typeof a._byRef === "undefined") a._byRef = {};
    a._byRef[b] = true;
    if (arguments.length > 2) a[b] = d;
  }
}
function ng_SetByVal(a, b, d) {
  if (!(!a || !b || b == "")) {
    a._byRef && delete a._byRef[b];
    if (arguments.length > 2) a[b] = ng_CopyVar(d);
  }
}
function ng_CopyVar(a) {
  var b = { cnt: 0, src: [], dst: [] };
  a = ng_copyvar_int(a, b);
  b.cnt != 0 && b.src.length && ng_copyvar_fixref(a, b);
  return a;
}
function ng_type_date(a) {
  return Object.prototype.toString.call(a) === "[object Date]";
}
function ng_copyvar_int(a, b) {
  if (a && typeof a === "object") {
    if (ng_type_date(a)) return new Date(a);
    var d;
    if (typeof a.length === "number") {
      var e;
      d = [];
      for (var f in a)
        if (a.hasOwnProperty(f)) {
          e = typeof f !== "number" ? parseInt(f) : f;
          if (isNaN(e) || e < 0 || e >= a.length) {
            d = null;
            break;
          }
          d[f] = ng_copyvar_int(a[f], b);
        }
      if (d) return d;
    }
    d = {};
    b.src[b.src.length] = a;
    b.dst[b.dst.length] = d;
    if ((e = a._byRef))
      for (f in a)
        if (e[f]) {
          d[f] = a[f];
          b.cnt++;
        } else d[f] = ng_copyvar_int(a[f], b);
    else for (f in a) d[f] = ng_copyvar_int(a[f], b);
    typeof d.__clone === "function" && d.__clone(a);
    return d;
  }
  return a;
}
function ng_copyvar_fixref(a, b) {
  if (!(!a || typeof a !== "object" || ng_type_date(a))) {
    if (typeof a.length === "number") {
      var d,
        e = true;
      for (var f in a)
        if (a.hasOwnProperty(f)) {
          d = typeof f !== "number" ? parseInt(f) : f;
          if (isNaN(d) || d < 0 || d >= a.length) {
            e = false;
            break;
          }
          ng_copyvar_fixref(a[f], b);
        }
      if (e) return;
    }
    if ((d = a._byRef))
      for (f in a) {
        if (d[f]) {
          for (e = 0; e < b.src.length; e++)
            if (a[f] == b.src[e]) {
              a[f] = b.dst[e];
              break;
            }
          b.cnt--;
        } else ng_copyvar_fixref(a[f], b);
        if (!b.cnt) break;
      }
    else
      for (f in a) {
        ng_copyvar_fixref(a[f], b);
        if (!b.cnt) break;
      }
  }
}
var merge_undefined;
function ng_MergeVar(a, b, d, e) {
  if (
    !(
      !a ||
      typeof a !== "object" ||
      ng_type_date(a) ||
      typeof b !== "object" ||
      ng_type_date(b)
    )
  ) {
    ngVal(d, false) || (b = ng_CleanUndefined(ng_CopyVar(b)));
    if (!(typeof e === "function" && !ngVal(e(a, b), true)))
      if (!(typeof a.__merge === "function" && !ngVal(a.__merge(b), true))) {
        d = a._byRef;
        var f = {};
        for (var g in a) f[g] = true;
        if (b && (d || b._byRef)) {
          var j = b._byRef;
          for (g in b)
            if (f[g] !== true)
              a[g] = (!j || !j[g]) && (!d || !d[g]) ? ng_CopyVar(b[g]) : b[g];
            else if ((!j || !j[g]) && (!d || !d[g]) && !ng_IsArrayVar(a[g]))
              ng_MergeVar(a[g], b[g], true, e);
        } else
          for (g in b)
            if (f[g] !== true) a[g] = ng_CopyVar(b[g]);
            else ng_IsArrayVar(a[g]) || ng_MergeVar(a[g], b[g], true, e);
      }
  }
}
function ng_CleanUndefined(a) {
  if (!a || typeof a !== "object" || ng_type_date(a)) return a;
  var b = a._byRef,
    d = [];
  for (var e in a)
    if (typeof a[e] === "undefined") d.push(e);
    else if ((!b || !b[e]) && !ng_IsArrayVar(a[e])) ng_CleanUndefined(a[e]);
  for (e = d.length - 1; e >= 0; e--) delete a[d[e]];
  return a;
}
function ng_VarEquals(a, b, d) {
  if (a === b) return true;
  if (typeof a !== typeof b) return a == b;
  if (typeof a !== "object") return false;
  var e = ng_type_date(a),
    f = ng_type_date(b);
  if (e || f) return e == f && a.getTime() == b.getTime();
  if (a || b) {
    if (!a || !b || d) return false;
    if (typeof a.__equals === "function") return ngVal(a.__equals(b), false);
    if (typeof b.__equals === "function") return ngVal(b.__equals(a), false);
    d = {};
    for (var g in a) d[g] = true;
    for (g in b) d[g] = true;
    delete d._byRef;
    e = a._byRef;
    f = b._byRef;
    for (g in d)
      if (!ng_VarEquals(a[g], b[g], (e && e[g]) || (f && f[g]))) return false;
  }
  return true;
}
function ng_IsArrayVar(a) {
  if (typeof a !== "object" || !a) return false;
  if (typeof a.length === "number") {
    var b,
      d = true;
    for (var e in a)
      if (a.hasOwnProperty(e)) {
        b = typeof e !== "number" ? parseInt(e) : e;
        if (isNaN(b) || b < 0 || b >= a.length) {
          d = false;
          break;
        }
      }
    if (d) return true;
  }
  return false;
}
function ng_EmptyVar(a) {
  switch (typeof a) {
    case "undefined":
      return true;
    case "string":
      return a == "";
    case "integer":
      return a == 0;
    case "object":
      if (!a) return true;
      if (a.length > 0) return false;
      for (var b in a) return false;
      return true;
    case "boolean":
      return !a;
  }
  return false;
}
function ngAddEvent(a, b) {
  if (typeof b == "function") {
    if (typeof a == "function")
      return function() {
        var d = a.apply(this, arguments),
          e = b.apply(this, arguments);
        return typeof d === typeof e && d == e ? d : undefined;
      };
    return b;
  }
  return a;
}
function ngObjAddEvent(a, b, d) {
  var e = false;
  if (typeof b === "string") {
    e = b;
    b = a;
    a = e;
    e = true;
  }
  if (ng_IsArrayVar(b))
    if (e)
      for (var f = b.length - 1; f >= 0; f--)
        ngObjAddEvent.apply(this, [b[f], a, d]);
    else for (f = 0; f < b.length; f++) ngObjAddEvent.apply(this, [a, b[f], d]);
  else if (typeof b === "function")
    if (typeof this[a] === "function") {
      var g = this[a].events;
      if (typeof g === "undefined") {
        f = this[a];
        if (d && b === f) return;
        g = [];
        this[a] = function() {
          for (var j, k, n = 0; n < g.length; n++) {
            j = g[n].apply(this, arguments);
            if (n) {
              if (j !== k) k = void 0;
            } else k = j;
          }
          return k;
        };
        this[a].events = g;
        g.push(f);
      }
      if (d) for (f = 0; f < g.length; f++) if (g[f] === b) return;
      e ? g.splice(0, 0, b) : g.push(b);
    } else this[a] = b;
}
function ngObjRemoveEvent(a, b) {
  if (ng_IsArrayVar(b))
    for (var d = 0; d < b.length; d++) ngObjRemoveEvent.apply(this, [a, b[d]]);
  else if (typeof b == "function")
    if (this[a])
      if (this[a] === b) this[a] = null;
      else {
        var e = this[a].events;
        if (typeof e !== "undefined") {
          for (d = e.length - 1; d >= 0; d--) e[d] === b && e.splice(d, 1);
          if (e.length) {
            if (e.length == 1) {
              this[a] = e[0];
              delete this[a].events;
            }
          } else {
            this[a] = null;
            delete this[a].events;
          }
        }
      }
}
function ngSetCookie(a, b, d, e, f, g, j) {
  j = ngVal(j, true);
  a = a + "=" + (j ? ng_URLEncode(b) : b);
  if (typeof d !== "undefined") a += "; expires=" + d.toGMTString();
  if (e) a += "; path=" + escape(e);
  if (f) a += "; domain=" + escape(f);
  if (g) a += "; secure";
  document.cookie = a;
}
function ngCookieExpires(a) {
  var b = new Date();
  b.setTime(b.getTime() + a * 1e3);
  return b;
}
function ngDeleteCookie(a, b, d, e) {
  ngSetCookie(a, "", ngCookieExpires(-1), b, d, e);
}
function ngGetCookie(a) {
  return (a = document.cookie.match("(^|;) ?" + a + "=([^;]*)(;|$)"))
    ? ng_unescape(a[2])
    : undefined;
}
function ngSetCookieByURL(a, b, d, e, f) {
  var g = false,
    j,
    k,
    n = e.indexOf("://");
  if (n >= 0) {
    if (e.substring(0, n) == "https") g = true;
    e = e.substring(n + 3, e.length);
    n = e.indexOf("/");
    if (n >= 0) {
      j = e.substring(0, n);
      e = e.substring(n, e.length);
      n = e.indexOf("?");
      if (n >= 0) e = e.substring(0, n);
      k = e;
    } else j = e;
    if (typeof j === "string") {
      n = j.indexOf(".");
      n >= 0 && j.substring(n + 1, j.length);
    }
  } else {
    n = e.indexOf("?");
    if (n >= 0) e = e.substring(0, n);
    k = e;
  }
  ngSetCookie(a, b, d, k, undefined, g, f);
}
var rpcNone = 0,
  rpcAuto = 1,
  rpcScript = 2,
  rpcIFrame = 3,
  rpcHttpRequest = 4,
  rpcHttpRequestPOST = 5,
  rpcHttpRequestGET = 6,
  rpcJSON = 7,
  rpcJSONPOST = 8,
  rpcJSONGET = 9,
  rpcData = 10,
  rpcDataPOST = 11,
  rpcDataGET = 12,
  rpcUser = 99,
  rpcMaxGetLength = 2e3,
  ngOnRPCCreated = null,
  ngOnAnyRPCRequest = null,
  ngRPCLastID = 0,
  ngRPCByID = [];
function getRPCByID(a) {
  a = "" + ngVal(a, "");
  if (a == "" || !ngRPCByID) return null;
  return ngVal(ngRPCByID[a], null);
}
var rpcHeadElement = null;
function ngrpc_sendScriptRequest(a) {
  if (this.OnSendRequest && !ngVal(this.OnSendRequest(this, a, null), false))
    return true;
  if (!rpcHeadElement) {
    rpcHeadElement = document.getElementsByTagName("head").item(0);
    if (!rpcHeadElement) return false;
  }
  var b = this.id + "S",
    d = document.getElementById(b);
  d && rpcHeadElement.removeChild(d);
  d = document.createElement("script");
  d.setAttribute("src", ng_URL(a));
  d.setAttribute("id", b);
  rpcHeadElement.appendChild(d);
  this.OnRequestSent && this.OnRequestSent(this, a, null);
  return true;
}
function ngrpc_sendIFrameRequest(a, b) {
  var d = this.id + "F",
    e = document.getElementById(d);
  if (!e) {
    e = document.createElement("iframe");
    e.id = d;
    e.style.visibility = "hidden";
    document.body.appendChild(e);
  }
  d = e.contentDocument ? e.contentDocument : e.contentWindow.document;
  if (!d) return false;
  try {
    d.open();
    d.write(
      '<html><body><form action="' +
        ng_URL(a) +
        '" method="' +
        (ng_EmptyVar(this.HTTPMethod) ? "POST" : this.HTTPMethod) +
        '" id="' +
        this.id +
        '">'
    );
    var f;
    if (typeof b === "object") {
      if (ngURLDefaultEscaping == 0) ngURLDefaultEscaping = -1;
      try {
        for (var g in b) {
          f = this.EncodeParam(g, b[g]);
          typeof f !== "undefined" &&
            d.write(
              '<input type="hidden" name="' +
                ng_htmlEncode(g) +
                '" value="' +
                ng_htmlEncode(f) +
                '" />'
            );
        }
      } finally {
        if (ngURLDefaultEscaping == -1) ngURLDefaultEscaping = 0;
      }
    }
    if (this.OnIFrameRequest && !ngVal(this.OnIFrameRequest(this, d, a), false))
      return false;
    d.write("</form></body></html>");
    d.close();
  } catch (j) {
    return false;
  }
  if (this.OnSendRequest && !ngVal(this.OnSendRequest(this, a, d), false))
    return true;
  if ((b = d.getElementById(this.id))) {
    b.submit();
    this.OnRequestSent && this.OnRequestSent(this, a, d);
    return true;
  }
  return false;
}
function ngrpc_sendHttpRequest(a, b, d) {
  d.URL = a;
  if (this.OnSendRequest)
    if (!ngVal(this.OnSendRequest(this, d.URL, d), false)) return true;
  d.PostParams = ngVal(d.PostParams, null);
  d.ReqHeaders = ngVal(d.ReqHeaders, null);
  d.Method = ngVal(
    d.Method,
    ng_EmptyVar(this.HTTPMethod)
      ? typeof d.PostParams === "string"
        ? "POST"
        : "GET"
      : this.HttpMethod
  );
  var e = null;
  try {
    if (window.XMLHttpRequest) e = new XMLHttpRequest();
    else
      try {
        e = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (f) {
        e = new ActiveXObject("Microsoft.XMLHTTP");
      }
    if (!e && window.createRequest) e = window.createRequest();
  } catch (g) {
    return false;
  }
  if (!e) return false;
  d.XMLHttp = e;
  if (b) {
    var j = this;
    e.onreadystatechange = function() {
      if (
        !(
          j.OnHTTPReadyStateChanged &&
          !ngVal(j.OnHTTPReadyStateChanged(j, e), false)
        )
      )
        if (e.readyState == 4)
          if (e.status == 200 || e.status == 304 || e.status == 0)
            b(j, e.responseText, e);
          else j.OnHTTPRequestFailed && j.OnHTTPRequestFailed(j, e);
    };
  }
  if (typeof d.PostParams === "string") {
    if (!d.ReqHeaders) d.ReqHeaders = {};
    if (typeof d.ReqHeaders["Content-type"] === "undefined")
      d.ReqHeaders["Content-type"] = "application/x-www-form-URLencoded";
    if (typeof d.ReqHeaders["Content-length"] === "undefined")
      d.ReqHeaders["Content-length"] = d.PostParams.length;
    if (typeof d.ReqHeaders.Connection === "undefined")
      d.ReqHeaders.Connection = "close";
  }
  if (this.OnHTTPRequest && !ngVal(this.OnHTTPRequest(this, d), false))
    return false;
  e.open(d.Method, ng_URL(d.URL), b ? true : false);
  if (d.ReqHeaders)
    for (var k in d.ReqHeaders) e.setRequestHeader(k, d.ReqHeaders[k]);
  e.send(d.PostParams);
  this.OnRequestSent && this.OnRequestSent(this, d.URL, d);
  return b ? true : e.responseText;
}
function ngrpc_EncodeParam(a, b) {
  if (typeof b === "undefined") return b;
  if (this.OnEncodeParam) b = this.OnEncodeParam(this, a, b);
  else {
    if (typeof b === "object" && b)
      if (typeof b.GetText === "function") b = b.GetText();
      else if (typeof b.toString === "function") b = b.toString();
    b = ng_URLEncode(b);
  }
  return b;
}
function ngrpc_GetURLParams() {
  var a,
    b = "";
  for (var d in this.Params) {
    a = this.EncodeParam(d, this.Params[d]);
    if (typeof a !== "undefined") {
      if (b != "") b += "&";
      b += d + "=" + a;
    }
  }
  return b;
}
function ngrpc_domain(a) {
  var b = a.indexOf("://");
  if (b < 0) return window.location.hostname;
  a = a.substring(b + 3, a.length);
  b = a.indexOf("/");
  if (b >= 0) a = a.substring(0, b);
  b = a.indexOf(":");
  if (b >= 0) a = a.substring(0, b);
  return a;
}
function ngrpc_sendRequest(a, b) {
  if (this.Type == rpcNone) return false;
  a = ngVal(a, this.URL);
  b = ngVal(b, this.nocache);
  if (this.OnRequest || ngOnAnyRPCRequest) {
    b = { URL: a, nocache: b };
    if (this.OnRequest && !ngVal(this.OnRequest(this, b), false)) return false;
    if (ngOnAnyRPCRequest && !ngVal(ngOnAnyRPCRequest(this, b), false))
      return false;
    a = b.URL;
    b = b.nocache;
  }
  if (b) a = ng_AddURLParam(a, "_t=" + new Date().getTime());
  b = "";
  var d = this.Type;
  switch (this.Type) {
    case rpcAuto:
    case rpcScript:
    case rpcHttpRequest:
    case rpcHttpRequestPOST:
    case rpcHttpRequestGET:
    case rpcJSON:
    case rpcJSONPOST:
    case rpcJSONGET:
    case rpcData:
    case rpcDataPOST:
    case rpcDataGET:
      b = this.GetURLParams();
      if (
        d === rpcAuto ||
        d === rpcHttpRequest ||
        d === rpcJSON ||
        d === rpcData
      )
        if (
          d === rpcAuto &&
          !ngWinStoreApp &&
          ngrpc_domain(a) != window.location.hostname
        )
          d = rpcScript;
        else {
          d = rpcHttpRequest;
          var e = a.indexOf("?");
          if (e >= 0) {
            b = ng_AddURLParam(a.substr(e, a.length), b);
            if (b.length && b.charAt(0) == "?") b = b.substr(1, b.length);
            a = a.substr(0, e);
          }
          if (b.length > rpcMaxGetLength)
            switch (this.Type) {
              case rpcAuto:
              case rpcHttpRequest:
                d = rpcHttpRequestPOST;
                break;
              case rpcJSON:
                d = rpcJSONPOST;
                break;
              case rpcData:
                d = rpcDataPOST;
                break;
            }
          else
            switch (this.Type) {
              case rpcAuto:
              case rpcHttpRequest:
                d = rpcHttpRequestGET;
                break;
              case rpcJSON:
                d = rpcJSONGET;
                break;
              case rpcData:
                d = rpcDataGET;
                break;
            }
        }
      break;
  }
  switch (d) {
    case rpcScript:
      if (b != "") a = ng_AddURLParam(a, b);
      return this.sendScriptRequest(a);
    case rpcIFrame:
      return this.sendIFrameRequest(a, this.Params);
    case rpcHttpRequestPOST:
    case rpcHttpRequestGET:
    case rpcJSONPOST:
    case rpcJSONGET:
    case rpcDataPOST:
    case rpcDataGET:
      e = { ReqHeaders: { RPC: 1 } };
      if (d === rpcHttpRequestGET || d === rpcJSONGET || d === rpcDataGET) {
        if (b != "") a = ng_AddURLParam(a, b);
      } else e.PostParams = b;
      return this.sendHttpRequest(
        a,
        function(f, g, j) {
          if (!(f.OnReceivedData && !ngVal(f.OnReceivedData(f, g, j), false)))
            switch (d) {
              case rpcHttpRequestGET:
              case rpcHttpRequestPOST:
                ngWinStoreApp
                  ? MSApp.execUnsafeLocalFunction(function() {
                      window.eval.call(window, "(function() {" + g + "})();");
                    })
                  : new Function(g)();
                break;
              case rpcJSONGET:
              case rpcJSONPOST:
                try {
                  var k = JSON.parse(g);
                } catch (n) {
                  f.OnHTTPRequestFailed && f.OnHTTPRequestFailed(f, j);
                  break;
                }
                f.OnReceivedJSON && f.OnReceivedJSON(f, k, j);
                break;
              case rpcDataGET:
              case rpcDataPOST:
                break;
            }
        },
        e
      );
    case rpcUser:
      if (!this.OnSendRequest) return false;
      if (!ngVal(this.OnSendRequest(this, a), false)) return false;
      this.OnRequestSent && this.OnRequestSent(this, a, null);
      return true;
  }
  return false;
}
function ngrpc_clearParams() {
  this.Params = {};
}
function ngrpc_SetParam(a, b) {
  typeof a === "undefined" || a == "" || (this.Params[a] = b);
}
function ngrpc_GetParam(a) {
  return this.Params[a];
}
function ngRPC(a, b, d) {
  if (ngVal(a, "") == "") {
    ngRPCLastID++;
    a = "ngRPC" + ngRPCLastID;
  }
  this.id = a + "_RPC";
  ngRPCByID[a] = this;
  this.sendScriptRequest = ngrpc_sendScriptRequest;
  this.sendIFrameRequest = ngrpc_sendIFrameRequest;
  this.sendHttpRequest = ngrpc_sendHttpRequest;
  this.GetURLParams = ngrpc_GetURLParams;
  this.EncodeParam = ngrpc_EncodeParam;
  this.nocache = ngVal(d, false);
  this.Type = rpcAuto;
  this.HTTPMethod = "";
  this.URL = ngVal(b, "");
  this.Params = {};
  this.SetParam = ngrpc_SetParam;
  this.GetParam = ngrpc_GetParam;
  this.sendRequest = ngrpc_sendRequest;
  this.clearParams = ngrpc_clearParams;
  this.AddEvent = ngObjAddEvent;
  this.RemoveEvent = ngObjRemoveEvent;
  this.OnReceivedData = this.OnReceivedJSON = this.OnHTTPRequestFailed = this.OnHTTPReadyStateChanged = this.OnHTTPRequest = this.OnIFrameRequest = this.OnRequestSent = this.OnSendRequest = this.OnRequest = this.OnEncodeParam = null;
  ngOnRPCCreated && ngOnRPCCreated(this);
}
function ngRDS(a, b, d, e) {
  this.__rpc = ngRPC;
  this.__rpc(a, b, e);
  delete this.__rpc;
  this.Type = rpcJSON;
  if (typeof d === "function") {
    this.OnReceivedJSON = function(f, g, j) {
      d(f, g, j);
    };
    this.OnReceivedData = function(f, g, j) {
      if (f.Type === rpcJSON || f.Type === rpcJSONGET || f.Type === rpcJSONPOST)
        return true;
      d(f, g, j);
    };
  }
}
function ngStringBuilder(a) {
  this.strings = new Array("");
  this.append = function(b) {
    if (b)
      if (typeof b === "string") this.strings.push(b);
      else if (b.strings)
        for (var d = 0; d < b.strings.length; d++)
          this.strings.push(b.strings[d]);
      else for (d = 0; d < b.length; d++) this.strings.push(b[d]);
    return this;
  };
  this.clear = function() {
    this.strings.length = 1;
  };
  this.empty = function() {
    return this.strings.length <= 1;
  };
  this.toString = function() {
    return this.strings.join("");
  };
  this.append(a);
}
(function() {
  var a = document.location.href,
    b = a.indexOf("://");
  if (b >= 0) {
    ngHTTPProtocol = a.substring(0, b + 3);
    if (ngHTTPProtocol == "file://") ngHTTPProtocol = "http://";
  }
})();
ng_DetectLibsURL();
ngEmptyURL = ngLibPath("ng_basic", "empty.gif?nop");
if (typeof ngc_Lang === "undefined") ngc_Lang = [];
if (typeof ngc_Lang.en === "undefined") ngc_Lang.en = [];
ngc_Lang.en.decimal_separator = ".";
ngc_Lang.en.thousands_separator = ",";
ngc_Lang.en.date_format = "M/d/yyyy";
ngc_Lang.en.date_shortformat = "M/d/yy";
ngc_Lang.en.date_format_parse = "M/d/y";
ngc_Lang.en.time_format = "hh:mm:ss a";
ngc_Lang.en.time_shortformat = "hh:mm a";
ngc_Lang.en.time_format_parse = ngc_Lang.en.time_shortformat_parse = [
  "h:m:s a",
  "h:m:sa",
  "h:m a",
  "h:ma",
  "H:m:s",
  "H:m"
];
ngc_Lang.en.datetime_format = "M/d/yy hh:mm:ss a";
ngc_Lang.en.datetime_shortformat = "M/d/yy hh:mm a";
ngc_Lang.en.datetime_format_parse = ngc_Lang.en.datetime_shortformat_parse = [
  "M/d/y h:m:s a",
  "M/d/y h:m:sa",
  "M/d/y h:m a",
  "M/d/y h:ma",
  "M/d/y H:m:s",
  "M/d/y H:m"
];
ngc_Lang.en.calendar_months = new Array(
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
);
ngc_Lang.en.calendar_months_short = new Array(
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
);
ngc_Lang.en.calendar_days = new Array(
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
);
ngc_Lang.en.calendar_days_short = new Array(
  "Su",
  "Mo",
  "Tu",
  "We",
  "Th",
  "Fr",
  "Sa"
);
ngc_Lang.en.calendar_days_letter = new Array("S", "M", "T", "W", "T", "F", "S");
if (typeof ngc_Lang.cz === "undefined") ngc_Lang.cz = [];
ngc_Lang.cz.decimal_separator = ",";
ngc_Lang.cz.thousands_separator = " ";
ngc_Lang.cz.date_format = "d.M.yyyy";
ngc_Lang.cz.date_shortformat = "d.M.yy";
ngc_Lang.cz.date_format_parse = "d.M.y";
ngc_Lang.cz.time_format = "HH:mm:ss";
ngc_Lang.cz.time_shortformat = "HH:mm";
ngc_Lang.cz.time_format_parse = ngc_Lang.cz.time_shortformat_parse = [
  "H:m:s",
  "H:m"
];
ngc_Lang.cz.datetime_format = "d.M.yyyy HH:mm:ss";
ngc_Lang.cz.datetime_shortformat = "d.M.yyyy HH:mm";
ngc_Lang.cz.datetime_format_parse = ngc_Lang.cz.datetime_shortformat_parse = [
  "d.M.y H:m:s",
  "d.M.y H:m"
];
ngc_Lang.cz.calendar_months = new Array(
  "Leden",
  "\u00danor",
  "B\u0159ezen",
  "Duben",
  "Kv\u011bten",
  "\u010cerven",
  "\u010cervenec",
  "Srpen",
  "Z\u00e1\u0159\u00ed",
  "\u0158\u00edjen",
  "Listopad",
  "Prosinec"
);
ngc_Lang.cz.calendar_months_short = new Array(
  "Led",
  "\u00dano",
  "B\u0159e",
  "Dub",
  "Kv\u011b",
  "\u010cer",
  "\u010cnc",
  "Srp",
  "Z\u00e1\u0159",
  "\u0158\u00edj",
  "Lis",
  "Pro"
);
ngc_Lang.cz.calendar_days = new Array(
  "Ned\u011ble",
  "Pond\u011bl\u00ed",
  "\u00dater\u00fd",
  "St\u0159eda",
  "\u010ctvrtek",
  "P\u00e1tek",
  "Sobota"
);
ngc_Lang.cz.calendar_days_short = new Array(
  "Ne",
  "Po",
  "\u00dat",
  "St",
  "\u010ct",
  "P\u00e1",
  "So"
);
ngc_Lang.cz.calendar_days_letter = new Array(
  "N",
  "P",
  "\u00da",
  "S",
  "\u010c",
  "P",
  "S"
);
if (typeof ngc_Lang.sk === "undefined") ngc_Lang.sk = [];
ngc_Lang.sk.decimal_separator = ",";
ngc_Lang.sk.thousands_separator = " ";
ngc_Lang.sk.date_format = "d.M.yyyy";
ngc_Lang.sk.date_shortformat = "d.M.yy";
ngc_Lang.sk.date_format_parse = "d.M.y";
ngc_Lang.sk.time_format = "HH:mm:ss";
ngc_Lang.sk.time_shortformat = "HH:mm";
ngc_Lang.sk.time_format_parse = ngc_Lang.sk.time_shortformat_parse = [
  "H:m:s",
  "H:m"
];
ngc_Lang.sk.datetime_format = "d.M.yyyy HH:mm:ss";
ngc_Lang.sk.datetime_shortformat = "d.M.yyyy HH:mm";
ngc_Lang.sk.datetime_format_parse = ngc_Lang.sk.datetime_shortformat_parse = [
  "d.M.y H:m:s",
  "d.M.y H:m"
];
ngc_Lang.sk.calendar_months = new Array(
  "Janu\u00e1r",
  "Febru\u00e1r",
  "Marec",
  "Apr\u00edl",
  "M\u00e1j",
  "J\u00fan",
  "J\u00fal",
  "August",
  "September",
  "Okt\u00f3ber",
  "November",
  "December"
);
ngc_Lang.sk.calendar_months_short = new Array(
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "M\u00e1j",
  "J\u00fan",
  "J\u00fal",
  "Aug",
  "Sep",
  "Okt",
  "Nov",
  "Dec"
);
ngc_Lang.sk.calendar_days = new Array(
  "Nede\u013ea",
  "Pondelok",
  "Utorok",
  "Streda",
  "\u0160tvrtok",
  "Piatok",
  "Sobota"
);
ngc_Lang.sk.calendar_days_short = new Array(
  "Ne",
  "Po",
  "Ut",
  "St",
  "\u0160t",
  "Pi",
  "So"
);
ngc_Lang.sk.calendar_days_letter = new Array(
  "N",
  "P",
  "\u00da",
  "S",
  "\u010c",
  "P",
  "S"
);
var ngTypesLang = "en";
function ngTypesTxt(a, b) {
  if (typeof ngApp === "object" && ngApp && typeof ngApp.Text === "function")
    return ngApp.Text(a, b);
  var d = ngc_Lang[ngTypesLang];
  if (typeof d === "undefined") d = ngc_Lang.en;
  if (typeof d === "undefined") return ngVal(b, a);
  return ngVal(d[a], ngVal(b, a));
}
var SBYTE_MIN = -127,
  SBYTE_MAX = 127,
  BYTE_MIN = 0,
  BYTE_MAX = 255,
  SHORT_MIN = -32767,
  SHORT_MAX = 32767,
  USHORT_MIN = 0,
  USHORT_MAX = 65535,
  LONG_MIN = -2147483647,
  LONG_MAX = 2147483647,
  ULONG_MIN = 0,
  ULONG_MAX = 4294967295,
  ng_SIUnits = ng_SIUnits || [
    {
      name: "yotta",
      prefix: "Y",
      ex: Math.pow(10, 24),
      binex: Math.pow(1024, 8),
      notcommon: true
    },
    {
      name: "zetta",
      prefix: "Z",
      ex: Math.pow(10, 21),
      binex: Math.pow(1024, 7),
      notcommon: true
    },
    {
      name: "exa",
      prefix: "E",
      ex: 1e18,
      binex: 1152921504606846976,
      notcommon: true
    },
    { name: "peta", prefix: "P", ex: 1e15, binex: 1125899906842624 },
    { name: "tera", prefix: "T", ex: 1e12, binex: 1099511627776 },
    { name: "giga", prefix: "G", ex: 1e9, binex: 1073741824 },
    { name: "mega", prefix: "M", ex: 1e6, binex: 1048576 },
    { name: "kilo", prefix: "k", ex: 1e3, binex: 1024 },
    { name: "hekto", prefix: "h", ex: 100, binex: 0, notcommon: true },
    { name: "deka", prefix: "da", ex: 10, binex: 0, notcommon: true },
    { name: "", prefix: "", ex: 1, binex: 1 },
    { name: "deci", prefix: "d", ex: 0.1, binex: 0, notcommon: true },
    { name: "centi", prefix: "c", ex: 0.01, binex: 0 },
    { name: "mili", prefix: "m", ex: 0.001, binex: 0 },
    {
      name: "mikro",
      prefix: "\u00b5",
      ex: 1.0e-6,
      binex: 0
    },
    { name: "nano", prefix: "n", ex: 1.0e-9, binex: 0 },
    { name: "piko", prefix: "p", ex: 1.0e-12, binex: 0 },
    { name: "femto", prefix: "f", ex: 1.0e-15, binex: 0 },
    { name: "atto", prefix: "a", ex: 1.0e-18, binex: 0, notcommon: true },
    { name: "zepto", prefix: "z", ex: 1.0e-21, binex: 0, notcommon: true },
    { name: "yokto", prefix: "y", ex: 1.0e-24, binex: 0, notcommon: true }
  ];
function ng_GetDecimalSeparator() {
  var a;
  return function() {
    var b = ngTypesTxt("decimal_separator", "");
    if (b != "") return b;
    if (typeof a === "undefined")
      a =
        typeof (1.1).toLocaleString === "function"
          ? (1.1).toLocaleString().substring(1, 2)
          : ".";
    return a;
  };
}
var ng_DecimalSeparator = ng_DecimalSeparator || ng_GetDecimalSeparator();
function ng_decodeSIUnits(a) {
  a = "" + a;
  if (a.length > 1)
    switch (a.charAt(a.length - 1)) {
      case "2":
      case "\u00b2":
        return { units: a.substring(0, a.length - 1), exp: 2 };
      case "3":
      case "\u00b3":
        return { units: a.substring(0, a.length - 1), exp: 3 };
    }
  return { units: a, exp: 1 };
}
function ng_CompareSIUnits(a, b) {
  a = ng_decodeSIUnits(a);
  b = ng_decodeSIUnits(b);
  return a.units == b.units && a.exp == b.exp;
}
function ng_StripSIUnits(a, b) {
  var d = ng_StripSuffix(a, b);
  if (d != a) return d;
  d = ng_StripSuffix(a, b + "2");
  if (d != a) return d;
  d = ng_StripSuffix(a, b + "3");
  if (d != a) return d;
  d = ng_StripSuffix(a, b + "\u00b2");
  if (d != a) return d;
  d = ng_StripSuffix(a, b + "\u00b3");
  if (d != a) return d;
  return a;
}
function ng_getSIUnits(a, b, d) {
  if (ngVal(b, "") != "") {
    var e,
      f = -1;
    a = "" + a;
    for (var g = 0; g < ng_SIUnits.length; g++)
      if (ng_SIUnits[g].prefix == "") f = g;
      else {
        e = ng_SIUnits[g].prefix + b;
        if (ng_CompareSIUnits(a.substr(-e.length, e.length), e))
          return ng_SIUnits[g];
      }
    if (f >= 0) {
      e = ng_SIUnits[f].prefix + b;
      if (ng_CompareSIUnits(a.substr(-e.length, e.length), e))
        return ng_SIUnits[f];
    }
  }
  return ngVal(d, null);
}
function ng_parseHMS(a, b, d) {
  a = ng_toString(a);
  b = ngVal(b, ":");
  a = a.split(b);
  if (a.length > 3) return ngVal(d, null);
  for (b = 0; b < a.length; b++) {
    if (b == a.length - 1) {
      if (!ng_isNumber(a[b])) return ngVal(d, null);
      p = ng_toFloat(a[b]);
    } else {
      if (!ng_isInteger(a[b])) return ngVal(d, null);
      p = ng_toInteger(a[b]);
    }
    if ((p < 0 || p >= 60) && b > 0) return ngVal(d, null);
    a[b] = p;
  }
  return a;
}
function ng_typeString(a) {
  return (
    typeof a === "string" ||
    Object.prototype.toString.call(a) === "[object String]"
  );
}
function ng_typeNumber(a) {
  return typeof a === "number";
}
function ng_typeNumberInt(a) {
  return typeof a === "number" && !isNaN(a) && a % 1 === 0;
}
function ng_typeNumberFloat(a) {
  return typeof a === "number" && !isNaN(a) && a % 1 !== 0;
}
function ng_typeDate(a) {
  return Object.prototype.toString.call(a) === "[object Date]";
}
function ng_typeObject(a) {
  return typeof a === "object" && a !== null;
}
function ng_typeArray(a) {
  return ng_IsArrayVar(a);
}
function ng_isEmpty(a) {
  return typeof a === "undefined";
}
function ng_isNull(a) {
  return a === null;
}
function ng_isEmptyOrNull(a) {
  return ng_isEmpty(a) || ng_isNull(a);
}
function ng_isInvalid(a) {
  return (
    a === null ||
    typeof a === "undefined" ||
    (typeof a === "number" && isNaN(a)) ||
    (ng_typeDate(a) && isNaN(a.getTime()))
  );
}
function ng_isNumber(a) {
  a = ng_toNumber(a);
  return !isNaN(a);
}
function ng_isInteger(a) {
  a = ng_toNumber(a);
  if (isNaN(a)) return false;
  return ng_typeNumberInt(a);
}
function ng_isFloat(a) {
  a = ng_toNumber(a);
  if (isNaN(a)) return false;
  return ng_typeNumberFloat(a);
}
function ng_isSByte(a) {
  var b = ng_toNumber(a);
  return !isNaN(b) && ng_typeNumberInt(b) && !isNaN(ng_toSByte(a));
}
function ng_isByte(a) {
  var b = ng_toNumber(a);
  return !isNaN(b) && ng_typeNumberInt(b) && !isNaN(ng_toByte(a));
}
function ng_isShort(a) {
  var b = ng_toNumber(a);
  return !isNaN(b) && ng_typeNumberInt(b) && !isNaN(ng_toShort(a));
}
function ng_isUShort(a) {
  var b = ng_toNumber(a);
  return !isNaN(b) && ng_typeNumberInt(b) && !isNaN(ng_toUShort(a));
}
function ng_isLong(a) {
  var b = ng_toNumber(a);
  return !isNaN(b) && ng_typeNumberInt(b) && !isNaN(ng_toLong(a));
}
function ng_isULong(a) {
  var b = ng_toNumber(a);
  return !isNaN(b) && ng_typeNumberInt(b) && !isNaN(ng_toULong(a));
}
function ng_isDate(a, b) {
  return ng_toDate(a, null, b) !== null;
}
function ng_isNVARCHAR(a, b) {
  a = ng_toNVARCHAR(a, undefined, null);
  if (a === null) return false;
  if (!ng_isEmpty(b)) {
    b = ngVal(b, 0);
    if (a.length > b) return false;
  }
  return true;
}
function ng_isDECIMAL(a, b, d) {
  return ng_toDECIMAL(a, b, d, null) !== null;
}
function ng_isDateISO8601(a) {
  return ng_parseDateISO8601(a, null) !== null;
}
function ng_isSIUnits(a, b, d) {
  return ng_parseSIUnits(a, b, null, d) !== null;
}
function ng_isDistance(a) {
  return ng_parseDistance(a, null) !== null;
}
function ng_isArea(a) {
  return ng_parseArea(a, null) !== null;
}
function ng_isSeconds(a) {
  return ng_parseSeconds(a, null) !== null;
}
function ng_isMinutes(a) {
  return ng_parseMinutes(a, null) !== null;
}
function ng_isHex(a) {
  return /^([0-9]|A|B|C|D|E|F)+$/i.test("" + a);
}
function ng_isDigits(a) {
  return /^[0-9]+$/.test("" + a);
}
function ng_isEmail(a) {
  return new RegExp(
    "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
  ).test(("" + a).toLowerCase());
}
function ng_isURL(a) {
  return ("" + a).toLowerCase().indexOf("://") >= 0;
}
function ng_isWWW(a) {
  if (ng_isURL(a)) return true;
  a = ("" + a).toLowerCase();
  if (a == "localhost" || a == "127.0.0.1") return true;
  if (a.indexOf(".") < 1) return false;
  var b = a.lastIndexOf(".");
  if (b < 0) return false;
  a = a.substring(b + 1, a.length);
  b = [
    "aero",
    "asia",
    "biz",
    "cat",
    "com",
    "coop",
    "gov",
    "info",
    "int",
    "jobs",
    "mobi",
    "museum",
    "name",
    "net",
    "org",
    "pro",
    "tel",
    "travel",
    "xxx"
  ];
  return a.length == 2 || ng_inArray(a, b);
}
function ng_isIP4(a) {
  return /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i.test(
    "" + a
  );
}
function ng_isIP6(a) {
  return new RegExp(
    "^s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:)))(%.+)?s*$"
  ).test(a);
}
function ng_isUnicode(a) {
  var b;
  for (a = "" + a; 0 < a.length; a++) {
    b = a.charCodeAt(0);
    if (b > 255) return true;
  }
  return false;
}
function ng_isASCII(a) {
  var b;
  for (a = "" + a; 0 < a.length; a++) {
    b = a.charCodeAt(0);
    if (b > 127) return false;
  }
  return true;
}
function ng_toBool(a) {
  if (ng_typeString(a) && a.length > 0) {
    a = a.toLowerCase();
    if (
      a == "0" ||
      a == "false" ||
      a == "f" ||
      a == "n" ||
      a == "no" ||
      a == "off" ||
      a == "disabled"
    )
      return false;
    return true;
  }
  return !!a;
}
function ng_toString(a, b) {
  if (ng_isEmptyOrNull(a)) return ngVal(b, "");
  if (ng_typeDate(a)) return ng_FormatDateTime(a, undefined, ngVal(b, ""));
  if (ng_typeObject(a)) {
    if (typeof a.FormatString === "function") return a.FormatString(a, b);
    if (typeof JSON !== "undefined" && typeof JSON.stringify === "function")
      try {
        return JSON.stringify(a);
      } catch (d) {}
    return ngVal(b, "");
  }
  if (ng_isFloat(a)) return ("" + a).replace(".", ng_DecimalSeparator());
  return "" + a;
}
function ng_toObject(a, b) {
  if (ng_typeDate(a)) {
    if (ng_isInvalid(a)) return ngVal(b, null);
    return {
      year: a.getFullYear(),
      mon: a.getMonth() + 1,
      mday: a.getDate(),
      hour: a.getHours(),
      min: a.getMinutes(),
      sec: a.getSeconds(),
      ms: a.getMilliseconds(),
      tzoffset: a.getTimezoneOffset()
    };
  }
  if (typeof a === "object") return a;
  if (ng_typeString(a))
    if (typeof JSON !== "undefined" && typeof JSON.parse === "function")
      try {
        return window.JSON.parse(a);
      } catch (d) {}
  return ngVal(b, null);
}
function ng_toNumber(a, b) {
  if (ng_isEmptyOrNull(a)) return ngVal(b, NaN);
  if (ng_typeString(a)) {
    a = ("" + a).replace(ng_DecimalSeparator(), ".");
    if (a == "") return ngVal(b, NaN);
  }
  a = +a;
  return isNaN(a) ? ngVal(b, NaN) : a;
}
function ng_toSByte(a, b) {
  a = parseInt(a, 10);
  return isNaN(a) || a < SBYTE_MIN || a > SBYTE_MAX ? ngVal(b, NaN) : a;
}
function ng_toByte(a, b) {
  a = parseInt(a, 10);
  return isNaN(a) || a < BYTE_MIN || a > BYTE_MAX ? ngVal(b, NaN) : a;
}
function ng_toShort(a, b) {
  a = parseInt(a, 10);
  return isNaN(a) || a < SHORT_MIN || a > SHORT_MAX ? ngVal(b, NaN) : a;
}
function ng_toUShort(a, b) {
  a = parseInt(a, 10);
  return isNaN(a) || a < USHORT_MIN || a > USHORT_MAX ? ngVal(b, NaN) : a;
}
function ng_toLong(a, b) {
  a = parseInt(a, 10);
  return isNaN(a) || a < LONG_MIN || a > LONG_MAX ? ngVal(b, NaN) : a;
}
function ng_toULong(a, b) {
  a = parseInt(a, 10);
  return isNaN(a) || a < ULONG_MIN || a > ULONG_MAX ? ngVal(b, NaN) : a;
}
function ng_toInteger(a, b) {
  a = parseInt(a, 10);
  return isNaN(a) ? ngVal(b, NaN) : a;
}
function ng_toFloat(a, b) {
  if (typeof a === "object") return ngVal(b, NaN);
  a = parseFloat(("" + a).replace(ng_DecimalSeparator(), "."));
  return isNaN(a) ? ngVal(b, NaN) : a;
}
function ng_toDate(a, b, d) {
  if (ng_isEmptyOrNull(a)) return ngVal(b, null);
  if (ng_typeDate(a)) return isNaN(a.getTime()) ? ngVal(b, null) : a;
  if (ng_typeString(a)) {
    var e = ng_ParseDateTime(a, d, null);
    if (ng_isInvalid(e) && typeof d === "undefined") {
      e = ng_ParseDate(a, d, null);
      if (ng_isInvalid(e)) e = ng_ParseTime(a, d, null);
    }
    return ng_isInvalid(e) ? ngVal(b, null) : e;
  }
  if (ng_typeObject(a)) {
    e = new Date(0);
    if (!ng_isInvalid(a.year)) {
      d = a.year + "";
      if (d.length < 4)
        d = parseInt($y, 10) > 70 ? "" + (d - 0 + 1900) : "" + (d - 0 + 2e3);
      e.setFullYear(d);
    }
    ng_isInvalid(a.mon) || e.setMonth(a.mon - 1);
    ng_isInvalid(a.mday) || e.setDate(a.mday);
    ng_isInvalid(a.hour) || e.setHours(a.hour);
    ng_isInvalid(a.min) || e.setMinutes(a.min);
    ng_isInvalid(a.sec) || e.setSeconds(a.sec);
    ng_isInvalid(a.ms) || e.setMilliseconds(Number("0." + a.ms) * 1e3);
    if (!ng_isInvalid(a.tzoffset)) {
      a = (e.getTimezoneOffset() - a.tzoffset) * 60 * 1e3;
      a != 0 && e.setTime(e.getTime() - a);
    }
    return ng_isInvalid(e) ? ngVal(b, null) : e;
  }
  a = ng_fromUnixTimestamp(a);
  return ng_isInvalid(a) ? ngVal(b, null) : a;
}
function ng_toDateOnly(a, b, d) {
  a = ng_toDate(a, b, d);
  if (!ng_typeDate(a) || ng_isInvalid(a)) return ngVal(b, null);
  return ng_ExtractDate(a);
}
function ng_toNVARCHAR(a, b, d) {
  if (!ng_typeDate(a) && ng_typeObject(a)) return ngVal(d, "");
  a = ng_toString(a, null);
  if (ng_isInvalid(a)) return ngVal(d, "");
  a = ng_RTrim(a);
  if (typeof b === "undefined") return a;
  if (b < 0) b = 0;
  return a.substring(0, b);
}
function ng_toDECIMAL(a, b, d, e) {
  function f(q, u) {
    var x = "";
    for (u = u; u > 0; u--) x += q;
    return x;
  }
  d > 0 && b++;
  var g;
  if (ng_typeString(a)) {
    a = ng_Trim(a.replace(ng_DecimalSeparator(), "."));
    if (a != "") {
      var j = a,
        k = 0;
      if (a.length > 0)
        if (a.charAt(0) == "+") k = 1;
        else if (a.charAt(0) == "-") k = -1;
      if (k) a = a.substr(1, a.length);
      var n = a.length;
      for (g = 0; g < n; g++) if (a.charAt(g) != "0") break;
      a = a.substr(g, a.length);
      if (g == n || a.charAt(0) == ".") a = "0" + a;
      if (/^-?(0|([1-9]d*))(.d+)?$/.test(a)) {
        g = a.indexOf(".");
        n = a.length;
        if (g == n - 1) {
          a = a.substr(0, n - 1);
          g = -1;
        }
        if (g < 0) {
          if (d > 0) a += "." + f("0", d);
        } else {
          j = n - (g + 1);
          if (j != d)
            if (j < d) a += f("0", d - j);
            else {
              for (var o = 0, t = n - 1; t > g && j >= d; t--) {
                n = parseInt(a.charAt(t));
                if (o) {
                  n++;
                  a = a.substr(0, t) + n + a.substr(t + 1, a.length);
                }
                o = n < 5 ? 0 : 1;
                j--;
              }
              if (d) a = a.substr(0, g + 1 + d);
              else if (o && g > 0) {
                n = parseInt(a.charAt(g - 1));
                n++;
                a = a.substr(0, g - 1) + n;
              } else a = a.substr(0, g);
            }
        }
        if (a.length > b) return ngVal(e, "");
        if (k < 0) a = "-" + a;
        return a;
      }
      a = j;
    }
  }
  a = ng_toNumber(a);
  if (isNaN(a)) return ngVal(e, "");
  a = "" + a.toFixed(d);
  k = 0;
  if (a.length > 0)
    if (a.charAt(0) == "+") k = 1;
    else if (a.charAt(0) == "-") k = -1;
  if (k) a = a.substr(a, 1, a.length);
  g = a.indexOf(".");
  if (g < 0) {
    if (d > 0) a = a + "." + f("0", d);
  } else {
    n = a.length;
    j = n - (g + 1);
    if (j < d) a += f("0", d - j);
  }
  if (a.length > b) return ngVal(e, "");
  if (k < 0) a = "-" + a;
  return a;
}
function ng_toUTCDate(a, b) {
  a = ng_toDate(a);
  if (ng_isInvalid(a)) return ngVal(b, null);
  a = new Date(a.getTime());
  var d = a.getTimezoneOffset() * 60 * 1e3;
  a.setTime(a.getTime() + d);
  return ng_isInvalid(a) ? ngVal(b, null) : a;
}
function ng_fromUTCDate(a, b) {
  a = ng_toDate(a);
  if (ng_isInvalid(a)) return ngVal(b, null);
  a = new Date(a.getTime());
  var d = a.getTimezoneOffset() * 60 * 1e3;
  a.setTime(a.getTime() - d);
  return ng_isInvalid(a) ? ngVal(b, null) : a;
}
function ng_toUnixTimestamp(a, b) {
  a = ng_toDate(a);
  if (ng_isInvalid(a)) return ngVal(b, NaN);
  return Math.round(a.getTime() / 1e3);
}
function ng_fromUnixTimestamp(a, b) {
  a = ng_toNumber(a);
  if (isNaN(a)) return ngVal(b, null);
  return new Date(a * 1e3);
}
function ng_formatDateISO8601(a, b) {
  function d(e) {
    return e < 10 ? "0" + e : e;
  }
  a = ng_toDate(a);
  if (ng_isInvalid(a)) return ngVal(b, "");
  return (
    a.getUTCFullYear() +
    "-" +
    d(a.getUTCMonth() + 1) +
    "-" +
    d(a.getUTCDate()) +
    "T" +
    d(a.getUTCHours()) +
    ":" +
    d(a.getUTCMinutes()) +
    ":" +
    d(a.getUTCSeconds()) +
    "Z"
  );
}
function ng_parseDateISO8601(a, b) {
  function d(o) {
    o = "" + o;
    for (var t = 0; t < o.length; t++)
      if (o.charAt(t) != "0") {
        o = o.substring(t, o.length);
        break;
      }
    return o;
  }
  a = "" + a;
  a = a.match(
    new RegExp(
      "([0-9]{4})(-([0-9]{2})(-([0-9]{2})(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\\.([0-9]+))?)?(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?"
    )
  );
  if (a === null) return ngVal(b, null);
  var e = 0,
    f = new Date(0, 0, 1),
    g = parseInt(a[1], 10),
    j = parseInt(d(a[3]), 10),
    k = parseInt(d(a[5]), 10);
  if (
    isNaN(g) ||
    isNaN(j) ||
    isNaN(k) ||
    g < 1e3 ||
    j < 1 ||
    j > 12 ||
    k < 1 ||
    k > ng_DaysInMonth(j, g)
  )
    return ngVal(b, null);
  f.setFullYear(g);
  f.setMonth(j - 1);
  f.setDate(k);
  g = parseInt(d(a[7]), 10);
  j = parseInt(d(a[8]), 10);
  k = parseInt(d(a[10]), 10);
  var n = parseInt(d(a[12]), 10);
  if (!isNaN(g) || !isNaN(j) || !isNaN(k) || !isNaN(n) || a[14]) {
    if (isNaN(g)) g = 0;
    else if (g < 0 || g > 23) return ngVal(b, null);
    if (isNaN(j)) j = 0;
    else if (j < 0 || j > 59) return ngVal(b, null);
    if (isNaN(k)) k = 0;
    else if (k < 0 || k > 59) return ngVal(b, null);
    f.setHours(g);
    f.setMinutes(j);
    f.setSeconds(k);
    isNaN(n) || f.setMilliseconds(ng_toNumber("0." + a[12]) * 1e3);
    if (a[14]) {
      e = ng_toNumber(a[16]) * 60 + ng_toNumber(a[17]);
      e *= a[15] == "-" ? 1 : -1;
    }
  }
  e -= f.getTimezoneOffset();
  f.setTime(Number(Number(f) + e * 60 * 1e3));
  return f;
}
function ng_parseSIUnits(a, b, d, e, f) {
  if (ng_typeNumber(a)) return a;
  var g = ng_decodeSIUnits(b),
    j = ng_getSIUnits(a, b, null);
  if (j === null) {
    a = ng_toNumber(a);
    return isNaN(a) ? ngVal(d, NaN) : a;
  }
  if (ng_typeString(e)) {
    var k = [];
    k.push(e);
    e = k;
  }
  if (j.prefix != "" && e && !ng_inArray(j.prefix, e)) return ngVal(d, NaN);
  a = ng_StripSIUnits(a, j.prefix + b);
  a = ng_toNumber(a);
  if (isNaN(a)) return ngVal(d, NaN);
  if (f) {
    if (g.exp != 1 || j.binex == 0) return ngVal(d, NaN);
    a *= j.binex;
  } else a *= Math.pow(j.ex, g.exp);
  return isNaN(a) ? ngVal(d, NaN) : a;
}
function ng_formatSIUnits(a, b, d, e, f, g, j, k) {
  if (ng_typeString(a)) {
    var n = ng_parseSIUnits(a, b);
    isNaN(n) || (a = n);
  }
  a = ng_toNumber(a);
  if (isNaN(a)) return ngVal(d, "");
  if (ng_typeString(e)) {
    n = [];
    n.push(e);
    e = n;
  }
  n = null;
  var o = 1,
    t = 1,
    q = ng_decodeSIUnits(b);
  if (k && q.exp != 1) return ngVal(d, "");
  for (var u = ng_SIUnits.length - 2; u >= 0; u--) {
    if (k)
      if (ng_SIUnits[u].binex == 0) continue;
      else o = ng_SIUnits[u].binex;
    else o = Math.pow(ng_SIUnits[u].ex, q.exp);
    if (
      a >= o &&
      ((e &&
        (ng_SIUnits[u].prefix == "" || ng_inArray(ng_SIUnits[u].prefix, e))) ||
        (!e && !ng_SIUnits[u].notcommon))
    ) {
      n = ng_SIUnits[u];
      t = o;
    }
  }
  if (!ng_typeObject(n)) return ng_toString(a) + " " + b;
  a /= t;
  if (isNaN(a)) return ngVal(d, "");
  if (typeof g === "function") return g(a, n, b, d, e, j);
  if (typeof f !== "undefined")
    return ng_toString(ng_toFloat(a.toFixed(f))) + " " + n.prefix + b;
  return ng_toString(a) + " " + n.prefix + b;
}
function ng_parseBytes(a, b) {
  return ng_parseSIUnits(ng_Unformat3Num(a), "B", b, false, true);
}
function ng_formatBytes(a, b, d, e, f) {
  return ng_Format3Num(ng_formatSIUnits(a, "B", b, false, d, e, f, true));
}
function ng_parseDistance(a, b) {
  return ng_parseSIUnits(ng_Unformat3Num(a), "m", b, ["m", "c", "d", "k"]);
}
function ng_formatDistance(a, b, d, e, f) {
  d = ngVal(d, 2);
  return ng_Format3Num(ng_formatSIUnits(a, "m", b, ["m", "c", "k"], d, e, f));
}
function ng_parseArea(a, b) {
  return ng_parseSIUnits(ng_Unformat3Num(a), "m\u00b2", b, [
    "m",
    "c",
    "d",
    "k"
  ]);
}
function ng_formatArea(a, b, d, e, f) {
  d = ngVal(d, 2);
  return ng_Format3Num(
    ng_formatSIUnits(a, "m\u00b2", b, ["m", "c", "k"], d, e, f)
  );
}
function ng_parseSeconds(a, b) {
  a = ng_parseHMS(a);
  if (a === null) return ngVal(b, NaN);
  for (var d = 0, e = 0, f = a.length - 1; f >= 0; f--)
    switch (e++) {
      case 0:
        d += a[f];
        break;
      case 1:
        d += a[f] * 60;
        break;
      case 2:
        d += a[f] * 3600;
        break;
    }
  if (ng_isInvalid(d)) return ngVal(b, NaN);
  return d;
}
function ng_formatSeconds(a, b, d) {
  if (!ng_isNumber(a)) return ngVal(b, "");
  var e = Math.floor(a / 3600);
  a -= e * 3600;
  var f = Math.floor(a / 60);
  a -= f * 60;
  var g = Math.floor(a);
  a -= g;
  if (ng_isInvalid(e) || ng_isInvalid(f) || ng_isInvalid(g))
    return ngVal(b, "");
  return (
    ng_sprintf("%02d:%02d:%02d", e, f, g) +
    (a > 0 && !ng_isInvalid(a) && d
      ? ("" + ng_toFloat(a.toFixed(3))).substr(1, 4)
      : "")
  );
}
function ng_parseMinutes(a, b) {
  a = ng_parseHMS(a);
  if (a === null) return ngVal(b, NaN);
  for (var d = 0, e = a.length == 3 ? -1 : 0, f = a.length - 1; f >= 0; f--)
    switch (e++) {
      case -1:
        d += a[f] / 60;
        break;
      case 0:
        d += a[f];
        break;
      case 1:
        d += a[f] * 60;
        break;
    }
  if (ng_isInvalid(d)) return ngVal(b, NaN);
  return d;
}
function ng_formatMinutes(a, b, d) {
  if (!ng_isNumber(a)) return ngVal(b, "");
  var e = Math.floor(a / 60);
  a -= e * 60;
  var f = Math.floor(a);
  a -= f;
  if (ng_isInvalid(e) || ng_isInvalid(f)) return ngVal(b, "");
  return (
    ng_sprintf("%02d:%02d", e, f) +
    (a > 0 && !ng_isInvalid(a) && d
      ? ("" + ng_toFloat(a.toFixed(3))).substr(1, 4)
      : "")
  );
}
function ng_formatWWW(a, b) {
  if (!ng_isWWW(a)) return ngVal(b, "");
  return ng_isURL(a) ? a : "http://" + a;
}
function ng_toASCII(a, b) {
  return ng_isASCII(a) ? a : ngVal(b, "");
}
function ng_toNonUnicode(a, b) {
  return !ng_isUnicode(a) ? a : ngVal(b, "");
}
function ng_toHex(a, b, d) {
  b = ng_toNumber(b);
  if (ng_typeString(a)) {
    var e = "";
    b = isNaN(b) || b >= 4 ? 4 : 2;
    for (var f = 0; f < a.length; f++) {
      d = a.charCodeAt(f);
      if (d > 255 && b == 2) d = 255;
      e += (65536 + d)
        .toString(16)
        .substr(-b)
        .toUpperCase();
    }
    return e;
  }
  a = ng_toNumber(a);
  if (isNaN(a)) return ngVal(d, "");
  a = a.toString(16).toUpperCase();
  if (isNaN(b) || b < 1) b = 1;
  for (; a.length < b; ) a = "0" + a;
  return a;
}
function ng_Hex2Str(a, b, d) {
  a = "" + a;
  b = ng_toNumber(b);
  b = isNaN(b) || b >= 4 ? 4 : 2;
  for (var e = a.length / b, f = "", g, j = 0; j < e; j++) {
    g = parseInt(a.substr(j * b, b), 16);
    if (isNaN(g)) return ngVal(d, "");
    f += String.fromCharCode(g);
  }
  return f;
}
function ng_idxInArray(a, b, d, e, f, g) {
  if (typeof f !== "function")
    f = function(j, k) {
      return j === k;
    };
  e = ngVal(e, b.length);
  if (e > b.length) e = b.length;
  for (d = ngVal(d, 0); d < e; d++) if (f(b[d], a, g)) return d;
  return -1;
}
function ng_inArray(a, b, d, e, f, g) {
  return ng_idxInArray(a, b, d, e, f, g) >= 0;
}
function ng_DefaultDateFormat(a, b) {
  var d = ngTypesTxt(
    "date_" + (b ? "short" : "") + "format" + (a ? "_parse" : ""),
    ""
  );
  if (d == "") d = ngTypesTxt("date_" + (b ? "short" : "") + "format", "");
  if (d == "" && b) return ng_DefaultDateFormat(a, false);
  return d;
}
function ng_DefaultTimeFormat(a, b) {
  var d = ngTypesTxt(
    "time_" + (b ? "short" : "") + "format" + (a ? "_parse" : ""),
    ""
  );
  if (d == "") d = ngTypesTxt("time_" + (b ? "short" : "") + "format", "");
  if (d == "" && b) return ng_DefaultTimeFormat(a, false);
  return d;
}
function ng_DefaultDateTimeFormat(a, b) {
  var d = ngTypesTxt(
    "datetime_" + (b ? "short" : "") + "format" + (a ? "_parse" : ""),
    ""
  );
  if (d == "") d = ngTypesTxt("datetime_" + (b ? "short" : "") + "format", "");
  if (d == "" && b) return ng_DefaultDateTimeFormat(a, false);
  return d;
}
var ng_DateFormat = ng_DefaultDateFormat,
  ng_TimeFormat = ng_DefaultTimeFormat,
  ng_DateTimeFormat = ng_DefaultDateTimeFormat;
function ng_ExtractDate(a) {
  if (ng_typeDate(a))
    return new Date(a.getFullYear(), a.getMonth(), a.getDate());
}
function ng_LeapYear(a) {
  return (a % 4 == 0 && a % 100 != 0) || a % 400 == 0;
}
function ng_DaysInMonth(a, b) {
  switch (a) {
    case 2:
      if (typeof b === "undefined") b = new Date().getFullYear();
      return ng_LeapYear(b) ? 29 : 28;
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    default:
      return 30;
  }
}
function ng_FormatTime(a, b, d) {
  if (typeof b === "undefined" || b == "") b = ng_TimeFormat(false);
  return ng_FormatDateTime(a, b, d);
}
function ng_FormatDate(a, b, d) {
  if (typeof b === "undefined" || b == "") b = ng_DateFormat(false);
  return ng_FormatDateTime(a, b, d);
}
function ng_FormatDateTime(a, b, d) {
  function e(z) {
    return z < 10 ? "0" + z : z;
  }
  a = ng_toDate(a);
  if (a === null) return ngVal(d, "");
  if (ng_IsArrayVar(b)) b = b.length ? b[0] : "";
  d = a.getFullYear();
  var f = a.getMonth() + 1,
    g = a.getDate(),
    j = a.getDay(),
    k = a.getHours(),
    n = a.getMinutes(),
    o = a.getSeconds();
  a = a.getMilliseconds();
  if (typeof b === "undefined" || b == "") b = ng_DateTimeFormat(false);
  b += "";
  var t = k;
  if (k > 12) t = k - 12;
  else k || (t = 12);
  for (var q = k > 11 ? k - 12 : k, u = "", x, w, y = 0; y < b.length; ) {
    w = b.charAt(y);
    for (x = ""; b.charAt(y) == w && y < b.length; ) x += b.charAt(y++);
    switch (x) {
      case "y":
      case "yyyy":
        u += d;
        break;
      case "yy":
        u += ("" + d).substring(2, 4);
        break;
      case "M":
        u += f;
        break;
      case "MM":
        u += e(f);
        break;
      case "MMM":
        u += ngTypesTxt("calendar_months")[f - 1];
        break;
      case "NNN":
        u += ngTypesTxt("calendar_months_short")[f - 1];
        break;
      case "d":
        u += g;
        break;
      case "dd":
        u += e(g);
        break;
      case "E":
        u += ngTypesTxt("calendar_days_short")[j];
        break;
      case "EE":
        u += ngTypesTxt("calendar_days")[j];
        break;
      case "H":
        u += k;
        break;
      case "HH":
        u += e(k);
        break;
      case "h":
        u += t;
        break;
      case "hh":
        u += e(t);
        break;
      case "K":
        u += q;
        break;
      case "k":
        u += k + 1;
        break;
      case "KK":
        u += e(q);
        break;
      case "kk":
        u += e(k + 1);
        break;
      case "m":
        u += n;
        break;
      case "mm":
        u += e(n);
        break;
      case "s":
        u += o;
        break;
      case "ss":
        u += e(o);
        break;
      case "a":
        u += k > 11 ? "PM" : "AM";
        break;
      case "u":
        u += a;
        break;
      default:
        u += x;
        break;
    }
  }
  return u;
}
function ng_ParseTime(a, b, d) {
  if (typeof b === "undefined" || b == "") b = ng_TimeFormat(true);
  return ng_ParseDateTime(a, b, d);
}
function ng_ParseDate(a, b, d) {
  if (typeof b === "undefined" || b == "") b = ng_DateFormat(true);
  a = ng_ParseDateTime(a, b);
  if (ng_isInvalid(a)) return d;
  a = ng_ExtractDate(a);
  if (ng_isInvalid(a)) return d;
  return a;
}
function ng_ParseDateTime(a, b, d) {
  function e(J, F, E, G) {
    for (var D = G; D >= E; D--) {
      G = J.substring(F, F + D);
      if (G.length < E) return null;
      if (ng_isDigits(G)) return G;
    }
    return null;
  }
  if (typeof b === "undefined" || b == "") b = ng_DateTimeFormat(true);
  if (ng_IsArrayVar(b)) {
    for (var f = 0; f < b.length; f++) {
      var g = ng_ParseDateTime(a, b[f], null);
      if (g !== null && ng_typeDate(g)) return g;
    }
    return d;
  }
  a += "";
  b += "";
  var j, k, n;
  g = new Date();
  for (
    var o = g.getFullYear(),
      t,
      q,
      u = 0,
      x = 0,
      w = 0,
      y = 0,
      z = "",
      B,
      C = 0,
      A = 0;
    A < b.length;

  ) {
    f = b.charAt(A);
    for (n = ""; b.charAt(A) == f && A < b.length; ) n += b.charAt(A++);
    switch (n) {
      case "yyyy":
      case "yy":
      case "y":
        if (n == "yyyy") k = j = 4;
        if (n == "yy") k = j = 2;
        if (n == "y") {
          j = 2;
          k = 4;
        }
        o = e(a, C, j, k);
        if (o == null) return d;
        C += o.length;
        if (o.length == 2) o = o > 70 ? 1900 + (o - 0) : 2e3 + (o - 0);
        break;
      case "MMM":
      case "NNN":
        t = 0;
        n =
          n == "MMM"
            ? ngTypesTxt("calendar_months")
            : ngTypesTxt("calendar_months_short");
        for (f = 0; f < n.length; f++) {
          B = n[f];
          if (a.substring(C, C + B.length).toLowerCase() == B.toLowerCase()) {
            t = f + 1;
            C += B.length;
            break;
          }
        }
        if (t < 1 || t > 12) return d;
        break;
      case "EE":
      case "E":
        n =
          n == "E"
            ? ngTypesTxt("calendar_days_short")
            : ngTypesTxt("calendar_days");
        for (f = 0; f < n.length; f++) {
          B = n[f];
          if (a.substring(C, C + B.length).toLowerCase() == B.toLowerCase()) {
            C += B.length;
            break;
          }
        }
        break;
      case "MM":
      case "M":
        t = e(a, C, n.length, 2);
        if (t == null || t < 1 || t > 12) return d;
        C += t.length;
        break;
      case "dd":
      case "d":
        q = e(a, C, n.length, 2);
        if (q == null || q < 1 || q > 31) return d;
        C += q.length;
        break;
      case "hh":
      case "h":
        u = e(a, C, n.length, 2);
        if (u == null || u < 1 || u > 12) return d;
        C += u.length;
        break;
      case "HH":
      case "H":
        u = e(a, C, n.length, 2);
        if (u == null || u < 0 || u > 23) return d;
        C += u.length;
        break;
      case "KK":
      case "K":
        u = e(a, C, n.length, 2);
        if (u == null || u < 0 || u > 11) return d;
        C += u.length;
        break;
      case "kk":
      case "k":
        u = e(a, C, n.length, 2);
        if (u == null || u < 1 || u > 24) return d;
        C += u.length;
        u--;
        break;
      case "mm":
      case "m":
        x = e(a, C, n.length, 2);
        if (x == null || x < 0 || x > 59) return d;
        C += x.length;
        break;
      case "ss":
      case "s":
        w = e(a, C, n.length, 2);
        if (w == null || w < 0 || w > 59) return d;
        C += w.length;
        break;
      case "a":
        if (a.substring(C, C + 2).toLowerCase() == "am") z = "AM";
        else if (a.substring(C, C + 2).toLowerCase() == "pm") z = "PM";
        else return d;
        C += 2;
        break;
      case "u":
        y = e(a, C, 1, 3);
        if (y == null || y < 0) return d;
        C += y.length;
        break;
      default:
        if (a.substring(C, C + n.length) != n) return d;
        else C += n.length;
        break;
    }
  }
  if (C != a.length) return d;
  a = ng_isEmpty(q);
  b = ng_isEmpty(t);
  if (a) q = b ? g.getDate() : 1;
  if (b) t = g.getMonth() + 1;
  if (t == 2 && q > 28) if (!ng_LeapYear(o) || q > 29) return d;
  if (q > 30 && (t == 4 || t == 6 || t == 9 || t == 11)) return d;
  if (u < 12 && z == "PM") u = u - 0 + 12;
  else if (u > 11 && z == "AM") u -= 12;
  return new Date(o, t - 1, q, u, x, w, y);
}
function ng_ParseJSONDateTime(a, b) {
  var d = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(
    a
  );
  if (d)
    return new Date(Date.UTC(+d[1], +d[2] - 1, +d[3], +d[4], +d[5], +d[6]));
  if (
    (d = /^\/Date\(([+-]?[0-9]*)(([+-]?)([0-9]{2})([0-9]{2}))?\)\/$/.exec(a))
  ) {
    a = 0;
    if (d[2]) {
      a = ng_toNumber(d[4]) * 60 + ng_toNumber(d[5]);
      a *= d[3] == "-" ? 1 : -1;
    }
    d = new Date(parseInt(d[1]));
    a -= d.getTimezoneOffset();
    d.setTime(Number(Number(d) + a * 60 * 1e3));
    return d;
  }
  return b;
}
function ng_GetDateFormat(a, b) {
  if (a == "") return "";
  b = ngVal(b, true);
  var d = new Array(
      "y-M-d",
      "MMM d, y",
      "MMM d,y",
      "y-MMM-d",
      "d-MMM-y",
      "MMM d"
    ),
    e = new Array("M/d/y", "M-d-y", "M.d.y", "MMM-d", "M/d", "M-d"),
    f = new Array("d/M/y", "d-M-y", "d.M.y", "d-MMM", "d/M", "d-M");
  b = new Array(d, b ? f : e, b ? e : f);
  d = null;
  for (e = 0; e < b.length; e++) {
    f = b[e];
    for (var g = 0; g < f.length; g++) {
      d = ng_ParseDate(a, f[g]);
      if (typeof d !== "undefined") return f[g];
    }
  }
  return "";
}
function ng_Trim(a) {
  if (a === true) return "1";
  if (a === false || a === null) return "";
  var b = typeof a;
  if (b != "string" && b != "number") return b;
  return ("" + a).replace(/^\s+|\s+$/g, "");
}
function ng_LTrim(a) {
  return ("" + a).replace(/^\s+/, "");
}
function ng_RTrim(a) {
  return ("" + a).replace(/\s+$/, "");
}
function ng_StripPrefix(a, b, d) {
  a = "" + a;
  b = "" + b;
  var e = a.substring(0, b.length);
  if (d) {
    e = e.toLowerCase();
    b = b.toLowerCase();
  }
  return e == b ? a.substring(b.length, a.length) : a;
}
function ng_StripSuffix(a, b, d) {
  a = "" + a;
  b = "" + b;
  if (a.length < b.length) return a;
  var e = a.substring(a.length - b.length, a.length);
  if (d) {
    e = e.toLowerCase();
    b = b.toLowerCase();
  }
  return e == b ? a.substring(0, a.length - b.length) : a;
}
function ng_AddPrefix(a, b, d) {
  return "" + b + ng_StripPrefix(a, b, d);
}
function ng_AddSuffix(a, b, d) {
  return ng_StripSuffix(a, b, d) + b;
}
function ng_AddSlash(a) {
  return ng_AddSuffix(a, "/");
}
function ng_StripSlash(a) {
  return ng_StripSuffix(a, "/");
}
function ng_AddBackslash(a) {
  return ng_AddSuffix(a, "\\");
}
function ng_StripBackslash(a) {
  return ng_StripSuffix(a, "\\");
}
function ng_StripQuotes(a, b) {
  if (ng_isEmpty(b)) {
    b = ng_StripQuotes(a, '"');
    if (b.length < a.length) return b;
    return ng_StripQuotes(a, "'");
  }
  b = "" + b;
  if (
    a.length >= b.length * 2 &&
    a.substring(0, b.length) == b &&
    a.substring(a.length - b.length, a.length) == b
  )
    return a.substring(b.length, a.length - b.length);
  return a;
}
function ng_QuoteStr(a, b) {
  a = ng_StripQuotes(a, b);
  if (ng_isEmpty(b)) b = '"';
  b = "" + b;
  return b + a + b;
}
function ng_Unformat3Num(a, b) {
  if (!ng_typeString(a)) return a;
  if (typeof b === "undefined") b = ngTypesTxt("thousands_separator", " ");
  return ng_Format3Num(a, "", b);
}
function ng_Format3Num(a, b, d) {
  if (typeof b === "undefined") b = ngTypesTxt("thousands_separator", " ");
  if (ng_isInvalid(a) || ng_typeObject(a)) return "";
  a = ng_toString(a);
  d = ngVal(d, b);
  var e = a.lastIndexOf(ng_DecimalSeparator());
  if (e < 0 && b != "." && d != ".") e = a.lastIndexOf(".");
  if (e < 0) {
    var f;
    for (e = a.length - 1; e >= 0; e--) {
      f = a.charAt(e);
      if (f >= "0" && f <= "9") break;
    }
  } else e--;
  for (var g = "", j = 0, k = a.length - 1; k >= 0; k--) {
    f = a.charAt(k);
    if (k <= e) {
      if (f == d) continue;
      if (!(j++ % 3) && k < e) g = b + g;
    }
    g = f + g;
  }
  return g;
}
if (typeof ngc_Lang === "undefined") ngc_Lang = [];
if (typeof ngc_Lang.en === "undefined") ngc_Lang.en = [];
ngc_Lang.en.calendar = "Calendar";
ngc_Lang.en.calendar_today = "Today";
ngc_Lang.en.calendar_tomorrow = "+1";
ngc_Lang.en.calendar_tomorrow_alt = "Tomorrow";
ngc_Lang.en.calendar_nextweek = "+7";
ngc_Lang.en.calendar_nextweek_alt = "In A Week";
ngc_Lang.en.calendar_nextmonth = "Next Month";
ngc_Lang.en.calendar_prevmonth = "Previous Month";
ngc_Lang.en.calendar_nextyear = "Next Year";
ngc_Lang.en.calendar_prevyear = "Previous Year";
if (typeof ngc_Lang.cz === "undefined") ngc_Lang.cz = [];
ngc_Lang.cz.calendar = "Kalend\u00e1\u0159";
ngc_Lang.cz.calendar_today = "Dnes";
ngc_Lang.cz.calendar_tomorrow = "+1";
ngc_Lang.cz.calendar_tomorrow_alt = "Z\u00edtra";
ngc_Lang.cz.calendar_nextweek = "+7";
ngc_Lang.cz.calendar_nextweek_alt = "Za t\u00fdden";
ngc_Lang.cz.calendar_nextmonth = "N\u00e1sleduj\u00edc\u00ed m\u011bs\u00edc";
ngc_Lang.cz.calendar_prevmonth =
  "P\u0159edch\u00e1zej\u00edc\u00ed m\u011bs\u00edc";
ngc_Lang.cz.calendar_nextyear = "N\u00e1sleduj\u00edc\u00ed rok";
ngc_Lang.cz.calendar_prevyear = "P\u0159edch\u00e1zej\u00edc\u00ed rok";
if (typeof ngc_Lang.sk === "undefined") ngc_Lang.sk = [];
ngc_Lang.sk.calendar = "Kalend\u00e1r";
ngc_Lang.sk.calendar_today = "Dnes";
ngc_Lang.sk.calendar_tomorrow = "+1";
ngc_Lang.sk.calendar_tomorrow_alt = "Zajtra";
ngc_Lang.sk.calendar_nextweek = "+7";
ngc_Lang.sk.calendar_nextweek_alt = "Za t\u00fd\u017ede\u0148";
ngc_Lang.sk.calendar_nextmonth = "Nasleduj\u00faci mesiac";
ngc_Lang.sk.calendar_prevmonth = "Predch\u00e1dzaj\u00faci mesiac";
ngc_Lang.sk.calendar_nextyear = "Nasleduj\u00faci rok";
ngc_Lang.sk.calendar_prevyear = "Predch\u00e1dzaj\u00faci rok";
var ngcalSelectNone = 0,
  ngcalSelectSingle = 1,
  ngcalSelectMulti = 2,
  ngcalSelectMultiExt = 3,
  ngcalSelectRange = 4;
function ngcal_NextMonth(a) {
  var b, d;
  d = this.CurrentDate;
  b = d.getFullYear();
  d = d.getMonth() + 1;
  if (d > 11) {
    d = 0;
    ngVal(a, true) && b++;
  }
  this.CurrentDate = new Date(b, d, 1);
  this.UpdateCalendar();
}
function ngcal_PrevMonth(a) {
  var b, d;
  d = this.CurrentDate;
  b = d.getFullYear();
  d = d.getMonth() - 1;
  if (d < 0) {
    d = 11;
    ngVal(a, true) && b--;
  }
  this.CurrentDate = new Date(b, d, 1);
  this.UpdateCalendar();
}
function ngcal_NextYear() {
  var a, b;
  b = this.CurrentDate;
  a = b.getFullYear() + 1;
  b = b.getMonth();
  this.CurrentDate = new Date(a, b, 1);
  this.UpdateCalendar();
}
function ngcal_PrevYear() {
  var a, b;
  b = this.CurrentDate;
  a = b.getFullYear() - 1;
  b = b.getMonth();
  this.CurrentDate = new Date(a, b, 1);
  this.UpdateCalendar();
}
function ngcal_IsDayEnabled(a) {
  var b = true;
  if (this.MinDate && a < this.MinDate) b = false;
  if (b && this.MaxDate && a > this.MaxDate) b = false;
  if (b && ngVal(this.BlockedDates[a], false)) b = false;
  if (b && ngVal(this.BlockedWeekDays[a.getDay()], false)) b = false;
  if (this.OnIsDayEnabled) b = this.OnIsDayEnabled(this, a, b);
  return b;
}
var ngcal_CurrentDay = "";
function ngcal_DE(a, b) {
  if (!a) a = window.event;
  if (!(ngUsingTouch && a && a.type.toLowerCase().match(/mouse/))) {
    if (ngcal_CurrentDay != "") {
      var d = document.getElementById(ngcal_CurrentDay);
      ngcal_DL(a, d);
    }
    ngcal_CurrentDay = b.id;
    if ((d = document.getElementById(b.id))) {
      a = d.className;
      if (a.indexOf("_Focus") < 0) a += "_Focus";
      d.className = a;
    }
    ngc_EnterImg(b.id + "I");
  }
}
function ngcal_DL(a, b) {
  if (!a) a = window.event;
  if (!(ngUsingTouch && a && a.type.toLowerCase().match(/mouse/))) {
    if (ngcal_CurrentDay == b.id) ngcal_CurrentDay = "";
    if ((a = document.getElementById(b.id))) {
      var d = a.className,
        e = d.indexOf("_Focus");
      if (e >= 0) d = d.substring(0, e);
      a.className = d;
    }
    ngc_LeaveImg(b.id + "I");
  }
}
function ngcal_DayFromElmId(a) {
  var b = "",
    d = "",
    e = "",
    f = a.lastIndexOf("_D");
  if (f >= 0) {
    b = a.substring(0, f);
    a = ng_Expand2Id(a.substring(f + 2, a.length));
    if (a.id1 != "") d = parseInt(a.id1);
    if (a.id2 != "") e = parseInt(a.id2);
  }
  return { id: b, row: d, col: e };
}
function ngcal_MD(a, b) {
  if (!a) a = window.event;
  var d = ngcal_DayFromElmId(b.id);
  if (!(d.id == "" || d.row == "" || d.col == ""))
    if ((b = ngGetControlById(d.id, "ngCalendar")))
      if (b.Enabled) {
        d.row--;
        d.col--;
        var e = b.DisplayedDates[d.row * 7 + d.col];
        a.cal = this;
        a.caldate = e;
        a.calrow = d.row;
        a.calcol = d.col;
        if (!(this.OnDayClick && !ngVal(this.OnDayClick(a), false)))
          if (b.SelectType) {
            d = ngVal(a.shiftKey, false);
            var f = ngVal(a.ctrlKey, false);
            if (b.SelectType == 3 && !f) b.SelectedDates = [];
            if (
              !(b.CurrentDate.getMonth() != e.getMonth() || !b.IsDayEnabled(e))
            ) {
              b.BeginUpdate();
              a =
                b.SelectType == ngcalSelectRange
                  ? true
                  : typeof b.SelectedDates[e] === "undefined";
              if (
                (b.SelectType == 2 || b.SelectType == 3) &&
                d &&
                b.last_selected != null
              ) {
                if (b.SelectType == 3) a = true;
                d = false;
                if (e <= b.last_selected)
                  for (; e <= b.last_selected; ) {
                    if (d || (typeof b.SelectedDates[e] !== "undefined") != a) {
                      d = true;
                      if (a) b.SelectedDates[e] = e;
                      else delete b.SelectedDates[e];
                    }
                    e.setDate(e.getDate() + 1);
                  }
                else
                  for (; e >= b.last_selected; ) {
                    if (d || (typeof b.SelectedDates[e] !== "undefined") != a) {
                      d = true;
                      if (a) b.SelectedDates[e] = e;
                      else delete b.SelectedDates[e];
                    }
                    e.setDate(e.getDate() - 1);
                  }
                d && b.SelectChanged();
              } else b.SelectDate(e, a, f);
              b.EndUpdate();
            }
          }
      }
}
function ngcal_SelectChanged() {
  this.OnSelectChanged && this.OnSelectChanged(this);
  this.UpdateCalendar();
}
function ngcal_ClearSelected() {
  for (var a in this.SelectedDates) {
    this.SelectedDates = [];
    this.last_selected = null;
    this.SelectChanged();
    break;
  }
}
function ngcal_SelectDate(a, b, d) {
  if (this.SelectType != 0)
    if ((a = ngVal(a, null))) {
      b = ngVal(b, true);
      a = ng_ExtractDate(a);
      if (this.SelectType == ngcalSelectRange) {
        if (b)
          if (a < this.SelectFrom) {
            this.SelectFrom = a;
            this.SelectChanged();
          } else if (a > this.SelectTo) {
            this.SelectTo = a;
            this.SelectChanged();
          } else if (this.SelectFrom - a != 0 || this.SelectTo - a != 0) {
            this.SelectTo = this.SelectFrom = a;
            this.SelectChanged();
          }
      } else {
        if (
          b &&
          (this.SelectType == 1 || (this.SelectType == 3 && !ngVal(d, false)))
        )
          this.SelectedDates = [];
        if ((typeof this.SelectedDates[a] !== "undefined") != b) {
          if (b) this.last_selected = a;
          if (b) this.SelectedDates[a] = a;
          else delete this.SelectedDates[a];
          this.SelectChanged();
        }
        if (b)
          if ((b = ngVal(this.DropDownOwner, null)) && this.SelectType == 1) {
            if (typeof b.SetDate === "function") b.SetDate(a);
            else
              typeof b.SetText === "function" && b.SetText(this.FormatDate(a));
            b.HideDropDown && b.HideDropDown();
            b.SetFocus();
          }
      }
    }
}
function ngcal_GetSelected() {
  var a = [];
  if (this.SelectType == ngcalSelectRange) {
    a[a.length] = this.SelectFrom;
    a[a.length] = this.SelectTo;
  } else
    for (var b in this.SelectedDates)
      if (typeof this.SelectedDates[b] !== "undefined")
        a[a.length] = this.SelectedDates[b];
  return a;
}
function ngcal_SetSelected(a) {
  if (typeof a === "string" || ng_typeDate(a)) {
    var b = [];
    b[0] = a;
    a = b;
  }
  if ((a = ngVal(a, null))) {
    this.BeginUpdate();
    this.ClearSelected();
    for (var d = 0, e = 0, f = 0; f < a.length; f++) {
      b = a[f];
      if (typeof b === "string") b = this.ParseDate(b);
      if (typeof b !== "undefined") {
        b = ng_ExtractDate(b);
        if (this.SelectType == ngcalSelectRange) {
          if (e)
            if (e == 1) this.SelectTo = b;
            else {
              if (e > 1) break;
            }
          else this.SelectFrom = b;
          e++;
        } else this.SelectedDates[b] = b;
        if (!d) {
          this.CurrentDate = b;
          d = 1;
        }
      }
    }
    if (e == 1) this.SelectTo = this.SelectFrom;
    this.SelectChanged();
    this.EndUpdate();
  }
}
function ngcal_BeginUpdate() {
  this.update_cnt++;
}
function ngcal_EndUpdate() {
  this.update_cnt--;
  if (this.update_cnt <= 0) {
    this.update_cnt = 0;
    this.need_update && this.UpdateCalendar();
  }
}
function ngcal_DayImgDrawProps(a, b, d, e) {
  b = ngc_ImgProps(a, b, d, e);
  if (ngcal_CurrentDay == a.substring(0, a.length - 1)) {
    b.aL = b.oL;
    b.aT = b.oT;
  } else {
    b.aL = b.L;
    b.aT = b.T;
  }
  return b;
}
function ngcal_UpdateCalendar() {
  if (this.update_cnt > 0) this.need_update = true;
  else {
    this.need_update = false;
    var a = this.Elm();
    if (a) {
      var b = this.BaseClassName,
        d = ng_ExtractDate(new Date()),
        e = this.CurrentDate.getMonth() + 1,
        f = this.CurrentDate.getFullYear();
      this.CurrentDate.getDate();
      var g = new Array(0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
      if (ng_LeapYear(f)) g[2] = 29;
      var j = new Date(f, e - 1, 1);
      a = j;
      var k = f,
        n = e,
        o = 1;
      if (
        this.SelectType == ngcalSelectRange &&
        this.SelectFrom > this.SelectTo
      ) {
        a = this.SelectFrom;
        this.SelectFrom = this.SelectTo;
        this.SelectTo = a;
      }
      a = j.getDay();
      a =
        a >= this.WeekStartDay
          ? a - this.WeekStartDay
          : 7 - this.WeekStartDay + a;
      if (a > 0) {
        n--;
        if (n < 1) {
          n = 12;
          k--;
        }
        o = g[n] - a + 1;
      }
      if ((a = this.Elm())) {
        ng_ClientWidth(a);
        j = document.getElementById(this.ID + "_Tab");
        if ((a = document.getElementById(this.ID + "_Head")) && j) {
          j = ng_ClientWidth(j);
          var t = 0,
            q,
            u,
            x = 0,
            w,
            y = 0;
          if (this.Navigation) {
            u = j;
            if ((q = this.PrevMonBtn.Visible ? this.PrevMonBtn.Elm() : null)) {
              q.style.left = "0px";
              q.style.top = "0px";
              w = ng_ClientWidth(q);
              u -= w;
              y = w;
              q = ng_ClientHeight(q);
              if (q > x) x = q;
            }
            if ((q = this.NextMonBtn.Visible ? this.NextMonBtn.Elm() : null)) {
              q.style.top = "0px";
              w = ng_ClientWidth(q);
              u -= w;
              q.style.left = j - w + "px";
              q = ng_ClientHeight(q);
              if (q > x) x = q;
            }
            if ((q = document.getElementById(this.ID + "_MON"))) {
              this.YearNavigation
                ? ng_SetInnerHTML(q, ngTxt("calendar_months")[e - 1])
                : ng_SetInnerHTML(q, ngTxt("calendar_months")[e - 1] + " " + f);
              q.style.left = y + "px";
              q.style.width = u + "px";
              q = ng_ClientHeight(q);
              if (q > x) x = q;
            }
            t += x;
            if (this.YearNavigation) {
              x = 0;
              u = j;
              if (
                (q = this.PrevYearBtn.Visible ? this.PrevYearBtn.Elm() : null)
              ) {
                q.style.display = "block";
                q.style.left = "0px";
                q.style.top = t + "px";
                w = ng_ClientWidth(q);
                u -= w;
                y = w;
                q = ng_ClientHeight(q);
                if (q > x) x = q;
              }
              if (
                (q = this.NextYearBtn.Visible ? this.NextYearBtn.Elm() : null)
              ) {
                q.style.display = "block";
                q.style.top = t + "px";
                w = ng_ClientWidth(q);
                u -= w;
                q.style.left = j - w + "px";
                q = ng_ClientHeight(q);
                if (q > x) x = q;
              }
              if ((q = document.getElementById(this.ID + "_YEAR"))) {
                q.style.display = "block";
                ng_SetInnerHTML(q, f);
                q.style.top = t + "px";
                q.style.left = y + "px";
                q.style.width = u + "px";
                q = ng_ClientHeight(q);
                if (q > x) x = q;
              }
              t += x;
            } else {
              if (
                (q = this.PrevYearBtn.Visible ? this.PrevYearBtn.Elm() : null)
              )
                q.style.display = "none";
              if (
                (q = this.NextYearBtn.Visible ? this.NextYearBtn.Elm() : null)
              )
                q.style.display = "none";
              if ((q = document.getElementById(this.ID + "_YEAR")))
                q.style.display = "none";
            }
          }
          if (t > 0) a.style.height = t + "px";
          a.style.display = t ? "" : "none";
        }
        for (f = 0; f < 6; f++)
          for (j = 0; j <= 6; j++) {
            x = this.ID + "_D" + (f + 1) + "_" + (j + 1);
            if ((od = document.getElementById(x))) {
              a = new Date(k, n - 1, o);
              this.DisplayedDates[f * 7 + j] = a;
              y =
                this.SelectType == ngcalSelectRange
                  ? a >= this.SelectFrom && a <= this.SelectTo
                  : typeof this.SelectedDates[a] !== "undefined";
              t = !this.Enabled || n != e ? false : this.IsDayEnabled(a);
              q = a - d == 0;
              u = b + "Days " + b + (q ? "Now" : "Day");
              if (y) u += "Selected";
              t || (u += "Disabled");
              if (ngcal_CurrentDay == x) u += "_Focus";
              if (
                (q = this.OnGetDayImg
                  ? this.OnGetDayImg(this, a, j, f)
                  : q && this.ImgNow
                    ? this.ImgNow
                    : this.ImgDay)
              )
                ngc_ChangeImage(
                  ngcal_DayImgDrawProps(x + "I", y ? 1 : 0, t, q)
                );
              x = this.OnGetDayAlt
                ? ngVal(this.OnGetGetDayAlt(this, a, j, f), "")
                : this.FormatDate(a);
              a = this.OnGetDayText
                ? ngVal(this.OnGetGetDayText(this, a, j, f), "")
                : o;
              ng_SetInnerHTML(od, a);
              od.title = x;
              od.className = u;
              od.onmouseover = function(z) {
                ngcal_DE(z, this);
              };
              od.onmouseout = function(z) {
                ngcal_DL(z, this);
              };
              od.onclick = function(z) {
                ngcal_MD(z, this);
              };
              od.onselectstart = function() {
                return false;
              };
              od.style.cursor = t ? "pointer" : "default";
              o++;
              if (o > g[n]) {
                o = 1;
                n++;
              }
              if (n > 12) {
                n = 1;
                k++;
              }
            }
          }
      }
    }
  }
}
function ngcal_DoUpdate(a) {
  var b = this.BaseClassName,
    d = new ngStringBuilder();
  d.append(
    '<table id="' +
      this.ID +
      '_Tab" cellspacing="0" border="0" cellpadding="0">'
  );
  d.append(
    '<tr><td id="' +
      this.ID +
      '_Head" class="' +
      b +
      'Header" colspan="7" align="left" valign="top"><div style="position:absolute;">'
  );
  for (var e, f, g, j = 0; j < 6; j++) {
    switch (j) {
      case 0:
        f = this.PrevMonBtn;
        g = "PrevMon";
        break;
      case 1:
        e = this.ID + "_MON";
        g = "Month" + (this.Enabled ? "" : "Disabled");
        f = null;
        break;
      case 2:
        f = this.NextMonBtn;
        g = "NextMon";
        break;
      case 3:
        f = this.PrevYearBtn;
        g = "PrevYear";
        break;
      case 4:
        e = this.ID + "_YEAR";
        g = "Year" + (this.Enabled ? "" : "Disabled");
        f = null;
        break;
      case 5:
        f = this.NextYearBtn;
        g = "NextYear";
        break;
    }
    if (f) {
      f.ID == "" && f.Attach(this.ID + "_B" + (j + 1));
      e = f.ID;
      f.Enabled = this.Enabled;
      if (typeof f.className !== "undefined") g = f.className;
    }
    d.append(
      '<div id="' +
        e +
        '" class="' +
        b +
        g +
        '" style="position:absolute;"></div>'
    );
  }
  d.append("</div>&nbsp;</td></tr>");
  var k,
    n,
    o = ngTxt("calendar_days_short"),
    t = ngTxt("calendar_days");
  d.append('<tr id="' + this.ID + '_WeekDays" class="' + b + 'WeekDaysRow">');
  for (j = 0; j < 7; j++) {
    d.append("<td>");
    e = (this.WeekStartDay + j) % 7;
    n = ngVal(this.HiliteWeekDays[e], false);
    if (
      (g = this.OnGetWeekDayImg
        ? this.OnGetWeekDayImg(this, e)
        : this.ImgWeekDay)
    ) {
      k = ngc_ImgProps(this.ID + "_WD" + k, n ? 1 : 0, this.Enabled, g);
      ngc_Img(d, k, "position:absolute;", ngVal(g.Attrs, ""));
    }
    g = "WeekDay";
    if (n) g += "Hilite";
    this.Enabled || (g += "Disabled");
    n = this.OnGetWeekDayAlt
      ? ngVal(this.OnGetGetWeekDayAlt(this, e), "")
      : t[e];
    e = this.OnGetWeekDayText
      ? ngVal(this.OnGetGetWeekDayText(this, e), "")
      : o[e];
    d.append(
      '<div class="' +
        b +
        "WeekDays " +
        b +
        g +
        '" title="' +
        ng_htmlEncode(n) +
        '">' +
        e +
        "</div></td>"
    );
  }
  d.append("</tr>");
  for (j = j = 1; j <= 6; j++) {
    d.append("<tr>");
    for (o = 1; o <= 7; o++) {
      d.append("<td>");
      e = this.ID + "_D" + j + "_" + o;
      if (
        (g = this.OnGetDayImg
          ? this.OnGetDayImg(this, null, o - 1, j - 1)
          : this.ImgDay)
      ) {
        k = ngcal_DayImgDrawProps(e + "I", 0, this.Enabled, g);
        ngc_Img(d, k, "position:absolute;", ngVal(g.Attrs, ""));
      }
      d.append('<div id="' + e + '"></div></td>');
    }
    d.append("</tr>");
  }
  if (this.FastNavigation && this.FastButtons && this.FastButtons.length > 0) {
    d.append(
      '<tr><td id="' +
        this.ID +
        '_Foot" class="' +
        b +
        'Footer" colspan="7" align="left" valign="top"><div style="position: absolute;">'
    );
    for (j = 0; j < this.FastButtons.length; j++) {
      g = b + "FastBtn";
      if ((f = this.FastButtons[j])) {
        f.Enabled = this.Enabled;
        f.Parent = this;
        if (f.Visible) {
          f.ID == "" && f.Attach(this.ID + "_FB" + (j + 1));
          if (typeof f.className !== "undefined") {
            g = f.className;
            e = g.indexOf(" ");
            f.BaseClassName = e >= 0 ? g.substr(0, e) : g;
          }
          d
            .append('<div id="')
            .append(f.ID)
            .append('" class="')
            .append(g)
            .append('" style="position: absolute; z-index:1;"></div>');
        }
      }
    }
    d.append("</div></td></tr>");
  }
  d.append("</table>");
  (b = !ng_EmptyVar(this.Frame)) &&
    d.append(
      '<div id="' +
        this.ID +
        '_F" style="position: absolute;left:0px;top:0px;z-index:800;"></div>'
    );
  ng_SetInnerHTML(a, d.toString());
  for (j = 0; j < 6; j++) {
    switch (j) {
      case 0:
        f = this.PrevMonBtn;
        break;
      case 1:
        f = null;
        break;
      case 2:
        f = this.NextMonBtn;
        break;
      case 3:
        f = this.PrevYearBtn;
        break;
      case 4:
        f = null;
        break;
      case 5:
        f = this.NextYearBtn;
        break;
    }
    if (f) {
      f.Parent = this;
      f.Update();
    }
  }
  this.UpdateCalendar();
  a.style.width = "";
  a.style.height = "";
  e = ng_ClientWidth(a);
  if (this.FastNavigation && this.FastButtons && this.FastButtons.length > 0) {
    for (j = g = k = d = 0; j < this.FastButtons.length; j++)
      if ((f = this.FastButtons[j])) {
        f.Update();
        if ((o = f.Elm())) {
          f = ng_OuterWidth(o);
          if (k + f > e && k > 0) {
            g += d;
            d = k = 0;
          }
          o.style.left = k + "px";
          o.style.top = g + "px";
          o = ng_OuterHeight(o);
          if (o > d) d = o;
          k += f;
        }
      }
    g += d;
    if ((o = document.getElementById(this.ID + "_Foot")))
      o.style.height = g + "px";
  }
  f = ng_ClientHeight(a);
  ng_SetClientWidth(a, e);
  ng_SetClientHeight(a, f);
  j = ng_StyleWidth(a);
  a = ng_StyleHeight(a);
  if (this.Bounds.W != j || this.Bounds.H != a) {
    this.Bounds.W = j;
    this.Bounds.H = a;
    this.SetBounds();
  }
  if ((j = ngVal(this.DropDownOwner, null))) this.MaxHeight = f;
  if (b)
    if ((a = document.getElementById(this.ID + "_F"))) {
      j = new ngStringBuilder();
      ngc_ImgBox(
        j,
        this.ID,
        "ngCalendar",
        this.ControlHasFocus ? 1 : 0,
        this.Enabled,
        0,
        0,
        e,
        f,
        false,
        this.Frame
      );
      ng_SetInnerHTML(a, j.toString());
    }
  return true;
}
var ngcal_LeaveTimer = null;
function ngcal_DoMouseEnter(a, b) {
  ngcal_LeaveTimer && clearTimeout(ngcal_LeaveTimer);
  ngcal_LeaveTimer = null;
  b && b.Object && b.Object != this && ngcal_DoLeave(b.Object.ID);
  this.OnMouseEnter && this.OnMouseEnter(this);
}
function ngcal_DoLeave(a) {
  ngcal_LeaveTimer && clearTimeout(ngcal_LeaveTimer);
  ngcal_LeaveTimer = null;
  var b = ngGetControlById(a, "ngCalendar");
  if (a) {
    if (ngcal_CurrentDay != "")
      (a = document.getElementById(ngcal_CurrentDay)) && ngcal_DL(null, a);
    b.OnMouseLeave && b.OnMouseLeave(b);
  }
}
function ngcal_DoMouseLeave() {
  ngcal_LeaveTimer = setTimeout("ngcal_DoLeave('" + this.ID + "');", 100);
}
function ngcal_DoDropDown(a) {
  typeof a.GetDate === "function"
    ? this.SetSelected(a.GetDate())
    : this.SetSelected(a.GetText());
  this.SetVisible(true);
  this.SetFocus();
}
function ngcal_FormatDate(a) {
  if (this.OnFormatDate) return this.OnFormatDate(this, a);
  var b = this.DateFormat;
  if (b == "") {
    var d = ngVal(this.DropDownOwner, null);
    if (d) b = ngVal(d.DateFormat, "");
  }
  return ng_FormatDate(a, b);
}
function ngcal_ParseDate(a) {
  if (this.OnParseDate) return this.OnParseDate(this, a);
  var b = this.DateFormat;
  if (b == "") {
    var d = ngVal(this.DropDownOwner, null);
    if (d) b = ngVal(d.DateFormat, "");
  }
  return ng_ParseDate(a, b);
}
function ngCalendar(a) {
  ngControl(this, a, "ngCalendar");
  this.CurrentDate = new Date();
  this.WeekStartDay = 1;
  this.HiliteWeekDays = { 0: true };
  this.DateFormat = "";
  this.ImgNow = this.ImgDay = this.ImgWeekDay = null;
  a = new ngButton();
  a.Text = "&lt;";
  a.Alt = ngTxt("calendar_prevmonth");
  a.OnClick = function(b) {
    b.Owner.Parent && b.Owner.Parent.PrevMonth();
  };
  this.PrevMonBtn = a;
  a = new ngButton();
  a.Text = "&gt;";
  a.Alt = ngTxt("calendar_nextmonth");
  a.OnClick = function(b) {
    b.Owner.Parent && b.Owner.Parent.NextMonth(!b.Owner.Parent.YearNavigation);
  };
  this.NextMonBtn = a;
  a = new ngButton();
  a.Text = "&lt;";
  a.Alt = ngTxt("calendar_prevyear");
  a.OnClick = function(b) {
    b.Owner.Parent && b.Owner.Parent.PrevYear(!b.Owner.Parent.YearNavigation);
  };
  this.PrevYearBtn = a;
  a = new ngButton();
  a.Text = "&gt;";
  a.Alt = ngTxt("calendar_nextyear");
  a.OnClick = function(b) {
    b.Owner.Parent && b.Owner.Parent.NextYear();
  };
  this.NextYearBtn = a;
  a = new ngButton();
  a.Text = ngTxt("calendar_today");
  a.Alt = ngTxt("calendar_today");
  a.OnClick = function(b) {
    b.Owner.Parent && b.Owner.Parent.SelectDate(new Date());
  };
  this.TodayBtn = a;
  a = new ngButton();
  a.Text = ngTxt("calendar_tomorrow");
  a.Alt = ngTxt("calendar_tomorrow_alt");
  a.OnClick = function(b) {
    if (b.Owner.Parent) {
      var d = new Date();
      d.setDate(d.getDate() + 1);
      b.Owner.Parent.SelectDate(d);
    }
  };
  this.TomorrowBtn = a;
  a = new ngButton();
  a.Text = ngTxt("calendar_nextweek");
  a.Alt = ngTxt("calendar_nextweek_alt");
  a.OnClick = function(b) {
    if (b.Owner.Parent) {
      var d = new Date();
      d.setDate(d.getDate() + 7);
      b.Owner.Parent.SelectDate(d);
    }
  };
  this.NextWeekBtn = a;
  this.FastButtons = new Array(
    this.TodayBtn,
    this.TomorrowBtn,
    this.NextWeekBtn
  );
  this.Navigation = true;
  this.YearNavigation = false;
  this.FastNavigation = true;
  this.DisplayedDates = [];
  this.SelectedDates = [];
  this.SelectType = ngcalSelectSingle;
  this.SelectFrom = new Date();
  this.SelectTo = new Date();
  this.BlockedDates = [];
  this.BlockedWeekDays = [];
  this.MaxDate = this.MinDate = null;
  this.Frame = {};
  this.FormatDate = ngcal_FormatDate;
  this.ParseDate = ngcal_ParseDate;
  this.NextMonth = ngcal_NextMonth;
  this.PrevMonth = ngcal_PrevMonth;
  this.NextYear = ngcal_NextYear;
  this.PrevYear = ngcal_PrevYear;
  this.ClearSelected = ngcal_ClearSelected;
  this.SelectDate = ngcal_SelectDate;
  this.GetSelected = ngcal_GetSelected;
  this.SetSelected = ngcal_SetSelected;
  this.last_selected = null;
  this.SelectChanged = ngcal_SelectChanged;
  this.IsDayEnabled = ngcal_IsDayEnabled;
  this.DoUpdate = ngcal_DoUpdate;
  this.need_update = false;
  this.update_cnt = 0;
  this.BeginUpdate = ngcal_BeginUpdate;
  this.EndUpdate = ngcal_EndUpdate;
  this.UpdateCalendar = ngcal_UpdateCalendar;
  this.DoDropDown = ngcal_DoDropDown;
  this.DoMouseEnter = ngcal_DoMouseEnter;
  this.DoMouseLeave = ngcal_DoMouseLeave;
  this.OnMouseLeave = this.OnMouseEnter = this.OnGetDayAlt = this.OnGetDayText = this.OnGetDayImg = this.OnGetWeekDayAlt = this.OnGetWeekDayText = this.OnGetWeekDayImg = this.OnSelectChanged = this.OnIsDayEnabled = this.OnDayClick = this.OnParseDate = this.OnFormatDate = null;
  ngControlCreated(this);
}
function Create_ngEditDate(a, b, d) {
  if ((a = ngCreateControlAsType(a, "ngEdit", b, d))) {
    a.DateFormat = "";
    a.FormatDate = function(e) {
      if (this.OnFormatDate) return this.OnFormatDate(this, e);
      return ng_FormatDate(e, this.DateFormat);
    };
    a.ParseDate = function(e) {
      if (this.OnParseDate) return this.OnParseDate(this, e);
      return ng_ParseDate(e, this.DateFormat);
    };
    a.GetDate = function() {
      return this.ParseDate(this.GetText());
    };
    a.SetDate = function(e) {
      this.SetText(this.FormatDate(e));
    };
    a.OnFormatDate = null;
    a.OnParseDate = null;
    return a;
  }
}
function Create_ngEditTime(a, b, d) {
  if ((a = ngCreateControlAsType(a, "ngEdit", b, d))) {
    a.TimeFormat = "";
    a.FormatTime = function(e) {
      if (this.OnFormatTime) return this.OnFormatTime(this, e);
      return ng_FormatTime(e, this.TimeFormat);
    };
    a.ParseTime = function(e) {
      if (this.OnParseTime) return this.OnParseTime(this, e);
      return ng_ParseTime(e, this.DateFormat);
    };
    a.GetDate = function() {
      return this.ParseTime(this.GetText());
    };
    a.SetDate = function(e) {
      this.SetText(this.FormatTime(e));
    };
    a.OnFormatTime = null;
    a.OnParseTime = null;
    return a;
  }
}
if (typeof ngUserControls === "undefined") ngUserControls = [];
ngUserControls.calendar = {
  OnInit: function() {
    ngRegisterControlType("ngCalendar", function() {
      return new ngCalendar();
    });
    ngRegisterControlType("ngEditDate", Create_ngEditDate);
    ngRegisterControlType("ngEditTime", Create_ngEditTime);
  }
};
function ngclip_SetTextNone() {
  return false;
}
function ngclip_SetTextIE(a) {
  try {
    window.clipboardData.setData("Text", a);
    return true;
  } catch (b) {}
  return false;
}
function ngClipboard() {
  if (ngIExplorer) {
    this.SetText = ngclip_SetTextIE;
    this.IsSupported = true;
  } else {
    this.IsSupported = false;
    this.SetText = ngclip_SetTextNone;
  }
}
if (typeof ngUserControls === "undefined") ngUserControls = [];
ngUserControls.clipboard = {
  OnInit: function() {
    if (typeof ngApp === "object" && ngApp) ngApp.Clipboard = new ngClipboard();
  }
};
var ngControlsVer = 5,
  ngControlsSubVer = 0,
  ngControlsVersion = ngControlsVer + "." + ngControlsSubVer,
  ngControlsCopyright = "Copyright &copy 2008-2014 Position s.r.o.",
  ngApp = null;
if (typeof ngc_Lang === "undefined") ngc_Lang = [];
if (typeof ngc_Lang.en === "undefined") ngc_Lang.en = [];
ngc_Lang.en.ngAppOldControlsVersion =
  "Application requires newer version of Controls.js!\nRequired %s.%s, used %s.%s.\n\nApplication terminated!";
var ngIE6AlignFix = true;
function ngLang(a, b, d) {
  if (typeof a !== "undefined") {
    if (typeof d === "undefined") d = ng_cur_lng;
    d = "" + d;
    if (d != "") {
      if (d == "cs") d = "cz";
      if (typeof ngc_Lang === "undefined") ngc_Lang = [];
      if (typeof ngc_Lang[d] === "undefined") ngc_Lang[d] = [];
      ngc_Lang[d][a] = b;
    }
  }
}
var ng_cur_lng = "en",
  ng_cur_lng_stack = [];
function ngBeginLang(a) {
  ng_cur_lng_stack.push(ng_cur_lng);
  ng_cur_lng = a;
}
function ngEndLang() {
  if (ng_cur_lng_stack.length > 0) ng_cur_lng = ng_cur_lng_stack.pop();
  return ng_cur_lng;
}
function ngTxt(a, b) {
  function d(g, j) {
    var k = g[e];
    k = typeof k === "undefined" ? k : k[j];
    if (typeof k === "undefined" && e != "en") {
      k = g.en;
      k = typeof k === "undefined" ? k : k[j];
    }
    return k;
  }
  var e = typeof ngApp === "object" && ngApp ? ngApp.Lang : "en",
    f;
  if (
    typeof ngDevice !== "undefined" &&
    typeof ngc_Lang["DEV_" + ngDevice] !== "undefined"
  ) {
    f = d(ngc_Lang["DEV_" + ngDevice], a);
    if (typeof f === "undefined") f = d(ngc_Lang, a);
  } else f = d(ngc_Lang, a);
  if (typeof f === "undefined") {
    f = b;
    if (typeof f === "undefined") f = a;
  }
  return f;
}
function ngRes(a) {
  function b(f, g) {
    var j = f.en;
    j = typeof j === "undefined" ? j : j[g];
    if (d == "en") return ng_CopyVar(j);
    f = f[d];
    g = typeof f === "undefined" ? f : f[g];
    if (typeof g === "undefined") return ng_CopyVar(j);
    if (typeof j === "undefined") return ng_CopyVar(g);
    g = ng_CopyVar(g);
    ng_MergeDef(g, j, true);
    return g;
  }
  var d = typeof ngApp === "object" && ngApp ? ngApp.Lang : "en";
  if (
    typeof ngDevice !== "undefined" &&
    typeof ngc_Lang["DEV_" + ngDevice] !== "undefined"
  ) {
    var e = b(ngc_Lang["DEV_" + ngDevice], a);
    if (typeof e !== "undefined") return e;
  }
  return b(ngc_Lang, a);
}
function ng_Expand2Id(a) {
  var b = "",
    d = "";
  if (typeof a === "string") {
    var e = a.indexOf("_");
    if (e >= 0) {
      b = a.substring(0, e);
      d = a.substring(e + 1, a.length);
    }
  }
  return { id1: b, id2: d };
}
function ng_OutlineHTML(a, b) {
  b = ngVal(b, "");
  if (b == "") return a;
  for (var d = new ngStringBuilder(), e = 0; e < 3; e++)
    for (var f = 0; f < 3; f++)
      if (e != 1 || f != 1) {
        d.append(
          '<span style="position: absolute; left:' +
            (e - 1) +
            "px; top:" +
            (f - 1) +
            "px; color: " +
            b +
            '">'
        );
        d.append(a);
        d.append("</span>");
      }
  d.append('<span style="position: absolute; left:0px; top:0px;">');
  d.append(a);
  d.append(
    '</span><span style="visibility:hidden;margin-left:2px;">' + a + "</span>"
  );
  return d.toString();
}
function ng_Align(a) {
  var b = 0,
    d = 0,
    e,
    f,
    g,
    j;
  if (typeof a === "string") a = document.getElementById(a);
  if (!a) return 0;
  e = a.getAttribute("FL");
  g = a.getAttribute("FR");
  f = a.getAttribute("FT");
  j = a.getAttribute("FB");
  if (!ng_nullAttr(e) && !ng_nullAttr(g)) b |= 4;
  else if (ng_nullAttr(g))
    if (a.style.left != "" && a.style.right != "") d |= 4;
    else {
      if (a.style.right != "") d |= 1;
    }
  else b |= 1;
  if (!ng_nullAttr(f) && !ng_nullAttr(j)) b |= 8;
  else if (ng_nullAttr(j))
    if (a.style.top != "" && a.style.bottom != "") d |= 8;
    else {
      if (a.style.bottom != "") d |= 2;
    }
  else b |= 2;
  if (b) {
    var k = a.parentNode;
    if (b & 5) {
      var n;
      n = k && k != document.body ? ng_ClientWidth(k) : ng_WindowWidth();
      if (b & 4) {
        e = n - g - e;
        if (e < 0) e = 0;
        ng_SetOuterWidth(a, e);
      } else if (b & 1) {
        e = ng_OuterWidth(a);
        a.style.pixelLeft = n - g - e;
      }
    }
    if (b & 10) {
      g = k && k != document.body ? ng_ClientHeight(k) : ng_WindowHeight();
      if (b & 8) {
        f = g - j - f;
        if (f < 0) f = 0;
        ng_SetOuterHeight(a, f);
      } else if (b & 2) {
        f = ng_OuterHeight(a);
        a.style.pixelTop = g - j - f;
      }
    }
  }
  return b | d;
}
function ng_SetOpacity(a, b) {
  if (typeof a === "string") a = document.getElementById(a);
  if (a) {
    if (b < 0) b = 0;
    if (b > 1) b = 1;
    a.style.opacity = b;
    a.style.filter = "alpha(opacity=" + b * 100 + ")";
  }
}
function ng_CanSelectElm(a) {
  if (
    a &&
    a.style.visibility !== "hidden" &&
    a.style.display !== "none" &&
    !a.disabled
  )
    switch (a.nodeName) {
      case "INPUT":
      case "TEXTAREA":
        return true;
    }
  return false;
}
function ng_CanFocusElm(a) {
  if (
    a &&
    a.style.visibility !== "hidden" &&
    a.style.display !== "none" &&
    !a.disabled
  ) {
    if (ngIExplorer && a.attributes.tabIndex && a.attributes.tabIndex.specified)
      return true;
    switch (a.nodeName) {
      case "A":
      case "AREA":
      case "BUTTON":
      case "FRAME":
      case "IFRAME":
      case "INPUT":
      case "OBJECT":
      case "SELECT":
      case "TEXTAREA":
        return true;
    }
    if (a.getAttribute("tabIndex") !== null) return true;
  }
  return false;
}
var ng_CreateImageHTML = function(a, b, d, e, f, g, j, k, n) {
  ng_CreateImageHTML = ngIExplorer6
    ? ng_CreateImageHTMLIE6
    : ng_CreateImageHTMLNotIE6;
  return ng_CreateImageHTML(a, b, d, e, f, g, j, k, n);
};
function ng_CreateImageHTMLNotIE6(a, b, d, e, f, g, j, k, n) {
  if (typeof k === "undefined") k = "";
  if (typeof j === "undefined") j = "";
  if (typeof n === "undefined") n = "";
  if (b != "")
    j =
      "background: transparent url('" +
      b +
      "') no-repeat scroll " +
      -d +
      "px " +
      -e +
      (e == 0 ? "pt" : "px") +
      ";" +
      j;
  else if (ngIExplorer)
    j = "background: transparent url('" + ngEmptyURL + "');" + j;
  return (
    '<span id="' +
    a +
    '" unselectable="on" style="font-size:0;line-height:0;overflow:hidden;width:' +
    f +
    "px;height:" +
    g +
    "px;" +
    j +
    '" ' +
    k +
    ">" +
    n +
    "</span>"
  );
}
function ng_CreateImageHTMLIE6(a, b, d, e, f, g, j, k, n) {
  if (typeof k === "undefined") k = "";
  if (typeof j === "undefined") j = "";
  if (typeof n === "undefined") n = "";
  if (b != "")
    n =
      '<span id="' +
      a +
      '_png" unselectable="on" style="position:absolute;font-size:0;line-height:0;left:' +
      -d +
      "px;top:" +
      -e +
      "px;width:" +
      (d + f) +
      "px;height:" +
      (e + g) +
      "px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" +
      b +
      "');\"></span>" +
      n;
  else j = "background: transparent url('" + ngEmptyURL + "');" + j;
  return (
    '<span id="' +
    a +
    '" unselectable="on" style="font-size:0;line-height:0;overflow:hidden;width:' +
    f +
    "px;height:" +
    g +
    "px;" +
    j +
    '" ' +
    k +
    ">" +
    n +
    "</span>"
  );
}
function ng_CreateImageHTMLSW(a, b, d, e, f, g, j, k, n, o, t) {
  if (typeof o === "undefined") o = "";
  if (typeof n === "undefined") n = "";
  if (typeof t === "undefined") t = "";
  if (typeof j === "undefined" || e == "")
    if (ngIExplorer6 && e != "") {
      j = ng_PreloadImage(e);
      if (!j) return "";
      j = j.width;
    } else {
      if (e != "")
        n =
          "background: transparent url('" +
          e +
          "') repeat-x scroll " +
          -f +
          "px " +
          -g +
          (g == 0 ? "pt" : "px") +
          ";" +
          n;
      else if (ngIExplorer)
        n = "background: transparent url('" + ngEmptyURL + "');" + n;
      return (
        '<span id="' +
        a +
        '_1" unselectable="on" style="font-size:0;line-height:0;overflow:hidden;width:' +
        d +
        "px;height:" +
        k +
        "px;" +
        n +
        "left:" +
        b +
        'px;" ' +
        o +
        ">" +
        t +
        "</span>"
      );
    }
  if (j <= 0) return "";
  for (var q = new ngStringBuilder(), u = 1; d > 0; ) {
    if (d < j) j = d;
    q.append(
      ng_CreateImageHTML(
        a + "_" + u,
        e,
        f,
        g,
        j,
        k,
        n + "left:" + b + "px;",
        o,
        t
      )
    );
    d -= j;
    b += j;
    u++;
  }
  return q.toString();
}
function ng_CreateImageHTMLSH(a, b, d, e, f, g, j, k, n, o, t) {
  if (typeof o === "undefined") o = "";
  if (typeof n === "undefined") n = "";
  if (typeof t === "undefined") t = "";
  if (typeof k === "undefined" || e == "")
    if (ngIExplorer6 && e != "") {
      k = ng_PreloadImage(e);
      if (!k) return "";
      k = k.height;
    } else {
      if (e != "")
        n =
          "background: transparent url('" +
          e +
          "') repeat-y scroll " +
          -f +
          "px " +
          -g +
          (g == 0 ? "pt" : "px") +
          ";" +
          n;
      else if (ngIExplorer)
        n = "background: transparent url('" + ngEmptyURL + "');" + n;
      return (
        '<span id="' +
        a +
        '_1" unselectable="on" style="font-size:0;line-height:0;overflow:hidden;width:' +
        j +
        "px;height:" +
        d +
        "px;" +
        n +
        "top:" +
        b +
        'px" ' +
        o +
        ">" +
        t +
        "</span>"
      );
    }
  if (k <= 0) return "";
  for (var q = new ngStringBuilder(), u = 1; d > 0; ) {
    if (d < k) k = d;
    q.append(
      ng_CreateImageHTML(
        a + "_" + u,
        e,
        f,
        g,
        j,
        k,
        n + "top:" + b + "px;",
        o,
        t
      )
    );
    d -= k;
    b += k;
    u++;
  }
  return q.toString();
}
function ng_SwapImageHTML(a, b, d) {
  var e;
  if (!(typeof b === "undefined" || typeof d === "undefined")) {
    if (ngIExplorer6)
      if ((e = document.getElementById(a + "_png"))) {
        e.style.pixelLeft = -b;
        e.style.pixelTop = -d;
        return;
      }
    if ((e = document.getElementById(a)))
      e.style.backgroundPosition = -b + "px " + -d + (d == 0 ? "pt" : "px");
  }
}
function ng_CreateBoxHTML(a, b, d, e, f, g, j, k, n, o) {
  var t = new ngStringBuilder(),
    q = { L: 0, T: 0, W: 0, H: 0 };
  n = "position:absolute;" + n;
  var u = {};
  u.Left = typeof k.Left === "undefined" ? q : k.Left;
  u.Top = typeof k.Top === "undefined" ? q : k.Top;
  u.Right = typeof k.Right === "undefined" ? q : k.Right;
  u.Bottom = typeof k.Bottom === "undefined" ? q : k.Bottom;
  u.LeftTop = typeof k.LeftTop === "undefined" ? q : k.LeftTop;
  u.RightTop = typeof k.RightTop === "undefined" ? q : k.RightTop;
  u.LeftBottom = typeof k.LeftBottom === "undefined" ? q : k.LeftBottom;
  u.RightBottom = typeof k.RightBottom === "undefined" ? q : k.RightBottom;
  if (j) {
    f += u.Left.W;
    f += u.Right.W;
    g += u.Top.H;
    g += u.Bottom.H;
  }
  j = u.LeftTop;
  j.W &&
    t.append(
      ng_CreateImageHTML(
        a + "_LT",
        ngVal(j.Src, b),
        j.L,
        j.T,
        j.W,
        j.H,
        n + "left:" + d + "px;top: " + e + "px;"
      )
    );
  j = u.Top;
  j.W &&
    t.append(
      ng_CreateImageHTMLSW(
        a + "_T",
        u.LeftTop.W,
        f - u.LeftTop.W - u.RightTop.W,
        ngVal(j.Src, b),
        j.L,
        j.T,
        j.W,
        j.H,
        n + "top: " + e + "px;"
      )
    );
  j = u.RightTop;
  j.W &&
    t.append(
      ng_CreateImageHTML(
        a + "_RT",
        ngVal(j.Src, b),
        j.L,
        j.T,
        j.W,
        j.H,
        n + "left:" + (d + f - j.W) + "px;top: " + e + "px;"
      )
    );
  j = u.Left;
  if (j.W)
    t.append(
      ng_CreateImageHTMLSH(
        a + "_L",
        e + (u.LeftTop.H ? u.LeftTop.H : u.Top.H),
        g -
          (u.LeftTop.H ? u.LeftTop.H : u.Top.H) -
          (u.LeftBottom.H ? u.LeftBottom.H : u.Bottom.H),
        ngVal(j.Src, b),
        j.L,
        j.T,
        j.W,
        j.H,
        n + "left: " + d + "px;"
      )
    );
  j = u.Right;
  if (j.W)
    t.append(
      ng_CreateImageHTMLSH(
        a + "_R",
        e + (u.RightTop.H ? u.RightTop.H : u.Top.H),
        g -
          (u.RightTop.H ? u.RightTop.H : u.Top.H) -
          (u.RightBottom.H ? u.RightBottom.H : u.Bottom.H),
        ngVal(j.Src, b),
        j.L,
        j.T,
        j.W,
        j.H,
        n + "left: " + (d + f - j.W) + "px;"
      )
    );
  j = u.LeftBottom;
  j.W &&
    t.append(
      ng_CreateImageHTML(
        a + "_LB",
        ngVal(j.Src, b),
        j.L,
        j.T,
        j.W,
        j.H,
        n + "left:" + d + "px;top: " + (e + g - j.H) + "px;"
      )
    );
  j = u.Bottom;
  j.W &&
    t.append(
      ng_CreateImageHTMLSW(
        a + "_B",
        u.LeftBottom.W,
        f - u.LeftBottom.W - u.RightBottom.W,
        ngVal(j.Src, b),
        j.L,
        j.T,
        j.W,
        j.H,
        n + "top: " + (e + g - j.H) + "px;"
      )
    );
  j = u.RightBottom;
  j.W &&
    t.append(
      ng_CreateImageHTML(
        a + "_RB",
        ngVal(j.Src, b),
        j.L,
        j.T,
        j.W,
        j.H,
        n + "left:" + (d + f - j.W) + "px;top: " + (e + g - j.H) + "px;"
      )
    );
  if (typeof o !== "undefined") {
    t.append(
      '<div id="' +
        a +
        '_C" style="' +
        n +
        "overflow:auto; left:" +
        (d + u.Left.W) +
        "px;top:" +
        (e + u.Top.W) +
        "px;width:" +
        (f - u.Left.W - u.Right.W) +
        "px;height:" +
        (g - u.Top.H - u.Bottom.H) +
        'px;">'
    );
    t.append(o);
    t.append("</div>");
  }
  return t.toString();
}
var ssNone = 0,
  ssDefault = 1,
  ssAuto = 2,
  ssBoth = 3,
  ssHorizontal = 4,
  ssVertical = 5;
function ng_SetScrollBars(a, b) {
  if (a)
    switch (b) {
      case ssNone:
        a.style.overflow = "hidden";
        a.style.overflowX = "hidden";
        a.style.overflowY = "hidden";
        break;
      case ssAuto:
        a.style.overflow = "auto";
        a.style.overflowX = "auto";
        a.style.overflowY = "auto";
        break;
      case ssBoth:
        a.style.overflow = "scroll";
        a.style.overflowX = "scroll";
        a.style.overflowY = "scroll";
        break;
      case ssHorizontal:
        a.style.overflow = "scroll";
        a.style.overflowX = "scroll";
        a.style.overflowY = "hidden";
        break;
      case ssVertical:
        a.style.overflow = "scroll";
        a.style.overflowX = "hidden";
        a.style.overflowY = "scroll";
        break;
      case ssDefault:
        a.style.overflow = "visible";
        a.style.overflowX = "visible";
        a.style.overflowY = "visible";
        break;
    }
}
function ng_GetScrollBars(a) {
  var b = ng_GetCurrentStyle(a, "overflow-x"),
    d = ng_GetCurrentStyle(a, "overflow-y");
  if (b == "" || d == "") {
    a = ng_GetCurrentStyle(a, "overflow");
    if (a == "") a = "hidden";
    if (b == "") b = a;
    if (d == "") d = a;
  }
  a = ssNone;
  if (b == "auto" || d == "auto") a = ssAuto;
  else if (b == "scroll" && d == "scroll") a = ssBoth;
  else if (b == "visible" && d == "visible") a = ssDefault;
  else if (b == "scroll") a = ssHorizontal;
  else if (d == "scroll") a = ssVertical;
  return a;
}
var ngControlsIDs = [],
  ngControlImages = "",
  ngRegisteredControlTypes = [],
  ngMouseInControls = [];
function ngGetControlById(a, b) {
  if (a == "") return null;
  a = ngControlsIDs[a];
  if (!a) return null;
  if (typeof b !== "undefined" && ngVal(a.CtrlType, -1) != b) return null;
  return a;
}
function ngGetControlByElement(a, b) {
  if (typeof a === "string") a = document.getElementById(a);
  if (!a) return null;
  var d;
  for (a = a; a && a !== document; ) {
    if ((d = ngGetControlById(a.id, b))) break;
    a = a.parentNode;
  }
  return d;
}
function ngRegisterControlType(a, b) {
  if (typeof a === "string")
    switch (typeof b) {
      case "function":
        typeof ngRegisteredControlTypes[a] === "function" &&
          ngDEBUGWARN(
            'Duplicated registration of component type "%s".',
            ngVal(a, ""),
            b
          );
        ngRegisteredControlTypes[a] = b;
        break;
      case "object":
        if (typeof b.Type === "undefined" || b.Type == a) break;
        ngRegisterControlType(a, function(d, e, f) {
          var g = ng_CopyVar(b),
            j = g.Type;
          delete g.Type;
          ng_MergeDef(d, g, true);
          return ngCreateControlAsType(d, j, e, f);
        });
        break;
      case "string":
        ngRegisterControlType(a, function(d, e, f) {
          return ngCreateControlAsType(d, b, e, f);
        });
        break;
    }
}
ngRegisterControlType("ngPanel", function() {
  return new ngPanel();
});
ngRegisterControlType("ngText", function() {
  return new ngText();
});
ngRegisterControlType("ngImage", function() {
  return new ngImage();
});
ngRegisterControlType("ngImageMap", function() {
  return new ngImageMap();
});
ngRegisterControlType("ngButton", function() {
  return new ngButton();
});
ngRegisterControlType("ngGroup", function() {
  return new ngGroup();
});
ngRegisterControlType("ngEdit", function() {
  return new ngEdit();
});
ngRegisterControlType("ngMemo", function() {
  return new ngMemo();
});
ngRegisterControlType("ngPages", function() {
  return new ngPages();
});
ngRegisterControlType("ngToolBar", function() {
  return new ngToolBar();
});
ngRegisterControlType("ngProgressBar", function() {
  return new ngProgressBar();
});
ngRegisterControlType("ngWebBrowser", function() {
  return new ngWebBrowser();
});
ngRegisterControlType("ngSysAction", function() {
  return new ngSysAction();
});
ngRegisterControlType("ngFrame", ngFrame_Create);
ngRegisterControlType("ngRadioButton", ngRadioCheckBox_Create);
ngRegisterControlType("ngCheckBox", ngRadioCheckBox_Create);
ngRegisterControlType("ngDropDownList", function(a, b, d) {
  return ngDropDown_Create(a, b, d, "ngEdit", true);
});
ngRegisterControlType("ngDropDown", function(a, b, d) {
  return ngDropDown_Create(a, b, d, "ngEdit", false);
});
ngRegisterControlType("ngEditNum", ngEditNum_Create);
var ngCtrlCnt = 1;
function ngCreateControlId(a) {
  var b = "";
  a = ngVal(a, "");
  for (var d = 0; d < 100; d++) {
    b = a + ngCtrlCnt;
    ngCtrlCnt++;
    if (!ngGetControlById(b)) break;
  }
  return b;
}
var ngOnCreateControl = null;
function ngControlCreated(a) {
  ngOnCreateControl && ngOnCreateControl(a);
}
if (typeof ngUserControls === "undefined") ngUserControls = [];
function ngUsrCtrlSetImages(a, b) {
  if (!(typeof a !== "object" || !a)) {
    if (typeof a._noMerge === "undefined") a._noMerge = true;
    if (typeof a.Src === "undefined") a.Src = b;
    for (var d in a) typeof a[d] === "object" && ngUsrCtrlSetImages(a[d], b);
  }
}
function ngUsrCtrlSetImagesArray(a, b) {
  if (!(typeof a !== "object" || !a)) {
    if (typeof a._noMerge === "undefined") a._noMerge = true;
    if (typeof a.Src === "undefined") a.Src = b[0];
    else if (typeof a.Src === "number") a.Src = b[a.Src];
    for (var d in a)
      typeof a[d] === "object" && ngUsrCtrlSetImagesArray(a[d], b);
  }
}
function ngInitUserControls() {
  if (typeof ngUserControls !== "undefined") {
    var a;
    for (var b in ngUserControls) {
      a = ngUserControls[b];
      if (typeof a !== "undefined") {
        typeof a.OnInit === "function" && a.OnInit();
        if (
          typeof a.ControlImages === "string" &&
          ngControlImages != a.ControlImages
        ) {
          a.ControlImages = ng_URL(a.ControlImages);
          ng_PreloadImage(a.ControlImages);
          ngUsrCtrlSetImages(a.Images, a.ControlImages);
        } else if (
          typeof a.ControlImages === "object" &&
          typeof a.ControlImages.length === "number"
        ) {
          for (var d = 0; d < a.ControlImages.length; d++) {
            a.ControlImages[d] = ng_URL(a.ControlImages[d]);
            ngControlImages != a.ControlImages[d] &&
              ng_PreloadImage(a.ControlImages[d]);
          }
          a.ControlImages.length > 0 &&
            ngUsrCtrlSetImagesArray(a.Images, a.ControlImages);
        }
      }
    }
  }
}
function ng_MergeDef(a, b, d, e) {
  function f(g, j, k) {
    var n, o, t;
    for (var q in j)
      if (typeof g[q] === "undefined" || g[q] === null) g[q] = j[q];
      else {
        n = ng_IsArrayVar(g[q]);
        o = typeof g[q] === "function";
        if (n || o) {
          n = ng_IsArrayVar(j[q]);
          t = typeof j[q] === "function";
          if (n || t) {
            if (o) g[q] = [g[q]];
            if (t) k ? g[q].push(j[q]) : g[q].splice(0, 0, j[q]);
            else if (k) for (o = 0; o < j[q].length; o++) g[q].push(j[q][o]);
            else for (o = 0; o < j[q].length; o++) g[q].splice(o, 0, j[q][o]);
          }
        }
      }
  }
  b = ng_CopyVar(b);
  ngVal(d, false) || (b = ng_CleanUndefined(b));
  ng_MergeVar(a, b, true, function(g, j) {
    if (typeof e === "function" && !ngVal(e(g, j), true)) return false;
    if (g._noMerge === true) return false;
    if (
      typeof g.Events === "object" &&
      typeof j.Events === "object" &&
      g.Events &&
      j.Events
    ) {
      f(g.Events, j.Events, false);
      delete j.Events;
    }
    if (
      typeof g.AfterEvents === "object" &&
      typeof j.AfterEvents === "object" &&
      g.AfterEvents &&
      j.AfterEvents
    ) {
      f(g.AfterEvents, j.AfterEvents, false);
      delete j.AfterEvents;
    }
    if (
      typeof g.BeforeEvents === "object" &&
      typeof j.BeforeEvents === "object" &&
      g.BeforeEvents &&
      j.BeforeEvents
    ) {
      f(g.BeforeEvents, j.BeforeEvents, true);
      delete j.BeforeEvents;
    }
    return true;
  });
}
function ngCreateControl(a, b, d) {
  var e, f, g;
  g = f = null;
  a.CtrlInheritanceDepth = ngVal(a.CtrlInheritanceDepth, 0) + 1;
  try {
    for (e in ngUserControls) {
      g = ngUserControls[e];
      if (typeof g.OnCreateControl === "function")
        f = g.OnCreateControl(a, b, d);
      if (f) break;
    }
    if (!f) {
      var j = ngRegisteredControlTypes[a.Type];
      if (typeof j === "function") f = j(a, b, d);
    }
  } finally {
    a.CtrlInheritanceDepth--;
  }
  if (!f) {
    ngDEBUGWARN('Component type "%s" not found.', ngVal(a.Type, ""), a);
    return null;
  }
  f.CtrlInheritedFrom[f.CtrlInheritedFrom.length] = a.Type;
  f.DefType = a.Type;
  f.Owner = b;
  if (typeof a.Data !== "undefined") for (var k in a.Data) f[k] = a.Data[k];
  if (!a.CtrlInheritanceDepth) {
    if (typeof a.BeforeEvents !== "undefined")
      for (k in a.BeforeEvents) f.AddEvent(a.BeforeEvents[k], k);
    if (typeof a.AfterEvents !== "undefined")
      for (k in a.AfterEvents) f.AddEvent(k, a.AfterEvents[k]);
    if (typeof a.Events !== "undefined")
      for (k in a.Events) f.AddEvent(k, a.Events[k]);
    if (typeof a.OverrideEvents !== "undefined")
      for (k in a.OverrideEvents) f[k] = a.OverrideEvents[k];
    if (typeof f.ngText !== "undefined" && ngVal(f.Text, "") == "")
      f.Text = ngTxt(f.ngText);
    if (typeof f.ngTextD !== "undefined" && !f.OnGetText)
      f.OnGetText = ngc_GetResText;
    if (typeof f.ngAlt !== "undefined" && ngVal(f.Alt, "") == "")
      f.Alt = ngTxt(f.ngAlt);
    if (typeof f.ngAltD !== "undefined" && !f.OnGetAlt)
      f.OnGetAlt = ngc_GetResAlt;
    if (typeof f.ngHint !== "undefined" && ngVal(f.Hint, "") == "")
      f.Hint = ngTxt(f.ngHint);
    if (typeof f.ngHintD !== "undefined" && !f.OnGetHint)
      f.OnGetHint = ngc_GetResHint;
  }
  if (g)
    for (e in ngUserControls) {
      g = ngUserControls[e];
      typeof g.OnControlCreated === "function" && g.OnControlCreated(a, f, b);
    }
  return f;
}
function ngCreateControlAsType(a, b, d, e) {
  var f = a.Type;
  a.Type = b;
  b = ngCreateControl(a, d, e);
  a.Type = f;
  if (b) b.DefType = a.Type;
  return b;
}
var ngCreateControlsOptions = null,
  ngCreateControlsLevel = 0;
function ngCreateControls(a, b, d, e) {
  var f,
    g,
    j,
    k,
    n = null;
  if (typeof b === "undefined") b = {};
  if (typeof a === "undefined") return b;
  if (typeof e === "undefined")
    e = ngCreateControlsOptions ? ngCreateControlsOptions : {};
  var o = ngCreateControlsOptions;
  ngCreateControlsOptions = e;
  try {
    e.CreatedControls || ng_SetByRef(e, "CreatedControls", []);
    ngCreateControlsLevel++;
    try {
      if (typeof d === "undefined") d = ngApp.Elm();
      if (typeof d === "string") n = ngGetControlById(d);
      else if (typeof d === "object" && d)
        if (typeof d.Elm === "function") {
          n = d;
          d = d.Elm();
        } else if (ngVal(d.id, "") != "") n = ngGetControlById(d.id);
      for (f in a) {
        if (e.ModifyControls && typeof e.ModifyControls[f] !== "undefined") {
          j = e.ModifyControls[f];
          delete e.ModifyControls[f];
          if (typeof j !== "object" || !j) continue;
          ng_MergeDef(j, a[f]);
          a[f] = j;
        } else {
          j = a[f];
          if (typeof j !== "object" || !j) continue;
        }
        if (typeof d !== "undefined") j.parent = ngVal(j.parent, d);
        if (j.OnCreating) {
          k = j.OnCreating;
          delete j.OnCreating;
          if (!ngVal(k(j, b, d, e), false)) continue;
        }
        if (!(e.OnCreating && !ngVal(e.OnCreating(j, b, d, e), false)))
          if ((g = ngCreateControl(j, b, d)) && f != "") {
            ngAddChildControl(n, g);
            var t = {};
            t.Control = g;
            t.Options = null;
            t.OnCreated = j.OnCreated;
            t.Ref = b;
            delete j.OnCreated;
            g.Create(j, b);
            j.OnCreated = t.OnCreated;
            ngHASDEBUG() &&
              typeof b[f] !== "undefined" &&
              b[f] !== null &&
              ngDEBUGWARN(
                'Reference "%s" was overwritten by %o. References: %o',
                f,
                g,
                b
              );
            b[f] = g;
            t.OnCreated = j.OnCreated;
            e.CreatedControls[e.CreatedControls.length] = t;
            var q = ngVal(j.ParentReferences, true);
            if (!q) {
              var u;
              if (typeof g.Controls !== "undefined") u = g.Controls;
              else {
                u = {};
                g.Controls = u;
              }
              u.Owner = ngVal(u.Owner, g);
              if (typeof u.Dispose !== "function")
                u.Dispose = function() {
                  ngDisposeControls(this);
                };
              if (typeof u.AddControls !== "function")
                u.AddControls = function(z, B) {
                  ngCreateControls(
                    z,
                    this,
                    ngVal(
                      B,
                      ng_EmptyVar(this.Owner) ? undefined : this.Owner.ID
                    )
                  );
                };
            }
            if (typeof j.Controls !== "undefined") {
              var x = e.ModifyControls;
              !q && e.ModifyControls && delete e.ModifyControls;
              try {
                if (typeof j.ModifyControls !== "undefined") {
                  ng_MergeDef(j.ModifyControls, e.ModifyControls, true);
                  e.ModifyControls = j.ModifyControls;
                }
                ngCreateControls(j.Controls, q ? b : u, g.ID, e);
              } finally {
                if (t.OnCreated) t.Options = ng_CopyVar(e);
                if (!x && ngHASDEBUG() && e.ModifyControls)
                  for (var w in e.ModifyControls)
                    ngDEBUGWARN(
                      'Component referenced by "%s" doesn\'t have an subcomponent "%s" which should be modified.',
                      f,
                      w,
                      b
                    );
                e.ModifyControls = x;
              }
            } else if (t.OnCreated) t.Options = ng_CopyVar(e);
          } else
            f != "" &&
              ngDEBUGWARN(
                'Component referenced by "%s" was not created.',
                f,
                b
              );
      }
    } catch (y) {
      ngDEBUGERROR(y);
    }
    ngCreateControlsLevel--;
    if (!ngCreateControlsLevel)
      for (f = 0; f < e.CreatedControls.length; f++) {
        t = e.CreatedControls[f];
        k = t.OnCreated;
        t.OnCreated = null;
        if (k) {
          ngCreateControlsOptions = t.Options;
          g = t.Control;
          g.OnCreated = k;
          k(g, t.Ref, t.Options);
        }
        e.OnCreated && e.OnCreated(g, t.Ref, t.Options);
      }
  } finally {
    ngCreateControlsOptions = o;
  }
  return b;
}
function ngCloneRefs(a, b) {
  var d;
  if (ngHASDEBUG())
    for (var e in b) {
      d = b[e];
      d.Owner = a;
      typeof a[e] !== "undefined" &&
        a[e] !== null &&
        ngDEBUGWARN(
          'Reference "%s" was overwritten by %o. References: %o',
          e,
          d,
          a
        );
      a[e] = d;
    }
  else
    for (e in b) {
      d = b[e];
      d.Owner = a;
      a[e] = d;
    }
}
function ngUpdateControls(a) {
  if (typeof a !== "undefined") {
    var b,
      d = [],
      e = [];
    for (var f in a)
      if ((b = a[f])) {
        e[e.length] = b;
        d[b.ID] = true;
      }
    for (f = 0; f < e.length; f++) {
      b = e[f];
      for (a = b.ParentControl; a; ) {
        if (d[a.ID]) break;
        a = a.ParentControl;
      }
      !a && typeof b.Update === "function" && b.Update(true);
    }
  }
}
function ngReleaseControls(a) {
  if (typeof a !== "undefined") {
    var b;
    for (var d in a)
      (b = a[d]) && typeof b.Release === "function" && b.Release();
  }
}
function ngDisposeControls(a) {
  if (typeof a !== "undefined") {
    var b;
    for (var d in a)
      if (
        (b = a[d]) &&
        typeof b === "object" &&
        d != "Owner" &&
        d != "Parent"
      ) {
        typeof b.Dispose === "function" && b.Dispose();
        try {
          delete a[d];
        } catch (e) {}
      }
  }
}
function ngCreateControlHTML(a) {
  if (typeof a === "undefined") a = {};
  if (typeof a === "string") {
    var b = {};
    b.id = a;
    a = b;
  }
  var d = ngVal(a.id, "");
  if (d == "") d = ngCreateControlId(a.Type);
  var e = a.L,
    f = a.T;
  b = a.R;
  var g = a.B,
    j = a.W,
    k = a.H;
  if (typeof e === "number") e += "px";
  if (typeof b === "number") b += "px";
  if (typeof f === "number") f += "px";
  if (typeof g === "number") g += "px";
  if (typeof j === "number") j += "px";
  if (typeof k === "number") k += "px";
  var n = "";
  d = '<DIV id="' + d + '"';
  if (typeof a.className !== "undefined") d += ' class="' + a.className + '"';
  d += ' style="position: absolute; display:none;';
  if (typeof f !== "undefined") d += "top: " + f + ";";
  if (typeof e !== "undefined") d += "left: " + e + ";";
  if (typeof j !== "undefined") d += "width: " + j + ";";
  if (typeof k !== "undefined") d += "height: " + k + ";";
  if (typeof a.B !== "undefined" || typeof a.R !== "undefined")
    if (ngIExplorer6) {
      if (
        (e = ngVal(a.IE6AlignFix, ngIE6AlignFix)) ||
        (typeof a.T !== "undefined" && typeof a.B !== "undefined")
      ) {
        if (typeof a.T !== "undefined") n += 'FT="' + a.T + '" ';
        if (typeof a.B !== "undefined") n += 'FB="' + a.B + '" ';
      } else if (typeof g !== "undefined") d += "bottom: " + g + ";";
      if (e || (typeof a.L !== "undefined" && typeof a.R !== "undefined")) {
        if (typeof a.R !== "undefined") n += 'FR="' + a.R + '" ';
        if (typeof a.L !== "undefined") n += 'FL="' + a.L + '" ';
      } else if (typeof b !== "undefined") d += "right: " + b + ";";
    } else {
      if (typeof g !== "undefined") d += "bottom: " + g + ";";
      if (typeof b !== "undefined") d += "right: " + b + ";";
    }
  d += ngVal(a.style, "") + '" ' + n + ngVal(a.attrs, "") + ">";
  if (typeof a.innerHTML !== "undefined") d += a.innerHTML;
  d += "</DIV>";
  return d;
}
function ngc_Elm() {
  return document.getElementById(this.ID);
}
function ngc_CtrlInheritsFrom(a) {
  if (typeof this.CtrlInheritedFrom !== "undefined")
    for (var b = 0; b < this.CtrlInheritedFrom.length; b++)
      if (this.CtrlInheritedFrom[b] == a) return true;
  return false;
}
function ngc_Create(a, b) {
  if (typeof a === "undefined") a = {};
  var d = a.parent,
    e = ngVal(a.id, "");
  if (d && typeof d === "string") d = document.getElementById(d);
  if (!d) return null;
  if (e == "") e = ngCreateControlId(a.Type);
  var f = document.getElementById(e),
    g = f;
  if (g) {
    p = f.getAttribute("FT");
    this.Bounds.T = ng_nullAttr(p) ? ng_GetStylePx(f.style.top) : p;
    p = f.getAttribute("FB");
    this.Bounds.B = ng_nullAttr(p) ? ng_GetStylePx(f.style.bottom) : p;
    p = f.getAttribute("FL");
    this.Bounds.L = ng_nullAttr(p) ? ng_GetStylePx(f.style.left) : p;
    p = f.getAttribute("FR");
    this.Bounds.R = ng_nullAttr(p) ? ng_GetStylePx(f.style.right) : p;
    if (ngVal(this.Bounds.L, "") == "" || ngVal(this.Bounds.R, "") == "")
      this.Bounds.W = ng_StyleWidth(f);
    if (ngVal(this.Bounds.T, "") == "" || ngVal(this.Bounds.B, "") == "")
      this.Bounds.H = ng_StyleHeight(f);
    ng_SetInnerHTML(f, "");
  } else {
    if (a.OnCreateHTMLElement) {
      g = a.OnCreateHTMLElement(a, b, this);
      if (!g) return null;
    } else g = document.createElement("div");
    g.id = e;
    g.style.display = "none";
  }
  g.style.position = "absolute";
  if (typeof a.className !== "undefined") g.className = a.className;
  var j = ngVal(a.ScrollBars, this.ScrollBars);
  ng_SetScrollBars(g, ngVal(j, ssNone));
  this.ScrollBars = j;
  if (typeof a.L !== "undefined") this.Bounds.L = a.L;
  if (typeof a.T !== "undefined") this.Bounds.T = a.T;
  if (typeof a.R !== "undefined") this.Bounds.R = a.R;
  if (typeof a.B !== "undefined") this.Bounds.B = a.B;
  if (typeof a.W !== "undefined") this.Bounds.W = a.W;
  if (typeof a.H !== "undefined") this.Bounds.H = a.H;
  typeof a.innerHTML !== "undefined" && ng_SetInnerHTML(g, a.innerHTML);
  typeof a.Opacity !== "undefined" && ng_SetOpacity(g, a.Opacity);
  if (typeof a.style !== "undefined")
    for (var k in a.style) g.style[k] = a.style[k];
  f || d.appendChild(g);
  if (e != "") ngControlsIDs[e] = this;
  if (this.Visible) {
    if (this.IsPopup === true && !ngc_ActivatePopup(this)) this.Visible = false;
  } else ngc_DeactivatePopup(this);
  this.Attach(g);
  this.SetBounds();
  this.DoCreate && this.DoCreate(a, b, g, d);
  a.OnCreated && a.OnCreated(this, b);
  return g;
}
function ngc_SetBounds(a) {
  var b = false;
  if (typeof a !== "undefined") {
    if (typeof this.Bounds === "undefined") this.Bounds = {};
    for (var d in a)
      switch (d) {
        case "L":
        case "T":
        case "R":
        case "B":
        case "W":
        case "H":
          if (this.Bounds[d] != a[d] || typeof this.Bounds[d] !== typeof a[d]) {
            this.Bounds[d] = a[d];
            b = true;
          }
          break;
        case "IE6AlignFix":
          if (this.IE6AlignFix != a.IE6AlignFix) {
            this.IE6AlignFix = a.IE6AlignFix;
            if (ngIExplorer6) b = true;
          }
          break;
      }
  } else b = true;
  if (b)
    if ((d = this.Elm())) {
      a = this.Bounds;
      if (typeof a === "undefined") return b;
      a.IE6AlignFix = this.IE6AlignFix;
      ng_SetBounds(d, a);
      delete a.IE6AlignFix;
    }
  return b;
}
function ngc_SetScrollBars(a) {
  this.ScrollBars = a;
  ng_SetScrollBars(this.Elm(), a);
}
function ngc_SetPopup(a) {
  if (this.IsPopup != a) {
    if (this.Visible) a ? ngc_ActivatePopup(this) : ngc_DeactivatePopup(this);
    this.IsPopup = a;
  }
}
function ngc_SetOpacity(a) {
  ng_SetOpacity(this.Elm(), a);
}
function ngc_Attach(a) {
  var b;
  if (typeof a === "undefined") a = this.ID;
  if (typeof a === "string") {
    b = a;
    a = document.getElementById(b);
  } else b = a.id;
  var d = this.ID;
  if (b != this.ID) {
    this.ID != "" && delete ngControlsIDs[this.ID];
    if (b != "") ngControlsIDs[b] = this;
    this.ID = b;
  }
  if (a) {
    if (a.className != "") {
      var e = a.className,
        f = e.indexOf(" ");
      if (f >= 0) e = e.substr(0, f);
      this.BaseClassName = e;
    }
    if (this.DoSetVisible) this.DoSetVisible(a, this.Visible);
    else a.style.display = this.Visible ? "block" : "none";
    var g = this.CtrlType;
    a.onmouseover = function(k) {
      ngc_Enter(k, this, g);
    };
    a.onmouseout = function(k) {
      ngc_Leave(k, this, g);
    };
    a.style.webkitTapHighlightColor = "rgba(0,0,0,0)";
    a.style.webkitTapHighlightColor = "transparent";
    a.style.msTouchAction = "none";
  }
  b != "" && this.DoAttach && this.DoAttach(a, d);
  d = typeof this.ScrollBars !== "undefined" && this.ScrollBars !== ssNone;
  if (
    a &&
    !a.ngpointers &&
    (this.DoAcceptGestures || d || typeof this.Gestures !== "undefined")
  ) {
    b =
      typeof this.Gestures === "object" && this.Gestures
        ? ng_CopyVar(this.Gestures)
        : {};
    if (d && typeof b.drag === "undefined") b.drag = true;
    this.DoAcceptGestures && this.DoAcceptGestures(a, b);
    if (!ng_EmptyVar(b)) {
      d = [];
      for (var j in b) b[j] && d.push(j);
      d.length > 0 && ngc_PtrListener(this, a, "control", d);
    }
  }
}
function ngc_Release() {
  var a,
    b = this.ChildControls;
  if (typeof b !== "undefined")
    for (var d = b.length - 1; d >= 0; d--)
      (a = b[d]) && typeof a.Release === "function" && a.Release();
  if ((a = this.Elm())) {
    b = ngMouseInControls[this.ID];
    typeof b !== "undefined" &&
      b.Object == this &&
      ngc_Leave(null, b.Element, this.CtrlType);
    if (this.DoRelease) this.DoRelease(a);
    else {
      a.style.display = "none";
      ng_SetInnerHTML(a, "");
    }
  }
}
function ngc_Dispose() {
  var a = this.ChildControls;
  if (typeof a !== "undefined")
    for (var b, d = a.length - 1; d >= 0; d--)
      (b = a[d]) && typeof b.Dispose === "function" && b.Dispose();
  a = this.ID;
  if (!this.DoDispose || ngVal(this.DoDispose(), false)) {
    ngRemoveChildControl(this.ParentControl, this);
    if ((b = this.Elm())) {
      b.style.display = "none";
      ng_SetInnerHTML(b, "");
      b.parentNode && b.parentNode.removeChild(b);
    }
    try {
      for (d in this) delete this[d];
    } catch (e) {}
  }
  a != "" && delete ngControlsIDs[a];
}
function ngc_Enable() {
  this.SetEnabled(true);
}
function ngc_Disable() {
  this.SetEnabled(false);
}
function ngc_SetEnabled(a, b) {
  a = ngVal(a, true);
  if (this.Enabled != a)
    if (!(this.OnSetEnabled && !ngVal(this.OnSetEnabled(this, a, b), false))) {
      b = ngVal(b, this);
      if (typeof this.SetChildControlsEnabled === "function")
        this.SetChildControlsEnabled(a, b);
      else {
        var d = this.ChildControls;
        if (typeof d !== "undefined")
          for (var e = 0; e < d.length; e++) d[e].SetEnabled(a, b);
      }
      if (this.DoSetEnabled) this.DoSetEnabled(a);
      else {
        this.Enabled = a;
        this.Update && this.Update();
      }
      this.OnEnabledChanged && this.OnEnabledChanged(this, b);
    }
}
function ngc_SetFocus(a) {
  var b = this.Elm();
  if (b)
    try {
      ngVal(a, true) ? b.focus() : b.blur();
    } catch (d) {}
}
function ngc_SetVisible(a) {
  a = ngVal(a, true);
  if (this.Visible != a)
    if (!(this.OnSetVisible && !ngVal(this.OnSetVisible(this, a), false))) {
      if (this.ID != "") {
        var b = this.Elm();
        if (b) {
          if (a) {
            if (this.IsPopup === true && !ngc_ActivatePopup(this)) return;
          } else ngc_DeactivatePopup(this);
          if (this.DoSetVisible) this.DoSetVisible(b, a);
          else {
            b.style.display = a ? "block" : "none";
            b.style.visibility = a ? "visible" : "hidden";
          }
          if (!a && !ngIExplorer) {
            var d = function(e) {
              e.SetFocus && e.SetFocus(false);
              e = e.ChildControls;
              if (typeof e !== "undefined")
                for (var f = 0; f < e.length; f++) d(e[f]);
            };
            d(this);
          }
          b = document.body.offsetLeft;
        }
      }
      if (this.Visible != a) {
        (this.Visible = a) && this.Update(true);
        if ((b = this.Elm())) b = b.offsetLeft;
        this.OnVisibleChanged && this.OnVisibleChanged(this);
      } else ngc_DeactivatePopup(this);
    }
}
function ngc_Align(a) {
  var b = 0;
  if (typeof a === "undefined") a = this.Elm();
  if (typeof a === "string") a = document.getElementById(a);
  if (typeof this.DoResize !== "function") b = ng_Align(a);
  else if (a) b = this.DoResize(a);
  return b;
}
function ngc_Update(a) {
  if (this.Visible) {
    for (var b = this.ParentControl; b; ) {
      if (!b.Visible) return;
      b = b.ParentControl;
    }
    if (!(this.OnUpdate && !ngVal(this.OnUpdate(this), false))) {
      if ((b = this.Elm())) {
        b.style.display = this.Visible ? "block" : "none";
        if (ngIExplorer6)
          var d = ng_ClientWidth(b),
            e = ng_ClientHeight(b);
        var f = true;
        if (this.DoUpdate) f = ngVal(this.DoUpdate(b), false);
      }
      if (f)
        if (ngVal(a, true)) {
          a = this.ChildControls;
          if (typeof a !== "undefined")
            for (var g, j = 0; j < a.length; j++) {
              g = a[j];
              g.Update && g.Update(true);
            }
        }
      if (f) {
        if (b) {
          f = this.Align(b);
          if (ngIExplorer6) {
            if (this.DoUpdate && (f & 4 || f & 8)) this.DoUpdate(b);
            var k;
            ng_BeginMeasureElement(b);
            for (j = 0; j < 2; j++) {
              g = ng_ClientWidth(b);
              k = ng_ClientHeight(b);
              if (d != g || e != k) {
                a = this.ChildControls;
                if (typeof a !== "undefined")
                  for (j = 0; j < a.length; j++) {
                    f = a[j].Align();
                    if (f & 4 || f & 8) a[j].Update();
                  }
              } else break;
              d = g;
              e = k;
            }
            ng_EndMeasureElement(b);
          }
        }
        this.Attach();
        this.OnUpdated && this.OnUpdated(this, b);
      }
    }
  }
}
function ngc_Enter(a, b, d) {
  if (!a) a = window.event;
  if (!(ngUsingTouch && a && a.type.toLowerCase().match(/mouse/)))
    if ((d = ngGetControlByElement(b, d))) {
      var e = d.PointerInfo;
      if (
        !(e && e.Touch && e.EndTime && new Date().getTime() - e.EndTime < 200)
      ) {
        e = ngMouseInControls[d.ID];
        if (
          typeof e !== "undefined" &&
          e.Element &&
          e.Object &&
          ng_inDOM(e.Element)
        ) {
          if (e.Object === d) return;
          ngc_Leave(a, e.Element, e.Object.CtrlType);
        }
        try {
          e = {};
          e.Object = d;
          e.Element = d.Elm();
          e.EnterElement = b;
          ngMouseInControls[d.ID] = e;
          if (d.DoMouseEnter) d.DoMouseEnter(a, e, e.Element);
          else d.OnMouseEnter && d.OnMouseEnter(d);
        } finally {
          d.MouseInControl = true;
        }
      }
    }
}
function ngc_Leave(a, b, d) {
  if (!a) a = window.event;
  if (!(ngUsingTouch && a && a.type.toLowerCase().match(/mouse/)))
    if ((d = ngGetControlByElement(b, d))) {
      var e = ngMouseInControls[d.ID];
      if (typeof e !== "undefined") {
        delete ngMouseInControls[d.ID];
        try {
          e.LeaveElement = b;
          if (d.DoMouseLeave) d.DoMouseLeave(a, e, e.Element);
          else d.OnMouseLeave && d.OnMouseLeave(d);
        } finally {
          d.MouseInControl = false;
        }
      }
    }
}
function ngc_Focus(a, b, d) {
  if (!a) a = window.event;
  if ((d = ngGetControlByElement(b, d)) && !d.ControlHasFocus) {
    d.ControlHasFocus = true;
    if (d.DoFocus) d.DoFocus(a, b);
    else d.OnFocus && d.OnFocus(d);
  }
}
function ngc_Blur(a, b, d) {
  if (!a) a = window.event;
  if (ngIExplorer) {
    var e = document.activeElement;
    if (e && !ng_CanFocusElm(e))
      for (e = e.parentNode; e && e != document; ) {
        if (e == b) {
          b.focus();
          return;
        }
        e = e.parentNode;
      }
  }
  if ((d = ngGetControlByElement(b, d)) && d.ControlHasFocus)
    try {
      if (d.DoBlur) d.DoBlur(a, b);
      else d.DoBlur && d.DoBlur(d);
    } finally {
      d.ControlHasFocus = false;
    }
}
function ngc_CtrlBringToFront(a) {
  var b = this.ChildControls;
  if (!(typeof b === "undefined" || !b.length))
    for (var d = 0; d < b.length; d++)
      if (b[d] == a) {
        b.splice(d, 1);
        b.splice(0, 0, a);
        break;
      }
}
function ngc_CtrlSendToBack(a) {
  var b = this.ChildControls;
  if (!(typeof b === "undefined" || !b.length))
    for (var d = 0; d < b.length; d++)
      if (b[d] == a) {
        b.splice(d, 1);
        b[b.length] = a;
        break;
      }
}
function ngc_ctrlInsert(a, b, d, e) {
  if (b != d)
    for (var f = -1, g = -1, j = 0; j < a.length; j++) {
      if (a[j] == d) f = j;
      if (a[j] == b) g = j;
      if (f >= 0 && g >= 0) {
        a.splice(g, 1);
        g < f && f--;
        a.splice(f + e, 0, b);
        break;
      }
    }
}
function ngc_CtrlInsertAfter(a, b) {
  var d = this.ChildControls;
  typeof d === "undefined" || !d.length || ngc_ctrlInsert(d, a, b, 1);
}
function ngc_CtrlInsertBefore(a, b) {
  var d = this.ChildControls;
  typeof d === "undefined" || !d.length || ngc_ctrlInsert(d, a, b, 0);
}
function ngc_GetResText() {
  return ngTxt(this.ngTextD);
}
function ngc_GetResAlt() {
  return ngTxt(this.ngAltD);
}
function ngc_GetResHint() {
  return ngTxt(this.ngHintD);
}
function ngc_GetText() {
  return this.OnGetText ? ngVal(this.OnGetText(this), "") : this.Text;
}
function ngc_GetAlt() {
  return this.OnGetAlt ? ngVal(this.OnGetAlt(this), "") : this.Alt;
}
function ngc_GetImg() {
  return this.OnGetImg ? this.OnGetImg(this) : this.Img;
}
function ngc_GetHint() {
  return this.OnGetHint ? ngVal(this.OnGetHint(this), "") : this.Hint;
}
function ngc_SetText(a) {
  if (this.OnSetText) a = this.OnSetText(a, this);
  if (a != this.Text) {
    this.Text = a;
    this.Update();
  }
}
function ngControl(a, b, d) {
  a.ID = ngVal(b, "");
  a.CtrlType = d;
  a.CtrlInheritedFrom = [];
  a.BaseClassName = d;
  a.Enabled = true;
  a.Visible = true;
  a.Bounds = {};
  a.Enable = ngc_Enable;
  a.Disable = ngc_Disable;
  a.SetEnabled = ngc_SetEnabled;
  a.SetVisible = ngc_SetVisible;
  a.SetFocus = ngc_SetFocus;
  a.Elm = ngc_Elm;
  a.CtrlInheritsFrom = ngc_CtrlInheritsFrom;
  a.Create = ngc_Create;
  a.Dispose = ngc_Dispose;
  a.SetBounds = ngc_SetBounds;
  a.SetScrollBars = ngc_SetScrollBars;
  a.SetPopup = ngc_SetPopup;
  a.SetOpacity = ngc_SetOpacity;
  a.Align = ngc_Align;
  a.Attach = ngc_Attach;
  a.Release = ngc_Release;
  a.Update = ngc_Update;
  a.AddEvent = ngObjAddEvent;
  a.RemoveEvent = ngObjRemoveEvent;
  a.OnSetEnabled = null;
  a.OnEnabledChanged = null;
  a.OnSetVisible = null;
  a.OnVisibleChanged = null;
  a.OnUpdate = null;
  a.OnUpdated = null;
  a.OnMouseEnter = null;
  a.OnMouseLeave = null;
}
function ngcs_Create(a, b) {
  var d = ngVal(a.ID, "");
  if (d == "") {
    if (typeof a.Data === "object") d = ngVal(a.Data.ID, "");
    if (d == "") d = ngCreateControlId(a.Type);
  }
  this.ID = d;
  if (d != "") ngControlsIDs[d] = this;
  this.DoCreate && this.DoCreate(a, b);
  a.OnCreated && a.OnCreated(this, b);
  return null;
}
function ngSysControl(a, b, d) {
  a.ID = ngVal(b, "");
  a.CtrlType = d;
  a.CtrlInheritedFrom = [];
  a.Enabled = true;
  a.CtrlInheritsFrom = ngc_CtrlInheritsFrom;
  a.Enable = ngc_Enable;
  a.Disable = ngc_Disable;
  a.SetEnabled = ngc_SetEnabled;
  a.Elm = function() {
    return null;
  };
  a.Create = ngcs_Create;
  a.Dispose = ngc_Dispose;
  a.AddEvent = ngObjAddEvent;
  a.RemoveEvent = ngObjRemoveEvent;
  a.OnSetEnabled = null;
  a.OnEnabledChanged = null;
}
function ngAddChildControl(a, b) {
  if (a && b) {
    if (typeof a.ChildControls === "undefined") a.ChildControls = [];
    a.ChildControls[a.ChildControls.length] = b;
    if (!b.ParentControl) b.ParentControl = a;
  }
}
function ngRemoveChildControl(a, b) {
  if (a && b) {
    var d = a.ChildControls;
    if (typeof d !== "undefined") {
      for (var e, f = d.length - 1; f >= 0; f--) {
        e = d[f];
        e == b && d.splice(f, 1);
      }
      d.length || delete a.ChildControls;
      if (b.ParentControl == a) b.ParentControl = null;
    }
  }
}
function ngSavePropState(a, b, d, e) {
  if (!a) return null;
  if (typeof b === "undefined") b = "Enabled";
  if (typeof e === "undefined") {
    e = {};
    e._Prop = b;
    e._Parent = a;
  }
  e[a.ID] = a[b];
  if (ngVal(d, false) && typeof a.ChildControls !== "undefined") {
    d = [];
    for (d = 0; d < a.ChildControls.length; d++)
      ngSavePropState(a.ChildControls[d], b, true, e);
  }
  return e;
}
function ngRestorePropState(a, b) {
  var d,
    e = a._Prop;
  for (var f in a)
    if (f.charAt(0) != "_") if ((d = ngGetControlById(f))) d[e] = a[f];
  (d = a._Parent) && ngVal(b, true) && d.Update(true);
}
function ngcReattachChildren(a) {
  if (typeof a.ChildControls !== "undefined")
    for (var b, d = 0; d < a.ChildControls.length; d++) {
      b = a.ChildControls[d];
      ngcReattachChildren(b);
      b.Attach();
    }
}
var ngc_ActivePopups = {},
  ngc_PopupsInitialized = false;
function ngc_HidePopups() {
  for (var a in ngc_ActivePopups) {
    var b = ngc_ActivePopups[a];
    b && ngc_HidePopup(b);
  }
}
function ngc_GetPopupGroup(a) {
  a = a.PopupGroup;
  if (typeof a === "undefined" || a == "") a = "default";
  return a;
}
function ngc_HidePopup(a) {
  if (!a) return false;
  var b = ngc_GetPopupGroup(a),
    d = false;
  if (ngc_ActivePopups[b] === a) {
    a.SetVisible(false);
    a.Visible || (d = true);
    if (d && ngc_ActivePopups[b] === a) ngc_ActivePopups[b] = null;
  }
  return d;
}
function ngc_DeactivatePopup(a) {
  if (a) {
    var b = ngc_GetPopupGroup(a);
    if (ngc_ActivePopups[b] === a) ngc_ActivePopups[b] = null;
  }
}
function ngc_IsActivePopup(a) {
  if (!a) return false;
  var b = ngc_GetPopupGroup(a);
  return ngc_ActivePopups[b] === a;
}
function ngc_ActivatePopup(a) {
  if (a) {
    var b = ngc_GetPopupGroup(a);
    if (!ngc_PopupsInitialized) {
      ngc_PopupsInitialized = true;
      var d = function(e) {
        for (var f in ngc_ActivePopups) {
          var g = ngc_ActivePopups[f];
          if (g) {
            if (!e) e = window.event;
            var j = e.target || e.srcElement || e.originalTarget;
            if (j)
              if (
                !g.OnIsInsidePopup ||
                !ngVal(g.OnIsInsidePopup(g, j, 1, e), true)
              )
                if (typeof g.IsInsidePopup === "function")
                  ngVal(g.IsInsidePopup(j, 1, e), true) || (j = null);
                else
                  for (var k = g ? g.Elm() : null; j; ) {
                    if (j === k) break;
                    j = j.parentNode;
                  }
            j || ngc_HidePopup(g);
          }
        }
      };
      document.onmousewheel = ngAddEvent(document.onmousewheel, d);
      window.addEventListener &&
        window.addEventListener("DOMMouseScroll", d, false);
      window.onresize = ngAddEvent(window.onresize, function() {
        ngc_HidePopups();
      });
      ngOnPointerDown = ngAddEvent(ngOnPointerDown, function(e) {
        var f = true;
        for (var g in ngc_ActivePopups) {
          var j = ngc_ActivePopups[g];
          if (j) {
            var k = e.GetTarget();
            if (k) {
              if (k)
                if (
                  !j.OnIsInsidePopup ||
                  !ngVal(j.OnIsInsidePopup(j, k, 0, e), true)
                )
                  if (typeof j.IsInsidePopup === "function")
                    ngVal(j.IsInsidePopup(k, 0, e), true) || (k = null);
                  else
                    for (var n = j ? j.Elm() : null; k; ) {
                      if (k === n) break;
                      k = k.parentNode;
                    }
              if (!k) {
                if (typeof j.DoClickOutside === "function")
                  ngVal(j.DoClickOutside(e), false) && ngc_HidePopup(j);
                else if (
                  !j.OnClickOutside ||
                  ngVal(j.OnClickOutside(j, e), false)
                )
                  ngc_HidePopup(j);
                f = false;
                ng_DocumentDeselect();
                e.EventPreventDefault();
                e.StopPropagation = true;
                ngc_disabledocselect(e.StartElement);
              }
            }
          }
        }
        return f;
      });
    }
    d = ngc_ActivePopups[b];
    if (typeof d === "undefined") d = ngc_ActivePopups[b] = null;
    d !== a && ngc_HidePopup(d);
    if (ngc_ActivePopups[b] !== null) return false;
    ngc_ActivePopups[b] = a;
    return true;
  }
}
var ngOnPointerDown = null,
  ngDblClickMouseTimeout = 500,
  ngDblClickMouseThreshold = 10,
  ngDblClickTouchTimeout = 500,
  ngDblClickTouchThreshold = 20,
  ngCurrentPtrControl = null,
  ngCurrentPtrDblClick = null,
  ngPtrIgnoredEvent = null,
  ngPointersInitialized = false,
  ngAcceptMouseGestures,
  ngc_docselectinfo = null;
function ngc_enabledocselect() {
  var a = ngc_docselectinfo;
  if (a) {
    ngc_docselectinfo = null;
    if (typeof a.oldonselect != "undefined")
      document.onselectstart = a.oldonselect;
    if (a.elm) a.elm.style.MozUserSelect = a.oldmozuserselect;
  }
}
function ngc_disabledocselect(a) {
  ngc_enabledocselect();
  var b = { elm: a, oldonselect: document.onselectstart };
  document.onselectstart = function() {
    return false;
  };
  if (a) {
    b.oldmozuserselect = a.style.MozUserSelect;
    a.style.MozUserSelect = "none";
  }
  ngc_docselectinfo = b;
}
function ngc_ptrevignore(a) {
  if (a && a.gesture) a = a.gesture.srcEvent;
  if (a && ngIExplorerVersion <= 8)
    a = {
      ts: new Date().getTime(),
      type: a.type,
      button: a.button,
      clientX: a.clientX,
      clientY: a.clientY,
      altKey: a.altKey,
      ctrlKey: a.ctrlKey,
      srcElement: a.srcElement
    };
  ngPtrIgnoredEvent = a;
}
function ngc_ptrevisignored(a) {
  var b = ngPtrIgnoredEvent;
  if (a && a.gesture) a = a.gesture.srcEvent;
  if (b) {
    if (b === a) return true;
    if (ngIExplorerVersion <= 8)
      if (
        b.type === a.type &&
        b.clientX === a.clientX &&
        b.clientY === a.clientY &&
        b.altKey === a.altKey &&
        b.ctrlKey === a.ctrlKey &&
        b.srcElement === a.srcElement &&
        b.button === a.button
      )
        if (new Date().getTime() - b.ts < 500) return true;
  }
  return false;
}
function ngc_ptrstart(a, b, d, e, f) {
  function g() {
    var y = this.Event;
    if (
      this.TargetEvent != y ||
      typeof this.TargetX === "undefined" ||
      typeof this.TargetY === "undefined" ||
      this.TargetX != this.X ||
      this.TargetY != this.Y
    ) {
      this.Target = document.elementFromPoint
        ? document.elementFromPoint(this.X, this.Y)
        : y.target || y.srcElement || y.originalTarget;
      this.TargetX = this.X;
      this.TargetY = this.Y;
      this.TargetEvent = y;
    }
    return this.Target;
  }
  function j(y) {
    var z = this.Target,
      B = this.GetTarget();
    if (typeof y !== "undefined") return ngGetControlByElement(B, y);
    if (!this.TargetControl || z !== this.Target)
      this.TargetControl = ngGetControlByElement(B);
    return this.TargetControl;
  }
  function k(y, z) {
    for (var B = y.GetTarget(), C; B; ) {
      if (B == z) return true;
      if ((C = ngGetControlById(B.id))) {
        y.TargetControl = C;
        break;
      }
      B = B.parentNode;
    }
    return false;
  }
  function n() {
    return k(this, this.SrcElement);
  }
  function o() {
    return k(this, this.DstElement);
  }
  function t() {
    if (e)
      if (e.gesture) e.gesture.preventDefault();
      else if (e.preventDefault) e.preventDefault();
      else e.returnValue = false;
  }
  function q() {
    var y = this.Event;
    if (y) {
      y.gesture && y.gesture.stopPropagation && y.gesture.stopPropagation();
      if (y.stopPropagation) y.stopPropagation();
      else y.cancelBubble = true;
    }
  }
  if (!e) e = window.event;
  if (!ngc_ptrevisignored(e)) {
    var u =
      e.gesture &&
      Hammer &&
      (e.gesture.pointerType === Hammer.POINTER_TOUCH ||
        e.gesture.pointerType === Hammer.POINTER_PEN);
    ngUsingTouch = u;
    if (!(!e.gesture && e.button != 0 && (!ngIExplorer || e.button != 1))) {
      var x = ngc_DoGetPointerPos(a, e, null);
      b = {
        Owner: a,
        X: x.x,
        Y: x.y,
        StartX: x.x,
        StartY: x.y,
        StartElement: d,
        StartTime: new Date().getTime(),
        StartEvent: e,
        StartEventID: b,
        Event: e,
        EventID: b,
        CanFocus: true,
        Gestures: ng_CopyVar(f),
        Touch: u,
        PointerType: e.gesture ? e.gesture.pointerType : "mouse",
        GetTarget: g,
        GetTargetControl: j,
        SrcTarget: e.target || e.srcElement || e.originalTarget,
        SrcElement: d,
        DstElement: d,
        IsInSrcElement: n,
        IsInDstElement: o,
        PreventDefault: true,
        PreventSelect: true,
        DocumentDeselect: true,
        EventPreventDefault: t,
        EventStopPropagation: q,
        OnGesture: null,
        OnPointerUp: null
      };
      if (b.SrcTarget)
        if (b.SrcTarget.onclick) b.PreventDefault = false;
        else {
          if (ng_CanFocusElm(b.SrcTarget)) b.PreventDefault = false;
          if (ng_CanSelectElm(b.SrcTarget)) b.PreventSelect = false;
        }
      if (ngOnPointerDown && !ngVal(ngOnPointerDown(b), false))
        b.StopPropagation && ngc_ptrevignore(e);
      else {
        if (a) {
          if ((f = a.DblClickInfo)) {
            x = b.Touch ? ngDblClickTouchThreshold : ngDblClickMouseThreshold;
            if (Math.abs(b.X - f.X) < x && Math.abs(b.Y - f.Y) < x) {
              f.Timer && clearTimeout(f.Timer);
              b.DblClickInfo = f;
            }
            delete a.DblClickInfo;
          }
          if (a.DoPointerDown && !ngVal(a.DoPointerDown(b), false)) {
            b.StopPropagation && ngc_ptrevignore(e);
            return;
          }
          if (a.OnPointerDown && !ngVal(a.OnPointerDown(a, b), false)) {
            b.StopPropagation && ngc_ptrevignore(e);
            return;
          }
          if (a.Enabled) {
            ngCurrentPtrControl = a;
            a.PointerInfo = b;
            if (u) {
              a.Touching = true;
              delete a.MouseDown;
            } else {
              a.MouseDown = true;
              delete a.Touching;
            }
          }
          b.Touch && ngc_Enter(e, d, a.CtrlType);
          if (a.Enabled) {
            a.DoPtrStart && a.DoPtrStart(b);
            a.OnPtrStart && a.OnPtrStart(a, b);
          }
        }
        if (b.CanFocus && b.PreventDefault) {
          a = document.activeElement;
          d = true;
          for (u = b.SrcTarget; u && u != document; ) {
            if (ng_CanFocusElm(u)) {
              if (ngIExplorer)
                try {
                  u.setActive();
                } catch (w) {
                  u.focus();
                }
              else u.focus();
              d = false;
              break;
            }
            if (u == a) {
              d = false;
              break;
            }
            u = u.parentNode;
          }
          d && a && a.blur();
        }
        b.DocumentDeselect && ng_DocumentDeselect();
        b.PreventSelect && ngc_disabledocselect(b.StartElement);
        b.PreventDefault && b.EventPreventDefault();
        if (typeof b.StopPropagation === "undefined" || b.StopPropagation)
          ngc_ptrevignore(e);
      }
    }
  }
}
function ngc_ptrend(a) {
  ngc_enabledocselect();
  var b = ngCurrentPtrControl;
  if (b) ngCurrentPtrControl = null;
  else {
    b = ngCurrentPtrDblClick;
    if (!b) return false;
  }
  if (!a) a = window.event;
  ngc_ptrevignore(null);
  ngCurrentPtrDblClick = null;
  var d = b.PointerInfo;
  if (d) {
    d.Event = a;
    d.EndEvent = a;
    d.EndEventID = d.EventID;
    b.GetPointerPos(a);
    d.EndX = d.X;
    d.EndY = d.Y;
    d.EndTime = new Date().getTime();
    d.Touch && b.MouseInControl && ngc_Leave(a, d.StartElement, b.CtrlType);
  }
  a = false;
  d.OnPointerUp && d.OnPointerUp(d);
  if (!b.OnPointerUp || ngVal(b.OnPointerUp(b, d), false)) {
    a = true;
    if (d && (d.Gestures.tap || d.Gestures.doubletap))
      if (d.GetTargetControl() == b || d.EndTime - d.StartTime < 200) {
        var e = null;
        if (d.Gestures.doubletap && b.DoPtrDblClick)
          if ((e = d.DblClickInfo)) {
            ngCurrentPtrDblClick = null;
            e.Timer && clearTimeout(e.Timer);
            d.DblClickStartTime = e.StartTime;
            d.DblClickEndTime = e.EndTime;
            d.DblClickStartElement = e.StartElement;
            ng_DocumentDeselect();
            if (typeof d.DblClick === "undefined") d.DblClick = true;
            e = null;
          } else {
            if (typeof d.Click === "undefined") d.Click = true;
            if (d.DblClick !== false)
              e = {
                StartElement: d.StartElement,
                StartTime: d.StartTime,
                EndTime: d.EndTime,
                X: d.X,
                Y: d.Y
              };
          }
        else if (typeof d.Click === "undefined") d.Click = true;
      }
    b.DoPtrEnd && b.DoPtrEnd(d);
    b.OnPtrEnd && b.OnPtrEnd(b, d);
    var f = d.Click && b.DoPtrClick;
    if (e) {
      ngCurrentPtrDblClick = b;
      b.DblClickInfo = e;
      e.Timer = setTimeout(function() {
        clearTimeout(e.Timer);
        delete b.DblClickInfo;
        ngCurrentPtrDblClick = null;
        f && b.DoPtrClick && b.DoPtrClick(d);
      }, Math.round(
        (d.Touch ? ngDblClickTouchTimeout : ngDblClickMouseTimeout) / 2
      ));
    } else if (f)
      var g = setTimeout(function() {
        clearTimeout(g);
        b.DoPtrClick && b.DoPtrClick(d);
      }, 1);
    d.DblClick && b.DoPtrDblClick && b.DoPtrDblClick(d);
  }
  delete b.MouseDown;
  delete b.Touching;
  return a;
}
function ngc_HandleScrollGesture(a, b, d) {
  if (b.Gesture === "drag") {
    var e = Math.round(b.X - b.StartX),
      f = Math.round(b.Y - b.StartY);
    if (e || f)
      if (typeof b.ScrollControl === "undefined") {
        var g = d ? d : a.Elm();
        if (!g) return false;
        if (d)
          if (typeof g.sbtype !== "undefined") d = g.sbtype;
          else {
            d = ng_GetScrollBars(g);
            if (ngAndroid) g.sbtype = d;
          }
        else {
          d = a.ScrollBars;
          if (typeof d === "undefined") {
            d = ng_GetScrollBars(g);
            a.ScrollBars = d;
          }
        }
        if (d === ssNone || d === ssDefault) return false;
        ngAndroid && ng_SetScrollBars(g, ssNone);
        if (g.scrollHeight > g.clientHeight || g.scrollWidth > g.clientWidth) {
          var j = g.scrollTop,
            k = g.scrollLeft;
          if (d === ssAuto || d === ssBoth || d === ssHorizontal)
            g.scrollLeft = k - e;
          if (d === ssAuto || d === ssBoth || d === ssVertical)
            g.scrollTop = j - f;
          b.ScrollControl = a;
          b.ScrollElm = g;
          b.ScrollTop = j;
          b.ScrollLeft = k;
          b.ScrollType = d;
          return true;
        }
      } else if (b.ScrollControl === a) {
        d = b.ScrollType;
        if (d === ssNone) return false;
        var n, o;
        if (d === ssAuto || d === ssBoth || d === ssHorizontal)
          o = b.ScrollLeft - e;
        if (d === ssAuto || d === ssBoth || d === ssVertical)
          n = b.ScrollTop - f;
        if (o < 0) o = 0;
        if (n < 0) n = 0;
        if (
          (typeof o !== "undefined" || typeof n !== "undefined") &&
          (o != b.ScrollLeft || n != b.ScrollTop)
        ) {
          b.ScrollTimer && clearTimeout(b.ScrollTimer);
          b.ScrollTimer = setTimeout(function() {
            clearTimeout(b.ScrollTimer);
            b.ScrollTimer = null;
            if (typeof n !== "undefined") b.ScrollElm.scrollTop = n;
            if (typeof o !== "undefined") b.ScrollElm.scrollLeft = o;
          }, 1);
        }
        if (Math.abs(e) > 20 || Math.abs(f) > 20) {
          delete b.Gestures.tap;
          delete b.Gestures.doubletap;
          b.Scroll = true;
        }
        return true;
      }
  } else if (b.ScrollControl === a) {
    d = b.ScrollType;
    if (d === ssNone) return false;
    if (b.Gesture === "swipe") return true;
    if (
      d !== ssVertical &&
      (b.Gesture === "swipeleft" || b.Gesture === "swiperight")
    )
      return true;
    if (
      d !== ssHorizontal &&
      (b.Gesture === "swipeup" || b.Gesture === "swipedown")
    )
      return true;
  }
  return false;
}
function ngc_ptrgesture(a, b) {
  if (a.ngGestureHandled) return false;
  var d = ngCurrentPtrControl;
  if (!d) return false;
  var e = d.PointerInfo;
  if (!e) return false;
  b = ngVal(b, a.type);
  e.Event = a;
  e.Gesture = b;
  e.OnGesture && e.OnGesture(e);
  var f = false;
  if (b === "drag") {
    if (!d.Visible) {
      ngc_ptrend(a);
      return false;
    }
    d.GetPointerPos(a);
    if (e.Touch) {
      b = e.GetTargetControl();
      d.MouseInControl && b != d && ngc_Leave(a, d.Elm(), d.CtrlType);
      !d.MouseInControl && b == d && ngc_Enter(a, d.Elm(), d.CtrlType);
    }
    if (e.Gestures.drag) {
      if (d.DoPtrDrag) f = ngVal(d.DoPtrDrag(e), true);
      if (d.OnPtrDrag) f = ngVal(d.OnPtrDrag(d, e), true) || f;
      if (f) return false;
    }
  }
  if (!e.Touch)
    if (typeof ngAcceptMouseGestures !== "undefined")
      if (!ngAcceptMouseGestures) return false;
  var g;
  d = d;
  try {
    for (; d && e.Gesture != ""; ) {
      g = true;
      if (typeof d.AcceptGestures !== "undefined" && !d.AcceptGestures)
        g = false;
      if (!e.Touch)
        if (typeof d.AcceptMouseGestures !== "undefined")
          d.AcceptMouseGestures || (g = false);
        else if (typeof ngAcceptMouseGestures === "undefined") g = false;
      if (g) {
        f = false;
        if (d.DoGesture) f = ngVal(d.DoGesture(e), true) || f;
        if (d.OnGesture) f = ngVal(d.OnGesture(d, e), true) || f;
        f || (f = ngc_HandleScrollGesture(d, e));
        if (f) break;
      }
      d = d.ParentControl;
    }
    if (f) a.ngGestureHandled = true;
  } finally {
    delete e.Gesture;
  }
  return f;
}
function ngc_PtrListener(a, b, d, e, f) {
  function g(o) {
    ngc_ptrstart(a, d, b, o, j);
  }
  if (typeof b === "string") b = document.getElementById(b);
  if (b) {
    if (typeof e === "undefined" || !e) e = [];
    else if (typeof e === "string") e = e.split(" ");
    if (typeof d === "undefined") d = "";
    a.DoAcceptPtrGestures && a.DoAcceptPtrGestures(b, d, e, f);
    for (var j = {}, k = 0; k < e.length; k++)
      if (j[e[k]]) {
        e.splice(k, 1);
        k--;
      } else j[e[k]] = true;
    if (!j.touch) {
      j.touch = true;
      e.push("touch");
    }
    j.drag || e.push("drag");
    if (!j.release) {
      j.release = true;
      e.push("release");
    }
    if (!b.ngpointers) {
      b.ngpointers = {};
      ngPointersInitialized || ngc_InitPointers();
      if (!a.GetPointerPos) a.GetPointerPos = ngc_GetPointerPos;
      if (ngHammerJS()) {
        k = { drag_min_distance: 1, hold_threshold: 30 };
        a.DoGetPtrOptions && a.DoGetPtrOptions(d, k);
        var n = Hammer.defaults.stop_browser_behavior.userSelect;
        try {
          Hammer.defaults.stop_browser_behavior.userSelect = "";
          b.hammer = Hammer(b, k);
        } finally {
          Hammer.defaults.stop_browser_behavior.userSelect = n;
        }
        k = function(o) {
          if (o.gesture)
            switch (o.type) {
              case "touch":
                ngc_ptrstart(a, d, b, o, j);
                break;
              case "release":
                if (!o.ngReleaseHandled) {
                  o.ngReleaseHandled = true;
                  ngc_ptrend(o);
                }
                break;
              case "tap":
              case "doubletap":
                break;
              default:
                ngc_ptrgesture(o);
                break;
            }
        };
        for (n = 0; n < e.length; n++) b.addEventListener(e[n], k, false);
        if (f) {
          e = false;
          for (k = b.parentNode; k; ) {
            if (k.ngpointers) {
              e = true;
              break;
            }
            k = k.parentNode;
          }
          e || b.hammer.eventStartHandler(f);
          return;
        }
      } else if (!f)
        if (b.addEventListener) b.addEventListener("mousedown", g, false);
        else if (b.attachEvent) b.attachEvent("onmousedown", g);
        else b.onmousedown = ngAddEvent(b.onmousedown, g);
    }
    f && g(f);
  }
}
function ngc_PtrEvents(a, b, d, e) {
  function f(j) {
    ngc_ptrev(j, e, d, b);
  }
  if (!a) return "";
  if (typeof d === "undefined") d = "";
  else if (typeof d !== "string") d = d.join(" ");
  if (typeof b === "undefined") b = "";
  if (typeof e === "undefined") e = a.Elm();
  if (!a.GetPointerPos) a.GetPointerPos = ngc_GetPointerPos;
  a = ngPtrStartEvents();
  for (var g in a)
    if (e.addEventListener) e.addEventListener(a[g], f, false);
    else if (e.attachEvent) e.attachEvent("on" + a[g], f);
    else e["on" + a[g]] = ngAddEvent(e.onmousedown, f);
}
function ngc_PtrEventsHTML(a, b, d) {
  if (!a) return "";
  if (typeof d === "undefined") d = "";
  else if (typeof d !== "string") d = d.join(" ");
  if (typeof b === "undefined") b = "";
  if (!a.GetPointerPos) a.GetPointerPos = ngc_GetPointerPos;
  return ngPtrHTMLStartEvents(
    "",
    "ngc_ptrev(event,this,'" + d + "','" + b + "')"
  );
}
function ngc_ptrev(a, b, d, e) {
  if (!b.hammer) {
    var f = ngGetControlByElement(b);
    if (f) {
      if (!a) a = window.event;
      ngc_PtrListener(f, b, e, d, a);
    }
  }
}
function ngc_DoGetPointerPos(a, b, d) {
  if (!b) b = window.event;
  if (b) {
    if (a && typeof d === "undefined") d = a.PointerInfo;
    if (b.gesture && Hammer) {
      var e = b.gesture.center.pageX,
        f = b.gesture.center.pageY;
      if (a)
        if (b.gesture.pointerType === Hammer.POINTER_MOUSE) {
          a.MouseX = e;
          a.MouseY = f;
        } else {
          a.TouchX = e;
          a.TouchY = f;
        }
    } else {
      var g, j;
      if (a) {
        g = a.MouseX;
        j = a.MouseY;
      } else j = g = 0;
      e = b.clientX ? b.clientX : b.offsetX;
      f = b.clientY ? b.clientY : b.offsetY;
      if (
        ngIExplorer &&
        ngIExplorerVersion <= 7 &&
        screen.width > document.body.offsetWidth
      ) {
        e -= 2;
        f -= 2;
      }
      if (isNaN(e)) e = g;
      if (isNaN(f)) f = j;
      if (a) {
        a.MouseX = e;
        a.MouseY = f;
      }
    }
    if (d) {
      d.X = e;
      d.Y = f;
    }
    return new ScreenPt(e, f);
  }
}
function ngc_GetPointerPos(a) {
  return ngc_DoGetPointerPos(this, a);
}
function ngc_InitPointers() {
  if (!ngPointersInitialized) {
    if (ngHammerJS()) {
      document.hammer = Hammer(document);
      document.addEventListener(
        "touch",
        function(b) {
          b.gesture &&
            b.type === "touch" &&
            ngc_ptrstart(null, "document", document.body, b, ["touch"]);
        },
        false
      );
    } else {
      var a = function(b) {
        ngc_ptrend(b);
      };
      document.onmousedown = ngAddEvent(function(b) {
        ngc_ptrstart(null, "document", document.body, b, ["touch"]);
      }, document.onmousedown);
      document.onmousemove = ngAddEvent(function(b) {
        var d = ngCurrentPtrControl;
        if (d) {
          if (!b) b = window.event;
          if (ngIExplorer && ngIExplorerVersion < 9 && !b.button) a(b);
          else d.MouseDown && ngc_ptrgesture(b, "drag");
        }
      }, document.onmousemove);
      document.onmouseup = ngAddEvent(a, document.onmouseup);
      document.onmouseout = ngAddEvent(document.onmouseout, function(b) {
        if (!b) b = window.event;
        ngCurrentPtrControl && !ngIExplorer && !b.relatedTarget && a(b);
        return true;
      });
    }
    ngPointersInitialized = true;
  }
}
function ngc_ChangeImage(a) {
  ng_SwapImageHTML(a.id, a.aL, a.aT);
  var b = document.getElementById(a.id);
  if (b) {
    if (a.L != a.oL || a.T != a.oT) {
      b.setAttribute("L", a.L);
      b.setAttribute("T", a.T);
      b.setAttribute("oL", a.oL);
      b.setAttribute("oT", a.oT);
    } else {
      ng_nullAttr(b.getAttribute("L")) || b.setAttribute("L", "");
      ng_nullAttr(b.getAttribute("T")) || b.setAttribute("T", "");
      ng_nullAttr(b.getAttribute("oL")) || b.setAttribute("oL", "");
      ng_nullAttr(b.getAttribute("oT")) || b.setAttribute("oT", "");
    }
    return true;
  }
  return false;
}
function ngc_ChangeImageS(a) {
  var b,
    d = a.id;
  for (b = 1; b < 1e3; b++) {
    a.id = d + "_" + b;
    if (!ngc_ChangeImage(a)) break;
  }
  a.id = d;
  return b > 1;
}
function ngc_ChangeImg(a, b, d, e) {
  if (e) {
    a = ngc_ImgProps(a, b, d, e);
    ngc_ChangeImage(a);
  }
}
function ngc_ChangeImgS(a, b, d, e) {
  if (e) {
    a = ngc_ImgProps(a, b, d, e);
    ngc_ChangeImageS(a);
  }
}
function ngc_ChangeBox(a, b, d, e) {
  if (e) {
    typeof e.Left !== "undefined" && ngc_ChangeImgS(a + "_L", b, d, e.Left);
    typeof e.Top !== "undefined" && ngc_ChangeImgS(a + "_T", b, d, e.Top);
    typeof e.Right !== "undefined" && ngc_ChangeImgS(a + "_R", b, d, e.Right);
    typeof e.Bottom !== "undefined" && ngc_ChangeImgS(a + "_B", b, d, e.Bottom);
    typeof e.LeftTop !== "undefined" &&
      ngc_ChangeImg(a + "_LT", b, d, e.LeftTop);
    typeof e.RightTop !== "undefined" &&
      ngc_ChangeImg(a + "_RT", b, d, e.RightTop);
    typeof e.LeftBottom !== "undefined" &&
      ngc_ChangeImg(a + "_LB", b, d, e.LeftBottom);
    typeof e.RightBottom !== "undefined" &&
      ngc_ChangeImg(a + "_RB", b, d, e.RightBottom);
  }
}
function ngc_EnterImg(a) {
  var b = document.getElementById(a);
  if (b) {
    var d = b.getAttribute("oL");
    b = b.getAttribute("oT");
    !ng_nullAttr(d) && !ng_nullAttr(b) && ng_SwapImageHTML(a, d, b);
    return true;
  } else return false;
}
function ngc_LeaveImg(a) {
  var b = document.getElementById(a);
  if (b) {
    var d = b.getAttribute("L");
    b = b.getAttribute("T");
    !ng_nullAttr(d) && !ng_nullAttr(b) && ng_SwapImageHTML(a, d, b);
    return true;
  }
  return false;
}
function ngc_EnterImgS(a) {
  for (var b = 1; b < 1e3; b++) if (!ngc_EnterImg(a + "_" + b)) break;
}
function ngc_LeaveImgS(a) {
  for (var b = 1; b < 1e3; b++) if (!ngc_LeaveImg(a + "_" + b)) break;
}
function ngc_EnterBox(a) {
  ngc_EnterImg(a + "_LT");
  ngc_EnterImgS(a + "_T");
  ngc_EnterImg(a + "_RT");
  ngc_EnterImgS(a + "_L");
  ngc_EnterImgS(a + "_R");
  ngc_EnterImg(a + "_LB");
  ngc_EnterImgS(a + "_B");
  ngc_EnterImg(a + "_RB");
}
function ngc_LeaveBox(a) {
  ngc_LeaveImg(a + "_LT");
  ngc_LeaveImgS(a + "_T");
  ngc_LeaveImg(a + "_RT");
  ngc_LeaveImgS(a + "_L");
  ngc_LeaveImgS(a + "_R");
  ngc_LeaveImg(a + "_LB");
  ngc_LeaveImgS(a + "_B");
  ngc_LeaveImg(a + "_RB");
}
function ngc_Img(a, b, d, e, f) {
  a.append(
    ng_CreateImageHTML(
      b.id,
      b.Src,
      b.aL,
      b.aT,
      b.W,
      b.H,
      d,
      (b.L != b.oL || b.T != b.oT
        ? ' L="' +
          b.L +
          '" T="' +
          b.T +
          '" oL="' +
          b.oL +
          '" oT="' +
          b.oT +
          '" '
        : "") + e,
      f
    )
  );
}
function ngc_ImgSW(a, b, d, e, f, g, j) {
  a.append(
    ng_CreateImageHTMLSW(
      b.id,
      d,
      e,
      b.Src,
      b.aL,
      b.aT,
      b.W,
      b.H,
      "position:absolute;" + f,
      (b.L != b.oL || b.T != b.oT
        ? ' L="' +
          b.L +
          '" T="' +
          b.T +
          '" oL="' +
          b.oL +
          '" oT="' +
          b.oT +
          '" '
        : "") + g,
      j
    )
  );
}
function ngc_ImgSH(a, b, d, e, f, g, j) {
  a.append(
    ng_CreateImageHTMLSH(
      b.id,
      d,
      e,
      b.Src,
      b.aL,
      b.aT,
      b.W,
      b.H,
      "position:absolute;" + f,
      (b.L != b.oL || b.T != b.oT
        ? ' L="' +
          b.L +
          '" T="' +
          b.T +
          '" oL="' +
          b.oL +
          '" oT="' +
          b.oT +
          '" '
        : "") + g,
      j
    )
  );
}
function ngc_ImgBox(a, b, d, e, f, g, j, k, n, o, t, q, u, x, w) {
  var y,
    z,
    B,
    C,
    A,
    J,
    F,
    E,
    G,
    D,
    H,
    L,
    I,
    K,
    P,
    O = { L: 0, T: 0, aL: 0, aT: 0, oT: 0, oL: 0, W: 0, H: 0 },
    M = "position:absolute;";
  if (typeof q === "string") M += q;
  if (typeof q === "object") {
    d = ngVal(q.LeftTop, "");
    y = ngVal(q.Top, "");
    z = ngVal(q.RightTop, "");
    B = ngVal(q.Left, "");
    C = ngVal(q.Right, "");
    A = ngVal(q.LeftBottom, "");
    J = ngVal(q.Bottom, "");
    F = ngVal(q.RightBottom, "");
    q = ngVal(q.Content, "");
  } else d = y = z = B = C = A = J = F = q = "";
  var N = "";
  if (typeof u === "string") N += u;
  if (typeof u === "object") {
    E = ngVal(u.LeftTop, "");
    G = ngVal(u.Top, "");
    D = ngVal(u.RightTop, "");
    H = ngVal(u.Left, "");
    L = ngVal(u.Right, "");
    I = ngVal(u.LeftBottom, "");
    K = ngVal(u.Bottom, "");
    P = ngVal(u.RightBottom, "");
    u = ngVal(u.Content, "");
  } else E = G = D = H = L = I = K = P = u = "";
  if (typeof w === "undefined") w = {};
  w.Left =
    typeof t.Left === "undefined" ? O : ngc_ImgProps(b + "_L", e, f, t.Left);
  w.Top =
    typeof t.Top === "undefined" ? O : ngc_ImgProps(b + "_T", e, f, t.Top);
  w.Right =
    typeof t.Right === "undefined" ? O : ngc_ImgProps(b + "_R", e, f, t.Right);
  w.Bottom =
    typeof t.Bottom === "undefined"
      ? O
      : ngc_ImgProps(b + "_B", e, f, t.Bottom);
  w.LeftTop =
    typeof t.LeftTop === "undefined"
      ? O
      : ngc_ImgProps(b + "_LT", e, f, t.LeftTop);
  w.RightTop =
    typeof t.RightTop === "undefined"
      ? O
      : ngc_ImgProps(b + "_RT", e, f, t.RightTop);
  w.LeftBottom =
    typeof t.LeftBottom === "undefined"
      ? O
      : ngc_ImgProps(b + "_LB", e, f, t.LeftBottom);
  w.RightBottom =
    typeof t.RightBottom === "undefined"
      ? O
      : ngc_ImgProps(b + "_RB", e, f, t.RightBottom);
  if (o) {
    k += w.Left.W;
    k += w.Right.W;
    n += w.Top.H;
    n += w.Bottom.H;
  }
  f = w.LeftTop.W + w.RightTop.W;
  if (f > k) {
    e = Math.round((f - k) / 2);
    f = f - k - e;
    w.LeftTop.W -= e;
    w.RightTop.W -= f;
    w.RightTop.L += f;
    w.RightTop.oL += f;
    w.RightTop.aL += f;
  }
  f = w.LeftBottom.W + w.RightBottom.W;
  if (f > k) {
    e = Math.round((f - k) / 2);
    f = f - k - e;
    w.LeftBottom.W -= e;
    w.RightBottom.W -= f;
    w.RightBottom.L += f;
    w.RightBottom.oL += f;
    w.RightBottom.aL += f;
  }
  f = w.LeftTop.H + w.LeftBottom.H;
  if (f > n) {
    e = Math.round((f - n) / 2);
    f = f - n - e;
    w.LeftTop.H -= e;
    w.LeftBottom.H -= f;
    w.LeftBottom.T += f;
    w.LeftBottom.oT += f;
    w.LeftBottom.aT += f;
  }
  f = w.RightTop.H + w.RightBottom.H;
  if (f > n) {
    e = Math.round((f - n) / 2);
    f = f - n - e;
    w.RightTop.H -= e;
    w.RightBottom.H -= f;
    w.RightBottom.T += f;
    w.RightBottom.oT += f;
    w.RightBottom.aT += f;
  }
  e = w.LeftTop;
  e.W && ngc_Img(a, e, M + d + "left:" + g + "px;top: " + j + "px;", N + E);
  e = w.Top;
  e.H &&
    ngc_ImgSW(
      a,
      e,
      w.LeftTop.W,
      k - w.LeftTop.W - w.RightTop.W,
      M + y + "top: " + j + "px;",
      N + G
    );
  e = w.RightTop;
  e.W &&
    ngc_Img(
      a,
      e,
      M + z + "left:" + (g + k - e.W) + "px;top: " + j + "px;",
      N + D
    );
  e = w.Left;
  if (e.W)
    ngc_ImgSH(
      a,
      e,
      j + (w.LeftTop.H ? w.LeftTop.H : w.Top.H),
      n -
        (w.LeftTop.H ? w.LeftTop.H : w.Top.H) -
        (w.LeftBottom.H ? w.LeftBottom.H : w.Bottom.H),
      M + B + "left: " + g + "px;",
      N + H
    );
  e = w.Right;
  if (e.W)
    ngc_ImgSH(
      a,
      e,
      j + (w.RightTop.H ? w.RightTop.H : w.Top.H),
      n -
        (w.RightTop.H ? w.RightTop.H : w.Top.H) -
        (w.RightBottom.H ? w.RightBottom.H : w.Bottom.H),
      M + C + "left: " + (g + k - e.W) + "px;",
      N + L
    );
  e = w.LeftBottom;
  e.W &&
    ngc_Img(
      a,
      e,
      M + A + "left:" + g + "px;top: " + (j + n - e.H) + "px;",
      N + I
    );
  e = w.Bottom;
  e.H &&
    ngc_ImgSW(
      a,
      e,
      w.LeftBottom.W,
      k - w.LeftBottom.W - w.RightBottom.W,
      M + J + "top: " + (j + n - e.H) + "px;",
      N + K
    );
  e = w.RightBottom;
  e.W &&
    ngc_Img(
      a,
      e,
      M + F + "left:" + (g + k - e.W) + "px;top: " + (j + n - e.H) + "px;",
      N + P
    );
  if (typeof x !== "undefined") {
    a.append(
      '<div id="' +
        b +
        '_CB" style="' +
        M +
        q +
        "left:" +
        (g + w.Left.W) +
        "px;top:" +
        (j + w.Top.H) +
        "px;width:" +
        (k - w.Left.W - w.Right.W) +
        "px;height:" +
        (n - w.Top.H - w.Bottom.H) +
        'px;" ' +
        N +
        u +
        ">"
    );
    a.append(x);
    a.append("</div>");
  }
}
function ngc_ImgProps(a, b, d, e) {
  var f = {};
  f.id = a;
  f.W = e.W;
  f.H = e.H;
  f.Src = ngVal(e.Src, ngControlImages);
  if (!d) {
    switch (b) {
      case 0:
      case false:
        f.L = e.DL;
        f.T = e.DT;
        f.oL = e.oDL;
        f.oT = e.oDT;
        break;
      case 1:
      case true:
        f.L = e.DSL;
        f.T = e.DST;
        f.oL = e.oDSL;
        f.oT = e.oDST;
        break;
      case 2:
        f.L = e.DGL;
        f.T = e.DGT;
        f.oL = e.oDGL;
        f.oT = e.oDGT;
        break;
    }
    f.L = ngVal(f.L, e.DL);
    f.T = ngVal(f.T, e.DT);
    f.oL = ngVal(f.oL, e.oDL);
    f.oT = ngVal(f.oT, e.oDT);
    if (typeof f.L === "undefined" && typeof f.T === "undefined") d = true;
    else {
      f.L = ngVal(f.L, e.L);
      f.T = ngVal(f.T, e.T);
    }
  }
  if (d) {
    switch (b) {
      case 0:
      case false:
        f.L = e.L;
        f.T = e.T;
        f.oL = e.oL;
        f.oT = e.oT;
        break;
      case 1:
      case true:
        f.L = e.SL;
        f.T = e.ST;
        f.oL = e.oSL;
        f.oT = e.oST;
        break;
      case 2:
        f.L = e.GL;
        f.T = e.GT;
        f.oL = e.oGL;
        f.oT = e.oGT;
        break;
    }
    f.L = ngVal(f.L, e.L);
    f.T = ngVal(f.T, e.T);
    f.oL = ngVal(f.oL, e.oL);
    f.oT = ngVal(f.oT, e.oT);
  }
  f.oL = ngVal(f.oL, f.L);
  f.oT = ngVal(f.oT, f.T);
  f.aL = f.L;
  f.aT = f.T;
  return f;
}
function ngc_ImgDrawProps(a, b, d, e, f, g) {
  return ngc_ImgProps(a, e, f, g);
}
var APPPARAM_SERVER = 1,
  APPPARAM_CLIENT = 2,
  APPPARAM_URL = 4;
function nga_Elm() {
  var a = ngVal(this.ElmID, "ngApp");
  if (a == "") a = "ngApp";
  a = document.getElementById(a);
  if (!a) a = document.body;
  return a;
}
function nga_GetLang() {
  var a = ngc_Lang[this.Lang];
  if (typeof a === "undefined") {
    this.Lang = "en";
    a = ngc_Lang.en;
  }
  return a;
}
function nga_Text(a, b) {
  return ngTxt(a, b);
}
function nga_Resource(a) {
  return ngRes(a);
}
nga_RunTimer = null;
function nga_DoRunFinal() {
  if (!(ngApp.OnRun && !ngVal(ngApp.OnRun(), false))) {
    typeof ngMain === "function" && ngMain();
    ngApp.SetOnParamsChanged = nga_SetOnParamsChanged;
    ngApp.SetOnParamsChanged(ngApp.OnParamsChanged);
    ngApp.OnRunFinished && ngApp.OnRunFinished();
    ngApp.OnRunInternalFinished && ngApp.OnRunInternalFinished();
    var a = document.getElementById("ngAppLoading");
    if (a) a.className = "ngAppLoaded";
    a = document.body.offsetLeft;
  }
}
function nga_DoRun() {
  nga_RunTimer && clearTimeout(nga_RunTimer);
  nga_RunTimer = null;
  var a = ngVal(ngApp.StartParams.Lang, "");
  if (a == "") a = ngVal(ng_GET("lang"), "");
  if (a == "cs") a = "cz";
  if (a == "" || typeof ngc_Lang[a] === "undefined") {
    if (navigator.userLanguage) a = navigator.userLanguage;
    else if (navigator.language) a = navigator.language;
    if (a == "cs") a = "cz";
    if (a == "" || typeof ngc_Lang[a] === "undefined")
      a =
        a == "cz" && typeof ngc_Lang.sk !== "undefined"
          ? "sk"
          : a == "sk" && typeof ngc_Lang.cz !== "undefined"
            ? "cz"
            : "en";
  }
  ngApp.Lang = a;
  var b;
  if (typeof ngApp.StartParams.ReqControlsVer === "undefined") {
    a = ngControlsVer;
    b = ngControlsSubVer;
  } else {
    a = parseInt(ngApp.StartParams.ReqControlsVer);
    b = parseInt(ngVal(ngApp.StartParams.ReqControlsSubVer, 0));
  }
  if (a > ngControlsVer || (a == ngControlsVer && b > ngControlsSubVer)) {
    var d = document.getElementById("ngAppLoading");
    if (d) d.style.display = "none";
    alert(
      ng_sprintf(
        ngTxt("ngAppOldControlsVersion"),
        a,
        b,
        ngControlsVer,
        ngControlsSubVer
      )
    );
  } else {
    ng_PreloadImagesBegin();
    ngControlImages = ng_URL(ngControlImages);
    ngInitUserControls();
    ngControlImages != "" && ng_PreloadImage(ngControlImages);
    try {
      window.focus();
    } catch (e) {}
    typeof ngInit === "function" && ngInit();
    ng_PreloadImagesEnd(nga_DoRunFinal);
  }
}
function nga_Run() {
  nga_RunTimer = setTimeout("nga_DoRun();", 100);
}
function nga_SetTitle(a) {
  if (ngVal(a, "") != "")
    try {
      document.title = this.Text(a);
    } catch (b) {}
}
function nga_MessageBox(a, b) {
  if (ngVal(b, false)) return confirm(this.Text(a));
  else alert(this.Text(a));
}
function ng_SetBounds(a, b) {
  var d = b.L,
    e = b.T,
    f = b.R,
    g = b.B,
    j = b.W,
    k = b.H;
  if (typeof d === "number") d += "px";
  if (typeof f === "number") f += "px";
  if (typeof e === "number") e += "px";
  if (typeof g === "number") g += "px";
  if (typeof j === "number") j = j <= 0 ? "0px" : j + "px";
  if (typeof k === "number") k = k <= 0 ? "0px" : k + "px";
  a.style.top = typeof e !== "undefined" ? e : "";
  a.style.left = typeof d !== "undefined" ? d : "";
  if (typeof b.B !== "undefined" || typeof b.R !== "undefined")
    if (ngIExplorer6) {
      d = ngVal(b.IE6AlignFix, ngIE6AlignFix);
      if (typeof b.B !== "undefined" && (d || typeof b.T !== "undefined")) {
        if (typeof b.T === "undefined" || typeof b.H === "undefined") {
          if (typeof b.T !== "undefined") a.setAttribute("FT", b.T);
          else ng_nullAttr(a.getAttribute("FT")) || a.setAttribute("FT", "");
          if (typeof b.B !== "undefined") a.setAttribute("FB", b.B);
          else ng_nullAttr(a.getAttribute("FB")) || a.setAttribute("FB", "");
        }
      } else {
        ng_nullAttr(a.getAttribute("FT")) || a.setAttribute("FT", "");
        ng_nullAttr(a.getAttribute("FB")) || a.setAttribute("FB", "");
        a.style.bottom = typeof g !== "undefined" ? g : "";
      }
      if (typeof b.R !== "undefined" && (d || typeof b.L !== "undefined")) {
        if (typeof b.L === "undefined" || typeof b.W === "undefined") {
          if (typeof b.L !== "undefined") a.setAttribute("FL", b.L);
          else ng_nullAttr(a.getAttribute("FL")) || a.setAttribute("FL", "");
          if (typeof b.R !== "undefined") a.setAttribute("FR", b.R);
          else ng_nullAttr(a.getAttribute("FR")) || a.setAttribute("FR", "");
        }
      } else {
        ng_nullAttr(a.getAttribute("FL")) || a.setAttribute("FL", "");
        ng_nullAttr(a.getAttribute("FR")) || a.setAttribute("FR", "");
        a.style.right = typeof f !== "undefined" ? f : "";
      }
    } else {
      a.style.bottom = typeof g !== "undefined" ? g : "";
      a.style.right = typeof f !== "undefined" ? f : "";
    }
  else {
    ng_nullAttr(a.getAttribute("FT")) || a.setAttribute("FT", "");
    ng_nullAttr(a.getAttribute("FB")) || a.setAttribute("FB", "");
    ng_nullAttr(a.getAttribute("FL")) || a.setAttribute("FL", "");
    ng_nullAttr(a.getAttribute("FR")) || a.setAttribute("FR", "");
  }
  a.style.width = typeof j !== "undefined" ? j : "";
  a.style.height = typeof k !== "undefined" ? k : "";
  ng_SetAutoResize(a);
}
var ngAutoRSync = 1,
  ngAutoResize = null,
  ngAutoResizeRefs = null,
  ngAutoResizeCnt = 0,
  ngAutoResizeTimer = null;
function ng_StartAutoResize(a, b) {
  if (typeof a === "string") a = document.getElementById(a);
  if (!(!a || a.id == "")) {
    ngAutoResize || (ngAutoResize = []);
    ngAutoResizeRefs || (ngAutoResizeRefs = []);
    if (typeof ngAutoResize[a.id] === "undefined") {
      ngAutoResizeCnt++;
      ngAutoResize[a.id] = ngAutoRSync;
    }
    var d = ngAutoResizeRefs[a.id];
    if (typeof d === "undefined") {
      d = [];
      ngAutoResizeRefs[a.id] = d;
    }
    d[b] = true;
  }
}
function ng_EndAutoResize(a, b) {
  if (typeof a === "string") a = document.getElementById(a);
  if (!(!a || a.id == ""))
    if (ngAutoResize && typeof ngAutoResize[a.id] !== "undefined") {
      var d = ngAutoResizeRefs[a.id];
      typeof d !== "undefined" && delete d[b];
      b = 0;
      for (var e in d)
        if (typeof d[e] !== "undefined") {
          b = 1;
          break;
        }
      if (!b) {
        ngAutoResizeCnt--;
        delete ngAutoResize[a.id];
        if (ngAutoResizeCnt <= 0) ngAutoResizeRefs = ngAutoResize = null;
      }
    }
}
function ng_SetAutoResize(a) {
  if (typeof a === "string") a = document.getElementById(a);
  if (!(!a || a.id == "")) {
    var b = a.getAttribute("FR"),
      d = a.getAttribute("FB");
    if (
      !ng_nullAttr(b) ||
      !ng_nullAttr(d) ||
      (a.style.left != "" && a.style.right != "") ||
      (a.style.top != "" && a.style.bottom != "")
    ) {
      ng_StartAutoResize(a, "bounds");
      ng_Align(a.id);
    } else ng_EndAutoResize(a, "bounds");
  }
}
function nga_OnResize(a) {
  if (typeof ngApp === "undefined" || !ngApp) {
    ngAutoResizeTimer && clearTimeout(ngAutoResizeTimer);
    ngAutoResizeTimer = null;
    if (ngAutoResize && ngAutoResizeCnt > 0)
      ngAutoResizeTimer = setTimeout("nga_DoResize()", 100);
  } else {
    var b = ngApp.Elm();
    if (b) {
      a = ng_ClientWidth(b);
      b = ng_ClientHeight(b);
      if (a === ngApp.LastResizeW && b === ngApp.LastResizeH) return;
      ngApp.MobileKeyboardTimer && clearTimeout(ngApp.MobileKeyboardTimer);
      delete ngApp.MobileKeyboardTimer;
      ngApp.LastResizeW = a;
      ngApp.LastResizeH = b;
    }
    ngAutoResizeTimer && clearTimeout(ngAutoResizeTimer);
    ngAutoResizeTimer = null;
    if (ngApp.OnDeviceChanged || (ngAutoResize && ngAutoResizeCnt > 0))
      ngAutoResizeTimer = setTimeout("nga_DoResize()", 100);
  }
}
function nga_DoResizeElement(a) {
  var b = document.getElementById(a);
  if (!(!b || ngAutoResize[a] == ngAutoRSync)) {
    for (var d = [], e = b.parentNode; e; ) {
      if (ngAutoResize[e.id]) d[d.length] = e.id;
      e = e.parentNode;
    }
    for (e = d.length - 1; e >= 0; e--) nga_DoResizeElement(d[e]);
    if ((c = ngGetControlById(a))) {
      for (po = c.ParentControl; po; ) {
        if (typeof ngAutoResize[po.ID] !== "undefined") return;
        po = po.ParentControl;
      }
      nga_DoResizeControl(c, true);
    } else {
      r = ng_Align(b);
      ngAutoResize[a] = ngAutoRSync;
    }
  }
}
function nga_DoResizeControl(a, b) {
  var d = false;
  if (typeof ngAutoResize[a.ID] !== "undefined") {
    if (b) {
      var e = a.Align(a.ID);
      if ((e & 4 || e & 8) && a.Update) {
        d = true;
        b = false;
      }
    }
    ngAutoResize[a.ID] = ngAutoRSync;
  }
  if (typeof a.ChildControls !== "undefined" && a.ChildControls.length > 0)
    for (e = 0; e < a.ChildControls.length; e++)
      nga_DoResizeControl(a.ChildControls[e], b);
  d && a.Update();
}
function nga_DoResize(a) {
  ngAutoResizeTimer && clearTimeout(ngAutoResizeTimer);
  ngAutoResizeTimer = null;
  if (ngApp.OnDeviceChanged && typeof ngDetectDevice === "function") {
    a = ngDetectDevice();
    if (ngDevice != a) if (ngVal(ngApp.OnDeviceChanged(a), false)) ngDevice = a;
  }
  if (!(!ngAutoResize || ngAutoResizeCnt <= 0)) {
    ngAutoRSync++;
    for (var b in ngAutoResize) nga_DoResizeElement(b);
  }
}
function nga_GetRPC() {
  if (!this.RPC) this.RPC = new ngRPC("ngApp");
  return this.RPC;
}
function nga_sendRPCRequest(a, b) {
  var d = false,
    e = false,
    f = false;
  if (typeof this.Params === "object") {
    if (
      typeof ngDevice !== "undefined" &&
      typeof this.Params.appdevice === "undefined"
    ) {
      this.Params.appdevice = ngDevice;
      e = true;
    }
    if (typeof this.Params.lang === "undefined" && typeof ngApp === "object") {
      this.Params.lang = ngApp.Lang;
      d = true;
    }
    if (ngHASDEBUG() && typeof this.Params.appdebug === "undefined") {
      this.Params.appdebug = ngDEBUG;
      f = true;
    }
  }
  a = this.sendRequestDefault(a, b);
  d && delete this.Params.lang;
  e && delete this.Params.appdevice;
  f && delete this.Params.appdebug;
  return a;
}
function nga_AddRPCLang(a) {
  a.sendRequestDefault = a.sendRequest;
  a.sendRequest = nga_sendRPCRequest;
  return true;
}
function nga_BuildURLParams(a, b) {
  var d = "",
    e,
    f,
    g;
  if (typeof this.ParamInfo !== "undefined")
    for (var j in this.ParamInfo) {
      g = this.ParamInfo[j];
      if (!(typeof g === "undefined" || !g)) {
        f = ngVal(g.Type, APPPARAM_URL);
        if (f & b) {
          e = this.Param(j);
          if (ngVal(g.Persist, false)) {
            f = f & APPPARAM_CLIENT;
            if (typeof g.Encode === "function") {
              if (typeof e === "undefined" || typeof e === "function") continue;
              e = g.Encode(j) + "=" + g.Encode(e);
            } else if (this.OnEncodeParam) e = this.OnEncodeParam(this, j, e);
            else {
              if (typeof e === "undefined" || typeof e === "function") continue;
              e = f
                ? ng_HashEncode(j) + "=" + ng_HashEncode(e)
                : ng_URLEncode(j) + "=" + ng_URLEncode(e);
            }
            if (!(typeof e === "undefined" || typeof e === "function"))
              if (f) {
                if (d != "") d += "@";
                d += e;
              } else a = ng_AddURLParam(a, e);
          }
        }
      }
    }
  if (d != "") {
    a += a.indexOf("#") != -1 ? "@" : "#";
    a += d;
  }
  return a;
}
function nga_CallURL(a) {
  a = this.BuildURLParams(a, APPPARAM_CLIENT | APPPARAM_URL);
  if (this.OnCallURL) a = this.OnCallURL(this, a);
  return a;
}
function nga_Call(a) {
  a = this.CallURL(a);
  if (this.OnCall) a = this.OnCall(this, a);
  a != "" && ng_Redirect(a, false);
}
function nga_CallServerURL(a) {
  a = this.BuildURLParams(a, APPPARAM_SERVER);
  if (this.OnCallServerURL) a = this.OnCallServerURL(this, a);
  return a;
}
function nga_CallServer(a, b) {
  this.CallServerEx(a, undefined, b);
}
function nga_CallServerEx(a, b, d) {
  a = this.CallServerURL(a);
  if (this.OnServerCall) a = this.OnServerCall(this, a, d, b);
  if (a != "") {
    var e = this.GetRPC(),
      f = e.Params;
    if (typeof b !== "undefined") e.Params = b;
    e.sendRequest(a, d);
    e.Params = f;
  }
}
function nga_Param(a) {
  if (!this.params_parsed) {
    this.params_parsed = true;
    this.ParseParams();
  }
  var b = ng_GET(a);
  if (this.OnGetParam) b = this.OnGetParam(this, a, b);
  return b;
}
function nga_SetParam(a, b, d) {
  if (!this.params_parsed) {
    this.params_parsed = true;
    this.ParseParams();
  }
  if (typeof a === "object") {
    this.BeginUpdateParams();
    for (var e in a) this.SetParam(e, a[e], d);
    this.EndUpdateParams();
  } else if (a != "") {
    this.BeginUpdateParams();
    if (this.OnSetParam) b = this.OnSetParam(this, a, b, d);
    e = false;
    if (ngURLParams[a] != b) e = true;
    ngURLParams[a] = b;
    if (typeof b === "undefined") {
      if (typeof this.ParamInfo !== "undefined") {
        b = this.ParamInfo[a];
        if (typeof b !== "undefined" && b.Type & APPPARAM_CLIENT && e)
          this.params_changed = true;
      }
    } else if (typeof d !== "undefined") {
      if (typeof this.ParamInfo === "undefined") this.ParamInfo = [];
      b = this.ParamInfo[a];
      if (typeof b === "undefined") {
        b = {};
        this.ParamInfo[a] = b;
      }
      b.Type = d;
      if (b.Type & APPPARAM_CLIENT && e) this.params_changed = true;
    }
    this.EndUpdateParams();
  }
}
function nga_SetParamEncodingFnc(a, b, d) {
  if (typeof this.ParamInfo === "undefined") this.ParamInfo = [];
  var e = this.ParamInfo[a];
  if (typeof e === "undefined") {
    e = {};
    this.ParamInfo[a] = e;
  }
  e.Encode = b;
  e.Decode = d;
}
function nga_SetClientParam(a, b) {
  this.SetParam(a, b, APPPARAM_CLIENT);
}
function nga_SetURLParam(a, b) {
  this.SetParam(a, b, APPPARAM_URL);
}
function nga_SetServerParam(a, b) {
  this.SetParam(a, b, APPPARAM_SERVER);
}
function nga_ParamType(a) {
  if (typeof this.ParamInfo !== "undefined") {
    a = this.ParamInfo[a];
    if (!(typeof a === "undefined" || !a)) return ngVal(a.Type, APPPARAM_URL);
  }
}
function nga_PersistParam(a, b) {
  if (typeof a === "object")
    for (var d = 0; d < a.length; d++) this.PersistParam(a[d], b);
  else if (a != "") {
    b = ngVal(b, true);
    if (typeof this.ParamInfo === "undefined")
      if (b) this.ParamInfo = [];
      else return;
    d = this.ParamInfo[a];
    if (typeof d === "undefined" || !d)
      if (b) {
        d = {};
        this.ParamInfo[a] = d;
      } else return;
    d.Persist = b;
  }
}
function nga_SetParamType(a, b) {
  b = ngVal(b, APPPARAM_URL);
  if (typeof a === "object")
    for (var d = 0; d < a.length; d++) this.SetParamType(a[d], b);
  else if (a != "") {
    if (typeof this.ParamInfo === "undefined") this.ParamInfo = [];
    d = this.ParamInfo[a];
    if (typeof d === "undefined" || !d) {
      d = {};
      this.ParamInfo[a] = d;
    }
    d.Type = b;
  }
}
function nga_BeginUpdateParams() {
  this.params_update_cnt++;
}
function nga_EndUpdateParams() {
  this.params_update_cnt--;
  if (this.params_update_cnt <= 0) {
    this.params_changed && this.UpdateParams();
    this.params_update_cnt = 0;
  }
}
function nga_ParseParams2(a, b) {
  var d = [];
  if (a == "") return d;
  a = a.split(b);
  for (var e = 0; e < a.length; e++) {
    b = a[e].split("=");
    if (b[0].substr(0, 4) == "amp;") b[0] = b[0].substr(4);
    d[ng_unescape(b[0])] = b.length > 1 ? b[1] : null;
  }
  return d;
}
function nga_ParseParams(a) {
  ngURLParams = [];
  a = ngVal(a, window.location.href);
  var b = a.indexOf("?"),
    d = a.indexOf("#"),
    e = "",
    f = "";
  if (d >= 0) {
    f = a.substr(d + 1);
    a = a.substr(0, d);
  }
  if (b >= 0) e = a.substr(b + 1);
  a = nga_ParseParams2(e, "&");
  for (var g in a) ngURLParams[g] = a[g];
  f = nga_ParseParams2(f, "@");
  for (g in f) ngURLParams[g] = f[g];
  if (typeof this.ParamInfo === "undefined") this.ParamInfo = [];
  for (g in a) {
    b = this.ParamInfo[g];
    if (typeof b === "undefined") {
      b = {};
      this.ParamInfo[g] = b;
    }
    b.Type = APPPARAM_URL;
    d = a[g];
    if (typeof b.Decode === "function") {
      if (typeof d === "undefined" || typeof d === "function") continue;
      d = b.Decode(d);
    } else if (this.OnDecodeParam) d = this.OnDecodeParam(this, g, d);
    else {
      if (typeof d === "undefined" || typeof d === "function") continue;
      d = ng_unescape(d);
    }
    typeof d === "undefined" || typeof d === "function" || (ngURLParams[g] = d);
  }
  for (g in f) {
    b = this.ParamInfo[g];
    if (typeof b === "undefined") {
      b = {};
      this.ParamInfo[g] = b;
    }
    b.Type = APPPARAM_CLIENT;
    d = f[g];
    if (typeof b.Decode === "function") {
      if (typeof d === "undefined" || typeof d === "function") continue;
      d = b.Decode(d);
    } else if (this.OnDecodeParam) d = this.OnDecodeParam(this, g, d);
    else {
      if (typeof d === "undefined" || typeof d === "function") continue;
      d = ng_unescape(d);
    }
    typeof d === "undefined" || typeof d === "function" || (ngURLParams[g] = d);
  }
  ngURLParamsParsed = true;
  this.LocationHash = window.location.hash;
}
function nga_UpdateParams() {
  this.params_changed = false;
  if (typeof this.ParamInfo !== "undefined") {
    var a = "",
      b,
      d;
    for (var e in this.ParamInfo) {
      b = this.ParamInfo[e];
      if (!(typeof b === "undefined" || !b))
        if (ngVal(b.Type, APPPARAM_URL) & APPPARAM_CLIENT) {
          d = this.Param(e);
          if (ngVal(b.Persist, false)) {
            if (typeof b.Encode === "function") {
              if (typeof d === "undefined" || typeof d === "function") continue;
              d = b.Encode(e) + "=" + b.Encode(d);
            } else if (this.OnEncodeParam) d = this.OnEncodeParam(this, e, d);
            else {
              if (typeof d === "undefined" || typeof d === "function") continue;
              d = ng_HashEncode(e) + "=" + ng_HashEncode(d);
            }
            if (!(typeof d === "undefined" || typeof d === "function")) {
              if (a != "") a += "@";
              a += d;
            }
          } else {
            delete this.ParamInfo[e];
            delete ngURLParams[e];
          }
        }
    }
    if (a != "" || window.location.hash != "") a = "#" + a;
    if (window.location.hash != a) {
      ngApp.LocationHash = a;
      try {
        window.location.hash = a;
      } catch (f) {}
      (b = document.getElementById("ngAppHistFix")) &&
        ngIExplorer &&
        nga_WriteIFRAMEHistory(b, a);
      nga_CheckParamChange();
    }
  }
}
function nga_WriteIFRAMEHistory(a, b) {
  if (!ngWinStoreApp)
    if (
      (a = a.contentDocument ? a.contentDocument : a.contentWindow.document)
    ) {
      a.open();
      a.write(
        "<html><body onload=\"if(parent) { if(parent.window.location.hash!='" +
          b +
          "') { parent.window.location.hash='" +
          b +
          "'; parent.nga_CheckParamChange(); } }\"></body></html>"
      );
      a.close();
    }
}
var nga_CheckParamChangeMode;
function nga_CheckParamChange() {
  if (typeof nga_CheckParamChangeMode === "undefined") {
    nga_CheckParamChangeMode = 0;
    if ("onhashchange" in window && (!ngIExplorer || ngIExplorerVersion > 7)) {
      window.onhashchange = ngAddEvent(
        window.onhashchange,
        nga_CheckParamChange
      );
      nga_CheckParamChangeMode = 1;
    }
  }
  if (!(typeof ngApp !== "object" || !ngApp)) {
    ngApp.url_history_timer && clearTimeout(ngApp.url_history_timer);
    ngApp.url_history_timer = null;
    try {
      ngApp.LocationHash != window.location.hash && ngApp.DoParamsChanged();
      if (!nga_CheckParamChangeMode)
        ngApp.url_history_timer = setTimeout("nga_CheckParamChange()", 300);
    } catch (a) {}
  }
}
function nga_DoParamsChanged() {
  this.ParseParams();
  this.OnInternalParamsChanged && this.OnInternalParamsChanged(this);
  this.OnParamsChanged && this.OnParamsChanged(this);
}
function nga_SetOnParamsChanged2(a) {
  this.OnParamsChanged = a;
}
function nga_InitParamsChanged() {
  var a = document.getElementById("ngAppHistFix");
  if (!a) {
    if (ngIExplorer) a = document.createElement("iframe");
    if (ngOpera) {
      a = document.createElement("img");
      a.src = "javascript:location.href='javascript:nga_CheckParamChange();';";
    }
    if (a) {
      var b = typeof ngApp !== "undefined" ? ngApp.Elm() : document.body;
      a.id = "ngAppHistFix";
      a.style.visibility = "hidden";
      a.style.position = "absolute";
      a.style.left = "0px";
      a.style.top = "0px";
      a.style.width = "0px";
      a.style.height = "0px";
      b.appendChild(a);
      ngIExplorer && nga_WriteIFRAMEHistory(a, ngApp.LocationHash);
    }
    nga_CheckParamChange();
  }
}
function nga_SetOnParamsChanged(a) {
  this.OnParamsChanged = a;
  typeof a === "function" && nga_InitParamsChanged();
}
function nga_FloatVersion(a) {
  a = a.replace(/[^0-9.]/g, "");
  return parseFloat(a);
}
function nga_RegisterAPI(a, b, d, e) {
  if (ngVal(a, "") == "") return false;
  if (typeof b !== "object") return false;
  b.StrVersion = ngVal(d, ngVal(b.StrVersion, ngVal("" + b.Version, "1.0")));
  b.Version = nga_FloatVersion(b.StrVersion);
  if (typeof e === "undefined")
    e = typeof ngCurModule !== "undefined" && ngCurModule ? ngCurModule : this;
  if (typeof b.Owner === "undefined") b.Owner = e;
  d = this.APIs[a];
  if (typeof d === "undefined") {
    d = {};
    d.ID = a;
    d.Versions = [];
    this.APIs[a] = d;
  }
  for (e = 0; e < d.Versions.length; e++) {
    a = d.Versions[e];
    if (a.Version == b.Version) {
      if (a.Owner == b.Owner) return false;
      break;
    }
    if (a.Version < b.Version) break;
  }
  if (typeof b.AddEvent === "undefined") b.AddEvent = ngObjAddEvent;
  if (typeof b.RemoveEvent === "undefined") b.RemoveEvent = ngObjRemoveEvent;
  d.Versions.splice(e, 0, b);
  return true;
}
function nga_UnregisterAPI(a, b, d) {
  if (ngVal(a, "") == "") return false;
  var e = this.APIs[a];
  if (typeof e === "undefined") return false;
  d = ngVal(d, "");
  if (typeof b === "undefined" && d == "") {
    delete this.APIs[a];
    return true;
  }
  var f = d != "" ? nga_FloatVersion(d) : 0,
    g,
    j,
    k = false;
  for (j = e.Versions.length - 1; j >= 0; j--) {
    g = e.Versions[j];
    if (
      (typeof b !== "undefined" && g.Owner == b) ||
      (d != "" && g.Version == f)
    ) {
      k = true;
      e.Versions.splice(j, 1);
    }
  }
  e.Versions.length || delete this.APIs[a];
  return k;
}
function nga_GetAPIAll(a, b, d) {
  var e = [];
  a = this.APIs[a];
  if (typeof a === "undefined") return e;
  a = a.Versions;
  if (!a.length) return e;
  b = ngVal(b, "");
  d = ngVal(d, "");
  for (
    var f,
      g = null,
      j = b != "" ? nga_FloatVersion(b) : 0,
      k = d != "" ? nga_FloatVersion(d) : 0,
      n = [],
      o = 0;
    o < a.length;
    o++
  ) {
    g = a[o];
    if (!(d != "" && g.Version > k)) {
      if (b != "" && g.Version < j) break;
      for (f = n.length - 1; f >= 0; f--) if (n[f] == g.Owner) break;
      if (!(f >= 0)) {
        e[e.length] = g;
        n[n.length] = g.Owner;
      }
    }
  }
  return e;
}
function nga_GetAPIAllByStrVersion(a, b) {
  var d = [];
  a = this.APIs[a];
  if (typeof a === "undefined") return d;
  for (var e, f = a.Versions, g = [], j = 0; j < f.length; j++) {
    e = f[j];
    if (e.StrVersion == b) {
      for (a = g.length - 1; a >= 0; a--) if (g[a] == e.Owner) break;
      if (!(a >= 0)) {
        d[d.length] = e;
        g[g.length] = e.Owner;
      }
    }
  }
  return d;
}
function nga_GetAPI(a, b, d) {
  a = this.APIs[a];
  if (typeof a === "undefined") return null;
  a = a.Versions;
  if (!a.length) return null;
  b = ngVal(b, "");
  d = ngVal(d, "");
  if (b == "" && d == "") return a[0];
  for (
    var e = null,
      f = b != "" ? nga_FloatVersion(b) : 0,
      g = d != "" ? nga_FloatVersion(d) : 0,
      j = 0;
    j < a.length;
    j++
  ) {
    e = a[j];
    if (!(d != "" && e.Version > g)) {
      if (b != "" && e.Version < f) return null;
      break;
    }
  }
  return e;
}
function nga_GetAPIByStrVersion(a, b) {
  a = this.APIs[a];
  if (typeof a === "undefined") return null;
  a = a.Versions;
  for (var d = 0; d < a.length; d++) if (a[d].StrVersion == b) return a[d];
  return null;
}
function nga_ProcessInvokeLater() {
  if (ngApp) {
    clearTimeout(ngApp.invokelater_timer);
    ngApp.invokelater_timer = null;
    if (ngApp.invokelater_events.length > 0) {
      var a = ngApp.invokelater_events[0];
      ngApp.invokelater_events.splice(0, 1);
      typeof a === "function" && a();
      if (ngApp.invokelater_events.length > 0)
        ngApp.invokelater_timer = setTimeout("nga_ProcessInvokeLater()", 1);
    }
  }
}
function nga_InvokeLater(a) {
  if (typeof a === "function") {
    if (!this.invokelater_timer)
      this.invokelater_timer = setTimeout("nga_ProcessInvokeLater()", 1);
    this.invokelater_events.push(a);
  }
}
function ngApplication(a, b, d) {
  ngApp = this;
  this.StartParams = typeof a !== "undefined" ? a : {};
  if (ngIExplorer6)
    try {
      document.execCommand("BackgroundImageCache", false, true);
    } catch (e) {}
  this.AppPath = "";
  try {
    var f = "" + window.location.href,
      g = f.lastIndexOf("#");
    if (g >= 0) f = f.substring(0, g);
    g = f.lastIndexOf("?");
    if (g >= 0) f = f.substring(0, g);
    g = f.lastIndexOf(".php");
    if (g < 0) g = f.lastIndexOf(".html");
    if (g < 0) g = f.lastIndexOf(".asp");
    if (g < 0) g = f.lastIndexOf(".jsp");
    if (g > 0) {
      g = f.lastIndexOf("/");
      if (g > 0) {
        if (f.charAt(g - 1) == "/") f += "/";
        else f = f.substring(0, g + 1);
        this.AppPath = f;
      }
    } else if (f.length > 0) {
      if (f.charAt(f.length - 1) != "/") f += "/";
      this.AppPath = f;
    }
  } catch (j) {}
  this.Lang = "";
  if (typeof b === "object") b = b.id;
  this.ElmID = ngVal(b, "ngApp");
  this.LocationHash = "";
  try {
    this.LocationHash = window.location.hash;
  } catch (k) {}
  this.MobileKeyboardFix = true;
  this.GetLang = nga_GetLang;
  this.Text = nga_Text;
  this.Resource = nga_Resource;
  this.Run = nga_Run;
  this.SetTitle = nga_SetTitle;
  this.Alert = this.MessageBox = nga_MessageBox;
  this.Confirm = function(n) {
    return this.MessageBox(n, true);
  };
  this.params_parsed = false;
  this.Param = nga_Param;
  this.SetParam = nga_SetParam;
  this.SetClientParam = nga_SetClientParam;
  this.SetURLParam = nga_SetURLParam;
  this.SetServerParam = nga_SetServerParam;
  this.ParamType = nga_ParamType;
  this.SetParamType = nga_SetParamType;
  this.SetParamEncodingFnc = nga_SetParamEncodingFnc;
  this.PersistParam = nga_PersistParam;
  this.ParseParams = nga_ParseParams;
  this.UpdateParams = nga_UpdateParams;
  this.DoParamsChanged = nga_DoParamsChanged;
  this.params_changed = false;
  this.params_update_cnt = 0;
  this.BeginUpdateParams = nga_BeginUpdateParams;
  this.EndUpdateParams = nga_EndUpdateParams;
  this.url_history_timer = null;
  this.invokelater_events = [];
  this.InvokeLater = nga_InvokeLater;
  this.BuildURLParams = nga_BuildURLParams;
  this.CallURL = nga_CallURL;
  this.Call = nga_Call;
  this.RPC = null;
  this.CallServerURL = nga_CallServerURL;
  ngOnRPCCreated = ngAddEvent(ngOnRPCCreated, nga_AddRPCLang);
  this.CallServer = nga_CallServer;
  this.CallServerEx = nga_CallServerEx;
  this.GetRPC = nga_GetRPC;
  this.Elm = nga_Elm;
  this.AddEvent = ngObjAddEvent;
  this.RemoveEvent = ngObjRemoveEvent;
  this.SetOnParamsChanged = nga_SetOnParamsChanged2;
  this.APIs = {};
  this.RegisterAPI = nga_RegisterAPI;
  this.UnregisterAPI = nga_UnregisterAPI;
  this.GetAPI = nga_GetAPI;
  this.GetAPIAll = nga_GetAPIAll;
  this.GetAPIByStrVersion = nga_GetAPIByStrVersion;
  this.GetAPIAllByStrVersion = nga_GetAPIAllByStrVersion;
  this.OnDeviceChanged = this.OnServerCall = this.OnCallServerURL = this.OnCall = this.OnCallURL = this.OnEncodeParam = this.OnDecodeParam = this.OnGetParam = this.OnSetParam = this.OnInternalParamsChanged = this.OnParamsChanged = this.OnRunInternalFinished = this.OnRunFinished = this.OnRun = null;
  if ((a = this.Elm())) {
    ngApp.LastResizeW = ng_ClientWidth(a);
    ngApp.LastResizeH = ng_ClientHeight(a);
  }
  window.onresize = ngAddEvent(window.onresize, nga_OnResize);
  ngVal(d, true) && this.Run();
}
function ngControls(a, b) {
  if (typeof b === "undefined") {
    var d = document.getElementById(
      typeof ngApp !== "undefined" ? ngApp.ElmID : "ngApp"
    );
    if (d) b = d;
  }
  typeof a === "object" && ngCreateControls(a, this, b);
  this.Update = function() {
    ngUpdateControls(this);
  };
  this.Release = function() {
    ngReleaseControls(this);
  };
  this.Dispose = function() {
    ngDisposeControls(this);
  };
  this.AddControls = function(e, f) {
    ngCreateControls(e, this, f);
  };
}
function ngp_DoRelease(a) {
  a.style.display = "none";
}
function ngPanel(a) {
  ngControl(this, a, "ngPanel");
  this.DoRelease = ngp_DoRelease;
  ngControlCreated(this);
}
function ngFrame_Create(a, b, d) {
  a.ParentReferences = ngVal(a.ParentReferences, false);
  return ngCreateControlAsType(a, "ngPanel", b, d);
}
function ngt_DoCreate(a) {
  var b = "";
  if (
    typeof a.W === "undefined" &&
    (typeof a.L === "undefined" || typeof a.R === "undefined")
  )
    b = "horizontal";
  if (
    typeof a.H === "undefined" &&
    (typeof a.T === "undefined" || typeof a.B === "undefined")
  )
    b = b == "horizontal" ? "auto" : "vertical";
  if (b != "") {
    if (!a.Data || typeof a.Data.AutoSizeMode === "undefined")
      this.AutoSizeMode = b;
    if (!a.Data || typeof a.Data.AutoSize === "undefined") this.AutoSize = true;
  }
}
function ngt_DoUpdate(a) {
  var b = this.BaseClassName,
    d = this.GetText(),
    e = this.GetAlt();
  if (this.HTMLEncode) d = ng_htmlEncode(d);
  if (this.AutoSize && ngIExplorer && ng_GetStylePx(a.style.height) == 0)
    a.style.height = "1px";
  var f = "";
  if (
    this.AutoSize &&
    (this.AutoSizeMode == "auto" || this.AutoSizeMode == "horizontal")
  )
    f += "white-space: nowrap; ";
  if (!this.AutoSize || this.AutoSizeMode == "vertical")
    f += "width:" + ng_ClientWidth(a) + "px; ";
  if (!this.AutoSize || this.AutoSizeMode == "horizontal")
    f += "height:" + ng_ClientHeight(a) + "px; ";
  var g = new ngStringBuilder();
  g.append(
    '<span id="' +
      this.ID +
      '_T" class="' +
      b +
      "Text" +
      (this.Enabled ? "" : "Disabled") +
      '" style="position:absolute;' +
      f +
      "text-align:" +
      this.TextAlign +
      ';"'
  );
  e != "" && g.append(' title="' + ng_htmlEncode(e) + '"');
  g.append(">");
  g.append(d);
  g.append("</span>");
  ng_SetInnerHTML(a, g.toString());
  if (this.AutoSize)
    if ((b = document.getElementById(this.ID + "_T"))) {
      if (this.AutoSizeMode == "auto" || this.AutoSizeMode == "horizontal") {
        d = ng_ClientWidth(b);
        if (typeof this.MinWidth !== "undefined" && d < this.MinWidth)
          d = this.MinWidth;
        ng_SetStyleWidth(a, d);
        ng_SetStyleWidth(b, d);
      }
      if (this.AutoSizeMode == "auto" || this.AutoSizeMode == "vertical") {
        d = ng_ClientHeight(b);
        if (typeof this.MinHeight !== "undefined" && d < this.MinHeight)
          d = this.MinHeight;
        ng_SetStyleHeight(a, d);
        ng_SetStyleHeight(b, d);
      }
      b = false;
      if (
        typeof this.Bounds.T === "undefined" ||
        typeof this.Bounds.B === "undefined"
      ) {
        d = ng_StyleHeight(a);
        if (this.Bounds.H != d) {
          this.Bounds.H = d;
          b = true;
        }
      }
      if (
        typeof this.Bounds.L === "undefined" ||
        typeof this.Bounds.R === "undefined"
      ) {
        a = ng_StyleWidth(a);
        if (this.Bounds.W != a) {
          this.Bounds.W = a;
          b = true;
        }
      }
      b && this.SetBounds();
    }
  return true;
}
function ngt_DoPtrStart(a) {
  if (this.CanSelect && a.EventID == "control") {
    a.PreventDefault = false;
    a.DocumentDeselect = false;
    a.PreventSelect = false;
  } else a.StopPropagation = false;
}
function ngt_DoAcceptGestures(a, b) {
  b.touch = true;
}
function ngText(a) {
  ngControl(this, a, "ngText");
  this.DoCreate = ngt_DoCreate;
  this.DoUpdate = ngt_DoUpdate;
  this.DoPtrStart = ngt_DoPtrStart;
  this.DoAcceptGestures = ngt_DoAcceptGestures;
  this.TextAlign = "left";
  this.AutoSize = false;
  this.AutoSizeMode = "auto";
  this.Alt = this.Text = "";
  this.HTMLEncode = false;
  this.CanSelect = true;
  this.SetText = ngc_SetText;
  this.GetText = ngc_GetText;
  this.GetAlt = ngc_GetAlt;
  this.OnGetAlt = this.OnGetText = this.OnSetText = null;
  ngControlCreated(this);
}
function ngi_DoCreate(a) {
  if (
    (typeof a.Data === "undefined" || typeof a.Data.AutoSize === "undefined") &&
    (typeof a.W !== "undefined" ||
      (typeof a.L !== "undefined" && typeof a.R !== "undefined")) &&
    (typeof a.H !== "undefined" ||
      (typeof a.T !== "undefined" && typeof a.B !== "undefined"))
  )
    this.AutoSize = false;
}
function ngi_DoUpdate(a) {
  var b = this.GetAlt(),
    d = this.GetImg(),
    e = new ngStringBuilder();
  if (d) {
    var f = ngc_ImgProps(this.ID + "_I", 0, this.Enabled, d);
    if (typeof f.W === "undefined") {
      ngc_ImgSW(
        e,
        f,
        0,
        ng_ClientWidth(a),
        "position:absolute;",
        (b != "" ? 'title="' + ng_htmlEncode(b) + '"' : "") + ngVal(d.Attrs, "")
      );
      if (this.AutoSize) {
        ng_SetClientHeight(a, f.H);
        b = ng_StyleHeight(a);
        if (this.Bounds.H != b) {
          this.Bounds.H = b;
          this.SetBounds();
        }
      }
    } else if (typeof f.H === "undefined") {
      ngc_ImgSH(
        e,
        f,
        0,
        ng_ClientHeight(a),
        "position:absolute;",
        (b != "" ? 'title="' + ng_htmlEncode(b) + '"' : "") + ngVal(d.Attrs, "")
      );
      if (this.AutoSize) {
        ng_SetClientWidth(a, f.W);
        d = ng_StyleWidth(a);
        if (this.Bounds.W != d) {
          this.Bounds.W = d;
          this.SetBounds();
        }
      }
    } else {
      ngc_Img(
        e,
        f,
        "position:absolute;",
        (b != "" ? 'title="' + ng_htmlEncode(b) + '"' : "") + ngVal(d.Attrs, "")
      );
      if (this.AutoSize) {
        ng_SetClientWidth(a, f.W);
        ng_SetClientHeight(a, f.H);
        d = ng_StyleWidth(a);
        b = ng_StyleHeight(a);
        if (this.Bounds.W != d || this.Bounds.H != b) {
          this.Bounds.W = d;
          this.Bounds.H = b;
          this.SetBounds();
        }
      }
    }
  }
  ng_SetInnerHTML(a, e.toString());
  return true;
}
function ngImage(a) {
  ngControl(this, a, "ngImage");
  this.DoCreate = ngi_DoCreate;
  this.DoUpdate = ngi_DoUpdate;
  this.Alt = "";
  this.Img = null;
  this.AutoSize = true;
  this.GetAlt = ngc_GetAlt;
  this.GetImg = ngc_GetImg;
  this.OnGetImg = this.OnGetAlt = null;
  ngControlCreated(this);
}
function ngimgmap_DoCreate(a) {
  if (
    (typeof a.W !== "undefined" ||
      (typeof a.L !== "undefined" && typeof a.R !== "undefined")) &&
    a.Data &&
    typeof a.Data.AutoSize === "undefined"
  )
    this.AutoSize = false;
}
function imgm_DoPtrStart(a) {
  var b = a.EventID;
  if (b.substr(0, 3) === "shp") {
    if (!a.IsInSrcElement())
      a.SrcElement = document.getElementById(this.ID + "_HM");
    if (a.Touch) {
      b = parseInt(b.substring(3, b.length));
      imgm_EnterShape(this, b);
      a.InShapeElm = true;
    }
  }
}
function imgm_DoPtrDrag(a) {
  var b = a.EventID;
  if (b.substr(0, 3) === "shp") {
    if (a.Touch) {
      b = parseInt(b.substring(3, b.length));
      var d = a.IsInSrcElement();
      if (d && !a.InShapeElm) {
        imgm_EnterShape(this, b);
        a.InShapeElm = true;
      } else if (!d && a.InShapeElm) {
        imgm_LeaveShape(this, b);
        a.InShapeElm = false;
      }
    }
    return true;
  }
  return false;
}
function imgm_DoPtrEnd(a) {
  var b = a.EventID;
  if (b.substr(0, 3) === "shp") {
    if (a.Touch && a.InShapeElm) {
      b = parseInt(b.substring(3, b.length));
      imgm_LeaveShape(this, b);
    }
    delete a.InShapeElm;
  }
}
function imgm_DoPtrClick(a) {
  var b = a.EventID;
  if (b.substr(0, 3) === "shp")
    if (!(a.EndTime - a.StartTime >= 200 && !a.IsInSrcElement())) {
      b = parseInt(b.substring(3, b.length));
      a = a.Event;
      a.Owner = this;
      a.imap = this;
      a.imapshpidx = b;
      if (b >= 0 && b < this.Shapes.length) {
        b = ngVal(this.Shapes[b], null);
        ((a.imapshp = b) && b.OnClick && !ngVal(b.OnClick(a), false)) ||
          (this.OnShapeClick && this.OnShapeClick(a));
      }
    }
}
function imgm_LeaveShape(a, b) {
  if (b >= 0 && b < a.Shapes.length) {
    var d = ngVal(a.Shapes[b], null);
    ngc_ChangeImg(a.ID + "_I", 0, a.Enabled, a.GetImg());
    var e = a.Elm();
    try {
      if (e) e.style.cursor = ngVal(a.Cursor, "default");
    } catch (f) {}
    (d && d.OnMouseLeave && !ngVal(d.OnMouseLeave(d, a, b), false)) ||
      (a.OnMouseShapeLeave && a.OnMouseShapeLeave(a, b));
  }
}
function imgm_EnterShape(a, b) {
  if (b >= 0 && b < a.Shapes.length) {
    var d = ngVal(a.Shapes[b], null),
      e = d ? ngVal(d.Img, null) : null;
    ngc_ChangeImg(a.ID + "_I", 0, a.Enabled, e);
    e = (a.OnShapeClick || (d && d.OnClick)) && a.Enabled;
    var f = a.Elm();
    try {
      if (f)
        f.style.cursor = d && d.Cursor ? d.Cursor : e ? "pointer" : "default";
    } catch (g) {}
    (d && d.OnMouseEnter && !ngVal(d.OnMouseEnter(d, a, b), false)) ||
      (a.OnMouseShapeEnter && a.OnMouseShapeEnter(a, b));
  }
}
function imgm_MO(a, b, d, e) {
  if (!a) a = windows.event;
  if (!(ngUsingTouch && a && a.type.toLowerCase().match(/mouse/)))
    (a = ngGetControlById(d)) && imgm_EnterShape(a, e);
}
function imgm_MU(a, b, d, e) {
  if (!a) a = windows.event;
  if (!(ngUsingTouch && a && a.type.toLowerCase().match(/mouse/)))
    (a = ngGetControlById(d)) && imgm_LeaveShape(a, e);
}
function imgm_nop() {}
function ngimgmap_DoMouseEnter() {
  ngc_EnterImg(this.ID + "_I");
  this.OnMouseEnter && this.OnMouseEnter(this);
}
function ngimgmap_DoMouseLeave() {
  this.OnMouseLeave && this.OnMouseLeave(this);
  ngc_LeaveImg(this.ID + "_I");
  var a = this.Elm();
  try {
    if (a) a.style.cursor = ngVal(this.Cursor, "default");
  } catch (b) {}
}
function ngimgmap_DoUpdate(a) {
  var b,
    d = this.GetAlt();
  b = this.GetImg();
  var e = new ngStringBuilder();
  if (b) {
    var f = ngc_ImgProps(this.ID + "_I", 0, this.Enabled, b);
    ngc_Img(
      e,
      f,
      "position:absolute;",
      (d != "" ? 'title="' + ng_htmlEncode(d) + '"' : "") + ngVal(b.Attrs, "")
    );
    if (this.AutoSize) {
      ng_SetClientWidth(a, f.W);
      ng_SetClientHeight(a, f.H);
      b = ng_StyleWidth(a);
      f = ng_StyleHeight(a);
      if (this.Bounds.W != b || this.Bounds.H != f) {
        this.Bounds.W = b;
        this.Bounds.H = f;
        this.SetBounds();
      }
    }
  }
  f = ng_ClientWidth(a);
  for (
    var g = ng_ClientHeight(a), j = new ngStringBuilder(), k = 0;
    k < this.Shapes.length;
    k++
  ) {
    var n = this.Shapes[k];
    if (ngVal(n.Coords, "") != "") {
      b = this.OnGetShapeAlt
        ? ngVal(this.OnGetShapeAlt(this, k), "")
        : ngVal(n.Alt, "");
      var o = (this.OnShapeClick || n.OnClick) && this.Enabled;
      j.append(
        '<area shape="' +
          ngVal(n.Shape, "rect") +
          '" coords="' +
          n.Coords +
          '" title="' +
          ng_htmlEncode(b) +
          '"'
      );
      o && j.append(" " + ngc_PtrEventsHTML(this, "shp" + k, "tap drag"));
      j.append(
        " onmouseover=\"imgm_MO(event,this,'" +
          this.ID +
          "'," +
          k +
          ');" onmouseout="imgm_MU(event,this,\'' +
          this.ID +
          "'," +
          k +
          ')" />'
      );
    }
  }
  if (!j.empty()) {
    ngFireFox1x &&
      j.append(
        '<area href="javascript:imgm_nop();" shape="rect" coords="0,0,' +
          f +
          "," +
          g +
          '" />'
      );
    e.append(
      '<img id="' +
        this.ID +
        '_HM" src="' +
        ngEmptyURL +
        '" style="position:absolute; width:' +
        f +
        "px; height:" +
        g +
        'px; z-index: 10;" alt="' +
        ng_htmlEncode(d) +
        '" border="0" usemap="#' +
        this.ID +
        '_IMAP" />'
    );
    e.append('<map id="' + this.ID + '_IM" name="' + this.ID + '_IMAP">');
    e.append(j);
    e.append("</map>");
  }
  ng_SetInnerHTML(a, e.toString());
  return true;
}
function ngImageMap(a) {
  ngControl(this, a, "ngImageMap");
  this.DoCreate = ngimgmap_DoCreate;
  this.DoUpdate = ngimgmap_DoUpdate;
  this.DoMouseEnter = ngimgmap_DoMouseEnter;
  this.DoMouseLeave = ngimgmap_DoMouseLeave;
  this.DoPtrStart = imgm_DoPtrStart;
  this.DoPtrDrag = imgm_DoPtrDrag;
  this.DoPtrEnd = imgm_DoPtrEnd;
  this.DoPtrClick = imgm_DoPtrClick;
  this.Alt = "";
  this.Img = null;
  this.AutoSize = true;
  this.Shapes = [];
  this.GetAlt = ngc_GetAlt;
  this.GetImg = ngc_GetImg;
  this.OnMouseShapeLeave = this.OnMouseShapeEnter = this.OnMouseLeave = this.OnMouseEnter = this.OnShapeClick = this.OnGetShapeAlt = this.OnGetImg = this.OnGetAlt = null;
  ngControlCreated(this);
}
var ngact_RadioGroups = [];
function ngact_CheckRadioGroup() {
  var a = ngVal(this.Checked, 0);
  if (
    typeof this.RadioGroup !== "undefined" &&
    a &&
    ngact_RadioGroups[this.RadioGroup] != this
  ) {
    a = ngact_RadioGroups[this.RadioGroup];
    ngact_RadioGroups[this.RadioGroup] = this;
    a && typeof a.Check === "function" && a.Check(0);
  }
}
function ngact_Check(a) {
  a = ngVal(a, 1);
  if (ngVal(this.Checked, 0) != a) {
    this.Checked = a;
    this.OnCheckChanged && this.OnCheckChanged(this);
    if (this.Checked == a) {
      var b = this.ActionControls;
      if (b) {
        var d;
        this.in_action_check = true;
        for (var e = 0; e < b.length; e++) {
          d = b[e];
          d.Control.ActionCheck && d.Control.ActionCheck(a, d.Data);
        }
        this.in_action_check = false;
      }
    }
  }
}
function ngact_Click(a) {
  if (typeof a === "undefined") a = {};
  a.Owner = this;
  a.action = this;
  if (this.Enabled)
    if (!(this.OnClick && !ngVal(this.OnClick(a), false))) {
      var b = this.ActionControls;
      if (b) {
        var d;
        this.in_action_click = true;
        for (var e = 0; e < b.length; e++) {
          d = b[e];
          d.Control.ActionClick && d.Control.ActionClick(a, d.Data);
        }
        this.in_action_click = false;
      }
    }
}
function ngact_AddControl(a, b) {
  if (a) {
    b = ngVal(b, null);
    if (!this.ActionControls) this.ActionControls = [];
    var d = this.ActionControls;
    if (d) {
      for (var e, f = 0; f < d.length; f++) {
        e = d[f];
        if (e.Control == a && e.Data == b) return;
      }
      d[d.length] = { Control: a, Data: b };
    }
  }
}
function ngact_RemoveControl(a, b) {
  if (a && this.ActionControls) {
    b = ngVal(b, null);
    var d = this.ActionControls;
    if (d) {
      for (var e, f = d.length - 1; f >= 0; f--) {
        e = d[f];
        e.Control == a && e.Data == b && d.splice(f, 1);
      }
      if (!d.length) this.ActionControls = null;
    }
  }
}
function ngact_SetVisible(a) {
  a = ngVal(a, true);
  if (this.Visible != a)
    if (!(this.OnSetVisible && !ngVal(this.OnSetVisible(this, a), false))) {
      this.Visible = a;
      this.OnVisibleChanged && this.OnVisibleChanged(this);
      if (this.Visible == a) {
        var b = this.ActionControls;
        if (b) {
          var d;
          this.in_action_visible = true;
          for (var e = 0; e < b.length; e++) {
            d = b[e];
            d.Control.ActionSetVisible && d.Control.ActionSetVisible(a, d.Data);
          }
          this.in_action_visible = false;
        }
      }
    }
}
function ngact_Update() {
  if (!(this.OnUpdate && !ngVal(this.OnUpdate(this), false))) {
    var a = this.ActionControls;
    if (a)
      for (var b, d = 0; d < a.length; d++) {
        b = a[d];
        b.Control.ActionUpdate && b.Control.ActionUpdate(b.Data);
      }
    this.OnUpdated && this.OnUpdated(this, null);
  }
}
function ngSysAction(a, b) {
  ngSysControl(this, a, "ngSysAction");
  this.Text = ngVal(b, "");
  this.Alt = "";
  this.Visible = true;
  this.ActionControls = null;
  this.Check = ngact_Check;
  this.Click = ngact_Click;
  this.SetText = ngc_SetText;
  this.Update = ngact_Update;
  this.GetImg = ngc_GetImg;
  this.GetText = ngc_GetText;
  this.GetAlt = ngc_GetAlt;
  this.SetVisible = ngact_SetVisible;
  this.AddControl = ngact_AddControl;
  this.RemoveControl = ngact_RemoveControl;
  this.CheckRadioGroup = ngact_CheckRadioGroup;
  this.in_action_visible = this.in_action_click = this.in_action_check = false;
  this.OnUpdate = this.OnVisibleChanged = this.OnSetVisible = this.OnGetImg = this.OnClick = this.OnCheckChanged = this.OnGetAlt = this.OnGetText = this.OnSetText = null;
  ngControlCreated(this);
}
var ngb_RadioGroups = [];
function ngb_SimpleRect(a) {
  var b = {};
  if (a.AutoSize) {
    var d;
    b.W = 0;
    b.H = 0;
    for (var e = -1; e < 3; e++)
      if ((d = a.GetImg(e))) {
        if (e != 1) b.W += d.W;
        if (d.H > b.H) b.H = d.H;
      }
  } else {
    b.W = a.Bounds.W;
    b.H = a.Bounds.H;
  }
  return b;
}
function ngb_GetClassName(a) {
  if (this.OnGetClassName) {
    var b = this.GetText();
    b = this.OnGetClassName(this, a, b);
    if (ngVal(b, "") != "") a = b;
  }
  if (this.Enabled)
    switch (this.Checked) {
      case true:
      case 1:
        a += "Checked";
        break;
      case 2:
        a += "Grayed";
        break;
    }
  else a += "Disabled";
  return this.BaseClassName + a;
}
function ngb_Check(a) {
  var b = this.GetAction();
  if (b && !b.in_action_check) b.Check(a);
  else {
    a = ngVal(a, 1);
    if (ngVal(this.Checked, 0) != a) {
      this.Checked = a;
      this.OnCheckChanged && this.OnCheckChanged(this);
      this.Checked == a && this.Update();
    }
  }
}
function ngb_Click(a) {
  var b = this.GetAction();
  if (b && !b.in_action_click) b.Click(a);
  else {
    if (typeof a === "undefined") a = {};
    a.Owner = this;
    a.btn = this;
    !this.Enabled ||
      ngVal(this.ReadOnly, false) ||
      (this.OnClick && ngVal(this.OnClick(a), false));
  }
}
function ngb_GetClickInfo(a, b) {
  a.Owner = ngGetControlByElement(b, "ngButton");
  a.btn = a.Owner;
  a.btnObj = b;
}
function ngb_GetImg(a) {
  var b = null;
  if (this.OnGetImg) b = this.OnGetImg(this, a);
  else
    switch (a) {
      case -1:
        b = this.Img;
        break;
      case 0:
        b = this.LeftImg;
        break;
      case 1:
        b = this.MiddleImg;
        break;
      case 2:
        b = this.RightImg;
        break;
    }
  return ngVal(b, null);
}
function ngb_DoCreate(a) {
  if (
    (typeof a.W !== "undefined" ||
      (typeof a.L !== "undefined" && typeof a.R !== "undefined")) &&
    a.Data &&
    typeof a.Data.AutoSize === "undefined"
  )
    this.AutoSize = false;
}
function ngb_SetAction(a) {
  if (typeof a === "string") {
    a = ngGetControlById(a);
    if (!a) return null;
  }
  a = ngVal(a, null);
  var b = ngVal(this.Action, null);
  if (b == a) return a;
  b && b.RemoveControl && b.RemoveControl(this);
  (this.Action = a) && a.AddControl && a.AddControl(this);
  this.SyncAction();
  this.Update();
  return a;
}
function ngb_GetAction() {
  var a = ngVal(this.Action, null);
  if (typeof a === "string") a = this.SetAction(a);
  return a;
}
function ngb_SyncAction(a) {
  if (typeof a === "undefined") a = this.GetAction();
  if (a) {
    this.Visible = a.Visible;
    this.Enabled = a.Enabled;
    this.Checked = a.Checked;
    this.Img = a.GetImg();
    this.Text = a.GetText();
    this.Alt = a.GetAlt();
  }
}
function ngb_DoUpdate(a) {
  var b = this.GetAction();
  this.SyncAction(b);
  var d = this.BaseClassName,
    e = ngVal(this.Checked, 0);
  if (b) b.CheckRadioGroup();
  else if (
    typeof this.RadioGroup !== "undefined" &&
    e &&
    ngb_RadioGroups[this.RadioGroup] != this
  ) {
    var f = ngb_RadioGroups[this.RadioGroup];
    ngb_RadioGroups[this.RadioGroup] = this;
    f && typeof f.Check == "function" && f.Check(0);
  }
  var g = new ngStringBuilder(),
    j,
    k,
    n;
  if (ngIExplorer && ng_GetStylePx(a.style.height) == 0) a.style.height = "1px";
  var o = ng_ClientWidth(a),
    t = -1,
    q = 0,
    u = 0,
    x = (f = 0),
    w = 0,
    y = this.GetText(),
    z = this.GetAlt();
  if (this.HTMLEncode) y = ng_htmlEncode(y);
  var B = this.GetImg(-1);
  if (B) {
    n = ngc_ImgProps(this.ID + "_I", e, this.Enabled, B);
    if (n.H > f) f = n.H;
  }
  var C = this.GetClassName("Btn");
  if (y != "") {
    ng_SetInnerHTML(
      a,
      '<div id="' +
        this.ID +
        '_T" class="' +
        C +
        '" style="position:absolute; visibility: hidden; white-space: nowrap;"><div class="' +
        d +
        'Text">' +
        y +
        "</div></div>"
    );
    var A = document.getElementById(this.ID + "_T");
    if (A) {
      ng_BeginMeasureElement(A);
      u = ng_ClientWidth(A);
      q = ng_OuterWidth(A);
      j = ng_OuterHeight(A);
      ng_EndMeasureElement(A);
      if (j > f) f = j;
    }
  }
  if (this.AutoSize) {
    t = q;
    if (B) t += this.ImgIndent + n.W;
  }
  A = null;
  if ((j = this.GetImg(0))) {
    A || (A = new ngStringBuilder());
    k = ngc_ImgProps(this.ID + "_IL", e, this.Enabled, j);
    ngc_Img(A, k, "position:absolute; left: 0px;", ngVal(j.Attrs, ""));
    x = k.W;
    if (k.H > f) f = k.H;
  }
  if ((j = this.GetImg(2))) {
    A || (A = new ngStringBuilder());
    k = ngc_ImgProps(this.ID + "_IR", e, this.Enabled, j);
    w = k.W;
  }
  o = t >= 0 ? t + x + w : o;
  if (typeof this.MinWidth !== "undefined" && o < this.MinWidth) {
    o = this.MinWidth;
    if (t >= 0) t = o - x - w;
  }
  if (j) {
    ngc_Img(
      A,
      k,
      "position:absolute; left: " + (t >= 0 ? x + t : o - w) + "px;",
      ngVal(j.Attrs, "")
    );
    if (k.H > f) f = k.H;
  }
  if ((j = this.GetImg(1))) {
    A || (A = new ngStringBuilder());
    k = ngc_ImgProps(this.ID + "_IM", e, this.Enabled, j);
    ngc_ImgSW(A, k, x, t >= 0 ? t : o - x - w, "", ngVal(j.Attrs, ""));
    if (k.H > f) f = k.H;
  }
  b = this.Enabled && (b ? b.OnClick || this.OnClick : this.OnClick);
  e = this.OnDblClick && this.Enabled;
  k = "";
  if (b) k = "tap";
  if (e) {
    if (k != "") k += " ";
    k += "doubletap";
  }
  g.append(
    "<span " +
      ngc_PtrEventsHTML(this, "btn", k) +
      (z != "" ? ' title="' + ng_htmlEncode(z) + '"' : "") +
      ' style="position:absolute; left:0px;top:0px;width:' +
      o +
      "px;height:" +
      f +
      "px;"
  );
  if (typeof this.Cursor !== "undefined")
    this.Cursor != "" && g.append("cursor:" + this.Cursor + ";");
  else g.append(b || e ? "cursor:pointer;" : "cursor:default;");
  g.append('">');
  if (B) {
    z = 0;
    switch (this.TextAlign) {
      case "right":
        if (this.ImgAlign == "right") {
          z = o - w - q - n.W - this.ImgIndent;
          B = o - w - n.W;
        } else {
          B = o - w - q - n.W - this.ImgIndent;
          z = o - w - q;
        }
        break;
      case "center":
        z = Math.round((o - (q + this.ImgIndent + n.W)) / 2);
        if (this.ImgAlign == "right") B = z + q + this.ImgIndent;
        else {
          B = z;
          z += this.ImgIndent + n.W;
        }
        break;
      default:
        if (this.ImgAlign == "right") {
          z = x;
          B = x + q + this.ImgIndent;
        } else {
          B = x;
          z = x + n.W + this.ImgIndent;
        }
        break;
    }
    g.append(
      '<span id="' +
        this.ID +
        '_T" class="' +
        C +
        '" style="white-space: nowrap;position: absolute; z-index:1;left:' +
        z +
        "px;top:0px;width:" +
        (t - (q - u) - n.W - this.ImgIndent) +
        "px;" +
        (f > 0 ? "line-height: " + f + "px;" : "") +
        '"><div class="' +
        d +
        'Text">' +
        y +
        "</div></span>"
    );
    ngc_Img(
      g,
      n,
      "position:absolute;z-index:1;left: " +
        B +
        "px;top:" +
        Math.round((f - n.H) / 2) +
        "px;",
      ""
    );
  } else
    g.append(
      '<span id="' +
        this.ID +
        '_T" class="' +
        C +
        '" style="white-space: nowrap;text-align:' +
        this.TextAlign +
        ";position: absolute; z-index:1;left:0px;top:0px;width:" +
        (o - (q - u)) +
        "px;" +
        (f > 0 ? "line-height: " + f + "px;" : "") +
        '"><div class="' +
        d +
        'Text">' +
        y +
        "</div></span>"
    );
  if (A) {
    g.append('<span style="position: absolute;z-index:0;left:0px;">');
    g.append(A);
    g.append("</span>");
  }
  g.append("</span>");
  ng_SetInnerHTML(a, g.toString());
  d = this.Bounds.W;
  if (this.AutoSize)
    if (ng_ClientWidth(a) != o) {
      ng_SetClientWidth(a, o);
      d = ng_StyleWidth(a);
    }
  ng_SetClientHeight(a, f);
  a = ng_StyleHeight(a);
  if (d != this.Bounds.W || a != this.Bounds.H) {
    this.Bounds.W = d;
    this.Bounds.H = a;
    this.SetBounds();
  }
  return true;
}
function ngb_DoMouseEnter() {
  var a = document.getElementById(this.ID + "_T");
  if (a) {
    var b = a.className;
    if (b.indexOf("_Focus") < 0) b += "_Focus";
    a.className = b;
  }
  ngc_EnterImg(this.ID + "_I");
  ngc_EnterImg(this.ID + "_IL");
  ngc_EnterImgS(this.ID + "_IM");
  ngc_EnterImg(this.ID + "_IR");
  this.OnMouseEnter && this.OnMouseEnter(this);
}
function ngb_DoMouseLeave() {
  this.OnMouseLeave && this.OnMouseLeave(this);
  var a = document.getElementById(this.ID + "_T");
  if (a) {
    var b = a.className,
      d = b.indexOf("_Focus");
    if (d >= 0) b = b.substring(0, d);
    a.className = b;
  }
  ngc_LeaveImg(this.ID + "_I");
  ngc_LeaveImg(this.ID + "_IL");
  ngc_LeaveImgS(this.ID + "_IM");
  ngc_LeaveImg(this.ID + "_IR");
}
function ngb_DoPtrClick(a) {
  if (a.EventID === "btn") {
    ngb_GetClickInfo(a.Event, a.StartElement);
    this.Click(a.Event);
  }
}
function ngb_DoPtrDblClick(a) {
  if (a.EventID === "btn") {
    ngb_GetClickInfo(a.Event, a.StartElement);
    this.OnDblClick && this.OnDblClick(a.Event);
  }
}
function ngb_SetText(a) {
  var b = this.GetAction();
  if (b) b.SetText(a);
  else {
    if (this.OnSetText) a = this.OnSetText(a, this);
    if (a != this.Text) {
      this.Text = a;
      this.Update();
    }
  }
}
function ngb_SetVisible(a) {
  var b = this.GetAction();
  b && !b.in_action_visible ? b.SetVisible(a) : this.DefaultSetVisible(a);
}
function ngb_SetEnabled(a) {
  var b = this.GetAction();
  b ? b.SetEnabled(a) : this.DefaultSetEnabled(a);
}
function ngButton(a, b) {
  ngControl(this, a, "ngButton");
  this.Action = null;
  this.Text = ngVal(b, "");
  this.TextAlign = "center";
  this.Alt = "";
  this.HTMLEncode = false;
  this.AutoSize = true;
  this.Checked = 0;
  this.DoMouseEnter = ngb_DoMouseEnter;
  this.DoMouseLeave = ngb_DoMouseLeave;
  this.DoPtrClick = ngb_DoPtrClick;
  this.DoPtrDblClick = ngb_DoPtrDblClick;
  this.Img = null;
  this.ImgAlign = "left";
  this.ImgIndent = 0;
  this.RightImg = this.MiddleImg = this.LeftImg = null;
  this.Check = ngb_Check;
  this.Click = ngb_Click;
  this.SetText = ngb_SetText;
  this.GetText = ngc_GetText;
  this.GetAlt = ngc_GetAlt;
  this.GetImg = ngb_GetImg;
  this.GetClassName = ngb_GetClassName;
  this.DoCreate = ngb_DoCreate;
  this.DoUpdate = ngb_DoUpdate;
  this.DefaultSetVisible = this.SetVisible;
  this.SetVisible = ngb_SetVisible;
  this.DefaultSetEnabled = this.SetEnabled;
  this.SetEnabled = ngb_SetEnabled;
  this.GetAction = ngb_GetAction;
  this.SetAction = ngb_SetAction;
  this.SyncAction = ngb_SyncAction;
  this.ActionSetVisible = this.SetVisible;
  this.ActionCheck = this.Check;
  this.ActionClick = this.Click;
  this.ActionUpdate = this.Update;
  this.OnGetClassName = this.OnGetImg = this.OnMouseLeave = this.OnMouseEnter = this.OnClick = this.OnDblClick = this.OnCheckChanged = this.OnGetAlt = this.OnGetText = this.OnSetText = null;
  ngControlCreated(this);
}
function ngRadioCheckBox_Create(a, b, d) {
  b = ngCreateControlAsType(a, "ngButton", b, d);
  if (!b) return b;
  b.OnClick = function(e) {
    e = e.Owner;
    if (!(!e || e.Action))
      if (typeof e.RadioGroup !== "undefined") e.Check(1);
      else {
        var f = ngVal(e.Checked, 0);
        switch (f) {
          case 0:
          case false:
            f = ngVal(e.AllowGrayed, false) ? 2 : 1;
            break;
          case 1:
          case true:
            f = 0;
            break;
          default:
            f = 1;
            break;
        }
        e.Check(f);
      }
  };
  if (typeof b.ReadOnly === "undefined") b.ReadOnly = false;
  if (typeof b.AllowGrayed === "undefined") b.AllowGrayed = false;
  if (a.Type == "ngRadioButton" && typeof b.RadioGroup === "undefined")
    b.RadioGroup = "default";
  return b;
}
function ngg_DoUpdate(a) {
  var b = this.BaseClassName,
    d = document.getElementById(this.ID + "_F");
  if (!d) return true;
  var e = new ngStringBuilder(),
    f = ng_ClientWidth(a);
  a = ng_ClientHeight(a);
  var g = this.GetText();
  if (this.HTMLEncode) g = ng_htmlEncode(g);
  var j = {};
  ngc_ImgBox(
    e,
    this.ID,
    "ngGroup",
    0,
    this.Enabled,
    0,
    0,
    f,
    a,
    false,
    this.Frame,
    "",
    "",
    undefined,
    j
  );
  if (this.ControlsInside) {
    this.ControlsPanel.Bounds.T = j.Top.H;
    this.ControlsPanel.Bounds.L = j.Left.W;
    this.ControlsPanel.Bounds.R = j.Right.W;
    this.ControlsPanel.Bounds.B = j.Bottom.H;
  } else {
    this.ControlsPanel.Bounds.T = 0;
    this.ControlsPanel.Bounds.L = 0;
    this.ControlsPanel.Bounds.R = 0;
    this.ControlsPanel.Bounds.B = 0;
  }
  this.ControlsPanel.SetBounds();
  if (g != "")
    e.append(
      '<div id="' +
        this.ID +
        '_C" class="' +
        b +
        (this.Enabled ? "Caption" : "CaptionDisabled") +
        '" style="position: absolute; left: 0px;top: 0px;">' +
        g +
        "</div>"
    );
  ng_SetInnerHTML(d, e.toString());
  return true;
}
function ngg_SetClientRect(a) {
  if (ngVal(a, false)) {
    var b = { L: 0, T: 0, aL: 0, aT: 0, oT: 0, oL: 0, W: 0, H: 0 },
      d = {};
    if (typeof a.W !== "undefined") {
      d.Left =
        !this.ControlsInside || typeof this.Frame.Left == "undefined"
          ? b
          : ngc_ImgProps(this.ID + "_L", 0, this.Enabled, this.Frame.Left);
      d.Right =
        !this.ControlsInside || typeof this.Frame.Right == "undefined"
          ? b
          : ngc_ImgProps(this.ID + "_R", 0, this.Enabled, this.Frame.Right);
      this.Bounds.W = a.W + d.Left.W + d.Right.W;
      delete this.Bounds.R;
    }
    if (typeof a.H !== "undefined") {
      d.Top =
        !this.ControlsInside || typeof this.Frame.Top == "undefined"
          ? b
          : ngc_ImgProps(this.ID + "_B", 0, this.Enabled, this.Frame.Top);
      d.Bottom =
        !this.ControlsInside || typeof this.Frame.Bottom == "undefined"
          ? b
          : ngc_ImgProps(this.ID + "_B", 0, this.Enabled, this.Frame.Bottom);
      this.Bounds.H = a.H + d.Top.H + d.Bottom.H;
      delete this.Bounds.B;
    }
  }
}
function ngg_GetClientRect() {
  var a, b;
  if (ngVal(this.ControlsPanel, false)) {
    var d = this.ControlsPanel.Elm();
    if (d) {
      a = ng_ClientWidth(d);
      b = ng_ClientHeight(d);
    }
  }
  return { W: a, H: b };
}
function ngg_DoRelease(a) {
  a.style.display = "none";
  (a = document.getElementById(this.ID + "_F")) && ng_SetInnerHTML(a, "");
}
function ngg_DoCreate(a, b, d) {
  var e = this.BaseClassName;
  if (typeof a.CW !== "undefined" || typeof a.CH !== "undefined") {
    this.SetClientRect({ W: a.CW, H: a.CH });
    this.SetBounds();
  }
  var f = {};
  f.ControlsPanel =
    typeof a.ControlsPanel === "object" ? ng_CopyVar(a.ControlsPanel) : {};
  ng_MergeDef(f.ControlsPanel, {
    Type: "ngPanel",
    className: e + "ControlsPanel",
    id: this.ID + "_P",
    ScrollBars: ssAuto,
    L: 0,
    T: 0,
    R: 0,
    B: 0
  });
  f.ControlsPanel.Controls = a.Controls;
  f.ControlsPanel.ModifyControls = a.ModifyControls;
  e = ngCreateControls(f, undefined, this.ID);
  if (!ngVal(a.ParentReferences, true)) {
    this.Controls = {};
    this.Controls.Owner = this;
    this.Controls.AddControls = function(g, j) {
      ngCreateControls(g, this, ngVal(j, f.ControlsPanel.id));
    };
    b = this.Controls;
  }
  this.ControlsPanel = e.ControlsPanel;
  this.ControlsPanel.Owner = this;
  delete e.ControlsPanel;
  ngCloneRefs(b, e);
  delete a.Controls;
  delete a.ModifyControls;
  a = document.createElement("div");
  a.id = this.ID + "_F";
  a.style.position = "absolute";
  a.style.zIndex = "800";
  d.appendChild(a);
}
function ngGroup(a) {
  ngControl(this, a, "ngGroup");
  this.Text = "";
  this.HTMLEncode = false;
  this.Frame = {};
  this.ControlsInside = true;
  this.GetText = ngc_GetText;
  this.GetClientRect = ngg_GetClientRect;
  this.SetClientRect = ngg_SetClientRect;
  this.DoCreate = ngg_DoCreate;
  this.DoRelease = ngg_DoRelease;
  this.DoUpdate = ngg_DoUpdate;
  this.OnGetText = null;
  ngControlCreated(this);
}
var ngHintHideOnFocus = 0,
  ngHintHideOnInput = 1,
  ngDefaultHintStyle,
  ngeDropDownEdit = 0,
  ngeDropDownList = 1,
  KEY_BACK = 8,
  KEY_TAB = 9,
  KEY_RETURN = 13,
  KEY_SHIFT = 16,
  KEY_CONTROL = 17,
  KEY_MENU = 18,
  KEY_PAUSE = 19,
  KEY_CAPITAL = 20,
  KEY_ESC = 27,
  KEY_PRIOR = 33,
  KEY_NEXT = 34,
  KEY_HOME = 35,
  KEY_END = 36,
  KEY_LEFT = 37,
  KEY_UP = 38,
  KEY_RIGHT = 39,
  KEY_DOWN = 40,
  KEY_INSERT = 45,
  KEY_DELETE = 46,
  KEY_LWIN = 91,
  KEY_RWIN = 92,
  KEY_APPS = 93,
  KEY_NUMPAD0 = 96,
  KEY_NUMPAD1 = 97,
  KEY_NUMPAD2 = 98,
  KEY_NUMPAD3 = 99,
  KEY_NUMPAD4 = 100,
  KEY_NUMPAD5 = 101,
  KEY_NUMPAD6 = 102,
  KEY_NUMPAD7 = 103,
  KEY_NUMPAD8 = 104,
  KEY_NUMPAD9 = 105,
  KEY_MULTIPLY = 106,
  KEY_ADD = 107,
  KEY_SUBSTRACT = 109,
  KEY_DECIMAL = 110,
  KEY_DIVIDE = 111,
  KEY_F1 = 112,
  KEY_F2 = 113,
  KEY_F3 = 114,
  KEY_F4 = 115,
  KEY_F5 = 116,
  KEY_F6 = 117,
  KEY_F7 = 118,
  KEY_F8 = 119,
  KEY_F9 = 120,
  KEY_F10 = 121,
  KEY_F11 = 122,
  KEY_F12 = 123,
  KEY_NUMLOCK = 144,
  KEY_SCROLL = 145;
function nge_HintStyle(a) {
  if (ngAndroid && !ngChrome) return ngHintHideOnFocus;
  if (a) {
    if (a.Password) return ngHintHideOnFocus;
    if (a.MaxLength > 0 && ngWindowsPhone) return ngHintHideOnFocus;
    if (typeof a.HintStyle !== "undefined") return a.HintStyle;
  }
  if (typeof ngDefaultHintStyle !== "undefined") return ngDefaultHintStyle;
  return ngHintHideOnInput;
}
function nge_SuggestionResults(a, b, d) {
  if ((a = ngGetControlById(a)) && ngVal(a.Suggestion, false))
    if (b == a.GetText()) {
      var e = a.DropDownControl;
      if (e)
        if (
          !(a.OnSuggestionData && !ngVal(a.OnSuggestionData(a, b, d), false))
        ) {
          if (a.OnSuggestionResults) {
            var f = {};
            f.found = false;
            f.needupdate = false;
            if (!ngVal(a.OnSuggestionResults(a, b, d, f), false)) return;
            if (e.Visible && f.needupdate && f.found) {
              e.SetItemFocus(null);
              e.Update();
            }
            a.SuggestionFound = f.found;
          } else if (typeof d === "undefined" || d.length == 0)
            a.SuggestionFound = false;
          else {
            e.Clear();
            e.AddItems(d);
            if (e.Visible) {
              e.SetItemFocus(null);
              e.Update();
            }
            a.SuggestionFound = true;
          }
          if (a.SuggestionFound) {
            (e = a.DropDownControl) && e.SetItemFocus(null);
            a.DropDown();
          } else a.HideDropDown();
        }
    }
}
function nge_Suggestion(a) {
  var b = ngGetControlById(a);
  if (b && ngVal(b.Suggestion, false)) {
    b.SuggestionTimer && clearTimeout(b.SuggestionTimer);
    b.SuggestionTimer = null;
    var d = b.GetText();
    if (d == "") {
      b.HideDropDown();
      b.SuggestionLastSearch = "";
    } else if (ngVal(b.SuggestionLastSearch, "") != d) {
      if (b.OnSuggestionSearch) {
        a = {};
        a.found = false;
        a.needupdate = false;
        if (!ngVal(b.OnSuggestionSearch(b, d, a), false)) return;
        var e = b.DropDownControl;
        if (e && e.Visible && a.needupdate && a.found) {
          e.SetItemFocus(null);
          e.Update();
        }
        b.SuggestionFound = a.found;
        b.SuggestionLastSearch = d;
      } else {
        b.SuggestionLastSearch = d;
        a = ngVal(b.SuggestionURL, "");
        var f = ngVal(b.SuggestionIgnoreCase, true),
          g = ngVal(b.SuggestionPartial, 2);
        if (b.OnSuggestionURL) a = b.OnSuggestionURL(b, a);
        else if (a != "") {
          a = ng_AddURLParam(a, "S=" + ng_URLEncode(b.ID));
          if (typeof b.SuggestionType !== "undefined" && b.SuggestionType != "")
            a = ng_AddURLParam(a, "T=" + ng_URLEncode(b.SuggestionType));
          a = ng_AddURLParam(
            a,
            "Q=" + ng_URLEncode(d) + "&IC=" + (f ? "1" : "0") + "&P=" + g
          );
        }
        if (a != "") {
          if (!b.SuggestionRPC) b.SuggestionRPC = new ngRPC(b.ID);
          b.SuggestionRPC.sendRequest(a);
          return;
        } else {
          var j = false,
            k = false;
          if ((e = b.DropDownControl)) {
            if (f) d = d.toLowerCase();
            var n = "";
            if (e.Columns.length > 0)
              n = ngVal(b.SuggestionSearchColumn, e.Columns[0].ID);
            var o, t;
            if (b.OnSuggestionCompareItem) g = -1;
            else if (g == -1) g = 2;
            e.Scan(function(q, u, x, w) {
              o = e.Columns.length > 0 ? ngVal(u.Text[n], "") : u.Text;
              if (f) o = o.toLowerCase();
              switch (g) {
                case -1:
                  t = ngVal(b.OnSuggestionCompareItem(b, d, o, q, u, x), false);
                  break;
                case 1:
                  if (d.length > o.length) return false;
                  t = o.substring(0, d.length) == d;
                  break;
                case 2:
                  t = o.indexOf(d) >= 0;
                  break;
                default:
                  t = o == d;
                  break;
              }
              if (u.Visible != t) {
                u.Visible = t;
                k = true;
              }
              if (u.Visible) j = true;
              return true;
            });
            if (e.Visible && k && j) {
              e.SetItemFocus(null);
              e.Update();
            }
          }
          b.SuggestionFound = j;
        }
      }
      if (b.SuggestionFound) {
        (e = b.DropDownControl) && e.SetItemFocus(null);
        b.DropDown();
      } else b.HideDropDown();
    } else b.HideDropDown();
  }
}
function nge_SuggestionRefresh(a, b) {
  var d = this.DropDownControl;
  if (d) {
    this.SuggestionTimer && clearTimeout(this.SuggestionTimer);
    if (ngVal(a, false)) this.SuggestionLastSearch = "";
    if ((a = d.Elm()) && a.style.height != "") {
      a.style.display = "none";
      a.style.height = "";
    }
    if (typeof b === "undefined") b = ngVal(this.SuggestionDelay, 200);
    this.SuggestionTimer = setTimeout("nge_Suggestion('" + this.ID + "')", b);
  }
}
function nge_GetCaretPos() {
  var a = this.ControlHasFocus ? document.getElementById(this.ID + "_T") : null;
  if (a) {
    var b = 0;
    if (document.selection) {
      a.focus();
      b = document.selection.createRange();
      b.moveStart("character", -a.value.length);
      b = b.text.length;
    } else if (a.selectionStart || a.selectionStart == "0")
      b = a.selectionStart;
    return b;
  }
}
function nge_SetCaretPos(a) {
  var b = document.getElementById(this.ID + "_T");
  if (b)
    if (b.setSelectionRange) {
      b.focus();
      b.setSelectionRange(a, a);
    } else if (b.createTextRange) {
      b = b.createTextRange();
      b.collapse(true);
      b.moveEnd("character", a);
      b.moveStart("character", a);
      b.select();
    }
}
function nge_TextChanged(a, b, d) {
  if (typeof d === "undefined")
    d = ngGetControlById(b.id.substring(0, b.id.length - 2), "ngEdit");
  if (d) {
    a = b.value;
    if (!d.HintVisible && d.Text != a) {
      d.Text = a;
      d.OnTextChanged && d.OnTextChanged(d);
      b.className = d.GetClassName("Input");
    }
    if (
      (a == "" && (!d.HasFocus || nge_HintStyle(d) === ngHintHideOnInput)) ||
      d.HintVisible
    ) {
      a = d.GetHint();
      if (a != "") {
        nge_ShowHint(d, b, a);
        d.SetCaretPos(0);
      } else nge_HideHint(d, b);
    }
  }
}
function nge_KeyDown(a, b) {
  if (!a) a = window.event;
  if (
    (b = ngGetControlById(b.id.substring(0, b.id.length - 2), "ngEdit")) &&
    b.Enabled
  ) {
    a.Owner = b;
    if (b.OnKeyDown && !ngVal(b.OnKeyDown(a), false)) return false;
    if (b.HintVisible)
      switch (a.keyCode) {
        case 35:
        case 36:
        case 37:
        case 39:
        case 38:
        case 40:
        case 8:
        case 46:
        case 33:
        case 34:
          a.preventDefault && a.preventDefault();
          a.returnValue = false;
          break;
      }
    if (ngVal(b.Suggestion, false)) {
      b = b.DropDownControl;
      switch (a.keyCode) {
        case 33:
        case 34:
        case 38:
        case 40:
          if (b && b.Visible) {
            (b = b.Elm()) && b.onkeydown && b.onkeydown(a);
            break;
          }
          break;
        case 37:
        case 39:
          if (b && b.Visible) {
            var d = b.GetItemFocus();
            if (d && typeof d.Items !== "undefined" && d.Items.length > 0) {
              a.keyCode == 37 ? b.Collapse(d) : b.Expand(d);
              a.preventDefault && a.preventDefault();
              a.returnValue = false;
            }
          }
          break;
      }
    }
  }
}
function nge_DefFormButton2(a, b) {
  var d;
  a = a.ChildControls;
  if (typeof a !== "undefined") {
    for (var e = 0; e < a.length; e++)
      if (
        (d = a[e]) &&
        d.Click &&
        d.Enabled &&
        d.Visible &&
        ngVal(d.FormID, "") == ""
      )
        if ((b && ngVal(d.Default, false)) || (!b && ngVal(d.Cancel, false))) {
          var f = setTimeout(function() {
            clearTimeout(f);
            typeof d.Click === "function" && d.Click();
          }, 10);
          return true;
        }
    for (e = 0; e < a.length; e++) {
      d = a[e];
      if (ngVal(d.FormID, "") == "" && d.Visible && nge_DefFormButton2(d, b))
        return true;
    }
  }
  return false;
}
function nge_DefFormButton(a, b) {
  var d = a.ParentControl;
  if (d) {
    var e,
      f = d.ChildControls;
    if (typeof f !== "undefined")
      for (var g = 0; g < f.length; g++)
        if (
          (e = f[g]) &&
          e != a &&
          e.Click &&
          e.Enabled &&
          e.Visible &&
          ngVal(e.FormID, "") == ""
        )
          if (
            (b && ngVal(e.Default, false)) ||
            (!b && ngVal(e.Cancel, false))
          ) {
            var j = setTimeout(function() {
              clearTimeout(j);
              typeof e.Click === "function" && e.Click();
            }, 10);
            return true;
          }
    if (ngVal(d.FormID, "") == "" && nge_DefFormButton(d, b)) return true;
    if (typeof f !== "undefined")
      for (g = 0; g < f.length; g++)
        if (
          (e = f[g]) &&
          e != a &&
          e.Visible &&
          ngVal(e.FormID, "") == "" &&
          nge_DefFormButton2(e, b)
        )
          return true;
  }
  return false;
}
function nge_KeyPress(a, b) {
  if (!a) a = window.event;
  var d = ngGetControlById(b.id.substring(0, b.id.length - 2), "ngEdit");
  if (d && d.Enabled) {
    a.Owner = d;
    if (d.OnKeyPress && !ngVal(d.OnKeyPress(a, b), false)) return false;
  }
}
function nge_KeyUpHint(a, b, d) {
  if (a.HintVisible) {
    d = a.GetHint();
    if (d != "") {
      var e = b.value,
        f = 0,
        g,
        j;
      g = e.length - 1;
      for (j = d.length - 1; g >= 0 && j >= 0; g--, j--)
        if (e.charAt(g) != d.charAt(j)) break;
      if (g >= 0 || j >= 0) {
        if (j >= 0) {
          for (f = 0; f < g && f < d.length; f++)
            if (e.charAt(f) != d.charAt(f)) break;
          if (f === d.length) g = e.length - 1;
        }
        nge_HideHint(a, b, e.substr(f, g - f + 1));
      }
    } else nge_HideHint(a, b);
  }
}
function nge_KeyUp(a, b) {
  if (!a) a = window.event;
  var d = ngGetControlById(b.id.substring(0, b.id.length - 2), "ngEdit");
  if (d && d.Enabled) {
    a.Owner = d;
    nge_KeyUpHint(d, b, "Input");
    if (d.OnKeyUp && !ngVal(d.OnKeyUp(a, b), false)) return false;
    nge_TextChanged(a, b, d);
    if (ngVal(d.Suggestion, false)) {
      var e = d.DropDownControl;
      switch (a.keyCode) {
        case 35:
        case 36:
        case 37:
          break;
        case 9:
          if (!e) break;
        case 27:
          d.SuggestionTimer && clearTimeout(d.SuggestionTimer);
          d.SuggestionTimer = null;
          d.HideDropDown();
          break;
        case 39:
        case 13:
          if (e && e.Visible)
            if ((b = e.GetItemFocus())) {
              if (
                a.keyCode == 39 &&
                b &&
                typeof b.Items !== "undefined" &&
                b.Items.length > 0
              )
                break;
              e.SetItemFocus(null);
              d.SuggestionTimer && clearTimeout(d.SuggestionTimer);
              d.SuggestionTimer = null;
              e.SelectDropDownItem(b);
              d = null;
            }
          break;
        case 33:
        case 34:
        case 38:
        case 40:
          if (e && e.Visible) {
            (d = e.Elm()) && d.onkeyup && d.onkeyup(a);
            d = null;
            break;
          }
          if (a.keyCode != 40) break;
        default:
          if (b.value == "") {
            d.SuggestionTimer && clearTimeout(d.SuggestionTimer);
            d.SuggestionTimer = null;
            d.HideDropDown();
          } else d.SuggestionRefresh();
          if (a.keyCode == 40) d = null;
          break;
      }
    }
    a.keyCode == 40 && d && d.DropDown();
    if (a.keyCode == 13 && d) {
      e = false;
      if (d.Buttons) {
        var f;
        for (b = 0; b < d.Buttons.length; b++) {
          f = d.Buttons[b];
          if (ngVal(f.Default, false) && typeof f.Click === "function") {
            var g = setTimeout(function() {
              clearTimeout(g);
              typeof f.Click === "function" && f.Click(a);
            }, 10);
            e = true;
            break;
          }
        }
      }
      if (!e && nge_DefFormButton(d, 1)) e = true;
      if (
        !e &&
        d.Buttons &&
        d.Buttons.length > 0 &&
        typeof d.Buttons[0].Click === "function"
      ) {
        f = d.Buttons[0];
        g = setTimeout(function() {
          clearTimeout(g);
          typeof f.Click === "function" && f.Click(a);
        }, 10);
        e = true;
      }
      if (e) {
        d.SetFocus(false);
        if (a.stopPropagation) a.stopPropagation();
        else a.cancelBubble = true;
      }
    }
    if (a.keyCode == 27 && d) {
      e = false;
      if (d.Buttons)
        for (b = 0; b < d.Buttons.length; b++) {
          f = d.Buttons[b];
          if (ngVal(f.Cancel, false) && typeof f.Click === "function") {
            g = setTimeout(function() {
              clearTimeout(g);
              typeof f.Click === "function" && f.Click(a);
            }, 10);
            e = true;
            break;
          }
        }
      if (!e && nge_DefFormButton(d, 0)) e = true;
      if (e) {
        d.SetFocus(false);
        if (a.stopPropagation) a.stopPropagation();
        else a.cancelBubble = true;
      }
    }
  }
}
function nge_SetText(a) {
  if (this.OnSetText) a = this.OnSetText(a, this);
  if (a != this.Text) {
    this.Text = a;
    var b = document.getElementById(this.ID + "_T");
    if (b) {
      var d = false;
      if (a == "") {
        var e = this.GetHint();
        if (
          e != "" &&
          (!this.HasFocus || nge_HintStyle(this) === ngHintHideOnInput)
        ) {
          d = true;
          nge_ShowHint(this, b, e);
        } else b.value = a;
      } else b.value = a;
      this.HintVisible && !d && nge_HideHint(this, b);
    }
    this.OnTextChanged && this.OnTextChanged(this);
    if (b) b.className = this.GetClassName("Input", e);
  }
}
function nge_DoAcceptGestures(a, b) {
  b.tap = true;
}
function nge_DoGesture(a) {
  if (a.Owner === this && a.Gesture === "drag") if (this.HasFocus) return true;
  return false;
}
function nge_DoPtrStart(a) {
  if (a.EventID === "control")
    if (this.DropDownType == ngeDropDownList && this.DropDownControl) {
      a.CanFocus = false;
      a.PreventDefault = true;
      a.PreventSelect = true;
    } else a.PreventDefault = false;
}
function nge_DoPtrClick(a) {
  if (a.EventID === "control")
    if (this.DropDownType == ngeDropDownList && this.DropDownControl)
      this.DropDownControl.Visible ? this.HideDropDown() : this.DropDown();
    else
      this.HintVisible &&
        nge_HintStyle(this) === ngHintHideOnInput &&
        this.SetCaretPos(0);
}
function nge_DoUpdateImages() {
  var a,
    b = this.HasFocus ? 1 : 0;
  a = this.OnGetImg ? this.OnGetImg(this, 0) : this.LeftImg;
  ngc_ChangeImg(this.ID + "_IL", b, this.Enabled, a);
  a = this.OnGetImg ? this.OnGetImg(this, 2) : this.RightImg;
  ngc_ChangeImg(this.ID + "_IR", b, this.Enabled, a);
  a = this.OnGetImg ? this.OnGetImg(this, 1) : this.MiddleImg;
  ngc_ChangeImgS(this.ID + "_IM", b, this.Enabled, a);
}
var ngMobileKeyboardActive = 0;
function nge_BeginMobileKeyboard() {
  var a = typeof ngApp !== "undefined" && ngApp ? ngApp.Elm() : null;
  if (a && ngVal(ngApp.MobileKeyboardFix, true))
    if (ngMobileKeyboardActive === 2) ngMobileKeyboardActive = 1;
    else {
      ngMobileKeyboardActive = 1;
      ngApp.SavedAppHeight = a.style.height;
      ngApp.SavedAppBottom = a.style.bottom;
      ngApp.SavedAppMarginBottom = a.style.marginBottom;
      ngApp.MobileKeyboardTimer && clearTimeout(ngApp.MobileKeyboardTimer);
      ngApp.MobileKeyboardTimer = setTimeout(function() {
        delete ngApp.MobileKeyboardTimer;
        clearTimeout(ngApp.MobileKeyboardTimer);
        nge_EndMobileKeyboard();
      }, 3e3);
      ng_SetClientHeight(a, ng_ClientHeight(a));
      a.style.bottom = "";
      a.style.marginBottom = ng_WindowHeight();
    }
}
function nge_EndMobileKeyboard() {
  var a = typeof ngApp !== "undefined" && ngApp ? ngApp.Elm() : null;
  if (a && typeof ngApp.SavedAppHeight !== "undefined") {
    ngApp.MobileKeyboardTimer && clearTimeout(ngApp.MobileKeyboardTimer);
    delete ngApp.MobileKeyboardTimer;
    if (ngMobileKeyboardActive !== 2) {
      ngMobileKeyboardActive = 2;
      ngApp.InvokeLater(function() {
        if (ngMobileKeyboardActive === 2) {
          ngMobileKeyboardActive = 0;
          a.style.bottom = ngApp.SavedAppBottom;
          a.style.height = ngApp.SavedAppHeight;
          a.style.marginBottom = ngApp.SavedAppMarginBottom;
          delete ngApp.SavedAppBottom;
          delete ngApp.SavedAppHeight;
          delete ngApp.SavedAppMarginBottom;
        }
      });
    }
  }
}
function nge_DoFocus(a, b) {
  this.HasFocus = true;
  this.DoUpdateImages();
  nge_BeginMobileKeyboard();
  this.HintVisible && this.SetCaretPos(0);
  this.DropDownControl && this.DropDownControl.Visible && this.HideDropDown();
  this.OnFocus && this.Enabled && this.OnFocus(this);
  this.Text == "" &&
    nge_HintStyle(this) === ngHintHideOnFocus &&
    nge_HideHint(this, b, "");
}
function nge_DoSetEnabled(a) {
  this.Enabled = a;
  if (!a && this.ControlHasFocus) {
    this.SetFocus(false);
    this.HasFocus = false;
    this.OnBlur && this.OnBlur(this);
  }
  this.Update && this.Update();
}
function nge_DoBlur() {
  this.HasFocus = false;
  nge_EndMobileKeyboard();
  this.OnBlur && this.Enabled && this.OnBlur(this);
  if (this.Text == "" && !this.HintVisible) {
    var a = document.getElementById(this.ID + "_T");
    if (a) {
      var b = this.GetHint();
      b != "" && nge_ShowHint(this, a, b);
    }
  }
  this.DoUpdateImages();
}
function nge_ShowHint(a, b, d) {
  a.HintVisible = true;
  b.className = a.GetClassName("Input", d);
  b.value = d;
  if (ngIExplorer && ngIExplorerVersion <= 8) {
    if (b.getAttribute("type") !== "text") {
      b = a.Password;
      d = a.HasFocus;
      a.Password = false;
      a.Update();
      a.Password = b;
      d &&
        ngApp.InvokeLater(function() {
          var e = document.getElementById(a.ID + "_T");
          e && e.focus();
        });
      return;
    }
  } else b.setAttribute("type", "text");
  b.removeAttribute("maxlength");
}
function nge_HideHint(a, b, d) {
  a.HintVisible = false;
  b.className = a.GetClassName("Input");
  if (a.Password)
    if (ngIExplorer && ngIExplorerVersion <= 8) {
      a.Update();
      ngApp.InvokeLater(function() {
        var e = document.getElementById(a.ID + "_T");
        e && e.focus();
      });
      return;
    } else b.setAttribute("type", "password");
  a.MaxLength > 0 && b.setAttribute("maxlength", a.MaxLength);
  if (typeof d !== "undefined")
    b.value = a.MaxLength > 0 ? d.substr(0, a.MaxLength) : d;
}
function nge_OnDropDownSetVisible(a, b) {
  if (!b)
    if (!a.__hidingdropdown) {
      a.__hidingdropdown = true;
      try {
        var d = a.DropDownOwner;
        if (d) {
          if (d.OnHideDropDown && !ngVal(d.OnHideDropDown(d, a), false))
            return false;
          if (typeof a.DoHideDropDown === "function") {
            a.DoHideDropDown(this);
            return false;
          }
        }
      } finally {
        delete a.__hidingdropdown;
      }
    }
  return true;
}
function nge_HideDropDown() {
  var a = this.DropDownControl;
  a && a.SetVisible(false);
}
function nge_IsInsidePopup(a, b) {
  var d = this.Elm();
  for (
    b = b !== 1 && this.DropDownOwner ? this.DropDownOwner.Elm() : null;
    a;

  ) {
    if (a === b || a === d) break;
    a = a.parentNode;
  }
  return a ? true : false;
}
function nge_DropDown() {
  if (!(!this.Enabled || this.ReadOnly)) {
    var a = this.DropDownControl;
    if (a)
      if (!(this.OnDropDown && !ngVal(this.OnDropDown(this, a), false))) {
        var b = this.Elm(),
          d = a.Elm();
        if (d && b) {
          if (!a.Visible) {
            d.style.left = "-10000px";
            d.style.top = "-10000px";
          }
          if (typeof a.DoDropDown === "function") a.DoDropDown(this);
          else {
            a.SetVisible(true);
            a.SetFocus();
          }
          if (a.Visible)
            if ((d = a.Elm())) {
              ng_BeginMeasureElement(b);
              var e = ng_OuterWidth(b),
                f = ng_OuterHeight(b);
              ng_EndMeasureElement(b);
              ng_BeginMeasureElement(d);
              var g = ng_OuterWidth(d),
                j = ng_OuterHeight(d);
              ng_EndMeasureElement(d);
              b = ng_ParentPosition(b, ngApp ? ngApp.Elm() : undefined);
              if (typeof this.DropDownWidth !== "undefined")
                this.DropDownWidth > 0 &&
                  ng_SetOuterWidth(d, this.DropDownWidth);
              else if (g < e) {
                ng_SetOuterWidth(d, e);
                g = e;
              }
              var k = ngVal(a.MaxHeight, 150);
              if (j > k) {
                ng_SetOuterHeight(d, k);
                j = k;
              }
              d.style.left =
                (b.x + g <= ng_WindowWidth() - 20 &&
                  this.DropDownAlign == "left") ||
                b.x + e - g < 0
                  ? b.x + "px"
                  : b.x + e - g + "px";
              d.style.top =
                b.y + f + j > ng_WindowHeight() - 20 && b.y - j >= 0
                  ? b.y - j + "px"
                  : b.y + f + "px";
              d.style.zIndex = "100000";
              a.Update();
              typeof a.DoDropDownFinished === "function" &&
                a.DoDropDownFinished(this);
            }
        }
      }
  }
}
function nge_SetDropDownControl(a) {
  var b = this.DropDownControl;
  if (b) {
    b.RemoveEvent("OnSetVisible", nge_OnDropDownSetVisible);
    b.RemoveEvent("IsInsidePopup", nge_IsInsidePopup);
    typeof b.SetDropDownOwner === "function" && b.SetDropDownOwner(null);
    delete b.DropDownOwner;
  }
  if ((this.DropDownControl = a)) {
    a.DropDownOwner = this;
    a.IsPopup = true;
    a.AddEvent(nge_OnDropDownSetVisible, "OnSetVisible");
    a.AddEvent("IsInsidePopup", nge_IsInsidePopup);
    typeof a.SetDropDownOwner === "function" && a.SetDropDownOwner(this);
  }
}
function nge_GetClassName(a, b) {
  if (typeof b === "undefined") b = this.GetHint();
  var d = this.GetText();
  if (this.OnGetClassName) {
    b = this.OnGetClassName(this, a, d, b);
    if (ngVal(b, "") != "") a = b;
  }
  if ((this.DefaultText != "" && d == this.DefaultText) || this.HintVisible)
    a += "Hint";
  this.Enabled || (a += "Disabled");
  return this.BaseClassName + a;
}
function nge_DoUpdate(a) {
  var b = new ngStringBuilder(),
    d = this.BaseClassName,
    e,
    f;
  if (ngIExplorer && ng_GetStylePx(a.style.height) == 0) a.style.height = "1px";
  var g = ng_ClientWidth(a),
    j = 0,
    k = 0,
    n = 0,
    o = 0,
    t = this.GetAlt(),
    q =
      !this.ControlHasFocus || nge_HintStyle(this) === ngHintHideOnInput
        ? this.GetHint()
        : "",
    u = null;
  if ((e = this.OnGetImg ? this.OnGetImg(this, 0) : this.LeftImg)) {
    u || (u = new ngStringBuilder());
    f = ngc_ImgProps(
      this.ID + "_IL",
      this.ControlHasFocus ? 1 : 0,
      this.Enabled,
      e
    );
    ngc_Img(u, f, "position:absolute; left: 0px;", ngVal(e.Attrs, ""));
    k = f.W;
    if (f.H > j) j = f.H;
  }
  if ((e = this.OnGetImg ? this.OnGetImg(this, 2) : this.RightImg)) {
    u || (u = new ngStringBuilder());
    f = ngc_ImgProps(
      this.ID + "_IR",
      this.ControlHasFocus ? 1 : 0,
      this.Enabled,
      e
    );
    ngc_Img(
      u,
      f,
      "position:absolute; left: " + (g - f.W) + "px;",
      ngVal(e.Attrs, "")
    );
    n = f.W;
    if (f.H > j) j = f.H;
  }
  if ((e = this.OnGetImg ? this.OnGetImg(this, 1) : this.MiddleImg)) {
    u || (u = new ngStringBuilder());
    f = ngc_ImgProps(
      this.ID + "_IM",
      this.ControlHasFocus ? 1 : 0,
      this.Enabled,
      e
    );
    ngc_ImgSW(u, f, k, g - k - n, "", ngVal(e.Attrs, ""));
    if (f.H > j) j = f.H;
  }
  e = !this.Enabled || this.ReadOnly || this.DropDownType == ngeDropDownList;
  if (
    (f = this.ControlHasFocus ? document.getElementById(this.ID + "_T") : null)
  ) {
    var x = a.firstChild;
    x || (f = null);
    if (f && ngIExplorer && ngIExplorerVersion <= 8) {
      var w = f.getAttribute("type");
      if (
        (this.Password && !this.HintVisible && w !== "password") ||
        w !== "text"
      )
        f = null;
    }
  }
  if (f) t != "" ? x.setAttribute("title", t) : x.removeAttribute("title");
  else
    b.append(
      "<span " + (t != "" ? ' title="' + ng_htmlEncode(t) + '"' : "") + ">"
    );
  if (this.Buttons && this.Buttons.length > 0)
    for (var y, z = 0; z < this.Buttons.length; z++) {
      t = this.Buttons[z];
      t.Enabled = this.Enabled;
      if (t.BaseClassName == "" || t.BaseClassName == t.CtrlType)
        t.BaseClassName = d + "Button";
      if (t.Visible) {
        t.ID == "" && t.Attach(this.ID + "_B" + (z + 1));
        y = ngb_SimpleRect(t);
        if (y.H > j) j = y.H;
        w = ngVal(t.ButtonAlign, "");
        if (w == "left") {
          t.Bounds.L = k + 0;
          k += y.W;
        } else {
          t.Bounds.L = g - n - o - y.W;
          o += y.W;
        }
        t.Bounds.T = 0;
        t.Bounds.W = y.W;
        b.append(
          '<div id="' +
            t.ID +
            '" class="' +
            t.BaseClassName +
            '" style="position: absolute; z-index:1; left:' +
            t.Bounds.L +
            "px; top: 0px; width: " +
            y.W +
            "px; height: " +
            y.H +
            'px"></div>'
        );
      }
    }
  ng_SetClientHeight(a, j);
  d = ng_StyleHeight(a);
  if (this.Bounds.H != d) {
    this.Bounds.H = d;
    this.SetBounds();
  }
  g = g - o - 0 - k - n - 2;
  if (g < 0) g = 0;
  if (f) {
    for (n = x.lastChild; n; ) {
      a = n.previousSibling;
      n != f && x.removeChild(n);
      n = a;
    }
    a = document.createElement("div");
    ng_SetInnerHTML(a, b.toString());
    for (n = a.firstChild; n; ) {
      a = n.nextSibling;
      x.insertBefore(n, f);
      n = a;
    }
    f.className = this.GetClassName("Input", q);
    if (!ngIExplorer || ngIExplorerVersion > 8)
      this.Password && !this.HintVisible
        ? f.setAttribute("type", "password")
        : f.setAttribute("type", "text");
    this.MaxLength > 0 && !this.HintVisible
      ? f.setAttribute("maxlength", this.MaxLength)
      : f.removeAttribute("maxlength");
    if (e) {
      f.setAttribute("readonly", "readonly");
      ngIExplorer && this.SetFocus(false);
    } else f.removeAttribute("readonly");
    f.style.textAlign = this.TextAlign;
    f.style.left = k + 0 + "px";
    f.style.top = this.OffsetTop + "px";
    f.style.width = g + "px";
    if (this.HintVisible && f.value != q) {
      f.value = q;
      this.SetCaretPos(0);
    }
    if (u) {
      b.clear();
      b.append('<span style="position: absolute;z-index:0;left:0px;">');
      b.append(u);
      b.append("</span>");
      a = document.createElement("div");
      ng_SetInnerHTML(a, b.toString());
      for (n = a.firstChild; n; ) {
        a = n.nextSibling;
        x.appendChild(n);
        n = a;
      }
    }
  } else {
    this.HintVisible = this.Text == "" && q != "";
    b.append("<input type=");
    this.Password && !this.HintVisible
      ? b.append('"password" ')
      : b.append('"text" ');
    e && b.append('readonly="readonly" ');
    b.append('id="' + this.ID + '_T" class="' + this.GetClassName("Input", q));
    b.append(
      '" style="border:0px; white-space: nowrap;text-align:' +
        this.TextAlign +
        ";position: absolute; z-index:1;left:" +
        (k + 0) +
        "px;top:" +
        this.OffsetTop +
        "px;width:" +
        g +
        "px;"
    );
    e && b.append("cursor: default;");
    b.append(
      '" value="' + ng_htmlEncode(this.Text == "" ? q : this.Text) + '" '
    );
    this.MaxLength > 0 &&
      !this.HintVisible &&
      b.append('maxlength="' + this.MaxLength + '" ');
    b.append(
      'onkeydown="nge_KeyDown(event,this)" onkeyup="nge_KeyUp(event,this)" onkeypress="nge_KeyPress(event,this)" onchange="nge_TextChanged(event,this)"'
    );
    b.append(
      " onfocus=\"ngc_Focus(event,this,'ngEdit')\" onblur=\"ngc_Blur(event,this,'ngEdit')\""
    );
    b.append(" />");
    if (u) {
      b.append('<span style="position: absolute;z-index:0;left:0px;">');
      b.append(u);
      b.append("</span>");
    }
    b.append("</span>");
    ng_SetInnerHTML(a, b.toString());
  }
  if (this.Buttons && this.Buttons.length > 0)
    for (z = 0; z < this.Buttons.length; z++) {
      t = this.Buttons[z];
      t.Parent = this;
      t.Update();
    }
  return true;
}
function nge_SetFocus(a) {
  a = ngVal(a, true);
  if (a != this.HasFocus) {
    var b = document.getElementById(this.ID + "_T");
    if (b)
      try {
        if (a) {
          b.focus();
          this.SelectOnFocus && !this.HintVisible && b.select();
        } else b.blur();
      } catch (d) {}
  }
}
function nge_SetReadOnly(a) {
  a = ngVal(a, true);
  if (a != this.ReadOnly) {
    this.ReadOnly = a;
    var b = document.getElementById(this.ID + "_T");
    if (b)
      if (a) {
        b.setAttribute("readonly", "readonly");
        b.style.cursor = "default";
        ngIExplorer && this.ControlHasFocus && this.SetFocus(false);
      } else {
        b.removeAttribute("readonly");
        b.style.cursor = "";
      }
  }
}
function nge_DoMouseEnter() {
  var a = document.getElementById(this.ID + "_T");
  if (a) {
    var b = a.className;
    if (b.indexOf("_Focus") < 0) b += "_Focus";
    a.className = b;
  }
  ngc_EnterImg(this.ID + "_IL");
  ngc_EnterImgS(this.ID + "_IM");
  ngc_EnterImg(this.ID + "_IR");
  this.OnMouseEnter && this.OnMouseEnter(this);
}
function nge_DoMouseLeave() {
  this.OnMouseLeave && this.OnMouseLeave(this);
  var a = document.getElementById(this.ID + "_T");
  if (a) {
    var b = a.className,
      d = b.indexOf("_Focus");
    if (d >= 0) b = b.substring(0, d);
    a.className = b;
  }
  ngc_LeaveImg(this.ID + "_IL");
  ngc_LeaveImgS(this.ID + "_IM");
  ngc_LeaveImg(this.ID + "_IR");
}
function nge_DoCreate(a) {
  if (
    typeof a.DropDown !== "undefined" &&
    typeof this.SetDropDownControl === "function"
  ) {
    ng_MergeDef(a.DropDown, {
      L: 0,
      T: 0,
      id: this.ID + "_DD",
      Data: { Visible: false }
    });
    var b = ngCreateControls({ Control: a.DropDown });
    if (typeof b.Control !== "undefined") {
      b.Control.Owner = this;
      this.SetDropDownControl(b.Control);
    }
  }
  if (typeof a.Buttons === "object") {
    b = {};
    for (var d, e = 0; e < a.Buttons.length; e++) {
      d = ng_CopyVar(a.Buttons[e]);
      b["B" + e] = d;
    }
    b = ngCreateControls(b, undefined, null);
    if (typeof this.Buttons !== "object" || !this.Buttons) this.Buttons = [];
    for (e = 0; e < a.Buttons.length; e++)
      if ((d = b["B" + e])) {
        d.Owner = this;
        this.Buttons[this.Buttons.length] = d;
      }
    if (!this.Buttons.length) this.Buttons = null;
  }
}
function nge_DoDispose() {
  this.HideDropDown();
  this.DropDownControl && this.DropDownControl.Dispose();
  return true;
}
function ngEdit(a, b) {
  ngControl(this, a, "ngEdit");
  this.DoCreate = nge_DoCreate;
  this.DoDispose = nge_DoDispose;
  this.DoAcceptGestures = nge_DoAcceptGestures;
  this.DoGesture = nge_DoGesture;
  this.Text = ngVal(b, "");
  this.DefaultText = "";
  this.TextAlign = "left";
  this.Hint = this.Alt = "";
  this.Password = this.ReadOnly = false;
  this.MaxLength = 0;
  this.RightImg = this.MiddleImg = this.LeftImg = null;
  this.OffsetTop = 0;
  this.HasFocus = false;
  this.SelectOnFocus = true;
  this.Buttons = null;
  this.DropDownType = ngeDropDownEdit;
  this.DropDownControl = null;
  this.DropDownWidth = undefined;
  this.DropDownAlign = "left";
  this.SetText = nge_SetText;
  this.GetText = ngc_GetText;
  this.GetAlt = ngc_GetAlt;
  this.GetHint = ngc_GetHint;
  this.SetReadOnly = nge_SetReadOnly;
  this.GetCaretPos = nge_GetCaretPos;
  this.SetCaretPos = nge_SetCaretPos;
  this.GetClassName = nge_GetClassName;
  this.DoMouseEnter = nge_DoMouseEnter;
  this.DoMouseLeave = nge_DoMouseLeave;
  this.DoSetEnabled = nge_DoSetEnabled;
  this.DoFocus = nge_DoFocus;
  this.DoBlur = nge_DoBlur;
  this.DoPtrStart = nge_DoPtrStart;
  this.DoPtrClick = nge_DoPtrClick;
  this.SetDropDownControl = nge_SetDropDownControl;
  this.DropDown = nge_DropDown;
  this.HideDropDown = nge_HideDropDown;
  this.SuggestionRefresh = nge_SuggestionRefresh;
  this.DoUpdateImages = nge_DoUpdateImages;
  this.DoUpdate = nge_DoUpdate;
  this.SetFocus = nge_SetFocus;
  this.OnGetImg = this.OnBlur = this.OnFocus = this.OnMouseLeave = this.OnMouseEnter = this.OnKeyPress = this.OnKeyUp = this.OnKeyDown = this.OnClickOutside = this.OnHideDropDown = this.OnDropDown = this.OnGetClassName = this.OnGetHint = this.OnGetAlt = this.OnTextChanged = this.OnGetText = this.OnSetText = null;
  ngControlCreated(this);
}
function ngDropDown_Add(a) {
  var b = new ngButton();
  a.DropDownButton = b;
  b.OnPtrStart = function(d, e) {
    if (e.EventID === "btn") {
      e.CanFocus = false;
      e.PreventDefault = true;
    }
  };
  b.OnClick = function(d) {
    if ((d = d.Owner ? d.Owner.Parent : null)) {
      var e = d.DropDownControl;
      e && e.Visible ? d.HideDropDown() : d.DropDown();
    }
  };
  a.Buttons = new Array(b);
}
function ngDropDown_Create(a, b, d, e, f) {
  b = ngCreateControlAsType(a, ngVal(e, "ngEdit"), b, d);
  if (!b) return b;
  if (f) {
    b.DropDownType = ngeDropDownList;
    b.SelectOnFocus = true;
  }
  ngDropDown_Add(b);
  if (typeof a.DropDown === "undefined") a.DropDown = {};
  return b;
}
function ngedn_GetText(a) {
  var b = parseInt(a.Text);
  if (a.Text == "" || isNaN(b)) {
    b = ngVal(a.DefaultNum, 0);
    a.Text = "" + b;
  }
  if (typeof this.MinNum !== "undefined" && b < a.MinNum)
    a.Text = "" + a.MinNum;
  if (typeof this.MaxNum !== "undefined" && b > a.MaxNum)
    a.Text = "" + a.MaxNum;
  return a.Text;
}
function ngEditNum_Create(a, b, d) {
  var e = ngVal(a.ArrowsAlign, "right"),
    f = ngVal(a.Arrows, "leftright");
  a = ngCreateControlAsType(a, "ngEdit", b, d);
  if (!a) return a;
  a.TextAlign = e == "both" ? "center" : "right";
  a.OnGetText = ngedn_GetText;
  a.AddEvent("OnKeyUp", function(g) {
    switch (g.keyCode) {
      case 38:
        this.DoUp();
        return false;
      case 40:
        this.DoDown();
        return false;
    }
    return true;
  });
  a.Step = 1;
  a.DefaultNum = 0;
  a.DoUp = function() {
    var g = this.GetNum(),
      j = g;
    if (ngVal(this.StepRound, false)) j = Math.ceil(g / this.Step) * this.Step;
    if (g == j) g += this.Step;
    else g = j;
    this.SetNum(g);
  };
  a.DoDown = function() {
    var g = this.GetNum(),
      j = g;
    if (ngVal(this.StepRound, false)) j = Math.floor(g / this.Step) * this.Step;
    if (g == j) g -= this.Step;
    else g = j;
    this.SetNum(g);
  };
  a.GetNum = function() {
    if (this.OnGetNum) return this.OnGetNum(this);
    var g = parseInt(this.GetText());
    if (!isNaN(g)) {
      if (typeof this.MinNum !== "undefined" && g < this.MinNum)
        g = this.MinNum;
      if (typeof this.MaxNum !== "undefined" && g > this.MaxNum)
        g = this.MaxNum;
      return g;
    }
  };
  a.SetNum = function(g) {
    if (isNaN(g)) g = this.DefaultNum;
    g = ngVal(g, this.DefaultNum);
    g = ngVal(g, 0);
    if (this.OnSetNum) this.OnSetNum(this, g);
    else {
      if (typeof this.MinNum !== "undefined" && g < this.MinNum)
        g = this.MinNum;
      if (typeof this.MaxNum !== "undefined" && g > this.MaxNum)
        g = this.MaxNum;
      this.SetText("" + g);
    }
  };
  a.ButtonUp = null;
  a.ButtonDown = null;
  if (f != "none") {
    a.ButtonUp = new ngButton();
    if (e == "left") a.ButtonUp.ButtonAlign = "left";
    a.ButtonUp.OnClick = function(g) {
      var j = g.Owner ? g.Owner.Parent : null;
      if (j)
        if (!(j.OnUp && !ngVal(j.OnUp(g, j.GetNum()), false))) {
          j.DoUp();
          g.Owner.Touching || j.SetFocus();
        }
    };
    a.ButtonDown = new ngButton();
    if (e == "left" || e == "both") a.ButtonDown.ButtonAlign = "left";
    a.ButtonDown.OnClick = function(g) {
      var j = g.Owner ? g.Owner.Parent : null;
      if (j)
        if (!(j.OnDown && !ngVal(j.OnDown(g, j.GetNum()), false))) {
          j.DoDown();
          g.Owner.Touching || j.SetFocus();
        }
    };
    a.Buttons =
      e == "left"
        ? new Array(a.ButtonDown, a.ButtonUp)
        : new Array(a.ButtonUp, a.ButtonDown);
  }
  return a;
}
function ngem_TextChanged(a, b, d) {
  if (typeof d === "undefined")
    d = ngGetControlById(b.id.substring(0, b.id.length - 2), "ngMemo");
  if (d) {
    a = b.value;
    if (!d.HintVisible && d.Text != a) {
      d.Text = a;
      d.OnTextChanged && d.OnTextChanged(d);
      b.className = d.GetClassName("Input");
    }
    if (
      (a == "" && (!d.HasFocus || nge_HintStyle(d) === ngHintHideOnInput)) ||
      d.HintVisible
    ) {
      a = d.GetHint();
      if (a != "") {
        d.HintVisible = true;
        b.className = d.GetClassName("Input", a);
        b.value = a;
        d.SetCaretPos(0);
      } else d.HintVisible = false;
    }
  }
}
function ngem_KeyPress(a, b) {
  if (!a) a = window.event;
  if (
    (b = ngGetControlById(b.id.substring(0, b.id.length - 2), "ngMemo")) &&
    b.Enabled
  ) {
    a.Owner = b;
    if (b.OnKeyPress && !ngVal(b.OnKeyPress(a), false)) return false;
  }
}
function ngem_KeyDown(a, b) {
  if (!a) a = window.event;
  if (
    (b = ngGetControlById(b.id.substring(0, b.id.length - 2), "ngMemo")) &&
    b.Enabled
  ) {
    a.Owner = b;
    if (b.OnKeyDown && !ngVal(b.OnKeyDown(a), false)) return false;
    if (b.HintVisible)
      switch (a.keyCode) {
        case 35:
        case 36:
        case 37:
        case 39:
        case 38:
        case 40:
        case 8:
        case 46:
        case 33:
        case 34:
          a.preventDefault && a.preventDefault();
          a.returnValue = false;
          break;
      }
    if (a.keyCode == 13)
      for (a = b.ParentControl; a; ) {
        if (a.CtrlType == "ngWindow") a.IgnoreDefFormBtn = true;
        a = a.ParentControl;
      }
  }
  return false;
}
function ngem_KeyUp(a, b) {
  if (!a) a = window.event;
  var d = ngGetControlById(b.id.substring(0, b.id.length - 2), "ngMemo");
  if (d && d.Enabled) {
    a.Owner = d;
    nge_KeyUpHint(d, b, "Input");
    if (d.OnKeyUp && !ngVal(d.OnKeyUp(a), false)) return false;
    ngem_TextChanged(a, b, d);
    a.keyCode == 27 && d && nge_DefFormButton(d, 0);
  }
}
function ngem_SetText(a) {
  if (this.OnSetText) a = this.OnSetText(a, this);
  if (a != this.Text) {
    this.Text = a;
    var b = document.getElementById(this.ID + "_T");
    if (b) {
      this.HintVisible = false;
      if (a == "") {
        var d = this.GetHint();
        if (
          d != "" &&
          (!this.HasFocus || nge_HintStyle(this) === ngHintHideOnInput)
        ) {
          this.HintVisible = true;
          b.value = d;
        } else b.value = a;
      } else b.value = a;
    }
    this.OnTextChanged && this.OnTextChanged(this);
    if (b) b.className = this.GetClassName("Input", d);
  }
}
function ngem_DoFocus(a, b) {
  this.HasFocus = true;
  this.DoUpdateImages();
  nge_BeginMobileKeyboard();
  this.HintVisible && this.SetCaretPos(0);
  this.OnFocus && this.Enabled && this.OnFocus(this);
  if (this.Text == "" && nge_HintStyle(this) === ngHintHideOnFocus) {
    this.HintVisible = false;
    b.value = "";
    b.className = this.GetClassName("Input");
  }
}
function ngem_DoBlur() {
  this.HasFocus = false;
  nge_EndMobileKeyboard();
  this.OnBlur && this.Enabled && this.OnBlur(this);
  if (this.Text == "" && !this.HintVisible) {
    var a = document.getElementById(this.ID + "_T");
    if (a) {
      var b = this.GetHint();
      if (b != "") {
        this.HintVisible = true;
        a.className = this.GetClassName("Input", b);
        a.value = b;
      }
    }
  }
  this.DoUpdateImages();
}
function ngem_DoUpdateImages() {
  ngc_ChangeBox(this.ID, this.HasFocus ? 1 : 0, this.Enabled, this.Frame);
}
function ngem_DoUpdate(a) {
  var b = new ngStringBuilder(),
    d = this.BaseClassName,
    e = 0,
    f = 0,
    g = ng_ClientWidth(a),
    j = ng_ClientHeight(a),
    k = {};
  ngc_ImgBox(
    b,
    this.ID,
    "ngMemo",
    this.HasFocus ? 1 : 0,
    this.Enabled,
    0,
    0,
    g,
    j,
    false,
    this.Frame,
    "",
    { Content: 'class="' + d + 'Back"' },
    "",
    k
  );
  d = this.GetAlt();
  var n =
    !this.ControlHasFocus || nge_HintStyle(this) === ngHintHideOnInput
      ? this.GetHint()
      : "";
  e += k.Left.W;
  g -= k.Left.W + k.Right.W;
  f += k.Top.H;
  j -= k.Top.H + k.Bottom.H;
  if (g < 0) g = 0;
  if (j < 0) j = 0;
  k = !this.Enabled || this.ReadOnly;
  var o = this.ControlHasFocus ? document.getElementById(this.ID + "_T") : null;
  if (o) {
    for (var t, q = a.lastChild; q; ) {
      t = q.previousSibling;
      q != o && a.removeChild(q);
      q = t;
    }
    t = document.createElement("div");
    ng_SetInnerHTML(t, b.toString());
    for (q = t.firstChild; q; ) {
      t = q.nextSibling;
      a.insertBefore(q, o);
      q = t;
    }
    o.className = this.GetClassName("Input", n);
    d != "" ? o.setAttribute("title", d) : o.removeAttribute("title");
    if (k) {
      o.setAttribute("readonly", "readonly");
      ngIExplorer && this.SetFocus(false);
    } else o.removeAttribute("readonly");
    o.style.textAlign = this.TextAlign;
    o.style.left = e + "px";
    o.style.top = f + "px";
    o.style.width = g + "px";
    o.style.height = j + "px";
    if (this.HintVisible && o.value != n) {
      o.value = n;
      this.SetCaretPos(0);
    }
  } else {
    this.HintVisible = this.Text == "" && n != "";
    b.append("<textarea ");
    d != "" && b.append('title="' + ng_htmlEncode(d) + '" ');
    k && b.append('readonly="readonly" ');
    b.append('id="' + this.ID + '_T" class="' + this.GetClassName("Input", n));
    b.append(
      '" style="border:0px; margin:0px 0px 0px 0px; padding: 0px 0px 0px 0px; overflow: auto; text-align:' +
        this.TextAlign +
        ";position: absolute; z-index:1;left:" +
        e +
        "px;top:" +
        f +
        "px;width:" +
        g +
        "px;height:" +
        j +
        'px;" '
    );
    b.append(
      'onkeydown="ngem_KeyDown(event,this)" onkeyup="ngem_KeyUp(event,this)" onkeypress="ngem_KeyPress(event,this)" onchange="ngem_TextChanged(event,this)"'
    );
    b.append(
      " onfocus=\"ngc_Focus(event,this,'ngMemo')\" onblur=\"ngc_Blur(event,this,'ngMemo')\""
    );
    b.append(">");
    b.append(ng_htmlEncode(this.Text == "" ? n : this.Text));
    b.append("</textarea>");
    ng_SetInnerHTML(a, b.toString());
  }
  return true;
}
function ngem_DoMouseEnter() {
  var a = document.getElementById(this.ID + "_T");
  if (a) {
    var b = a.className;
    if (b.indexOf("_Focus") < 0) b += "_Focus";
    a.className = b;
  }
  ngc_EnterBox(this.ID);
  this.OnMouseEnter && this.OnMouseEnter(this);
}
function ngem_DoMouseLeave() {
  this.OnMouseLeave && this.OnMouseLeave(this);
  var a = document.getElementById(this.ID + "_T");
  if (a) {
    var b = a.className,
      d = b.indexOf("_Focus");
    if (d >= 0) b = b.substring(0, d);
    a.className = b;
  }
  ngc_LeaveBox(this.ID);
}
function ngem_DoAcceptGestures(a, b) {
  b.drag = true;
  b.tap = true;
}
function ngem_DoPtrStart(a) {
  if (a.EventID === "control") a.PreventDefault = false;
}
function ngem_DoPtrClick(a) {
  a.EventID === "control" &&
    this.HintVisible &&
    nge_HintStyle(this) === ngHintHideOnInput &&
    this.SetCaretPos(0);
}
function ngMemo(a, b) {
  ngControl(this, a, "ngMemo");
  this.DoAcceptGestures = ngem_DoAcceptGestures;
  this.DoGesture = nge_DoGesture;
  this.DoPtrStart = ngem_DoPtrStart;
  this.DoPtrClick = ngem_DoPtrClick;
  this.Text = ngVal(b, "");
  this.DefaultText = "";
  this.TextAlign = "left";
  this.Hint = this.Alt = "";
  this.ReadOnly = false;
  this.Frame = {};
  this.HasFocus = false;
  this.SelectOnFocus = true;
  this.SetText = ngem_SetText;
  this.GetText = ngc_GetText;
  this.GetAlt = ngc_GetAlt;
  this.GetHint = ngc_GetHint;
  this.SetReadOnly = nge_SetReadOnly;
  this.GetCaretPos = nge_GetCaretPos;
  this.SetCaretPos = nge_SetCaretPos;
  this.GetClassName = nge_GetClassName;
  this.DoMouseEnter = ngem_DoMouseEnter;
  this.DoMouseLeave = ngem_DoMouseLeave;
  this.DoSetEnabled = nge_DoSetEnabled;
  this.DoFocus = ngem_DoFocus;
  this.DoBlur = ngem_DoBlur;
  this.DoUpdateImages = ngem_DoUpdateImages;
  this.DoUpdate = ngem_DoUpdate;
  this.SetFocus = nge_SetFocus;
  this.OnBlur = this.OnFocus = this.OnMouseLeave = this.OnMouseEnter = this.OnKeyPress = this.OnKeyUp = this.OnKeyDown = this.OnGetClassName = this.OnGetHint = this.OnGetAlt = this.OnTextChanged = this.OnGetText = this.OnSetText = null;
  ngControlCreated(this);
}
var ngpg_CurrentPageId = "";
function ngpg_DoPtrClick(a) {
  var b = a.EventID;
  if (b.substr(0, 4) === "page") {
    b = b.substring(4, b.length);
    a = a.Event;
    a.Owner = this;
    a.pages = this;
    a.page = b;
    (this.OnClick && !ngVal(this.OnClick(a), false)) ||
      (b != "" && this.SetPage(parseInt(b)));
  }
}
function ngpg_DoPtrDblClick(a) {
  var b = a.EventID;
  if (b.substr(0, 4) === "page") {
    b = b.substring(4, b.length);
    a = a.Event;
    a.Owner = this;
    a.pages = this;
    a.page = b;
    this.OnDblClick && ngVal(this.OnDblClick(a), false);
  }
}
function ngpg_DoPtrStart(a) {
  a.Touch &&
    a.EventID.substr(0, 4) === "page" &&
    ngpg_EnterPg(a.Event, a.SrcElement);
}
function ngpg_DoPtrDrag(a) {
  if (a.Touch)
    if (a.EventID.substr(0, 4) === "page")
      if (a.IsInSrcElement())
        ngpg_CurrentPageId != a.SrcElement.id &&
          ngpg_EnterPg(a.Event, a.SrcElement);
      else
        ngpg_CurrentPageId == a.SrcElement.id &&
          ngpg_LeavePg(a.Event, a.SrcElement);
  return false;
}
function ngpg_DoPtrEnd(a) {
  a.Touch &&
    a.EventID.substr(0, 4) === "page" &&
    a.IsInSrcElement() &&
    ngpg_CurrentPageId == a.SrcElement.id &&
    ngpg_LeavePg(a.Event, a.SrcElement);
}
function ngpg_EnterPg(a, b) {
  if (!a) a = window.event;
  if (!(ngUsingTouch && a && a.type.toLowerCase().match(/mouse/))) {
    var d = b.className;
    if (ngpg_CurrentPageId != "") {
      var e = document.getElementById(ngpg_CurrentPageId);
      ngpg_LeavePg(a, e);
    }
    ngpg_CurrentPageId = b.id;
    if (d.indexOf("_Focus") < 0) d += "_Focus";
    b.className = d;
    ngc_EnterImg(b.id + "_IL");
    ngc_EnterImgS(b.id + "_IM");
    ngc_EnterImg(b.id + "_IR");
  }
}
function ngpg_LeavePg(a, b) {
  if (!a) a = window.event;
  if (!(ngUsingTouch && a && a.type.toLowerCase().match(/mouse/))) {
    a = b.className;
    if (ngpg_CurrentPageId == b.id) ngpg_CurrentPageId = "";
    var d = a.indexOf("_Focus");
    if (d >= 0) a = a.substring(0, d);
    b.className = a;
    ngc_LeaveImg(b.id + "_IL");
    ngc_LeaveImgS(b.id + "_IM");
    ngc_LeaveImg(b.id + "_IR");
  }
}
function ngpg_ChangePageState(a, b) {
  var d = this.ID + "_" + a,
    e = document.getElementById(d);
  if (e)
    if (this.Elm()) {
      var f = this.BaseClassName,
        g = "",
        j = this.PageImages.length
          ? this.PageImages[a % this.PageImages.length]
          : {};
      g = (a =
        this.Enabled && this.Pages[a] && ngVal(this.Pages[a].Enabled, true))
        ? b
          ? "PageSelected"
          : "Page"
        : "PageDisabled";
      if (e.className.indexOf("_Focus") >= 0) g += "_Focus";
      e.className = f + g;
      j.LeftImg &&
        ngc_ChangeImage(ngpg_ImgDrawProps(d + "_IL", b, a, j.LeftImg));
      j.MiddleImg &&
        ngc_ChangeImageS(ngpg_ImgDrawProps(d + "_IM", b, a, j.MiddleImg));
      j.RightImg &&
        ngc_ChangeImage(ngpg_ImgDrawProps(d + "_IR", b, a, j.RightImg));
    }
}
function ngpg_GetPageByText(a) {
  if (ngVal(a, "") == "") return -1;
  var b;
  for (i = 0; i < this.Pages.length; i++) {
    b = this.Pages[i];
    b = this.OnGetText
      ? ngVal(this.OnGetText(this, i), "")
      : ngVal(b ? b.Text : "", "");
    if (b == a) return i;
  }
  return -1;
}
function ngpg_GetPageById(a) {
  if (ngVal(a, "") == "") return -1;
  var b;
  for (i = 0; i < this.Pages.length; i++)
    if ((b = this.Pages[i])) if (b.id == a) return i;
  return -1;
}
function ngpg_GetIdByPage(a) {
  if (ngVal(a, -1) < 0) return "";
  if (typeof this.Pages[a] == "undefined") return "";
  if (typeof this.Pages[a].id == "undefined") return "";
  return this.Pages[a].id;
}
function ngpg_GetPageObjById(a) {
  a = this.GetPageById(a);
  if (a < 0) return null;
  return this.Pages[a];
}
function ngpg_GetPageByControl(a) {
  for (var b = a.ParentControl; b; ) {
    for (a = 0; a < this.Pages.length; a++)
      if (b == this.Pages[a].ControlsPanel) return a;
    b = b.ParentControl;
  }
  return -1;
}
function ngpg_GetPageObjByControl(a) {
  a = this.GetPageByControl(a);
  if (a < 0) return null;
  return this.Pages[a];
}
function ngpg_SetPageByControl(a) {
  a = this.GetPageByControl(a);
  if (a < 0) return false;
  this.SetPage(a);
  return this.Page == a;
}
function ngpg_SetPage(a) {
  if (typeof a === "string") {
    var b = a;
    a = this.GetPageById(b);
    if (a < 0) a = this.GetPageByText(b);
    if (a < 0) a = b;
  }
  a = parseInt(a);
  if (!(a < 0 || a >= this.Pages.length || isNaN(a)))
    if (a != this.Page)
      if (
        !(this.OnPageChanging && !ngVal(this.OnPageChanging(this, a), false))
      ) {
        b = this.Page;
        this.Page = a;
        var d = this.Pages[b];
        typeof d !== "undefined" &&
          d.ControlsPanel &&
          d.ControlsPanel.SetVisible(false);
        if (this.PagesVisible)
          if (this.row1pages[a]) {
            this.ChangePageState(a, 1);
            this.ChangePageState(b, 0);
          } else this.Update();
        d = this.Pages[a];
        typeof d !== "undefined" &&
          d.ControlsPanel &&
          d.ControlsPanel.SetVisible(true);
        this.OnPageChanged && this.OnPageChanged(this, b);
      }
}
function ngpg_ImgDrawProps(a, b, d, e) {
  b = ngc_ImgProps(a, b, d, e);
  if (ngpg_CurrentPageId == a.substring(0, a.length - 3)) {
    b.aL = b.oL;
    b.aT = b.oT;
  } else {
    b.aL = b.L;
    b.aT = b.T;
  }
  return b;
}
function ngpg_DoRelease(a) {
  a.style.display = "none";
  this.row1pages = [];
}
function ngpg_DoUpdate(a) {
  var b = document.getElementById(this.ID + "_F");
  if (!b) return true;
  var d = this.BaseClassName,
    e = new ngStringBuilder(),
    f = ng_ClientWidth(a),
    g = ng_ClientHeight(a);
  this.row1pages = [];
  if (this.PagesVisible) {
    var j,
      k,
      n,
      o,
      t,
      q,
      u,
      x,
      w,
      y,
      z = 0,
      B,
      C,
      A,
      J,
      F = this.PagesVAlign == "bottom",
      E = this.PagesAlign == "right",
      G = f - this.PagesIndent;
    if (this.PagesSize > 0 && G > this.PagesSize) G = this.PagesSize;
    if (this.PagesSize < 0) G += this.PagesSize;
    o = E
      ? F
        ? this.Frame.LeftBottom
        : this.Frame.LeftTop
      : F
        ? this.Frame.RightBottom
        : this.Frame.RightTop;
    if (typeof o !== "undefined") G -= o.W;
    var D,
      H,
      L,
      I = {};
    I.Tabs = [];
    var K = [];
    K[0] = I;
    var P = 0;
    for (j = a = q = u = 0; a < this.Pages.length; a++) {
      H = this.Pages[a];
      if (!(H && !ngVal(H.Visible, true))) {
        A = a == this.Page ? 1 : 0;
        J = this.OnGetText
          ? ngVal(this.OnGetText(this, a), "")
          : ngVal(H ? H.Text : "", "");
        if (this.HTMLEncode) J = ng_htmlEncode(J);
        o = this.OnGetAlt
          ? ngVal(this.OnGetAlt(this, a), "")
          : ngVal(H ? H.Alt : "", "");
        w = (L = this.Enabled && ngVal(H.Enabled, true))
          ? A
            ? "PageSelected"
            : "Page"
          : "PageDisabled";
        w = d + w;
        n = this.ID + "_" + a;
        t = this.PageImages.length ? this.PageImages[j] : {};
        D = {};
        D.Enabled = L;
        D.Page = a;
        D.Text = J;
        D.Alt = o;
        D.id = n;
        D.txtclass = w;
        C = x = y = B = 0;
        if ((o = t.LeftImg)) {
          k = ngpg_ImgDrawProps(n + "_IL", A, L, o);
          k.Attrs = o.Attrs;
          C += k.W;
          D.LeftImg = k;
        } else D.LeftImg = null;
        if ((o = t.MiddleImg)) {
          k = ngpg_ImgDrawProps(n + "_IM", A, L, o);
          k.Attrs = o.Attrs;
          D.MiddleImg = k;
        } else D.MiddleImg = null;
        if ((o = t.RightImg)) {
          k = ngpg_ImgDrawProps(n + "_IR", A, L, o);
          k.Attrs = o.Attrs;
          C += k.W;
          D.RightImg = k;
        } else D.RightImg = null;
        if ((o = t.Separator)) {
          k = ngpg_ImgDrawProps(n + "_IS", A, this.Enabled, o);
          k.Attrs = o.Attrs;
          D.Separator = k;
        } else D.Separator = null;
        if (J != "") {
          ng_SetInnerHTML(
            b,
            '<div id="' +
              this.ID +
              '_T" class="' +
              w +
              '" style="position:absolute; visibility: hidden; white-space: nowrap;"><div class="' +
              d +
              'PageText">' +
              J +
              "</div></div>"
          );
          if ((n = document.getElementById(this.ID + "_T"))) {
            if (typeof H.W !== "undefined") y = H.W - C;
            else {
              y = ng_ClientWidth(n);
              if (typeof H.MinWidth !== "undefined" && y + C < H.MinWidth)
                y = H.MinWidth - C;
            }
            B = ng_ClientHeight(n);
          }
        }
        if ((k = D.LeftImg)) {
          x += k.W;
          if (k.H > B) B = k.H;
        }
        if ((k = D.MiddleImg) && k.H > B) B = k.H;
        x += y;
        if ((k = D.RightImg)) {
          if (k.H > B) B = k.H;
          x += k.W;
        }
        if ((k = D.Separator) && k.H > B) B = k.H;
        D.w = x;
        D.tw = y;
        D.th = B;
        if (q + x > G && I.Tabs.length > 0) {
          k = I.Tabs[I.Tabs.length - 1];
          if (k.Separator) {
            q -= k.Separator.W;
            k.w -= k.Separator.W;
          }
          k.Separator = null;
          I.h = z;
          I.w = q;
          I = {};
          I.Tabs = [];
          K[K.length] = I;
          if (this.MaxRows > 0 && K.length > this.MaxRows) break;
          u += z;
          z = q = 0;
        }
        if (o) {
          x += o.W;
          D.w = x;
        }
        if (B > z) z = B;
        I.Tabs[I.Tabs.length] = D;
        if (A) P = K.length - 1;
        q += x;
        j++;
        if (j >= this.PageImages.length) j = 0;
      }
    }
    if (I.Tabs.length > 0) {
      k = I.Tabs[I.Tabs.length - 1];
      if (k.Separator) {
        q -= k.Separator.W;
        k.w -= k.Separator.W;
      }
      k.Separator = null;
      I.h = z;
      I.w = q;
    } else K.length -= 1;
    u -= this.RowOverlap * (K.length - 1);
    j = u + z;
    for (a = 0; a < this.Pages.length; a++)
      if ((H = this.Pages[a]) && H.ControlsPanel)
        if (F) {
          if (H.ControlsPanel.Bounds.B != j) {
            H.ControlsPanel.Bounds.B = j;
            H.ControlsPanel.SetBounds();
          }
        } else if (H.ControlsPanel.Bounds.T != j) {
          H.ControlsPanel.Bounds.T = j;
          H.ControlsPanel.SetBounds();
        }
    if (F) {
      ngc_ImgBox(
        e,
        this.ID,
        "ngPages",
        0,
        this.Enabled,
        0,
        0,
        f,
        g - u,
        false,
        this.Frame
      );
      u = g;
    } else {
      ngc_ImgBox(
        e,
        this.ID,
        "ngPages",
        0,
        this.Enabled,
        0,
        u,
        f,
        g - u,
        false,
        this.Frame
      );
      u = 0;
    }
    k = new Array(K.length);
    j = P;
    for (a = 0; a < K.length; a++) {
      k[K.length - a - 1] = K[j++];
      if (j >= K.length) j = 0;
    }
    K = k;
    for (a = 0; a < K.length; a++) {
      I = K[a];
      if (!F || a > 0) I.h -= this.RowOverlap;
      if (K.length > 1 && I.Tabs.length > 0) {
        y = Math.floor((G - I.w) / I.Tabs.length);
        for (j = x = 0; j < I.Tabs.length; j++) {
          D = I.Tabs[j];
          D.tw += y;
          D.w += y;
          if (D.LeftImg) x += D.LeftImg.W;
          x += D.tw;
          if (D.RightImg) x += D.RightImg.W;
          if (D.Separator) x += D.Separator.W;
        }
        x = G - x;
        if (x > 0) {
          q = Math.floor(I.Tabs.length / x);
          if (q <= 0) q = 1;
          for (j = 0; j < I.Tabs.length && x > 0; j++) {
            D = I.Tabs[j];
            if (!(j % q)) {
              D.tw++;
              D.w++;
              x--;
            }
          }
        }
      }
      if (F) u -= I.h;
      q = this.PagesIndent;
      for (j = 0; j < I.Tabs.length; j++) {
        D = I.Tabs[j];
        if (a == K.length - 1) this.row1pages[D.Page] = true;
        x = 0;
        e.append(
          '<div style="position:absolute; left:' +
            (E ? f - q - D.w : q) +
            "px; top:" +
            u +
            'px;">'
        );
        if (E)
          if ((o = D.Separator)) {
            ngc_Img(
              e,
              o,
              "position:absolute; left: " + x + "px;",
              ngVal(o.Attrs, "")
            );
            x += o.W;
          }
        e.append('<div id="' + D.id + '" class="' + D.txtclass + '" ');
        D.Alt != "" && e.append('title="' + D.Alt + '" ');
        if (D.Enabled) {
          if (typeof this.Cursor !== "undefined")
            this.Cursor != "" &&
              e.append('style="cursor:' + this.Cursor + ';" ');
          else e.append('style="cursor:pointer;" ');
          e.append(
            ngc_PtrEventsHTML(
              this,
              "page" + D.Page,
              "tap drag" + (this.OnDblClick ? " doubletap" : "")
            ) + " "
          );
        } else e.append('style="cursor:default;" ');
        e.append(
          'onmouseover="ngpg_EnterPg(event,this);" onmouseout="ngpg_LeavePg(event,this);">'
        );
        if ((o = D.LeftImg)) {
          ngc_Img(
            e,
            o,
            "position:absolute; left: " + x + "px;",
            ngVal(o.Attrs, "")
          );
          x += o.W;
          g = x;
        } else g = 0;
        if ((o = D.MiddleImg)) {
          ngc_ImgSW(e, o, x, D.tw, "", ngVal(o.Attrs, ""));
          x += D.tw;
        }
        if ((o = D.RightImg)) {
          ngc_Img(
            e,
            o,
            "position:absolute; left: " + x + "px;",
            ngVal(o.Attrs, "")
          );
          x += o.W;
        }
        e.append(
          '<div id="' +
            D.id +
            '_T" style="position:absolute; left:' +
            g +
            "px; overflow: hidden; top:0px; width:" +
            D.tw +
            "px; text-align: " +
            this.TextAlign +
            "; white-space: nowrap;" +
            (D.th > 0 ? "line-height:" + D.th + "px;" : "") +
            '"><div class="' +
            d +
            'PageText">' +
            D.Text +
            "</div></div>"
        );
        e.append("</div>");
        if (!E)
          if ((o = D.Separator)) {
            ngc_Img(
              e,
              o,
              "position:absolute; left: " + x + "px;",
              ngVal(o.Attrs, "")
            );
            x += o.W;
          }
        e.append("</div>");
        q += x;
      }
      F || (u += I.h);
    }
  } else
    ngc_ImgBox(
      e,
      this.ID,
      "ngPages",
      0,
      this.Enabled,
      0,
      0,
      f,
      g,
      false,
      this.Frame
    );
  ng_SetInnerHTML(b, e.toString());
  return true;
}
function ngpg_DoCreate(a, b, d) {
  if (typeof a.Pages !== "undefined" && typeof this.Pages === "object") {
    var e,
      f,
      g = this.BaseClassName + "ControlsPanels";
    for (var j in a.Pages) {
      f = a.Pages[j];
      e = {};
      var k = f.Controls;
      delete f.Controls;
      ng_MergeDef(e, f);
      f.Controls = k;
      this.Pages[j] = e;
      k = {};
      k.ControlsPanel = {};
      ng_MergeDef(k.ControlsPanel, f.ControlsPanel);
      ng_MergeDef(k.ControlsPanel, a.ControlsPanel);
      ng_MergeDef(k.ControlsPanel, {
        Type: "ngPanel",
        className: g,
        id: this.ID + "_P" + j,
        ScrollBars: ssAuto,
        L: 0,
        T: 0,
        R: 0,
        B: 0,
        Data: { Visible: false }
      });
      k.ControlsPanel.Controls = f.Controls;
      k.ControlsPanel.ModifyControls = f.ModifyControls;
      if (j == this.Page) k.ControlsPanel.Data.Visible = true;
      f = ngCreateControls(k, undefined, this.ID);
      if (!ngVal(a.ParentReferences, true)) {
        (function(n, o, t) {
          n.Controls = {};
          n.Controls.Owner = t;
          n.Controls.AddControls = function(q, u) {
            ngCreateControls(q, n, ngVal(u, o));
          };
        })(e, k.ControlsPanel.id, this);
        b = e.Controls;
      }
      e.ControlsPanel = f.ControlsPanel;
      e.ControlsPanel.Owner = this;
      delete f.ControlsPanel;
      ngCloneRefs(b, f);
    }
  }
  a = document.createElement("div");
  a.id = this.ID + "_F";
  a.style.position = "absolute";
  a.style.zIndex = "800";
  d.appendChild(a);
}
function ngPages(a) {
  ngControl(this, a, "ngPages");
  this.DoCreate = ngpg_DoCreate;
  this.Page = 0;
  this.PagesVisible = true;
  this.MaxRows = this.PagesSize = this.PagesIndent = 0;
  this.PagesAlign = "left";
  this.PagesVAlign = "top";
  this.TextAlign = "center";
  this.HTMLEncode = false;
  this.Pages = [];
  this.RowOverlap = 0;
  this.PageImages = [];
  this.Frame = {};
  this.SetPage = ngpg_SetPage;
  this.GetPageById = ngpg_GetPageById;
  this.GetIdByPage = ngpg_GetIdByPage;
  this.GetPageObjById = ngpg_GetPageObjById;
  this.GetPageByText = ngpg_GetPageByText;
  this.GetPageByControl = ngpg_GetPageByControl;
  this.GetPageObjByControl = ngpg_GetPageObjByControl;
  this.SetPageByControl = ngpg_SetPageByControl;
  this.row1pages = [];
  this.ChangePageState = ngpg_ChangePageState;
  this.DoRelease = ngpg_DoRelease;
  this.DoPtrStart = ngpg_DoPtrStart;
  this.DoPtrDrag = ngpg_DoPtrDrag;
  this.DoPtrEnd = ngpg_DoPtrEnd;
  this.DoUpdate = ngpg_DoUpdate;
  this.DoPtrClick = ngpg_DoPtrClick;
  this.DoPtrDblClick = ngpg_DoPtrDblClick;
  this.OnDblClick = this.OnClick = this.OnGetAlt = this.OnGetText = this.OnPageChanged = this.OnPageChanging = null;
  ngControlCreated(this);
}
function ngtb_DoCreate(a) {
  if (typeof a.Data === "undefined") a.Data = {};
  if (ngVal(a.Data.Vertical, this.Vertical)) {
    if (
      typeof a.W === "undefined" &&
      (typeof a.L === "undefined" || typeof a.R === "undefined") &&
      typeof a.Data.AutoSize === "undefined"
    )
      this.AutoSize = true;
  } else if (
    typeof a.H === "undefined" &&
    (typeof a.T === "undefined" || typeof a.B === "undefined") &&
    typeof a.Data.AutoSize === "undefined"
  )
    this.AutoSize = true;
}
function ngtb_DoRelease(a) {
  a.style.display = "none";
}
function ngtbc_OnSetVisible(a, b) {
  if (
    !ngVal(a.ToolBarAutoUpdate, true) ||
    ngVal(a.ToolBarIgnore, false) ||
    !a.ParentControl
  )
    return true;
  if (a.ID != "") {
    var d = a.Elm();
    if (d)
      if (a.DoSetVisible) a.DoSetVisible(d, b);
      else {
        d.style.display = b ? "block" : "none";
        d.style.visibility = b ? "visible" : "hidden";
      }
  }
  if (a.Visible != b) {
    a.Visible = b;
    a.ParentControl.Update();
    a.OnVisibleChanged && a.OnVisibleChanged(a);
  }
  return false;
}
function ngtbc_DoUpdate(a) {
  var b = this.ParentControl;
  if (
    ngVal(this.ToolBarAutoUpdate, true) &&
    b &&
    !b.tb_update &&
    !ngVal(this.ToolBarIgnore, false)
  ) {
    var d = false;
    if (this.tb_indent != this.ToolBarIndent) d = true;
    else {
      var e,
        f,
        g = ngVal(this.ToolBarVPadding, b.VPadding),
        j = ngVal(this.ToolBarHPadding, b.HPadding);
      if (
        typeof this.ToolBarWidth !== "undefined" ||
        typeof this.ToolBarHeight !== "undefined"
      ) {
        e =
          typeof this.ToolBarWidth !== "undefined"
            ? this.ToolBarWidth
            : ng_OuterWidth(a);
        f =
          typeof this.ToolBarHeight !== "undefined"
            ? this.ToolBarHeight
            : ng_OuterHeight(a);
      } else {
        ng_BeginMeasureElement(a);
        e = ng_OuterWidth(a);
        f = ng_OuterHeight(a);
        ng_EndMeasureElement(a);
      }
      if (b.Vertical) f += ngVal(this.ToolBarIndent, 0);
      else e += ngVal(this.ToolBarIndent, 0);
      if (this.tb_height != f + g || this.tb_width != e + j) d = true;
    }
    if (d) {
      this.ParentControl.Update();
      return true;
    }
  }
  if (typeof this.ngc_DoUpdate === "function") return this.ngc_DoUpdate(a);
  return true;
}
function ngtb_RegisterControl(a) {
  if (!(typeof a !== "object" || !a || a.tb_fncregistered)) {
    if (a.DoUpdate != ngtbc_DoUpdate) {
      a.ngc_DoUpdate = a.DoUpdate;
      a.DoUpdate = ngtbc_DoUpdate;
      a.AddEvent(ngtbc_OnSetVisible, "OnSetVisible");
    }
    a.tb_fncregistered = true;
  }
}
function ngtb_UnreegisterControl(a) {
  if (!(typeof a !== "object" || !a)) {
    if (a.DoUpdate == ngtbc_DoUpdate) {
      if (typeof a.ngc_DoUpdate === "function") {
        a.DoUpdate = a.ngc_DoUpdate;
        delete a.ngc_DoUpdate;
      }
      a.RemoveEvent(ngtbc_OnSetVisible, "OnSetVisible");
    }
    if (typeof a.tb_fncregistered !== "undefined") a.tb_fncregistered = false;
  }
}
function ngtb_Update(a) {
  if (this.Visible) {
    for (var b = this.ParentControl; b; ) {
      if (!b.Visible) return;
      b = b.ParentControl;
    }
    if (!this.tb_update) {
      this.tb_update = true;
      a = ngVal(a, true);
      b = this.OnUpdated;
      this.OnUpdated = null;
      try {
        this.ngc_Update(a);
        this.tb_update = false;
        var d = this.Elm();
        if (d) {
          var e = this.ChildControls;
          if (typeof e !== "undefined") {
            d.style.display = this.Visible ? "block" : "none";
            if (this.AutoSize && ngIExplorer)
              if (this.Vertical) {
                if (ng_GetStylePx(d.style.width) == 0) d.style.width = "1px";
              } else if (ng_GetStylePx(d.style.height) == 0)
                d.style.height = "1px";
            var f = ng_ClientWidth(d),
              g = ng_ClientHeight(d),
              j,
              k,
              n,
              o,
              t = 0,
              q = 0,
              u = 0,
              x = 0,
              w = 0,
              y = 0,
              z,
              B,
              C,
              A,
              J,
              F = -1;
            this.tb_update = true;
            for (var E = 0; E < e.length; E++) {
              k = e[E];
              if (!ngVal(k.ToolBarIgnore, false)) {
                k.tb_fncregistered || ngtb_RegisterControl(k);
                if (k.Visible) {
                  a || k.Update(false);
                  if ((j = k.Elm())) {
                    J = ngVal(k.ToolBarHPadding, this.HPadding);
                    A = ngVal(k.ToolBarVPadding, this.VPadding);
                    if (this.Vertical && !q) J = 0;
                    if (!this.Vertical && !t) A = 0;
                    if (
                      typeof k.ToolBarWidth !== "undefined" ||
                      typeof k.ToolBarHeight !== "undefined"
                    ) {
                      n =
                        typeof k.ToolBarWidth !== "undefined"
                          ? k.ToolBarWidth
                          : ng_OuterWidth(j);
                      o =
                        typeof k.ToolBarHeight !== "undefined"
                          ? k.ToolBarHeight
                          : ng_OuterHeight(j);
                    } else {
                      ng_BeginMeasureElement(j);
                      n = ng_OuterWidth(j);
                      o = ng_OuterHeight(j);
                      ng_EndMeasureElement(j);
                    }
                    z = false;
                    if (this.Vertical) {
                      B = ngVal(k.ToolBarIndent, 0);
                      C = 0;
                      n += B;
                      if (
                        (this.Wrapable && q + o > g) ||
                        ngVal(k.ToolBarBreak, false)
                      ) {
                        t += u + J;
                        u = q = 0;
                        z = true;
                      }
                      if (n > u) u = n;
                    } else {
                      C = ngVal(k.ToolBarIndent, 0);
                      B = 0;
                      o += C;
                      if (
                        (this.Wrapable && t + n > f) ||
                        ngVal(k.ToolBarBreak, false)
                      ) {
                        q += x + A;
                        x = t = 0;
                        z = true;
                      }
                      if (o > x) x = o;
                    }
                    if (z && ngVal(k.ToolBarNoWrap, false)) {
                      for (var G = E--; E >= 0; E--) {
                        k = e[E];
                        if (
                          !(
                            ngVal(k.ToolBarIgnore, false) ||
                            !k.Visible ||
                            ngVal(k.ToolBarNoWrap, false)
                          )
                        )
                          break;
                      }
                      if (E > 0 && E != F) {
                        F = E;
                        continue;
                      }
                      E = G;
                      k = e[E];
                    }
                    if (this.HAlign == "right") k.Bounds.R = t + B;
                    else k.Bounds.L = t + B;
                    if (this.VAlign == "bottom") k.Bounds.B = q + C;
                    else k.Bounds.T = q + C;
                    k.SetBounds();
                    if (t + n > w) w = t + n;
                    if (q + o > y) y = q + o;
                    k.tb_indent = k.ToolBarIndent;
                    k.tb_width = n + J;
                    k.tb_height = o + A;
                    if (this.Vertical) q += o + A;
                    else t += n + J;
                  }
                }
              }
            }
            if (this.AutoSize) {
              e = false;
              if (this.Vertical) {
                ng_SetClientWidth(d, w);
                var D = ng_StyleWidth(d);
                if (this.Bounds.W != D) {
                  e = true;
                  this.Bounds.W = D;
                  this.SetBounds();
                }
              } else {
                ng_SetClientHeight(d, y);
                var H = ng_StyleHeight(d);
                if (this.Bounds.H != H) {
                  e = true;
                  this.Bounds.H = H;
                  this.SetBounds();
                }
              }
              if (
                ngIExplorer6 &&
                e &&
                (this.HAlign == "right" || this.VAlign == "bottom")
              )
                this.ngc_Update(a);
            }
            this.tb_update = false;
            (this.OnUpdated = b) && this.OnUpdated(this, d);
          }
        }
      } finally {
        this.OnUpdated = b;
      }
    }
  }
}
function ngToolBar(a) {
  ngControl(this, a, "ngToolBar");
  this.Vertical = this.AutoSize = false;
  this.HPadding = this.VPadding = 0;
  this.VAlign = "top";
  this.HAlign = "left";
  this.Wrapable = true;
  this.CtrlBringToFront = ngc_CtrlBringToFront;
  this.CtrlSendToBack = ngc_CtrlSendToBack;
  this.CtrlInsertAfter = ngc_CtrlInsertAfter;
  this.CtrlInsertBefore = ngc_CtrlInsertBefore;
  this.DoCreate = ngtb_DoCreate;
  this.DoRelease = ngtb_DoRelease;
  this.ngc_Update = this.Update;
  this.Update = ngtb_Update;
  ngControlCreated(this);
}
function npb_DoUpdate(a) {
  var b = this.process_cnt ? 25 : this.Position;
  if (b < 0) b = 0;
  if (b > 100) b = 100;
  var d = new ngStringBuilder(),
    e,
    f;
  if (ngIExplorer && ng_GetStylePx(a.style.height) == 0) a.style.height = "1px";
  var g = ng_ClientWidth(a),
    j = 0,
    k = 0,
    n = 0;
  if ((e = this.LeftImg)) {
    f = ngc_ImgProps(this.ID + "_IL", 0, this.Enabled, e);
    ngc_Img(d, f, "position:absolute; left: 0px;", ngVal(e.Attrs, ""));
    k = f.W;
    if (f.H > j) j = f.H;
  }
  if ((e = this.RightImg)) {
    f = ngc_ImgProps(this.ID + "_IR", 0, this.Enabled, e);
    ngc_Img(
      d,
      f,
      "position:absolute; left: " + (g - f.W) + "px;",
      ngVal(e.Attrs, "")
    );
    n = f.W;
    if (f.H > j) j = f.H;
  }
  g = g - k - n;
  if ((e = this.MiddleImg)) {
    f = ngc_ImgProps(this.ID + "_IM", 0, this.Enabled, e);
    ngc_ImgSW(d, f, k, g, "", ngVal(e.Attrs, ""));
    if (f.H > j) j = f.H;
  }
  if ((e = this.BarImg)) {
    f = ngc_ImgProps(this.ID + "_B", 0, this.Enabled, e);
    if (f.H > 0) {
      n = f.W;
      if (typeof n === "undefined") n = Math.floor((g + 9) / 10);
      if (b == 100) b = g;
      else {
        b = g * b / 100;
        if (!this.Smooth || this.process_cnt) {
          b /= n;
          b = Math.round(b);
          b *= n;
        }
        b = Math.round(b);
        if (b > g) b = g;
      }
      ngc_ImgSW(d, f, k, b, "", ngVal(e.Attrs, ""));
      if (f.H > j) j = f.H;
    }
  }
  ng_SetClientHeight(a, j);
  b = ng_StyleHeight(a);
  if (this.Bounds.H != b) {
    this.Bounds.H = b;
    this.SetBounds();
  }
  ng_SetInnerHTML(a, d.toString());
  return true;
}
function npb_SetPosition(a) {
  if (a != this.Position) {
    this.Position = a;
    this.process_cnt || this.Update();
  }
}
function npb_UpdateProcess(a) {
  if ((a = ngGetControlById(a, "ngProgressBar"))) {
    a.process_timer && clearTimeout(a.process_timer);
    a.process_timer = null;
    var b = a.Elm();
    if (b) {
      var d,
        e = 0,
        f = ng_ClientWidth(b);
      if ((d = a.LeftImg)) {
        d = ngc_ImgProps(a.ID + "_IL", 0, a.Enabled, d);
        e = d.W;
        f -= d.W;
      }
      if ((d = a.RightImg)) {
        d = ngc_ImgProps(a.ID + "_IR", 0, a.Enabled, d);
        f -= d.W;
      }
      if ((d = a.BarImg)) {
        d = ngc_ImgProps(a.ID + "_B", 0, a.Enabled, d);
        b = a.process_pos;
        var g = f / 10;
        if (g <= 0) g = 1;
        b += g * a.process_dir;
        g = d.W;
        if (typeof g === "undefined") g = Math.floor((f + 9) / 10);
        var j = f / 4;
        j = Math.round(j / g);
        j *= g;
        if (b > f - j) {
          b = f - j;
          a.process_dir *= -1;
        }
        if (b < 0) {
          b = 0;
          a.process_dir *= -1;
        }
        b = a.process_dir == 1 ? Math.ceil(b) : Math.floor(b);
        a.process_pos = b;
        f = a.ID + "_B_";
        e += b;
        for (g = 1; g < 100; g++) {
          b = document.getElementById(f + g);
          if (!b) break;
          ng_setLeftTop(b, e, 0);
          e += d.W;
        }
        a.process_timer = setTimeout("npb_UpdateProcess('" + a.ID + "')", 120);
      }
    }
  }
}
function npb_BeginProcess() {
  this.process_cnt++;
  if (this.process_cnt == 1) {
    this.Update();
    this.process_pos = 0;
    this.process_dir = 1;
    this.process_timer = setTimeout(
      "npb_UpdateProcess('" + this.ID + "')",
      120
    );
  }
}
function npb_EndProcess() {
  this.process_cnt--;
  if (this.process_cnt <= 0) {
    this.process_timer && clearTimeout(this.process_timer);
    this.process_timer = null;
    this.process_cnt = 0;
    this.Update();
  }
}
function npb_DoDispose() {
  this.process_timer && clearTimeout(this.process_timer);
  this.process_timer = null;
  return true;
}
function ngpb_OnVisibleChanged(a) {
  if (a.Visible) {
    if (this.process_cnt > 0)
      this.process_timer = setTimeout(
        "npb_UpdateProcess('" + this.ID + "')",
        120
      );
  } else {
    this.process_timer && clearTimeout(this.process_timer);
    this.process_timer = null;
  }
}
function ngProgressBar(a) {
  ngControl(this, a, "ngProgressBar");
  this.DoDispose = npb_DoDispose;
  this.OnVisibleChanged = ngpb_OnVisibleChanged;
  this.Position = 0;
  this.Smooth = false;
  this.BarImg = this.RightImg = this.MiddleImg = this.LeftImg = null;
  this.SetPosition = npb_SetPosition;
  this.process_cnt = 0;
  this.process_timer = null;
  this.BeginProcess = npb_BeginProcess;
  this.EndProcess = npb_EndProcess;
  this.DoUpdate = npb_DoUpdate;
  ngControlCreated(this);
}
function ngwb_DoCreate(a, b, d) {
  ng_SetInnerHTML(
    d,
    '<iframe src="' +
      (ngIExplorer && ngIExplorerVersion < 8 ? "javascript:" : "about:blank") +
      '" id="' +
      this.ID +
      '_F" style="position: absolute;" frameborder="0" allowtransparency="yes"></iframe>'
  );
}
function ngwb_DoUpdate(a) {
  var b = this.GetBrowser();
  if (!b) return true;
  var d = ng_ClientWidth(a);
  a = ng_ClientHeight(a);
  ng_SetClientWidth(b, d);
  ng_SetClientHeight(b, a);
  d = this.GetURL();
  if (b.src != this.opened_url) {
    b.src = d;
    this.opened_url = b.src;
  }
  return true;
}
function ngwb_SetURL(a) {
  if (!(this.OnSetURL && !ngVal(this.OnSetURL(this, a), false))) {
    this.URL = a;
    var b = this.GetBrowser();
    if (b) {
      b.src = a;
      this.opened_url = b.src;
    }
  }
}
function ngwb_GetURL() {
  var a = this.URL;
  if (this.OnGetURL) a = this.OnGetURL(this, a);
  return a;
}
function ngwb_GetBrowser() {
  return document.getElementById(this.ID + "_F");
}
function ngwb_GetDocument() {
  var a = this.GetBrowser();
  if (!a) return null;
  try {
    return a.contentDocument ? a.contentDocument : a.contentWindow.document;
  } catch (b) {
    return null;
  }
}
function ngwb_SetHTML(a, b) {
  if (this.OnSetHTML) {
    a = this.OnSetHTML(this, a);
    if (a == "") return;
  }
  this.opened_url != "" && this.SetURL("about:blank");
  var d = this.GetDocument();
  if (d)
    try {
      d.open();
      if (typeof a === "object") {
        if (a) for (var e in a) d.write(a[e]);
      } else d.write(a);
      d.close();
      return;
    } catch (f) {}
  if (ngVal(b, true)) {
    var g = this;
    this.set_html_timeout = setTimeout(function() {
      g.set_html_timeout && clearTimeout(g.set_html_timeout);
      g.set_html_timeout = null;
      g.SetHTML(a, false);
    }, 200);
  }
}
function ngWebBrowser(a) {
  ngControl(this, a, "ngWebBrowser");
  this.DoCreate = ngwb_DoCreate;
  this.DoUpdate = ngwb_DoUpdate;
  this.URL = "";
  this.SetURL = ngwb_SetURL;
  this.GetURL = ngwb_GetURL;
  this.SetHTML = ngwb_SetHTML;
  this.GetBrowser = ngwb_GetBrowser;
  this.GetDocument = ngwb_GetDocument;
  this.OnSetHTML = this.OnGetURL = this.OnSetURL = null;
  ngControlCreated(this);
}
if (typeof ngc_Lang === "undefined") ngc_Lang = [];
if (typeof ngc_Lang.en === "undefined") ngc_Lang.en = [];
ngc_Lang.en.mbOK = "OK";
ngc_Lang.en.mbCancel = "Cancel";
ngc_Lang.en.mbYes = "Yes";
ngc_Lang.en.mbNo = "No";
ngc_Lang.en.ngAbout = "About";
ngc_Lang.en.ngAboutVersion = "Version %s";
ngc_Lang.en.ngAboutBrowser = "Browser: %s";
ngc_Lang.en.ngAboutWindow = "Window: %s";
ngc_Lang.en.ngAboutLanguage = "Language: %s";
ngc_Lang.en.ngAboutUserControls = "User Controls: %s";
ngc_Lang.en.ngAboutSystemInfo = "System Info";
ngc_Lang.en.ngAboutComponents = "Used Components";
ngc_Lang.en.ngAboutLibraries = "Libraries";
ngc_Lang.en.ngAboutTrademarks = "Legal Trademarks";
ngc_Lang.en.ngAboutReleaseNotes = "Release Notes";
if (typeof ngc_Lang.cz === "undefined") ngc_Lang.cz = [];
ngc_Lang.cz.mbOK = "OK";
ngc_Lang.cz.mbCancel = "Storno";
ngc_Lang.cz.mbYes = "Ano";
ngc_Lang.cz.mbNo = "Ne";
ngc_Lang.cz.ngAbout = "O aplikaci";
ngc_Lang.cz.ngAboutVersion = "Verze %s";
ngc_Lang.cz.ngAboutBrowser = "Prohl\u00ed\u017ee\u010d: %s";
ngc_Lang.cz.ngAboutWindow = "Okno: %s";
ngc_Lang.cz.ngAboutLanguage = "Jazyk: %s";
ngc_Lang.cz.ngAboutSystemInfo = "Syst\u00e9mov\u00e9 informace";
ngc_Lang.cz.ngAboutComponents = "Pou\u017eit\u00e9 komponenty";
ngc_Lang.cz.ngAboutLibraries = "Knihovny";
ngc_Lang.cz.ngAboutTrademarks = "Ochrann\u00e9 zn\u00e1mky";
ngc_Lang.cz.ngAboutReleaseNotes = "Pozn\u00e1mky k verzi";
if (typeof ngc_Lang.sk === "undefined") ngc_Lang.sk = [];
ngc_Lang.sk.mbOK = "OK";
ngc_Lang.sk.mbCancel = "Storno";
ngc_Lang.sk.mbYes = "\u00c1no";
ngc_Lang.sk.mbNo = "Nie";
ngc_Lang.sk.ngAbout = "O aplik\u00e1cii";
ngc_Lang.sk.ngAboutVersion = "Verzia %s";
ngc_Lang.sk.ngAboutBrowser = "Prehliada\u010d: %s";
ngc_Lang.sk.ngAboutWindow = "Okno: %s";
ngc_Lang.sk.ngAboutLanguage = "Jazyk: %s";
ngc_Lang.sk.ngAboutSystemInfo = "Syst\u00e9mov\u00e9 inform\u00e1cie";
ngc_Lang.sk.ngAboutComponents = "Pou\u017eit\u00e9 komponenty";
ngc_Lang.sk.ngAboutLibraries = "Kni\u017enice";
ngc_Lang.sk.ngAboutTrademarks = "Ochrann\u00e9 zn\u00e1mky";
ngc_Lang.sk.ngAboutReleaseNotes = "Pozn\u00e1mky k verzii";
var mbNone = 0,
  mbCancel = 1,
  mbOK = 2,
  mbYes = 4,
  mbNo = 8,
  mbDefButton1 = 256,
  mbDefButton2 = 512,
  mbDefButton3 = 768,
  mbDefButton4 = 1024,
  mbDefButtonMask = mbDefButton1 | mbDefButton2 | mbDefButton3 | mbDefButton4,
  mbMinimalWidth = 180,
  mbMinimalHeight = 0;
function ngMessageDlg(a, b, d, e, f) {
  if (typeof f === "undefined") f = {};
  ng_MergeDef(f, {
    DlgLangTxt: true,
    DlgHtmlEncode: true,
    DlgShowDialog: true,
    Type: a,
    Data: { Text: d },
    Events: { OnClose: e },
    Controls: { Message: { Data: { Text: b } } }
  });
  if (f.DlgLangTxt) {
    if (typeof d !== "undefined") d = ngTxt(d);
    if (typeof b !== "undefined") b = ngTxt(b);
  }
  if (f.DlgHtmlEncode) {
    ng_htmlEncode(d);
    b = ng_htmlEncode(b);
    b.replace(/\n/g, "<br/>");
  }
  (a = ngCreateWindow(f)) && f.DlgShowDialog && a.Show();
  return a;
}
function dlgbx_BtnClick(a) {
  a = a.Owner;
  if (typeof a.DialogResult !== "undefined") {
    a.Owner.Owner.DialogResult = a.DialogResult;
    a.Owner.Owner.Close();
  }
}
function dlgbx_Center() {
  var a = this.Elm();
  if (a) {
    var b = a.offsetParent;
    if (b && b == document.body) b = null;
    a = b ? ng_ClientWidth(b) : ng_WindowWidth();
    b = b ? ng_ClientHeight(b) : ng_WindowHeight();
    var d = this.Bounds;
    d.L = Math.round((a - d.W) / 2);
    d.T = Math.round(0.4 * b - d.H / 2);
    if (d.T < 0) d.T = 0;
    this.SetBounds();
  }
}
function dlgbx_CalcAutoSize() {
  if (ngVal(this.ControlsPanel, false)) {
    var a = this.Elm();
    if (a) {
      var b = a.offsetParent;
      if (b && b == document.body) b = null;
      var d = b ? ng_ClientWidth(b) : ng_WindowWidth();
      b = b ? ng_ClientHeight(b) : ng_WindowHeight();
      var e = ng_OuterWidth(a) - ng_ClientWidth(this.ControlsPanel.Elm());
      ng_SetClientWidth(a, d);
      ng_SetClientHeight(a, b);
      var f = 0,
        g = 0,
        j = 0,
        k = 0,
        n = 0,
        o = ngVal(this.Controls.Message, null),
        t = ngVal(this.Controls.Content, null),
        q = ngVal(this.Controls.Buttons, null),
        u = ngVal(this.Controls.Footnote, null),
        x = this.ControlsPanel.ChildControls;
      if (typeof x !== "undefined") {
        n = k = 1e4;
        for (var w, y = 0; y < x.length; y++)
          if (x[y] != q) {
            a = x[y].Elm();
            w = ng_GetCurrentStylePx(a, "left");
            if (w < k) k = w;
            if (x[y] != t) {
              a = ng_GetCurrentStylePx(a, "top");
              if (a < n) n = a;
            }
          }
      }
      if ((a = o ? o.Elm() : null) && o.Visible) {
        f = ng_GetCurrentStylePx(a, "left");
        g = ng_OuterWidth(a);
        if (f + g + k + e > d) {
          g = d - e - k - f;
          o.AutoSizeMode = "vertical";
          o.SetBounds({ W: g });
          o.Update(false);
        }
        f = f + g;
        g = ng_GetCurrentStylePx(a, "top") + ng_OuterHeight(a);
      }
      if ((a = t ? t.Elm() : null) && t.Visible) {
        t.SetBounds({ T: g });
        g += ng_OuterHeight(a);
      }
      if ((a = q ? q.Elm() : null)) {
        x = q.ChildControls;
        if (q.Visible && typeof x !== "undefined" && x.length > 0) {
          j = ng_OuterWidth(a);
          if (q.CenterButtons) {
            a.style.marginLeft = -Math.round(j / 2) + "px";
            q.SetBounds({ L: "50%", T: g });
          } else q.SetBounds({ T: g });
          g += ng_OuterHeight(a);
          q.SetVisible(true);
        } else q.SetVisible(false);
      }
      if ((a = u ? u.Elm() : null) && u.Visible) {
        u.SetBounds({ T: g });
        g += ng_OuterHeight(a);
      }
      if (f < j) f = j + 2 * k;
      else f += k;
      g += n;
      if (f < mbMinimalWidth) f = mbMinimalWidth;
      if (g < mbMinimalHeight) g = mbMinimalHeight;
      this.SetClientRect({
        W: f,
        H: g
      });
      if (this.Bounds.W > d) this.Bounds.W = d;
      if (this.Bounds.H > b) this.Bounds.H = b;
      if (this.Bounds.W < this.MinWidth) this.MinWidth = this.Bounds.W;
      if (this.Bounds.H < this.MinHeight) this.MinHeight = this.Bounds.H;
      this.SetBounds();
      this.Update();
    }
  }
}
function ngAboutBrowser() {
  var a = "";
  if (ngIExplorer) {
    a = "Internet Explorer " + ngIExplorerVersion;
    if (ngIExplorer6 && ngIE6AlignFix) a += " (align fix)";
  }
  if (ngFireFox)
    a = ngFireFox1x ? "FireFox 1.x" : ngFireFox2x ? "FireFox 2.x" : "FireFox";
  if (ngOpera) a = "Opera" + ngOperaVersion;
  if (ngSafari) a = "Safari";
  if (ngChrome) a = "Chrome";
  if (a == "") {
    a = navigator.userAgent;
    var b = a.indexOf("(");
    if (b >= 0) a = a.substr(0, b);
  }
  return a;
}
if (typeof ngUserControls === "undefined") ngUserControls = [];
ngUserControls.dialogs = {
  OnInit: function() {
    ngRegisterControlType("ngMessageDlg", function(a, b, d) {
      ng_MergeDef(a, {
        DialogType: "ngWindow",
        W: 200,
        H: 150,
        CloseBtn: false,
        Data: {
          DialogResult: mbNone,
          AutoSize: true,
          Centered: true,
          Visible: false,
          Sizeable: false,
          Modal: true,
          DisposeOnClose: true,
          Center: dlgbx_Center,
          CalcAutoSize: dlgbx_CalcAutoSize
        },
        Controls: {
          Message: { Type: "ngText", L: 15, T: 15, Data: { AutoSize: true } },
          Content: { Type: "ngPanel", L: 15, R: 15, H: 15 },
          Buttons: {
            Type: "ngToolBar",
            H: 23,
            Data: {
              CenterButtons: true,
              Vertical: true,
              AutoSize: true,
              HPadding: 10
            },
            Controls: {
              OK: {
                Type: "ngButton",
                W: 80,
                Data: { ngText: "mbOK", Default: true, DialogResult: mbOK }
              },
              Yes: {
                Type: "ngButton",
                W: 80,
                Data: { ngText: "mbYes", Default: true, DialogResult: mbYes }
              },
              No: {
                Type: "ngButton",
                W: 80,
                Data: { ngText: "mbNo", DialogResult: mbNo }
              },
              Cancel: {
                Type: "ngButton",
                W: 80,
                Data: {
                  ngText: "mbCancel",
                  Cancel: true,
                  DialogResult: mbCancel
                }
              }
            }
          }
        }
      });
      var e,
        f = a.Controls.Buttons.Controls,
        g = a.Controls.Buttons.Data.HAlign === "right" ? true : false,
        j = 0;
      a.DlgButtons = ngVal(a.DlgButtons, mbOK);
      a.DlgButtons & mbOK || delete f.OK;
      a.DlgButtons & mbYes || delete f.Yes;
      a.DlgButtons & mbNo || delete f.No;
      a.DlgButtons & mbCancel || delete f.Cancel;
      if (g) {
        for (var k in f) j++;
        var n = [];
        for (var o in f) n.push(o);
        o = {};
        for (var t = n.length - 1; t >= 0; t--) o[n[t]] = f[n[t]];
        f = o;
        a.Controls.Buttons.Controls = o;
      }
      n = a.DlgButtons & mbDefButtonMask;
      switch (n) {
        case mbDefButton1:
          n = !g ? 1 : j;
          break;
        case mbDefButton2:
          n = !g ? 2 : j - 1;
          break;
        case mbDefButton3:
          n = !g ? 3 : j - 2;
          break;
        case mbDefButton4:
          n = !g ? 4 : j - 3;
          break;
        default:
          n = -1;
          break;
      }
      var q = undefined;
      j = 0;
      for (k in f) {
        e = f[k];
        j++;
        if (typeof e.Data === "undefined") e.Data = {};
        if (n != -1)
          if (j == n) {
            e.Data.Default = true;
            if (typeof e.Data.Cancel !== "undefined") e.Data.Cancel = false;
          } else if (typeof e.Data.Default !== "undefined")
            e.Data.Default = undefined;
        if (typeof e.Data.DialogResult !== "undefined") {
          if (!e.Data.OnClick) e.Data.OnClick = dlgbx_BtnClick;
          if (e.Data.DialogResult == mbCancel) {
            a.Data.DialogResult = mbCancel;
            a.CloseBtn = true;
            q = mbNone;
          }
          if (typeof q === "undefined") q = e.Data.DialogResult;
          else if (q != e.Data.DialogResult) q = mbNone;
        }
      }
      if (j == 1) {
        if (typeof e.Data.Default === "undefined") e.Data.Default = true;
        if (typeof e.Data.Cancel === "undefined") e.Data.Cancel = true;
      }
      if (ngVal(q, mbNone) != mbNone) {
        a.Data.DialogResult = q;
        a.CloseBtn = true;
      }
      if (a.DialogType == "ngMessageDlg") a.DialogType = "ngWindow";
      var u = ngCreateControlAsType(a, a.DialogType, b, d);
      if (!u) return u;
      u.CloseButton &&
        u.CloseButton.AddEvent(function() {
          u.DialogResult = ngVal(q, mbNone) != mbNone ? q : mbCancel;
        }, "OnClick");
      return u;
    });
    ngRegisterControlType("ngAboutDlg", function(a, b, d) {
      function e(u, x) {
        if (typeof u === "object" && u && u.length > 0) {
          x.Collapsed = true;
          if (!ngVal(x.Visible, true)) x.Visible = true;
          if (typeof x.Items === "undefined") x.Items = [];
          for (var w = 0; w < u.length; w++)
            x.Items[x.Items.length] =
              typeof u[w] === "string" ? { Text: u[w] } : u[w];
        }
      }
      var f = ngTxt("ngAppName", document.title),
        g = ngVal(ngApp.StartParams, null);
      g = g ? ngVal(g.Version, "") : "";
      var j = ngTxt("ngAppCopyright", "");
      if (g != "") {
        var k = g.indexOf(".");
        if (k < 0) g += ".0";
        g = ng_sprintf(ngTxt("ngAboutVersion"), g);
      }
      ng_MergeDef(a, {
        DialogType: "ngMessageDlg",
        DlgButtons: mbOK,
        AboutSystemInfo: null,
        AboutComponents: null,
        AboutLibraries: null,
        AboutTrademarks: null,
        AboutReleaseNotes: null,
        Data: {
          AppName: f,
          AppVersion: g,
          AppCopyright: j,
          AppText: "",
          ngText: "ngAbout"
        },
        Controls: {
          Message: {
            Data: { MinWidth: 260 },
            Events: {
              OnGetText: function(u) {
                u = u.ParentControl.ParentControl;
                var x = "<b>" + u.AppName + "</b>";
                if (u.AppVersion != "")
                  x += "<br /><i>" + u.AppVersion + "</i>";
                if (u.AppCopyright != "") x += "<br />&nbsp;<br />" + j;
                if (u.AppText != "") x += "<br />&nbsp;<br />" + u.AppText;
                return x;
              }
            }
          },
          Content: {
            H: 125,
            Controls: {
              AppInfo: {
                Type: "ngList",
                L: 0,
                T: 20,
                R: 0,
                H: 90,
                Data: {
                  Items: [
                    {
                      id: "SystemInfo",
                      Text: "<b>" + ngTxt("ngAboutSystemInfo") + "</b>",
                      Collapsed: true
                    },
                    {
                      id: "Components",
                      Text: "<b>" + ngTxt("ngAboutComponents") + "</b>",
                      Collapsed: true
                    },
                    {
                      id: "Libraries",
                      Text: "<b>" + ngTxt("ngAboutLibraries") + "</b>",
                      Visible: false
                    },
                    {
                      id: "Trademarks",
                      Text: "<b>" + ngTxt("ngAboutTrademarks") + "</b>",
                      Visible: false
                    },
                    {
                      id: "ReleaseNotes",
                      Text: "<b>" + ngTxt("ngAboutReleaseNotes") + "</b>",
                      Visible: false
                    }
                  ]
                },
                Events: {
                  OnClick: function(u) {
                    if (
                      u.listPart == 1 &&
                      typeof u.listItem.Collapsed !== "undefined"
                    ) {
                      u.list.ToggleCollapsed(u.listItem);
                      var x = u.list.Elm(),
                        w = u.listObj;
                      if (x && w && !u.listItem.Collapsed) {
                        u = ng_ClientHeight(x);
                        if (w.offsetTop > x.scrollTop + u / 2)
                          x.scrollTop = w.offsetTop;
                      }
                    }
                    return true;
                  }
                }
              }
            }
          },
          Buttons: { R: 15, Data: { CenterButtons: false } }
        }
      });
      g = "";
      f = [];
      for (k in ngc_Lang) f[f.length] = k;
      if (f.length > 0) {
        f.sort();
        for (k = 0; k < f.length; k++)
          if (f[k] != ngApp.Lang) {
            if (g != "") g += ", ";
            g += f[k];
          }
        g = " (" + g + ")";
      } else g = "none";
      var n = ng_WindowWidth() + "x" + ng_WindowHeight();
      f = a.Controls.Content.Controls.AppInfo.Data.Items;
      f[0].Collapsed = true;
      f[0].Items = [
        ng_sprintf(ngTxt("ngAboutBrowser"), ngAboutBrowser()),
        ng_sprintf(ngTxt("ngAboutWindow"), n),
        ng_sprintf(ngTxt("ngAboutLanguage"), ngApp.Lang + g)
      ];
      e(a.AboutSystemInfo, f[0]);
      f[1].Collapsed = true;
      f[1].Items = [
        {
          Text:
            "Controls v" +
            ngControlsVersion +
            "<br /><small>" +
            ngControlsCopyright +
            "</small>"
        }
      ];
      if (typeof ngMapAPIVersion !== "undefined") {
        g = f[1].Items.length;
        n = ngVal(ngMapAPICopyright, "");
        f[1].Items[g] = {
          Text:
            "ngMapAPI v" + ngMapAPIVersion + "<br /><small>" + n + "</small>"
        };
      }
      if (typeof ngUserControls !== "undefined") {
        g = [];
        for (k in ngUserControls) g[g.length] = k;
        if (g.length > 0) {
          n = "";
          var o, t, q;
          g.sort();
          for (k = 0; k < g.length; k++) {
            if (k > 0) n += ", ";
            if ((o = ngUserControls[g[k]])) {
              q = ngVal(o.Version, "");
              q += ngVal(o.SubVersion, q != "" ? ".0" : "");
              t = ngVal(o.Copyright, "");
              o = ngVal(o.Name, t != "" ? g[k] : "");
              if (o != "") {
                if (q != "") o += " v" + q;
                if (t != "") o += "<br /><small>" + t + "</small>";
                f[1].Items[f[1].Items.length] = { Text: o };
              }
            }
            n += g[k];
          }
          f[1].Items[0].Collapsed = true;
          f[1].Items[0].Items = [
            { Text: ng_sprintf(ngTxt("ngAboutUserControls"), n) }
          ];
        }
      }
      e(a.AboutComponents, f[1]);
      if (typeof ngLib !== "undefined") {
        f[2].Collapsed = true;
        f[2].Items = [];
        f[2].Visible = f[2].Visible || !ng_EmptyVar(ngLib);
        g = f[2].Items;
        for (k in ngLib) {
          n = k;
          t = typeof ngLib[k] === "object" ? ngVal(ngLib[k].version, "") : "";
          if (t != "") n += " v" + t;
          g[g.length] = { Text: n };
        }
      }
      e(a.AboutLibraries, f[2]);
      e(a.AboutTrademarks, f[3]);
      e(a.AboutReleaseNotes, f[4]);
      if (a.DialogType == "ngAboutDlg") a.DialogType = "ngMessageDlg";
      return ngCreateControlAsType(a, a.DialogType, b, d);
    });
  }
};
var nglUnchecked = 0,
  nglChecked = 1,
  nglGrayed = 2,
  nglSelectNone = 0,
  nglSelectSingle = 1,
  nglSelectMulti = 2,
  nglSelectMultiExt = 3,
  nglClickRow = 0,
  nglClickText = 1,
  nglClickCheckImg = 2,
  nglClickTreeImg = 3,
  nglClickItemImg = 4,
  nglSortAsc = 0,
  nglSortDesc = 1,
  ngl_LeaveListTimer = null,
  ngl_CurrentRowId = "",
  ngl_FocusTime = 0;
function ngl_BeginUpdate() {
  this.update_cnt++;
}
function ngl_EndUpdate() {
  this.update_cnt--;
  if (this.update_cnt <= 0) {
    this.update_cnt = 0;
    this.need_update && this.Update();
  }
}
function ngl_do_add(a, b, d) {
  this.need_update = true;
  if (typeof b === "undefined") return false;
  a != this && ng_SetByRef(b, "Parent", a);
  if (this.OnAdd && !ngVal(this.OnAdd(this, b, d), false)) {
    delete b.Parent;
    return false;
  }
  a = this.GetItemAction(b);
  this.SyncItemAction(b, a);
  if (!a && typeof b.RadioGroup !== "undefined" && ngVal(b.Checked, 0))
    this.radio_groups[b.RadioGroup] = b;
  typeof b.Checked !== "undefined" &&
    b.Checked != 0 &&
    b.Checked != false &&
    this.CheckChanged();
  return true;
}
function ngl_Add(a, b) {
  var d = b;
  if (typeof d === "undefined" || d === null) d = this;
  if (typeof a === "string") {
    var e = {};
    e.Text = a;
    a = e;
  }
  if (typeof d.Items === "undefined") d.Items = [];
  if (!this.do_add(d, a, b)) return -1;
  b = d.Items.length;
  d.Items[b] = a;
  if (typeof a.Items !== "undefined") {
    d = a.Items;
    delete a.Items;
    for (var f in d) this.Add(d[f], a);
  }
  return b;
}
function ngl_AddItems(a, b) {
  if (a) {
    this.BeginUpdate();
    for (var d in a) this.Add(a[d], b);
    this.EndUpdate();
  }
}
function ngl_SetItems(a) {
  this.BeginUpdate();
  this.Clear();
  this.AddItems(a);
  this.EndUpdate();
}
function ngl_Insert(a, b, d) {
  var e = d;
  if (typeof e === "undefined" || e === null) e = this;
  if (typeof b === "string") {
    var f = {};
    f.Text = b;
    b = f;
  }
  if (typeof e.Items === "undefined") e.Items = [];
  if (!this.do_add(e, b, d)) return -1;
  if (a < 0) a = 0;
  if (a > e.Items.length) a = e.Items.length;
  e.Items.splice(a, 0, b);
  if (typeof b.Items !== "undefined") {
    d = b.Items;
    delete b.Items;
    for (var g in d) this.Add(d[g], b);
  }
  return a;
}
function ngl_Replace(a, b, d) {
  var e = d;
  if (typeof e === "undefined" || e === null) e = this;
  if (typeof e.Items === "undefined" || a < 0 || a > e.Items.length)
    return null;
  if (!this.do_add(e, b, d)) return null;
  var f = null;
  if (a < e.Items.length) {
    f = e.Items[a];
    this.do_remove(f, d);
  }
  e.Items[a] = b;
  if (typeof b.Items !== "undefined") {
    a = b.Items;
    delete b.Items;
    for (var g in a) this.Add(a[g], b);
  }
  return f;
}
function ngl_IndexOf(a, b) {
  b = b;
  if (typeof b === "undefined" || b === null) b = this;
  if (typeof b.Items !== "undefined")
    for (var d = 0; d < b.Items.length; d++) if (b.Items[d] == a) return d;
  return -1;
}
function ngl_do_remove(a, b) {
  if (typeof a !== "undefined") {
    this.need_update = true;
    this.SelCount > 0 && this.SelectItem(a, false);
    if (
      typeof a.RadioGroup !== "undefined" &&
      typeof this.radio_groups[a.RadioGroup] !== "undefined" &&
      this.radio_groups[a.RadioGroup] == a
    )
      this.radio_groups[a.RadioGroup] = null;
    typeof a.Checked !== "undefined" &&
      a.Checked != 0 &&
      a.Checked != false &&
      this.CheckChanged();
    this.OnRemove && this.OnRemove(this, a, b);
    a.Parent = null;
    if (
      typeof a.Controls !== "undefined" &&
      typeof this.ItemsControls !== "undefined"
    )
      if (this.Columns.length > 0)
        for (var d, e, f = 0; f < this.Columns.length; f++) {
          b = this.Columns[f].ID;
          if (typeof a.Controls[b] !== "undefined") {
            d = a.Controls[b];
            for (var g in d)
              if (!(g == "Owner" || g == "Parent")) {
                e = d[g];
                this.RemoveItemControl(e);
                e && typeof e.Dispose === "function" && e.Dispose();
              }
            delete a.Controls[b];
          }
        }
      else
        for (g in a.Controls)
          if (!(g == "Owner" || g == "Parent")) {
            e = a.Controls[g];
            this.RemoveItemControl(e);
            e && typeof e.Dispose === "function" && e.Dispose();
          }
    a.Controls && delete a.Controls;
  }
}
function ngl_Remove(a, b) {
  var d = b;
  if (typeof d === "undefined" || d === null) d = this;
  if (typeof d.Items === "undefined") return -1;
  for (var e = -1, f = 0; f < d.Items.length; f++)
    if (d.Items[f] == a) {
      e = f;
      break;
    }
  if (e >= 0) {
    this.do_remove(a, b);
    d.Items.splice(e, 1);
  }
  return e;
}
function ngl_Delete(a, b) {
  var d = b;
  if (typeof d === "undefined" || d === null) d = this;
  if (typeof d.Items === "undefined" || a < 0 || a >= d.Items.length)
    return null;
  var e = d.Items[a];
  this.do_remove(e, b);
  d.Items.splice(a, 1);
  return e;
}
function ngl_GetPath(a, b, d, e, f) {
  a = a;
  if (typeof a === "undefined" || a === null) a = this;
  var g = "";
  d = ngVal(d, true);
  e = ngVal(e, null);
  if (this.Columns.length > 0) g = this.Columns[0].ID;
  this.BeginUpdate();
  try {
    for (var j = 0, k, n, o, t, q = 0; q <= b.length; q++)
      if (!(q != b.length && b.charAt(q) != "\\")) {
        k = b.substr(j, q - j);
        if (k != "") {
          if (k.charAt(0) == "$") {
            t = true;
            k = k.substr(1, k.length - 1);
          } else t = false;
          n = null;
          if (a && typeof a.Items !== "undefined")
            if (this.Columns.length > 0)
              if (t)
                for (var u = 0; u < a.Items.length; u++) {
                  if (a.Items[u].ngText[g] == k) {
                    n = a.Items[u];
                    break;
                  }
                }
              else
                for (u = 0; u < a.Items.length; u++) {
                  if (a.Items[u].Text[g] == k) {
                    n = a.Items[u];
                    break;
                  }
                }
            else if (t)
              for (u = 0; u < a.Items.length; u++) {
                if (a.Items[u].ngText == k) {
                  n = a.Items[u];
                  break;
                }
              }
            else
              for (u = 0; u < a.Items.length; u++)
                if (a.Items[u].Text == k) {
                  n = a.Items[u];
                  break;
                }
          if (n) a = n;
          else if (d && a) {
            o = new ngListItem();
            if (this.Columns.length > 0)
              if (t) {
                o.ngText = {};
                o.Text = {};
                o.ngText[g] = k;
                o.Text[g] = ngTxt(k);
              } else {
                o.Text = {};
                o.Text[g] = k;
              }
            else if (t) {
              o.ngText = k;
              o.Text = ngTxt(k);
            } else o.Text = k;
            if (e && !ngVal(e(this, a, o, f), false)) {
              a = null;
              break;
            }
            this.Add(o, a);
            a = o;
          } else {
            a = null;
            break;
          }
        }
        j = q + 1;
      }
  } catch (x) {}
  this.EndUpdate();
  return a;
}
function ngl_Scan(a, b, d) {
  if (typeof a !== "function") return false;
  b = b;
  if (typeof b === "undefined" || b === null) b = this;
  if (typeof b.Items !== "undefined")
    for (var e = 0; e < b.Items.length; e++)
      if (typeof b.Items[e] !== "undefined") {
        if (!a(this, b.Items[e], b, d)) return false;
        if (!this.Scan(a, b.Items[e], d)) return false;
      }
  return true;
}
function ngl_ScanVisible(a, b, d) {
  if (typeof a !== "function") return false;
  b = b;
  if (typeof b === "undefined" || b === null) b = this;
  if (typeof b.Items !== "undefined")
    for (var e = 0; e < b.Items.length; e++) {
      var f = b.Items[e];
      if (typeof f !== "undefined")
        if (ngVal(f.Visible, true)) {
          if (!a(this, f, b, d)) return false;
          if (
            !(
              ngVal(f.Collapsed, false) ||
              typeof f.Items === "undefined" ||
              !f.Items.length
            )
          )
            if (!this.Scan(a, f, d)) return false;
        }
    }
  return true;
}
function ngl_Clear(a) {
  a = a;
  if (!a) {
    a = this;
    this.ClearSelected();
    this.ItemsControls = undefined;
  }
  if (typeof a.Items !== "undefined") {
    for (var b = a.Items.length - 1; b >= 0; b--)
      if (typeof a.Items[b] !== "undefined") {
        this.do_remove(a.Items[b], a);
        typeof a.Items[b].Items !== "undefined" && this.Clear(a.Items[b]);
      }
    delete a.Items;
  }
  if (a == this) this.Items = [];
}
function ngl_ItemId(a) {
  if (typeof a === "undefined") return "";
  var b = "";
  do {
    var d = this.IndexOf(a, a.Parent);
    if (d < 0) return "";
    b = d + (b == "" ? "" : "_" + b);
    a = a.Parent;
  } while (a);
  return b;
}
function ngl_ItemById(a) {
  for (var b = {}, d, e = [], f = 0, g = a.length - 1; g >= 0; g--)
    if (a.charAt(g) == "_") {
      e[f++] = parseInt(a.substring(g + 1, a.length));
      a = a.substring(0, g);
      if ((d = ngGetControlById(a, "ngList"))) {
        b.list = d;
        b.item = d;
        for (g = e.length - 1; g >= 0; g--)
          b.item =
            b.item && b.item.Items && e[g] >= 0 && e[g] < b.item.Items.length
              ? b.item.Items[e[g]]
              : null;
        if (b.item == d) b.item = null;
        return b;
      }
    }
  b.list = null;
  b.item = null;
  return b;
}
function nglist_ItemById(a) {
  var b = this;
  if (a.charAt(a.length - 1) != "_") a += "_";
  for (var d = 0; a.length > 0; )
    if (a.charAt(d) == "_") {
      var e = parseInt(a.substring(0, d));
      a = a.substring(d + 1);
      if (
        !e.isNaN &&
        b.Items &&
        e >= 0 &&
        e < b.Items.length &&
        b.Items[e] !== null
      )
        b = b.Items[e];
      else return (b = null);
      d = 0;
    } else d++;
  return b == this ? null : b;
}
function ngl_UpdateCollapsed(a, b, d, e, f, g) {
  var j = a;
  if (typeof j === "undefined" || j === null) j = this;
  f = ngVal(f, 0);
  if (typeof j.Items === "undefined") return f;
  var k,
    n = false;
  if (
    typeof d !== "undefined" &&
    j != this &&
    ngVal(a.Collapsed, false) != d &&
    (j.Items.length > 0 || typeof a.Collapsed !== "undefined")
  ) {
    n = true;
    if (d) {
      if (a.OnCollapsing && !ngVal(a.OnCollapsing(this, a), false)) n = false;
      if (n && this.OnCollapsing && !ngVal(this.OnCollapsing(this, a), false))
        n = false;
    } else {
      if (a.OnExpanding && !ngVal(a.OnExpanding(this, a), false)) n = false;
      if (n && this.OnExpanding && !ngVal(this.OnExpanding(this, a), false))
        n = false;
    }
    if (n) a.Collapsed = d;
  }
  if (j.Items.length == 0) return f;
  if (this.update_cnt > 0) {
    this.need_update = true;
    if (typeof d !== "undefined")
      for (b = 0; b < j.Items.length; b++)
        typeof j.Items[b] !== "undefined" &&
          this.UpdateCollapsed(j.Items[b], true, d, e + b, f + 1, g);
    return f;
  }
  if (typeof e === "undefined") e = j == this ? "" : this.ItemId(a);
  var o = f;
  if (this.Columns.length > 0) {
    if (typeof g === "undefined") {
      g = false;
      for (b = j; !g && b; ) {
        g = ngVal(b.Collapsed, false);
        b = b.Parent;
      }
    }
    g = g || ngVal(j.Collapsed, false);
    if ((k = document.getElementById(this.ID + "_G" + e + "_0")))
      k.style.display = g ? "none" : "";
    (k = this.OnGetTreeImg ? this.OnGetTreeImg(this, j, e) : this.TreeImg) &&
      ngc_ChangeImage(
        ngl_TreeImgDrawProps(this.ID + "_" + e + "T", g, this.Enabled, k)
      );
    if (j != this) e += "_";
    for (b = 0; b < j.Items.length; b++)
      if (typeof j.Items[b] !== "undefined") {
        o = this.UpdateCollapsed(j.Items[b], true, d, e + b, f + 1, g);
        if (o > f + 1)
          if (b + 1 < j.Items.length)
            if ((k = document.getElementById(this.ID + "_G" + e + (b + 1))))
              k.style.display = g ? "none" : "";
      }
  } else {
    if ((k = document.getElementById(this.ID + "_G" + e)))
      k.style.display = ngVal(j.Collapsed, false) ? "none" : "block";
    (k = this.OnGetTreeImg ? this.OnGetTreeImg(this, j, e) : this.TreeImg) &&
      ngc_ChangeImage(
        ngl_TreeImgDrawProps(
          this.ID + "_" + e + "T",
          ngVal(j.Collapsed, false),
          this.Enabled,
          k
        )
      );
    if (j != this) e += "_";
    if (ngVal(b, false) || typeof d !== "undefined")
      for (b = 0; b < j.Items.length; b++)
        typeof j.Items[b] !== "undefined" &&
          this.UpdateCollapsed(j.Items[b], true, d, e + b, f + 1, g);
  }
  if (n) {
    if (d) {
      a.OnCollapsed && a.OnCollapsed(this, a);
      this.OnCollapsed && this.OnCollapsed(this, a);
    } else {
      a.OnExpanded && a.OnExpanded(this, a);
      this.OnExpanded && this.OnExpanded(this, a);
    }
    this.UpdateColumns();
  }
  this.UpdateFrame();
  return o;
}
function ngl_Collapse(a) {
  if (!(typeof a === "undefined" || ngVal(a.Collapsed, false)))
    if (!(a.OnCollapsing && !ngVal(a.OnCollapsing(this, a), false)))
      if (!(this.OnCollapsing && !ngVal(this.OnCollapsing(this, a), false))) {
        a.Collapsed = true;
        this.UpdateCollapsed(a, false);
        this.UpdateColumns();
        a.OnCollapsed && a.OnCollapsed(this, a);
        this.OnCollapsed && this.OnCollapsed(this, a);
      }
}
function ngl_Expand(a) {
  if (!(typeof a === "undefined" || !ngVal(a.Collapsed, false)))
    if (!(a.OnExpanding && !ngVal(a.OnExpanding(this, a), false)))
      if (!(this.OnExpanding && !ngVal(this.OnExpanding(this, a), false))) {
        a.Collapsed = false;
        this.UpdateCollapsed(a, false);
        this.UpdateColumns();
        a.OnExpanded && a.OnExpanded(this, a);
        this.OnExpanded && this.OnExpanded(this, a);
      }
}
function ngl_CollapseAll(a) {
  this.UpdateCollapsed(a, true, true);
}
function ngl_ExpandAll(a) {
  this.UpdateCollapsed(a, true, false);
}
function ngl_ToggleCollapsed(a) {
  if (typeof a === "undefined") a = {};
  if (
    a != this &&
    a.Items &&
    (a.Items.length > 0 || typeof a.Collapsed !== "undefined")
  )
    a.Collapsed ? this.Expand(a) : this.Collapse(a);
}
function ngl_GetRowClassName(a, b, d) {
  var e = "Row";
  if (this.OnGetRowClassName) {
    d = this.OnGetRowClassName(this, a, d);
    if (ngVal(d, "") != "") e = d;
  }
  if (a)
    if (!this.Enabled || !ngVal(a.Enabled, true)) e += "Disabled";
    else
      switch (a.Checked) {
        case true:
        case 1:
          e += "Checked";
          break;
        case 2:
          e += "Grayed";
          break;
      }
  e = this.BaseClassName + e;
  if (this.Enabled && ngVal(b, false)) e = this.BaseClassName + "Selected " + e;
  return e;
}
function ngl_CheckedChanged(a) {
  if ((a = ngGetControlById(a, "ngList"))) {
    clearTimeout(a.checked_changed_timer);
    a.checked_changed_timer = null;
    a.OnCheckChanged && a.OnCheckChanged(a);
  }
}
function ngl_do_checked(a) {
  var b = a.Checked;
  this.OnItemCheckChanged && this.OnItemCheckChanged(this, a);
  if (a.Checked == b) {
    if ((b = this.GetItemAction(a))) b.CheckRadioGroup();
    else if (
      typeof a.RadioGroup !== "undefined" &&
      ngVal(a.Checked, 0) &&
      this.radio_groups[a.RadioGroup] != a
    ) {
      b = this.radio_groups[a.RadioGroup];
      this.radio_groups[a.RadioGroup] = a;
      b && this.CheckItem(b, 0);
    }
    this.CheckChanged();
  }
}
function ngl_CheckChanged() {
  clearTimeout(this.checked_changed_timer);
  this.checked_changed_timer = null;
  if (this.OnCheckChanged)
    this.checked_changed_timer = setTimeout(
      "ngl_CheckedChanged('" + this.ID + "')",
      this.CheckedChangedDelay > 0 ? this.CheckedChangedDelay : 1
    );
}
function ngl_UpdateChecked(a, b, d, e, f) {
  var g = a;
  if (typeof g === "undefined" || g === null) g = this;
  if (typeof a === "undefined" || a === null) {
    a = { Checked: d, CheckGroup: true };
    b = true;
    e = "";
  }
  if (typeof e === "undefined") e = g == this ? "" : this.ItemId(a);
  f = ngVal(f, 0);
  if (
    (this.ShowCheckboxes || typeof a.Checked !== "undefined") &&
    typeof d !== "undefined" &&
    ngVal(a.Checked, 0) != d
  ) {
    a.Checked = d;
    this.do_checked(a);
  }
  var j = ngVal(a.Checked, 0);
  if (typeof g.Items !== "undefined" && g.Items.length > 0) {
    b = ngVal(b, false);
    var k = ngVal(a.CheckGroup, false);
    if (k || typeof d !== "undefined" || b) {
      if (!f && k && j != 2) d = j;
      k || (d = void 0);
      for (var n, o, t = 0; t < g.Items.length; t++)
        if (typeof g.Items[t] !== "undefined") {
          n = this.UpdateChecked(
            g.Items[t],
            b,
            d,
            e != "" ? e + "_" + t : void 0,
            f + 1
          );
          if (this.ShowCheckboxes || typeof g.Items[t].Checked !== "undefined")
            if (typeof o === "undefined") o = n;
            else if (n != o) o = 2;
        }
      if (k && typeof o !== "undefined") j = o;
    }
  }
  if (g != this && e != "")
    if (this.update_cnt > 0) this.need_update = true;
    else {
      if ((b = document.getElementById(this.ID + "_" + e))) {
        d = this.GetRowClassName(a, this.selected[e], e);
        t = b.className.indexOf("_Focus");
        if (t >= 0) d += "_Focus";
        b.className = d;
      }
      (a = this.OnGetCheckImg
        ? this.OnGetCheckImg(this, a, e)
        : typeof a.Checked === "undefined" && !this.ShowCheckboxes
          ? null
          : this.CheckImg) &&
        ngc_ChangeImage(
          ngl_CheckImgDrawProps(this.ID + "_" + e + "C", j, this.Enabled, a)
        );
      if (!f) {
        var q;
        for (a = g.Parent; a && ngVal(a.CheckGroup, false); ) {
          for (t = 0; t < a.Items.length; t++)
            if (
              this.ShowCheckboxes ||
              typeof a.Items[t].Checked !== "undefined"
            )
              if (typeof q === "undefined") q = ngVal(a.Items[t].Checked, 0);
              else if (ngVal(a.Items[t].Checked, 0) != q) {
                q = 2;
                break;
              }
          if (
            typeof q !== "undefined" &&
            (this.ShowCheckboxes || typeof a.Checked !== "undefined") &&
            q != ngVal(a.Checked, 0)
          ) {
            a.Checked = q;
            this.do_checked(a);
            this.UpdateChecked(a, false);
          }
          a = a.Parent;
        }
      }
    }
  return j;
}
function ngl_CheckItem(a, b) {
  if (a) {
    var d = this.GetItemAction(a);
    if (d && !d.in_action_check) d.Check(b);
    else {
      b = ngVal(b, 1);
      if (ngVal(a.Checked, 0) != b) {
        a.Checked = b;
        this.do_checked(a);
        a.Checked == b && this.UpdateChecked(a);
      }
    }
  }
}
function ngl_CheckAll(a) {
  this.UpdateChecked(a, true, true);
}
function ngl_UncheckAll(a) {
  this.UpdateChecked(a, true, false);
}
function ngl_GetChecked() {
  var a = [];
  this.Scan(function(b, d) {
    d.Checked && a.push(d);
    return true;
  });
  return a;
}
function ngl_SetItemVisible(a, b) {
  if (a) {
    var d = this.GetItemAction(a);
    if (d && !d.in_action_visible) d.SetVisible(b);
    else {
      b = ngVal(b, true);
      if (ngVal(a.Visible, true) != b) {
        a.Visible = b;
        this.OnSetItemVisible && this.OnSetItemVisible(this, a);
        if (a.Visible == b)
          if (this.update_cnt > 0) this.need_update = true;
          else if (this.Columns.length > 0 && !ngIExplorer) this.Update();
          else if (
            (b = document.getElementById(this.ID + "_" + this.ItemId(a)))
          )
            b.style.display = a.Visible ? "block" : "none";
      }
    }
  }
}
function ngl_SetItemEnabled(a, b) {
  if (a) {
    var d = this.GetItemAction(a);
    if (d) d.SetEnabled(b);
    else {
      b = ngVal(b, true);
      if (ngVal(a.Enabled, true) != b) {
        a.Enabled = b;
        this.OnSetItemEnabled && this.OnSetItemEnabled(this, a);
        a.Enabled == b && this.Update();
      }
    }
  }
}
function ngl_SelectChanged() {
  var a,
    b = false,
    d = this.update_cnt <= 0,
    e = 0,
    f = [];
  for (var g in this.selected)
    if (ngVal(this.selected[g], false)) {
      e++;
      f[g] = true;
      if (!ngVal(this.draw_selected[g], false)) {
        b = true;
        if (d)
          if ((a = document.getElementById(this.ID + "_" + g))) {
            var j = a.className,
              k = j.indexOf(this.BaseClassName + "Selected ");
            if (k < 0) j = this.BaseClassName + "Selected " + j;
            a.className = j;
            this.OnRedrawSelected && this.OnRedrawSelected(this, a, true, g);
          }
      }
    }
  this.SelCount = e;
  for (g in this.draw_selected)
    if (
      !ngVal(this.selected[g], false) &&
      ngVal(this.draw_selected[g], false)
    ) {
      b = true;
      if (d)
        if ((a = document.getElementById(this.ID + "_" + g))) {
          j = a.className;
          e = this.BaseClassName + "Selected ";
          k = j.indexOf(e);
          if (k >= 0) j = j.substring(k + e.length, j.length);
          a.className = j;
          this.OnRedrawSelected && this.OnRedrawSelected(this, a, false, g);
        }
    }
  this.draw_selected = f;
  if (b && this.OnSelectChanged) {
    this.OnSelectChanged(this);
    if (this.update_cnt > 0) this.need_update = true;
  }
}
function ngl_SelectItem(a, b) {
  if (a) {
    b = ngVal(b, true);
    a = this.ItemId(a);
    if (a != "")
      if (ngVal(this.selected[a], false) != b) {
        if (b) {
          this.last_selected = a;
          this.selected[a] = true;
        } else delete this.selected[a];
        this.SelectChanged();
      }
  }
}
function ngl_ClearSelected() {
  this.last_selected = "";
  this.selected = [];
  this.SelectChanged();
}
function ngl_GetSelected() {
  var a,
    b = [];
  for (var d in this.selected)
    if (ngVal(this.selected[d], false)) {
      a = ngl_ItemById(this.ID + "_" + d);
      if (a.item) b[b.length] = a.item;
    }
  return b;
}
function ngl_IsItemSelected(a) {
  a = this.ItemId(a);
  if (a == "") return false;
  return ngVal(this.selected[a], false);
}
function ngl_GetItemFocus() {
  var a = ngl_ItemById(ngl_CurrentRowId);
  return a.list == this ? a.item : null;
}
function ngl_SetItemFocus(a) {
  if (a) {
    var b = this.ItemId(a);
    if (b != "") {
      for (a = a.Parent; a; ) {
        a.Collapsed && this.Expand(a);
        a = a.Parent;
      }
      b = this.ID + "_" + b;
      if (b != ngl_CurrentRowId) {
        ngl_FocusTime = new Date().getTime();
        if ((g = document.getElementById(b)))
          ngl_EnterRow(
            false,
            g,
            this.OnEnterRow != null || this.OnLeaveRow != null
          );
        if ((b = this.ContentElm) && g) {
          a = ng_ClientHeight(g);
          var d = ng_ClientHeight(b),
            e = 0,
            f = document.getElementById(this.ID + "_FH");
          if (f) e = ng_ClientHeight(f);
          if (
            g.offsetTop < b.scrollTop + e ||
            g.offsetTop + a > b.scrollTop + d
          ) {
            a = g.offsetTop - e;
            if (a < 0) a = 0;
            b.scrollTop = a;
          }
        }
      }
    }
  } else if (ngl_ItemById(ngl_CurrentRowId).list == this) {
    var g = document.getElementById(ngl_CurrentRowId);
    if (g)
      ngl_LeaveRow(
        false,
        g,
        this.OnEnterRow != null || this.OnLeaveRow != null
      );
  }
}
var ngl_ActSortList = null;
function ngl_SortFnc(a, b) {
  var d = ngl_ActSortList;
  if (d.OnCompareItem) return d.OnCompareItem(d, a, b);
  var e = "",
    f = "";
  if (d.Columns.length > 0) {
    e = typeof a.Text === "object" ? a.Text[d.SortColumn] : "";
    f = typeof b.Text === "object" ? b.Text[d.SortColumn] : "";
  } else {
    e = a.Text;
    f = b.Text;
  }
  e = ngVal(e, "");
  f = ngVal(f, "");
  if (!d.SortCaseSensitive) {
    if (typeof e === "string") e = e.toLowerCase();
    if (typeof f === "string") f = f.toLowerCase();
  }
  a = 0;
  if (e < f) a = -1;
  else if (e > f) a = 1;
  if (d.SortDir == 1) a = -a;
  return a;
}
function ngl_Sort(a, b, d, e) {
  a = a;
  if (typeof a === "undefined" || a === null) a = this;
  if (typeof a.Items !== "undefined" && a.Items.length > 0) {
    d = ngVal(d, 0);
    if (!d) {
      ngl_ActSortList = this;
      if (this.Columns.length > 0 && ngVal(this.SortColumn, "") == "")
        this.SortColumn = this.Columns[0].ID;
    }
    if (ngVal(e, "") == "") {
      e = this.ItemId(a);
      if (e != "") e += "_";
    }
    if (ngVal(b, true))
      for (b = 0; b < a.Items.length; b++)
        this.Sort(a.Items[b], true, d + 1, e + b + "_");
    if (this.SelCount > 0) {
      var f = [];
      for (b = 0; b < a.Items.length; b++)
        if (ngVal(this.selected[e + b], false)) {
          f.push(a.Items[b]);
          delete this.selected[e + b];
        }
    }
    a.Items.sort(ngl_SortFnc);
    if (this.SelCount > 0 && f.length > 0)
      for (b = 0; b < a.Items.length; b++)
        for (var g = 0; g < f.length; g++)
          if (a.Items[b] == f[g]) {
            f.splice(g, 1);
            this.selected[e + b] = true;
            break;
          }
    if (!d) {
      ngl_ActSortList = null;
      this.Update();
    }
  }
}
function ngl_FindCompare(a, b, d) {
  if (typeof d !== "string") return d == b;
  if (a.ignorecase) d = d.toLowerCase();
  switch (a.partial) {
    case 1:
      b = "" + b;
      if (b.length > d.length) return false;
      return d.substring(0, b.length) == b;
    case 2:
      b = "" + b;
      return d.indexOf(b) >= 0;
    default:
      return d == b;
  }
}
function ngl_FindItemCallback(a, b, d, e) {
  var f;
  if (typeof e.fromitem !== "undefined") {
    e.fromitem == b && delete e.fromitem;
    return true;
  }
  if (a.Columns.length > 0)
    for (d = 0; d < e.cols.length; d++) {
      f = e.cols[d];
      f = a.OnGetText
        ? ngVal(a.OnGetText(a, b, f), "")
        : typeof b.Text === "object"
          ? ngVal(b.Text[f.ID], "")
          : "";
      if (!ngl_FindCompare(e, e.key[d], f)) return true;
    }
  else {
    f = a.OnGetText ? ngVal(a.OnGetText(a, b), "") : ngVal(b.Text, "");
    if (!ngl_FindCompare(e, e.key, f)) return true;
  }
  e.found = b;
  return false;
}
function ngl_FindItem(a, b, d, e, f) {
  var g = {};
  g.ignorecase = ngVal(d, true);
  if (typeof a === "object") {
    if (this.Columns.length <= 0) return null;
    d = [];
    var j = [],
      k,
      n,
      o;
    for (k in a)
      for (n = 0; n < this.Columns.length; n++) {
        o = this.Columns[n];
        if (typeof o === "object" && o.ID == k) {
          d[d.length] = g.ignorecase ? ("" + a[k]).toLowerCase() : a[k];
          j[j.length] = o;
        }
      }
    if (!j.length) return null;
    g.key = d;
    g.cols = j;
  } else {
    g.key = g.ignorecase ? ("" + a).toLowerCase() : a;
    if (this.Columns.length > 0) {
      g.key = new Array(g.key);
      g.cols = new Array(this.Columns[0]);
    }
  }
  g.found = null;
  g.fromitem = f;
  g.partial = ngVal(b, 0);
  ngVal(e, false)
    ? this.ScanVisible(ngl_FindItemCallback, null, g)
    : this.Scan(ngl_FindItemCallback, null, g);
  return g.found;
}
function ngl_FindItemByIDCallback(a, b, d, e) {
  if (!b.ID || b.ID != e.ID) return true;
  e.found = b;
  return false;
}
function ngl_FindItemByID(a) {
  var b = {};
  b.ID = a;
  b.found = null;
  this.Scan(ngl_FindItemByIDCallback, null, b);
  return b.found;
}
function ngl_DoDropDown(a) {
  this.SetVisible(true);
  if (!ngVal(a.Suggestion, false)) {
    var b = a.ListItem;
    if (typeof b === "undefined") {
      a = a.GetText();
      b = this.FindItem(a, a === "" ? 0 : 1);
    }
    this.DropDownOwnerListItem = b;
  }
}
function ngl_DoDropDownFinished(a) {
  if (!ngVal(a.Suggestion, false)) {
    (a = this.DropDownOwnerListItem) && this.SetItemFocus(a);
    this.SetFocus();
  }
}
function ngl_SelectDropDownItem(a) {
  var b = ngVal(this.DropDownOwnerListItem, null);
  delete this.DropDownOwnerListItem;
  var d = this.DropDownOwner;
  if (d) {
    if (!ngVal(d.ReadOnly, false)) {
      a = ngVal(a, null);
      if (d.DropDownType == ngeDropDownList) d.ListItem = a;
      if (
        d.OnListItemChanged &&
        (b === null || b != a) &&
        !ngVal(d.OnListItemChanged(d, this, a, b), false)
      )
        return false;
      b = "";
      if (a) {
        if (typeof a.Text === "string") b = a.Text;
        else if (this.Columns.length > 0 && typeof a.Text === "object")
          b = a.Text[this.Columns[0]];
        if (ngVal(d.Suggestion, false) && d.OnSuggestionSetText) {
          b = d.OnSuggestionSetText(b, a);
          if (b == "") b = void 0;
        }
      }
      if (d.OnListItemGetText) b = d.OnListItemGetText(d, this, a, b);
      typeof b !== "undefined" &&
        typeof d.SetText === "function" &&
        d.SetText(b);
    }
    d.HideDropDown && d.HideDropDown();
  }
  return true;
}
function ngl_SelectDropDownItemWithFocus(a) {
  a = this.SelectDropDownItem(a);
  var b = this.DropDownOwner;
  a && b && b.SetFocus();
  return a;
}
function ngl_GetClickInfo(a, b, d) {
  for (var e = { list: null, item: null }, f = b; f; ) {
    if (ngVal(f.id, "") != "") {
      e = ngl_ItemById(f.id);
      if (e.item !== null) break;
      e.list = null;
    }
    f = f.parentNode;
  }
  if (a.gesture) {
    var g = a.gesture.srcEvent;
    if (g) {
      a.altKey = g.altKey;
      a.ctrlKey = g.ctrlKey;
      a.shiftKey = g.shiftKey;
    }
  }
  a.listObj = b;
  a.listRowObj = f;
  a.listPart = d;
  a.listCol = -1;
  a.Owner = e.list;
  a.list = e.list;
  a.listItem = e.item;
  if (a.list && a.listPart != 0 && a.list.Columns.length > 0) {
    for (b = a.listObj; b && typeof b.cellIndex === "undefined"; )
      b = b.parentNode;
    if (b) a.listCol = b.cellIndex;
  }
}
function ngl_DoPtrStart(a) {
  var b = a.EventID;
  if (b.substr(0, 4) === "item") {
    b = parseInt(b.substring(4, b.length));
    ngl_GetClickInfo(a.StartEvent, a.StartElement, b);
    a.SrcElement = a.StartEvent.listRowObj;
    if (a.Touch)
      ngl_EnterRow(
        a.Event,
        a.StartEvent.listRowObj,
        this.OnEnterRow != null || this.OnLeaveRow != null
      );
  }
}
function ngl_DoPtrDrag(a) {
  if (a.EventID.substr(0, 4) === "item")
    if (a.Touch)
      if (a.IsInSrcElement()) {
        if (ngl_CurrentRowId != a.StartEvent.listRowObj.id)
          ngl_EnterRow(
            a.Event,
            a.StartEvent.listRowObj,
            this.OnEnterRow != null || this.OnLeaveRow != null
          );
      } else if (ngl_CurrentRowId == a.StartEvent.listRowObj.id)
        ngl_LeaveRow(
          a.Event,
          a.StartEvent.listRowObj,
          this.OnEnterRow != null || this.OnLeaveRow != null
        );
  return false;
}
function ngl_DoGesture(a) {
  return ngc_HandleScrollGesture(this, a, this.ContentElm);
}
function ngl_DoPtrEnd(a) {
  if (a.EventID.substr(0, 4) === "item")
    if (a.Touch)
      if (a.IsInSrcElement())
        if (ngl_CurrentRowId == a.StartEvent.listRowObj.id)
          ngl_LeaveRow(
            a.Event,
            a.StartEvent.listRowObj,
            this.OnEnterRow != null || this.OnLeaveRow != null
          );
}
function ngl_DoPtrClick(a) {
  if (!(!this.MouseEvents || this.ReadOnly))
    if (
      !(typeof a.ScrollTop !== "undefined" && Math.abs(a.Y - a.StartY) > 10)
    ) {
      var b = a.EventID,
        d = b.substr(0, 4);
      if (d === "item") {
        if (!(a.EndTime - a.StartTime > 200 && !a.IsInSrcElement())) {
          d = a.StartEvent;
          var e = parseInt(b.substring(4, b.length));
          ngl_GetClickInfo(d, a.StartElement, e);
          this.ClickItem(d.listItem, d);
          if (b !== "item0" && ng_inDOM(a.StartElement)) {
            ngl_GetClickInfo(d, a.StartElement, 0);
            this.ClickItem(d.listItem, d);
          }
        }
      } else if (d === "capt") {
        d = a.StartEvent;
        e = parseInt(b.substring(4, b.length));
        this.OnCaptionClick &&
          this.OnCaptionClick(d, this, e, this.StartElement);
      }
    }
}
function ngl_DoPtrDblClick(a) {
  if (!(!this.MouseEvents || this.ReadOnly)) {
    var b = a.EventID,
      d = b.substr(0, 4);
    if (d === "item") {
      if (!(a.EndTime - a.StartTime >= 200 && !a.IsInSrcElement())) {
        d = a.StartEvent;
        var e = parseInt(b.substring(4, b.length));
        ngl_GetClickInfo(d, a.StartElement, e);
        if (d.listItem && ngVal(d.listItem.Enabled, true))
          if (
            !(d.listItem.OnDblClick && !ngVal(d.listItem.OnDblClick(d), false))
          )
            if (!(this.OnDblClick && !ngVal(this.OnDblClick(d), false))) {
              if (d.listPart == 1 || d.listPart == 4)
                this.ToggleCollapsed(d.listItem);
              this.OnDblClickItem && d.listPart && this.OnDblClickItem(d);
              if (b !== "item0") {
                a.EventID = "item0";
                this.DoPtrDblClick(a);
                a.EventID = b;
              }
            }
      }
    } else if (d === "capt") {
      d = a.StartEvent;
      e = parseInt(b.substring(4, b.length));
      this.OnCaptionDblClick &&
        this.OnCaptionDblClick(d, this, e, this.StartElement);
    }
  }
}
function ngl_ClickItem(a, b) {
  if (typeof b === "undefined") b = {};
  if (b.list != this) {
    b.Owner = this;
    b.list = this;
    b.listItem = a;
    b.listObj = null;
    b.listRowObj = null;
    b.listPart = 0;
    b.listCol = -1;
    this.ClickItem(a, b);
    b.listPart = 1;
    b.listCol = this.Columns.length > 0 ? 0 : -1;
    b.listIgnoreSelect = false;
  }
  if (!(!b.list.Enabled || ngVal(b.list.ReadOnly, false)))
    if (a && ngVal(a.Enabled, true)) {
      if (!b.listPart) {
        if (new Date().getTime() - this.ignore_select < 150)
          b.listIgnoreSelect = true;
        this.ignore_select = 0;
        var d = this.GetItemAction(a);
        if (d && !d.in_action_click) {
          d.Click(b);
          return;
        }
      }
      if (a.OnClick && !ngVal(a.OnClick(b), false)) {
        if (b.listIgnoreSelect && b.listPart)
          this.ignore_select = new Date().getTime();
      } else if (this.OnClick && !ngVal(this.OnClick(b), false)) {
        if (b.listIgnoreSelect && b.listPart)
          this.ignore_select = new Date().getTime();
      } else {
        switch (b.listPart) {
          case 0:
            if (b.listIgnoreSelect) break;
            if (this.DropDownOwner) this.SelectDropDownItemWithFocus(a);
            else {
              if (!this.SelectType) break;
              var e, f;
              try {
                e = ngVal(b.shiftKey, false);
                f = ngVal(b.ctrlKey, false);
              } catch (g) {
                f = e = false;
              }
              if (this.SelectType == 1 || (this.SelectType == 3 && !f && !e))
                this.selected = [];
              if (
                (this.SelectType == 2 || this.SelectType == 3) &&
                e &&
                this.last_selected != ""
              ) {
                d = !ngVal(this.selected[this.ItemId(a)], false);
                f = ngl_ItemById(this.ID + "_" + this.last_selected);
                if (f.item) {
                  e = new Array(f.item);
                  for (
                    var j = f.item;
                    (j = this.NextVisibleItem(j)) != null;

                  ) {
                    if (ngVal(j.Enabled, true)) e[e.length] = j;
                    if (j == a) break;
                  }
                  if (!j) {
                    j = f.item;
                    for (
                      e = new Array(f.item);
                      (j = this.PrevVisibleItem(j)) != null;

                    ) {
                      if (ngVal(j.Enabled, true)) e[e.length] = j;
                      if (j == a) break;
                    }
                  }
                  if (j) {
                    for (a = 0; a < e.length; a++)
                      if (d) this.selected[this.ItemId(e[a])] = true;
                      else delete this.selected[this.ItemId(e[a])];
                    this.SelectChanged();
                    break;
                  }
                }
              } else
                this.SelectItem(
                  a,
                  !ngVal(this.selected[this.ItemId(a)], false)
                );
            }
            break;
          case 2:
            if (this.ShowCheckboxes || typeof a.Checked !== "undefined") {
              if (typeof a.RadioGroup !== "undefined") this.CheckItem(a, 1);
              else {
                d = ngVal(a.Checked, 0);
                switch (d) {
                  case 0:
                  case false:
                    d = ngVal(a.AllowGrayed, false) ? 2 : 1;
                    break;
                  case 1:
                  case true:
                    d = 0;
                    break;
                  default:
                    d = 1;
                    break;
                }
                this.CheckItem(a, d);
              }
              b.listIgnoreSelect = true;
            }
            break;
          case 3:
            this.ToggleCollapsed(a);
            b.listIgnoreSelect = true;
            break;
        }
        if (b.listPart) {
          if (b.listIgnoreSelect) {
            this.ignore_select = new Date().getTime();
            this.OnClickItem && this.OnClickItem(b);
          }
        } else !b.listIgnoreSelect && this.OnClickItem && this.OnClickItem(b);
      }
    }
}
function ngl_DoMouseEnter(a, b) {
  ngl_LeaveListTimer && clearTimeout(ngl_LeaveListTimer);
  ngl_LeaveListTimer = null;
  ngc_EnterBox(this.ID);
  b && b.Object && b.Object != this && ngl_DoLeave(b.Object.ID);
  this.OnMouseEnter && this.OnMouseEnter(this);
}
function ngl_DoLeave(a) {
  ngl_LeaveListTimer && clearTimeout(ngl_LeaveListTimer);
  ngl_LeaveListTimer = null;
  var b = ngGetControlById(a, "ngList");
  if (b) {
    if (ngl_ItemById(ngl_CurrentRowId).list == b) {
      var d = document.getElementById(ngl_CurrentRowId);
      if (d)
        ngl_LeaveRow(false, d, b.OnEnterRow != null || b.OnLeaveRow != null);
    }
    ngc_LeaveBox(a);
    b.OnMouseLeave && b.OnMouseLeave(b);
  }
}
function ngl_DoMouseLeave() {
  ngl_LeaveListTimer = setTimeout("ngl_DoLeave('" + this.ID + "');", 100);
}
var ngl_LeaveRowTimer = null,
  ngl_LeaveRowElement = null,
  ngl_LeaveRowEnterLeave = false;
function ngl_EnterRow(a, b, d) {
  if (!a && a !== false) a = window.event;
  if (!(ngUsingTouch && a && a.type.toLowerCase().match(/mouse/))) {
    var e = new Date().getTime();
    if (!(a && e < ngl_FocusTime + 200)) {
      if (ngl_LeaveRowTimer) {
        clearTimeout(ngl_LeaveRowTimer);
        ngl_LeaveRowTimer = null;
        if (ngl_LeaveRowElement && ngl_LeaveRowElement.id == b.id) {
          ngl_LeaveRowElement = null;
          return;
        }
        ngl_DoLeaveRow();
      }
      e = b.className;
      if (ngl_CurrentRowId != "") {
        var f = document.getElementById(ngl_CurrentRowId);
        ngl_LeaveRow(a, f, d);
      }
      ngl_CurrentRowId = b.id;
      if (e.indexOf("_Focus") < 0) e += "_Focus";
      b.className = e;
      ngc_EnterImg(b.id + "C");
      ngc_EnterImg(b.id + "T");
      ngc_EnterImg(b.id + "I");
      if (d) {
        a = ngl_ItemById(b.id);
        a.list && a.list.OnEnterRow && a.list.OnEnterRow(a.list, a.item, b.id);
      }
    }
  }
}
function ngl_LeaveRow(a, b, d) {
  if (!a && a !== false) a = window.event;
  if (!(ngUsingTouch && a && a.type.toLowerCase().match(/mouse/)))
    if (b) {
      var e = new Date().getTime();
      if (!(a && e < ngl_FocusTime + 200)) {
        if (ngl_LeaveRowTimer) {
          clearTimeout(ngl_LeaveRowTimer);
          ngl_LeaveRowTimer = null;
          ngl_LeaveRowElement &&
            ngl_LeaveRowElement.id != b.id &&
            ngl_DoLeaveRow();
        }
        ngl_LeaveRowElement = b;
        ngl_LeaveRowEnterLeave = d;
        if (a) ngl_LeaveRowTimer = setTimeout("ngl_DoLeaveRow()", 50);
        else ngl_DoLeaveRow();
      }
    }
}
function ngl_DoLeaveRow() {
  ngl_LeaveRowTimer && clearTimeout(ngl_LeaveRowTimer);
  ngl_LeaveRowTimer = null;
  var a = ngl_LeaveRowElement,
    b = ngl_LeaveRowEnterLeave;
  ngl_LeaveRowElement = null;
  if (a) {
    var d = a.className;
    if (ngl_CurrentRowId == a.id) ngl_CurrentRowId = "";
    var e = d.indexOf("_Focus");
    if (e >= 0) d = d.substring(0, e);
    a.className = d;
    ngc_LeaveImg(a.id + "C");
    ngc_LeaveImg(a.id + "T");
    ngc_LeaveImg(a.id + "I");
    if (b) {
      b = ngl_ItemById(a.id);
      b.list && b.list.OnLeaveRow && b.list.OnLeaveRow(b.list, b.item, a.id);
    }
  }
}
function ngl_FirstVisibleItem(a, b) {
  a = a;
  if (typeof a === "undefined" || a === null) a = this;
  if (typeof a.Items !== "undefined" && a.Items.length > 0)
    for (var d, e = 0; e < a.Items.length; e++) {
      d = a.Items[e];
      if (typeof d === "undefined") d = {};
      if (ngVal(d.Visible, true) && (!b || ngVal(d.Enabled, true)))
        if (document.getElementById(this.ID + "_" + this.ItemId(d))) return d;
      if (
        !ngVal(d.Collapsed, false) &&
        typeof d.Items !== "undefined" &&
        d.Items.length > 0
      )
        if ((d = this.FirstVisibleItem(d, b))) return d;
    }
  return null;
}
function ngl_LastVisibleItem(a, b) {
  a = a;
  if (typeof a === "undefined" || a === null) a = this;
  if (typeof a.Items !== "undefined" && a.Items.length > 0)
    for (var d, e = a.Items.length - 1; e >= 0; e--) {
      d = a.Items[e];
      if (typeof d === "undefined") d = {};
      if (
        !ngVal(d.Collapsed, false) &&
        typeof d.Items !== "undefined" &&
        d.Items.length > 0
      ) {
        var f = this.LastVisibleItem(d, b);
        if (f) return f;
      }
      if (ngVal(d.Visible, true) && (!b || ngVal(d.Enabled, true)))
        if (document.getElementById(this.ID + "_" + this.ItemId(d))) return d;
    }
  return null;
}
function ngl_NextVisibleItem(a, b, d) {
  if (!a) return this.FirstVisibleItem(a, d);
  var e = ngVal(a.Parent, null);
  e || (e = this);
  var f,
    g,
    j = false;
  if (ngVal(a.Visible, true) && (!d || ngVal(a.Enabled, true)))
    if (document.getElementById(this.ID + "_" + this.ItemId(a))) j = true;
  for (f = 0; f < e.Items.length; f++) {
    g = e.Items[f];
    if (g == a) {
      if (ngVal(b, true) && !ngVal(a.Collapsed, false))
        if ((g = this.FirstVisibleItem(a, d)))
          if (document.getElementById(this.ID + "_" + this.ItemId(g))) return g;
      for (f++; f < e.Items.length; f++) {
        g = e.Items[f];
        if (typeof g === "undefined") g = {};
        if (ngVal(g.Visible, true) && (!d || ngVal(g.Enabled, true)))
          if (document.getElementById(this.ID + "_" + this.ItemId(g))) return g;
        if (!ngVal(g.Collapsed, false))
          if ((a = this.FirstVisibleItem(g, d))) return a;
      }
      return e == this
        ? j
          ? null
          : this.FirstVisibleItem(null, d)
        : this.NextVisibleItem(e, false, d);
    }
  }
  return j ? null : this.FirstVisibleItem(null, d);
}
function ngl_PrevVisibleItem(a, b, d) {
  if (!a) return this.LastVisibleItem(a, d);
  (b = ngVal(a.Parent, null)) || (b = this);
  var e,
    f,
    g = false;
  if (ngVal(a.Visible, true) && (!d || ngVal(a.Enabled, true)))
    if (document.getElementById(this.ID + "_" + this.ItemId(a))) g = true;
  for (e = b.Items.length - 1; e >= 0; e--) {
    f = b.Items[e];
    if (f == a) {
      for (e--; e >= 0; e--) {
        f = b.Items[e];
        if (typeof f === "undefined") f = {};
        if (!ngVal(f.Collapsed, false))
          if ((a = this.LastVisibleItem(f, d))) return a;
        if (ngVal(f.Visible, true) && (!d || ngVal(f.Enabled, true)))
          if (document.getElementById(this.ID + "_" + this.ItemId(f))) return f;
      }
      if (b == this) return g ? null : this.LastVisibleItem(null, d);
      if (ngVal(b.Visible, true) && (!d || ngVal(b.Enabled, true)))
        if (document.getElementById(this.ID + "_" + this.ItemId(b))) return b;
      return this.PrevVisibleItem(b, d);
    }
  }
  return g ? null : this.LastVisibleItem(null, d);
}
function ngl_KeyDown(a) {
  if (!a) a = window.event;
  ngl_FocusTime = new Date().getTime();
  var b = ngGetControlById(this.id, "ngList");
  if (b && b.Enabled && b.KeyEvents && !b.ReadOnly) {
    a.Owner = b;
    if (b.OnKeyDown && !ngVal(b.OnKeyDown(a), false)) return false;
    var d = a.keyCode,
      e = this.DropDownOwner;
    if (e && ngVal(e.Suggestion, false)) {
      switch (d) {
        case 33:
        case 34:
        case 38:
        case 35:
        case 36:
        case 40:
          d = 0;
          break;
      }
      e.SetFocus();
    }
    switch (d) {
      case 9:
        if (!b.DropDownOwner) break;
        a.preventDefault && a.preventDefault();
        a.returnValue = false;
      case 27:
        if ((a = b.DropDownOwner)) {
          a.HideDropDown && a.HideDropDown();
          a.SetFocus();
        }
        break;
      case 33:
      case 34:
      case 38:
      case 35:
      case 36:
      case 40:
        a = ngl_ItemById(ngl_CurrentRowId);
        if (a.list != b) {
          a.list = b;
          a.item = null;
        }
        switch (d) {
          case 40:
            a.item = b.NextVisibleItem(a.item, true, true);
            break;
          case 38:
            a.item = b.PrevVisibleItem(a.item, true, true);
            break;
          case 36:
            a.item = b.FirstVisibleItem(null, true);
            break;
          case 35:
            a.item = b.LastVisibleItem(null, true);
            break;
          case 33:
            for (e = 0; e < b.PageSize; e++) {
              d = b.PrevVisibleItem(a.item, true, true);
              if (!d) break;
              a.item = d;
            }
            break;
          case 34:
            for (e = 0; e < b.PageSize; e++) {
              d = b.NextVisibleItem(a.item, true, true);
              if (!d) break;
              a.item = d;
            }
            break;
        }
        if (a.item) {
          b.SetItemFocus(a.item);
          b.ItemId(a.item);
        }
        return false;
      case 37:
        a = ngl_ItemById(ngl_CurrentRowId);
        if (a.list != b) {
          a.list = b;
          a.item = null;
        }
        a.item &&
          typeof a.item.Items !== "undefined" &&
          a.item.Items.length > 0 &&
          b.Collapse(a.item);
        break;
      case 39:
        a = ngl_ItemById(ngl_CurrentRowId);
        if (a.list != b) {
          a.list = b;
          a.item = null;
        }
        a.item &&
          typeof a.item.Items !== "undefined" &&
          a.item.Items.length > 0 &&
          b.Expand(a.item);
        break;
      case 32:
      case 13:
        if ((e = document.getElementById(ngl_CurrentRowId))) {
          ngl_GetClickInfo(a, e, d == 32 ? 2 : 1);
          b.ClickItem(a.listItem, a);
          ngl_GetClickInfo(a, e, 0);
          b.ClickItem(a.listItem, a);
        }
        return false;
    }
  }
}
function ngl_KeyUp(a) {
  if (!a) a = window.event;
  var b = ngGetControlById(this.id, "ngList");
  if (b && b.Enabled && b.KeyEvents && !b.ReadOnly) {
    a.Owner = b;
    if (b.OnKeyUp && !ngVal(b.OnKeyUp(a), false)) return false;
  }
}
function ngl_CheckImgDrawProps(a, b, d, e) {
  b = ngc_ImgProps(a, b, d, e);
  if (ngl_CurrentRowId == a.substring(0, a.length - 1)) {
    b.aL = b.oL;
    b.aT = b.oT;
  } else {
    b.aL = b.L;
    b.aT = b.T;
  }
  return b;
}
function ngl_TreeImgDrawProps(a, b, d, e) {
  b = ngc_ImgProps(a, b, d, e);
  if (ngl_CurrentRowId == a.substring(0, a.length - 1)) {
    b.aL = b.oL;
    b.aT = b.oT;
  } else {
    b.aL = b.L;
    b.aT = b.T;
  }
  return b;
}
function ngl_ItemImgDrawProps(a, b, d) {
  b = ngc_ImgDrawProps(a, "", "", 0, b, d);
  if (ngl_CurrentRowId == a.substring(0, a.length - 1)) {
    b.aL = b.oL;
    b.aT = b.oT;
  } else {
    b.aL = b.L;
    b.aT = b.T;
  }
  return b;
}
function ngl_CreateImage(a, b, d, e, f, g) {
  ngc_Img(
    a,
    b,
    "position:absolute; margin-left: " + ngVal(d.x, f) + "px;",
    " " +
      ngc_PtrEventsHTML(
        this,
        "item" + e,
        "tap drag" + (g ? " doubletap" : "")
      ) +
      " " +
      ngVal(d.Attrs, "")
  );
}
function ngl_ActionSetItemVisible(a, b) {
  b && this.SetItemVisible(b, a);
}
function ngl_ActionItemCheck(a, b) {
  b && this.CheckItem(b, a);
}
function ngl_ActionItemClick(a, b) {
  b && this.ClickItem(b, a);
}
function ngl_DoActionUpdate(a) {
  if ((a = ngGetControlById(a))) {
    a.ActionUpdateTimer && clearTimeout(a.ActionUpdateTimer);
    a.ActionUpdateTimer = null;
    a.Update();
  }
}
function ngl_ActionItemUpdate() {
  this.ActionUpdateTimer && clearTimeout(this.ActionUpdateTimer);
  this.ActionUpdateTimer = setTimeout(
    "ngl_DoActionUpdate('" + this.ID + "')",
    100
  );
}
function ngl_SetItemAction(a, b) {
  if (!a) return null;
  if (typeof b === "string") {
    b = ngGetControlById(b);
    if (!b) return null;
  }
  b = ngVal(b, null);
  var d = ngVal(a.Action, null);
  if (d == b) return b;
  d && d.RemoveControl && d.RemoveControl(this, a);
  (a.Action = b) && b.AddControl && b.AddControl(this, a);
  this.SyncItemAction(a);
  return b;
}
function ngl_GetItemAction(a) {
  if (!a) return null;
  var b = ngVal(a.Action, null);
  if (typeof b === "string") b = this.SetItemAction(a, b);
  return b;
}
function ngl_SyncItemAction(a, b) {
  if (!a) return null;
  if (typeof b === "undefined") b = this.GetItemAction(a);
  if (b) {
    a.Visible = b.Visible;
    a.Enabled = b.Enabled;
    a.Checked = b.Checked;
    a.Image = b.GetImg();
    if (this.Columns.length > 0) a.Text[this.Columns[0].ID] = b.GetText();
    else a.Text = b.GetText();
    a.Alt = b.GetAlt();
  }
}
function ngl_DrawItemText(a, b, d, e) {
  if (
    !(
      this.OnDrawItemText &&
      !ngVal(this.OnDrawItemText(this, a, b, d, e), false)
    )
  ) {
    var f, g, j;
    f = ngVal(b.Checked, 0);
    j = ngVal(b.Enabled, true);
    var k = ngVal(this.selected[d], false);
    if (k) this.draw_selected[d] = true;
    var n = this.OnEnterRow != null || this.OnLeaveRow != null,
      o = this.OnDblClick || b.OnDblClick;
    g = o || this.OnDblClickItem;
    var t =
        b.Items && (b.Items.length > 0 || typeof b.Collapsed !== "undefined"),
      q = this.BaseClassName,
      u =
        " " +
        ngc_PtrEventsHTML(this, "item0", "tap drag" + (o ? " doubletap" : "")) +
        ' onmouseover="ngl_EnterRow(event,this,' +
        (n ? "1" : "0") +
        ');" onmouseout="ngl_LeaveRow(event,this,' +
        (n ? "1" : "0") +
        ');"';
    n =
      " " +
      ngc_PtrEventsHTML(
        this,
        "item1",
        "tap drag" + (g || t ? " doubletap" : "")
      );
    o = this.ListIndent;
    var x = ngVal(b.MinHeight, this.MinItemHeight);
    x = ngVal(x, 0);
    var w;
    if (this.OnMeasureItem) w = this.OnMeasureItem(this, b, d, e);
    if (typeof w === "undefined") w = b.H;
    if (typeof w === "undefined") w = this.ItemHeight;
    if (this.OnCalcIndent) o += this.OnCalcIndent(this, b, d, e);
    else if (
      typeof this.Indent === "object" &&
      this.Indent &&
      this.Indent.length > 0
    ) {
      var y = this.Indent.length;
      o +=
        e >= y
          ? this.Indent[y - 1] + (e - y + 1) * this.DefaultIndent
          : this.Indent[e];
    } else o += e * (this.Indent ? this.Indent : this.DefaultIndent);
    y = null;
    var z = 0;
    if (
      (e = this.OnGetItemImg
        ? this.OnGetItemImg(this, b, d, e)
        : ngVal(b.Image, this.ItemImg))
    ) {
      if (typeof e.x === "undefined") z -= ngVal(e.sx, e.W);
      y || (y = new ngStringBuilder());
      if (e.H > x) x = e.H;
      ngl_CreateImage(
        y,
        ngl_ItemImgDrawProps(this.ID + "_" + d + "I", this.Enabled && j, e),
        e,
        4,
        z,
        g || t
      );
    }
    if (
      (e = this.OnGetCheckImg
        ? this.OnGetCheckImg(this, b, d)
        : typeof b.Checked === "undefined" && !this.ShowCheckboxes
          ? null
          : this.CheckImg)
    ) {
      if (typeof e.x === "undefined") z -= ngVal(e.sx, e.W);
      y || (y = new ngStringBuilder());
      if (e.H > x) x = e.H;
      ngl_CreateImage(
        y,
        ngl_CheckImgDrawProps(this.ID + "_" + d + "C", f, this.Enabled && j, e),
        e,
        2,
        z,
        g
      );
    }
    if (
      typeof b.Collapsed !== "undefined" ||
      (typeof b.Items !== "undefined" && b.Items.length > 0)
    )
      if (
        (e = this.OnGetTreeImg ? this.OnGetTreeImg(this, b, d) : this.TreeImg)
      ) {
        if (typeof e.x === "undefined") z -= ngVal(e.sx, e.W);
        y || (y = new ngStringBuilder());
        if (e.H > x) x = e.H;
        ngl_CreateImage(
          y,
          ngl_TreeImgDrawProps(
            this.ID + "_" + d + "T",
            ngVal(b.Collapsed, false),
            this.Enabled && j,
            e
          ),
          e,
          3,
          z,
          g
        );
      }
    if (typeof w !== "undefined") x = -1;
    if (this.Columns.length > 0) {
      a.append(
        '<tr class="' +
          this.GetRowClassName(b, k, d) +
          '" ' +
          (ngVal(b.Visible, true) ? "" : 'style="display:none;" ') +
          'id="' +
          this.ID +
          "_" +
          d +
          '"' +
          u +
          ">"
      );
      for (k = 0; k < this.Columns.length; k++) {
        d = this.Columns[k];
        a.append(
          '<td valign="' +
            ngVal(d.VAlign, "top") +
            '" align="' +
            d.Align +
            '"' +
            (x > 0 ? ' height="' + x + '"' : "") +
            ">"
        );
        g = this.OnGetAlt
          ? ngVal(this.OnGetAlt(this, b, d), "")
          : typeof b.Alt === "string"
            ? b.Alt
            : typeof b.Alt === "object"
              ? ngVal(b.Alt[d.ID], "")
              : "";
        if (!k) {
          a.append("<div ");
          g != "" && a.append('title="' + ng_htmlEncode(g) + '" ');
          a.append(
            'style="padding-left: ' +
              o +
              "px;" +
              (typeof w !== "undefined" ? "height:" + w + "px;" : "") +
              '">'
          );
          a.append(y);
        }
        f = this.OnGetText
          ? ngVal(this.OnGetText(this, b, d), "")
          : typeof b.Text === "object"
            ? ngVal(b.Text[d.ID], "")
            : "";
        if (this.HTMLEncode) f = ng_htmlEncode(f, true);
        if ((j = f == ""))
          f =
            '<div style="width:0px;position:relative;overflow:hidden;">&nbsp;</div>';
        if (
          typeof b.ControlsHolder !== "undefined" &&
          typeof b.ControlsHolder[d.ID] !== "undefined"
        ) {
          if (!j) {
            a.append('<div class="' + q + 'Text"' + n);
            k && g != "" && a.append(' title="' + ng_htmlEncode(g) + '"');
            a.append(">" + f + "</div>");
          }
          a.append('<div style="position:relative;height:1px;">');
          a.append(b.ControlsHolder[d.ID].innerHTML);
          a.append("</div>");
        } else {
          a.append('<div class="' + q + 'Text"' + n);
          k && g != "" && a.append(' title="' + ng_htmlEncode(g) + '"');
          a.append(">" + f + "</div>");
        }
        k || a.append("</div>");
        a.append("</td>");
      }
      a.append("</tr>");
    } else {
      f = this.OnGetText
        ? ngVal(this.OnGetText(this, b), "")
        : ngVal(b.Text, "");
      if (this.HTMLEncode) f = ng_htmlEncode(f, true);
      if ((j = f == ""))
        f =
          '<div style="width:0px;position:relative;overflow:hidden;">&nbsp;</div>';
      g = this.OnGetAlt
        ? ngVal(this.OnGetAlt(this, itl), "")
        : ngVal(b.Alt, "");
      a.append('<div class="' + this.GetRowClassName(b, k, d) + '" ');
      g != "" && a.append('title="' + ng_htmlEncode(g) + '" ');
      w =
        (typeof w !== "undefined" ? "height:" + w + "px;" : "") +
        (ngVal(b.Visible, true) ? "" : "display:none;");
      if (w != "") w = ' style="' + w + '"';
      a.append('id="' + this.ID + "_" + d + '"' + w + u + ">");
      a.append('<div style="position:relative;padding-left: ' + o + 'px;">');
      x > 0 &&
        a.append(
          '<div style="float:left;width:0px;height:' + x + 'px;"></div>'
        );
      y && a.append(y);
      if (typeof b.ControlsHolder !== "undefined") {
        j ||
          a.append(
            '<div class="' +
              q +
              'Text" style="position:relative;"' +
              n +
              ">" +
              f +
              "</div>"
          );
        a.append('<div style="position:relative;height:1px;">');
        a.append(b.ControlsHolder.innerHTML);
        a.append("</div>");
      } else
        a.append(
          '<div class="' +
            q +
            'Text" style="position:relative;"' +
            n +
            ">" +
            f +
            "</div>"
        );
      x > 0 &&
        a.append('<div style="clear:both;height:0px;overflow:hidden;"></div>');
      a.append("</div></div>");
    }
  }
}
function ngl_DrawItem(a, b, d, e, f) {
  if (typeof b === "undefined") b = {};
  var g = this.GetItemAction(b);
  this.SyncItemAction(b, g);
  var j = ngVal(b.Checked, 0),
    k = { l: e, s: j };
  if (g) g.CheckRadioGroup();
  else if (
    typeof b.RadioGroup !== "undefined" &&
    j &&
    this.radio_groups[b.RadioGroup] != b
  ) {
    g = this.radio_groups[b.RadioGroup];
    this.radio_groups[b.RadioGroup] = b;
    g && this.CheckItem(g, 0);
  }
  if (this.OnDrawItem && !ngVal(this.OnDrawItem(this, k, a, b, d, e, f), false))
    return k;
  if ((j = ngVal(b.CheckGroup, false))) g = new ngStringBuilder();
  else {
    g = a;
    this.DrawItemText(a, b, d, e);
  }
  if (this.Columns.length > 0) {
    f = f || ngVal(b.Collapsed, false);
    if (typeof b.Items !== "undefined" && b.Items.length > 0) {
      e > 0 && g.append("</tbody>");
      g.append(
        '<tbody id="' +
          this.ID +
          "_G" +
          d +
          '_0"' +
          (f ? ' style="display:none;"' : "") +
          ">"
      );
      for (var n, o = e, t, q = 0; q < b.Items.length; q++) {
        n = this.DrawItem(g, b.Items[q], d + "_" + q, e + 1, f);
        o = n.l;
        if (this.ShowCheckboxes || typeof b.Items[q].Checked !== "undefined")
          if (typeof t === "undefined") t = n.s;
          else if (n.s != t) t = 2;
        if (o > e + 1) {
          g.append("</tbody>");
          if (q + 1 < b.Items.length)
            g.append(
              '<tbody id="' +
                this.ID +
                "_G" +
                d +
                "_" +
                (q + 1) +
                '"' +
                (f ? ' style="display:none;"' : "") +
                ">"
            );
        }
        if (j && typeof t !== "undefined") {
          b.Checked = t;
          k.s = t;
        }
      }
      k.l = o;
    }
  } else if (typeof b.Items !== "undefined" && b.Items.length > 0) {
    g.append(
      '<div id="' +
        this.ID +
        "_G" +
        d +
        '" level="' +
        e +
        '" style="display:' +
        (ngVal(b.Collapsed, false) ? "none" : "block") +
        ';">'
    );
    for (q = 0; q < b.Items.length; q++) {
      n = this.DrawItem(g, b.Items[q], d + "_" + q, e + 1);
      if (this.ShowCheckboxes || typeof b.Items[q].Checked !== "undefined")
        if (typeof t === "undefined") t = n.s;
        else if (n.s != t) t = 2;
    }
    g.append("</div>");
    if (j && typeof t !== "undefined") {
      b.Checked = t;
      k.s = t;
    }
  }
  if (j) {
    this.DrawItemText(a, b, d, e);
    a.append(g);
    delete g;
  }
  return k;
}
function ngl_CalcIndent() {
  for (var a, b, d, e = 0, f = null, g = 0; g < this.Items.length || !g; g++) {
    if (this.Items.length > 0) f = this.Items[g];
    f || (f = new ngListItem(":MeasureImg:"));
    b = 0;
    if (this.OnGetItemImg || this.OnGetCheckImg || this.OnGetTreeImg)
      a = this.ItemId(f);
    if (this.OnGetItemImg) d = this.OnGetItemImg(this, f, a, 0);
    else {
      this.SyncItemAction(f);
      d = ngVal(f.Image, this.ItemImg);
    }
    if (d) b += ngVal(d.W, 0);
    if (
      (d = this.OnGetCheckImg
        ? this.OnGetCheckImg(this, f, a)
        : typeof f.Checked === "undefined" && !this.ShowCheckboxes
          ? null
          : this.CheckImg)
    )
      b += ngVal(d.W, 0);
    if ((d = this.OnGetTreeImg ? this.OnGetTreeImg(this, f, a) : this.TreeImg))
      b += ngVal(d.W, 0);
    if (b > e) e = b;
  }
  if (typeof this.ListIndent === "undefined") this.ListIndent = e;
  if (typeof this.DefaultIndent === "undefined") this.DefaultIndent = e;
}
function ngl_DoUpdate(a) {
  if (this.update_cnt > 0 || this.ID == "") this.need_update = true;
  else {
    this.need_update = false;
    this.ActionUpdateTimer && clearTimeout(this.ActionUpdateTimer);
    this.ActionUpdateTimer = null;
    if (
      typeof this.ListIndent === "undefined" ||
      typeof this.DefaultIndent === "undefined"
    )
      this.CalcIndent();
    var b = this.BaseClassName,
      d = new ngStringBuilder();
    this.draw_selected = [];
    var e = this.Columns.length > 0;
    if (e)
      for (
        var f,
          g = false,
          j = [],
          k = -1,
          n,
          o = this.Columns.length,
          t = this.Columns.length / 2,
          q = 0;
        q < this.Columns.length;
        q++
      ) {
        f = this.Columns[q];
        if (typeof f.Width === "undefined") {
          n = Math.abs(t - q);
          if (n < o) {
            o = n;
            k = q;
          }
        }
        f = this.OnGetColumnCaption
          ? ngVal(this.OnGetColumnCaption(this, f, q), "")
          : ngVal(f.Caption, "");
        j[q] = f;
        if (f != "") g = true;
      }
    o = !ng_EmptyVar(this.Frame);
    var u = e && g && ngVal(this.ShowHeader, true);
    t = this.HasEmbededContent = o || u;
    g = 0;
    if (t) {
      var x = document.getElementById(this.ID + "_CB");
      if (x) g = x.scrollTop;
      ng_SetScrollBars(a, ssNone);
      if (
        typeof this.Bounds.W === "undefined" &&
        (typeof this.Bounds.L === "undefined" ||
          typeof this.Bounds.R === "undefined")
      )
        if (a.style.width == "0px") q = "0px";
        else if ((q = ng_StyleWidth(a))) q += "px";
        else q = "auto";
      else {
        q = ng_ClientWidth(a);
        q -=
          ng_GetCurrentStylePx(a, "padding-left") +
          ng_GetCurrentStylePx(a, "padding-right");
        q += "px";
      }
      if (
        typeof this.Bounds.H === "undefined" &&
        (typeof this.Bounds.T === "undefined" ||
          typeof this.Bounds.B === "undefined")
      )
        if (a.style.height == "0px") f = "0px";
        else if ((f = ng_StyleHeight(a))) f += "px";
        else f = "auto";
      else {
        f = ng_ClientHeight(a);
        f -=
          ng_GetCurrentStylePx(a, "padding-bottom") +
          ng_GetCurrentStylePx(a, "padding-top");
        f += "px";
      }
      d.append(
        '<div id="' +
          this.ID +
          '_F" style="position: absolute;left:0px;top:0px;z-index:800;"></div>'
      );
      d.append(
        '<div id="' +
          this.ID +
          '_CB" class="' +
          b +
          'Back" style="position:relative;left:0px;top:0px;width:' +
          q +
          ";height:" +
          f +
          ";"
      );
      switch (
        q == "auto" && f == "auto" ? ssNone : ngVal(this.ScrollBars, ssNone)
      ) {
        case ssNone:
          d.append("overflow:hidden;overflowX:hidden;overflowY:hidden;");
          break;
        case ssAuto:
          d.append("overflow:auto;  overflowX:auto;  overflowY:auto;");
          break;
        case ssBoth:
          d.append("overflow:scroll;overflowX:scroll;overflowY:scroll;");
          break;
        case ssHorizontal:
          d.append("overflow:scroll;overflowX:scroll;overflowY:hidden;");
          break;
        case ssVertical:
          d.append("overflow:scroll;overflowX:hidden;overflowY:scroll;");
          break;
        case ssDefault:
          d.append("overflow:visible;overflowX:visible;overflowY:visible;");
          break;
      }
      d.append('">');
    } else g = a.scrollTop;
    if (e) {
      d.append(
        '<table id="' +
          this.ID +
          '_TB" cellspacing="0" cellpadding="0" border="0" style="position:relative;left:0px;right:0px;overflow:hidden;">'
      );
      n = function(C) {
        u && w.append(C);
        d.append(C);
      };
      var w = u ? new ngStringBuilder() : d;
      n("<thead>");
      n("<tr>");
      for (q = 0; q < this.Columns.length; q++) {
        f = this.Columns[q];
        n("<td");
        if (q == k) n(' width="' + (this.Columns.length == 1 ? 1 : 100) + '%"');
        n(' align="' + f.Align + '"');
        u || d.append(' style="visibility: hidden"');
        n(">");
        f = this.OnGetColumnWidth
          ? this.OnGetColumnWidth(this, f, q, j[q])
          : f.Width;
        n(
          '<div style="position:relative; font-size:0px; line-height:0px; height:0px; width:' +
            (typeof f === "undefined" ? 0 : f) +
            'px"></div>'
        );
        if (u) {
          f = j[q];
          if (f == "")
            f =
              '<div style="width:0px;position:relative;overflow:hidden;">&nbsp;</div>';
          n('<div class="' + b + 'Caption"');
          w.append(
            ' id="' +
              this.ID +
              "_H" +
              q +
              '" ' +
              ngc_PtrEventsHTML(
                this,
                "capt" + q,
                "tap drag" + (this.OnCaptionDblClick ? " doubletap" : "")
              )
          );
          n(">");
          n(f);
          n("</div></td>");
        }
      }
      n("</tr>");
      n("</thead>");
    }
    for (q = 0; q < this.Items.length; q++) {
      b = this.DrawItem(d, this.Items[q], q, 0, false);
      b.l > 0 && d.append("</tbody>");
      if (typeof this.next_draw_itemidx !== "undefined") {
        if (this.next_draw_itemidx > q) q = this.next_draw_itemidx - 1;
        delete this.next_draw_itemidx;
      }
    }
    e && d.append("</table>");
    t && d.append("</div>");
    if (u) {
      d.append(
        '<div id="' +
          this.ID +
          '_FH" class="' +
          this.BaseClassName +
          'Header" style="position:absolute;left:' +
          ng_GetCurrentStylePx(a, "padding-left") +
          "px;top:" +
          ng_GetCurrentStylePx(a, "padding-top") +
          'px;z-index:100;overflow:hidden; background-color: inherit;">'
      );
      d.append(
        '<table id="' +
          this.ID +
          '_TH" cellspacing="0" cellpadding="0" border="0" style="overflow:hidden;">'
      );
      d.append(w);
      d.append("</table>");
      d.append("</div>");
    }
    ng_SetInnerHTML(a, d.toString());
    if (t) x = this.ContentElm = document.getElementById(this.ID + "_CB");
    else {
      x = null;
      this.ContentElm = a;
    }
    u && this.UpdateColumns();
    if (typeof this.ItemsControls !== "undefined")
      for (q = 0; q < this.ItemsControls.length; q++) {
        e = this.ItemsControls[q];
        e.SetBounds();
        e.Update();
      }
    if (t) {
      if (o)
        if ((e = document.getElementById(this.ID + "_F"))) {
          q = ng_ClientWidth(a);
          f = ng_ClientHeight(a);
          a = new ngStringBuilder();
          ngc_ImgBox(
            a,
            this.ID,
            "ngList",
            this.ControlHasFocus ? 1 : 0,
            this.Enabled,
            0,
            0,
            q,
            f,
            false,
            this.Frame
          );
          ng_SetInnerHTML(e, a.toString());
        }
      var y = this,
        z = u ? document.getElementById(this.ID + "_FH") : null;
      if (x)
        x.onscroll = function(C) {
          if (z) z.scrollLeft = x.scrollLeft;
          y.OnScroll && y.OnScroll(y, C, x);
        };
    }
    try {
      this.ContentElm.scrollTop = g;
    } catch (B) {}
    return true;
  }
}
function ngl_UpdateColumns() {
  if (this.ContentElm && this.Columns.length) {
    var a = this.ContentElm,
      b = document.getElementById(this.ID + "_FH");
    if (b) {
      var d = document.getElementById(this.ID + "_TB");
      if (d) {
        var e = document.getElementById(this.ID + "_TH");
        if (e) {
          ng_SetClientWidth(e, ng_ClientWidth(d));
          ng_SetClientWidth(b, ng_ClientWidth(a));
          a = d.firstChild.firstChild.firstChild;
          for (b = b.firstChild.firstChild.firstChild.firstChild; a && b; ) {
            a.getAttribute("width") != "100%" &&
              ng_SetClientWidth(b.firstChild, ng_ClientWidth(a));
            a = a.nextSibling;
            b = b.nextSibling;
          }
        }
      }
    }
  }
}
function ngl_UpdateFrame() {
  var a = document.getElementById(this.ID + "_F");
  if (!a) return true;
  var b = this.Elm();
  if (!b) return true;
  var d = ng_ClientWidth(b);
  b = ng_ClientHeight(b);
  var e = new ngStringBuilder();
  ngc_ImgBox(
    e,
    this.ID,
    "ngList",
    0,
    this.Enabled,
    0,
    0,
    d,
    b,
    false,
    this.Frame,
    "",
    ""
  );
  ng_SetInnerHTML(a, e.toString());
}
function ngl_AddItemControl(a) {
  if (a) {
    if (typeof this.ItemsControls === "undefined") this.ItemsControls = [];
    this.ItemsControls[this.ItemsControls.length] = a;
    a.ParentControl = this;
  }
}
function ngl_RemoveItemControl(a) {
  if (a)
    if (typeof this.ItemsControls !== "undefined") {
      for (var b = this.ItemsControls.length - 1; b >= 0; b--)
        this.ItemsControls[b] == a && this.ItemsControls.splice(b, 1);
      if (!this.ItemsControls.length) this.ItemsControls = undefined;
      a.ParentControl = undefined;
    }
}
function ngl_CreateItemControls(a, b) {
  this.BeginUpdate();
  if (a) {
    if (
      typeof a.Controls !== "undefined" &&
      typeof a.Controls.Owner === "undefined" &&
      typeof a.Controls.Parent === "undefined"
    ) {
      if (this.Columns.length > 0)
        for (var d, e = 0; e < this.Columns.length; e++) {
          d = this.Columns[e].ID;
          if (typeof a.Controls[d] !== "undefined") {
            if (typeof a.ControlsHolder === "undefined") a.ControlsHolder = {};
            a.ControlsHolder[d] = document.createElement("div");
            var f = ngCreateControls(
              a.Controls[d],
              undefined,
              a.ControlsHolder[d]
            );
            if (typeof a.Controls === "undefined") a.Controls = {};
            var g = {};
            ng_SetByRef(g, "Owner", this);
            ng_SetByRef(g, "Parent", a);
            a.Controls[d] = g;
            d = this.ParentReferences ? this.Owner : g;
            var j;
            for (var k in f) {
              j = f[k];
              j.Owner = d;
              this.AddItemControl(j);
              if (d) d[k] = j;
              if (d != g) g[k] = j;
            }
          }
        }
      else {
        a.ControlsHolder = document.createElement("div");
        f = ngCreateControls(a.Controls, undefined, a.ControlsHolder);
        a.Controls = {};
        ng_SetByRef(a.Controls, "Owner", this);
        ng_SetByRef(a.Controls, "Parent", a);
        d = this.ParentReferences ? this.Owner : a.Controls;
        for (k in f) {
          j = f[k];
          j.Owner = d;
          this.AddItemControl(j);
          if (d) d[k] = j;
          if (d != a.Controls) a.Controls[k] = j;
        }
      }
      this.Update();
    }
  } else a = this;
  if (typeof a.Items !== "undefined" && ngVal(b, true))
    for (k in a.Items) this.CreateItemControls(a.Items[k], true);
  this.EndUpdate();
}
function ngl_DoCreate(a) {
  if (typeof a.Data !== "undefined") {
    if (typeof a.Data.ParentReferences !== "undefined")
      this.ParentReferences = a.Data.ParentReferences;
    if (typeof a.Data.Items !== "undefined") {
      this.Items = [];
      this.AddItems(a.Data.Items);
      this.CreateItemControls();
    }
  }
  this.SetScrollBars(ngVal(this.ScrollBars, ssAuto));
}
function ngl_DoFocus(a) {
  ngc_Enter(a, this.Elm(), this.CtrlType);
  ngc_ChangeBox(this.ID, 1, this.Enabled, this.Frame);
  this.OnFocus && this.Enabled && this.OnFocus(this);
}
function ngl_DoBlur(a) {
  ngc_Leave(a, this.Elm(), this.CtrlType);
  ngc_ChangeBox(this.ID, 0, this.Enabled, this.Frame);
  if (ngl_ItemById(ngl_CurrentRowId).list == this)
    if ((a = document.getElementById(ngl_CurrentRowId)))
      ngl_LeaveRow(
        false,
        a,
        this.OnEnterRow != null || this.OnLeaveRow != null
      );
  this.OnBlur && this.Enabled && this.OnBlur(this);
}
function ngl_DoAttach(a) {
  if (a) {
    !ngAndroid &&
      a.getAttribute("tabindex") == null &&
      a.setAttribute("tabindex", 0);
    var b = this.CtrlType,
      d = this;
    a.onkeydown = ngl_KeyDown;
    a.onkeyup = ngl_KeyUp;
    a.onfocus = function(e) {
      ngc_Focus(e, this, b);
    };
    a.onblur = function(e) {
      ngc_Blur(e, this, b);
    };
    a.onscroll = function(e) {
      d.OnScroll && !d.HasEmbededContent && d.OnScroll(d, e, a);
    };
  }
}
function ngl_DoDispose() {
  this.Clear();
  return true;
}
function ngListItem(a) {
  this.Text = a;
}
function ngListCol(a, b, d, e) {
  this.ID = a;
  this.Caption = b;
  this.Align = ngVal(d, "left");
  this.Width = e;
}
function ngList(a) {
  ngControl(this, a, "ngList");
  this.DoCreate = ngl_DoCreate;
  this.DoAttach = ngl_DoAttach;
  this.DoMouseEnter = ngl_DoMouseEnter;
  this.DoMouseLeave = ngl_DoMouseLeave;
  this.DoPtrStart = ngl_DoPtrStart;
  this.DoPtrDrag = ngl_DoPtrDrag;
  this.DoPtrEnd = ngl_DoPtrEnd;
  this.DoPtrClick = ngl_DoPtrClick;
  this.DoPtrDblClick = ngl_DoPtrDblClick;
  this.DoGesture = ngl_DoGesture;
  this.DoFocus = ngl_DoFocus;
  this.DoBlur = ngl_DoBlur;
  this.DoDispose = ngl_DoDispose;
  this.ignore_select = 0;
  this.Columns = [];
  this.Items = [];
  this.HTMLEncode = false;
  this.radio_groups = [];
  this.Indent = null;
  this.ShowCheckboxes = false;
  this.ItemImg = this.TreeImg = this.CheckImg = null;
  this.KeyEvents = true;
  this.PageSize = 10;
  this.MouseEvents = true;
  this.ReadOnly = false;
  this.SelectType = nglSelectNone;
  this.SelCount = 0;
  this.SortColumn = "";
  this.SortDir = nglSortAsc;
  this.SortCaseSensitive = false;
  this.CheckedChangedDelay = 0;
  this.ParentReferences = false;
  this.Frame = {};
  this.do_add = ngl_do_add;
  this.do_remove = ngl_do_remove;
  this.Add = ngl_Add;
  this.AddItems = ngl_AddItems;
  this.SetItems = ngl_SetItems;
  this.Insert = ngl_Insert;
  this.Replace = ngl_Replace;
  this.Remove = ngl_Remove;
  this.Delete = ngl_Delete;
  this.Clear = ngl_Clear;
  this.IndexOf = ngl_IndexOf;
  this.GetPath = ngl_GetPath;
  this.Collapse = ngl_Collapse;
  this.Expand = ngl_Expand;
  this.CollapseAll = ngl_CollapseAll;
  this.ExpandAll = ngl_ExpandAll;
  this.ToggleCollapsed = ngl_ToggleCollapsed;
  this.CheckItem = ngl_CheckItem;
  this.CheckAll = ngl_CheckAll;
  this.UncheckAll = ngl_UncheckAll;
  this.GetChecked = ngl_GetChecked;
  this.ClickItem = ngl_ClickItem;
  this.SetItemVisible = ngl_SetItemVisible;
  this.SetItemEnabled = ngl_SetItemEnabled;
  this.Sort = ngl_Sort;
  this.Scan = ngl_Scan;
  this.ScanVisible = ngl_ScanVisible;
  this.FindItem = ngl_FindItem;
  this.FindItemByID = ngl_FindItemByID;
  this.GetItemFocus = ngl_GetItemFocus;
  this.SetItemFocus = ngl_SetItemFocus;
  this.FirstVisibleItem = ngl_FirstVisibleItem;
  this.PrevVisibleItem = ngl_PrevVisibleItem;
  this.NextVisibleItem = ngl_NextVisibleItem;
  this.LastVisibleItem = ngl_LastVisibleItem;
  this.draw_selected = [];
  this.selected = [];
  this.last_selected = "";
  this.SelectChanged = ngl_SelectChanged;
  this.ClearSelected = ngl_ClearSelected;
  this.SelectItem = ngl_SelectItem;
  this.GetSelected = ngl_GetSelected;
  this.IsItemSelected = ngl_IsItemSelected;
  this.do_checked = ngl_do_checked;
  this.CheckChanged = ngl_CheckChanged;
  this.UpdateChecked = ngl_UpdateChecked;
  this.UpdateCollapsed = ngl_UpdateCollapsed;
  this.CreateItemControls = ngl_CreateItemControls;
  this.AddItemControl = ngl_AddItemControl;
  this.RemoveItemControl = ngl_RemoveItemControl;
  this.ItemId = ngl_ItemId;
  this.ItemById = nglist_ItemById;
  this.CalcIndent = ngl_CalcIndent;
  this.DoDropDown = ngl_DoDropDown;
  this.DoDropDownFinished = ngl_DoDropDownFinished;
  this.SelectDropDownItem = ngl_SelectDropDownItem;
  this.SelectDropDownItemWithFocus = ngl_SelectDropDownItemWithFocus;
  this.GetRowClassName = ngl_GetRowClassName;
  this.DrawItemText = ngl_DrawItemText;
  this.DrawItem = ngl_DrawItem;
  this.DoUpdate = ngl_DoUpdate;
  this.UpdateColumns = ngl_UpdateColumns;
  this.UpdateFrame = ngl_UpdateFrame;
  this.ActionUpdateTimer = null;
  this.SetItemAction = ngl_SetItemAction;
  this.GetItemAction = ngl_GetItemAction;
  this.SyncItemAction = ngl_SyncItemAction;
  this.ActionSetVisible = ngl_ActionSetItemVisible;
  this.ActionCheck = ngl_ActionItemCheck;
  this.ActionClick = ngl_ActionItemClick;
  this.ActionUpdate = ngl_ActionItemUpdate;
  this.BeginUpdate = ngl_BeginUpdate;
  this.EndUpdate = ngl_EndUpdate;
  this.update_cnt = 0;
  this.need_update = false;
  this.OnGetColumnWidth = this.OnGetColumnCaption = this.OnGetTreeImg = this.OnGetCheckImg = this.OnGetItemImg = this.OnCalcIndent = this.OnMeasureItem = this.OnGetRowClassName = this.OnDrawItemText = this.OnDrawItem = this.OnBlur = this.OnFocus = this.OnLeaveRow = this.OnEnterRow = this.OnMouseLeave = this.OnMouseEnter = this.OnScroll = this.OnKeyUp = this.OnKeyDown = this.OnCaptionDblClick = this.OnCaptionClick = this.OnClick = this.OnDblClick = this.OnDblClickItem = this.OnClickItem = this.OnCompareItem = this.OnRedrawSelected = this.OnSelectChanged = this.OnSetItemEnabled = this.OnSetItemVisible = this.OnCheckChanged = this.OnItemCheckChanged = this.OnCollapsed = this.OnCollapsing = this.OnExpanded = this.OnExpanding = this.OnGetAlt = this.OnGetText = this.OnRemove = this.OnAdd = this.checked_changed_timer = null;
  ngControlCreated(this);
}
var plDisplayFixed = 0,
  plDisplayFit = 1,
  plFirstPage = -9999,
  plLastPage = -9998,
  plPaging_First = 1,
  plPaging_Prev = 2,
  plPaging_Next = 4,
  plPaging_Last = 8,
  plPaging_Pages = 16,
  plPaging_PageNo = 32,
  plPaging_HideDisabled = 256,
  plPagingUser = -1,
  plPagingSimple = plPaging_Prev | plPaging_Next,
  plPagingSimple2 = plPaging_Prev | plPaging_Next | plPaging_HideDisabled,
  plPagingSimpleEx = plPaging_Prev | plPaging_PageNo | plPaging_Next,
  plPagingPages = plPaging_Prev | plPaging_Pages | plPaging_Next,
  plPagingPages2 =
    plPaging_First |
    plPaging_Prev |
    plPaging_Pages |
    plPaging_Next |
    plPaging_Last,
  plPagingPagesEx = plPagingPages | plPaging_HideDisabled,
  plPagingPagesEx2 = plPagingPages2 | plPaging_HideDisabled,
  plPagingDataSet =
    plPaging_First | plPaging_Prev | plPaging_Next | plPaging_Last,
  plPagingDataSetEx =
    plPaging_First |
    plPaging_Prev |
    plPaging_PageNo |
    plPaging_Next |
    plPaging_Last,
  plPagingAll = 511,
  plDisplayPagingNone = 0,
  plDisplayPagingAlways = 1,
  plDisplayPagingNotEmpty = 2,
  plDisplayPagingMorePages = 3;
function npgl_OnListChanged(a, b, d) {
  d || a.ListPagingChanged();
  return true;
}
function npgl_ListPagingChanged() {
  this.page_start = [];
  this.page_start[0] = 0;
}
function npgl_DoUpdate() {
  if (this.Controls.List.Enabled != this.Enabled) {
    for (var a in this.Controls)
      typeof this.Controls[a].SetEnabled === "function" &&
        this.Controls[a].SetEnabled(this.Enabled);
    if (this.Enabled) this.Controls.List.paging_needs_update = true;
  }
  return true;
}
function npgl_DoUpdateBefore() {
  if (!(this.update_cnt > 0 || this.ID == "")) {
    var a = this.Owner.Owner;
    if (!a) return false;
    if (
      this.display_mode != a.DisplayMode ||
      (a.DisplayMode == plDisplayFixed &&
        this.displayed_items != a.DisplayedItems)
    )
      this.ListPagingChanged();
    a.DisplayMode == plDisplayFixed &&
      this.ContentElm &&
      ng_SetScrollBars(this.ContentElm, ssAuto);
    a.TopIndex >= this.Items.length && a.SetPage(a.PageByIndex(a.GetLength()));
    if (this.draw_page != a.Page)
      if (this.ContentElm) this.ContentElm.scrollTop = 0;
    var b = a.Controls.Paging ? a.Controls.Paging.Elm() : null;
    if (b && b.parentNode) {
      var d = ng_OuterHeight(b);
      if (a.PagingInside) {
        b.style.position = "relative";
        var e = { T: 0, B: "" };
        if (ngIExplorer6) e.R = 2;
        a.Controls.Paging.SetBounds(e);
        a.Controls.List.SetBounds({ B: 0 });
        this.draw_paging_height = d;
      } else {
        b.style.position = "absolute";
        a.Controls.Paging.SetBounds({ T: "", B: 0, R: 0 });
        e = a.IsPagingVisible();
        if (a.Controls.Paging && a.Controls.Paging.Visible != e)
          a.Controls.List.paging_needs_update = true;
        a.Controls.List.SetBounds({ B: e ? d : 0 });
        if (b.parentNode == a.Elm()) b = null;
        this.draw_paging_height = 0;
      }
      if (b) this.draw_paging_elm = b.parentNode.removeChild(b);
    } else {
      this.draw_paging_height = 0;
      a.Controls.List.SetBounds({ B: 0 });
    }
    this.Loading = false;
    b = a.DisplayedItems + (this.draw_measure ? 2 : 1);
    if (a.IsAsyncLoadingBlock(a.TopIndex, b)) {
      this.Loading = true;
      return false;
    }
    if (!this.draw_measure && !a.NeedData(a.TopIndex, b)) {
      if (a.AsyncWaiting()) this.Loading = true;
      return false;
    }
    this.draw_measure = a.DisplayMode == plDisplayFit;
    return true;
  }
}
function npgl_OnDrawItem(a, b, d, e, f, g) {
  if (a.in_measure) return true;
  b = a.Owner.Owner;
  if (a.draw_measure) {
    a.draw_measure = false;
    var j = a.Elm();
    if (a.HasEmbededContent) {
      var k = 1;
      if (a.Columns.length > 0) {
        k++;
        d.append("</table>");
      }
      d.append("</div>");
      ng_SetInnerHTML(j, d.toString());
      d.strings.splice(d.strings.length - k, k);
      j = document.getElementById(a.ID + "_CB");
    }
    if (j) {
      var n = ng_ClientHeight(j) - 1,
        o = 0,
        t;
      n -=
        ng_GetCurrentStylePx(j, "padding-top") +
        ng_GetCurrentStylePx(j, "padding-bottom");
      var q = false;
      if (a.draw_height != n && a.draw_height > 0) {
        q = true;
        a.ListPagingChanged();
      }
      a.draw_height = n;
      k = false;
      if (a.Columns.length > 0) {
        ng_SetInnerHTML(j, d.toString() + "</table>");
        if ((t = document.getElementById(a.ID + "_TB"))) o = ng_OuterHeight(t);
      }
      n -= a.draw_paging_height;
      n -= o;
      o = 0;
      var u,
        x,
        w = 0;
      a.in_measure = true;
      for (u = b.TopIndex; u < a.Items.length; u++) {
        t = new ngStringBuilder(d);
        if (!b.IsDataLoaded(u + 1)) {
          e = o && w ? Math.floor(n / (w / o)) : 0;
          x = b.DisplayedItems - (u - b.TopIndex);
          if (x > e) e = x;
          if (b.IsAsyncLoadingBlock(u + 1, e)) a.Loading = true;
          else b.DoLoadData(u + 1, e);
        }
        e = a.Items[u];
        if (typeof e === "undefined") e = {};
        x = e.Items;
        e.Items = undefined;
        l = a.DrawItem(t, e, u, 0, false);
        e.Items = x;
        l.l > 0 && t.append("</tbody>");
        a.Columns.length > 0 && t.append("</table>");
        ng_SetInnerHTML(j, t.toString());
        if ((t = document.getElementById(a.ID + "_" + u))) {
          j.style.display = "block";
          h = ng_OuterHeight(t);
          j.style.display = this.Visible ? "block" : "none";
        } else h = 0;
        n -= h;
        if (n < 0) break;
        w += h;
        o++;
        if (typeof e.Items === "object" && !ngVal(e.Collapsed, false)) k = true;
      }
      a.in_measure = false;
      ng_SetInnerHTML(j, "");
      if (u < a.Items.length) b.DisplayedItems = o;
      else if (o && w) b.DisplayedItems = o + Math.floor(n / (w / o));
      if (b.DisplayedItems <= 0) b.DisplayedItems = 1;
      if (q) {
        d = b.Page;
        if (b.TopIndex) {
          if (b.DisplayedItems > 0)
            b.Page = Math.floor(
              (b.TopIndex + b.DisplayedItems - 1) / b.DisplayedItems
            );
        } else {
          a.page_start_found = true;
          a.page_start[0] = 0;
          b.Page = 0;
        }
        if (d != b.Page) a.paging_needs_update = true;
      }
      if (
        !b.TopIndex ||
        (b.Page > 0 && typeof a.page_start[b.Page] !== "undefined")
      )
        a.page_start[b.Page + 1] = b.TopIndex + b.DisplayedItems;
      if (a.ContentElm) ng_SetScrollBars(a.ContentElm, k ? ssAuto : ssNone);
    }
  }
  if (!g) {
    b = a.Owner.Owner;
    if (a.draw_length != a.Items.length) a.paging_needs_update = true;
    if (b.IsAsyncLoadingBlock(b.TopIndex, b.DisplayedItems)) {
      a.Loading = true;
      a.next_draw_itemidx = a.Items.length;
      return false;
    }
    if (f < b.TopIndex) a.next_draw_itemidx = b.TopIndex;
    if (f >= b.TopIndex + b.DisplayedItems)
      a.next_draw_itemidx = a.Items.length;
    return f >= b.TopIndex && f < b.TopIndex + b.DisplayedItems;
  }
  return true;
}
function npgl_ShowLoading(a) {
  typeof this.Controls.Loading === "object" &&
    typeof this.Controls.Loading.SetVisible === "function" &&
    this.Controls.Loading.SetVisible(a);
}
function npgl_DoUpdateAfter() {
  if (!(this.update_cnt > 0 || this.ID == "")) {
    this.draw_measure = false;
    var a = this.Owner.Owner;
    if (!a) return true;
    if (a.IsAsyncLoadingBlock(a.TopIndex, a.DisplayedItems))
      this.Loading = true;
    if (a.loading_displayed != this.Loading)
      if ((a.loading_displayed = this.Loading))
        a.OnShowLoading ? a.OnShowLoading(a) : a.ShowLoading(true);
      else a.OnHideLoading ? a.OnHideLoading(a) : a.ShowLoading(false);
    this.Loading && this.ContentElm && ng_SetInnerHTML(this.ContentElm, "");
    if (this.draw_paging_elm) {
      if (a.PagingInside)
        this.ContentElm && this.ContentElm.appendChild(this.draw_paging_elm);
      else {
        var b = a.Elm();
        b && b.appendChild(this.draw_paging_elm);
      }
      this.draw_paging_elm = null;
    }
    a.PagingInside &&
      a.Controls.Paging &&
      a.Controls.Paging.SetVisible(!this.Loading && a.IsPagingVisible());
    if (this.paging_needs_update) {
      this.paging_needs_update = false;
      a.UpdatePaging();
    }
    this.draw_page = a.Page;
    this.draw_length = this.Items.length;
    this.displayed_items = a.DisplayedItems;
    this.display_mode = a.DisplayMode;
    delete this.draw_paging_height;
    if (
      this.init_page > 0 &&
      (a.DisplayMode == plDisplayFixed || !this.Loading)
    ) {
      b = this.init_page;
      this.init_page = 0;
      a.SetPage(b);
    }
    if (
      a.AutoSelectFirstItem &&
      !a.firstitemselected &&
      this.SelCount == 0 &&
      a.IsDataLoaded(0)
    ) {
      a.firstitemselected = true;
      this.SelectItem(this.Items[0]);
    }
    return true;
  }
}
function npgl_OnExpanding() {
  var a = this.Owner.Owner;
  this.ContentElm && ng_SetScrollBars(this.ContentElm, ssAuto);
  if (
    (a =
      ngIExplorerVersion == 7 && a && a.Controls.Paging
        ? a.Controls.Paging.Elm()
        : null)
  ) {
    a.style.display = "none";
    a.style.display = "block";
  }
  return true;
}
function npgl_SetPage(a) {
  a = parseInt(a);
  if (!(isNaN(a) || (a < 0 && a != plFirstPage && a != plLastPage)))
    if (a != this.Page || this.TopIndex == 999999999) {
      if (this.TopIndex == 999999999) this.TopIndex = 0;
      var b = false,
        d = this.Controls.List;
      if (
        !(this.OnPageChanging && !ngVal(this.OnPageChanging(this, a), false))
      ) {
        var e = this.Page,
          f = this.TopIndex;
        if (a == plFirstPage) {
          this.TopIndex = 0;
          a = d.page_start[0] = 0;
        } else
          switch (a - e) {
            case 1:
              var g = d.page_start[a],
                j = d.page_start[e];
              if (
                d.page_start_found &&
                typeof g !== "undefined" &&
                typeof j !== "undefined"
              ) {
                this.TopIndex = g;
                d.page_start_found = true;
              } else {
                d.page_start_found = false;
                this.TopIndex += this.DisplayedItems;
                if (j != "undefined") d.page_start[a] = this.TopIndex;
              }
              break;
            case -1:
              g = d.page_start[a];
              j = d.page_start[e];
              if (
                d.page_start_found &&
                typeof g !== "undefined" &&
                typeof j !== "undefined"
              ) {
                this.TopIndex = g;
                d.page_start_found = true;
              } else {
                d.page_start_found = false;
                this.TopIndex -= this.DisplayedItems;
              }
              if (this.TopIndex < 0) this.TopIndex = 0;
              break;
            default:
              j = this.GetLength();
              if (
                a == plLastPage &&
                (!this.IsDynamicData() || typeof this.MaxLength !== "undefined")
              )
                a = this.PageByIndex(j);
              for (var k = 0; k < 2; k++) {
                if (a != plLastPage) {
                  g = d.page_start[a];
                  if (typeof g !== "undefined") {
                    this.TopIndex = g;
                    d.page_start_found = true;
                  } else {
                    var n = (g = 0);
                    if (this.DisplayMode != plDisplayFixed) {
                      var o = -1;
                      for (g in d.page_start)
                        if (
                          g > o &&
                          g <= a &&
                          typeof d.page_start[g] !== "undefined"
                        )
                          o = g;
                      if (o >= 0) {
                        n = d.page_start[o];
                        g = o;
                      } else g = 0;
                    }
                    this.TopIndex = n + (a - g) * this.DisplayedItems;
                    d.page_start_found = false;
                  }
                } else this.TopIndex = 999999999;
                if (
                  a == plLastPage ||
                  (this.TopIndex > 0 && this.TopIndex >= d.Items.length)
                )
                  if (!this.AsyncWaiting())
                    this.async_datapage = a == plLastPage ? e : a;
                this.NeedData(
                  this.TopIndex,
                  this.DisplayedItems +
                    (this.DisplayMode == plDisplayFit ? 2 : 1)
                );
                this.AsyncWaiting() || delete this.async_datapage;
                if (a == plLastPage) {
                  f = 999999999;
                  b = true;
                  a = this.PageByIndex(j);
                  break;
                }
                if (this.TopIndex > 0 && this.TopIndex >= j)
                  a = this.PageByIndex(j);
                else break;
              }
              break;
          }
        if (this.TopIndex >= d.Items.length) {
          this.TopIndex = f;
          a = e;
        }
        if (a < 0) a = 0;
        if (this.TopIndex) {
          if (!a && this.TopIndex > 0) a = 1;
        } else {
          d.page_start[0] = 0;
          d.page_start_found = true;
        }
        this.Page = a;
        this.UpdatePaging();
        if (f != this.TopIndex || b) d.Update();
        this.OnPageChanged && this.OnPageChanged(this, e);
      }
    }
}
function npgl_SetPagingType(a, b) {
  if (typeof a !== "undefined") {
    if (a == this.PagingType) return;
    this.PagingType = a;
  } else a = this.PagingType;
  if (a != plPagingUser) {
    var d = false,
      e = false,
      f = (a & plPaging_First) != 0,
      g = (a & plPaging_Prev) != 0,
      j = (a & plPaging_PageNo) != 0,
      k = (a & plPaging_Pages) != 0,
      n = (a & plPaging_Next) != 0,
      o = (a & plPaging_Last) != 0;
    a = (a & plPaging_HideDisabled) != 0;
    if ((c = this.Controls.FirstPage) && c.InitVisible != f) {
      c.InitVisible = f;
      d = true;
    }
    if ((c = this.Controls.PrevPage) && c.InitVisible != g) {
      c.InitVisible = g;
      d = true;
    }
    if ((c = this.Controls.NextPage) && c.InitVisible != n) {
      c.InitVisible = n;
      d = true;
    }
    if ((c = this.Controls.LastPage) && c.InitVisible != o) {
      c.InitVisible = o;
      d = true;
    }
    if ((c = this.Controls.PageNo) && c.InitVisible != j) {
      c.InitVisible = j;
      e = d = true;
    }
    if (this.PagesVisible != k) {
      this.PagesVisible = k;
      d = e = true;
    }
    if (this.PagingHideDisabled != a) {
      this.PagingHideDisabled = a;
      d = true;
    }
    if (d && ngVal(b, true)) {
      if (e && this.Controls.List)
        this.Controls.List.paging_needs_update = true;
      this.Update();
    }
  }
}
function npgl_IsPagingVisible() {
  var a = false;
  if (!this.Controls.List || (this.Controls.List.Loading && this.PagingInside))
    return a;
  switch (this.DisplayPaging) {
    case plDisplayPagingAlways:
      a = true;
      break;
    case plDisplayPagingNotEmpty:
      a = this.Controls.List && this.GetLength() > 0;
      break;
    case plDisplayPagingMorePages:
      a =
        this.Controls.List &&
        (this.Page > 0 ||
          this.TopIndex + this.DisplayedItems < this.GetLength());
      break;
  }
  return a;
}
function npgl_IsPrevPageAvailable() {
  return this.TopIndex > 0;
}
function npgl_IsNextPageAvailable() {
  return this.TopIndex + this.DisplayedItems < this.GetLength();
}
function npgl_UpdatePaging() {
  var a,
    b = this.GetLength(),
    d = {
      PageNo: "" + (this.Page + 1),
      PrevPage: this.TopIndex > 0,
      NextPage: this.TopIndex + this.DisplayedItems < b,
      PagingVisible: this.IsPagingVisible(),
      PagingTo:
        this.Page +
        ngVal(this.PagingLookout, Math.floor((this.PagingSize - 1) / 2)),
      Update: false
    };
  d.FirstPage = d.PrevPage;
  d.LastPage = d.NextPage;
  if (this.PagingInside) d.Update = true;
  if ((a = ngVal(this.PagingMinSize, 0)) && d.PagingTo < a) d.PagingTo = a - 1;
  if (d.PagingTo < 0) d.PagingTo = 0;
  if (!this.IsDynamicData() || typeof this.MaxLength !== "undefined")
    for (; d.PagingTo > this.Page; ) {
      a = this.Controls.List.page_start[d.PagingTo];
      if (typeof a === "undefined")
        a = this.TopIndex + (d.PagingTo - this.Page) * this.DisplayedItems;
      if (a < b) break;
      d.PagingTo--;
    }
  d.PagingFrom = d.PagingTo - this.PagingSize;
  if (
    !(this.OnPagingUpdating && !ngVal(this.OnPagingUpdating(this, d), false))
  ) {
    if (this.Controls.Paging) {
      a = d.PagingVisible;
      if (a != this.Controls.Paging.Visible) {
        this.Controls.Paging.SetVisible(a);
        this.PagingInside ||
          this.Controls.List.SetBounds({
            B: a
              ? typeof this.draw_paging_height !== "undefined"
                ? this.draw_paging_height
                : ng_OuterHeight(this.Controls.Paging.Elm())
              : 0
          });
      }
    }
    if ((b = this.Controls.FirstPage)) {
      a = d.FirstPage;
      b.SetEnabled(this.Enabled && a);
      if (this.PagingType != plPagingUser) {
        a = b.InitVisible && (a || !this.PagingHideDisabled);
        if (b.Visible != a) d.Update = true;
        b.SetVisible(a);
      }
    }
    if ((b = this.Controls.PrevPage)) {
      a = d.PrevPage;
      b.SetEnabled(this.Enabled && a);
      if (this.PagingType != plPagingUser) {
        a = b.InitVisible && (a || !this.PagingHideDisabled);
        if (b.Visible != a) d.Update = true;
        b.SetVisible(a);
      }
    }
    if ((b = this.Controls.NextPage)) {
      a = d.NextPage;
      b.SetEnabled(this.Enabled && a);
      if (this.PagingType != plPagingUser) {
        a = b.InitVisible && (a || !this.PagingHideDisabled);
        if (b.Visible != a) d.Update = true;
        b.SetVisible(a);
      }
    }
    if ((b = this.Controls.LastPage)) {
      a = d.LastPage;
      b.SetEnabled(this.Enabled && a);
      if (this.PagingType != plPagingUser) {
        a = b.InitVisible && (a || !this.PagingHideDisabled);
        if (b.Visible != a) d.Update = true;
        b.SetVisible(a);
      }
    }
    if ((b = this.Controls.PageNo)) {
      this.PagingType != plPagingUser && b.SetVisible(b.InitVisible);
      if (b.Text != d.PageNo) {
        b.Text = d.PageNo;
        if (b.Visible) d.Update = true;
      }
    }
    var e,
      f = d.PagingTo;
    if (d.PagingFrom < 0) d.PagingFrom = 0;
    for (var g = this.PagingSize - 1; g >= 0; g--) {
      b = this.Controls["Page" + g];
      if (!(!b || typeof b === "undefined")) {
        txt = "" + (f + 1);
        if (b.Text != txt) {
          b.Text = txt;
          d.Update = true;
        }
        b.Page = f;
        e = f == this.Page ? 1 : 0;
        a = this.PagesVisible && f >= d.PagingFrom;
        if (b.Checked != e) {
          b.Checked = e;
          if (a) d.Update = true;
        }
        b.SetVisible(a);
        f--;
      }
    }
    if (!(this.OnPagingUpdated && !ngVal(OnPagingUpdated(this, d), false))) {
      if (d.Update && this.Controls.Paging) {
        this.Controls.Paging.Update();
        return true;
      }
      return false;
    }
  }
}
function npgl_FirstPage() {
  this.SetPage(plFirstPage);
}
function npgl_NextPage() {
  this.SetPage(this.Page + 1);
}
function npgl_PrevPage() {
  this.SetPage(this.Page - 1);
}
function npgl_LastPage() {
  this.SetPage(plLastPage);
}
function npgl_PageByIndex(a) {
  var b,
    d = 0,
    e = 0,
    f = this.Controls.List;
  if (!f) return 0;
  if (a < 0) a = 0;
  b = this.GetLength();
  if (a >= b) a = b - 1;
  if (this.DisplayMode != plDisplayFixed) {
    var g = 1e5;
    for (var j in f.page_start) {
      s = f.page_start[j];
      if (typeof s !== "undefined") {
        b = Math.abs(s - a);
        if (b < g) {
          g = b;
          e = parseInt(j);
          d = parseInt(s);
        }
      }
    }
  }
  if (this.DisplayedItems > 0) {
    b = Math.floor((a - d) / this.DisplayedItems);
    e += b;
  }
  return e;
}
function npgl_OnKeyDown(a) {
  switch (a.keyCode) {
    case 33:
      (a = a.Owner.Owner.Owner) && a.KeyEvents && a.PrevPage();
      return false;
    case 34:
      (a = a.Owner.Owner.Owner) && a.KeyEvents && a.NextPage();
      return false;
  }
  return true;
}
function npgl_PageButtonClick(a) {
  var b = a.Owner.Page;
  typeof b !== "undefined" && a.Owner.Owner.Owner.SetPage(b);
}
function npgl_NeedData(a, b) {
  var d = this.Controls.List;
  if (!d || b <= 0) return true;
  if (a >= d.Items.length) return this.DoLoadData(a, b);
  for (var e = 0; e < b && a + e <= d.Items.length; e++)
    if (!this.IsDataLoaded(a + e)) {
      if (!this.DoLoadData(a + e, b - e)) return false;
      if (this.AsyncData) break;
    }
  return true;
}
function npgl_IsDynamicData() {
  return this.OnLoadData || this.AsyncDataURL != "";
}
function npgl_IsDataLoaded(a) {
  if (!this.IsDynamicData()) return true;
  var b = this.Controls.List;
  if (!b) return true;
  if (this.OnIsDataLoaded) return this.OnIsDataLoaded(this, b, a);
  if (a < 0) return true;
  if (a >= b.Items.length) return false;
  if (
    !this.CacheData &&
    (a < this.TopIndex || a >= this.TopIndex + this.DisplayedItems)
  )
    return false;
  a = b.Items[a];
  if (typeof a === "undefined") return false;
  for (var d in a) return true;
  return false;
}
function npgl_InvalidateData(a, b) {
  var d = this.Controls.List;
  if (d) {
    if (typeof a === "undefined") {
      a = 0;
      b = d.Items.length;
    }
    if (typeof b !== "undefined") {
      if (this.IsDynamicData()) {
        if (
          !this.OnInvalidateData ||
          ngVal(this.OnInvalidateData(this, a, b), false)
        )
          if (a < d.Items.length)
            for (var e = 0; e < b && a + e <= d.Items.length; e++) {
              d.do_remove(d.Items[a + e], d);
              delete d.Items[a + e];
            }
        if (!this.IsAsyncLoadingBlock(a, b)) {
          var f = a + b;
          if (!this.AsyncWaiting()) {
            b = this.last_asyncdata_index + this.last_asyncdata_count;
            if (
              !(
                a < this.last_asyncdata_index && f < this.last_asyncdata_index
              ) ||
              (a >= b && f >= b)
            ) {
              this.last_asyncdata_index = -1;
              this.last_asyncdata_count = 0;
            }
          }
        }
      }
      b = this.TopIndex + this.DisplayedItems;
      if (!(a < this.TopIndex && f < this.TopIndex) || (a >= b && f >= b))
        d.Update();
    }
  }
}
function npgl_AsyncTimeout(a) {
  if ((a = ngGetControlById(a, "ngPanel"))) {
    a.async_datatimeout_timer && clearTimeout(a.async_datatimeout_timer);
    a.async_datatimeout_timer = null;
    if (a.AsyncWaiting()) {
      a.DoLoadData(a.async_dataindex, a.async_datacount, true);
      a.async_datatimeout_retry < 0 && a.SetAsyncData(a.async_dataindex, []);
    }
  }
}
function npgl_Refresh() {
  this.InvalidateData(this.TopIndex, this.DisplayedItems);
}
function npgl_GetRPC() {
  if (!this.IsDynamicData()) return null;
  if (!this.async_rpc) {
    this.async_rpc = new ngRPC(this.ID);
    this.async_rpc.nocache = true;
  }
  return this.async_rpc;
}
function npgl_DoLoadData(a, b, d) {
  if (!this.IsDynamicData()) return true;
  var e = this.Controls.List;
  if (!e) {
    this.async_datatimeout_retry = -1;
    return false;
  }
  if (typeof this.MaxLength !== "undefined")
    if (a > this.MaxLength) b = 0;
    else if (a + b > this.MaxLength) b = this.MaxLength - a;
  if (typeof b === "undefined" || b < 1) {
    this.async_datatimeout_retry = -1;
    return true;
  }
  var f = this.last_asyncdata_index + this.last_asyncdata_count,
    g = a + b;
  if (
    a >= this.last_asyncdata_index &&
    a < f &&
    g >= this.last_asyncdata_index &&
    g <= f
  ) {
    this.async_datatimeout_retry = -1;
    return true;
  }
  if (
    this.async_dataindex == a &&
    this.async_datacount == b &&
    ngVal(d, false)
  ) {
    this.async_datatimeout_retry--;
    if (this.async_datatimeout_retry < 0) {
      this.async_datatimeout_retry = -1;
      return true;
    }
    this.async_datacount = this.async_dataindex = undefined;
  } else if (!this.AsyncWaiting())
    this.async_datatimeout_retry = this.AsyncDataRetryCnt;
  if (this.AsyncData) {
    if (this.AsyncWaiting()) return false;
    this.async_dataindex = a;
    this.async_datacount = b;
    this.async_datatimeout_timer && clearTimeout(this.async_datatimeout_timer);
    this.async_datatimeout_timer = null;
    if (this.AsyncDataTimeout > 0 && this.async_datatimeout_retry >= 0)
      this.async_datatimeout_timer = setTimeout(
        "npgl_AsyncTimeout('" + this.ID + "');",
        this.AsyncDataTimeout * 1e3
      );
  }
  var j;
  if (this.OnLoadData) j = this.OnLoadData(this, e, a, b);
  else {
    if (!this.async_rpc) {
      this.async_rpc = new ngRPC(this.ID);
      this.async_rpc.nocache = true;
    }
    d = this.AsyncDataURL;
    d = ng_AddURLParam(
      d,
      "id=" + ng_URLEncode(this.ID) + "&i=" + a + "&c=" + b
    );
    if (typeof ngApp === "object" && ngApp)
      d = ng_AddURLParam(d, "lang=" + ngApp.Lang);
    if (this.OnAsyncURLRequest) d = this.OnAsyncURLRequest(this, d, a, b);
    d != "" && this.async_rpc && this.async_rpc.sendRequest(d);
  }
  if (typeof j === "object" && j) {
    j.length > 0 && j.length < b && this.SetLength(a + j.length);
    for (d = 0; d < j.length; d++) {
      b = d + a;
      if (b >= e.Items.length) {
        e.Items.length = b;
        if (typeof this.MaxLength !== "undefined" && this.MaxLength < b)
          this.MaxLength = b;
      }
      typeof j[d] !== "undefined" && e.Replace(b, ng_CopyVar(j[d]));
    }
  }
  return true;
}
function npgl_AsyncWaiting() {
  return ngVal(this.async_dataindex, -1) >= 0;
}
function npglSetAsyncDataCallback(a, b, d, e) {
  a = ngGetControlById(a, "ngPanel");
  if (!a) return false;
  typeof e !== "undefined" && a.SetLength(e);
  a.SetAsyncData(b, d);
  return true;
}
function npgl_SetAsyncData(a, b) {
  if (this.AsyncWaiting()) {
    var d = this.Controls.List;
    if (d) {
      var e = false;
      a = ngVal(a, this.async_dataindex);
      if (
        !(this.OnSetAsyncData && !ngVal(this.OnSetAsyncData(this, a, b), false))
      ) {
        if (typeof b === "object" && b && a != 999999999) {
          var f,
            g = this.async_dataindex + this.async_datacount;
          if (
            a == this.async_dataindex &&
            b.length > 0 &&
            b.length < this.async_datacount
          ) {
            this.SetLength(a + b.length);
            e = true;
          }
          for (var j = 0; j < b.length; j++) {
            f = j + a;
            if (f >= d.Items.length) {
              d.Items.length = f;
              if (typeof this.MaxLength !== "undefined" && this.MaxLength < f)
                this.MaxLength = f;
            }
            if (typeof b[j] !== "undefined") {
              d.Replace(f, ng_CopyVar(b[j]));
              if (f >= this.async_dataindex && f < g) e = true;
            }
          }
          if (!b.length && !a && typeof this.MaxLength === "undefined") {
            this.SetLength(0);
            e = true;
          }
        }
        a = this.async_dataindex;
        f = this.async_datacount;
        if (!e)
          for (j = 0; j < f && a + j < d.Items.length; j++)
            if (!this.IsDataLoaded(a + j)) return;
        a = this.async_dataindex;
        if (
          this.IsAsyncLoadingBlock(this.TopIndex, this.DisplayedItems) ||
          this.List.Loading
        )
          e = true;
        this.last_asyncdata_index = this.async_dataindex;
        this.last_asyncdata_count = this.async_datacount;
        this.async_datatimeout_timer &&
          clearTimeout(this.async_datatimeout_timer);
        this.async_datatimeout_timer = null;
        this.async_datacount = this.async_dataindex = undefined;
        if (typeof this.async_datapage !== "undefined") {
          j = this.async_datapage;
          f = this.GetLength();
          if (a >= f) j = this.PageByIndex(f);
          delete this.async_datapage;
          if (this.Page != j) {
            this.SetPage(j);
            return;
          }
        }
        if (typeof b !== "object" || e) d.Update();
      }
    }
  }
}
function npgl_SetLength(a) {
  if (this.OnSetLength) a = this.OnSetLength(this, a);
  if (this.IsDynamicData()) {
    this.MaxLength = a;
    if (typeof a !== "undefined")
      if ((b = this.Controls.List) && a < b.Items.length) b.Items.length = a;
  } else if (typeof a !== "undefined") {
    var b = this.Controls.List;
    if (b) b.Items.length = a;
  }
}
function npgl_GetLength() {
  if (this.IsDynamicData() && typeof this.MaxLength !== "undefined")
    return this.MaxLength;
  var a = this.Controls.List;
  return a ? a.Items.length : 0;
}
function npgl_IsAsyncLoadingBlock(a, b) {
  if (!this.AsyncWaiting()) return false;
  b = a + b;
  var d = this.async_dataindex + this.async_datacount;
  return (
    !(a < this.async_dataindex && b < this.async_dataindex) ||
    (a >= d && b >= d)
  );
}
function npgl_IndexOf(a, b) {
  var d = this.Owner.Owner;
  if (d)
    if (!b || b == this)
      for (
        var e = d.TopIndex;
        e < d.TopIndex + d.DisplayedItems && e < this.Items.length;
        e++
      )
        if (this.Items[e] == a) return e;
  return this.DefaultIndexOf(a, b);
}
function npgl_Reset(a) {
  var b = this.Controls.List;
  b && b.BeginUpdate();
  delete this.firstitemselected;
  this.async_datacount = this.async_dataindex = this.MaxLength = undefined;
  this.last_asyncdata_index = -1;
  this.last_asyncdata_count = 0;
  b && b.ClearSelected();
  this.FirstPage();
  this.InvalidateData();
  if (b) {
    ngVal(a, false) && b.Clear();
    b.EndUpdate();
  }
}
function npgl_GetPageTopItems() {
  for (
    var a = [], b = this.Controls.List, d = this.TopIndex;
    d < this.TopIndex + this.DisplayedItems && d < b.Items.length;
    d++
  )
    d < 0 || (a[a.length] = b.Items[d]);
  return a;
}
function npgl_ScanPageItems(a, b, d) {
  if (typeof a !== "function") return false;
  for (
    var e = this.Controls.List, f = this.TopIndex;
    f < this.TopIndex + this.DisplayedItems && f < e.Items.length;
    f++
  )
    if (!(f < 0)) {
      if (!a(this, e.Items[f], e, d)) return false;
      if (ngVal(b, true) && !e.Scan(a, e.Items[f], d)) return false;
    }
  return true;
}
function npgl_ScanVisiblePageItems(a, b, d) {
  if (typeof a !== "function") return false;
  for (
    var e = this.Controls.List, f = this.TopIndex;
    f < this.TopIndex + this.DisplayedItems && f < e.Items.length;
    f++
  )
    if (!(f < 0)) {
      var g = e.Items[f];
      if (typeof g !== "undefined")
        if (ngVal(g.Visible, true)) {
          if (!a(this, g, e, d)) return false;
          if (
            !(
              ngVal(g.Collapsed, false) ||
              typeof g.Items === "undefined" ||
              !g.Items.length
            )
          )
            if (ngVal(b, true) && !e.ScanVisible(a, g, d)) return false;
        }
    }
  return true;
}
function Create_ngPageList(a, b, d) {
  ng_MergeDef(a, {
    Data: { PagingSize: 5 },
    Controls: {
      List: {
        Type: "ngList",
        style: { border: "0px" },
        L: 0,
        T: 0,
        R: 0,
        B: 24
      },
      Paging: {
        Type: "ngToolBar",
        L: 0,
        B: 0,
        R: 0,
        H: 24,
        Data: { Visible: false },
        Controls: {
          FirstPage: {
            Type: "ngButton",
            Data: { Text: "|<" },
            Events: {
              OnClick: function(j) {
                j.Owner.Owner.Owner.FirstPage();
              }
            }
          },
          PrevPage: {
            Type: "ngButton",
            Data: { Text: "<" },
            Events: {
              OnClick: function(j) {
                j.Owner.Owner.Owner.PrevPage();
              }
            }
          },
          PageNo: {
            Type: "ngEdit",
            W: 30,
            Data: { Text: "1", TextAlign: "center" },
            Events: {
              OnKeyDown: function(j) {
                if (j.keyCode == 13) {
                  j.Owner.Owner.Owner.SetPage(parseInt(j.Owner.GetText()) - 1);
                  return false;
                }
                return true;
              }
            }
          },
          Page0: {
            Type: "ngButton",
            Data: { Text: "1", TextAlign: "center" },
            Events: { OnClick: npgl_PageButtonClick }
          },
          NextPage: {
            Type: "ngButton",
            Data: { Text: ">" },
            Events: {
              OnClick: function(j) {
                j.Owner.Owner.Owner.NextPage();
              }
            }
          },
          LastPage: {
            Type: "ngButton",
            Data: { Text: ">|" },
            Events: {
              OnClick: function(j) {
                j.Owner.Owner.Owner.LastPage();
              }
            }
          }
        }
      }
    }
  });
  var e = ngVal(a.Data.PagingSize, 5);
  if (e < 0) e = 1;
  for (var f = 1; f < e; f++)
    if (!(typeof a.Controls.Paging !== "object" || !a.Controls.Paging)) {
      var g = {};
      g["Page" + f] = a.Controls.Paging.Controls.Page0;
      ng_MergeDef(a.Controls.Paging.Controls, g);
    }
  c = ngCreateControlAsType(a, "ngFrame", b, d);
  if (!c) return c;
  c.DisplayMode = plDisplayFit;
  c.PagingType = plPagingSimple;
  c.PagingSize = e;
  c.PagingMinSize = void 0;
  c.PagingLookout = void 0;
  c.PagingInside = true;
  c.PagingHideDisabled = false;
  c.DisplayPaging = plDisplayPagingMorePages;
  c.KeyEvents = true;
  c.AutoSelectFirstItem = false;
  c.Page = 0;
  c.TopIndex = 0;
  c.DisplayedItems = 10;
  c.MaxLength = void 0;
  c.CacheData = true;
  c.AsyncData = true;
  c.AsyncDataTimeout = 30;
  c.AsyncDataRetryCnt = 3;
  c.AsyncDataURL = "";
  c.SetPage = npgl_SetPage;
  c.NextPage = npgl_NextPage;
  c.PrevPage = npgl_PrevPage;
  c.FirstPage = npgl_FirstPage;
  c.LastPage = npgl_LastPage;
  c.IsPrevPageAvailable = npgl_IsPrevPageAvailable;
  c.IsNextPageAvailable = npgl_IsNextPageAvailable;
  c.PageByIndex = npgl_PageByIndex;
  c.SetPagingType = npgl_SetPagingType;
  c.IsPagingVisible = npgl_IsPagingVisible;
  c.UpdatePaging = npgl_UpdatePaging;
  c.SetAsyncData = npgl_SetAsyncData;
  c.SetLength = npgl_SetLength;
  c.GetLength = npgl_GetLength;
  c.IsDynamicData = npgl_IsDynamicData;
  c.GetRPC = npgl_GetRPC;
  c.IsDataLoaded = npgl_IsDataLoaded;
  c.DoLoadData = npgl_DoLoadData;
  c.NeedData = npgl_NeedData;
  c.GetPageTopItems = npgl_GetPageTopItems;
  c.InvalidateData = npgl_InvalidateData;
  c.Refresh = npgl_Refresh;
  c.Reset = npgl_Reset;
  c.ScanPageItems = npgl_ScanPageItems;
  c.ScanVisiblePageItems = npgl_ScanVisiblePageItems;
  c.ShowLoading = npgl_ShowLoading;
  c.IsAsyncLoadingBlock = npgl_IsAsyncLoadingBlock;
  c.loading_displayed = false;
  c.last_asyncdata_index = -1;
  c.last_asyncdata_count = 0;
  c.async_rpc = null;
  c.AsyncWaiting = npgl_AsyncWaiting;
  c.OnPageChanging = null;
  c.OnPageChanged = null;
  c.OnPagingUpdating = null;
  c.OnPagingUpdated = null;
  c.OnLoadData = null;
  c.OnInvalidateData = null;
  c.OnAsyncURLRequest = null;
  c.OnSetAsyncData = null;
  c.OnSetLength = null;
  c.OnShowLoading = null;
  c.OnHideLoading = null;
  a.OnCreated = ngAddEvent(a.OnCreated, function(j) {
    if (j.Controls.Paging) {
      var k = j.Controls.Paging.ChildControls;
      if (typeof k !== "undefined") {
        var n = j.Controls.Paging.HAlign == "right";
        if (n) {
          for (var o = [], t = 0, q = k.length - 1; q >= 0; q--) o[t++] = k[q];
          k = j.Controls.Paging.ChildControls = o;
        }
        for (t = 1; t < j.PagingSize; t++)
          if ((o = j.Controls["Page" + t])) {
            o.InitVisible = o.Visible;
            for (q = k.length - 1; q >= 0; q--)
              if (k[q] == o) {
                k.splice(q, 1);
                break;
              }
          }
        var u = -1;
        for (q = k.length - 1; q >= 0; q--) {
          o = k[q];
          o.InitVisible = o.Visible;
          if (o == j.Controls.Page0) u = q + 1;
        }
        if (u >= 0)
          if (n) {
            u--;
            for (t = j.PagingSize - 1; t > 0; t--)
              (o = j.Controls["Page" + t]) && k.splice(u++, 0, o);
          } else
            for (t = 1; t < j.PagingSize; t++)
              (o = j.Controls["Page" + t]) && k.splice(u++, 0, o);
      }
    }
    k = j.PagingType;
    j.PagingType -= 1;
    j.SetPagingType(k, false);
    j.AddEvent(npgl_DoUpdate, "DoUpdate");
    k = j.Controls.List;
    j.List = ngVal(k, null);
    if (k) {
      k.draw_page = -1;
      k.draw_length = -1;
      k.draw_height = 0;
      k.paging_needs_update = true;
      k.page_start_found = true;
      k.init_page = j.Page;
      k.in_measure = false;
      k.displayed_items = j.DisplayedItems;
      k.display_mode = j.DisplayMode;
      k.ListPagingChanged = npgl_ListPagingChanged;
      k.ListPagingChanged();
      k.DefaultIndexOf = k.IndexOf;
      k.IndexOf = npgl_IndexOf;
      k.AddEvent(npgl_DoUpdateBefore, "DoUpdate");
      k.AddEvent("OnKeyDown", npgl_OnKeyDown);
      k.AddEvent("DoUpdate", npgl_DoUpdateAfter);
      k.AddEvent("OnDrawItem", npgl_OnDrawItem);
      k.AddEvent("OnExpanding", npgl_OnExpanding);
      k.AddEvent("OnAdd", npgl_OnListChanged);
      k.AddEvent("OnRemove", npgl_OnListChanged);
    }
    j.Page = 0;
  });
  return c;
}
if (typeof ngUserControls === "undefined") ngUserControls = [];
ngUserControls.list = {
  OnInit: function() {
    ngRegisterControlType("ngList", function() {
      return new ngList();
    });
    ngRegisterControlType("ngPageList", Create_ngPageList);
  }
};
var ngCurrentPopupMenu = null,
  ngCurrentAppPopupMenu = null;
function ngm_gm_getlist(a) {
  if (a) {
    if (a.CtrlType == "ngButton") {
      a = a.Menu;
      if (!a) return null;
    }
    if (a.CtrlType != "ngList" && a.CtrlType != "ngToolBar") {
      a = a.SubMenu;
      if (!a) return null;
    }
    if (a.CtrlType != "ngList" && a.CtrlType != "ngToolBar") return null;
  }
  return a;
}
function ngGetMenu(a, b, d, e, f) {
  a = ngm_gm_getlist(a);
  var g = null;
  d = ngVal(d, true);
  e = ngVal(e, null);
  try {
    for (var j = 0, k, n, o, t, q = null, u, x, w, y, z = 0; z <= b.length; z++)
      if (!(z != b.length && b.charAt(z) != "\\")) {
        k = b.substr(j, z - j);
        if (k != "") {
          if (!a && k.charAt(0) != "%") return null;
          u = a ? (a.CtrlType == "ngToolBar" ? a.Menu : a.Items) : void 0;
          x = -1;
          y = "";
          n = null;
          switch (k.charAt(0)) {
            case "#":
              if (a && typeof u !== "undefined") {
                k = k.substr(1, k.length - 1);
                var B = parseInt(k);
                if (B > 0 && B <= u.length) n = u[B - 1];
              }
              break;
            case "%":
              k = k.substr(1, k.length - 1);
              B = k.indexOf(":");
              if (B >= 0) {
                y = k.substr(0, B);
                k = k.substr(B + 1, k.length - B);
              } else {
                y = k;
                k = "";
              }
              var C = ngGetControlById(y);
              if (C) {
                a = ngm_gm_getlist(C);
                if (!a) return null;
                q = null;
                j = z + 1;
                u = a.CtrlType == "ngToolBar" ? a.Menu : a.Items;
                continue;
              } else {
                if (!a) return null;
                for (var A = 0; A < u.length; A++)
                  if (u[A].ID == y) {
                    n = u[A];
                    break;
                  }
              }
              break;
            case "@":
              B = k.indexOf(":");
              if (B >= 0) {
                w = k.substr(1, B - 1);
                k = k.substr(B + 1, k.length - B);
                if (w.length > 0) {
                  var J = w.charAt(w.length - 1) == "-" ? 0 : 1;
                  if (
                    w.charAt(w.length - 1) == "-" ||
                    w.charAt(w.length - 1) == "+"
                  )
                    w = w.substr(0, w.length - 1);
                  if (w.charAt(0) == "#")
                    x = parseInt(w.substr(1, w.length - 1));
                  else if (w.charAt(0) == "%") {
                    n = null;
                    w = w.substr(1, w.length - 1);
                    if ((C = ngGetControlById(w))) {
                      C = ngm_gm_getlist(C);
                      if (!C) return null;
                      a = C.Owner;
                      q = null;
                      if (!a) return null;
                      u = a.CtrlType == "ngToolBar" ? a.Menu : a.Items;
                      if (typeof u !== "undefined")
                        for (A = 0; A < u.length; A++)
                          if (u[A].SubMenu == C || u[A].Menu == C) {
                            x = A + J;
                            break;
                          }
                    } else if (typeof u !== "undefined")
                      for (A = 0; A < u.length; A++)
                        if (u[A].ID == w) {
                          x = A + J;
                          break;
                        }
                  } else if (a && !q && typeof u !== "undefined")
                    if (t)
                      for (A = 0; A < u.length; A++) {
                        if (u[A].ngText == w) {
                          x = A + J;
                          break;
                        }
                      }
                    else
                      for (A = 0; A < u.length; A++)
                        if (u[A].Text == w) {
                          x = A + J;
                          break;
                        }
                }
              }
            default:
              if (k.charAt(0) == "$") {
                t = true;
                k = k.substr(1, k.length - 1);
              } else t = false;
              if (a && !q && k != "-" && typeof u !== "undefined")
                if (t)
                  for (A = 0; A < u.length; A++) {
                    if (u[A].ngText == k) {
                      n = u[A];
                      break;
                    }
                  }
                else
                  for (A = 0; A < u.length; A++)
                    if (u[A].Text == k) {
                      n = u[A];
                      break;
                    }
              break;
          }
          if (n) {
            q = n;
            if (a && a.CtrlType == "ngToolBar") {
              if (n.Menu) {
                a = n.Menu;
                q = null;
              }
            } else if (n.SubMenu) {
              a = n.SubMenu;
              q = null;
            }
            g = n;
          } else if (d && a) {
            if (a.CtrlType == "ngToolBar") {
              var F,
                E = typeof a.ButtonDef === "object" ? a.ButtonDef : null;
              if (E) F = ng_CopyVar(E);
              else {
                F = {};
                F.Type =
                  typeof a.DefType !== "undefined"
                    ? a.DefType + "Button"
                    : "ngButton";
              }
              if (typeof F.className === "undefined")
                F.className = a.BaseClassName + "Button";
              if (typeof F.Data === "undefined") F.Data = {};
              if (t) {
                F.Data.ngText = k;
                F.Data.Text = ngTxt(k);
              } else F.Data.Text = k;
              if (y != "") F.Data.ID = y;
              F.Menu = ng_CopyVar(a.SubMenuDef);
              if (typeof F.Menu.Type === "undefined") F.Menu.Type = "ngMenu";
              if (typeof F.Menu.Data !== "object" || !F.Menu.Data)
                F.Menu.Data = {};
              F.Menu.Data.Items = [];
              var G = ngCreateControls({ MenuBtn: F }, void 0, a.ID);
              if (G.MenuBtn) {
                G.MenuBtn.Owner = a;
                if (typeof a.Menu === "undefined") a.Menu = [];
                if (x < 0 || x >= a.Menu.length)
                  a.Menu[a.Menu.length] = G.MenuBtn;
                else {
                  var D = a.ChildControls;
                  if (D.length > 0 && D[D.length - 1] == G.MenuBtn) {
                    D.splice(D.length - 1, 1);
                    D.splice(x, 0, G.MenuBtn);
                  }
                  a.Menu.splice(x, 0, G.MenuBtn);
                }
                a.Update();
                a = G.MenuBtn.Menu;
                o = null;
              }
            } else {
              o = new ngListItem();
              if (t) {
                o.ngText = k;
                o.Text = ngTxt(k);
              } else o.Text = k;
              if (y != "") o.ID = y;
              if (e && !ngVal(e(a, o, f), false)) {
                g = null;
                break;
              }
              if (q) {
                var H = {};
                H.Items = new Array(o);
                if (ngVal(q.ID, "") != "") H.ID = q.ID;
                a = a.CreateSubMenu(q, H);
              } else
                x < 0 || typeof a.Items === "undefined" || x >= a.Items.length
                  ? a.Add(o)
                  : a.Insert(x, o);
            }
            g = q = o;
          } else {
            g = null;
            break;
          }
        }
        j = z + 1;
      }
  } catch (L) {}
  return g;
}
function ngmn_WindowWidth() {
  var a = ngApp ? ngApp.Elm() : null;
  if (a) return ng_ClientWidth(a);
  return ng_WindowWidth();
}
function ngmn_WindowHeight() {
  var a = ngApp ? ngApp.Elm() : null;
  if (a) return ng_ClientHeight(a);
  return ng_WindowHeight();
}
function ngmn_GetScreenRect() {
  var a = { Left: 0, Top: 0, Right: 0, Bottom: 0 },
    b = ngApp ? ngApp.Elm() : null;
  if (b) {
    a.Right = ng_ClientWidth(b);
    a.Bottom = ng_ClientHeight(b);
  } else {
    a.Right = ng_WindowWidth();
    a.Bottom = ng_WindowHeight();
  }
  this.OnGetScreenRect && this.OnGetScreenRect(this, a);
  return a;
}
function ngmn_IsInsidePopup(a) {
  for (a = ngGetControlByElement(a, "ngList"); a; ) {
    if (a === this || a.ActiveSubMenu === this) break;
    a = a.Owner;
  }
  return a ? true : false;
}
function ngmn_DisableContextMenu(a) {
  if (a) a.preventDefault && a.preventDefault();
  else {
    a = window.event;
    a.returnValue = false;
  }
  return false;
}
function ngmn_OnScroll(a) {
  a.HideSubMenu();
}
function ngmn_DoAttach(a) {
  if (a) a.oncontextmenu = ngmn_DisableContextMenu;
}
function ngmn_Update() {
  if (this.Visible)
    if (!this.__menuvishandling) {
      this.__menuvishandling = true;
      var a = this,
        b = function(f) {
          f.Visible || a.HideSubMenu();
        },
        d = function() {
          for (var f = this.ParentControl, g = true; f; ) {
            if (typeof f.HideSubMenu === "function") g = false;
            g && f.RemoveEvent("OnVisibleChanged", b);
            if (typeof f.PopupChildMenus !== "undefined")
              for (var j = f.PopupChildMenus.length - 1; j >= 0; j--)
                f.PopupChildMenus[j] === a && f.PopupChildMenus.splice(j, 1);
            f = f.ParentControl;
          }
          return true;
        },
        e = this.ParentControl;
      if (e) {
        for (; e && typeof e.HideSubMenu !== "function"; ) {
          e.AddEvent("OnVisibleChanged", b);
          e = e.ParentControl;
        }
        this.AddEvent("DoDispose", d);
      }
    }
}
function ngmn_ParentIsInsidePopup(a, b, d, e) {
  if (typeof a.PopupChildMenus !== "undefined")
    for (var f = 0; f < a.PopupChildMenus.length; f++)
      if (a.PopupChildMenus[f].IsInsidePopup(b, d, e)) return true;
  return false;
}
function ngmn_ParentChildMenusVisibleChanged(a) {
  if (!a.Visible) a.PopupChildMenus = [];
}
function ngmn_SetCurrentPopupMenu(a) {
  for (var b = a; b; ) {
    if (b === ngCurrentPopupMenu) return;
    if (b !== a && ngc_IsActivePopup(b)) {
      if (typeof b.PopupChildMenus === "undefined") {
        b.PopupChildMenus = [];
        b.AddEvent("OnIsInsidePopup", ngmn_ParentIsInsidePopup);
        b.AddEvent("OnVisibleChanged", ngmn_ParentChildMenusVisibleChanged);
      }
      var d;
      for (d = 0; d < b.PopupChildMenus.length; d++)
        if (b.PopupChildMenus[d] === a) break;
      d >= b.PopupChildMenus.length && b.PopupChildMenus.push(a);
      break;
    }
    b = b.ParentControl ? b.ParentControl : b.Owner;
  }
  ngCurrentPopupMenu &&
    ngCurrentPopupMenu !== a &&
    ngCurrentPopupMenu.HideMenu();
  ngCurrentPopupMenu = a;
  ngc_ActivatePopup(a);
}
function ngmn_DoPopup() {
  var a = this.Elm();
  if (!a) return null;
  if (this.OnPopup && !ngVal(this.OnPopup(this), false)) return null;
  this.AutoPopup = ngVal(this.AutoPopup, !this.Visible);
  this.HideSubMenu();
  if (!this.Visible) {
    a.style.left = "-10000px";
    a.style.top = "-10000px";
  }
  var b;
  if (
    typeof ngModalCnt !== "undefined" &&
    typeof ngModalZIndexDelta !== "undefined"
  ) {
    b = ngModalZIndexDelta - 1e3;
    b += ngModalCnt * ngModalZIndexDelta;
  } else b = 1e4;
  for (var d = this; d && typeof d.HideSubMenu === "function"; ) {
    b++;
    d = d.Owner;
  }
  a.style.zIndex = b;
  if (
    typeof this.Bounds.H === "undefined" &&
    (typeof this.Bounds.B === "undefined" ||
      typeof this.Bounds.T === "undefined")
  )
    a.style.height = "auto";
  if (
    typeof this.Bounds.W === "undefined" &&
    (typeof this.Bounds.R === "undefined" ||
      typeof this.Bounds.L === "undefined")
  )
    a.style.width = "auto";
  this.SetVisible(true);
  var e = ngVal(this.MinWidth, 100);
  b = !ng_EmptyVar(this.Frame);
  d = false;
  ng_BeginMeasureElement(a);
  var f = ng_OuterWidth(a);
  if (f < e) {
    d = true;
    ng_SetOuterWidth(a, e);
  } else ngOpera && ng_SetOuterWidth(a, f);
  e = this.MaxHeight;
  if (typeof e === "undefined") {
    e = this.GetScreenRect();
    e = e.Bottom - e.Top - 10;
  }
  if (ng_OuterHeight(a) > e) {
    d = true;
    ng_SetOuterHeight(a, e);
  }
  ng_EndMeasureElement(a);
  d && b && this.Update();
  ngCurrentAppPopupMenu = null;
  return a;
}
function ngmn_Popup(a, b, d, e) {
  var f = this.DoPopup();
  if (f) {
    d = ngVal(d, this.MenuHAlign);
    e = ngVal(e, this.MenuVAlign);
    d = ngVal(d, "left");
    e = ngVal(e, "top");
    ng_BeginMeasureElement(f);
    var g = ng_OuterWidth(f),
      j = ng_OuterHeight(f);
    ng_EndMeasureElement(f);
    var k = this.GetScreenRect();
    if (d === "right") {
      d = a - g;
      if (d < k.Left) d = a;
    } else {
      d = d === "center" ? a - Math.round(g / 2) : a;
      if (d + g > k.Right - 5) d = a - g;
    }
    if (d < k.Left || d + g > k.Right - 5) d = k.Left + 5;
    if (e === "bottom") {
      e = b - j;
      if (e < k.Top) e = b;
    } else {
      e = e === "center" ? b - Math.round(j / 2) : b;
      if (e + j > k.Bottom - 5) e = b - j;
    }
    if (e < k.Top || e + j > k.Bottom - 5) e = k.Top + 5;
    f.style.left = d + "px";
    f.style.top = e + "px";
    this.PopupX = a;
    this.PopupY = b;
    delete this.PopupElm;
    this.SetFocus();
  }
}
function ngmn_PopupCtrl(a, b, d) {
  var e = null;
  if (typeof a === "string")
    a = (e = ngGetControlById(a)) ? e : document.getElementById(a);
  if (typeof a.Elm === "function") e = a.Elm();
  else {
    e = a;
    a = null;
  }
  if (e) {
    var f = this.DoPopup();
    if (f) {
      var g = 0,
        j = 0;
      if (a) {
        b = ngVal(b, a.MenuHAlign);
        d = ngVal(d, a.MenuVAlign);
        g = ngVal(a.MenuOverlapX, 0);
        j = ngVal(a.MenuOverlapY, 0);
      }
      b = ngVal(b, this.MenuHAlign);
      d = ngVal(d, this.MenuVAlign);
      b = ngVal(b, "left");
      d = ngVal(d, "top");
      a = ng_ParentPosition(e, ngApp ? ngApp.Elm() : undefined);
      ng_BeginMeasureElement(e);
      a.w = ng_OuterWidth(e);
      a.h = ng_OuterHeight(e);
      ng_EndMeasureElement(e);
      ng_BeginMeasureElement(f);
      var k = ng_OuterWidth(f),
        n = ng_OuterHeight(f);
      ng_EndMeasureElement(f);
      var o = this.GetScreenRect();
      if (b === "right")
        if (d === "center") {
          b = a.x + a.w + g;
          if (b + k > o.Right - 5) b = a.x - k - g;
        } else {
          b = a.x + a.w - k - g;
          if (b < o.Left) b = a.x + g;
        }
      else {
        if (b === "center")
          b = a.x + Math.round(a.w / 2) - Math.round(k / 2) + g;
        else if (d === "center") {
          b = a.x - k - g;
          if (b < o.Left) b = a.x + a.w + g;
        } else b = a.x + g;
        if (b + k > o.Right - 5) b = a.x + a.w - k - g;
      }
      if (b < o.Left || b + k > o.Right - 5) b = o.Left + 5;
      if (d === "bottom") {
        d = a.y - n - j;
        if (d < o.Top) d = a.y + a.h + j;
      } else {
        d =
          d === "center"
            ? a.y + Math.round(a.h / 2) - Math.round(n / 2) + j
            : a.y + a.h + j;
        if (d + n > o.Bottom - 5) d = a.y - n - j;
      }
      if (d < o.Top || d + n > o.Bottom - 5) d = o.Top + 5;
      f.style.left = b + "px";
      f.style.top = d + "px";
      delete this.PopupX;
      delete this.PopupY;
      this.PopupElm = e;
      this.SetFocus();
    }
  }
}
function ngmn_PopupSubMenu(a, b, d) {
  if (a) {
    var e = this.DoPopup();
    if (e) {
      b = ngVal(b, this.MenuHAlign);
      d = ngVal(d, this.MenuVAlign);
      b = ngVal(b, "left");
      d = ngVal(d, "top");
      var f = ng_ParentPosition(a, ngApp ? ngApp.Elm() : undefined);
      ng_BeginMeasureElement(a);
      f.w = ng_OuterWidth(a);
      f.h = ng_OuterHeight(a);
      ng_EndMeasureElement(a);
      ng_BeginMeasureElement(e);
      var g = ng_OuterWidth(e),
        j = ng_OuterHeight(e);
      ng_EndMeasureElement(e);
      var k = ngVal(this.SubMenuOverlapX, 5),
        n = ngVal(this.SubMenuOverlapY, 0),
        o = this.GetScreenRect();
      if (b == "right") {
        b = f.x - g + k;
        if (b < o.Left) b = f.x + f.w - k;
      } else {
        b = f.x + f.w - k;
        if (b + g > o.Right - 5) b = f.x - g + k;
      }
      if (b < o.Left || b + g > o.Right - 5) b = o.Left + 5;
      g =
        ng_GetCurrentStylePx(e, "padding-top") +
        ng_GetCurrentStylePx(e, "margin-top") +
        ng_GetCurrentStylePx(e, "border-top-width");
      k =
        ng_GetCurrentStylePx(e, "padding-bottom") +
        ng_GetCurrentStylePx(e, "margin-bottom") +
        ng_GetCurrentStylePx(e, "border-bottom-width");
      if (d == "bottom") {
        d = f.y + f.h - j - n + k;
        if (d < o.Top) d = f.y + n - g;
      } else {
        d = f.y + n - g;
        if (d + j > o.Bottom - 5) d = f.y + f.h - j - n + k;
      }
      if (d < o.Top || d + j > o.Bottom - 5) d = o.Top + 5;
      e.style.left = b + "px";
      e.style.top = d + "px";
      delete this.PopupX;
      delete this.PopupY;
      this.PopupElm = a;
    }
  }
}
function ngmn_ShowSubMenu(a) {
  var b = a.SubMenu;
  if (this.ActiveSubMenu) {
    if (this.ActiveSubMenu == b) return;
    this.HideSubMenu();
  }
  if (b) {
    if (!(b.Visible || !this.Enabled || !ngVal(a.Enabled, true))) {
      this.SelectItem(a);
      this.ActiveSubMenu = b;
      (a = document.getElementById(this.ID + "_" + this.ItemId(a))) &&
        b.PopupSubMenu(a);
    }
  } else {
    this.ClearSelected();
    this.ActiveSubMenu = null;
  }
}
function ngmn_SetVisible(a) {
  a = ngVal(a, true);
  if (this.Visible != a) {
    var b = this.Owner;
    if (a) ngVal(this.AutoPopup, false) && ngmn_SetCurrentPopupMenu(this);
    else {
      this.HideSubMenu();
      if (b && ngVal(b.ActiveSubMenu, null) == this) {
        b.ClearSelected();
        b.ActiveSubMenu = null;
      }
      this.SubMenuTimer && clearTimeout(this.SubMenuTimer);
      this.SubMenuTimer = null;
      delete this.PopupX;
      delete this.PopupY;
      delete this.PopupElm;
      if (ngCurrentPopupMenu === this) {
        ngCurrentPopupMenu = null;
        ngc_DeactivatePopup(this);
      }
    }
  }
}
function ngmn_HideSubMenu() {
  var a = this.ActiveSubMenu;
  if (a)
    if (!(this.OnHideSubMenu && !ngVal(this.OnHideSubMenu, false))) {
      this.ClearSelected();
      a.SetVisible(false);
      this.ActiveSubMenu = null;
    }
}
function ngmn_SubMenuTimer(a, b) {
  a = ngl_ItemById(a);
  if (a.list) {
    a.list.SubMenuTimer && clearTimeout(a.list.SubMenuTimer);
    a.list.SubMenuTimer = null;
    if (b)
      (b = a.list.Owner) &&
        ngVal(b.Visible, true) &&
        a.list.ShowSubMenu(a.item);
    else {
      for (b = a.list; b; ) {
        if (b.MouseInControl && b !== a.list) return;
        b = b.ActiveSubMenu;
      }
      a.list.HideSubMenu();
    }
  }
}
function ngmn_OnEnterRow(a, b, d) {
  !a.ActiveSubMenu || a.ActiveSubMenu !== b.SubMenu
    ? a.ClearSelected()
    : a.SelectItem(b);
  if (a.Owner && a.Owner.SubMenuTimer) {
    clearTimeout(a.Owner.SubMenuTimer);
    a.Owner.SubMenuTimer = null;
  }
  if (
    a.ActiveSubMenu ||
    (b.SubMenu &&
      (typeof a.PointerInfo === "undefined" || !a.PointerInfo.Touch))
  ) {
    a.SubMenuTimer && clearTimeout(a.SubMenuTimer);
    a.SubMenuTimer = setTimeout("ngmn_SubMenuTimer('" + d + "',1);", 200);
  }
  ngc_EnterImg(d + "M");
  return true;
}
function ngmn_OnLeaveRow(a, b, d) {
  a.SubMenuTimer && clearTimeout(a.SubMenuTimer);
  a.SubMenuTimer = null;
  if (a.ActiveSubMenu && a.ActiveSubMenu !== b.SubMenu)
    a.SubMenuTimer = setTimeout("ngmn_SubMenuTimer('" + d + "',0)", 200);
  ngc_LeaveImg(d + "M");
  return true;
}
function ngmn_OnEnter(a) {
  var b = a.Owner;
  if (typeof b.HideSubMenu === "function") {
    b.ClearSelected();
    for (var d = 0; d < b.Items.length; d++)
      if (b.Items[d].SubMenu == a) {
        b.SelectItem(b.Items[d]);
        break;
      }
  }
  return true;
}
function ngmn_OnKeyDown(a) {
  switch (a.keyCode) {
    case 39:
    case 37:
    case 27:
      var b = ngl_ItemById(ngl_CurrentRowId);
      if (b.list != this) {
        b.list = this;
        b.item = null;
      }
      switch (a.keyCode) {
        case 27:
          b.list.HideMenu();
          break;
        case 39:
          if ((a = b.item ? b.item.SubMenu : null)) {
            b.list.ShowSubMenu(b.item);
            a.SetFocus();
            a.SetItemFocus(a.FirstVisibleItem());
          } else if ((a = b.list && b.list.Owner ? b.list.Owner : null)) {
            for (var d; a; ) {
              if (a.CtrlType == "ngToolBar") break;
              if (a.CtrlType == "ngButton") d = a;
              a = a.Owner;
            }
            if (a && typeof a.Menu === "object")
              for (var e = 0; e < a.Menu.length; e++)
                if (a.Menu[e] == d) {
                  e++;
                  if (e >= a.Menu.length) e = 0;
                  if (e >= 0 && e < a.Menu.length)
                    if (
                      (d = a.Menu[e]) &&
                      d.CtrlType == "ngButton" &&
                      typeof d.Menu === "object"
                    ) {
                      b.list.AutoPopup = true;
                      d.Click();
                      d.Menu.SetItemFocus(d.Menu.FirstVisibleItem());
                    }
                  break;
                }
          }
          break;
        case 37:
          if ((a = b.list && b.list.Owner ? b.list.Owner : null))
            if (typeof a.HideSubMenu === "function") {
              a.SetFocus();
              for (e = 0; e < a.Items.length; e++)
                if (a.Items[e].SubMenu == b.list) {
                  a.SetItemFocus(a.Items[e]);
                  break;
                }
              a.HideSubMenu();
              a.SubMenuTimer && clearTimeout(a.SubMenuTimer);
              a.SubMenuTimer = null;
            } else {
              for (; a; ) {
                if (a.CtrlType == "ngToolBar") break;
                if (a.CtrlType == "ngButton") d = a;
                a = a.Owner;
              }
              if (a && typeof a.Menu === "object")
                for (e = 0; e < a.Menu.length; e++)
                  if (a.Menu[e] == d) {
                    e--;
                    if (e < 0) e = a.Menu.length - 1;
                    if (e >= 0 && e < a.Menu.length)
                      if (
                        (d = a.Menu[e]) &&
                        d.CtrlType == "ngButton" &&
                        typeof d.Menu === "object"
                      ) {
                        b.list.AutoPopup = true;
                        d.Click();
                        d.Menu.SetItemFocus(d.Menu.FirstVisibleItem());
                      }
                    break;
                  }
            }
          break;
      }
  }
  return true;
}
function ngmn_MenuText(a, b, d) {
  var e = new ngStringBuilder();
  if (typeof b.OnGetText === "function") d = ngVal(b.OnGetText(a, b, d), "");
  else if (this.Columns.length > 0) {
    d = ngVal(b.Text[d.ID], "");
    if (d == "") d = "&nbsp;";
  } else d = b.Text;
  var f = a.SubMenuImg;
  if (b.SubMenu && f) {
    var g = a.ItemId(b);
    b = ngl_ItemImgDrawProps(
      a.ID + "_" + g + "M",
      a.Enabled && ngVal(b.Enabled, true),
      f
    );
    e.append('<div style="position: relative;">');
    ngc_Img(
      e,
      b,
      "width: " + b.W + "px;",
      'class="' + a.BaseClassName + 'SubMenu"'
    );
    e.append('<div style="padding-right:' + b.W + 'px">');
    e.append(d);
    e.append("</div></div>");
  } else e.append(d);
  return e.toString();
}
function ngmn_DrawItemText(a, b, d, e) {
  var f = this.BaseClassName;
  if (
    (this.Columns.length > 0
      ? ngVal(b.Text[this.Columns[0].ID], "")
      : b.Text) == "-"
  ) {
    b.Visible = false;
    var g = this.Items[0] == b || this.Items[this.Items.length - 1] == b;
    if (this.OnDrawSeparator) this.OnDrawSeparator(a, b, d, e);
    else
      this.Columns.length > 0
        ? a.append(
            '<tr class="' +
              f +
              'Row" ' +
              (g ? 'style="display:none" ' : "") +
              'id="' +
              this.ID +
              "_" +
              d +
              '"><td colspan="' +
              this.Columns.length +
              '"><div class="' +
              f +
              'Separator">&nbsp;</div></td></tr>'
          )
        : a.append(
            '<div id="' +
              this.ID +
              "_" +
              d +
              '" ' +
              (g ? 'style="display:none" ' : "") +
              'class="' +
              f +
              'Separator"></div>'
          );
  } else this.DefaultDrawItemText(a, b, d, e);
}
function ngmn_DoCreate(a, b, d, e) {
  if (!(typeof a.Data !== "undefined" && ngVal(a.Data.Visible, false))) {
    e = typeof ngApp === "object" && ngApp ? ngApp.Elm() : document.body;
    if ((a = d.parentNode) && a != e) {
      a.removeChild(d);
      e.appendChild(d);
    }
  }
}
function ngmn_HideMenu() {
  for (var a = this, b = this; b; ) {
    if (typeof b.HideSubMenu !== "function") {
      b = null;
      break;
    }
    a = b;
    if (!ngVal(b.AutoPopup, false)) break;
    b = b.Owner;
  }
  if (!b && a) a.SetVisible(false);
  else a && a.HideSubMenu();
}
function ngmn_MenuClick(a, b) {
  if (!a) return false;
  if (typeof b === "undefined") b = {};
  if (b.list != this) {
    b.Owner = this;
    b.list = this;
    b.listItem = a;
    b.listObj = null;
    b.listRowObj = null;
    b.listPart = 0;
    b.listCol = -1;
  }
  if (!this.Enabled || !ngVal(a.Enabled, true)) return false;
  if (
    a.SubMenu &&
    typeof this.PointerInfo !== "undefined" &&
    this.PointerInfo.Touch
  ) {
    this.ShowSubMenu(a);
    return false;
  }
  if (this.OnMenuClick && !ngVal(this.OnMenuClick(b, this, a), false))
    return false;
  var d = a.OnMenuClick;
  if (d) {
    if (!ngVal(d(b, this, a), true)) return false;
    this.HideMenu();
  } else {
    if ((b = this.GetItemAction(a))) {
      if (b.OnClick) {
        b = null;
        this.HideMenu();
      }
    } else b = a;
    if (b)
      if (
        typeof b.Checked !== "undefined" ||
        typeof b.RadioGroup !== "undefined"
      ) {
        this.CheckItem(
          a,
          typeof b.RadioGroup !== "undefined"
            ? 1
            : ngVal(b.Checked, 0) == 0
              ? 1
              : 0
        );
        this.HideMenu();
      } else if (a.SubMenu) {
        this.ShowSubMenu(a);
        return false;
      } else this.HideMenu();
    else typeof a.SubMenu === "undefined" && this.HideMenu();
  }
  return true;
}
function ngmn_OnClick(a) {
  if (!a.listPart && a.listItem && a.list)
    return a.list.MenuClick(a.listItem, a);
  return false;
}
function ngmn_GetResText(a, b) {
  return ngTxt(b.ngTextD);
}
function ngmn_CreateSubMenu(a, b) {
  if (!a) return null;
  if (typeof b === "undefined") b = {};
  for (
    var d = null,
      e = b.SubMenuOverlapX,
      f = b.SubMenuOverlapY,
      g = b.MenuHAlign,
      j = b.MenuVAlign,
      k = b.OnSubMenuCreated,
      n = this;
    n && typeof n.HideSubMenu === "function";

  ) {
    if (
      !d &&
      typeof n.SubMenuDef === "object" &&
      !ngVal(n.SubMenuDef.AutoDef, false)
    )
      d = n.SubMenuDef;
    if (
      typeof e === "undefined" &&
      typeof f === "undefined" &&
      (typeof n.SubMenuOverlapX !== "undefined" ||
        typeof n.SubMenuOverlapY !== "undefined")
    ) {
      e = n.SubMenuOverlapX;
      f = n.SubMenuOverlapY;
    }
    if (
      typeof g === "undefined" &&
      typeof j === "undefined" &&
      (typeof n.MenuHAlign !== "undefined" ||
        typeof n.MenuVAlign !== "undefined")
    ) {
      g = n.MenuHAlign;
      j = n.MenuVAlign;
    }
    if (typeof k === "undefined" && typeof n.OnSubMenuCreated !== "undefined")
      k = n.OnSubMenuCreated;
    n = n.Owner;
  }
  d = ng_CopyVar(d ? d : this.SubMenuDef);
  var o = { SubMenu: d };
  if (typeof d.Data === "undefined") d.Data = b;
  else {
    var t = d.Data;
    d.Data = b;
    ng_MergeVar(d.Data, t);
  }
  if (typeof b.ID === "string") d.id = b.ID;
  if (typeof e !== "undefined") b.SubMenuOverlapX = e;
  if (typeof f !== "undefined") b.SubMenuOverlapY = f;
  if (typeof g !== "undefined") b.MenuHAlign = g;
  if (typeof j !== "undefined") b.MenuVAlign = j;
  if (typeof k !== "undefined") b.OnSubMenuCreated = k;
  b.Owner = this;
  b.ParentMenu = a;
  b = ngCreateControls(
    o,
    undefined,
    typeof ngApp === "object" && ngApp ? ngApp.Elm() : undefined
  );
  (a.SubMenu = b.SubMenu) &&
    n.OnSubMenuCreated &&
    n.OnSubMenuCreated(n, d, b.SubMenu);
  return a.SubMenu;
}
function ngmn_OnAdd(a, b) {
  if (!b.OnClick) b.OnClick = ngmn_OnClick;
  if (typeof b.ngText !== "undefined" && ngVal(b.Text, "") == "")
    b.Text = ngTxt(b.ngText);
  if (typeof b.ngTextD !== "undefined" && !b.OnGetText)
    b.OnGetText = ngmn_GetResText;
  var d = b.SubMenu;
  if (typeof d === "object")
    if (typeof d.HideSubMenu !== "function") {
      if (typeof d.Items === "undefined") {
        var e = {};
        e.Items = d;
        d = e;
      }
      delete b.SubMenu;
      a.CreateSubMenu(b, d);
    } else d.Owner = a;
  return true;
}
function ngmn_OnRemove(a, b) {
  b.SubMenu && typeof b.SubMenu.Dispose === "function" && b.SubMenu.Dispose();
  return true;
}
function ngmn_BeginUpdate(a) {
  this.ListBeginUpdate();
  a = ngVal(a, true);
  this.update_info.push(a);
  a &&
    this.Scan(function(b, d) {
      (b = d.SubMenu) && b.BeginUpdate(true);
      return true;
    });
}
function ngmn_EndUpdate() {
  this.ListEndUpdate();
  this.update_info.length > 0 &&
    this.update_info.pop() &&
    this.Scan(function(a, b) {
      (a = b.SubMenu) && a.EndUpdate(true);
      return true;
    });
}
function ngmn_GetMenu(a, b, d, e, f) {
  b = ngVal(b, false);
  d = ngVal(d, this);
  e = ngVal(e, null);
  return ngGetMenu(d, a, b, e, f);
}
function ngmn_GetMenuItemByIDCallback(a, b, d, e) {
  if (b.ID && b.ID == e.ID) {
    e.found.Menu = a;
    e.found.Item = b;
    return false;
  }
  if (b.SubMenu && e.Recursive) {
    b.SubMenu.Scan(ngmn_GetMenuItemByIDCallback, null, e);
    if (e.found.Menu) return false;
  }
  return true;
}
function ngmn_GetMenuItemByID(a, b) {
  var d = {};
  d.ID = a;
  d.Recursive = ngVal(b, true);
  d.found = { Menu: null, Item: null };
  this.Scan(ngmn_GetMenuItemByIDCallback, null, d);
  return d.found;
}
function ngmb_DoCreate(a) {
  if (typeof a.Menu === "object") {
    var b;
    this.Menu = [];
    var d = a.Menu;
    if (typeof d.Data === "object" && typeof d.Data.Items === "object") {
      var e,
        f = d.Data.Items;
      if (typeof a.Button === "object") this.ButtonDef = ng_CopyVar(a.Button);
      if (typeof a.Type !== "undefined") this.DefType = a.Type;
      var g = typeof a.Button === "object" ? a.Button : null;
      delete d.Data.Items;
      for (var j = 0; j < f.length; j++) {
        b = f[j];
        if (g) e = ng_CopyVar(g);
        else {
          e = {};
          e.Type =
            typeof a.Type !== "undefined" ? a.Type + "Button" : "ngButton";
        }
        if (typeof e.className === "undefined")
          e.className = this.BaseClassName + "Button";
        if (typeof e.Data === "undefined") e.Data = {};
        var k = a.Menu.Data,
          n = a.Menu.parent;
        delete a.Menu.Data;
        delete a.Menu.parent;
        this.SubMenuDef = ng_CopyVar(a.Menu);
        delete this.SubMenuDef.parent;
        delete this.SubMenuDef.id;
        delete this.SubMenuDef.L;
        delete this.SubMenuDef.T;
        delete this.SubMenuDef.R;
        delete this.SubMenuDef.B;
        delete this.SubMenuDef.W;
        delete this.SubMenuDef.H;
        this.SubMenuDef.AutoDef = true;
        this.SubMenuDef._noMerge = true;
        a.Menu.Data = k;
        a.Menu.parent = n;
        for (var o in b) e.Data[o] = b[o];
        if (e.Data.SubMenu) {
          e.Menu = ng_CopyVar(d);
          if (typeof e.Menu.Data === "undefined") e.Menu.Data = {};
          e.Menu.Data.Items = e.Data.SubMenu;
          delete e.Data.SubMenu;
          delete e.Data.Menu;
        }
        b = ngCreateControls({ MenuBtn: e }, undefined, this.ID);
        if (b.MenuBtn) {
          b.MenuBtn.Owner = this;
          this.Menu[j] = b.MenuBtn;
        }
      }
    }
  }
}
function ngmb_BeginUpdate(a) {
  a = ngVal(a, true);
  this.update_info.push(a);
  for (var b, d = 0; d < this.Menu.length; d++)
    (b = this.Menu[d].Menu) && b.BeginUpdate(a);
}
function ngmb_EndUpdate() {
  if (this.update_info.length > 0) {
    this.update_info.pop();
    for (var a = 0; a < this.Menu.length; a++)
      (m = this.Menu[a].Menu) && m.EndUpdate();
  }
}
function ngmbb_ButtonEnterMenu() {
  var a = this.Menu;
  if (typeof a === "object" && a && this.Enabled && !this.ReadOnly)
    if (!a.Visible) {
      for (; a; ) {
        if (a.CtrlType == "ngToolBar") {
          var b = false,
            d,
            e = a.ChildControls;
          if (typeof e !== "undefined")
            for (var f = 0; f < e.length; f++)
              if (
                (d =
                  typeof a.ChildControls[f].Menu === "object"
                    ? a.ChildControls[f].Menu
                    : null)
              ) {
                b = b || d.Visible;
                d != this.Menu && d.SetVisible(false);
              }
          break;
        }
        a = a.Owner;
      }
      if (!this.Menu.Visible && (b || ngVal(this.AutoPopup, false)))
        this.Menu.PopupCtrl(this);
    }
}
function ngmnb_SetControlVisible(a) {
  var b = this.Menu;
  if (typeof b === "object" && b)
    if (!a) {
      b.AutoPopup = true;
      b.HideMenu();
    }
}
function ngsbtn_SetMenuVisible(a, b) {
  (a = a.Owner) &&
    typeof a.GetImg === "function" &&
    ngc_ChangeImg(a.ID + "_IR", b, a.Enabled, a.GetImg(2));
  return true;
}
function ngsbtn_Click() {
  var a = this.Menu;
  if (typeof a === "object" && a)
    if (a.Visible) {
      a.AutoPopup = true;
      a.HideMenu();
    }
  return true;
}
function ngsbtn_DoMenuClick() {
  var a = this.Menu;
  if (typeof a === "object" && a && this.Enabled)
    if (!(this.OnMenuClick && !ngVal(this.OnMenuClick(this, a), false)))
      if (a.Visible) {
        a.AutoPopup = true;
        a.HideMenu();
      } else {
        var b = ngVal(a.MinWidth, 100),
          d = ng_OuterWidth(this.Elm());
        if (d > 0 && b < d) a.MinWidth = d;
        a.PopupCtrl(this);
      }
}
function ngsbtn_DoPtrClick(a) {
  a.EventID === "menu" && this.DoMenuClick(this);
}
function ngsbtn_DoUpdate() {
  var a = this.Menu;
  if (typeof a === "object" && a) {
    var b = document.getElementById(this.ID + "_IR");
    if (b) {
      ngc_ChangeImg(this.ID + "_IR", a.Visible, this.Enabled, this.GetImg(2));
      if ((a = b.parentNode)) {
        var d = a.parentNode;
        if (d) {
          var e = d.parentNode,
            f = ng_OuterWidth(d) - ng_ClientWidth(b);
          ng_SetStyleWidth(d, f);
          a.removeChild(b);
          e.appendChild(b);
          ngc_PtrListener(this, b, "menu", "tap");
          b.style.zIndex = 2;
          a = "";
          a = this.Enabled
            ? typeof this.Cursor !== "undefined"
              ? this.Cursor
              : "pointer"
            : "default";
          try {
            b.style.cursor = a;
          } catch (g) {}
        }
      }
    }
  }
  return true;
}
function ngmnb_SetMenuVisible(a, b) {
  a = a.Owner;
  typeof a.Check === "function" && a.Check(b);
  return true;
}
function ngmn_DefaultClick() {
  var a = this.Menu;
  if (typeof a === "object" && a)
    if (a.Visible) {
      a.AutoPopup = true;
      a.HideMenu();
    } else this.Enabled && a.PopupCtrl(this);
}
function ngmn_DoMenuDispose() {
  var a = this.Menu;
  typeof a === "object" && a && typeof a.Dispose === "function" && a.Dispose();
  return true;
}
function ngmn_PopupMouseMenu(a) {
  if (!a) a = window.event;
  if (a.button != 2) return true;
  var b = ngGetControlById(this.id);
  if (!b || !b.PopupMenu || !ngVal(b.Enabled, true)) return true;
  var d = a.clientX ? a.clientX : a.offsetX,
    e = a.clientY ? a.clientY : a.offsetY;
  if (!(isNaN(d) || isNaN(e))) {
    d -= ng_findMousePosX(document.body);
    e -= ng_findMousePosY(document.body);
    b.PopupMenu.Popup(d, e);
    if (window.event) a.cancelBubble = true;
    else a.stopPropagation();
    return true;
  }
}
function ngmn_DoPopupAttach(a) {
  if (a) {
    a.oncontextmenu = ngmn_DisableContextMenu;
    if (!a.ngAddEvent) {
      a.ngAddEvent = ngObjAddEvent;
      a.ngAddEvent("onmousedown", ngmn_PopupMouseMenu);
    }
  }
}
function ngmn_DoAcceptGestures(a, b) {
  b.hold = true;
}
function ngmn_DoGesture(a) {
  if (a.Gesture === "hold") {
    var b,
      d,
      e = this.PopupMenu;
    if (e) {
      if (
        a.Touch &&
        typeof e.MenuVAlign === "undefined" &&
        typeof e.MenuHAlign === "undefined"
      ) {
        b = "bottom";
        d = "center";
      }
      e.Popup(a.X, a.Y, d, b);
      return true;
    }
  }
  return false;
}
function ngmn_DoPopupDispose() {
  var a = this.PopupMenu;
  typeof a === "object" && a && typeof a.Dispose === "function" && a.Dispose();
  return true;
}
function ngmn_SetPopupControlVisible(a) {
  var b = this.PopupMenu;
  if (typeof b === "object" && b)
    if (!a) {
      b.AutoPopup = true;
      b.HideMenu();
    }
}
function ng_SetControlMenu(a, b) {
  if (a) {
    b = ngVal(b, null);
    var d = ngVal(a.Menu, null);
    if (d != b) {
      var e = ngVal(a.SplitButton, false);
      if (d) {
        if (!b) {
          a.RemoveEvent("SetVisible", ngmnb_SetControlVisible);
          a.RemoveEvent("SetEnable", ngmnb_SetControlVisible);
          a.RemoveEvent("DoDispose", ngmn_DoMenuDispose);
          if (a.OnClick == ngmn_DefaultClick) a.OnClick = null;
        }
        var f = ngVal(d.Owner, null);
        if (f == a) {
          d.Owner = null;
          e
            ? d.RemoveEvent("OnSetVisible", ngsbtn_SetMenuVisible)
            : d.RemoveEvent("OnSetVisible", ngmnb_SetMenuVisible);
        }
      }
      if ((a.Menu = b)) {
        (f = b.Owner) && f != a && ng_SetControlMenu(f, null);
        b.Owner = a;
        if (!d) {
          a.AddEvent("SetVisible", ngmnb_SetControlVisible);
          a.AddEvent("SetEnable", ngmnb_SetControlVisible);
          a.AddEvent("DoDispose", ngmn_DoMenuDispose);
          if (typeof a.OnClick !== "undefined" && !a.OnClick && !e)
            a.OnClick = ngmn_DefaultClick;
        }
        e
          ? b.AddEvent("OnSetVisible", ngsbtn_SetMenuVisible)
          : b.AddEvent("OnSetVisible", ngmnb_SetMenuVisible);
      }
    }
  }
}
var nga_popup_initialized = false;
function nga_DoPopupMenuStart(a) {
  if (!a) a = window.event;
  ngCurrentAppPopupMenu = null;
  if (
    (a =
      a.button == 2 &&
      typeof ngApp === "object" &&
      typeof ngApp.PopupMenu === "object" &&
      ngApp.PopupMenu
        ? ngApp.PopupMenu
        : null) &&
    (!ngCurrentPopupMenu || ngCurrentPopupMenu == a)
  )
    ngCurrentAppPopupMenu = a;
  return true;
}
function nga_DoPopupMenu(a) {
  if (!a) a = window.event;
  if (ngCurrentAppPopupMenu)
    var b = setTimeout(function() {
      clearTimeout(b);
      var d = ngCurrentAppPopupMenu;
      ngCurrentAppPopupMenu = null;
      if (d && typeof d.Popup === "function") {
        ngCurrentAppPopupMenu = null;
        var e = a.clientX ? a.clientX : a.offsetX,
          f = a.clientY ? a.clientY : a.offsetY;
        if (!(isNaN(e) || isNaN(f))) {
          a.preventDefault && a.preventDefault();
          e -= ng_findMousePosX(document.body);
          f -= ng_findMousePosY(document.body);
          d.Popup(e, f);
        }
      }
    }, 10);
  return true;
}
function nga_DoPopupMenuTouch(a) {
  if (
    !(
      (a.type !== "hold" && a.type !== "touch") ||
      a.gesture.pointerType === Hammer.POINTER_MOUSE ||
      a.ngGestureHandled ||
      typeof ngApp !== "object" ||
      typeof ngApp.PopupMenu !== "object" ||
      !ngApp.PopupMenu
    )
  )
    if (a.type === "touch")
      ngCurrentAppPopupMenu =
        !ngCurrentPopupMenu || ngCurrentPopupMenu == ngApp.PopupMenu
          ? ngApp.PopupMenu
          : null;
    else if (ngCurrentAppPopupMenu)
      var b = setTimeout(function() {
        clearTimeout(b);
        var d = ngCurrentAppPopupMenu;
        ngCurrentAppPopupMenu = null;
        if (d && typeof d.Popup === "function") {
          var e = a.gesture.center.pageX,
            f = a.gesture.center.pageY;
          if (
            typeof d.MenuVAlign === "undefined" &&
            typeof d.MenuHAlign === "undefined"
          ) {
            valign = "bottom";
            halign = "center";
          }
          d.Popup(e, f, halign, valign);
        }
      }, 10);
}
function nga_SetPopupMenu(a) {
  var b = ngVal(this.PopupMenu, null);
  if (b != a) {
    if (b) {
      typeof b.HideMenu === "function" && b.HideMenu();
      b.Owner = null;
    }
    if ((this.PopupMenu = a)) {
      a.Owner = this;
      if (!nga_popup_initialized) {
        if (window.navigator.msPointerEnabled) {
          document.addEventListener(
            "MSPointerDown",
            nga_DoPopupMenuStart,
            false
          );
          document.addEventListener("MSPointerUp", nga_DoPopupMenu, false);
        } else {
          document.onmousedown = ngAddEvent(
            nga_DoPopupMenuStart,
            document.onmousedown
          );
          document.onmouseup = ngAddEvent(nga_DoPopupMenu, document.onmouseup);
        }
        if (ngHammerJS()) {
          nga_popup_hammer = Hammer(document, {
            prevent_mouseevents: true,
            hold_threshold: 10
          });
          nga_popup_hammer.on("hold touch", nga_DoPopupMenuTouch);
        }
        nga_popup_initialized = true;
      }
      if (!document.oncontextmenu)
        document.oncontextmenu = ngmn_DisableContextMenu;
    } else if (document.oncontextmenu == ngmn_DisableContextMenu)
      document.oncontextmenu = null;
  }
}
function ng_SetControlPopup(a, b) {
  if (a) {
    b = ngVal(b, null);
    var d = ngVal(a.PopupMenu, null);
    if (d != b) {
      if (d) {
        if (!b) {
          a.RemoveEvent("SetVisible", ngmn_SetPopupControlVisible);
          a.RemoveEvent("SetEnable", ngmn_SetPopupControlVisible);
          a.RemoveEvent("DoAttach", ngmn_DoPopupAttach);
          a.RemoveEvent("DoAcceptGestures", ngmn_DoAcceptGestures);
          a.RemoveEvent("DoGesture", ngmn_DoGesture);
          a.RemoveEvent("DoDispose", ngmn_DoPopupDispose);
        }
        var e = ngVal(d.Owner, null);
        if (e == a) d.Owner = null;
      }
      if ((a.PopupMenu = b)) {
        (e = b.Owner) && e != a && ng_SetControlPopup(e, null);
        b.Owner = a;
        if (!d) {
          a.AddEvent("SetVisible", ngmn_SetPopupControlVisible);
          a.AddEvent("SetEnable", ngmn_SetPopupControlVisible);
          a.AddEvent("DoAttach", ngmn_DoPopupAttach);
          a.AddEvent("DoAcceptGestures", ngmn_DoAcceptGestures);
          a.AddEvent("DoGesture", ngmn_DoGesture);
          a.AddEvent("DoDispose", ngmn_DoPopupDispose);
        }
      }
    }
  }
}
function Create_ngMenu(a, b, d) {
  b = ngCreateControlAsType(a, "ngList", b, d);
  d = a.Data;
  var e = a.parent;
  delete a.Data;
  delete a.parent;
  b.SubMenuDef = ng_CopyVar(a);
  delete b.SubMenuDef.parent;
  delete b.SubMenuDef.id;
  delete b.SubMenuDef.L;
  delete b.SubMenuDef.T;
  delete b.SubMenuDef.R;
  delete b.SubMenuDef.B;
  delete b.SubMenuDef.W;
  delete b.SubMenuDef.H;
  b.SubMenuDef.AutoDef = true;
  b.SubMenuDef._noMerge = true;
  a.Data = d;
  a.parent = e;
  b.ShowCheckboxes = true;
  b.ShowHeader = false;
  b.PopupGroup = "menu";
  b.DoPopup = ngmn_DoPopup;
  b.IsInsidePopup = ngmn_IsInsidePopup;
  b.Popup = ngmn_Popup;
  b.PopupCtrl = ngmn_PopupCtrl;
  b.PopupSubMenu = ngmn_PopupSubMenu;
  b.ShowSubMenu = ngmn_ShowSubMenu;
  b.GetMenuItemByID = ngmn_GetMenuItemByID;
  b.GetMenu = ngmn_GetMenu;
  b.MenuClick = ngmn_MenuClick;
  b.CreateSubMenu = ngmn_CreateSubMenu;
  b.HideSubMenu = ngmn_HideSubMenu;
  b.HideMenu = ngmn_HideMenu;
  b.ListBeginUpdate = b.BeginUpdate;
  b.BeginUpdate = ngmn_BeginUpdate;
  b.ListEndUpdate = b.EndUpdate;
  b.EndUpdate = ngmn_EndUpdate;
  b.update_info = [];
  b.GetScreenRect = ngmn_GetScreenRect;
  b.AddEvent(ngmn_DoCreate, "DoCreate");
  b.AddEvent(ngmn_OnEnterRow, "OnEnterRow");
  b.AddEvent(ngmn_OnLeaveRow, "OnLeaveRow");
  b.AddEvent(ngmn_SetVisible, "SetVisible");
  b.AddEvent(ngmn_OnEnter, "OnMouseEnter");
  b.AddEvent("OnAdd", ngmn_OnAdd);
  b.AddEvent("OnRemove", ngmn_OnRemove);
  b.AddEvent("OnKeyDown", ngmn_OnKeyDown);
  b.AddEvent("OnScroll", ngmn_OnScroll);
  b.AddEvent("DoAttach", ngmn_DoAttach);
  b.AddEvent(ngmn_Update, "Update");
  b.OnGetText = ngmn_MenuText;
  b.DefaultDrawItemText = b.DrawItemText;
  b.DrawItemText = ngmn_DrawItemText;
  b.OnPopUp = null;
  b.OnDrawSeparator = null;
  b.OnHideSubMenu = null;
  b.OnMenuClick = null;
  b.OnClickOutside = null;
  b.OnGetScreenRect = null;
  b.Visible = false;
  return b;
}
function Create_ngMenuBar(a, b, d) {
  a = ngCreateControlAsType(a, "ngToolBar", b, d);
  a.BeginUpdate = ngmb_BeginUpdate;
  a.EndUpdate = ngmb_EndUpdate;
  a.update_info = [];
  a.AddEvent(ngmb_DoCreate, "DoCreate");
  if (typeof a.Menu === "undefined") a.Menu = [];
  return a;
}
function Create_ngMenuBarButton(a, b, d) {
  a = ngCreateControlAsType(a, "ngButton", b, d);
  a.AddEvent("OnMouseEnter", ngmbb_ButtonEnterMenu);
  a.AutoPopup = false;
  return a;
}
function Create_ngSplitButton(a, b, d) {
  if (typeof a.Data === "undefined") a.Data = {};
  a.Data.SplitButton = true;
  a = ngCreateControlAsType(a, "ngButton", b, d);
  a.AddEvent("DoUpdate", ngsbtn_DoUpdate);
  a.AddEvent("DoPtrClick", ngsbtn_DoPtrClick);
  a.AddEvent(ngsbtn_Click, "Click");
  a.DoMenuClick = ngsbtn_DoMenuClick;
  if (typeof a.OnMenuClick === "undefined") a.OnMenuClick = null;
  return a;
}
if (typeof ngUserControls === "undefined") ngUserControls = [];
ngUserControls.menu = {
  OnControlCreated: function(a, b) {
    if (
      typeof a.Menu === "object" &&
      b.CtrlType != "ngToolBar" &&
      typeof b.Menu === "undefined"
    ) {
      var d = { Control: a.Menu };
      d = ngCreateControls(
        d,
        undefined,
        typeof ngApp === "object" && ngApp ? ngApp.Elm() : undefined
      );
      ng_SetControlMenu(b, d.Control);
    }
    if (typeof a.PopupMenu === "object" && typeof b.PopupMenu === "undefined") {
      a = a.PopupMenu;
      if (typeof a.Data === "undefined") a.Data = {};
      d = { Control: a };
      d = ngCreateControls(
        d,
        undefined,
        typeof ngApp === "object" && ngApp ? ngApp.Elm() : undefined
      );
      ng_SetControlPopup(b, d.Control);
    }
  },
  OnInit: function() {
    ngRegisterControlType("ngMenu", Create_ngMenu);
    ngRegisterControlType("ngMenuBar", Create_ngMenuBar);
    ngRegisterControlType("ngMenuBarButton", Create_ngMenuBarButton);
    ngRegisterControlType("ngSplitButton", Create_ngSplitButton);
    if (typeof ngApp === "object" && ngApp) {
      ngApp.Menu = null;
      ngApp.SetPopupMenu = nga_SetPopupMenu;
    }
  }
};
var alNone = 0,
  alClient = 1,
  alLeft = 2,
  alRight = 3,
  alTop = 4,
  alBottom = 5;
function ngapc_OnSetVisible(a, b) {
  if (!ngVal(a.AlignAutoUpdate, true) || !a.ParentControl) return true;
  var d = ngVal(a.ControlAlign, alNone);
  if (d == this.align_control && (d == alNone || d == alClient)) return true;
  if (a.ID != "")
    if ((d = a.Elm()))
      if (a.DoSetVisible) a.DoSetVisible(d, b);
      else {
        d.style.display = b ? "block" : "none";
        d.style.visibility = b ? "visible" : "hidden";
      }
  if (a.Visible != b) {
    a.Visible = b;
    a.ParentControl.Update();
    a.OnVisibleChanged && a.OnVisibleChanged(a);
  }
  return false;
}
function ngapc_DoUpdate(a) {
  if (ngVal(this.AlignAutoUpdate, true) && this.ParentControl) {
    var b = ngVal(this.ControlAlign, alNone);
    if (
      b != this.align_control ||
      ((b == alLeft || b == alRight) && this.align_w != this.Bounds.W) ||
      ((b == alTop || b == alBottom) && this.align_h != this.Bounds.H)
    ) {
      this.ParentControl.Update();
      return true;
    }
  }
  if (typeof this.ngc_DoUpdate === "function") return this.ngc_DoUpdate(a);
  return true;
}
function ngap_OuterHeight(a, b) {
  b +=
    ng_GetCurrentStylePx(a, "margin-top") +
    ng_GetCurrentStylePx(a, "margin-bottom");
  b +=
    ng_GetCurrentStylePx(a, "border-top-width") +
    ng_GetCurrentStylePx(a, "border-bottom-width");
  b +=
    ng_GetCurrentStylePx(a, "padding-top") +
    ng_GetCurrentStylePx(a, "padding-bottom");
  return b;
}
function ngap_OuterWidth(a, b) {
  b +=
    ng_GetCurrentStylePx(a, "margin-left") +
    ng_GetCurrentStylePx(a, "margin-right");
  b +=
    ng_GetCurrentStylePx(a, "border-left-width") +
    ng_GetCurrentStylePx(a, "border-right-width");
  b +=
    ng_GetCurrentStylePx(a, "padding-left") +
    ng_GetCurrentStylePx(a, "padding-right");
  return b;
}
function ngap_RegisterControl(a) {
  if (!(typeof a !== "object" || !a)) {
    if (a.DoUpdate != ngapc_DoUpdate) {
      a.ngc_DoUpdate = a.DoUpdate;
      a.DoUpdate = ngapc_DoUpdate;
      a.AddEvent(ngapc_OnSetVisible, "OnSetVisible");
    }
    a.align_fncregistered = true;
  }
}
function ngap_UnreegisterControl(a) {
  if (!(typeof a !== "object" || !a)) {
    if (a.DoUpdate == ngapc_DoUpdate) {
      if (typeof a.ngc_DoUpdate === "function") {
        a.DoUpdate = a.ngc_DoUpdate;
        delete a.ngc_DoUpdate;
      }
      a.RemoveEvent(ngapc_OnSetVisible, "OnSetVisible");
    }
    if (typeof a.align_fncregistered !== "undefined")
      a.align_fncregistered = false;
  }
}
function ngap_Update(a) {
  if (this.Visible) {
    for (var b = this.ParentControl; b; ) {
      if (!b.Visible) return;
      b = b.ParentControl;
    }
    if (!this.align_update) {
      this.align_update = true;
      b = null;
      var d = this.OnUpdated;
      this.OnUpdated = null;
      try {
        for (
          var e, f, g, j, k, n, o, t, q, u, x, w, y, z, B, C = false, A = 0;
          A < 2;
          A++
        ) {
          B = this.ChildControls;
          if (typeof B !== "undefined" && B.length > 0)
            if ((b = this.Elm())) {
              this.Align(b);
              w = this.AutoSize;
              x = u = q = t = o = n = 0;
              ng_BeginMeasureElement(b);
              y = ng_OuterWidth(b);
              z = ng_OuterHeight(b);
              ng_EndMeasureElement(b);
              for (var J = 0; J < B.length; J++)
                if ((e = B[J])) {
                  e.Update(false);
                  f = ngVal(e.ControlAlign, alNone);
                  if (f == alNone) {
                    if ((g = w ? e.Elm() : null) && e.Visible) {
                      ng_BeginMeasureElement(g);
                      j = ng_GetCurrentStylePx(g, "left") + ng_OuterWidth(g);
                      k = ng_GetCurrentStylePx(g, "top") + ng_OuterHeight(g);
                      ng_EndMeasureElement(g);
                      if (j > u) u = j;
                      if (k > x) x = k;
                    }
                  } else {
                    if (
                      f != alClient &&
                      (typeof e.align_fncregistered === "undefined" ||
                        !e.align_fncregistered)
                    )
                      ngap_RegisterControl(e);
                    var F = e.Elm();
                    switch (f) {
                      case alTop:
                        e.Bounds.T = o;
                        e.Bounds.L = n;
                        e.Bounds.R = t;
                        if (
                          e.align_h == e.Bounds.H &&
                          typeof e.align_oh !== "undefined"
                        ) {
                          e.Bounds.H = e.align_oh;
                          delete e.align_oh;
                        } else e.Bounds.H = ngVal(e.Bounds.H, 0);
                        delete e.Bounds.B;
                        delete e.Bounds.W;
                        if (e.Visible) o += ngap_OuterHeight(F, e.Bounds.H);
                        if (!w && o + q > z) {
                          if (typeof e.align_oh === "undefined")
                            e.align_oh = e.Bounds.H;
                          e.Bounds.H -= o + q - z;
                          if (e.Bounds.H < 0) e.Bounds.H = 0;
                          o = z - q;
                        } else delete e.align_oh;
                        e.align_h = e.Bounds.H;
                        break;
                      case alBottom:
                        e.Bounds.B = q;
                        e.Bounds.L = n;
                        e.Bounds.R = t;
                        if (
                          e.align_h == e.Bounds.H &&
                          typeof e.align_oh !== "undefined"
                        ) {
                          e.Bounds.H = e.align_oh;
                          delete e.align_oh;
                        } else e.Bounds.H = ngVal(e.Bounds.H, 0);
                        delete e.Bounds.T;
                        delete e.Bounds.W;
                        if (e.Visible) q += ngap_OuterHeight(F, e.Bounds.H);
                        if (!w && o + q > z) {
                          if (typeof e.align_oh === "undefined")
                            e.align_oh = e.Bounds.H;
                          e.Bounds.H -= o + q - z;
                          if (e.Bounds.H < 0) e.Bounds.H = 0;
                          q = z - o;
                        } else delete e.align_oh;
                        e.align_h = e.Bounds.H;
                        break;
                      case alLeft:
                        e.Bounds.L = n;
                        e.Bounds.T = o;
                        e.Bounds.B = q;
                        if (
                          e.align_w == e.Bounds.W &&
                          typeof e.align_ow !== "undefined"
                        ) {
                          e.Bounds.W = e.align_ow;
                          delete e.align_ow;
                        } else e.Bounds.W = ngVal(e.Bounds.W, 0);
                        delete e.Bounds.R;
                        delete e.Bounds.H;
                        if (e.Visible) n += ngap_OuterWidth(F, e.Bounds.W);
                        if (!w && n + t > y) {
                          if (typeof e.align_ow === "undefined")
                            e.align_ow = e.Bounds.W;
                          e.Bounds.W -= n + t - y;
                          if (e.Bounds.W < 0) e.Bounds.W = 0;
                          n = y - t;
                        } else delete e.align_ow;
                        e.align_w = e.Bounds.W;
                        break;
                      case alRight:
                        e.Bounds.R = t;
                        e.Bounds.T = o;
                        e.Bounds.B = q;
                        if (
                          e.align_w == e.Bounds.W &&
                          typeof e.align_ow !== "undefined"
                        ) {
                          e.Bounds.W = e.align_ow;
                          delete e.align_ow;
                        } else e.Bounds.W = ngVal(e.Bounds.W, 0);
                        delete e.Bounds.L;
                        delete e.Bounds.H;
                        if (e.Visible) t += ngap_OuterWidth(F, e.Bounds.W);
                        if (!w && n + t > y) {
                          if (typeof e.align_ow === "undefined")
                            e.align_ow = e.Bounds.W;
                          e.Bounds.W -= n + t - y;
                          if (e.Bounds.W < 0) e.Bounds.W = 0;
                          t = y - n;
                        } else delete e.align_ow;
                        e.align_w = e.Bounds.W;
                        break;
                      case alClient:
                        w = false;
                        e.Bounds.L = n;
                        e.Bounds.R = t;
                        e.Bounds.T = o;
                        e.Bounds.B = q;
                        delete e.Bounds.W;
                        delete e.Bounds.H;
                        break;
                    }
                    e.align_control = f;
                    e.SetBounds();
                  }
                }
              if (w) {
                if (n + t > 0) y = n + t;
                if (o + q > 0) z = o + q;
                if (y < u) y = u;
                if (z < x) z = x;
                if (y < 0) y = 0;
                if (z < 0) z = 0;
                ng_SetOuterWidth(b, y);
                ng_SetOuterHeight(b, z);
                var E = ng_StyleWidth(b),
                  G = ng_StyleHeight(b);
                if (this.Bounds.W != E || this.Bounds.H != G) {
                  this.Bounds.W = E;
                  typeof this.Bounds.L !== "undefined" &&
                    typeof this.Bounds.R !== "undefined" &&
                    delete this.Bounds.R;
                  this.Bounds.H = G;
                  typeof this.Bounds.T !== "undefined" &&
                    typeof this.Bounds.B !== "undefined" &&
                    delete this.Bounds.B;
                  this.SetBounds();
                }
              }
            }
          this.ngc_Update(a);
          B = this.ChildControls;
          if (typeof B !== "undefined" && B.length > 0)
            if ((b = this.Elm()))
              for (J = 0; J < B.length; J++)
                if ((e = B[J])) {
                  f = ngVal(e.ControlAlign, alNone);
                  if (f != alNone)
                    if (
                      f != this.align_control ||
                      ((f == alLeft || f == alRight) &&
                        this.align_w != this.Bounds.W) ||
                      ((f == alTop || f == alBottom) &&
                        this.align_h != this.Bounds.H)
                    ) {
                      C = true;
                      break;
                    }
                }
          if (!C) break;
        }
        this.align_update = false;
        b || (b = this.Elm());
        (this.OnUpdated = d) && this.OnUpdated(this, b);
      } finally {
        this.OnUpdated = d;
      }
    }
  }
}
function ngAlignPanel_Create(a, b, d) {
  a = ngCreateControlAsType(
    a,
    a.Type == "ngAlignFrame" ? "ngFrame" : "ngPanel",
    b,
    d
  );
  a.AutoSize = false;
  a.ngc_Update = a.Update;
  a.Update = ngap_Update;
  a.CtrlBringToFront = ngc_CtrlBringToFront;
  a.CtrlSendToBack = ngc_CtrlSendToBack;
  a.CtrlInsertAfter = ngc_CtrlInsertAfter;
  a.CtrlInsertBefore = ngc_CtrlInsertBefore;
  return a;
}
function ngs_DoPtrStart(a) {
  if (a.EventID === "handle") {
    this.MouseDownSize = this.Size;
    if (this.IsMinimized()) this.MouseDownSize = 0;
    if (this.IsMaximized())
      if ((a = this.Elm()))
        switch (this.PanelAlign) {
          case "left":
          case "right":
            this.MouseDownSize = ng_ClientWidth(a) - this.HandleSize();
            break;
          case "top":
          case "bottom":
            this.MouseDownSize = ng_ClientHeight(a) - this.HandleSize();
            break;
        }
    a = document.getElementById(this.ID + "_M");
    var b = document.getElementById(this.ID + "_H");
    if (a && b) {
      a.style.left = b.style.left;
      a.style.top = b.style.top;
      a.style.width = b.style.width;
      a.style.height = b.style.height;
      a.style.display = "block";
    }
    this.MouseDown = true;
    this.DoUpdateImages();
  }
}
function ngs_DoPtrEnd(a) {
  if (a.EventID === "handle") {
    if ((a = document.getElementById(this.ID + "_M"))) a.style.display = "none";
    var b = this.PointerInfo;
    a = b.EndX - b.StartX;
    var d = b.EndY - b.StartY;
    if (b.StartTime + 300 > b.EndTime && Math.abs(a) < 2 && Math.abs(d) < 2)
      this.DoHandleClick();
    else {
      b = this.MouseDownSize;
      this.Restore();
      switch (this.PanelAlign) {
        case "left":
          this.SetSize(b + a);
          break;
        case "right":
          this.SetSize(b - a);
          break;
        case "top":
          this.SetSize(b + d);
          break;
        case "bottom":
          this.SetSize(b - d);
          break;
      }
    }
    this.MouseDown = false;
    this.DoUpdateImages();
  }
}
function ngs_DoPtrDrag(a) {
  if (a.EventID !== "handle") return false;
  var b = this.Elm(),
    d = document.getElementById(this.ID + "_M");
  if (d && b) {
    var e = ng_ClientWidth(b);
    b = ng_ClientHeight(b);
    var f = this.HandleSize();
    a = this.PointerInfo;
    var g = a.X - a.StartX;
    a = a.Y - a.StartY;
    var j = this.MouseDownSize;
    switch (this.PanelAlign) {
      case "left":
        j += g;
        break;
      case "right":
        j -= g;
        break;
      case "top":
        j += a;
        break;
      case "bottom":
        j -= a;
        break;
    }
    if (this.MaxSize > 0 && j > this.MaxSize) j = this.MaxSize;
    if (j < this.MinSize) j = this.MinSize;
    if (j <= this.AutoMinimize && !this.IsMinimized()) j = 0;
    if (j < 0) j = 0;
    switch (this.PanelAlign) {
      case "left":
      case "right":
        if (e - f - j <= this.AutoMaximize && !this.IsMaximized()) j = e - f;
        if (j > e - f) j = e - f;
        break;
      case "top":
      case "bottom":
        if (b - f - j <= this.AutoMaximize && !this.IsMaximized()) j = b - f;
        if (j > b - f) j = b - f;
        break;
    }
    switch (this.PanelAlign) {
      case "left":
        d.style.left = j + "px";
        break;
      case "right":
        d.style.left = e - f - j + "px";
        break;
      case "top":
        d.style.top = j + "px";
        break;
      case "bottom":
        d.style.top = b - f - j + "px";
        break;
    }
    return true;
  }
  return false;
}
var ngs_CurrentHandleId = "";
function ngs_HandleEnter(a, b) {
  if (!a) a = window.event;
  if (!(ngUsingTouch && a && a.type.toLowerCase().match(/mouse/))) {
    if (ngs_CurrentHandleId != "") {
      var d = document.getElementById(ngs_CurrentHandleId);
      ngs_HandleLeave(a, d);
    }
    ngs_CurrentHandleId = b.id;
    if ((d = document.getElementById(b.id))) {
      a = d.className;
      if (a.indexOf("_Focus") < 0) a += "_Focus";
      d.className = a;
    }
    ngc_EnterImg(b.id + "S");
    ngc_EnterImgS(b.id + "M");
    ngc_EnterImg(b.id + "E");
    ngc_EnterImg(b.id + "I");
  }
}
function ngs_HandleLeave(a, b) {
  if (!a) a = window.event;
  if (!(ngUsingTouch && a && a.type.toLowerCase().match(/mouse/))) {
    if (ngs_CurrentHandleId == b.id) ngs_CurrentHandleId = "";
    if ((a = document.getElementById(b.id))) {
      var d = a.className,
        e = d.indexOf("_Focus");
      if (e >= 0) d = d.substring(0, e);
      a.className = d;
    }
    ngc_LeaveImg(b.id + "S");
    ngc_LeaveImgS(b.id + "M");
    ngc_LeaveImg(b.id + "E");
    ngc_LeaveImg(b.id + "I");
  }
}
function ngs_DoHandleClick() {
  (this.OnHandleClick && !ngVal(this.OnHandleClick(this), false)) ||
    (this.IsMinimized() || this.IsMaximized()
      ? this.Restore()
      : this.Minimize());
}
function ngs_GetImg(a) {
  var b = null;
  if (this.OnGetImg) b = this.OnGetImg(this, a);
  else
    switch (a) {
      case 0:
        b = this.MoverStartImg;
        break;
      case 1:
        b = this.MoverMiddleImg;
        break;
      case 2:
        b = this.MoverEndImg;
        break;
      case 3:
        b = this.HandleImg;
        break;
    }
  return ngVal(b, null);
}
function ngs_HandleSize() {
  if (!this.HandleVisible) return 0;
  var a,
    b = 0;
  switch (this.PanelAlign) {
    case "left":
    case "right":
      for (var d = 0; d < 4; d++)
        if ((a = this.GetImg(d))) {
          a = ngc_ImgDrawProps(
            this.ID + "_MS",
            "ngSplitPanel",
            this.ID,
            this.MouseDown,
            this.Enabled,
            a
          );
          if (a.W > b) b = a.W;
        }
      break;
    case "top":
    case "bottom":
      for (d = 0; d < 4; d++)
        if ((a = this.GetImg(d))) {
          a = ngc_ImgDrawProps(
            this.ID + "_MS",
            "ngSplitPanel",
            this.ID,
            this.MouseDown,
            this.Enabled,
            a
          );
          if (a.H > b) b = a.H;
        }
      break;
  }
  return b;
}
function ngs_Restore() {
  if (this.IsMinimized() || this.IsMaximized())
    if (!(this.OnRestore && !ngVal(this.OnRestore(this), false))) {
      this.ControlsPanel1.SetVisible(true);
      this.ControlsPanel2.SetVisible(true);
      this.__restore = true;
      try {
        this.SetSize(this.Size);
      } finally {
        delete this.__restore;
      }
    }
}
function ngs_IsMinimized() {
  return !this.ControlsPanel1.Visible;
}
function ngs_Maximize() {
  if (this.IsMinimized() || this.IsMaximized()) this.Restore();
  if (!(this.OnMaximize && !ngVal(this.OnMaximize(this), false))) {
    this.ControlsPanel2.SetVisible(false);
    this.SetSize(this.Size);
  }
}
function ngs_IsMaximized() {
  return !this.ControlsPanel2.Visible;
}
function ngs_Minimize() {
  if (this.IsMinimized() || this.IsMaximized()) this.Restore();
  if (!(this.OnMinimize && !ngVal(this.OnMinimize(this), false))) {
    this.ControlsPanel1.SetVisible(false);
    this.SetSize(this.Size);
  }
}
function ngs_SetSize(a) {
  var b = a != this.Size,
    d = this.Size;
  this.Size = a;
  if (b && this.OnSizeChanging && !ngVal(this.OnSizeChanging(this, d), false))
    this.Size = d;
  else {
    if (this.MaxSize > 0 && this.Size > this.MaxSize) this.Size = this.MaxSize;
    if (this.Size < this.MinSize) this.Size = this.MinSize;
    var e = this.Elm();
    if (
      !this.__restore &&
      this.Size <= this.AutoMinimize &&
      !this.IsMinimized()
    ) {
      this.Size = d;
      this.Minimize();
      e = null;
    }
    if (e) {
      a = ng_ClientWidth(e);
      e = ng_ClientHeight(e);
      var f = document.getElementById(this.ID + "_H"),
        g = Math.round(this.Size),
        j = this.HandleSize(),
        k = this.IsMinimized(),
        n = this.IsMaximized();
      if (f) f.style.display = this.HandleVisible ? "block" : "none";
      switch (this.PanelAlign) {
        case "left":
        case "right":
          if (
            !this.__restore &&
            a - j > 0 &&
            a - j - this.Size <= this.AutoMaximize &&
            !this.IsMaximized()
          ) {
            this.Size = d;
            this.Maximize();
            n = k = true;
            break;
          }
          d = k ? a - j : a - j - Math.round(this.Size);
          if (n) {
            g = a - j;
            d = 0;
          }
          if (k) g = 0;
          if (g < 0) g = 0;
          if (g > a - j) g = a - j;
          if (!k && !n) this.Size = g;
          if (d < 0) d = 0;
          if (d > a - j) d = a - j;
          if (!k) this.ControlsPanel1.Bounds.W = g;
          if (!n) this.ControlsPanel2.Bounds.W = d;
          d = (this.PanelAlign == "left" ? g : d) + "px";
          if (f) {
            f.style.left = d;
            f.style.width = j + "px";
            f.style.height = e + "px";
          }
          break;
        case "top":
        case "bottom":
          if (
            !this.__restore &&
            e - j > 0 &&
            e - j - this.Size <= this.AutoMaximize &&
            !this.IsMaximized()
          ) {
            this.Size = d;
            this.Maximize();
            n = k = true;
            break;
          }
          d = k ? e - j : e - j - Math.round(this.Size);
          if (n) {
            g = e - j;
            d = 0;
          }
          if (k) g = 0;
          if (g < 0) g = 0;
          if (g > e - j) g = e - j;
          if (!k && !n) this.Size = g;
          if (d < 0) d = 0;
          if (d > e - j) d = e - j;
          if (!k) this.ControlsPanel1.Bounds.H = g;
          if (!n) this.ControlsPanel2.Bounds.H = d;
          d = (this.PanelAlign == "top" ? g : d) + "px";
          if (f) {
            f.style.top = d;
            f.style.height = j + "px";
            f.style.width = a + "px";
          }
          break;
      }
      if (!k) {
        this.ControlsPanel1.SetBounds();
        this.ControlsPanel1.Update();
      }
      if (!n) {
        this.ControlsPanel2.SetBounds();
        this.ControlsPanel2.Update();
      }
    }
    b && this.OnSizeChanged && this.OnSizeChanged(this);
  }
}
function ngs_DoUpdate(a) {
  var b = document.getElementById(this.ID + "_H");
  if (!b) return true;
  var d = this.BaseClassName,
    e = new ngStringBuilder(),
    f = 0,
    g = false,
    j = ng_ClientWidth(a);
  a = ng_ClientHeight(a);
  switch (this.PanelAlign) {
    case "left":
    case "right":
      if (ngVal(this.LastDim, j) != j) g = true;
      f = j;
      break;
    case "top":
    case "bottom":
      if (ngVal(this.LastDim, a) != a) g = true;
      f = a;
      break;
  }
  if (g)
    if (
      (!this.OnResize || ngVal(this.OnResize(this), false)) &&
      f > 0 &&
      this.LastDim > 0
    ) {
      g = f / this.LastDim;
      if (this.ResizeMode & ngspResizeSize) this.Size *= g;
      if (this.ResizeMode & ngspResizeMinSize) this.MinSize *= g;
      if (this.ResizeMode & ngspResizeMaxSize) this.MaxSize *= g;
      if (this.ResizeMode & ngspResizeAutoMinimize) this.AutoMinimize *= g;
      if (this.ResizeMode & ngspResizeAutoMaximize) this.AutoMaximize *= g;
    }
  this.SetSize(this.Size);
  var k,
    n = 0,
    o = 0;
  switch (this.PanelAlign) {
    case "left":
    case "right":
      b.style.cursor = this.Enabled ? "col-resize" : "default";
      if ((g = this.GetImg(0))) {
        k = ngc_ImgDrawProps(
          this.ID + "_HS",
          "ngSplitPanel",
          this.ID,
          this.MouseDown,
          this.Enabled,
          g
        );
        ngc_Img(e, k, "position:absolute; top: 0px;", ngVal(g.Attrs, ""));
        n = k.H;
      }
      if ((g = this.GetImg(2))) {
        k = ngc_ImgDrawProps(
          this.ID + "_HE",
          "ngSplitPanel",
          this.ID,
          this.MouseDown,
          this.Enabled,
          g
        );
        ngc_Img(
          e,
          k,
          "position:absolute; top: " + (a - k.H) + "px;",
          ngVal(g.Attrs, "")
        );
        o = k.H;
      }
      if ((g = this.GetImg(1))) {
        k = ngc_ImgDrawProps(
          this.ID + "_HM",
          "ngSplitPanel",
          this.ID,
          this.MouseDown,
          this.Enabled,
          g
        );
        ngc_ImgSH(e, k, n, a - n - o, "", ngVal(g.Attrs, ""));
      }
      if ((g = this.GetImg(3))) {
        k = ngc_ImgDrawProps(
          this.ID + "_HI",
          "ngSplitPanel",
          this.ID,
          this.MouseDown,
          this.Enabled,
          g
        );
        ngc_Img(
          e,
          k,
          "position:absolute;z-index:1;top: " +
            Math.round((a - k.H) / 2) +
            "px;",
          ngVal(g.Attrs, "")
        );
      }
      break;
    case "top":
    case "bottom":
      b.style.cursor = this.Enabled ? "row-resize" : "default";
      if ((g = this.GetImg(0))) {
        k = ngc_ImgDrawProps(
          this.ID + "_HS",
          "ngSplitPanel",
          this.ID,
          this.MouseDown,
          this.Enabled,
          g
        );
        ngc_Img(e, k, "position:absolute; left: 0px;", ngVal(g.Attrs, ""));
        n = k.W;
      }
      if ((g = this.GetImg(2))) {
        k = ngc_ImgDrawProps(
          this.ID + "_HE",
          "ngSplitPanel",
          this.ID,
          this.MouseDown,
          this.Enabled,
          g
        );
        ngc_Img(
          e,
          k,
          "position:absolute; left: " + (j - k.W) + "px;",
          ngVal(g.Attrs, "")
        );
        o = k.W;
      }
      if ((g = this.GetImg(1))) {
        k = ngc_ImgDrawProps(
          this.ID + "_HM",
          "ngSplitPanel",
          this.ID,
          this.MouseDown,
          this.Enabled,
          g
        );
        ngc_ImgSW(e, k, n, j - n - o, "", ngVal(g.Attrs, ""));
      }
      if ((g = this.GetImg(3))) {
        k = ngc_ImgDrawProps(
          this.ID + "_HI",
          "ngSplitPanel",
          this.ID,
          this.MouseDown,
          this.Enabled,
          g
        );
        ngc_Img(
          e,
          k,
          "position:absolute;z-index:1;left: " +
            Math.round((j - k.W) / 2) +
            "px;",
          ngVal(g.Attrs, "")
        );
      }
      break;
  }
  ng_SetInnerHTML(b, e.toString());
  d = d + (this.Enabled ? "Handle" : "HandleDisabled");
  if (ngs_CurrentHandleId == b.id) d += "_Focus";
  b.className = d;
  this.LastDim = f;
  return true;
}
function ngs_DoUpdateImages() {
  for (var a = 0; a < 4; a++)
    if ((img = this.GetImg(a))) {
      var b = "";
      switch (a) {
        case 0:
          b = "_HS";
          break;
        case 1:
          b = "_HM";
          break;
        case 2:
          b = "_HE";
          break;
        case 3:
          b = "_HI";
          break;
      }
      ngc_ChangeImg(this.ID + b, this.MouseDown, this.Enabled, img);
    }
}
function ngs_DoAttach() {
  var a = document.getElementById(this.ID + "_H");
  if (a) {
    a.onmouseover = function(b) {
      ngs_HandleEnter(b, this);
    };
    a.onmouseout = function(b) {
      ngs_HandleLeave(b, this);
    };
    ngc_PtrListener(this, a, "handle", "drag");
  }
}
function ngs_DoRelease(a) {
  a.style.display = "none";
  (a = document.getElementById(this.ID + "_H")) && ng_SetInnerHTML(a, "");
}
function ngs_DoCreate(a, b, d) {
  var e = this.BaseClassName,
    f = ng_ClientWidth(d);
  ng_ClientHeight(d);
  var g = this.HandleSize();
  if (this.MaxSize > 0 && this.Size > this.MaxSize) this.Size = this.MaxSize;
  if (this.Size < this.MinSize) this.Size = this.MinSize;
  var j = {};
  j.ControlsPanel =
    typeof a.ControlsPanel1 === "object"
      ? ng_CopyVar(a.ControlsPanel1)
      : typeof a.ControlsPanel === "object"
        ? ng_CopyVar(a.ControlsPanel)
        : {};
  var k = j.ControlsPanel;
  ng_MergeDef(k, {
    Type: "ngPanel",
    className: e + "ControlsPanel",
    id: this.ID + "_P1",
    ScrollBars: ssAuto
  });
  var n = Math.round(this.Size);
  switch (this.PanelAlign) {
    case "left":
      k.L = 0;
      k.W = n;
      k.T = 0;
      k.B = 0;
      break;
    case "right":
      k.R = 0;
      k.W = n;
      k.T = 0;
      k.B = 0;
      break;
    case "top":
      k.T = 0;
      k.H = n;
      k.L = 0;
      k.R = 0;
      break;
    case "bottom":
      k.B = 0;
      k.H = n;
      k.L = 0;
      k.R = 0;
      break;
  }
  k.Controls = a.Controls1;
  k.ModifyControls = a.ModifyControls1;
  j = ngCreateControls(j, undefined, this.ID);
  this.ControlsPanel1 = j.ControlsPanel;
  this.ControlsPanel1.Owner = this;
  delete j.ControlsPanel;
  ngCloneRefs(b, j);
  j = {};
  j.ControlsPanel =
    typeof a.ControlsPanel2 === "object"
      ? ng_CopyVar(a.ControlsPanel2)
      : typeof a.ControlsPanel === "object"
        ? ng_CopyVar(a.ControlsPanel)
        : {};
  k = j.ControlsPanel;
  ng_MergeDef(k, {
    Type: "ngPanel",
    className: e + "ControlsPanel",
    id: this.ID + "_P2",
    ScrollBars: ssAuto
  });
  n = f - g - Math.round(this.Size);
  if (n < 0) n = 0;
  switch (this.PanelAlign) {
    case "left":
      k.R = 0;
      k.W = n;
      k.T = 0;
      k.B = 0;
      break;
    case "right":
      k.L = 0;
      k.W = n;
      k.T = 0;
      k.B = 0;
      break;
    case "top":
      k.B = 0;
      k.H = n;
      k.L = 0;
      k.R = 0;
      break;
    case "bottom":
      k.T = 0;
      k.H = n;
      k.L = 0;
      k.R = 0;
      break;
  }
  k.Controls = a.Controls2;
  k.ModifyControls = a.ModifyControls2;
  j = ngCreateControls(j, undefined, this.ID);
  this.ControlsPanel2 = j.ControlsPanel;
  this.ControlsPanel2.Owner = this;
  delete j.ControlsPanel;
  ngCloneRefs(b, j);
  a = document.createElement("div");
  a.id = this.ID + "_H";
  a.className = e + "Handle";
  a.style.position = "absolute";
  d.appendChild(a);
  ngc_PtrEventsHTML(this, "handle", "drag");
  a = document.createElement("div");
  a.id = this.ID + "_M";
  a.className = e + "Mover";
  a.style.display = "none";
  a.style.position = "absolute";
  a.style.zIndex = "801";
  a.style.fontSize = "0px";
  a.style.lineHeight = "0px";
  a.style.left = "0px";
  a.style.top = "0px";
  a.style.width = "0px";
  a.style.height = "0px";
  d.appendChild(a);
}
var ngs_initialized = false,
  ngspResizeNone = 0,
  ngspResizeSize = 1,
  ngspResizeMinSize = 2,
  ngspResizeMaxSize = 4,
  ngspResizeAutoMinimize = 8,
  ngspResizeAutoMaximize = 16;
function ngSplitPanel(a) {
  ngControl(this, a, "ngSplitPanel");
  this.PanelAlign = "left";
  this.ResizeMode = ngspResizeSize;
  this.Size = 200;
  this.AutoMaximize = this.AutoMinimize = this.MaxSize = this.MinSize = 0;
  this.HandleVisible = true;
  this.HandleImg = this.MoverEndImg = this.MoverMiddleImg = this.MoverStartImg = null;
  this.MouseDown = false;
  this.SetSize = ngs_SetSize;
  this.Minimize = ngs_Minimize;
  this.Maximize = ngs_Maximize;
  this.Restore = ngs_Restore;
  this.IsMaximized = ngs_IsMaximized;
  this.IsMinimized = ngs_IsMinimized;
  this.DoCreate = ngs_DoCreate;
  this.DoRelease = ngs_DoRelease;
  this.DoUpdate = ngs_DoUpdate;
  this.DoAttach = ngs_DoAttach;
  this.DoPtrStart = ngs_DoPtrStart;
  this.DoPtrDrag = ngs_DoPtrDrag;
  this.DoPtrEnd = ngs_DoPtrEnd;
  this.DoUpdateImages = ngs_DoUpdateImages;
  this.GetImg = ngs_GetImg;
  this.HandleSize = ngs_HandleSize;
  this.DoHandleClick = ngs_DoHandleClick;
  this.OnRestore = this.OnMaximize = this.OnMinimize = this.OnSizeChanged = this.OnSizeChanging = this.OnHandleClick = this.OnResize = this.OnGetImg = null;
  ngControlCreated(this);
}
function ngdp_BtnClick(a) {
  if (a.Owner && a.Owner.Owner)
    a.Owner.Owner.SetDropDown(a.Owner.Checked == 1 ? false : true);
}
function ngdp_DoUpdate(a) {
  var b = 0,
    d = false,
    e = typeof this.Bounds.T === "undefined";
  if (e) {
    if (typeof this.Bounds.T !== "undefined") {
      delete this.Bounds.T;
      this.SetBounds();
    }
  } else if (typeof this.Bounds.B !== "undefined") {
    delete this.Bounds.B;
    this.SetBounds();
  }
  var f = this.Button;
  if (f) {
    if (f.Checked == 1) d = true;
    e
      ? f.SetBounds({ T: 0, B: undefined })
      : f.SetBounds({ B: 0, T: undefined });
    f.ID == "" && f.Attach(this.ID + "_B");
    f.Parent = this;
    f.Update();
    if ((f = f.Elm())) b = ng_OuterHeight(f);
  }
  if (d) {
    this.ControlsPanel.Visible || ng_SetClientHeight(a, b + this.PanelHeight);
    a = ng_StyleHeight(a);
    if (this.Bounds.H != a) {
      this.Bounds.H = a;
      this.SetBounds();
    }
    this.ControlsPanel.Bounds.T = e ? b : 0;
    this.ControlsPanel.Bounds.L = 0;
    this.ControlsPanel.Bounds.R = 0;
    this.ControlsPanel.Bounds.B = e ? 0 : b;
    this.ControlsPanel.SetBounds();
    this.ControlsPanel.SetVisible(true);
  } else {
    if (this.ControlsPanel.Visible) {
      if ((e = this.ControlsPanel.Elm())) {
        e = ng_ClientHeight(e);
        if (e > b) this.PanelHeight = e;
      }
      this.ControlsPanel.SetVisible(false);
    }
    ng_SetClientHeight(a, b);
    a = ng_StyleHeight(a);
    if (this.Bounds.H != a) {
      this.Bounds.H = a;
      this.SetBounds();
    }
  }
  return true;
}
function ngdp_SetBounds(a) {
  if (typeof a !== "undefined")
    if (typeof a.H !== "undefined") {
      var b = 0,
        d = false;
      if (this.Button) {
        var e = this.Button.Elm();
        if (e) b = ng_OuterHeight(e);
        if (this.Button.Checked == 1) d = true;
      }
      this.PanelHeight = a.H - b;
      if (!d) this.Bounds.H = 0;
    }
  return this.DefaultSetBounds(a);
}
function ngdp_SetClientRect(a) {
  if (ngVal(a, false)) {
    if (typeof a.W !== "undefined") this.Bounds.W = a.W;
    if (typeof a.H !== "undefined") {
      var b = 0,
        d = false;
      if (this.Button) {
        var e = this.Button.Elm();
        if (e) b = ng_OuterHeight(e);
        if (this.Button.Checked == 1) d = true;
      }
      this.PanelHeight = a.H;
      this.Bounds.H = (d ? a.H : 0) + b;
    }
  }
}
function ngdp_GetClientRect() {
  var a, b;
  if (ngVal(this.ControlsPanel, false)) {
    var d = this.ControlsPanel.Elm();
    if (d) {
      a = ng_ClientWidth(d);
      b = ng_ClientHeight(d);
    }
  }
  return { W: a, H: b };
}
function ngdp_DoRelease(a) {
  a.style.display = "none";
}
function ngdp_DoCreate(a, b) {
  var d = this.BaseClassName,
    e = 0,
    f = typeof a.T === "undefined";
  if (typeof a.Button === "undefined") a.Button = {};
  ng_MergeDef(a.Button, {
    Type: "ngButton",
    L: 0,
    R: 0,
    id: this.ID + "_B",
    Data: { Checked: ngVal(a.DroppedDown, false) ? 1 : 0 },
    Events: { OnClick: ngdp_BtnClick }
  });
  if (typeof a.B === "undefined") {
    a.Button.B = 0;
    a.Button.T = undefined;
  } else {
    a.Button.T = 0;
    delete a.Button.B;
  }
  var g = ngCreateControls({ Control: a.Button }, undefined, this.ID);
  if (typeof g.Control !== "undefined") {
    g.Control.Owner = this;
    this.Button = g.Control;
    this.Button.Parent = this;
  } else this.Button = null;
  if ((g = this.Button)) {
    g && g.ID == "" && g.Attach(this.ID + "_B");
    g.Update();
    if ((g = g.Elm())) e = ng_OuterHeight(g);
  }
  if (typeof a.CW !== "undefined" || typeof a.CH !== "undefined") {
    this.SetClientRect({ W: a.CW, H: a.CH });
    this.SetBounds();
  }
  g = {};
  g.ControlsPanel =
    typeof a.ControlsPanel === "object" ? ng_CopyVar(a.ControlsPanel) : {};
  ng_MergeDef(g.ControlsPanel, {
    Type: "ngPanel",
    className: d + "ControlsPanel",
    id: this.ID + "_P",
    ScrollBars: ssAuto,
    L: 0,
    T: 0,
    R: 0,
    B: 0
  });
  g.ControlsPanel.Controls = a.Controls;
  g.ControlsPanel.ModifyControls = a.ModifyControls;
  g.ControlsPanel.T = f ? e : 0;
  g.ControlsPanel.B = f ? 0 : e;
  g = ngCreateControls(g, undefined, this.ID);
  this.ControlsPanel = g.ControlsPanel;
  this.ControlsPanel.Owner = this;
  delete g.ControlsPanel;
  ngCloneRefs(b, g);
  delete a.Controls;
  delete a.ModifyControls;
}
function ngdp_IsDroppedDown() {
  return this.Button && this.Button.Checked == 1;
}
function ngdp_SetDropDown(a) {
  if (this.IsDroppedDown() != a)
    if (!(this.OnDropDown && !ngVal(this.OnDropDown(this, a), false)))
      if (this.Button) {
        this.Button.Check(a ? 1 : 0);
        this.Update();
      }
}
function ngdp_ToggleDropDown() {
  this.SetDropDown(!this.IsDroppedDown());
}
function ngDropPanel(a) {
  ngControl(this, a, "ngDropPanel");
  this.Button = null;
  this.IsDroppedDown = ngdp_IsDroppedDown;
  this.SetDropDown = ngdp_SetDropDown;
  this.ToggleDropDown = ngdp_ToggleDropDown;
  this.GetClientRect = ngdp_GetClientRect;
  this.SetClientRect = ngdp_SetClientRect;
  this.DefaultSetBounds = this.SetBounds;
  this.SetBounds = ngdp_SetBounds;
  this.DoCreate = ngdp_DoCreate;
  this.DoRelease = ngdp_DoRelease;
  this.DoUpdate = ngdp_DoUpdate;
  this.OnDropDown = null;
  ngControlCreated(this);
}
if (typeof ngUserControls === "undefined") ngUserControls = [];
ngUserControls.panels = {
  OnInit: function() {
    ngRegisterControlType("ngAlignPanel", ngAlignPanel_Create);
    ngRegisterControlType("ngAlignFrame", ngAlignPanel_Create);
    ngRegisterControlType("ngDropPanel", function() {
      return new ngDropPanel();
    });
    ngRegisterControlType("ngSplitPanel", function() {
      return new ngSplitPanel();
    });
  }
};
var ngSettingsByID = [],
  ngSettingsLastID = 0,
  ngsCookieMaxLen = 4050;
function getSettingsByID(a) {
  if (ngSettingsByID) return ngSettingsByID[a];
  return null;
}
function ngset_Set(a, b) {
  if (this.IsValidName(a))
    if (!(this.OnSetSetting && !ngVal(this.OnSetSetting(this, a, b), false)))
      if (
        typeof this.Settings[a] === "undefined" ||
        !ng_VarEquals(this.Settings[a], b)
      ) {
        this.BeginUpdate();
        if (typeof b === "undefined") delete this.Settings[a];
        else this.Settings[a] = b;
        this.changed = true;
        this.EndUpdate();
      }
}
function ngset_Get(a, b) {
  if (!this.IsValidName(a)) return b;
  var d = ng_CopyVar(this.Settings[a]);
  if (this.OnGetSetting) d = this.OnGetSetting(this, a, d);
  if (typeof d === "undefined") d = b;
  return d;
}
function ngset_BeginUpdate() {
  this.update_cnt++;
  if (this.save_timer) {
    clearTimeout(this.save_timer);
    this.save_timer = null;
  }
}
function ngset_EndUpdate() {
  this.update_cnt--;
  if (this.update_cnt <= 0) {
    this.update_cnt = 0;
    if (this.changed)
      if (this.DelayedSave > 0) {
        this.save_timer && clearTimeout(this.save_timer);
        var a = this;
        this.save_timer = setTimeout(function() {
          a.Save();
        }, this.DelayedSave);
      } else this.Save();
  }
}
function ngset_Clear() {
  for (var a in this.Settings) {
    this.BeginUpdate();
    this.Settings = [];
    this.changed = true;
    this.EndUpdate();
    break;
  }
}
function ngset_Load() {
  if (!this.rpc) this.rpc = new ngRPC();
  this.rpc.sendRequest(
    ng_AddURLParam(this.StorageURL, "load=1&id=" + this.SettingsID)
  );
}
function ngset_IsValidName(a) {
  if (typeof a === "undefined" || a == "") return false;
  return a.replace(/[a-zA-Z_$][0-9a-zA-Z_$]*/, "") == "";
}
function ngset_EncodeSetting(a, b) {
  if (this.IsValidName(a)) {
    if (typeof b === "undefined") return b;
    b = this.OnEncodeSetting
      ? this.OnEncodeSetting(this, a, b)
      : ng_URLEncode(b);
    return (b = b.replace("%40", "%u0040"));
  }
}
function ngset_BuildSettingsStr(a) {
  var b,
    d = "";
  for (var e in a) {
    b = a[e];
    if (typeof b === "object") {
      if (d != "") d += "@";
      d += e + "@{@" + this.BuildSettingsStr(b) + "@}";
    } else {
      b = this.EncodeSetting(e, b);
      if (typeof b !== "undefined") {
        if (d != "") d += "@";
        d += e + "-" + b;
      }
    }
  }
  return d;
}
function ngset_Save() {
  if (!(this.OnSettingsSaving && !ngVal(this.OnSettingsSaving(this), false))) {
    if (this.save_timer) {
      clearTimeout(this.save_timer);
      this.save_timer = null;
    }
    var a,
      b = this.BuildSettingsStr(this.Settings),
      d = this.StorageURL;
    a = 1;
    if (b != "")
      for (; b != ""; ) {
        ngSetCookieByURL(
          "_ngs" + a,
          b.substr(0, ngsCookieMaxLen),
          this.StorageExpires,
          d,
          false
        );
        b = b.substring(ngsCookieMaxLen, b.length);
        a++;
        if (a > 50) break;
      }
    b = ngCookieExpires(-3600);
    for (a = a; a <= 50; a++) ngSetCookieByURL("_ngs" + a, "", b, d, false);
    this.changed = false;
    this.OnSettingsSaved && this.OnSettingsSaved(this);
  }
}
function ngset_do_load(a, b) {
  if (typeof b !== "undefined")
    if ((a = getSettingsByID(a))) {
      a.Settings = b;
      a.changed = false;
      a.OnSettingsLoaded && a.OnSettingsLoaded(a);
    }
}
function ngSettings(a, b) {
  if (typeof a === "undefined") {
    ngSettingsLastID++;
    a = "ngSettings" + ngSettingsLastID;
  }
  this.rpc = null;
  this.update_cnt = this.changed = false;
  this.save_timer = null;
  ngSettingsByID[a] = this;
  this.SettingsID = a;
  this.Settings = [];
  this.StorageURL = ngVal(b, ngApp.AppPath + "settings/");
  this.StorageExpires = ngCookieExpires(31536e4);
  this.DelayedSave = 200;
  this.Set = ngset_Set;
  this.Get = ngset_Get;
  this.BeginUpdate = ngset_BeginUpdate;
  this.EndUpdate = ngset_EndUpdate;
  this.IsValidName = ngset_IsValidName;
  this.Clear = ngset_Clear;
  this.Load = ngset_Load;
  this.Save = ngset_Save;
  this.EncodeSetting = ngset_EncodeSetting;
  this.BuildSettingsStr = ngset_BuildSettingsStr;
  this.OnSettingsLoaded = this.OnSettingsSaved = this.OnSettingsSaving = this.OnGetSetting = this.OnSetSetting = this.OnEncodeSetting = null;
}
if (typeof ngUserControls === "undefined") ngUserControls = [];
ngUserControls.settings = {
  OnInit: function() {
    if (
      typeof ngApp === "object" &&
      ngApp &&
      typeof ngApp.Settings === "undefined"
    ) {
      ngApp.Settings = new ngSettings("ngAppSettings");
      var a = ngVal(ngApp.StartParams, null);
      if (a && typeof a.AppSettingsStorageURL !== "undefined") {
        a = a.AppSettingsStorageURL;
        if (a.substr(0, 4) != "http")
          if (a.substr(0, 1) == "/") {
            var b = ngApp.AppPath.indexOf("//");
            if (b >= 0) {
              b = ngApp.AppPath.indexOf("/", b + 2);
              a = b >= 0 ? ngApp.AppPath.substr(0, b) + a : ngApp.AppPath + a;
            }
          } else a = ngApp.AppPath + a;
        ngApp.Settings.StorageURL = a;
      }
      if (typeof ngLoadedSettings !== "undefined") {
        ngApp.Settings.Settings = ngLoadedSettings;
        ngLoadedSettings = undefined;
      }
    }
  }
};
var OnStartModal = null,
  OnStopModal = null,
  ngModalZIndexDelta = 1e4,
  ngModalCnt = 0;
function ngStartModalControl() {
  if (!ngModalCnt)
    if (!OnStartModal || ngVal(OnStartModal(), false)) {
      var a = document.getElementById("NGMODALWINDOW_CURTAIN");
      if (a) {
        a.style.zIndex = ngModalZIndexDelta;
        a.style.display = "block";
        a.style.visibility = "visible";
      } else {
        a = document.createElement("div");
        a.id = "NGMODALWINDOW_CURTAIN";
        a.className = "ngModalCurtain";
        a.style.position = "absolute";
        a.style.left = "0%";
        a.style.top = "0%";
        a.style.width = "100%";
        a.style.height = "100%";
        a.style.display = "block";
        a.style.zIndex = ngModalZIndexDelta;
        (typeof ngApp === "object" && ngApp
          ? ngApp.Elm()
          : document.body
        ).appendChild(a);
      }
    }
  ngModalCnt++;
  if (ngModalCnt > 1)
    if ((a = document.getElementById("NGMODALWINDOW_CURTAIN")))
      a.style.zIndex = ngModalCnt * ngModalZIndexDelta;
}
function ngStopModalControl() {
  ngModalCnt--;
  if (ngModalCnt <= 0) {
    ngModalCnt = 0;
    if (!OnStopModal || ngVal(OnStopModal(), false)) {
      var a = document.getElementById("NGMODALWINDOW_CURTAIN");
      if (a) {
        a.style.display = "none";
        a.style.visibility = "hidden";
      }
    }
  } else if ((a = document.getElementById("NGMODALWINDOW_CURTAIN")))
    a.style.zIndex = ngModalCnt * ngModalZIndexDelta;
}
function ngCreateWindow(a, b) {
  if (!a) return null;
  var d = 0,
    e = "";
  if (typeof a === "string") {
    d = {};
    d.Window = { Type: a };
    e = "Window";
    a = d;
  } else {
    for (var f in a) {
      d++;
      if (d > 1) {
        d = {};
        d.Window = ng_CopyVar(a);
        e = "Window";
        a = d;
        break;
      } else e = f;
    }
    if (e == "") return null;
  }
  a = new ngControls(a, b);
  if ((e = ngVal(a[e], null))) {
    e.Owner = null;
    e.Visible && e.Update();
  }
  return e;
}
function ngw_DoResize(a) {
  if (this.Moveable || this.Sizeable)
    if (this.CheckBounds()) {
      this.SetBounds();
      this.Update();
    }
  return ng_Align(a);
}
function ngw_OnVisibleChanged(a) {
  if (a.Visible) {
    a.Centered && a.Center();
    a.SetFocus();
  }
  if (a.Modal) {
    a.Visible ? ngStartModalControl() : ngStopModalControl();
    var b = a.Elm();
    if (b)
      b.style.zIndex = a.Visible
        ? ngModalCnt * ngModalZIndexDelta + 1
        : Math.round((ngModalCnt + 0.5) * ngModalZIndexDelta);
  }
}
function ngw_Show() {
  this.SetVisible(true);
}
function ngw_Hide() {
  this.SetVisible(false);
}
function ngw_Close() {
  if (!(this.OnClose && !ngVal(this.OnClose(this), false))) {
    this.Hide();
    if (this.DisposeOnClose) {
      var a = this.Owner;
      this.Dispose();
      if (a && typeof a === "object")
        for (var b in a)
          if (a[b] == this) {
            delete a[b];
            break;
          }
    } else this.Release();
  }
}
function ngw_Restore() {
  if (this.StateBounds) {
    this.StateBounds = null;
    this.CheckBounds();
    this.SetBounds();
    this.ControlsPanel.SetVisible(true);
    this.Update();
  }
}
function ngw_Center() {
  var a = this.Elm();
  if (a) {
    var b = a.offsetParent;
    if (b && b == document.body) b = null;
    a = b ? ng_ClientWidth(b) : ng_WindowWidth();
    b = b ? ng_ClientHeight(b) : ng_WindowHeight();
    var d = this.Bounds;
    d.L = Math.round((a - d.W) / 2);
    d.T = Math.round((b - d.H) / 2);
    this.SetBounds();
  }
}
function ngw_CalcAutoSize() {
  if (ngVal(this.ControlsPanel, false)) {
    var a = this.ControlsPanel.ChildControls;
    if (typeof a !== "undefined") {
      this.ControlsPanel.SetScrollBars(ssNone);
      var b = this.Elm();
      if (b) {
        var d = b.offsetParent;
        if (d && d == document.body) d = null;
        var e = d ? ng_ClientWidth(d) : ng_WindowWidth();
        d = d ? ng_ClientHeight(d) : ng_WindowHeight();
        ng_SetClientWidth(b, e);
        ng_SetClientHeight(b, d);
        for (
          var f = (d = e = b = -1),
            g = 0,
            j = 0,
            k = 0,
            n = 0,
            o = 0,
            t = 0,
            q,
            u,
            x,
            w,
            y = 0;
          y < a.length;
          y++
        )
          if ((q = a[y]) && q.Visible)
            if ((u = q.Elm())) {
              ng_BeginMeasureElement(u);
              if (
                typeof q.Bounds.R === "undefined" ||
                typeof q.Bounds.L === "undefined"
              ) {
                x = ng_OuterWidth(u);
                if (x > g) g = x;
                if (typeof q.Bounds.L !== "undefined") {
                  if (q.Bounds.L + x > k) k = q.Bounds.L + x;
                  if (q.Bounds.L < b || b < 0) b = q.Bounds.L;
                } else {
                  if (q.Bounds.R + x > o) o = q.Bounds.R + x;
                  if (q.Bounds.R < d || d < 0) d = q.Bounds.R;
                }
              }
              if (
                typeof q.Bounds.B === "undefined" ||
                typeof q.Bounds.T === "undefined"
              ) {
                w = ng_OuterHeight(u);
                if (w > j) j = w;
                if (typeof q.Bounds.T !== "undefined") {
                  if (q.Bounds.T + w > n) n = q.Bounds.T + w;
                  if (q.Bounds.T < e || e < 0) e = q.Bounds.T;
                } else {
                  if (q.Bounds.B + w > t) t = q.Bounds.B + w;
                  if (q.Bounds.B < f || f < 0) f = q.Bounds.B;
                }
              }
              ng_EndMeasureElement(u);
            }
        x = g;
        w = j;
        if (b >= 0 && k - b > x) x = k - b;
        if (d >= 0 && o - d > x) x = o - d;
        if (e >= 0 && n - e > w) w = n - e;
        if (f >= 0 && t - f > w) w = t - f;
        if (b >= 0) x += b;
        else if (d >= 0) x += d;
        if (d >= 0) x += d;
        else if (b >= 0) x += b;
        if (e >= 0) w += e;
        else if (f >= 0) w += f;
        if (f >= 0) w += f;
        else if (e >= 0) w += e;
        if (x <= 0) x = undefined;
        if (w <= 0) w = undefined;
        a = this.SetClientRect({ W: x, H: w });
        this.SetBounds();
        a && this.Update();
      }
    }
  }
}
function ngw_Minimize() {
  if (this.IsMinimized() || this.IsMaximized()) this.Restore();
  if (!(this.OnMinimize && !ngVal(this.OnMinimize(this), false))) {
    this.ControlsPanel.SetVisible(false);
    if (typeof this.MinimizedBounds === "undefined") {
      var a = 0,
        b = this.CaptionImg.LeftImg;
      if (b) {
        dp = ngc_ImgProps(this.ID + "_IL", 0, this.Enabled, b);
        if (dp.H > a) a = dp.H;
      }
      if ((b = this.CaptionImg.RightImg)) {
        dp = ngc_ImgProps(this.ID + "_IR", 0, this.Enabled, b);
        if (dp.H > a) a = dp.H;
      }
      if ((b = this.CaptionImg.MiddleImg)) {
        dp = ngc_ImgProps(this.ID + "_IM", 0, this.Enabled, b);
        if (dp.H > a) a = dp.H;
      }
      this.StateBounds = ng_CopyVar(this.Bounds);
      this.StateBounds.H = a;
    } else {
      this.StateBounds = ng_CopyVar(this.MinimizedBounds);
      ng_MergeVar(this.StateBounds, this.Bounds);
    }
    this.SetBounds();
    this.Update();
  }
}
function ngw_Maximize() {
  if (this.IsMinimized() || this.IsMaximized()) this.Restore();
  if (!(this.OnMaximize && !ngVal(this.OnMaximize(this), false))) {
    this.StateBounds = { L: 0, T: 0, R: 0, B: 0 };
    this.SetBounds();
    this.ControlsPanel.SetVisible(true);
    this.Update();
  }
}
function ngw_IsMaximized() {
  return (
    this.StateBounds &&
    this.StateBounds.L == 0 &&
    this.StateBounds.T == 0 &&
    this.StateBounds.R == 0 &&
    this.StateBounds.B == 0
  );
}
function ngw_IsMinimized() {
  return this.ControlsPanel && !this.ControlsPanel.Visible;
}
function ngw_SetBounds(a) {
  if (this.StateBounds) (a = this.Elm()) && ng_SetBounds(a, this.StateBounds);
  else this.SetBoundsEx(a);
}
function ngw_CheckBounds() {
  var a = this.Elm();
  if (!a) return false;
  var b = a.offsetParent;
  if (b && b == document.body) b = null;
  a = b ? ng_ClientWidth(b) : ng_WindowWidth();
  b = b ? ng_ClientHeight(b) : ng_WindowHeight();
  var d = this.Bounds;
  if (this.ControlsPanel && !this.ControlsPanel.Visible && this.StateBounds)
    d = this.StateBounds;
  var e = ng_CopyVar(d);
  if (this.Sizeable) {
    if (d.W > a) d.W = a;
    if (d.H > b) d.H = b;
  }
  if (!this.IsMinimized()) {
    if (ngVal(d.W, 0) < this.MinWidth) d.W = this.MinWidth;
    if (ngVal(d.H, 0) < this.MinHeight) d.H = this.MinHeight;
  }
  if (!this.IsMaximized()) {
    if (this.MaxWidth > 0 && ngVal(d.W, 0) > this.MaxWidth) d.W = this.MaxWidth;
    if (this.MaxHeight > 0 && ngVal(d.H, 0) > this.MaxHeight)
      d.H = this.MaxHeight;
  }
  if (this.Moveable) {
    var f = d.T + d.H;
    if (d.L + d.W > a) d.L = a - d.W;
    if (f > b) d.T = b - d.H;
    if (d.L < 0) d.L = 0;
    if (d.T < 0) d.T = 0;
  }
  return e.L != d.L || e.T != d.T || e.W != d.W || e.H != d.H;
}
function ngw_DoPtrClick(a) {
  if (a.EventID === "window")
    if (this.OnClick) {
      a = this.PointerInfo.Event;
      a.win = this;
      this.OnClick(a);
    }
}
function ngw_DoPtrDblClick(a) {
  if (a.EventID === "window")
    if (this.OnDblClick) {
      a = this.PointerInfo.Event;
      a.win = this;
      this.OnDblClick(a);
    }
}
function ngw_IsDragEvent(a) {
  switch (a) {
    case "left":
    case "right":
    case "top":
    case "lefttop":
    case "righttop":
    case "bottom":
    case "leftbottom":
    case "rightbottom":
    case "window":
      return true;
  }
  return false;
}
function ngw_DoPtrStart(a) {
  if (ngw_IsDragEvent(a.EventID)) {
    this.MouseBounds = ng_CopyVar(
      this.StateBounds ? this.StateBounds : this.Bounds
    );
    var b = "",
      d = -1;
    switch (a.EventID) {
      case "window":
        d = 0;
        break;
      case "left":
        b = "w-resize";
        d = 1;
        break;
      case "right":
        b = "e-resize";
        d = 2;
        break;
      case "top":
        b = "n-resize";
        d = 4;
        break;
      case "lefttop":
        b = "nw-resize";
        d = 5;
        break;
      case "righttop":
        b = "ne-resize";
        d = 6;
        break;
      case "bottom":
        b = "s-resize";
        d = 8;
        break;
      case "leftbottom":
        b = "sw-resize";
        d = 9;
        break;
      case "rightbottom":
        b = "se-resize";
        d = 10;
        break;
    }
    this.MouseType = d;
    var e = document.getElementById(this.ID + "_M");
    if (e) {
      if (b != "") e.style.cursor = b;
      if (d > 0) {
        if ((d = this.Elm())) {
          d.style.overflow = "visible";
          d.style.overflowX = "visible";
          d.style.overflowY = "visible";
        }
        a.FrameHorzBorder =
          ng_GetCurrentStylePx(e, "border-left-width") +
          ng_GetCurrentStylePx(e, "border-right-width") +
          ng_GetCurrentStylePx(e, "margin-left") +
          ng_GetCurrentStylePx(e, "margin-right");
        a.FrameVertBorder =
          ng_GetCurrentStylePx(e, "border-top-width") +
          ng_GetCurrentStylePx(e, "border-bottom-width") +
          ng_GetCurrentStylePx(e, "margin-top") +
          ng_GetCurrentStylePx(e, "margin-bottom");
        b = d ? ng_ClientWidth(d) - a.FrameHorzBorder : 0;
        a = d ? ng_ClientHeight(d) - a.FrameVertBorder : 0;
        if (b < 0) b = 0;
        if (a < 0) a = 0;
        ng_setBounds(e, 0, 0, b, a);
        e.style.display = "block";
      }
    }
  } else this.MouseType = -1;
}
function ngw_DoPtrDrag(a) {
  if (this.MouseType < 0) return false;
  var b = this.Elm();
  if (!b) return false;
  var d = a.X - a.StartX,
    e = a.Y - a.StartY;
  if (this.MouseType == 0) {
    if ((d || e) && !this.IsMaximized()) {
      var f = { L: this.MouseBounds.L + d, T: this.MouseBounds.T + e };
      this.OnMouseMoving && this.OnMouseMoving(this, f);
      this.Bounds.L = f.L;
      this.Bounds.T = f.T;
      if (this.StateBounds) {
        this.StateBounds.L = this.Bounds.L;
        this.StateBounds.T = this.Bounds.T;
      }
      this.CheckBounds();
      this.SetBounds();
      a.WinMove = true;
    }
  } else {
    f = {
      L: 0,
      T: 0,
      W: ng_ClientWidth(b) - a.FrameHorzBorder,
      H: ng_ClientHeight(b) - a.FrameVertBorder
    };
    var g = b.offsetParent;
    if (g && g == document.body) g = null;
    var j = g ? ng_ClientWidth(g) : ng_WindowWidth();
    g = g ? ng_ClientHeight(g) : ng_WindowHeight();
    if (this.MouseType & 1) {
      if (this.Bounds.L + d < 0) d = -this.Bounds.L;
      f.L = d;
      f.W -= d;
    }
    if (this.MouseType & 2) {
      if (this.Bounds.L + this.Bounds.W + d > j)
        d = j - this.Bounds.L - this.Bounds.W;
      f.W += d;
    }
    if (this.MouseType & 4) {
      if (this.Bounds.T + e < 0) e = -this.Bounds.T;
      f.T = e;
      f.H -= e;
    }
    if (this.MouseType & 8) {
      if (this.Bounds.T + this.Bounds.H + e > g)
        e = g - this.Bounds.T - this.Bounds.H;
      f.H += e;
    }
    d = this.MinWidth - a.FrameHorzBorder;
    e = this.MinHeight - a.FrameVertBorder;
    if (d < 0) d = 1;
    if (e < 0) e = 1;
    if (f.W < d) {
      if (this.MouseType & 1) f.L += f.W - d;
      f.W = d;
    }
    if (f.H < e) {
      if (this.MouseType & 4) f.T += f.H - e;
      f.H = e;
    }
    d = this.MaxWidth ? this.MaxWidth - a.FrameHorzBorder : 0;
    e = this.MaxHeight ? this.MaxHeight - a.FrameVertBorder : 0;
    if (d < 0) d = 1;
    if (e < 0) e = 1;
    if (d && f.W > d) {
      if (this.MouseType & 1) f.L += f.W - d;
      f.W = d;
    }
    if (e && f.H > e) {
      if (this.MouseType & 4) f.T += f.H - e;
      f.H = e;
    }
    this.OnMouseSizing && this.OnMouseSizing(this, f);
    b.style.overflow = "visible";
    b.style.overflowX = "visible";
    b.style.overflowY = "visible";
    if ((a = document.getElementById(this.ID + "_M"))) {
      ng_setBounds(a, f.L, f.T, f.W, f.H);
      a.style.display = "block";
    }
  }
  return true;
}
function ngw_DoPtrEnd(a) {
  if (!(this.MouseType < 0)) {
    var b = this.Elm();
    if (b) {
      a = this.PointerInfo;
      if (!a) return;
      var d = a.X - a.StartX,
        e = a.Y - a.StartY;
      b.style.overflow = "visible";
      b.style.overflowX = "visible";
      b.style.overflowY = "visible";
      if (this.MouseType == 0) {
        if ((d || e) && !this.IsMaximized()) {
          d = { L: this.MouseBounds.L + d, T: this.MouseBounds.T + e };
          this.OnMouseMoving && this.OnMouseMoving(this, d);
          this.Bounds.L = d.L;
          this.Bounds.T = d.T;
          if (this.StateBounds) {
            this.StateBounds.L = this.Bounds.L;
            this.StateBounds.T = this.Bounds.T;
          }
          this.CheckBounds();
          this.SetBounds();
          a.WinMove = true;
        }
        a.WinMove && this.OnMouseMove && this.OnMouseMove(this);
      } else {
        if ((b = b.offsetParent) && b == document.body) b = null;
        a = b ? ng_ClientWidth(b) : ng_WindowWidth();
        var f = b ? ng_ClientHeight(b) : ng_WindowHeight();
        b = ng_CopyVar(this.Bounds);
        if (this.MouseType & 1) {
          if (b.L + d < 0) d = -b.L;
          b.L += d;
          b.W -= d;
        }
        if (this.MouseType & 2) {
          if (b.L + b.W + d > a) d = a - b.L - b.W;
          b.W += d;
        }
        if (this.MouseType & 4) {
          if (b.T + e < 0) e = -b.T;
          b.T += e;
          b.H -= e;
        }
        if (this.MouseType & 8) {
          if (b.T + b.H + e > f) e = f - b.T - b.H;
          b.H += e;
        }
        if (b.W < this.MinWidth) {
          if (this.MouseType & 1) b.L += b.W - this.MinWidth;
          b.W = this.MinWidth;
        }
        if (b.H < this.MinHeight) {
          if (this.MouseType & 4) b.T += b.H - this.MinHeight;
          b.H = this.MinHeight;
        }
        if (this.MaxWidth > 0 && b.W > this.MaxWidth) {
          if (this.MouseType & 1) b.L += b.W - this.MaxWidth;
          b.W = this.MaxWidth;
        }
        if (this.MaxHeight > 0 && b.H > this.MaxHeight) {
          if (this.MouseType & 4) b.T += b.H - this.MaxHeight;
          b.H = this.MaxHeight;
        }
        this.OnMouseSizing && this.OnMouseSizing(this, b);
        if ((d = document.getElementById(this.ID + "_M")))
          d.style.display = "none";
        this.Bounds = ng_CopyVar(b);
        this.CheckBounds();
        this.SetBounds();
        this.Update();
        this.OnMouseSize && this.OnMouseSize(this);
      }
    }
    this.MouseType = -1;
  }
}
function ngw_SetClientRect(a) {
  if (!ngVal(a, false)) return false;
  var b = { L: 0, T: 0, aL: 0, aT: 0, oT: 0, oL: 0, W: 0, H: 0 },
    d = {},
    e = false;
  if (typeof a.W !== "undefined") {
    d.Left =
      typeof this.Frame.Left === "undefined"
        ? b
        : ngc_ImgProps(this.ID + "_L", 0, this.Enabled, this.Frame.Left);
    d.Right =
      typeof this.Frame.Right === "undefined"
        ? b
        : ngc_ImgProps(this.ID + "_R", 0, this.Enabled, this.Frame.Right);
    var f = a.W + d.Left.W + d.Right.W;
    if (ngVal(this.Bounds.W, -1) != f) {
      e = true;
      this.Bounds.W = f;
      this.Bounds.R = undefined;
    }
  }
  if (typeof a.H !== "undefined") {
    d.Bottom =
      typeof this.Frame.Bottom === "undefined"
        ? b
        : ngc_ImgProps(this.ID + "_B", 0, this.Enabled, this.Frame.Bottom);
    b = d.Bottom.H;
    f = 0;
    if ((d = this.CaptionImg.LeftImg)) {
      d = ngc_ImgProps(this.ID + "_IL", 0, this.Enabled, d);
      if (d.H > f) f = d.H;
    }
    if ((d = this.CaptionImg.RightImg)) {
      d = ngc_ImgProps(this.ID + "_IR", 0, this.Enabled, d);
      if (d.H > f) f = d.H;
    }
    if ((d = this.CaptionImg.MiddleImg)) {
      d = ngc_ImgProps(this.ID + "_IM", 0, this.Enabled, d);
      if (d.H > f) f = d.H;
    }
    a = a.H + f + b;
    if (ngVal(this.Bounds.H, -1) != a) {
      e = true;
      this.Bounds.H = a;
      this.Bounds.B = undefined;
    }
  }
  e && this.CheckBounds();
  return e;
}
function ngw_GetClientRect() {
  var a, b;
  if (ngVal(this.ControlsPanel, false)) {
    var d = this.ControlsPanel.Elm();
    if (d) {
      a = ng_ClientWidth(d);
      b = ng_ClientHeight(d);
    }
  }
  return { W: a, H: b };
}
var ngw_inautosize = 0;
function ngw_Update() {
  if (this.AutoSize)
    if (ngw_inautosize < (ngIExplorer6 ? 2 : 1)) {
      ngw_inautosize++;
      try {
        this.CalcAutoSize();
      } finally {
        ngw_inautosize--;
      }
    }
}
function ngw_DoUpdate(a) {
  var b = document.getElementById(this.ID + "_F");
  if (!b) return true;
  var d = this.BaseClassName,
    e = new ngStringBuilder(),
    f = ng_ClientWidth(a),
    g = ng_ClientHeight(a),
    j,
    k = this.IsMaximized(),
    n = this.IsMinimized(),
    o = this.Moveable && !k,
    t = this.Sizeable && !k && !n;
  k = this.GetText();
  if (this.HTMLEncode) k = ng_htmlEncode(k);
  n = o ? "cursor: move;" : "";
  var q = "";
  if (this.OnClick || this.OnDblClick) {
    if (this.OnClick) q = "tap";
    if (this.OnDblClick) {
      if (q != "") q += " ";
      q += "doubletap";
    }
  }
  if (o) {
    if (q != "") q += " ";
    q += "drag";
  }
  q = q != "" ? ngc_PtrEventsHTML(this, "window", q) : "";
  var u = 0,
    x = 0,
    w = 0,
    y = 0,
    z = 0,
    B = 0,
    C = new ngStringBuilder(),
    A = this.CaptionImg.LeftImg;
  if (A) {
    j = ngc_ImgProps(this.ID + "_IL", 0, this.Enabled, A);
    ngc_Img(C, j, "position:absolute; left: 0px;" + n, q + ngVal(A.Attrs, ""));
    x = j.W;
    if (j.H > u) u = j.H;
  }
  if ((A = this.CaptionImg.RightImg)) {
    j = ngc_ImgProps(this.ID + "_IR", 0, this.Enabled, A);
    ngc_Img(
      C,
      j,
      "position:absolute; left: " + (f - j.W) + "px;" + n,
      q + ngVal(A.Attrs, "")
    );
    w = j.W;
    if (j.H > u) u = j.H;
  }
  if ((A = this.CaptionImg.MiddleImg)) {
    j = ngc_ImgProps(this.ID + "_IM", 0, this.Enabled, A);
    ngc_ImgSW(C, j, x, f - x - w, n, q + ngVal(A.Attrs, ""));
    if (j.H > u) u = j.H;
  }
  y = {};
  j = {};
  if (o && t) {
    j.Left = "cursor: w-resize;";
    y.Left = ngc_PtrEventsHTML(this, "left", "drag");
    j.Top = "cursor: n-resize;";
    y.Top = ngc_PtrEventsHTML(this, "top", "drag");
    j.LeftTop = "cursor: nw-resize;";
    y.LeftTop = ngc_PtrEventsHTML(this, "lefttop", "drag");
    j.RightTop = "cursor: ne-resize;";
    y.RightTop = ngc_PtrEventsHTML(this, "righttop", "drag");
    j.LeftBottom = "cursor: sw-resize;";
    y.LeftBottom = ngc_PtrEventsHTML(this, "leftbottom", "drag");
  }
  if (t) {
    j.Right = "cursor: e-resize;";
    y.Right = ngc_PtrEventsHTML(this, "right", "drag");
    j.Bottom = "cursor: s-resize;";
    y.Bottom = ngc_PtrEventsHTML(this, "bottom", "drag");
    j.RightBottom = "cursor: se-resize;";
    y.RightBottom = ngc_PtrEventsHTML(this, "rightbottom", "drag");
  }
  o = new ngStringBuilder();
  t = {};
  ngc_ImgBox(
    o,
    this.ID,
    "ngWindow",
    0,
    this.Enabled,
    0,
    0,
    f,
    g,
    false,
    this.Frame,
    j,
    y,
    undefined,
    t
  );
  y = t.Left.W;
  if (t.LeftTop.W > y) y = t.LeftTop.W;
  if (this.Buttons && this.Buttons.length > 0) {
    z = t.Right.W;
    if (t.RightTop.W > z) z = t.RightTop.W;
    for (w = 0; w < this.Buttons.length; w++) {
      g = this.Buttons[w];
      g.Enabled = this.Enabled;
      if (g.BaseClassName == "" || g.BaseClassName == g.CtrlType)
        g.BaseClassName = d + "Button";
      if (g.Visible) {
        g.ID == "" && g.Attach(this.ID + "_B" + (w + 1));
        j = ngb_SimpleRect(g);
        A = (u - j.H) / 2;
        x = ngVal(g.ButtonAlign, "");
        if (x == "left") {
          g.Bounds.L = y;
          y += j.W;
        } else {
          g.Bounds.L = f - z - B - j.W;
          B += j.W;
        }
        g.Bounds.T = A;
        g.Bounds.W = j.W;
        C.append(
          '<div id="' +
            g.ID +
            '" class="' +
            g.BaseClassName +
            '" style="position: absolute; z-index:1; left:' +
            g.Bounds.L +
            "px; top: " +
            g.Bounds.T +
            "px; width: " +
            j.W +
            "px; height: " +
            j.H +
            'px"></div>'
        );
      }
    }
  }
  if ((A = this.GetImg())) {
    j = ngc_ImgProps(this.ID + "_I", 0, this.Enabled, A);
    ngc_Img(
      C,
      j,
      "position:absolute; z-index: 1; left: " +
        y +
        "px;top:" +
        (u - j.H) / 2 +
        "px;" +
        n,
      q + ngVal(A.Attrs, "")
    );
    y += j.W;
  }
  if (k != "")
    C.append(
      '<div id="' +
        this.ID +
        '_C" class="' +
        d +
        (this.Enabled ? "Caption" : "CaptionDisabled") +
        '" style="position: absolute; overflow: hidden; text-overflow: ellipsis; left: ' +
        y +
        "px;top: 0px; width: " +
        (f - y - z - B) +
        "px;" +
        n +
        '" ' +
        q +
        ">" +
        k +
        "</div>"
    );
  e.append(
    '<div style="position:absolute;left:0px;top:0px;width:' +
      f +
      "px;height:" +
      u +
      'px; overflow: hidden;">'
  );
  e.append(C);
  e.append("</div>");
  e.append(o);
  this.ControlsPanel.Bounds.T = u;
  this.ControlsPanel.Bounds.L = t.Left.W;
  this.ControlsPanel.Bounds.R = t.Right.W;
  this.ControlsPanel.Bounds.B = t.Bottom.H;
  this.ControlsPanel.SetBounds();
  ng_SetInnerHTML(b, e.toString());
  a.style.overflow = "hidden";
  a.style.overflowX = "hidden";
  a.style.overflowY = "hidden";
  if (this.BackgroundColor == "")
    this.BackgroundColor = document.body.style.backgroundColor;
  a.style.backgroundColor = this.BackgroundColor;
  if (this.Buttons && this.Buttons.length > 0)
    for (w = 0; w < this.Buttons.length; w++) {
      g = this.Buttons[w];
      g.Parent = this;
      g.Update();
    }
  return true;
}
function ngw_KeyUp(a) {
  if (!a) a = window.event;
  var b = ngGetControlById(this.id, "ngWindow");
  if (b && b.Enabled)
    if (
      (a.keyCode == 13 || a.keyCode == 27) &&
      ngVal(b.IgnoreDefFormBtn, false)
    )
      b.IgnoreDefFormBtn = undefined;
    else {
      var d = false;
      switch (a.keyCode) {
        case 13:
          d = nge_DefFormButton2(b.ControlsPanel, 1);
          break;
        case 27:
          d = nge_DefFormButton2(b.ControlsPanel, 0);
          break;
      }
      if (d)
        if (a.stopPropagation) a.stopPropagation();
        else a.cancelBubble = true;
    }
}
function ngw_DoAttach(a, b) {
  if (a) {
    !ngAndroid &&
      a.getAttribute("tabindex") == null &&
      a.setAttribute("tabindex", 0);
    a.onkeyup = ngw_KeyUp;
  }
  b != this.ID && b != "" && ng_EndAutoResize(b);
  this.Moveable || this.Sizeable
    ? ng_StartAutoResize(a, "win")
    : ng_EndAutoResize(a, "win");
}
function ngw_DoRelease(a) {
  a.style.display = "none";
  (a = document.getElementById(this.ID + "_F")) && ng_SetInnerHTML(a, "");
}
function ngw_DoCreate(a, b, d) {
  var e = this.BaseClassName;
  if (
    (typeof a.W !== "undefined" ||
      typeof a.CW !== "undefined" ||
      (typeof a.L !== "undefined" && typeof a.R !== "undefined")) &&
    (typeof a.H !== "undefined" ||
      typeof a.CH !== "undefined" ||
      (typeof a.T !== "undefined" && typeof a.B !== "undefined")) &&
    a.Data &&
    typeof a.Data.AutoSize === "undefined"
  )
    this.AutoSize = false;
  if (typeof a.CW !== "undefined" || typeof a.CH !== "undefined")
    this.SetClientRect({ W: a.CW, H: a.CH }) && this.SetBounds();
  if (typeof a.Buttons === "object") {
    for (var f = {}, g, j = 0; j < a.Buttons.length; j++) {
      g = ng_CopyVar(a.Buttons[j]);
      f["B" + j] = g;
    }
    var k = ngCreateControls(f, undefined, null);
    if (typeof this.Buttons !== "object" || !this.Buttons) this.Buttons = [];
    for (j = 0; j < a.Buttons.length; j++)
      if ((g = k["B" + j])) {
        g.Owner = this;
        this.Buttons[this.Buttons.length] = g;
      }
    if (!this.Buttons.length) this.Buttons = null;
  }
  f = {};
  f.ControlsPanel =
    typeof a.ControlsPanel === "object" ? ng_CopyVar(a.ControlsPanel) : {};
  ng_MergeDef(f.ControlsPanel, {
    Type: "ngPanel",
    className: e + "ControlsPanel",
    id: this.ID + "_P",
    ScrollBars: ssAuto,
    L: 0,
    T: 0,
    R: 0,
    B: 0
  });
  f.ControlsPanel.Controls = a.Controls;
  f.ControlsPanel.ModifyControls = a.ModifyControls;
  k = ngCreateControls(f, undefined, this.ID);
  a.ParentReferences = ngVal(a.ParentReferences, false);
  if (!a.ParentReferences) {
    this.Controls = {};
    this.Controls.Owner = this;
    this.Controls.AddControls = function(n, o) {
      ngCreateControls(n, this, ngVal(o, f.ControlsPanel.id));
    };
    b = this.Controls;
  }
  this.ControlsPanel = k.ControlsPanel;
  this.ControlsPanel.Owner = this;
  delete k.ControlsPanel;
  ngCloneRefs(b, k);
  delete a.Controls;
  delete a.ModifyControls;
  if (typeof this.FormID === "undefined") this.FormID = this.ID;
  d.style.zIndex = Math.round((ngModalCnt + 0.5) * ngModalZIndexDelta);
  a = document.createElement("div");
  a.id = this.ID + "_F";
  a.style.position = "absolute";
  a.style.zIndex = "800";
  d.appendChild(a);
  a = document.createElement("div");
  a.id = this.ID + "_M";
  a.className = e + "Fence";
  a.style.display = "none";
  a.style.position = "absolute";
  a.style.zIndex = "801";
  a.style.fontSize = "0px";
  a.style.lineHeight = "0px";
  a.style.left = "0px";
  a.style.top = "0px";
  a.style.width = "0px";
  a.style.height = "0px";
  d.appendChild(a);
}
function ngw_OnDOMFocus(a) {
  var b = ngModalCnt * ngModalZIndexDelta;
  if (b) {
    if (!a) a = window.event;
    a = a.srcElement || a.target;
    if (!(!a || a == document || a == window || a.tagName == "BODY")) {
      for (var d = a, e, f = 0; d && d != window; ) {
        try {
          e = ng_GetCurrentStylePx(d, "z-index");
          if (e > f) f = e;
        } catch (g) {}
        d = d.parentNode;
      }
      if (b && f < b)
        try {
          a.blur();
        } catch (j) {}
    }
  }
}
var ngw_initialized = false;
function ngWindow(a) {
  ngControl(this, a, "ngWindow");
  this.DoCreate = ngw_DoCreate;
  this.OnVisibleChanged = ngw_OnVisibleChanged;
  this.DoResize = ngw_DoResize;
  this.DoAttach = ngw_DoAttach;
  this.DoRelease = ngw_DoRelease;
  this.DoUpdate = ngw_DoUpdate;
  this.DoPtrClick = ngw_DoPtrClick;
  this.DoPtrDblClick = ngw_DoPtrDblClick;
  this.DoPtrStart = ngw_DoPtrStart;
  this.DoPtrDrag = ngw_DoPtrDrag;
  this.DoPtrEnd = ngw_DoPtrEnd;
  this.AddEvent("Update", ngw_Update);
  this.SetBoundsEx = this.SetBounds;
  this.SetBounds = ngw_SetBounds;
  this.StateBounds = null;
  this.Text = "";
  this.HTMLEncode = false;
  this.BackgroundColor = "";
  this.Moveable = this.Sizeable = true;
  this.DisposeOnClose = this.Modal = false;
  this.AutoSize = true;
  this.Centered = false;
  this.MinWidth = 100;
  this.MinHeight = 50;
  this.MaxHeight = this.MaxWidth = 0;
  this.Img = this.Buttons = null;
  this.Frame = {};
  this.CaptionImg = {};
  this.Show = ngw_Show;
  this.Hide = ngw_Hide;
  this.Close = ngw_Close;
  this.Minimize = ngw_Minimize;
  this.Maximize = ngw_Maximize;
  this.Restore = ngw_Restore;
  this.Center = ngw_Center;
  this.CalcAutoSize = ngw_CalcAutoSize;
  this.GetClientRect = ngw_GetClientRect;
  this.SetClientRect = ngw_SetClientRect;
  this.IsMaximized = ngw_IsMaximized;
  this.IsMinimized = ngw_IsMinimized;
  this.SetText = ngc_SetText;
  this.GetText = ngc_GetText;
  this.GetImg = ngc_GetImg;
  this.CheckBounds = ngw_CheckBounds;
  this.MouseType = -1;
  this.OnMouseResize = this.OnMouseResizing = this.OnMouseMove = this.OnMouseMoving = this.OnClose = this.OnRestore = this.OnMaximize = this.OnMinimize = this.OnDblClick = this.OnClick = this.OnGetImg = this.OnGetText = null;
  if (!ngw_initialized) {
    if (window.addEventListener)
      window.addEventListener("focus", ngw_OnDOMFocus, true);
    else window.attachEvent && window.attachEvent("onfocus", ngw_OnDOMFocus);
    ngw_initialized = true;
  }
  ngControlCreated(this);
}
function ngCreateHint(a, b) {
  if (typeof a === "string") a = { Type: a };
  ng_MergeDef(a, { Data: { DiscardOnHide: true, IsPopup: true } });
  return ngCreateWindow(a, b);
}
function ngPopupHint(a, b, d, e, f) {
  (a = ngCreateHint(a, f)) && a.Popup(b, d, e);
  return a;
}
function ngPopupCtrlHint(a, b, d, e) {
  if (typeof b.HintTimeout !== "undefined") {
    if (typeof a === "string") a = { Type: a };
    ng_MergeDef(a, { Data: { AutoHideTimeout: b.HintTimeout } });
  }
  (a = ngCreateHint(a, e)) && a.PopupCtrl(b, d);
  return a;
}
function ngh_DoAttach() {
  var a = document.getElementById(this.ID + "_A");
  if (a) {
    var b = this.CtrlType;
    a.onmouseover = function(d) {
      ngc_Enter(d, this, b);
    };
    a.onmouseout = function(d) {
      ngc_Leave(d, this, b);
    };
  }
}
function ngh_BorderCollision(a, b, d, e, f) {
  var g = 0,
    j = a.MinX,
    k = a.MaxX,
    n = a.MinY,
    o = a.MaxY;
  if (j < b) {
    g += (b - j) * (o - n);
    j = b;
  }
  if (k >= e) {
    g += (k - e) * (o - n);
    k = e;
  }
  if (n < d) g += (d - n) * (k - j);
  if (o >= f) g += (o - f) * (k - j);
  if (a.AffectedArea < 0 || g > a.AffectedArea) a.AffectedArea = g;
  return g;
}
function ngh_BoundRectCollision(a, b, d, e, f) {
  var g = a.MinX,
    j = a.MaxX,
    k = a.MinY,
    n = a.MaxY;
  if (g < b) g = b;
  if (j < b) j = b;
  if (k < d) k = d;
  if (n < d) n = d;
  if (g > e) g = e;
  if (j > e) j = e;
  if (k > f) k = f;
  if (n > f) n = f;
  b = (j - g) * (n - k);
  if (a.AffectedArea < 0 || b > a.AffectedArea) a.AffectedArea = b;
  return b;
}
function ngh_FindAnchor(a, b, d, e, f, g, j) {
  if (typeof e === "undefined") e = this.PopupX;
  if (typeof f === "undefined") f = this.PopupY;
  if (typeof e === "undefined") e = ngVal(this.Bounds.L, 0);
  if (typeof f === "undefined") f = ngVal(this.Bounds.T, 0);
  var k,
    n,
    o,
    t = this.Elm();
  if (!t || typeof e === "undefined" || typeof f === "undefined")
    return { Anchor: "", AnchorObj: null, AffectedArea: -1 };
  if (typeof a === "undefined" || typeof b === "undefined") {
    ng_BeginMeasureElement(t);
    if (typeof a === "undefined") a = ng_OuterWidth(t);
    if (typeof b === "undefined") b = ng_OuterHeight(t);
    ng_EndMeasureElement(t);
  }
  if (typeof g === "undefined" || typeof j === "undefined") {
    if ((t = t.offsetParent) && t == document.body) t = null;
    if (t) {
      ng_BeginMeasureElement(t);
      if (typeof g === "undefined") g = ng_ClientWidth(t);
      if (typeof j === "undefined") j = ng_ClientHeight(t);
      ng_EndMeasureElement(t);
    } else {
      if (typeof g === "undefined") g = ng_WindowWidth();
      if (typeof j === "undefined") j = ng_WindowHeight();
    }
  }
  t = null;
  var q = "";
  if (typeof d !== "object" || !d)
    if (this.PreferredAnchors) {
      d = {};
      for (var u in this.PreferredAnchors)
        if (
          (k = this.Anchors[this.PreferredAnchors[u]]) &&
          typeof k === "object"
        )
          d[this.PreferredAnchors[u]] = k;
      for (u in this.Anchors)
        if (
          (k = this.Anchors[u]) &&
          typeof k === "object" &&
          typeof d[u] === "undefined"
        )
          d[u] = k;
    } else d = this.Anchors;
  var x = { L: 0, T: 0, aL: 0, aT: 0, oT: 0, oL: 0, W: 0, H: 0 },
    w,
    y = null,
    z = "",
    B = -1;
  if (typeof d === "object" && d)
    for (u in d) {
      t = d[u];
      q = u;
      if (!(!t || typeof t !== "object")) {
        w = {
          AffectedArea: -1,
          PopupX: e,
          PopupY: f,
          MinX: e,
          MinY: f,
          MaxX: e,
          MaxY: f,
          W: a,
          H: b,
          ParentW: g,
          ParentH: j,
          Anchor: u,
          AnchorObj: t
        };
        k = ngVal(t.Img, null)
          ? ngc_ImgDrawProps(
              this.ID + "_AI",
              "ngHint",
              this.ID,
              0,
              this.Enabled,
              t.Img
            )
          : x;
        n = e;
        o = f;
        if (typeof t.L !== "undefined") n -= t.L;
        if (typeof t.T !== "undefined") o -= t.T;
        if (typeof t.R !== "undefined") n -= a - k.W - t.R;
        if (typeof t.B !== "undefined") o -= b - k.H - t.B;
        if (typeof t.HX !== "undefined") n -= t.HX;
        if (typeof t.HY !== "undefined") o -= t.HY;
        if (n < w.MinX) w.MinX = n;
        if (n > w.MaxX) w.MaxX = n;
        if (o < w.MinY) w.MinY = o;
        if (o > w.MaxY) w.MaxY = o;
        if (n + a < w.MinX) w.MinX = n + a;
        if (n + a > w.MaxX) w.MaxX = n + a;
        if (o + b < w.MinY) w.MinY = o + b;
        if (o + b > w.MaxY) w.MaxY = o + b;
        if (typeof t.L !== "undefined") n += t.L;
        if (typeof t.T !== "undefined") o += t.T;
        if (typeof t.R !== "undefined") n += a - k.W - t.R;
        if (typeof t.B !== "undefined") o += b - k.H - t.B;
        if (n < w.MinX) w.MinX = n;
        if (n > w.MaxX) w.MaxX = n;
        if (o < w.MinY) w.MinY = o;
        if (o > w.MaxY) w.MaxY = o;
        n += k.W;
        o += k.H;
        if (n < w.MinX) w.MinX = n;
        if (n > w.MaxX) w.MaxX = n;
        if (o < w.MinY) w.MinY = o;
        if (o > w.MaxY) w.MaxY = o;
        this.OnCheckPlacement
          ? this.OnCheckPlacement(this, w)
          : this.BorderCollision(w, 0, 0, g, j);
        if (!ngVal(w.AffectedArea, -1)) {
          B = 0;
          break;
        }
        if (w.AffectedArea > 0 && (w.AffectedArea < B || B < 0)) {
          y = t;
          z = u;
          B = w.AffectedArea;
        }
      }
      t = null;
      q = "";
    }
  if (!t) {
    t = y;
    q = z;
  }
  return { Anchor: q, AnchorObj: t, AffectedArea: B };
}
function ngh_DoUpdate(a) {
  var b,
    d,
    e,
    f = null;
  e = "";
  if (typeof this.PopupX === "undefined") this.PopupX = ngVal(this.Bounds.L, 0);
  if (typeof this.PopupY === "undefined") this.PopupY = ngVal(this.Bounds.T, 0);
  delete this.PopupAnchor;
  ng_BeginMeasureElement(a);
  var g = ng_OuterWidth(a),
    j = ng_OuterHeight(a);
  ng_EndMeasureElement(a);
  if (this.Anchor == "auto") {
    e = this.FindAnchor(g, j);
    f = e.AnchorObj;
    e = e.Anchor;
  } else if (typeof this.Anchors === "object" && this.Anchors)
    if ((f = ngVal(this.Anchors[this.Anchor], null))) e = this.Anchor;
  if (typeof f !== "object" || !f)
    if (typeof this.Anchors === "object" && this.Anchors) {
      if (this.PreferredAnchors)
        for (b in this.PreferredAnchors)
          if (
            (d = this.Anchors[this.PreferredAnchors[b]]) &&
            typeof d === "object"
          ) {
            f = d;
            e = this.PreferredAnchors[b];
            break;
          }
      if (!f)
        for (b in this.Anchors) {
          f = this.Anchors[b];
          e = b;
          if (f && typeof f === "object") break;
        }
    }
  if ((b = document.getElementById(this.ID + "_A"))) {
    if (typeof f !== "object" || !f) {
      b.style.visibility = "hidden";
      b = this.PopupX;
      d = this.PopupY;
    } else {
      d = { L: 0, T: 0, aL: 0, aT: 0, oT: 0, oL: 0, W: 0, H: 0 };
      this.PopupAnchor = e;
      var k = new ngStringBuilder();
      e = ngVal(f.Img, null)
        ? ngc_ImgDrawProps(
            this.ID + "_AI",
            "ngHint",
            this.ID,
            0,
            this.Enabled,
            f.Img
          )
        : d;
      if (!e.W && !e.H) b.style.visibility = "hidden";
      else {
        ngc_Img(k, e, "position:absolute;", ngVal(f.Img.Attrs, ""));
        ng_SetClientWidth(b, e.W);
        ng_SetClientHeight(b, e.H);
        ng_SetInnerHTML(b, k.toString());
        b.style.visibility = "visible";
      }
      if (ngIExplorer) {
        if (typeof f.L !== "undefined") b.style.pixelLeft = f.L;
        if (typeof f.T !== "undefined") b.style.pixelTop = f.T;
        if (typeof f.R !== "undefined") b.style.pixelLeft = g - e.W - f.R;
        if (typeof f.B !== "undefined") b.style.pixelTop = j - e.H - f.B;
      } else {
        if (typeof f.L !== "undefined") {
          b.style.left = f.L + "px";
          b.style.right = "";
        }
        if (typeof f.T !== "undefined") {
          b.style.top = f.T + "px";
          b.style.bottom = "";
        }
        if (typeof f.R !== "undefined") {
          b.style.right = f.R + "px";
          b.style.left = "";
        }
        if (typeof f.B !== "undefined") {
          b.style.bottom = f.B + "px";
          b.style.top = "";
        }
      }
      b = this.PopupX;
      d = this.PopupY;
      if (typeof f.L !== "undefined") b -= f.L;
      if (typeof f.T !== "undefined") d -= f.T;
      if (typeof f.R !== "undefined") b -= g - e.W - f.R;
      if (typeof f.B !== "undefined") d -= j - e.H - f.B;
      if (typeof f.HX !== "undefined") b -= f.HX;
      if (typeof f.HY !== "undefined") d -= f.HY;
    }
    ng_setLeftTop(a, b, d);
    this.Bounds.L = b;
    this.Bounds.T = d;
  }
  f = document.getElementById(this.ID + "_F");
  if (!f) return true;
  b = new ngStringBuilder();
  g = ng_ClientWidth(a);
  j = ng_ClientHeight(a);
  e = {};
  ngc_ImgBox(
    b,
    this.ID,
    "ngHint",
    0,
    this.Enabled,
    0,
    0,
    g,
    j,
    false,
    this.Frame,
    "",
    "",
    undefined,
    e
  );
  if (this.ControlsInside) {
    this.ControlsPanel.Bounds.T = e.Top.H;
    this.ControlsPanel.Bounds.L = e.Left.W;
    this.ControlsPanel.Bounds.R = e.Right.W;
    this.ControlsPanel.Bounds.B = e.Bottom.H;
  } else {
    this.ControlsPanel.Bounds.T = 0;
    this.ControlsPanel.Bounds.L = 0;
    this.ControlsPanel.Bounds.R = 0;
    this.ControlsPanel.Bounds.B = 0;
  }
  this.ControlsPanel.SetBounds();
  ng_SetInnerHTML(f, b.toString());
  return true;
}
function ngh_SetClientRect(a) {
  if (!ngVal(a, false)) return false;
  var b = { L: 0, T: 0, aL: 0, aT: 0, oT: 0, oL: 0, W: 0, H: 0 },
    d = {},
    e = false;
  if (typeof a.W !== "undefined") {
    d.Left =
      !this.ControlsInside || typeof this.Frame.Left === "undefined"
        ? b
        : ngc_ImgDrawProps(
            this.ID + "_L",
            "ngHint",
            this.ID,
            0,
            this.Enabled,
            this.Frame.Left
          );
    d.Right =
      !this.ControlsInside || typeof this.Frame.Right === "undefined"
        ? b
        : ngc_ImgDrawProps(
            this.ID + "_R",
            "ngHint",
            this.ID,
            0,
            this.Enabled,
            this.Frame.Right
          );
    var f = a.W + d.Left.W + d.Right.W;
    if (ngVal(this.Bounds.W, -1) != f) {
      e = true;
      this.Bounds.W = f;
      this.Bounds.R = undefined;
    }
    if (this.Bounds.W < this.MinWidth) {
      e = true;
      this.Bounds.W = this.MinWidth;
    }
    if (this.MaxWidth > 0 && this.Bounds.W > this.MaxWidth) {
      e = true;
      this.Bounds.W = this.MaxWidth;
    }
  }
  if (typeof a.H !== "undefined") {
    d.Top =
      !this.ControlsInside || typeof this.Frame.Top === "undefined"
        ? b
        : ngc_ImgDrawProps(
            this.ID + "_B",
            "ngHint",
            this.ID,
            0,
            this.Enabled,
            this.Frame.Top
          );
    d.Bottom =
      !this.ControlsInside || typeof this.Frame.Bottom === "undefined"
        ? b
        : ngc_ImgDrawProps(
            this.ID + "_B",
            "ngHint",
            this.ID,
            0,
            this.Enabled,
            this.Frame.Bottom
          );
    a = a.H + d.Top.H + d.Bottom.H;
    if (ngVal(this.Bounds.H, -1) != a) {
      e = true;
      this.Bounds.H = a;
      this.Bounds.B = undefined;
      if (this.Bounds.H < this.MinHeight) {
        e = true;
        this.Bounds.H = this.MinHeight;
      }
      if (this.MaxHeight > 0 && this.Bounds.H > this.MaxHeight) {
        e = true;
        this.Bounds.H = this.MaxHeight;
      }
    }
  }
  return e;
}
function ngh_GetClientRect() {
  var a, b;
  if (ngVal(this.ControlsPanel, false)) {
    var d = this.ControlsPanel.Elm();
    if (d) {
      a = ng_ClientWidth(d);
      b = ng_ClientHeight(d);
    }
  }
  return { W: a, H: b };
}
function ngh_DoRelease(a) {
  a.style.display = "none";
  (a = document.getElementById(this.ID + "_F")) && ng_SetInnerHTML(a, "");
}
function ngh_DoCreate(a, b, d) {
  var e = this.BaseClassName;
  if (
    (typeof a.W !== "undefined" ||
      typeof a.CW !== "undefined" ||
      (typeof a.L !== "undefined" && typeof a.R !== "undefined")) &&
    (typeof a.H !== "undefined" ||
      typeof a.CH !== "undefined" ||
      (typeof a.T !== "undefined" && typeof a.B !== "undefined")) &&
    a.Data &&
    typeof a.Data.AutoSize === "undefined"
  )
    this.AutoSize = false;
  if (typeof a.CW !== "undefined" || typeof a.CH !== "undefined")
    this.SetClientRect({ W: a.CW, H: a.CH }) && this.SetBounds();
  var f = {};
  f.ControlsPanel =
    typeof a.ControlsPanel === "object" ? ng_CopyVar(a.ControlsPanel) : {};
  ng_MergeDef(f.ControlsPanel, {
    Type: "ngPanel",
    id: this.ID + "_P",
    className: e + "ControlsPanel",
    ScrollBars: ssAuto,
    L: 0,
    T: 0,
    R: 0,
    B: 0
  });
  f.ControlsPanel.Controls = a.Controls;
  f.ControlsPanel.ModifyControls = a.ModifyControls;
  e = ngCreateControls(f, undefined, this.ID);
  if (!ngVal(a.ParentReferences, true)) {
    this.Controls = {};
    this.Controls.Owner = this;
    this.Controls.AddControls = function(g, j) {
      ngCreateControls(g, this, ngVal(j, f.ControlsPanel.id));
    };
    b = this.Controls;
  }
  this.ControlsPanel = e.ControlsPanel;
  this.ControlsPanel.Owner = this;
  delete e.ControlsPanel;
  ngCloneRefs(b, e);
  delete a.Controls;
  delete a.ModifyControls;
  d.style.zIndex = Math.round((ngModalCnt + 0.6) * ngModalZIndexDelta);
  this.SetScrollBars(ssDefault);
  a = document.createElement("div");
  a.id = this.ID + "_F";
  a.style.position = "absolute";
  a.style.zIndex = "800";
  d.appendChild(a);
  a = document.createElement("div");
  a.id = this.ID + "_A";
  a.style.position = "absolute";
  a.style.zIndex = "801";
  d.appendChild(a);
}
function ngh_DoPopup(a, b, d) {
  this.SetVisible(false);
  this.PopupX = a;
  this.PopupY = b;
  delete this.PopupElm;
  if (typeof d !== "undefined") this.Anchor = d;
  this.SetVisible(true);
}
function ngh_Popup(a, b, d) {
  a = { PopupX: a, PopupY: b, Anchor: d };
  (this.OnPopup && !ngVal(this.OnPopup(this, a), false)) ||
    this.DoPopup(a.PopupX, a.PopupY, a.Anchor);
}
function ngh_PopupCtrl(a, b) {
  var d = null;
  if (typeof a === "string")
    a = (d = ngGetControlById(a)) ? d : document.getElementById(a);
  if (typeof a.Elm === "function") d = a.Elm();
  else {
    d = a;
    a = null;
  }
  if (d) {
    var e = this.Elm();
    e = e ? e.parentNode : ngApp.Elm();
    e = ng_ParentPosition(d, e);
    var f = a ? a.HintX : undefined;
    if (typeof f === "undefined") f = Math.floor(ng_OuterWidth(d) / 3);
    a = a ? a.HintY : undefined;
    if (typeof a === "undefined") a = Math.floor(ng_OuterHeight(d) / 2);
    b = { PopupX: e.x + f, PopupY: e.y + a, PopupElm: d, Anchor: b };
    if (!(this.OnPopup && !ngVal(this.OnPopup(this, b), false))) {
      this.DoPopup(b.PopupX, b.PopupY, b.Anchor);
      this.PopupElm = b.PopupElm;
    }
  }
}
function ngh_SetVisible(a) {
  a = ngVal(a, true);
  if (this.Visible != a) {
    this.HintAutoHideTimer && clearTimeout(this.HintAutoHideTimer);
    this.HintAutoHideTimer = null;
    if (a) {
      a = ngVal(this.AutoHideTimeout, 0);
      if (a > 0)
        this.HintAutoHideTimer = setTimeout(
          "ngh_HintAutoHideTimer('" + this.ID + "')",
          a
        );
    } else {
      delete this.PopupX;
      delete this.PopupY;
      delete this.PopupElm;
      delete this.PopupAnchor;
      if (this.DisposeOnHide)
        var b = this,
          d = setTimeout(function() {
            clearTimeout(d);
            var e = b.Owner;
            b.Dispose();
            if (e && typeof e === "object")
              for (var f in e)
                if (e[f] == b) {
                  delete e[f];
                  break;
                }
          }, 1);
    }
  }
}
function ngh_HintAutoHideTimer(a) {
  (a = ngGetControlById(a, "ngHint")) && a.SetVisible(false);
}
function ngHint(a) {
  ngControl(this, a, "ngHint");
  this.AutoSize = true;
  this.MaxHeight = this.MaxWidth = this.MinHeight = this.MinWidth = 0;
  this.Anchor = "auto";
  this.Anchors = this.Anchors = null;
  this.Frame = {};
  this.ControlsInside = true;
  this.DisposeOnHide = false;
  this.DoCreate = ngh_DoCreate;
  this.DoRelease = ngh_DoRelease;
  this.DoUpdate = ngh_DoUpdate;
  this.FindAnchor = ngh_FindAnchor;
  this.AddEvent("Update", ngw_Update);
  this.Popup = ngh_Popup;
  this.PopupCtrl = ngh_PopupCtrl;
  this.GetClientRect = ngh_GetClientRect;
  this.SetClientRect = ngh_SetClientRect;
  this.CalcAutoSize = ngw_CalcAutoSize;
  this.BorderCollision = ngh_BorderCollision;
  this.BoundRectCollision = ngh_BoundRectCollision;
  this.OnPopup = this.OnCheckPlacement = null;
  this.AddEvent(ngh_SetVisible, "SetVisible");
  this.DoPopup = ngh_DoPopup;
  this.AddEvent("DoAttach", ngh_DoAttach);
  this.Visible = false;
  ngControlCreated(this);
}
function ngCreateTextHint(a, b, d) {
  if (typeof a === "string") a = { Type: a };
  ng_MergeDef(a, { Data: { Text: b } });
  return ngCreateHint(a, d);
}
function ngPopupTextHint(a, b, d, e, f, g) {
  (a = ngCreateTextHint(a, e, g)) && a.Popup(b, d, f);
  return a;
}
function ngPopupCtrlTextHint(a, b, d, e, f) {
  if (typeof d === "undefined")
    d = typeof b.GetHint === "function" ? b.GetHint() : ngVal(b.Hint, "");
  if (typeof b.HintTimeout !== "undefined") {
    if (typeof a === "string") a = { Type: a };
    ng_MergeDef(a, { Data: { AutoHideTimeout: b.HintTimeout } });
  }
  (a = ngCreateTextHint(a, d, f)) && a.PopupCtrl(b, e);
  return a;
}
function nghtxt_SetText(a) {
  if (this.OnSetText) a = this.OnSetText(a, this);
  if (this.Controls && this.Controls.Hint)
    if (a != this.Text) {
      this.Text = a;
      this.Controls.Hint.SetText(a);
      this.AutoSize && this.Update();
    }
}
function nghtxt_OnGetText() {
  var a = this.Owner.Owner;
  return a ? a.GetText() : "";
}
function nghtxt_DoPtrClick(a) {
  if (a.EventID === "control")
    if (this.OnClick) {
      var b = a.Event;
      b.Owner = this;
      this.OnClick(b);
      a.PreventDefault = true;
    }
}
function nghtxt_HintDoPtrClick(a) {
  if (a.EventID === "control")
    for (var b = this.ParentControl; b; ) {
      if (b.CtrlType === "ngHint") {
        b.DoPtrClick(a);
        break;
      }
      b = b.ParentControl;
    }
}
function nghtxt_DoMeasureText(a, b) {
  var d, e;
  b = null;
  a || (a = this.Elm());
  if (!b) {
    var f = this.Controls.Hint;
    if (f) b = f.Elm();
  }
  if (this.AutoSize) {
    var g = { L: 0, T: 0, aL: 0, aT: 0, oT: 0, oL: 0, W: 0, H: 0 },
      j = {};
    j.Left =
      !this.ControlsInside || typeof this.Frame.Left === "undefined"
        ? g
        : ngc_ImgDrawProps(
            this.ID + "_L",
            "ngHint",
            this.ID,
            0,
            this.Enabled,
            this.Frame.Left
          );
    j.Right =
      !this.ControlsInside || typeof this.Frame.Right === "undefined"
        ? g
        : ngc_ImgDrawProps(
            this.ID + "_R",
            "ngHint",
            this.ID,
            0,
            this.Enabled,
            this.Frame.Right
          );
    j.Top =
      !this.ControlsInside || typeof this.Frame.Top === "undefined"
        ? g
        : ngc_ImgDrawProps(
            this.ID + "_B",
            "ngHint",
            this.ID,
            0,
            this.Enabled,
            this.Frame.Top
          );
    j.Bottom =
      !this.ControlsInside || typeof this.Frame.Bottom === "undefined"
        ? g
        : ngc_ImgDrawProps(
            this.ID + "_B",
            "ngHint",
            this.ID,
            0,
            this.Enabled,
            this.Frame.Bottom
          );
    if (
      b &&
      (typeof f.Bounds.R === "undefined" || typeof f.Bounds.L === "undefined")
    ) {
      d = ng_OuterWidth(b) + j.Left.W + j.Right.W;
      d += typeof f.Bounds.R === "undefined" ? 2 * f.Bounds.L : 2 * f.Bounds.R;
    }
    if (
      b &&
      (typeof f.Bounds.T === "undefined" || typeof f.Bounds.B === "undefined")
    ) {
      e = ng_OuterHeight(b) + j.Top.H + j.Bottom.H;
      e += typeof f.Bounds.B === "undefined" ? 2 * f.Bounds.T : 2 * f.Bounds.B;
    }
  }
  if (typeof d === "undefined") d = ng_OuterWidth(a);
  if (typeof e === "undefined") e = ng_OuterHeight(a);
  return { W: d, H: e };
}
function nghtxt_DoHintUpdate(a) {
  var b = this.Anchor,
    d;
  try {
    var e = this.Controls.Hint;
    if (e && this.AutoSize && e.AutoSize)
      if (ngw_inautosize > 0) this.Anchor = ngVal(this.PopupAnchor, b);
      else {
        var f = "",
          g = a.offsetParent;
        if (g && g == document.body) g = null;
        var j = g ? ng_ClientWidth(g) : ng_WindowWidth();
        g ? ng_ClientHeight(g) : ng_WindowHeight();
        var k = e.Elm();
        ng_setLeftTop(a, -10000, -10000);
        ng_BeginMeasureElement(k);
        try {
          var n, o;
          if (b !== "auto") {
            o = {};
            n = {};
            if (typeof this.Anchors === "object" && this.Anchors)
              o[this.Anchor] = this.Anchors[this.Anchor];
          } else if (this.PreferredAnchors) {
            var t;
            n = {};
            o = {};
            for (var q in this.PreferredAnchors)
              if (
                (t = this.Anchors[this.PreferredAnchors[q]]) &&
                typeof t === "object"
              )
                o[this.PreferredAnchors[q]] = t;
            for (q in this.Anchors)
              if (
                (t = this.Anchors[q]) &&
                typeof t === "object" &&
                typeof o[q] === "undefined"
              )
                n[q] = t;
          } else n = this.Anchors;
          e.AutoSizeMode = "auto";
          e.Update();
          var u = this.DoMeasureText(a, k);
          if (u.W < this.MinWidth) u.W = this.MinWidth;
          if (this.MaxWidth <= 0 || u.W < this.MaxWidth) {
            var x =
              typeof o !== "undefined"
                ? this.FindAnchor(u.W, u.H, o)
                : this.FindAnchor(u.W, u.H, n);
            if (!x.AffectedArea && x.AnchorObj) f = x.Anchor;
          }
          if (f === "") {
            var w = -1,
              y,
              z = "",
              B = this.PopupX;
            if (typeof B === "undefined") B = ngVal(this.Bounds.L, 0);
            var C =
              !this.ControlsInside || typeof this.Frame.Left === "undefined"
                ? 0
                : this.Frame.Left.W;
            C +=
              !this.ControlsInside || typeof this.Frame.Right === "undefined"
                ? 0
                : this.Frame.Right.W;
            if (
              k &&
              (typeof e.Bounds.R === "undefined" ||
                typeof e.Bounds.L === "undefined")
            )
              C +=
                typeof e.Bounds.R === "undefined"
                  ? 2 * e.Bounds.L
                  : 2 * e.Bounds.R;
            var A = this;
            g = function(J) {
              var F, E, G, D;
              for (var H in J) {
                E = J[H];
                if (!(!E || typeof E !== "object")) {
                  F = B;
                  G = 0;
                  if (typeof E.L !== "undefined") {
                    F -= E.L;
                    if (typeof E.HX !== "undefined") F -= E.HX;
                    G = j - F;
                  } else if (typeof E.R !== "undefined") {
                    G = F + E.R;
                    if (E.Img) G += E.Img.W;
                    if (typeof E.HX !== "undefined") G -= E.HX;
                  }
                  if (G < A.MinWidth) G = A.MinWidth;
                  if (A.MaxWidth > 0 && G > A.MaxWidth) G = A.MaxWidth;
                  G -= C;
                  if (typeof e.MinWidth !== "undefined" && G < e.MinWidth)
                    G = e.MinWidth;
                  if (!(G <= 0)) {
                    e.AutoSizeMode = "vertical";
                    ng_SetClientWidth(k, G);
                    e.Update();
                    F = A.DoMeasureText(a, k);
                    D = {};
                    D[H] = E;
                    E = A.FindAnchor(F.W, F.H, D);
                    if (!E.AffectedArea && E.AnchorObj) {
                      f = E.Anchor;
                      w = 0;
                      y = G;
                      break;
                    } else if (
                      E.AffectedArea > 0 &&
                      (E.AffectedArea < w || w < 0)
                    ) {
                      z = E.Anchor;
                      w = E.AffectedArea;
                      y = G;
                    }
                  }
                }
              }
            };
            typeof o !== "undefined" && g(o);
            if (f === "") {
              g(n);
              if (typeof o !== "undefined") {
                x = this.FindAnchor(u.W, u.H, n);
                if (!x.AffectedArea && x.AnchorObj) {
                  e.AutoSizeMode = "auto";
                  e.Update();
                  f = x.Anchor;
                  w = 0;
                } else if (
                  x.AffectedArea > 0 &&
                  (x.AffectedArea < w || w < 0)
                ) {
                  e.AutoSizeMode = "auto";
                  e.Update();
                  f = x.Anchor;
                  w = x.AffectedArea;
                }
              }
            }
            if (f === "" && z != "") {
              ng_SetClientWidth(k, y);
              e.Update();
              f = z;
            }
          }
          if (f !== "") this.Anchor = f;
          else if (e.AutoSizeMode !== "auto") {
            e.AutoSizeMode = "auto";
            e.Update();
          }
        } finally {
          ng_EndMeasureElement(k);
        }
      }
    d = this.__DefaultDoUpdate(a);
  } finally {
    if (typeof b !== "undefined") this.Anchor = b;
    else delete this.Anchor;
  }
  return d;
}
function Create_ngTextHint(a, b, d) {
  function e(f) {
    if (f) {
      if (typeof f.Data === "undefined") f.Data = {};
      if (typeof f.Data.Gestures === "undefined") f.Data.Gestures = {};
      f.Data.Gestures.tap = true;
      if (typeof f.Controls !== "undefined")
        for (var g in f.Controls) e(f.Controls[g]);
    }
  }
  ng_MergeDef(a, {
    ParentReferences: false,
    Data: {
      SetText: nghtxt_SetText,
      GetText: ngc_GetText,
      OnClick: null,
      OnSetText: null,
      OnGetText: null
    },
    ControlsPanel: { Data: { Gestures: { tap: true } } },
    Controls: {
      Hint: { Type: "ngText", Events: { OnGetText: nghtxt_OnGetText } }
    }
  });
  e(a);
  a.OnCreated = ngAddEvent(a.OnCreated, function(f) {
    function g(j) {
      j = j.ChildControls;
      if (typeof j !== "undefined")
        for (var k = j.length - 1; k >= 0; k--) {
          j[k].AddEvent("DoPtrClick", nghtxt_HintDoPtrClick);
          g(j[k]);
        }
    }
    g(f);
  });
  if ((a = ngCreateControlAsType(a, "ngHint", b, d))) {
    a.__DefaultDoUpdate = a.DoUpdate;
    a.DoUpdate = nghtxt_DoHintUpdate;
    a.DoPtrClick = nghtxt_DoPtrClick;
    a.DoMeasureText = nghtxt_DoMeasureText;
  }
  return a;
}
if (typeof ngUserControls === "undefined") ngUserControls = [];
ngUserControls.window = {
  OnInit: function() {
    ngRegisterControlType("ngWindow", function() {
      return new ngWindow();
    });
    ngRegisterControlType("ngHint", function() {
      return new ngHint();
    });
    ngRegisterControlType("ngTextHint", Create_ngTextHint);
  }
};
var JSON;
JSON || (JSON = {});
(function() {
  function a(o) {
    return o < 10 ? "0" + o : o;
  }
  function b(o) {
    f.lastIndex = 0;
    return f.test(o)
      ? '"' +
          o.replace(f, function(t) {
            var q = k[t];
            return typeof q === "string"
              ? q
              : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4);
          }) +
          '"'
      : '"' + o + '"';
  }
  function d(o, t) {
    var q,
      u,
      x = g,
      w,
      y = t[o];
    if (y && typeof y === "object" && typeof y.toJSON === "function")
      y = y.toJSON(o);
    if (typeof n === "function") y = n.call(t, o, y);
    switch (typeof y) {
      case "string":
        return b(y);
      case "number":
        return isFinite(y) ? String(y) : "null";
      case "boolean":
      case "null":
        return String(y);
      case "object":
        if (!y) return "null";
        g += j;
        w = [];
        if (Object.prototype.toString.apply(y) === "[object Array]") {
          u = y.length;
          for (o = 0; o < u; o += 1) w[o] = d(o, y) || "null";
          t =
            w.length === 0
              ? "[]"
              : g
                ? "[\n" + g + w.join(",\n" + g) + "\n" + x + "]"
                : "[" + w.join(",") + "]";
          g = x;
          return t;
        }
        if (n && typeof n === "object") {
          u = n.length;
          for (o = 0; o < u; o += 1)
            if (typeof n[o] === "string") {
              q = n[o];
              if ((t = d(q, y))) w.push(b(q) + (g ? ": " : ":") + t);
            }
        } else
          for (q in y)
            if (Object.prototype.hasOwnProperty.call(y, q))
              if ((t = d(q, y))) w.push(b(q) + (g ? ": " : ":") + t);
        t =
          w.length === 0
            ? "{}"
            : g
              ? "{\n" + g + w.join(",\n" + g) + "\n" + x + "}"
              : "{" + w.join(",") + "}";
        g = x;
        return t;
    }
  }
  if (typeof Date.prototype.toJSON !== "function") {
    Date.prototype.toJSON = function() {
      return isFinite(this.valueOf())
        ? this.getUTCFullYear() +
            "-" +
            a(this.getUTCMonth() + 1) +
            "-" +
            a(this.getUTCDate()) +
            "T" +
            a(this.getUTCHours()) +
            ":" +
            a(this.getUTCMinutes()) +
            ":" +
            a(this.getUTCSeconds()) +
            "Z"
        : null;
    };
    String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
      return this.valueOf();
    };
  }
  var e = new RegExp(
      "[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]",
      "g"
    ),
    f = new RegExp(
      '[\\"\u0000-\u001f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]',
      "g"
    ),
    g,
    j,
    k = {
      "\u0008": "\\b",
      "\t": "\\t",
      "\n": "\\n",
      "\u000c": "\\f",
      "\r": "\\r",
      '"': '\\"',
      "\\": "\\\\"
    },
    n;
  if (typeof JSON.stringify !== "function")
    JSON.stringify = function(o, t, q) {
      var u;
      j = g = "";
      if (typeof q === "number") for (u = 0; u < q; u += 1) j += " ";
      else if (typeof q === "string") j = q;
      if (
        (n = t) &&
        typeof t !== "function" &&
        (typeof t !== "object" || typeof t.length !== "number")
      )
        throw new Error("JSON.stringify");
      return d("", { "": o });
    };
  if (typeof JSON.parse !== "function")
    JSON.parse = function(o, t) {
      function q(u, x) {
        var w,
          y,
          z = u[x];
        if (z && typeof z === "object")
          for (w in z)
            if (Object.prototype.hasOwnProperty.call(z, w)) {
              y = q(z, w);
              if (y !== undefined) z[w] = y;
              else delete z[w];
            }
        return t.call(u, x, z);
      }
      o = String(o);
      e.lastIndex = 0;
      if (e.test(o))
        o = o.replace(e, function(u) {
          return "\\u" + ("0000" + u.charCodeAt(0).toString(16)).slice(-4);
        });
      if (
        /^[\],:{}\s]*$/.test(
          o
            .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
            .replace(
              /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
              "]"
            )
            .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
        )
      ) {
        o = eval("(" + o + ")");
        return typeof t === "function" ? q({ "": o }, "") : o;
      }
      throw new SyntaxError("JSON.parse");
    };
})();

(function(q, z) {
  function G() {
    if (!e.READY) {
      u.determineEventTypes();
      f.each(e.gestures, function(a) {
        k.register(a);
      });
      u.onTouch(e.DOCUMENT, r, k.detect);
      u.onTouch(e.DOCUMENT, j, k.detect);
      e.READY = true;
    }
  }
  var e = function(a, b) {
    return new e.Instance(a, b || {});
  };
  e.VERSION = "1.0.10";
  e.defaults = {
    stop_browser_behavior: {
      userSelect: "none",
      touchAction: "none",
      touchCallout: "none",
      contentZooming: "none",
      userDrag: "none",
      tapHighlightColor: "rgba(0,0,0,0)"
    }
  };
  e.HAS_POINTEREVENTS =
    q.navigator.pointerEnabled || q.navigator.msPointerEnabled;
  e.HAS_TOUCHEVENTS = "ontouchstart" in q;
  e.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android|silk/i;
  e.NO_MOUSEEVENTS =
    e.HAS_TOUCHEVENTS && q.navigator.userAgent.match(e.MOBILE_REGEX);
  e.EVENT_TYPES = {};
  e.UPDATE_VELOCITY_INTERVAL = 16;
  e.DOCUMENT = q.document;
  var A = (e.DIRECTION_DOWN = "down"),
    D = (e.DIRECTION_LEFT = "left"),
    B = (e.DIRECTION_UP = "up"),
    E = (e.DIRECTION_RIGHT = "right"),
    t = (e.POINTER_MOUSE = "mouse"),
    C = (e.POINTER_TOUCH = "touch"),
    F = (e.POINTER_PEN = "pen"),
    p = (e.EVENT_START = "start"),
    r = (e.EVENT_MOVE = "move"),
    j = (e.EVENT_END = "end");
  e.plugins = e.plugins || {};
  e.gestures = e.gestures || {};
  e.READY = false;
  var f = (e.utils = {
    extend: function(a, b, c) {
      for (var d in b) (a[d] !== z && c) || (a[d] = b[d]);
      return a;
    },
    each: function(a, b, c) {
      var d, g;
      if ("forEach" in a) a.forEach(b, c);
      else if (a.length !== z)
        for (d = -1; (g = a[++d]); ) {
          if (b.call(c, g, d, a) === false) return;
        }
      else
        for (d in a)
          if (a.hasOwnProperty(d) && b.call(c, a[d], d, a) === false) return;
    },
    inStr: function(a, b) {
      return a.indexOf(b) > -1;
    },
    hasParent: function(a, b) {
      for (; a; ) {
        if (a == b) return true;
        a = a.parentNode;
      }
      return false;
    },
    getCenter: function(a) {
      var b = [],
        c = [],
        d = [],
        g = [],
        i = Math.min,
        h = Math.max;
      if (a.length === 1)
        return {
          pageX: a[0].pageX,
          pageY: a[0].pageY,
          clientX: a[0].clientX,
          clientY: a[0].clientY
        };
      f.each(a, function(m) {
        b.push(m.pageX);
        c.push(m.pageY);
        d.push(m.clientX);
        g.push(m.clientY);
      });
      return {
        pageX: (i.apply(Math, b) + h.apply(Math, b)) / 2,
        pageY: (i.apply(Math, c) + h.apply(Math, c)) / 2,
        clientX: (i.apply(Math, d) + h.apply(Math, d)) / 2,
        clientY: (i.apply(Math, g) + h.apply(Math, g)) / 2
      };
    },
    getVelocity: function(a, b, c) {
      return { x: Math.abs(b / a) || 0, y: Math.abs(c / a) || 0 };
    },
    getAngle: function(a, b) {
      return (
        Math.atan2(b.clientY - a.clientY, b.clientX - a.clientX) * 180 / Math.PI
      );
    },
    getDirection: function(a, b) {
      var c = Math.abs(a.clientX - b.clientX),
        d = Math.abs(a.clientY - b.clientY);
      if (c >= d) return a.clientX - b.clientX > 0 ? D : E;
      return a.clientY - b.clientY > 0 ? B : A;
    },
    getDistance: function(a, b) {
      var c = b.clientX - a.clientX;
      a = b.clientY - a.clientY;
      return Math.sqrt(c * c + a * a);
    },
    getScale: function(a, b) {
      if (a.length >= 2 && b.length >= 2)
        return this.getDistance(b[0], b[1]) / this.getDistance(a[0], a[1]);
      return 1;
    },
    getRotation: function(a, b) {
      if (a.length >= 2 && b.length >= 2)
        return this.getAngle(b[1], b[0]) - this.getAngle(a[1], a[0]);
      return 0;
    },
    isVertical: function(a) {
      return a == B || a == A;
    },
    toggleDefaultBehavior: function(a, b, c) {
      if (!(!b || !a || !a.style)) {
        f.each(["webkit", "moz", "Moz", "ms", "o", ""], function(g) {
          f.each(b, function(i, h) {
            if (g) h = g + h.substring(0, 1).toUpperCase() + h.substring(1);
            if (h in a.style) a.style[h] = !c && i;
          });
        });
        var d = function() {
          return false;
        };
        if (b.userSelect == "none") a.onselectstart = !c && d;
        if (b.userDrag == "none") a.ondragstart = !c && d;
      }
    }
  });
  e.Instance = function(a, b) {
    var c = this;
    G();
    this.element = a;
    this.enabled = true;
    this.options = f.extend(f.extend({}, e.defaults), b || {});
    this.options.stop_browser_behavior &&
      f.toggleDefaultBehavior(
        this.element,
        this.options.stop_browser_behavior,
        false
      );
    this.eventStartHandler = u.onTouch(a, p, function(d) {
      c.enabled && k.startDetect(c, d);
    });
    this.eventHandlers = [];
    return this;
  };
  e.Instance.prototype = {
    on: function(a, b) {
      a = a.split(" ");
      f.each(
        a,
        function(c) {
          this.element.addEventListener(c, b, false);
          this.eventHandlers.push({ gesture: c, handler: b });
        },
        this
      );
      return this;
    },
    off: function(a, b) {
      a = a.split(" ");
      var c, d;
      f.each(
        a,
        function(g) {
          this.element.removeEventListener(g, b, false);
          for (c = -1; (d = this.eventHandlers[++c]); )
            d.gesture === g &&
              d.handler === b &&
              this.eventHandlers.splice(c, 1);
        },
        this
      );
      return this;
    },
    trigger: function(a, b) {
      b || (b = {});
      var c = e.DOCUMENT.createEvent("Event");
      c.initEvent(a, true, true);
      c.gesture = b;
      a = this.element;
      if (f.hasParent(b.target, a)) a = b.target;
      a.dispatchEvent(c);
      return this;
    },
    enable: function(a) {
      this.enabled = a;
      return this;
    },
    dispose: function() {
      var a, b;
      this.options.stop_browser_behavior &&
        f.toggleDefaultBehavior(
          this.element,
          this.options.stop_browser_behavior,
          true
        );
      for (a = -1; (b = this.eventHandlers[++a]); )
        this.element.removeEventListener(b.gesture, b.handler, false);
      this.eventHandlers = [];
      u.unbindDom(this.element, e.EVENT_TYPES[p], this.eventStartHandler);
      return null;
    }
  };
  var v = null,
    w = false,
    x = false,
    u = (e.event = {
      bindDom: function(a, b, c) {
        b = b.split(" ");
        f.each(b, function(d) {
          a.addEventListener(d, c, false);
        });
      },
      unbindDom: function(a, b, c) {
        b = b.split(" ");
        f.each(b, function(d) {
          a.removeEventListener(d, c, false);
        });
      },
      onTouch: function(a, b, c) {
        var d = this,
          g = function(i) {
            var h = i.type.toLowerCase(),
              m = f.inStr(h, "touch"),
              l = !m && f.inStr(h, "pointer"),
              y = !m && !l && f.inStr(h, "mouse"),
              n = b,
              o;
            if (y) {
              o = q.event || i;
              o =
                "buttons" in o ? o.buttons : "which" in o ? o.which : o.button;
            }
            if (!(y && x)) {
              if (m || (l && f.inStr(h, "down")) || (y && o === 1)) w = true;
              else if (
                (y && !o) ||
                (l &&
                  f.inStr(h, "move") &&
                  i.pressure == 0 &&
                  s.matchType(t, i))
              )
                if (v) {
                  n = j;
                  h = h.replace("move", "up");
                  w = true;
                } else w = false;
              if (m || l) x = true;
              l = 0;
              if (w) {
                if (e.HAS_POINTEREVENTS && n != j) l = s.updatePointer(n, i);
                else if (m) l = i.touches.length;
                else x || (l = f.inStr(h, "up") ? 0 : 1);
                if (l > 0 && n == j) n = r;
                else l || (n = j);
                if (l || v === null) v = i;
                c.call(k, d.collectEventData(a, n, d.getTouchList(v, n), i));
                if (e.HAS_POINTEREVENTS && n == j) l = s.updatePointer(n, i);
              }
              if (!l) {
                v = null;
                x = w = false;
                s.reset();
              }
            }
          };
        this.bindDom(a, e.EVENT_TYPES[b], g);
        return g;
      },
      determineEventTypes: function() {
        var a;
        a = e.HAS_POINTEREVENTS
          ? s.getEvents()
          : e.NO_MOUSEEVENTS
            ? ["touchstart", "touchmove", "touchend touchcancel"]
            : [
                "touchstart mousedown",
                "touchmove mousemove",
                "touchend touchcancel mouseup"
              ];
        e.EVENT_TYPES[p] = a[0];
        e.EVENT_TYPES[r] = a[1];
        e.EVENT_TYPES[j] = a[2];
      },
      getTouchList: function(a) {
        if (e.HAS_POINTEREVENTS) return s.getTouchList();
        if (a.touches) return a.touches;
        a.identifier = 1;
        return [a];
      },
      collectEventData: function(a, b, c, d) {
        a = C;
        if (f.inStr(d.type, "mouse") || s.matchType(t, d)) a = t;
        return {
          center: f.getCenter(c),
          timeStamp: Date.now(),
          target: d.target,
          touches: c,
          eventType: b,
          pointerType: a,
          srcEvent: d,
          preventDefault: function() {
            var g = this.srcEvent;
            g.preventManipulation && g.preventManipulation();
            g.preventDefault && g.preventDefault();
          },
          stopPropagation: function() {
            this.srcEvent.stopPropagation();
          },
          stopDetect: function() {
            return k.stopDetect();
          }
        };
      }
    }),
    s = (e.PointerEvent = {
      pointers: {},
      getTouchList: function() {
        var a = [];
        f.each(this.pointers, function(b) {
          a.push(b);
        });
        return a;
      },
      updatePointer: function(a, b) {
        if (a == j) delete this.pointers[b.pointerId];
        else {
          b.identifier = b.pointerId;
          this.pointers[b.pointerId] = b;
        }
        return Object.keys(this.pointers).length;
      },
      matchType: function(a, b) {
        if (!b.pointerType) return false;
        var c = b.pointerType,
          d = {};
        d[t] = c === (b.MSPOINTER_TYPE_MOUSE || t);
        d[C] = c === (b.MSPOINTER_TYPE_TOUCH || C);
        d[F] = c === (b.MSPOINTER_TYPE_PEN || F);
        return d[a];
      },
      getEvents: function() {
        return [
          "pointerdown MSPointerDown",
          "pointermove MSPointerMove",
          "pointerup pointercancel MSPointerUp MSPointerCancel"
        ];
      },
      reset: function() {
        this.pointers = {};
      }
    }),
    k = (e.detection = {
      gestures: [],
      current: null,
      previous: null,
      stopped: false,
      startDetect: function(a, b) {
        if (!this.current) {
          this.stopped = false;
          this.current = {
            inst: a,
            startEvent: f.extend({}, b),
            lastEvent: false,
            lastVelocityEvent: false,
            velocity: false,
            name: ""
          };
          this.detect(b);
        }
      },
      detect: function(a) {
        if (!(!this.current || this.stopped)) {
          a = this.extendEventData(a);
          var b = this.current.inst,
            c = b.options;
          f.each(
            this.gestures,
            function(d) {
              if (!this.stopped && c[d.name] !== false && b.enabled !== false)
                if (d.handler.call(d, a, b) === false) {
                  this.stopDetect();
                  return false;
                }
            },
            this
          );
          if (this.current) this.current.lastEvent = a;
          a.eventType == j && !a.touches.length - 1 && this.stopDetect();
          return a;
        }
      },
      stopDetect: function() {
        this.previous = f.extend({}, this.current);
        this.current = null;
        this.stopped = true;
      },
      getVelocityData: function(a, b, c, d) {
        var g = this.current,
          i = g.lastVelocityEvent,
          h = g.velocity;
        if (i && a.timeStamp - i.timeStamp > e.UPDATE_VELOCITY_INTERVAL) {
          h = f.getVelocity(
            a.timeStamp - i.timeStamp,
            a.center.clientX - i.center.clientX,
            a.center.clientY - i.center.clientY
          );
          g.lastVelocityEvent = a;
        } else if (!g.velocity) {
          h = f.getVelocity(b, c, d);
          g.lastVelocityEvent = a;
        }
        g.velocity = h;
        a.velocityX = h.x;
        a.velocityY = h.y;
      },
      getInterimData: function(a) {
        var b = this.current.lastEvent,
          c;
        if (a.eventType == j) {
          c = b && b.interimAngle;
          b = b && b.interimDirection;
        } else {
          c = b && f.getAngle(b.center, a.center);
          b = b && f.getDirection(b.center, a.center);
        }
        a.interimAngle = c;
        a.interimDirection = b;
      },
      extendEventData: function(a) {
        var b = this.current.startEvent;
        if (a.touches.length != b.touches.length || a.touches === b.touches) {
          b.touches = [];
          f.each(a.touches, function(i) {
            b.touches.push(f.extend({}, i));
          });
        }
        var c = a.timeStamp - b.timeStamp,
          d = a.center.clientX - b.center.clientX,
          g = a.center.clientY - b.center.clientY;
        this.getVelocityData(a, c, d, g);
        this.getInterimData(a);
        f.extend(a, {
          startEvent: b,
          deltaTime: c,
          deltaX: d,
          deltaY: g,
          distance: f.getDistance(b.center, a.center),
          angle: f.getAngle(b.center, a.center),
          direction: f.getDirection(b.center, a.center),
          scale: f.getScale(b.touches, a.touches),
          rotation: f.getRotation(b.touches, a.touches)
        });
        return a;
      },
      register: function(a) {
        var b = a.defaults || {};
        if (b[a.name] === z) b[a.name] = true;
        f.extend(e.defaults, b, true);
        a.index = a.index || 1e3;
        this.gestures.push(a);
        this.gestures.sort(function(c, d) {
          if (c.index < d.index) return -1;
          if (c.index > d.index) return 1;
          return 0;
        });
        return this.gestures;
      }
    });
  e.gestures.Drag = {
    name: "drag",
    index: 50,
    defaults: {
      drag_min_distance: 10,
      correct_for_drag_min_distance: true,
      drag_max_touches: 1,
      drag_block_horizontal: false,
      drag_block_vertical: false,
      drag_lock_to_axis: false,
      drag_lock_min_distance: 25
    },
    triggered: false,
    handler: function(a, b) {
      var c = k.current;
      if (c.name != this.name && this.triggered) {
        b.trigger(this.name + "end", a);
        this.triggered = false;
      } else if (
        !(
          b.options.drag_max_touches > 0 &&
          a.touches.length > b.options.drag_max_touches
        )
      )
        switch (a.eventType) {
          case p:
            this.triggered = false;
            break;
          case r:
            if (a.distance < b.options.drag_min_distance && c.name != this.name)
              return;
            var d = c.startEvent.center;
            if (c.name != this.name) {
              c.name = this.name;
              if (b.options.correct_for_drag_min_distance && a.distance > 0) {
                var g = Math.abs(b.options.drag_min_distance / a.distance);
                d.pageX += a.deltaX * g;
                d.pageY += a.deltaY * g;
                d.clientX += a.deltaX * g;
                d.clientY += a.deltaY * g;
                a = k.extendEventData(a);
              }
            }
            if (
              c.lastEvent.drag_locked_to_axis ||
              (b.options.drag_lock_to_axis &&
                b.options.drag_lock_min_distance <= a.distance)
            )
              a.drag_locked_to_axis = true;
            c = c.lastEvent.direction;
            if (a.drag_locked_to_axis && c !== a.direction)
              a.direction = f.isVertical(c)
                ? a.deltaY < 0
                  ? B
                  : A
                : a.deltaX < 0
                  ? D
                  : E;
            if (!this.triggered) {
              b.trigger(this.name + "start", a);
              this.triggered = true;
            }
            b.trigger(this.name, a);
            b.trigger(this.name + a.direction, a);
            c = f.isVertical(a.direction);
            if (
              (b.options.drag_block_vertical && c) ||
              (b.options.drag_block_horizontal && !c)
            )
              a.preventDefault();
            break;
          case j:
            this.triggered && b.trigger(this.name + "end", a);
            this.triggered = false;
            break;
        }
    }
  };
  e.gestures.Hold = {
    name: "hold",
    index: 10,
    defaults: { hold_timeout: 500, hold_threshold: 2 },
    timer: null,
    handler: function(a, b) {
      switch (a.eventType) {
        case p:
          clearTimeout(this.timer);
          k.current.name = this.name;
          this.timer = setTimeout(function() {
            k.current.name == "hold" && b.trigger("hold", a);
          }, b.options.hold_timeout);
          break;
        case r:
          a.distance > b.options.hold_threshold && clearTimeout(this.timer);
          break;
        case j:
          clearTimeout(this.timer);
          break;
      }
    }
  };
  e.gestures.Release = {
    name: "release",
    index: Infinity,
    handler: function(a, b) {
      a.eventType == j && b.trigger(this.name, a);
    }
  };
  e.gestures.Swipe = {
    name: "swipe",
    index: 40,
    defaults: {
      swipe_min_touches: 1,
      swipe_max_touches: 1,
      swipe_velocity: 0.7
    },
    handler: function(a, b) {
      if (a.eventType == j)
        if (
          !(
            a.touches.length < b.options.swipe_min_touches ||
            a.touches.length > b.options.swipe_max_touches
          )
        )
          if (
            a.velocityX > b.options.swipe_velocity ||
            a.velocityY > b.options.swipe_velocity
          ) {
            b.trigger(this.name, a);
            b.trigger(this.name + a.direction, a);
          }
    }
  };
  e.gestures.Tap = {
    name: "tap",
    index: 100,
    defaults: {
      tap_max_touchtime: 250,
      tap_max_distance: 10,
      tap_always: true,
      doubletap_distance: 20,
      doubletap_interval: 300
    },
    has_moved: false,
    handler: function(a, b) {
      var c, d, g;
      if (a.eventType == p) this.has_moved = false;
      else if (a.eventType == r && !this.moved)
        this.has_moved = a.distance > b.options.tap_max_distance;
      else if (
        a.eventType == j &&
        a.srcEvent.type != "touchcancel" &&
        a.deltaTime < b.options.tap_max_touchtime &&
        !this.has_moved
      ) {
        d =
          (c = k.previous) &&
          c.lastEvent &&
          a.timeStamp - c.lastEvent.timeStamp;
        g = false;
        if (
          c &&
          c.name == "tap" &&
          d &&
          d < b.options.doubletap_interval &&
          a.distance < b.options.doubletap_distance
        ) {
          b.trigger("doubletap", a);
          g = true;
        }
        if (!g || b.options.tap_always) {
          k.current.name = "tap";
          b.trigger(k.current.name, a);
        }
      }
    }
  };
  e.gestures.Touch = {
    name: "touch",
    index: -Infinity,
    defaults: { prevent_default: false, prevent_mouseevents: false },
    handler: function(a, b) {
      if (b.options.prevent_mouseevents && a.pointerType == t) a.stopDetect();
      else {
        b.options.prevent_default && a.preventDefault();
        a.eventType == p && b.trigger(this.name, a);
      }
    }
  };
  e.gestures.Transform = {
    name: "transform",
    index: 45,
    defaults: {
      transform_min_scale: 0.01,
      transform_min_rotation: 1,
      transform_always_block: false,
      transform_within_instance: false
    },
    triggered: false,
    handler: function(a, b) {
      if (k.current.name != this.name && this.triggered) {
        b.trigger(this.name + "end", a);
        this.triggered = false;
      } else if (!(a.touches.length < 2)) {
        b.options.transform_always_block && a.preventDefault();
        if (b.options.transform_within_instance)
          for (var c = -1; a.touches[++c]; )
            if (!f.hasParent(a.touches[c].target, b.element)) return;
        switch (a.eventType) {
          case p:
            this.triggered = false;
            break;
          case r:
            c = Math.abs(1 - a.scale);
            var d = Math.abs(a.rotation);
            if (
              c < b.options.transform_min_scale &&
              d < b.options.transform_min_rotation
            )
              return;
            k.current.name = this.name;
            if (!this.triggered) {
              b.trigger(this.name + "start", a);
              this.triggered = true;
            }
            b.trigger(this.name, a);
            d > b.options.transform_min_rotation && b.trigger("rotate", a);
            if (c > b.options.transform_min_scale) {
              b.trigger("pinch", a);
              b.trigger("pinch" + (a.scale < 1 ? "in" : "out"), a);
            }
            break;
          case j:
            this.triggered && b.trigger(this.name + "end", a);
            this.triggered = false;
            break;
        }
      }
    }
  };
  if (typeof define == "function" && define.amd)
    define(function() {
      return e;
    });
  else if (typeof module == "object" && module.exports) module.exports = e;
  else q.Hammer = e;
})(window);
