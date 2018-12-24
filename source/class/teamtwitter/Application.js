/* ************************************************************************

   Copyright:

   License:

   Authors:

 ************************************************************************ */

/**
 * This is the main application class of your custom application "teamtwitter"
 * 
 * @asset(teamtwitter/*)
 */
qx.Class.define("teamtwitter.Application", {
	extend : qx.application.Standalone,

	/*
	 * ****************************************************************************
	 * MEMBERS
	 * ****************************************************************************
	 */

	members : {
		/**
		 * This method contains the initial application code and gets called
		 * during startup of the application
		 * 
		 * @lint ignoreDeprecated(alert)
		 */
		/*_tableModel : null,
		_rpc : null,
		COL_COUNT : 3,
		*/
		/*loadData : function(){
			var rows = [];
			if (this._tableModel != null && this._rpc != null ){
				this.info("loadData :  this._tableModel != null && this._rpc != null");
				var rowData = this._rpc.callSync("loadAllSongs");
				if (rowData.length > 0){
					this.info("loadData : rowData.length > 0 ");
					this.info("loadData : rowData "+ rowData);
				}
				else{
					this.info("loadData : rowData empty");
				}
				
				for(index in rowData){
					var eachRow = [];
					var row = rowData[index];
					eachRow.push(row.id);
					eachRow.push(row.name);
					eachRow.push(row.author);
					rows.push(eachRow);
				}*/
				/*for (var row = 0; row < rowCount; row++)
			      {
			        var row1 = [];
			        for (var i = 0; i < this.COL_COUNT; i++) {
			          row1.push("Cell " + i + "x" + row);
			        }
			        rowData.push(row1);
			      }
				if(rowData.length > 0 ){
					
				}
				*/
				
			/*}
			return rows;
		},*/
		
		/*displayData : function(data){
			if (this._tableModel != null && data.length > 0){
				this._tableModel.setData(data);
			}
		},*/
		
		
		createRandomRows: function(rowCount)
	    {
	      var rowData = [];
	      for (var row = 0; row < rowCount; row++)
	      {
	        var row1 = [];
	        for (var i = 0; i < 3; i++) {
	          row1.push("Cell " + i + "x" + row);
	        }
	        rowData.push(row1);
	      }
	      return rowData;
	    },
		
		main : function() {
			// Call super class
			this.base(arguments);

			// Enable logging in debug variant
			if (qx.core.Environment.get("qx.debug")) {
				// support native logging capabilities, e.g. Firebug for Firefox
				qx.log.appender.Native;
				// support additional cross-browser console. Press F7 to toggle
				// visibility
				qx.log.appender.Console;
			}

			/*
			 * -------------------------------------------------------------------------
			 * Below is your actual application code...
			 * -------------------------------------------------------------------------
			 */

			// Create a button
			/*
			 * var button1 = new qx.ui.form.Button("First Button",
			 * "teamtwitter/test.png");
			 *  // Document is the application root var doc = this.getRoot();
			 *  // Add button to document at fixed coordinates doc.add(button1,
			 * {left: 100, top: 50});
			 *  // Add an event listener button1.addListener("execute",
			 * function(e) { alert("Hello World!"); });
			 */
			this.getRoot().add(new teamtwitter.ui.MainWidget() , {
				left : 10,
				top : 11
			});
			
		}
		
	}
});
