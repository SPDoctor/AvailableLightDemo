/// <reference path="../Scripts/viewModel.js" />
/// <reference path="../Scripts/jquery-1.9.1.js" />
var updateView = app.updateView || function () { };

$(function () {
	var $fixture = $("#qunit-fixture");
	module("Available Light - Options");

	QUnit.moduleStart(function () {
	  app.viewmodel = new app.ViewModel();
	  app.viewmodel.speed = 4;
	  app.viewmodel.focalLength = 50;
	  app.viewmodel.sensorSize = 0;
	  app.viewmodel.imageStabilized = false;
	  app.renderSettings();
	});

	test("should have correct film speed", function () {
	  equal($("#select-speed").val(), 4);
	});

	test("should have correct film speed", function () {
		app.viewmodel.speed = 8;
		app.renderSettings();
		equal($("#select-speed").val(), 8);
	});

	test("should have correct focal length", function () {
	  equal($("#input-focal-length").val(), 50);
	});

	test("should have correct focal length", function () {
		app.viewmodel.focalLength = 35;
		app.renderSettings();
		equal($("#input-focal-length").val(), 35);
	});

	test("should have correct sensorSize", function () {
	  equal($("#select-sensor-size").val(), 0);
	});

	test("should have correct sensorSize", function () {
		app.viewmodel.sensorSize = 1;
		app.renderSettings();
		equal($("#select-sensor-size").val(), 1);
	});

	test("should have correct image stabilzation setting", function () {
	  equal($("#checkbox-image-stabilized")[0].checked, false);
	});

	test("should have correct image stabilzation setting", function () {
		app.viewmodel.imageStabilized = true;
		app.renderSettings();
		equal($("#checkbox-image-stabilized")[0].checked, true);
	});

});
