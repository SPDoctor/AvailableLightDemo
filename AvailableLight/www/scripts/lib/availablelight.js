// availablelight.js - a lightweight SPA framework for HTML5 hybrid applications
var availablelight = availablelight || {};
"use strict";
availablelight.version = "1.0.8";
availablelight.editMode = false;
// default app info...
availablelight.appInfo = {
  Name: 'Available Light Demo App',
  Description: '',
  Version: '1.0.0',
  Author: '',
  ID: 'com.flosim.AvailableLightDemoApp',
  Copyright: 'Copyright \u00A9'
};

// UI Initialization

availablelight.initialize = function (navCallback, appInfo) {
  availablelight.initializeTheme();
  function initialize(element, text) {
    if (element) element.innerHTML = text;
  }
  // get app properties...
  availablelight.appInfo.Name = appInfo.Name || availablelight.appInfo.Name;
  availablelight.appInfo.Description = appInfo.Description || availablelight.appInfo.Description;
  availablelight.appInfo.Version = appInfo.Version || availablelight.appInfo.Version;
  availablelight.appInfo.BuildDate = appInfo.BuildDate;
  availablelight.appInfo.Author = appInfo.Author || availablelight.appInfo.Author;
  availablelight.appInfo.ID = appInfo.ID || availablelight.appInfo.ID;
  availablelight.appInfo.Copyright = appInfo.Copyright || availablelight.appInfo.Copyright;
  // bind static text fields
  initialize(document.querySelector("body>header>h1"), availablelight.appInfo.Name);
  initialize(document.getElementById("app-name"), availablelight.appInfo.Name);
  initialize(document.getElementById("app-version"), "Version " + availablelight.appInfo.Version);
  var platform = "Running on " + availablelight.getPlatform() + " (";
  if (availablelight.appInfo.BuildDate) platform += "built on " + availablelight.appInfo.BuildDate + ", ";
  platform += "using Available Light framework version " + availablelight.version + ")";
  initialize(document.getElementById("app-platform"), platform);
  initialize(document.getElementById("app-copyright"), availablelight.appInfo.Copyright);
  initialize(document.getElementById("app-description"), availablelight.appInfo.Description);

  function onClick(event) {
    event = event || window.event // cross-browser event
    var hash = event.target.hash;
    if (!hash) return;
    if (hash.length <= 0) return;
    availablelight.navigate(hash);
    event.preventDefault();
  }

  document.addEventListener('click', onClick.bind(this), false);
  availablelight.navInitialize(navCallback);
  availablelight.updateLiveTile();
  availablelight.handleWindowsSettingsPane();
};


// Navigation

availablelight.navHistory = [];

availablelight.navInitialize = function (navCallback) {
  availablelight.navCallback = navCallback;
  var articles = document.querySelectorAll("main>article");
  for (var i = 0; i < articles.length; i++) {
    if (i === 0) articles[i].classList.add("current");
    else articles[i].classList.remove("current");
  }
  if (articles.length > 0) availablelight.navHistory.push(articles[0].id);
}

availablelight.navigate = function (articleURI, backNav) {
  var found = false;
  if (articleURI[0] === "#") articleURI = articleURI.substring(1);
  var articleID = articleURI;
  var iQueryString = articleURI.indexOf("?");
  if (iQueryString >= 0) articleID = articleURI.substring(0, iQueryString);
  var articles = document.querySelectorAll("main>article");
  for (var i = 0; i < articles.length; i++) {
    if (articles[i].id == articleID) {
      articles[i].classList.add("current");
      if (!backNav && availablelight.navCallback) availablelight.navCallback(availablelight.navHistory[availablelight.navHistory.length - 1], articleURI);
      if (!backNav) availablelight.navHistory.push(articleURI);
      found = true;
    }
    else {
      articles[i].classList.remove("current");
    }
  }
  if (!found) {
    // article not found - set back to first article
    availablelight.navInitialize();
    if (!backNav && articles.length > 0) availablelight.navHistory.push(articles[0].id);
  }
}

