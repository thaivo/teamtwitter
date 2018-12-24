/**
 * 
 */

qx.Class.define("teamtwitter.ui.MainWidget",{
	extend : qx.ui.groupbox.GroupBox,
	//extend : qx.application.Standalone,
	statics : {
		LOCALHOST : window.location.host,
		PROTOCOL : window.location.protocol
	},
	
	construct : function(){
		this.base(arguments);
		//this.setLayout(new qx.ui.layout.VBox());
		this.initRpc(this.self(arguments).LOCALHOST, this.self(arguments).PROTOCOL);
		this._initLayout();
		//this.addListener("changeValue", this.usersClicked);
		},
	
	members : {
		_rpc : null,
		_tableModel : null,
		initRpc : function(host , proto){
			this._rpc = new qx.io.remote.Rpc();
			this._rpc.setCrossDomain(true);
			this._rpc.setTimeout(100000000);
			//var webURL = proto + "//" + host + "/teamtwitter/.qxrpc";
			var webURL = proto + "//" + host + "/teamtwitter/.qxrpc";
			this._rpc.setUrl(webURL);
			this._rpc.setServiceName("SongService");
		},
		callSync : function(funcName, params){
			this._rpc.setCrossDomain(false);
			var result;
			if(typeof(params) === 'undefined'){
				result = this._rpc.callSync(funcName);
			}
			else{
				result = this._rpc.callSync(funcName,params);
			}
			return result;
		},
		
		callAsync : function(handler, funcName, params){
			this._rpc.setCrossDomain(true);
			
			//_rpc.callAsync(handler, "echo", "Test");
			//this.info("loadData :  this._tableModel != null && this._rpc != null");
			var result;
			if(typeof(params) === 'undefined'){
				result = this._rpc.callAsync(handler, funcName);
			}
			else{
				result = this._rpc.callSync(handler ,funcName,params);
			}
			
			return result;
			
		},
		
		createRandomRows: function(rowCount){
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
	_initLayout : function(){
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
		var flowLayout = new qx.ui.layout.Flow();
		flowLayout.setAlignX("center");

		var windowContainer = new qx.ui.window.Window("Music Manager",
				"icon/22/actions/dialog-cancel.png");
		windowContainer.setLayout(flowLayout);
		windowContainer.setPadding(10, 10, 10, 10);
		windowContainer.setBackgroundColor("white");
		windowContainer.setVisibility("visible");
		windowContainer.setHeight(400);
		windowContainer.setWidth(600);
		/*this.getRoot().add(windowContainer, {
			left : 10,
			top : 11
		});*/
		// labels = ["Name", "Author"];

		windowContainer.add(new qx.ui.basic.Label("Name :"));
		songTextField = new qx.ui.form.TextField();
		songTextField.setRequired(true);
		windowContainer.add(songTextField, {
			lineBreak : true
		});
		windowContainer.add(new qx.ui.basic.Label("Author :"));
		authorTextField = new qx.ui.form.TextField()
		authorTextField.setRequired(true);
		windowContainer.add(authorTextField, {
			lineBreak : true
		});

		// buttons
		var paneLayout = new qx.ui.layout.HBox().set({
			spacing : 20,
			alignX : "left"
		});
		var buttonPane = new qx.ui.container.Composite(paneLayout).set({
			paddingTop : 11
		});
		windowContainer.add(buttonPane, {
			lineBreak : true
		});

		okButton = new qx.ui.form.Button("Add",
				"icon/22/actions/dialog-apply.png");
		okButton.addState("default");
		var that = this;
		okButton.addListener("execute", function(e) {
			try {
				var nameOfSong = songTextField.getValue();
				var author = authorTextField.getValue();
				var songInfo = new Object();
				/*songInfo.name = nameOfSong
				songInfo.author = author;*/
				var songInfo = {
						"name" : nameOfSong,
						"author" : author
				};
				//var result = rpc.callSync("sayHello", "Hello to qooxdoo World!");
				//alert("Result of sync call: " + rpc.getUrl() + rpc.getServiceName());
				var result = that.callSync("insertSong", songInfo);
				alert("Result of sync call: " + result);
			} catch (exc) {
				alert("Exception during sync call: " + exc);
			}
		});

		buttonPane.add(okButton);

		deleteButton = new qx.ui.form.Button("Delete",
				"icon/22/actions/dialog-cancel.png");
		deleteButton.addListener("execute", function(e) {
			if ( that._rpc != null ){
				var showDetails = function(details) {
				    alert(
				        "origin: " + details.origin +
				        "; code: " + details.code +
				        "; message: " + details.message
				    );
				};
				var handler = function(result, exc) {
				    if (exc == null) {
				    	var rowData = result["songs"];
				    	var rows = [];
				    	for(var index = 0; index < rowData.length; index++){
							var eachRow = [];
							var row = rowData[index];
							eachRow.push(row["id"]);
							eachRow.push(row["name"]);
							eachRow.push(row["author"]);
							rows.push(eachRow);
						}
				    	that._tableModel.setData(rows);
				        alert("Result of async call: " + result);
				    } else {
				    	showDetails(exc);
				        //alert("Exception during async call: " + exc);
				        //alert("Exception during async call: " + result["songs"]);
				        
				    }
				};
				that.callAsync(handler,"loadAllSongs");	
				
				/*var ret = that.callSync("loadAllSongs");
				//alert("Exception during sync call: " + exc);
				alert("1111111" + ret["songs"]);
				if (ret === null || ret === 'undefined'){
					alert("ret null");
				}
				var rowData = ret["songs"];
				var rows = [];
				for(var index = 0; index < rowData.length; index++){
					var eachRow = [];
					var row = rowData[index];
					eachRow.push(row["id"]);
					eachRow.push(row["name"]);
					eachRow.push(row["author"]);
					rows.push(eachRow);
				}
				that._tableModel.setData(rows);
				*/
				//alert("222222");
			}
		});
		buttonPane.add(deleteButton);

		// get the data for the table
		// var rowData = this.getRecords();
		//var rowData = {};
		// create the table model, set the data, and set the column options
		this._tableModel = new qx.ui.table.model.Simple();
		this._tableModel.setColumns([ "Id","Name", "Author" ]);
		if ( this._rpc != null ){
			var showDetails = function(details) {
			    alert(
			        "origin: " + details.origin +
			        "; code: " + details.code +
			        "; message: " + details.message
			    );
			};
			var handler = function(result, exc) {
			    if (exc == null) {
			    	var rowData = result["songs"];
			    	var rows = [];
			    	for(var index = 0; index < rowData.length; index++){
						var eachRow = [];
						var row = rowData[index];
						eachRow.push(row["id"]);
						eachRow.push(row["name"]);
						eachRow.push(row["author"]);
						rows.push(eachRow);
					}
			    	that._tableModel.setData(rows);
			        //alert("Result of async call: " + result);
			    } else {
			    	showDetails(exc);
			        //alert("Exception during async call: " + exc);
			        //alert("Exception during async call: " + result["songs"]);
			        
			    }
			};
			this.callAsync(handler,"loadAllSongs");
			
			/*var ret = this.callSync("loadAllSongs");
			//alert("Exception during sync call: " + exc);
			//alert("1111111");
			var rowData = ret["songs"];
			var rows = [];
			for(var index = 0; index < rowData.length; index++){
				var eachRow = [];
				var row = rowData[index];
				eachRow.push(row["id"]);
				eachRow.push(row["name"]);
				eachRow.push(row["author"]);
				rows.push(eachRow);
			}
			*/
			/*for (var row = 0; row < rowCount; row++)
		      {
		        var row1 = [];
		        for (var i = 0; i < 3; i++) {
		          row1.push("Cell " + i + "x" + row);
		        }
		        rowData.push(row1);
		      }
			if(rowData.length > 0 ){
				
			}
			*/
			
			
		}
		//_tableModel.setData(rows);
		
		
		
		
		
		//var rowData = this.createRandomRows(3);
		//_tableModel.setData(rowData)
		
		this._tableModel.setColumnEditable(1, true);
		// create the table and set the table model
		var table = new qx.ui.table.Table(this._tableModel);
		table.set({
			width : 500,
			height : 200,
			decorator : null
		});
		// allow multiple row selection
		table.getSelectionModel().setSelectionMode(
				qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);

		// customize the column rendering
		var tcm = table.getTableColumnModel();
		// Display a checkbox cell renderer in column 3
		// tcm.setDataCellRenderer(3, new
		// qx.ui.table.cellrenderer.Boolean());
		// Display icon in the header using header renderer for column 2
		// tcm.setHeaderCellRenderer(2, new qx.ui.table.headerrenderer.
		// Icon("icon/16/apps/office-calendar.png", "Joining Date"));

		windowContainer.add(table, {
			lineBreak : true
		});
	}
	}
	
});