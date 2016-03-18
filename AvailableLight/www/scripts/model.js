var app = app || {};
"use strict";

app.Model = function () {
	function log2(x) {
		return Math.log(x) / Math.log(2);
	}

	return {
		levels: [
			{ value: "-6", image: "images/starlight.jpg", text: "Landscape lit by starlight only" },
			{ value: "-5", image: "images/moonlight.jpg", text: "Landscape lit by crescent moon" },
			{ value: "-4", image: "images/startrails.jpg", text: "Meteors, close-up lit by full moon, landscape lit by half moon" },
			{ value: "-3", image: "images/moonlithorses.jpg", text: "Landscape lit by full moon" },
			{ value: "-2", image: "images/snowscape.jpg", text: "Snowscape lit by full moon" },
			{ value: "-1", image: "images/typewriter.jpg", text: "Subject lit by dim or indirect artificial light" },
			{ value: "0", image: "images/weaklight.jpg", text: "Subject lit by weak artificial light" },
			{ value: "1", image: "images/floodlitbuildings.jpg", text: "Distant view of city skyline or floodlit buildings" },
			{ value: "2", image: "images/lightning.jpg", text: "Lightning (open shutter), lunar eclipse" },
			{ value: "3", image: "images/fireworks.jpg", text: "Fireworks (open shutter), Christmas lights" },
			{ value: "4", image: "images/streetlight.jpg", text: "Subjects by candle light, floodlit buildings and structures" },
			{ value: "5", image: "images/kitchen.jpg", text: "Domestic interiors at night, subject lit by campfire or bonfire" },
			{ value: "6", image: "images/fairground.jpg", text: "Brightly lit domestic interiors at night, computer screens, fairgrounds" },
			{ value: "7", image: "images/forest.jpg", text: "Brightly lit streets, indoor sports, stage shows, circuses, dense forest" },
			{ value: "8", image: "images/casino.jpg", text: "Brightly lit shop windows, bonfires, floodlit sports, bright fluorescent lighting" },
			{ value: "9", image: "images/twilight.jpg", text: "Skylines 10 minutes after sunset, neon lights, stage lighting, spotlighting" },
			{ value: "10", image: "images/aftersunset.jpg", text: "Skylines immediately after sunset, subjects in deep shade" },
			{ value: "11", image: "images/sunset.jpg", text: "Sunsets, subject in open shade" },
			{ value: "12", image: "images/overcast.jpg", text: "Subject in heavy overcast (sun location not visible)" },
			{ value: "13", image: "images/skyline.jpg", text: "Subject in bright daylight (no shadows)" },
			{ value: "14", image: "images/moon.jpg", text: "Subject in weak, hazy sun, full moon (as subject)" },
			{ value: "15", image: "images/shadows.jpg", text: "Bright or strong hazy sun (distinct, sharp shadows)" },
			{ value: "16", image: "images/snow.jpg", text: "Subject in bright sunlight on light sand or snow" },
			{ value: "17", image: "images/brightsunlight.jpg", text: "White buildings or subjects in bright sunlight" },
			{ value: "18", image: "images/mercurylamp.jpg", text: "Subject lit by high pressure mercury vapor lamp" },
			{ value: "19", image: "images/sunbed.jpg", text: "Subject lit by high intensity xenon arc lamp" }
		],
		conditions: [
			{ value: "-6", text: "starlight", notes: "Use a tripod and an exposure of several minutes or more to get star trails." },
			{ value: "-5", text: "crescent moon" },
			{ value: "-4", text: "meteors", notes: "Because phenomena like meteors are fleeting and unpredictable, the normal practice is to open the camera shutter and wait for the event. Aim for the aperture setting that corresponds to 1 to 4 seconds." },
			{ value: "-4", text: "half moon" },
			{ value: "-3", text: "landscape in full moon" },
			{ value: "-2", text: "snowscape in full moon" },
			{ value: "-1", text: "indirect artificial light" },
			{ value: "0", text: "weak artificial light" },
			{ value: "1", text: "night skyline" },
			{ value: "2", text: "lightning" },
			{ value: "2", text: "lunar eclipse" },
			{ value: "3", text: "fireworks", notes: "Either use the exposure table or use a tripod and open the shutter using the aperture recommended for 1 to 4 seconds." },
			{ value: "3", text: "christmas lights" },
			{ value: "3", text: "festive lights" },
			{ value: "3", text: "fairy lights" },
			{ value: "4", text: "floodlit building" },
			{ value: "4", text: "candle" },
			{ value: "5", text: "interior" },
			{ value: "5", text: "subject lit by campfire" },
			{ value: "5", text: "subject lit by bonfire" },
			{ value: "6", text: "computer screen", notes: "Computer screens are usually static so use a tripod and a long exposure (e.g. 1/4 s) to avoid banding caused by scanning on old CRT (Cathode Ray Tube) displays." },
			{ value: "6", text: "fairground", notes: "Use a tripod and long exposure to get patterns from lights on moving fairground rides" },
			{ value: "6", text: "amusement park", notes: "Use a tripod and long exposure to get patterns from lights on moving fairground rides" },
			{ value: "7", text: "streetlight" },
			{ value: "7", text: "brightly lit interior" },
			{ value: "7", text: "indoor sport" },
			{ value: "7", text: "stage show" },
			{ value: "7", text: "circus" },
			{ value: "7", text: "dense forest" },
			{ value: "8", text: "fluorescent lighting" },
			{ value: "8", text: "floodlight" },
			{ value: "5", text: "campfire", notes: "Use a short exposure (1/60s or less) if you want to capture the detail of the flames." },
			{ value: "5", text: "bonfire", notes: "Use a short exposure (1/60s or less) if you want to capture the detail of the flames." },
			{ value: "8", text: "shop window" },
			{ value: "9", text: "neon lights" },
			{ value: "9", text: "sunset" },
			{ value: "9", text: "stage lighting" },
			{ value: "9", text: "spotlight" },
			{ value: "10", text: "sunset" },
			{ value: "10", text: "deep shade" },
			{ value: "11", text: "shade" },
			{ value: "12", text: "overcast" },
			{ value: "13", text: "bright daylight" },
			{ value: "14", text: "weak sunlight" },
			{ value: "14", text: "cloudy" },
			{ value: "14", text: "moon (as subject)", notes: "Unless you want a white disc, the correct exposure for the moon is an object in sunlight - because that's what it is!" },
			{ value: "15", text: "hazy sun" },
			{ value: "15", text: "hazy sunlight" },
			{ value: "16", text: "snow" },
			{ value: "17", text: "bright sunlight" },
			{ value: "17", text: "building in bright sunlight" },
			{ value: "18", text: "mercury vapor lamp" },
			{ value: "19", text: "xenon lamp" },
			{ value: "19", text: "arc lamp" }
		],
		speeds: [
		{ value: "0", text: "12" },
		{ value: "1", text: "25" },
		{ value: "2", text: "50" },
		{ value: "3", text: "100" },
		{ value: "4", text: "200" },
		{ value: "5", text: "400" },
		{ value: "6", text: "800" },
		{ value: "7", text: "1600" },
		{ value: "8", text: "3200" },
		{ value: "9", text: "6400" }
		],
		sensorSizes: [
		{ value: "-4", text: "1/2.5" },
		{ value: "-3.2", text: "1/1.8" },
		{ value: "-3.1", text: "1/1.7" },
		{ value: "-3", text: "1/1.6" },
		{ value: "-2", text: "2/3" },
		{ value: "-0.9", text: "4/3" },
		{ value: "-1", text: "APS-C" },
		{ value: "-0.5", text: "APS-H" },
		{ value: "0", text: "35mm" },
		{ value: "0.9", text: "120" },
		{ value: "1", text: "6x7 (cm)" },
		{ value: "1.1", text: "6x9 (cm)" },
		{ value: "1.6", text: "4x5 (in)" },
		{ value: "2", text: "5x7 (in)" },
		{ value: "2.5", text: "8x10 (in)" }
		],
		stops: ["f/1", "f/1.4", "f/2", "f/2.8", "f/4", "f/5.6", "f/8", "f/11", "f/16", "f/22", "f/32", "f/45", "f/64"],
		shutterSpeeds: ["500h", "250h", "120h", "60h", "30h", "15h", "8h", "4h", "2h", "1h", "30m", "15m", "8m", "4m", "2m", "60s", "30s", "15s",
		"8s", "4s", "2s", "1s", "1/2s", "1/4s", "1/8s", "1/15s", "1/30s", "1/60s", "1/125s", "1/250s", "1/500s", "1/1000s", "1/2000s", "1/4000s", "1/8000s",
		"-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
		comment: function (speed, focalLength, sensorSize, imageStabilized) {
			var min = log2(focalLength) - sensorSize;
			if (imageStabilized) min -= 2;
			if (speed > min) return "";
			else if (speed + 2 > min) return "use support";
			else return "use tripod";
		},
		EV: function (light, speed) {
			return +light + +speed - 3;
		},
		illuminance: function (light) {
			return Math.pow(2.0, +light) * 2.5;
		}
	}
};