availablelight.navigateBack = function () {
  var from = availablelight.navHistory.pop();
  if (availablelight.navHistory.length <= 0) return; // exit the app, perhaps after confirmation dialog
  to = availablelight.navHistory[availablelight.navHistory.length - 1];
  if (availablelight.navCallback) availablelight.navCallback(from, to);
  availablelight.navigate(to, true);
}


// Swipe Detection
availablelight.swipeDetect = function (element, callback) {
  var threshold = 150; // minimum distance traveled to be considered swipe
  var restraint = 100; // maximum distance allowed perpendicular to swipe direction
  var allowedTime = 300; // maximum time allowed to do the swipe
  var swipedir, startX, startY, distX, distY, startTime;

  function processSwipe() {
    var elapsedTime = new Date().getTime() - startTime; // get time elapsed
    if (elapsedTime <= allowedTime) { // first condition for awipe met
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
        callback((distX < 0) ? 'left' : 'right');
      }
      else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
        callback((distY < 0) ? 'up' : 'down');
      }
    }
  }

  if (window.navigator.msPointerEnabled) { // event handlers for IE etc. - another approach would be to be put an override method in WindowsUI.js
    element.addEventListener('MSPointerDown', function (e) {
      dist = 0;
      startX = e.pageX;
      startY = e.pageY;
      startTime = new Date().getTime(); // record time when finger first makes contact with surface
    }, false);

    element.addEventListener('pointerdown', function (e) {
      dist = 0;
      startX = e.pageX;
      startY = e.pageY;
      startTime = new Date().getTime(); // record time when finger first makes contact with surface
    }, false);

    element.addEventListener('pointerup', function (e) {
      distX = e.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
      distY = e.pageY - startY; // get vertical dist traveled by finger while in contact with surface
      processSwipe();
    }, false);

    element.addEventListener('pointerout', function (e) {
      distX = e.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
      distY = e.pageY - startY; // get vertical dist traveled by finger while in contact with surface
      processSwipe();
    }, false);
  }
  else { // event handlers for WebKit browsers
    element.addEventListener('touchstart', function (e) {
      dist = 0;
      startX = e.changedTouches[0].pageX;
      startY = e.changedTouches[0].pageY;
      startTime = new Date().getTime(); // record time when finger first makes contact with surface
    }, false);

    element.addEventListener('touchend', function (e) {
      distX = e.changedTouches[0].pageX - startX; // get horizontal dist traveled by finger while in contact with surface
      distY = e.changedTouches[0].pageY - startY; // get vertical dist traveled by finger while in contact with surface
      processSwipe();
    }, false);
  }
};

