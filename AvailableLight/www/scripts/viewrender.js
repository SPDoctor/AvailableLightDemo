"use strict";
var app = app || {};

app.initialRender = function (delay) {
  // get some initial content up quickly - this list never changes
  app.renderIconList(document.getElementById("levels-list"), app.viewmodel.levels, app.viewmodel.light, app.select);
  // give time for slow mobile processors to catch up before rendering properly
  delay = delay || 1000;
  setTimeout(function () {
    app.updateView();
  }, delay);
}

app.select = function (level) {
  app.viewmodel.light = parseInt(level);
  // only need to update result panel
  app.renderExposureHeading(document.getElementById("exposure-heading"));
  app.renderExposureTable(document.getElementById("exposure-table"));
  var article = document.getElementById("home");
  article.scrollLeft = 200; // scroll result section into view
}

app.updateView = function () {  // render all controls
  app.renderExposureHeading(document.getElementById("exposure-heading"));
  app.renderExposureTable(document.getElementById("exposure-table"));
  app.renderSettings(document.getElementById("settings-control"));
}

app.renderIconList = function (element, items, selected, selectCallback) {
  items.map(function (item) {
    var templatecontainer = document.createElement("div");
    element.appendChild(templatecontainer).className = "templatecontainer";
    var itemcontainer = document.createElement("div");
    templatecontainer.appendChild(itemcontainer).className = "itemcontainer";
    var anchor = document.createElement("a");
    itemcontainer.appendChild(anchor);
    anchor.innerHTML = "<img id='clicktarget' class='icon-block' src='" + item.image + "' />";
    anchor.innerHTML += "<div class='label-medium'>" + item.text + "</div>";
    if (selectCallback) anchor.onclick = function () { selectCallback(item.value); }
  });
}

app.renderExposureHeading = function (element) {
  // We can use the DOM or emit literal HTML...
  var exposureHeading = document.getElementById("exposure-heading");
  var html = "";
  html += "<img src='" + app.viewmodel.image() + "'/>";
  html += "<div>";
  html += "<div>EV: <b>" + app.viewmodel.EV() + "</b> at ISO " + app.viewmodel.iso() + "</div>";
  html += "<div>Light level: " + app.viewmodel.illuminance() +" (" + app.viewmodel.illuminanceUnits + ")</div>";
	html += "<div>" + app.viewmodel.text() + "</div>";
	html += "</div>";
	exposureHeading.innerHTML = html;
}

app.renderExposureTable = function () {
  var tableBody = document.getElementById("exposure-table");
  for (var i = 0; i < tableBody.rows.length;) {
    tableBody.deleteRow(i);
  }
  app.viewmodel.settings().map(function (setting) {
    var tableRow = tableBody.insertRow();
    tableRow.insertCell().innerText = setting.stop;
    tableRow.insertCell().innerText = setting.shutter;
    tableRow.insertCell().innerText = setting.comment;
  });
}

app.renderSettings = function () {
  app.renderSelect(document.getElementById("select-speed"), app.viewmodel, "speeds", "speed", app.updateView)
  app.renderInput(document.getElementById("input-focal-length"), app.viewmodel, "focalLength", app.updateView)
  app.renderSelect(document.getElementById("select-sensor-size"), app.viewmodel, "sensorSizes", "sensorSize", app.updateView)
  app.renderCheckbox(document.getElementById("checkbox-image-stabilized"), app.viewmodel, "imageStabilized", app.updateView)
}

app.renderInput = function (input, viewmodel, value, selectCallback) {
  input.value = viewmodel[value];
  input.onchange = function (event) {
    viewmodel[value] = event.target.value;
    if (selectCallback) selectCallback();
  };
}

app.renderCheckbox = function (checkbox, viewmodel, value, selectCallback) {
  checkbox.checked = viewmodel[value];
  checkbox.onchange = function (event) {
    viewmodel[value] = event.target.checked;
    if (selectCallback) selectCallback();
  };
}

app.renderSelect = function (select, viewmodel, options, selected, selectCallback) {
  if (select.options.length === 0) { // first time so need to render
    viewmodel[options].map(function (o) {
      var option = document.createElement("option");
      option.text = o.text;
      option.value = o.value;
      if (o.value == viewmodel[selected]) option.selected = true; // intentional coercive ==
      select.options.add(option);
    });
    select.onchange = function (event) {
      viewmodel[selected] = event.target.value;
      if (selectCallback) selectCallback();
    };
  }
  else select.value = viewmodel[selected];
}