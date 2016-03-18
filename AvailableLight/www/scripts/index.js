"use strict";

function onDeviceReady() {
  // Handle the Cordova pause and resume events
  document.addEventListener('pause', onPause.bind(this), false);
  document.addEventListener('resume', onResume.bind(this), false);

  // initialization - you can explicitly specify colours or use the framework defaults
  //availablelight.setAllColours("none"); // disable theming engine - use CSS
  //availablelight.setAllColours("host"); // use host environment colour scheme where possible

  // to get dark theme, set background and foreground colour
  //availablelight.setBackgroundColour("#000000");
  //availablelight.setForegroundColour("#FFFFFF");

  availablelight.setBackgroundColour("#FFE0C2");
  availablelight.setForegroundColour("#0F0800");
  availablelight.setHeaderBackgroundColour("#D79D64");
  availablelight.setHeaderForegroundColour("#0F0800");
  availablelight.setControlBackgroundColour("#D79D64");
  availablelight.setControlForegroundColour("#3F1F00");
  availablelight.setAccentColour("#0B3E63");
  availablelight.initialize(function (from, to) {
    if (from && from.toLowerCase() === "settings") app.viewmodel.Persist("save");
  }, {
    // App properties...
    Name: 'Available Light',
    Description: 'Enter a film speed (or digital equivalent) and ambient lighting conditions. We will give you a table of apertures (f/stop) and shutter speed for the given exposure value (EV). This table allows you to use a camera with manual control in conditions outside the range of the built-in light meter, which is common in available light photography. The table does not account for reciprocity failure which reduces the sensitivity of film for very long exposures (this does not apply to digital sensors).',
    Version: '2.1.1',
    Author: 'Flow Simulation Ltd.',
    ID: 'com.flosim.AvailableLight',
    Copyright: 'Copyright \u00A9 2016, Flow Simulation Ltd.'
  });
  app.viewmodel = new app.ViewModel(app.updateView);
  app.initialRender(300);
};

function onPause() {
  // application has been suspended. Save application state here.
  app.viewmodel.Persist("save");
};

function onResume() {
  // TODO: This application has been reactivated. Restore application state here.
};

if (window.cordova) {
  document.addEventListener('deviceready', onDeviceReady.bind(this), false);
} else {
  window.onload = onDeviceReady;
}