// Rate My App - call availablelight.RateMyApp.promptForRatingAfter(5) to prompt on fifth call
availablelight.RateMyApp = (function () {
  var COUNTER_LOCAL_STORAGE_ID = availablelight.appInfo.ID + '.rmacounter';
  var counter = JSON.parse(localStorage.getItem(COUNTER_LOCAL_STORAGE_ID)) || 0;

  function navigateToAppStore() {
    switch (cordova.platformId.toLowerCase()) {
      case "android":
        window.open('market://details?id=' + availablelight.appInfo.ID, '_system');
        break;
      case "ios":
        // needs testing
        var iOSVersion = navigator.userAgent.match(/OS\s+([\d\_]+)/i)[0].replace(/_/g, '.').replace('OS ', '').split('.');
        iOSVersion = parseInt(iOSVersion[0]) + (parseInt(iOSVersion[1]) || 0) / 10;
        if ((7.1 > iOSVersion && iOSVersion >= 7.0)) {
          window.open("itms-apps://itunes.apple.com/app/id" + availablelight.appInfo.ID, '_system');
        } else {
          window.open("itms-apps://itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id=" + availablelight.AppInfo().ID, '_system');
        }
        break;
      case "windows":
        if (navigator.userAgent.indexOf("Windows Phone") !== -1) { // Windows Phone
          window.open('ms-windows-store:reviewapp?appid=' + Windows.ApplicationModel.Store.CurrentApp.appId, '_system');
        } else { // windows 
          window.open('ms-windows-store:review?PFN:' + Windows.ApplicationModel.Package.current.id, '_system');
        }
        break;
      default: break;
    }
  };

  function buttonClickHandler(buttonIndex) {
    if (buttonIndex === 2) navigateToAppStore();
  };

  var resetCounter = function (count) {
    counter = count;
    localStorage.setItem(COUNTER_LOCAL_STORAGE_ID, JSON.stringify(counter));
  };

  var promptForRatingAfter = function (count) {
    count = count || 5;
    if (counter <= count) {
      counter++;
      localStorage.setItem(COUNTER_LOCAL_STORAGE_ID, JSON.stringify(counter));
    }
    if (counter === count) {
      var title = "Rate " + availablelight.appInfo.Name;
      var message = "If you enjoy using " + availablelight.appInfo.Name + ", would you mind taking a moment to give us a 5 star rating? It helps us a lot and won’t take more than a minute. Thanks for your support :-)";
      var cancelButtonLabel = "No Thanks";
      var rateButtonLabel = "Rate It Now";
      if (!navigator.notification) console.log("RMA requires native dialog plug-in 'cordova-plugin-dialogs'")
      else navigator.notification.confirm(message, buttonClickHandler, title, [cancelButtonLabel, rateButtonLabel]);
    }
  };

  return {
    resetCounter: resetCounter,
    promptForRatingAfter: promptForRatingAfter
  };
})();

// Platform detection
availablelight.getPlatform = function () {
  var platform = "Browser";
  if (window.cordova) {
    platform = window.cordova.platformId;
    switch (window.cordova.platformId.toLowerCase()) {
      case "android":
        platform = "Android";
        if (navigator.userAgent.indexOf("iPhone") !== -1) platform = "iOS";
        if (navigator.userAgent.indexOf("iPad") !== -1) platform = "iOS";
        if (navigator.userAgent.indexOf("BlackBerry") !== -1) platform = "BlackBerry";
        break;
      case "ios": platform = "iOS"; break; // not tested!
      case "windows":
        platform = "Windows";
        if (navigator.userAgent.toLowerCase().indexOf("windows phone") !== -1) platform = "Windows Phone";
        break;
      default:
        platform = window.cordova.platformId;
        break;
    }
  }
  return platform;
};

availablelight.isTouchEnabled = function () {
  return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
}


// Persistence

availablelight.PersistenceHelper = function (model, name, deflt, action, isString, key) {
  key = key || availablelight.appInfo.ID + "_";

  switch (action.toLowerCase()) {
    case "save":
      localStorage.setItem(key + name, model[name]);
      break;
    case "reset":
      localStorage.removeItem(key + name);
    case "load": // FALLSTHROUGH
      try {
        if (isString) model[name] = localStorage.getItem(key + name) || deflt;
        else model[name] = JSON.parse(localStorage.getItem(key + name)) || deflt;
      } catch (ex) {
        model[name] = deflt;
      }
      break;
    default:;
  }
};

availablelight.getJSON = function (url, success, fail) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4) {
      if (xmlhttp.status === 200) {
        try {
          var json = JSON.parse(xmlhttp.responseText);
          success(json);
        }
        catch (ex) {
          if (fail) fail(ex.message)
        }
      }
      else if (fail) fail(xmlhttp.status);
    }
  }
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
};

availablelight.putJSON = function (url, data, success, fail) {
  var json = JSON.stringify(data);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4) {
      if (xmlhttp.status === 200) {
        if (success) success(xmlhttp.responseText);
      }
      else {
        if (fail) fail(xmlhttp.status);
      }
    }
  }
  xmlhttp.open("PUT", url, true);
  //xmlhttp.setRequestHeader("Content-Length", json.length);
  xmlhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  xmlhttp.send(json);
};

