/// <reference path="../Scripts/viewModel.js" />
/// <reference path="../Scripts/jquery-1.9.1.js" />

$(function () {
	var $fixture = $("#qunit-fixture");
	module("Available Light - ExposureHeading");
	var content;

	function contains(haystack, needle, message) {
		var actual = haystack.indexOf(needle) != -1;
		QUnit.push(actual, haystack, needle, message);
	}

	function arrange_default() {
		app.viewmodel.light = 15;
		app.viewmodel.speed = 4;
		app.viewmodel.focalLength = 50;
		app.viewmodel.sensorSize = 0;
		app.viewmodel.imageStabilized = false;
		app.renderExposureHeading(document.getElementById("exposure-heading"));
	}

	test("should have correct EV", function () {
		arrange_default();
		var content = $("#exposure-heading").html();
		contains(content, "EV: <b>16</b>");
	});

	test("should have correct illuminance", function () {
		arrange_default();
		var content = $("#exposure-heading").html();
		contains(content, "Light level: 81920");
	});

	test("should have correct EV with modified film speed", function () {
		arrange_default();
		app.viewmodel.speed = 8;
		app.renderExposureHeading(document.getElementById("exposure-heading"));
		var content = $("#exposure-heading").html();
		contains(content, "EV: <b>20</b>");
	});

	test("should have correct illuminance with modified film speed", function () {
		arrange_default();
		app.viewmodel.speed = 8;
		app.renderExposureHeading(document.getElementById("exposure-heading"));
		var content = $("#exposure-heading").html();
		contains(content, "Light level: 81920");
	});

	test("should have correct EV with modified light level", function () {
		arrange_default();
		app.viewmodel.light = 8;
		app.renderExposureHeading(document.getElementById("exposure-heading"));
		var content = $("#exposure-heading").html();
		contains(content, "EV: <b>9</b>");
	});

	test("should have correct illuminance with modified  light level", function () {
		arrange_default();
		app.viewmodel.light = 8;
		app.renderExposureHeading(document.getElementById("exposure-heading"));
		var content = $("#exposure-heading").html();
		contains(content, "Light level: 640");
	});

	test("should show film speed", function () {
		arrange_default();
		app.viewmodel.speed = 9;
		app.renderExposureHeading(document.getElementById("exposure-heading"));
		var content = $("#exposure-heading").html();
		contains(content, "at ISO 6400");
	});

	test("should show luminance units", function () {
		arrange_default();
		app.renderExposureHeading(document.getElementById("exposure-heading"));
		var content = $("#exposure-heading").html();
		contains(content, "(lux)");
	});
});
