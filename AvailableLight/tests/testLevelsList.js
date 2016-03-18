/// <reference path="../Scripts/viewModel.js" />
/// <reference path="../Scripts/jquery-1.9.1.js" />

$(function () {
	var $fixture = $("#qunit-fixture");
	module("Available Light - LevelsList");

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
		app.renderIconList(document.getElementById("levels-list"), app.viewmodel.levels, app.viewmodel.light, app.select);
  }

	test("should have correct light level", function () {
	  arrange_default();
	  var content = $("#levels-list").html();
	  contains(content, '<img ');
	  contains(content, ' id="clicktarget"');
	  contains(content, ' class="icon-block"');
	  contains(content, ' src="images/starlight.jpg"');
	  contains(content, '<div class="label-medium">Landscape lit by starlight only</div>');
	});
});