availablelight.parseURL = function (url) {
  var articleID = url;
  var queryString = "";
  iQueryString = url.indexOf("?");
  if (iQueryString >= 0) {
    articleID = url.substring(0, iQueryString);
    queryString = url.substring(iQueryString + 1);
  }
  var params = {};
  var paramList = queryString.split('&');
  for (var i = 0; i < paramList.length; i++) {
    try {
      var pair = paramList[i].split('=');
      if (pair.length === 2) params[pair[0]] = pair[1];
    } catch (ex) { } // swallow exceptions and carry on
  }
  return { article: articleID, params: params }
}


// Methods to use Windows.UI features. Provide default behaviour on non-Windows platforms

availablelight.updateLiveTile = function () {
  try {
    if (typeof Windows === 'undefined') return; // feature detection - works on Windows platforms only
    var notifications = Windows.UI.Notifications;
    if (typeof notifications === 'undefined') return;

    var template = notifications.TileTemplateType.tileWide310x150ImageAndText01;
    var tileXml = notifications.TileUpdateManager.getTemplateContent(template);
    var tileTextAttributes = tileXml.getElementsByTagName("text");
    tileTextAttributes[0].appendChild(tileXml.createTextNode("Pushing the limits of photography"));
    var tileImageAttributes = tileXml.getElementsByTagName("image");
    tileImageAttributes[0].setAttribute("src", "ms-appx:///www/images/aftersunset.jpg");
    tileImageAttributes[0].setAttribute("alt", "red graphic");
    var tileNotification = new notifications.TileNotification(tileXml);
    var updater = notifications.TileUpdateManager.createTileUpdaterForApplication();
    updater.update(tileNotification);
  }
  catch (e) { // fail silently
  }
}

