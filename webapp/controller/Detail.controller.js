sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (Controller, History) {
	"use strict";
	return Controller.extend("nw.sapui5democrud.controller.Detail", {
		onInit: function () {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
			// this.getView().bindElement({
			// 	path: "/Invoices/" + oEvent.getParameter("arguments").invoicePath,
			// 	model: "invoice"
			// });
			this.getView().bindElement({
					path: this.getOwnerComponent().getModel("pathModel").getProperty("/path"),
					model: "invoice"
				});
		},
        onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("RouteMaster", {}, true);
			}
		}
	});
});