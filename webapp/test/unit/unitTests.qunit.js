/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"nw/sapui5democrud/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