availablelight.hex = function (n) {
  var hex = n.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

availablelight.fromHex = function (str) {
  var colour = { r: 0, g: 0, b: 0 };
  if (!str || str.length < 3) return colour;
  if (str.charAt(0) === '#') str = str.substring(1);
  if (str.length === 6) {
    colour.r = parseInt("0x" + str.substring(0, 2));
    colour.g = parseInt("0x" + str.substring(2, 4));
    colour.b = parseInt("0x" + str.substring(4, 6));
  }
  return colour;
}

availablelight.colourShift = function (colour, reference, factor) {
  factor = 0.5;
  colour.r = Math.floor(Math.min(Math.max((factor * colour.r + (1.0 - factor) * reference.r) / 2.0, 255), 0));
  colour.g = Math.floor(Math.min(Math.max((factor * colour.g + (1.0 - factor) * reference.g) / 2.0, 255), 0));
  colour.b = Math.floor(Math.min(Math.max((factor * colour.b + (1.0 - factor) * reference.b) / 2.0, 255), 0));
  return colour;
}

availablelight.getAccentColour = function () {
  if (availablelight.accentColour === "host") {
    try { // look at platform settings
      if (typeof Windows !== 'undefined') { // feature detection - works on Windows platforms only
        var accentColor, uiSettings = new Windows.UI.ViewManagement.UISettings();
        var UIElementTypeAccentColor = Windows.UI.ViewManagement.UIElementType.accentColor || 1000;
        if (availablelight.getPlatform() === "Windows Phone") accentColor = uiSettings.uiElementColor(UIElementTypeAccentColor);
        else accentColor = uiSettings.getColorValue(Windows.UI.ViewManagement.UIColorType.accent);
        return "#" + availablelight.hex(accentColor.r) + availablelight.hex(accentColor.g) + availablelight.hex(accentColor.b);
      }
    }
    catch (Exception) { } // buggy API
    return "#1E90FF"; // best guess for accent colour on non-windows platforms (dodger blue)
  }
  if (availablelight.accentColour) return availablelight.accentColour;
  return "none";
}

availablelight.setAccentColour = function (value) {
  availablelight.accentColour = value;
}

availablelight.getForegroundColour = function () {
  if (availablelight.foregroundColour === "host") {
    try { // look at platform settings
      if (typeof Windows !== 'undefined') { // feature detection - works on Windows platforms only
        var foregroundColor, uiSettings = new Windows.UI.ViewManagement.UISettings();
        var UIElementTypeTextHigh = Windows.UI.ViewManagement.UIElementType.textHigh || 1001;
        if (availablelight.getPlatform() === "Windows Phone") foregroundColor = uiSettings.uiElementColor(UIElementTypeTextHigh);
        else foregroundColor = uiSettings.getColorValue(Windows.UI.ViewManagement.UIColorType.foreground);
        return "#" + availablelight.hex(foregroundColor.r) + availablelight.hex(foregroundColor.g) + availablelight.hex(foregroundColor.b);
      }
    }
    catch (Exception) { } // buggy API
    return "#000000";
  }
  if (availablelight.foregroundColour) return availablelight.foregroundColour;
  return "none";
}

availablelight.setForegroundColour = function (value) {
  availablelight.foregroundColour = value;
}

availablelight.getBackgroundColour = function () {
  if (availablelight.backgroundColour === "host") {
    try { // look at platform settings
      if (typeof Windows !== 'undefined') { // feature detection - works on Windows platforms only
        var backgroundColor, uiSettings = new Windows.UI.ViewManagement.UISettings();
        var UIElementTypePageBackground = Windows.UI.ViewManagement.UIElementType.pageBackground || 1010;
        if (availablelight.getPlatform() === "Windows Phone") backgroundColor = uiSettings.uiElementColor(UIElementTypePageBackground);
        else backgroundColor = uiSettings.getColorValue(Windows.UI.ViewManagement.UIColorType.background);
        return "#" + availablelight.hex(backgroundColor.r) + availablelight.hex(backgroundColor.g) + availablelight.hex(backgroundColor.b);
      }
    }
    catch (Exception) { } // buggy API
    return "#ffffff";
  }
  if (availablelight.backgroundColour) return availablelight.backgroundColour;
  return "none";
}

availablelight.setBackgroundColour = function (value) {
  availablelight.backgroundColour = value;
}

availablelight.getControlForegroundColour = function () {
  if (availablelight.controlForegroundColour === "host") {
    if (availablelight.isDarkTheme()) return "#ffffff";
    return "#000000";
  }
  if (availablelight.controlForegroundColour) return availablelight.controlForegroundColour;
  return "none";
}

availablelight.setControlForegroundColour = function (value) {
  availablelight.controlForegroundColour = value;
}

availablelight.getControlBackgroundColour = function () {
  if (availablelight.controlBackgroundColour === "host") {
    if (availablelight.isDarkTheme()) return "#393939";
    return "#e6e6e6";
  }
  if (availablelight.controlBackgroundColour) return availablelight.controlBackgroundColour;
  return "none";
}

availablelight.setControlBackgroundColour = function (value) {
  availablelight.controlBackgroundColour = value;
}

availablelight.getHeaderForegroundColour = function () {
  if (availablelight.headerForegroundColour === "host") {
    if (availablelight.isDarkTheme()) return "#ffffff";
    return "#000000";
  }
  if (availablelight.headerForegroundColour) return availablelight.headerForegroundColour;
  return "none";
}

availablelight.setHeaderForegroundColour = function (value) {
  availablelight.headerForegroundColour = value;
}

availablelight.getHeaderBackgroundColour = function () {
  if (availablelight.headerBackgroundColour === "host") {
    if (typeof Windows !== 'undefined') { // Windows: header defaults to black or white background
      if (availablelight.isDarkTheme()) return "#000000";
      return "#ffffff";
    }
    if (availablelight.isDarkTheme()) return "#393939";
    return "#e6e6e6";
  }
  if (availablelight.headerBackgroundColour) return availablelight.headerBackgroundColour;
  return "none";
}

availablelight.setHeaderBackgroundColour = function (value) {
  availablelight.headerBackgroundColour = value;
}

availablelight.setAllColours = function (value) {
  availablelight.accentColour = value;
  availablelight.foregroundColour = value;
  availablelight.backgroundColour = value;
  availablelight.controlForegroundColour = value;
  availablelight.controlBackgroundColour = value;
  availablelight.headerForegroundColour = value;
  availablelight.headerBackgroundColour = value;
}

availablelight.isDarkTheme = function () {
  var bgColour = availablelight.getBackgroundColour();
  if (bgColour[0] !== '#') return false;
  var pageBackgroundColor = availablelight.fromHex(bgColour);
  if ((pageBackgroundColor.r + pageBackgroundColor.g + pageBackgroundColor.b) < 100) return true;
  return false;
}

availablelight.initializeTheme = function () {
  // apply theme colours
  //var controlMidColour = availablelight.subduedColor(availablelight.fromHex(availablelight.getControlForegroundColour()), {r:127,g:127,b:127});
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = '.theme-accent-colour { color: ' + availablelight.getAccentColour() + '; }\n' +
		'.theme-foreground-colour { color: ' + availablelight.getForegroundColour() + '; }\n' +
		'.theme-background-colour { background-color: ' + availablelight.getBackgroundColour() + '; }\n' +
		'.theme-controlforeground-colour { color: ' + availablelight.getControlForegroundColour() + '; }\n' +
		'.theme-controlbackground-colour { background-color: ' + availablelight.getControlBackgroundColour() + '; }\n' +
		'body { color: ' + availablelight.getForegroundColour() + '; background-color: ' + availablelight.getBackgroundColour() + '; }\n' +
		'body>nav, body>nav>button { color: ' + availablelight.getControlForegroundColour() + '; background-color: ' + availablelight.getControlBackgroundColour() + '; }\n' +
		'button, input, select { color: ' + availablelight.getControlForegroundColour() + '; }\n' +
		'body>header { color: ' + availablelight.getHeaderForegroundColour() + '; background-color: ' + availablelight.getHeaderBackgroundColour() + '; }\n' +
		'button { color: ' + availablelight.getControlForegroundColour() + '; background-color: ' + availablelight.getControlBackgroundColour() + '; border-color: ' + availablelight.getControlForegroundColour() + '; }\n' +
		'button:hover, button:active { color: ' + availablelight.getForegroundColour() + '; background-color: ' + availablelight.getBackgroundColour() + '; }\n' +
		'input, select { color: ' + availablelight.getForegroundColour() + '; background-color: ' + availablelight.getBackgroundColour() + '; border-color: ' + availablelight.getControlForegroundColour() + '; }\n' +
		'input:hover, input:active, select:hover, select:active { color: ' + availablelight.getControlForegroundColour() + '; background-color: ' + availablelight.getControlBackgroundColour() + '; }\n' +
		'select option:checked { color: ' + availablelight.getControlBackgroundColour() + '; background-color: ' + availablelight.getControlForegroundColour() + '; }\n' +
		'';
  if (!availablelight.isTouchEnabled()) style.innerHTML +=
		'body { scrollbar-highlight-color: ' + availablelight.getControlBackgroundColour() + '; scrollbar-base-color: ' + availablelight.getControlForegroundColour() + '; }\n' +
		'::-webkit-scrollbar { -webkit-overflow-scrolling: touch; background-color: ' + availablelight.getControlBackgroundColour() + '; }\n' +
		'::-webkit-scrollbar-thumb { background-color: ' + availablelight.getControlForegroundColour() + '; }\n' +
		'';
  document.head.appendChild(style);
}

availablelight.handleWindowsSettingsPane = function () {
  if (typeof Windows != 'undefined') { // feature detection - Windows platforms only
    // capture settings event on Windows
    try {
      if (Windows.UI.ApplicationSettings) {
        var settingsPane = Windows.UI.ApplicationSettings.SettingsPane.getForCurrentView();
        function commandsRequested(eventArgs) {
          availablelight.navigate("settings");
          return true;
        }
        settingsPane.addEventListener("commandsrequested", commandsRequested);
      }
    }
    catch (Exception) { } // buggy API
  }
}

