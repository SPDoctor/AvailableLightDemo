/// <reference path="../Scripts/viewmodel.js" />

$(function () {
	var $fixture = $("#qunit-fixture");
	module("Available Light model");
	var appKey = availablelight.appInfo.ID + "_";

	QUnit.moduleStart(function () {
	  app.viewmodel.speed = 4;
	  app.viewmodel.light = 5;
	  app.viewmodel.focalLength = 50;
	  app.viewmodel.sensorSize = 0;
	  app.viewmodel.imageStabilized = false;
	});

	test("should update EV with defaults", function () {
		equal(app.viewmodel.EV(), 6);
	});

	test("should update EV", function () {
		app.viewmodel.light = 7;
		equal(app.viewmodel.EV(), 8);
	});

	test("should update EV", function () {
		app.viewmodel.speed = 6;
		app.viewmodel.light = 6;
		equal(app.viewmodel.EV(), 9);
	});

	test("should update illuminance with defaults", function () {
		app.viewmodel.speed = 4;
		app.viewmodel.light = 5;
		equal(app.viewmodel.illuminance(), 80);
	});

	test("should update illuminance", function () {
		app.viewmodel.speed = 4;
		app.viewmodel.light = 7;
		equal(app.viewmodel.illuminance(), 320);
	});

	test("should update illuminance", function () {
		app.viewmodel.speed = 6;
		app.viewmodel.light = 6;
		equal(app.viewmodel.illuminance(), 160);
	});

	test("should update iso", function () {
		app.viewmodel.speed = 6;
		equal(app.viewmodel.iso(), "800");
	});

	test("should update settings with defaults", function () {
		app.viewmodel.speed = 4;
		app.viewmodel.light = 5;
		equal(app.viewmodel.settings().length, 13);
		equal(app.viewmodel.settings()[0].stop, "f/1");
		equal(app.viewmodel.settings()[0].shutter, "1/60s");
		equal(app.viewmodel.settings()[1].stop, "f/1.4");
		equal(app.viewmodel.settings()[1].shutter, "1/30s");
		equal(app.viewmodel.settings()[2].stop, "f/2");
		equal(app.viewmodel.settings()[2].shutter, "1/15s");
		equal(app.viewmodel.settings()[3].stop, "f/2.8");
		equal(app.viewmodel.settings()[3].shutter, "1/8s");
		equal(app.viewmodel.settings()[4].stop, "f/4");
		equal(app.viewmodel.settings()[4].shutter, "1/4s");
		equal(app.viewmodel.settings()[5].stop, "f/5.6");
		equal(app.viewmodel.settings()[5].shutter, "1/2s");
		equal(app.viewmodel.settings()[6].stop, "f/8");
		equal(app.viewmodel.settings()[6].shutter, "1s");
		equal(app.viewmodel.settings()[7].stop, "f/11");
		equal(app.viewmodel.settings()[7].shutter, "2s");
		equal(app.viewmodel.settings()[8].stop, "f/16");
		equal(app.viewmodel.settings()[8].shutter, "4s");
		equal(app.viewmodel.settings()[9].stop, "f/22");
		equal(app.viewmodel.settings()[9].shutter, "8s");
		equal(app.viewmodel.settings()[10].stop, "f/32");
		equal(app.viewmodel.settings()[10].shutter, "15s");
		equal(app.viewmodel.settings()[11].stop, "f/45");
		equal(app.viewmodel.settings()[11].shutter, "30s");
		equal(app.viewmodel.settings()[12].stop, "f/64");
		equal(app.viewmodel.settings()[12].shutter, "60s");
	});

	test("should update settings", function () {
		app.viewmodel.speed = 4;
		app.viewmodel.light = 7;
		equal(app.viewmodel.settings().length, 13);
		equal(app.viewmodel.settings()[0].stop, "f/1");
		equal(app.viewmodel.settings()[0].shutter, "1/250s");
		equal(app.viewmodel.settings()[1].stop, "f/1.4");
		equal(app.viewmodel.settings()[1].shutter, "1/125s");
		equal(app.viewmodel.settings()[2].stop, "f/2");
		equal(app.viewmodel.settings()[2].shutter, "1/60s");
		equal(app.viewmodel.settings()[3].stop, "f/2.8");
		equal(app.viewmodel.settings()[3].shutter, "1/30s");
		equal(app.viewmodel.settings()[4].stop, "f/4");
		equal(app.viewmodel.settings()[4].shutter, "1/15s");
		equal(app.viewmodel.settings()[5].stop, "f/5.6");
		equal(app.viewmodel.settings()[5].shutter, "1/8s");
		equal(app.viewmodel.settings()[6].stop, "f/8");
		equal(app.viewmodel.settings()[6].shutter, "1/4s");
		equal(app.viewmodel.settings()[7].stop, "f/11");
		equal(app.viewmodel.settings()[7].shutter, "1/2s");
		equal(app.viewmodel.settings()[8].stop, "f/16");
		equal(app.viewmodel.settings()[8].shutter, "1s");
		equal(app.viewmodel.settings()[9].stop, "f/22");
		equal(app.viewmodel.settings()[9].shutter, "2s");
		equal(app.viewmodel.settings()[10].stop, "f/32");
		equal(app.viewmodel.settings()[10].shutter, "4s");
		equal(app.viewmodel.settings()[11].stop, "f/45");
		equal(app.viewmodel.settings()[11].shutter, "8s");
		equal(app.viewmodel.settings()[12].stop, "f/64");
		equal(app.viewmodel.settings()[12].shutter, "15s");
	});

	test("should update settings", function () {
		app.viewmodel.speed = 6;
		app.viewmodel.light = 6;
		equal(app.viewmodel.settings().length, 13);
		equal(app.viewmodel.settings()[0].stop, "f/1");
		equal(app.viewmodel.settings()[0].shutter, "1/500s");
		equal(app.viewmodel.settings()[1].stop, "f/1.4");
		equal(app.viewmodel.settings()[1].shutter, "1/250s");
		equal(app.viewmodel.settings()[2].stop, "f/2");
		equal(app.viewmodel.settings()[2].shutter, "1/125s");
		equal(app.viewmodel.settings()[3].stop, "f/2.8");
		equal(app.viewmodel.settings()[3].shutter, "1/60s");
		equal(app.viewmodel.settings()[4].stop, "f/4");
		equal(app.viewmodel.settings()[4].shutter, "1/30s");
		equal(app.viewmodel.settings()[5].stop, "f/5.6");
		equal(app.viewmodel.settings()[5].shutter, "1/15s");
		equal(app.viewmodel.settings()[6].stop, "f/8");
		equal(app.viewmodel.settings()[6].shutter, "1/8s");
		equal(app.viewmodel.settings()[7].stop, "f/11");
		equal(app.viewmodel.settings()[7].shutter, "1/4s");
		equal(app.viewmodel.settings()[8].stop, "f/16");
		equal(app.viewmodel.settings()[8].shutter, "1/2s");
		equal(app.viewmodel.settings()[9].stop, "f/22");
		equal(app.viewmodel.settings()[9].shutter, "1s");
		equal(app.viewmodel.settings()[10].stop, "f/32");
		equal(app.viewmodel.settings()[10].shutter, "2s");
		equal(app.viewmodel.settings()[11].stop, "f/45");
		equal(app.viewmodel.settings()[11].shutter, "4s");
		equal(app.viewmodel.settings()[12].stop, "f/64");
		equal(app.viewmodel.settings()[12].shutter, "8s");
	});

	test("should update settings", function () {
		app.viewmodel.speed = 0;
		app.viewmodel.light = -6;
		equal(app.viewmodel.settings().length, 13);
		equal(app.viewmodel.settings()[0].stop, "f/1");
		equal(app.viewmodel.settings()[0].shutter, "8m");
		equal(app.viewmodel.settings()[1].stop, "f/1.4");
		equal(app.viewmodel.settings()[1].shutter, "15m");
		equal(app.viewmodel.settings()[2].stop, "f/2");
		equal(app.viewmodel.settings()[2].shutter, "30m");
		equal(app.viewmodel.settings()[3].stop, "f/2.8");
		equal(app.viewmodel.settings()[3].shutter, "1h");
		equal(app.viewmodel.settings()[4].stop, "f/4");
		equal(app.viewmodel.settings()[4].shutter, "2h");
		equal(app.viewmodel.settings()[5].stop, "f/5.6");
		equal(app.viewmodel.settings()[5].shutter, "4h");
		equal(app.viewmodel.settings()[6].stop, "f/8");
		equal(app.viewmodel.settings()[6].shutter, "8h");
		equal(app.viewmodel.settings()[7].stop, "f/11");
		equal(app.viewmodel.settings()[7].shutter, "15h");
		equal(app.viewmodel.settings()[8].stop, "f/16");
		equal(app.viewmodel.settings()[8].shutter, "30h");
		equal(app.viewmodel.settings()[9].stop, "f/22");
		equal(app.viewmodel.settings()[9].shutter, "60h");
		equal(app.viewmodel.settings()[10].stop, "f/32");
		equal(app.viewmodel.settings()[10].shutter, "120h");
		equal(app.viewmodel.settings()[11].stop, "f/45");
		equal(app.viewmodel.settings()[11].shutter, "250h");
		equal(app.viewmodel.settings()[12].stop, "f/64");
		equal(app.viewmodel.settings()[12].shutter, "500h");
	});

	test("should update settings", function () {
		app.viewmodel.speed = 9;
		app.viewmodel.light = 19;
		equal(app.viewmodel.settings().length, 13);
		equal(app.viewmodel.settings()[0].stop, "f/1");
		equal(app.viewmodel.settings()[0].shutter, "-");
		equal(app.viewmodel.settings()[1].stop, "f/1.4");
		equal(app.viewmodel.settings()[1].shutter, "-");
		equal(app.viewmodel.settings()[2].stop, "f/2");
		equal(app.viewmodel.settings()[2].shutter, "-");
		equal(app.viewmodel.settings()[3].stop, "f/2.8");
		equal(app.viewmodel.settings()[3].shutter, "-");
		equal(app.viewmodel.settings()[4].stop, "f/4");
		equal(app.viewmodel.settings()[4].shutter, "-");
		equal(app.viewmodel.settings()[5].stop, "f/5.6");
		equal(app.viewmodel.settings()[5].shutter, "-");
		equal(app.viewmodel.settings()[6].stop, "f/8");
		equal(app.viewmodel.settings()[6].shutter, "-");
		equal(app.viewmodel.settings()[7].stop, "f/11");
		equal(app.viewmodel.settings()[7].shutter, "-");
		equal(app.viewmodel.settings()[8].stop, "f/16");
		equal(app.viewmodel.settings()[8].shutter, "-");
		equal(app.viewmodel.settings()[9].stop, "f/22");
		equal(app.viewmodel.settings()[9].shutter, "-");
		equal(app.viewmodel.settings()[10].stop, "f/32");
		equal(app.viewmodel.settings()[10].shutter, "-");
		equal(app.viewmodel.settings()[11].stop, "f/45");
		equal(app.viewmodel.settings()[11].shutter, "-");
		equal(app.viewmodel.settings()[12].stop, "f/64");
		equal(app.viewmodel.settings()[12].shutter, "1/8000s");
	});

	test("should calculate minimum shutter speed index", function () {
		app.viewmodel.focalLength = 50;
		app.viewmodel.sensorSize = 0;
		app.viewmodel.imageStabilized = false;
		equal(app.viewmodel.comment(-5), "use tripod");
		equal(app.viewmodel.comment(0), "use tripod");
		equal(app.viewmodel.comment(1), "use tripod");
		equal(app.viewmodel.comment(2), "use tripod");
		equal(app.viewmodel.comment(2.5), "use tripod");
		equal(app.viewmodel.comment(3), "use tripod");
		equal(app.viewmodel.comment(3.5), "use tripod");
		equal(app.viewmodel.comment(4), "use support");
		equal(app.viewmodel.comment(4.5), "use support");
		equal(app.viewmodel.comment(5), "use support");
		equal(app.viewmodel.comment(5.123), "use support");
		equal(app.viewmodel.comment(5.5), "use support");
		equal(app.viewmodel.comment(5.6), "use support");
		equal(app.viewmodel.comment(5.7), "");
		equal(app.viewmodel.comment(6), "");
		equal(app.viewmodel.comment(7), "");
		equal(app.viewmodel.comment(8), "");
		equal(app.viewmodel.comment(9), "");
		equal(app.viewmodel.comment(10), "");
		equal(app.viewmodel.comment(20), "");
		equal(app.viewmodel.comment(30), "");
		equal(app.viewmodel.comment(300), "");
	});

	test("should calculate minimum shutter speed index with image stabilization", function () {
		app.viewmodel.focalLength = 50;
		app.viewmodel.sensorSize = 0;
		app.viewmodel.imageStabilized = true;
		equal(app.viewmodel.comment(-5), "use tripod");
		equal(app.viewmodel.comment(0), "use tripod");
		equal(app.viewmodel.comment(1), "use tripod");
		equal(app.viewmodel.comment(1.5), "use tripod");
		equal(app.viewmodel.comment(2), "use support");
		equal(app.viewmodel.comment(2.5), "use support");
		equal(app.viewmodel.comment(3), "use support");
		equal(app.viewmodel.comment(3.123), "use support");
		equal(app.viewmodel.comment(3.5), "use support");
		equal(app.viewmodel.comment(3.6), "use support");
		equal(app.viewmodel.comment(3.7), "");
		equal(app.viewmodel.comment(4), "");
		equal(app.viewmodel.comment(5), "");
		equal(app.viewmodel.comment(6), "");
		equal(app.viewmodel.comment(7), "");
		equal(app.viewmodel.comment(8), "");
		equal(app.viewmodel.comment(9), "");
		equal(app.viewmodel.comment(10), "");
		equal(app.viewmodel.comment(20), "");
		equal(app.viewmodel.comment(30), "");
		equal(app.viewmodel.comment(300), "");
	});

	test("should calculate minimum shutter speed index for APS-C", function () {
		app.viewmodel.focalLength = 50;
		app.viewmodel.sensorSize = -1;
		app.viewmodel.imageStabilized = false;
		equal(app.viewmodel.comment(-5), "use tripod");
		equal(app.viewmodel.comment(0), "use tripod");
		equal(app.viewmodel.comment(1), "use tripod");
		equal(app.viewmodel.comment(2), "use tripod");
		equal(app.viewmodel.comment(2.5), "use tripod");
		equal(app.viewmodel.comment(3), "use tripod");
		equal(app.viewmodel.comment(3.5), "use tripod");
		equal(app.viewmodel.comment(4), "use tripod");
		equal(app.viewmodel.comment(4.5), "use tripod");
		equal(app.viewmodel.comment(5), "use support");
		equal(app.viewmodel.comment(5.5), "use support");
		equal(app.viewmodel.comment(6), "use support");
		equal(app.viewmodel.comment(6.123), "use support");
		equal(app.viewmodel.comment(6.5), "use support");
		equal(app.viewmodel.comment(6.6), "use support");
		equal(app.viewmodel.comment(6.7), "");
		equal(app.viewmodel.comment(7), "");
		equal(app.viewmodel.comment(8), "");
		equal(app.viewmodel.comment(9), "");
		equal(app.viewmodel.comment(10), "");
		equal(app.viewmodel.comment(20), "");
		equal(app.viewmodel.comment(30), "");
		equal(app.viewmodel.comment(300), "");
	});

	test("should load settings", function () {
		localStorage.setItem(appKey + "light", "7");
		localStorage.setItem(appKey + "speed", "6");
		localStorage.setItem(appKey + "focalLength", "200");
		localStorage.setItem(appKey + "sensorSize", "1.1");
		localStorage.setItem(appKey + "imageStabilized", "true");
		app.viewmodel.light = 15;
		app.viewmodel.speed = 4;
		app.viewmodel.focalLength = 400;
		app.viewmodel.sensorSize = 0;
		app.viewmodel.imageStabilized = false;
		app.viewmodel.Persist("load");
		equal(app.viewmodel.light, 7);
		equal(app.viewmodel.speed, 6);
		equal(app.viewmodel.focalLength, 200);
		equal(app.viewmodel.sensorSize, 1.1);
		equal(app.viewmodel.imageStabilized, true);
	});

	test("should save settings", function () {
		app.viewmodel.light = 5;
		app.viewmodel.speed = 8;
		app.viewmodel.focalLength = 400;
		app.viewmodel.sensorSize = 1;
		app.viewmodel.imageStabilized = true;
		localStorage.removeItem(appKey + "light");
		localStorage.removeItem(appKey + "speed");
		localStorage.removeItem(appKey + "focalLength");
		localStorage.removeItem(appKey + "sensorSize");
		localStorage.removeItem(appKey + "imageStabilized");
		app.viewmodel.Persist("save");
		equal(localStorage.getItem(appKey + "light"), "5");
		equal(localStorage.getItem(appKey + "speed"), "8");
		equal(localStorage.getItem(appKey + "focalLength"), "400");
		equal(localStorage.getItem(appKey + "sensorSize"), "1");
		equal(localStorage.getItem(appKey + "imageStabilized"), "true");
	});

	test("should reset settings", function () {
		app.viewmodel.light = 5;
		app.viewmodel.Persist("save");
		equal(localStorage.getItem(appKey + "light"), "5");
		app.viewmodel.Persist("reset");
		equal(localStorage.getItem(appKey + "light"), null);
		equal(localStorage.getItem(appKey + "speed"), null);
		equal(localStorage.getItem(appKey + "focalLength"), null);
		equal(localStorage.getItem(appKey + "sensorSize"), null);
		equal(localStorage.getItem(appKey + "imageStabilized"), null);
	});

});
