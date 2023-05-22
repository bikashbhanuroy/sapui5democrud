sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataModel, MessageBox, Fragment) {
        "use strict";

        return Controller.extend("nw.sapui5democrud.controller.Master", {
            onInit: function () {
                var that = this;
                var odataModel = new ODataModel("/V2/(S(4v03bfpjrejawmqbuhnu2ykc))/OData/OData.svc");
                odataModel.read("/Products", {
                    success: function (oData, oResponse) {
                        MessageBox.success("Success");

                    },
                    error: function (oError) {
                        MessageBox.error("Error");
                    }
                });
                this.getView().setModel(odataModel,"nwModel");
            },
            updateData: function(){
                var list = this.getView().byId("list");
                var selItem = list.getSelectedItem();
                var title = selItem.getTitle();
                var description = selItem.getDescription();
                var Name = this.getView().byId("nameinput").getValue();
                var payload = {
                    ID: parseInt(title),
                    Name: Name
                };

                var path = "/Categories(" + title + ")";
                var odataModel = this.getView().getModel("nwModel");
                // @ts-ignore
                odataModel.update(path,payload,{
                    headers:{
                        "Content-ID":"1"
                    },
                    success: function(data,response){
                        MessageBox.success("Successfully Updated");
                    },
                    error: function(error){
                        MessageBox.error("Error while updating the data");
                    }
                });
            },
            createData: function(){
                var ID = this.getView().byId("idinput").getValue();
                var Name = this.getView().byId("nameinput").getValue();
                var data = {
                    ID: parseInt(ID),
                    Name: Name
                };
                var odataModel = this.getView().getModel("nwModel");
                odataModel.create("/Categories", data, {
                    headers:{
                        "Content-ID":"1"
                    },
                    success: function(data, response){
                        MessageBox.success("Data successfully created");
                    },
                    error: function(error){
                        MessageBox.error("Error while creating the data");
                    }
                });
            },
            deleteData: function(){
                var list = this.getView().byId("list");
                var selItem = list.getSelectedItem();
                var title = selItem.getTitle();
                var path = "/Categories(" + title + ")"; ///Categories(3);
                var odataModel = this.getView().getModel("nwModel");
                odataModel.remove(path,{
                    headers:{
                        "Content-ID":"1"
                    },
                    success: function(data,response){
                        MessageBox.success("Deleted data");
                    },
                    error: function(error){
                        MessageBox.error("Deletion failed");
                    }
                })
            },
            onOpenDialog : function () {

                // create dialog lazily
                if (!this.pDialog) {
                    // this.pDialog = this.loadFragment({
                    //     name: "nw.sapui5democrud.view.fragments.HelloDialog"
                    // });
                    this.pDialog = sap.ui.xmlfragment("hello","nw.sapui5democrud.view.fragments.HelloDialog", this);
                    this.getView().addDependent(this.pDialog);
                } 
                this.pDialog.open();
                // this.pDialog.then(function(oDialog) {
                //     oDialog.open();
                // });
            },
            onCloseDialog : function () {
                // note: We don't need to chain to the pDialog promise, since this event-handler
                // is only called from within the loaded dialog itself.
                Fragment.byId("hello","helloDialog").close();
            }
        });
    });
