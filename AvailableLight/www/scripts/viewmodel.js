var app = app || {};
"use strict";

app.ViewModel = function (callback) {
	var self = this;
	var model = app.Model();
	this.light = 0;
	this.levels = model.levels;
	this.speeds = model.speeds;
	this.speed = 0;
	this.iso = function () {
	  if (self.speed < 0 || self.speed >= model.speeds.length) return 200;
		return model.speeds[self.speed].text;
	};
	this.focalLength = 0;
	this.sensorSize = 0;
	this.sensorSizes = model.sensorSizes;
	this.imageStabilized = false;
	this.selectedCondition = undefined;
	this.comment = function (speed) {
		return model.comment(speed, self.focalLength, self.sensorSize, self.imageStabilized);
	}

	this.EV = function () {
		return model.EV(self.light, self.speed);
	};
	this.illuminance = function () {
		return model.illuminance(self.light);
	};
	this.illuminanceUnits = "lux";
	this.settings = function () {
		var settings = [];
		for (var i = 0; i < model.stops.length; i++) {
			settings[i] = {};
			settings[i].stop = model.stops[i];
			settings[i].ishutter = self.EV() - i;
			settings[i].shutter = model.shutterSpeeds[self.EV() - i + 21];
			settings[i].comment = model.comment(settings[i].ishutter, self.focalLength, self.sensorSize, self.imageStabilized);
		}
		return settings;
	};
	this.image = function () {
		return model.levels[+self.light + 6].image;
	};
	this.text = function () {
		return model.levels[+self.light + 6].text;
	};
	this.styleImage = function () {
		return "url(" + self.image() + ")";
	};
	this.searchTerm = "";
	this.searchResults = function () {
		if (self.searchTerm.length > 0)
			return model.conditions.filter(function (c) {
				return c.text.toLowerCase().indexOf(self.searchTerm.toLowerCase()) >= 0;
			});
		else return [];
	};
	this.findCondition = function (text) {
		var condition;
		model.conditions.forEach(function (c) {
			if(c.text === text) condition = c;
		});
		return condition;
	};
	this.Persist = function(action) {
		availablelight.PersistenceHelper(self, "light", 15, action);
		availablelight.PersistenceHelper(self, "speed", 4, action);
		availablelight.PersistenceHelper(self, "sensorSize", 0, action);
		availablelight.PersistenceHelper(self, "focalLength", 50, action);
		availablelight.PersistenceHelper(self, "imageStabilized", false, action);
	};
	this.Persist("load"); // load initial values
};


