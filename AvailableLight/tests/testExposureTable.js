/// <reference path="../Scripts/viewModel.js" />
/// <reference path="../Scripts/jquery-1.9.1.js" />
var updateView = app.updateView || function () { };

$(function () {
	var $fixture = $("#qunit-fixture");
	module("Available Light - ExposureTable");
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
		app.renderExposureTable(document.getElementById("exposure-table"));
  }

	test("should render settings table heading", function () {
		arrange_default();
		var content = $("#exposure-table").html();
		contains(content, "<tr><td>f/1</td><td>-</td><td></td></tr>");
	});

	test("should render settings table for defaults", function () {
		arrange_default();
		var content = $("#exposure-table").html();
		contains(content, "<td>f/1</td><td>-</td><td></td>");
		contains(content, "<td>f/64</td><td>1/15s</td><td>use support</td>");
	});

	test("should render settings table for modified film speed and light level", function () {
		arrange_default();
		app.viewmodel.light = 8;
		app.renderExposureTable(document.getElementById("exposure-table"));
		var content = $("#exposure-table").html();
		contains(content, "<td>f/1</td><td>1/500s</td><td></td>");
		contains(content, "<td>f/64</td><td>8s</td><td>use tripod</td>");
	});
});
