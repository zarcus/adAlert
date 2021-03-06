/**
 * adAlert.js
 * Llibreria de funcions de adAlert
 * (c) 2013, moga 
**/

var WIN_MENU = "botonera";
var WIN_INFO_TELEFON = "infoTelefon"

var app = (function() {
    var phoneType = "";
    var deviceId = "";
    var deviceSoftwareVersion = "";
    var line1Number = "";
    var subscriberId = "";
    var simState = "";
    var simCountryIso = "";
    var simOperatorName = "";
    var simSerialNumber = "";
    var networkCountryIso = "";
    var networkOperator = "";
    var networkOperatorName = "";
	
	return {	
	    // Application Constructor
	    initialize: function() {
	        this.bindEvents();
	    },
	    // Bind Event Listeners
	    //
	    // Bind any events that are required on startup. Common events are:
	    // 'load', 'deviceready', 'offline', and 'online'.
	    bindEvents: function() {
	        document.addEventListener('deviceready', this.onDeviceReady, false);
	    },
	    // deviceready Event Handler
	    //
	    // The scope of 'this' is the event. In order to call the 'receivedEvent'
	    // function, we must explicity call 'app.receivedEvent(...);'
	    onDeviceReady: function() {	
	    	app.activa("botonera");
	    	
	        window.plugins.phoneinfoplugin.onSuccess = function(data) {
				if (data.action == "getPhoneInfo") {
				    phoneType = data.getPhoneType; 
				    deviceId = data.getDeviceId;
				    deviceSoftwareVersion = data.getDeviceSoftwareVersion; 
				    line1Number = data.getLine1Number; 
				    subscriberId = data.getSubscriberId;
				} else {
					if (data.action == "getSIMInfo") {
					    simState = data.getSimState;
					    simCountryIso = data.getSimCountryIso;
					    simOperatorName = data.getSimOperatorName;
					    simSerialNumber = data.getSimSerialNumber;
					} else {
					    networkCountryIso = data.getMetworkCountryIso;
					    networkOperator = data.getMetworkOperator;
					    networkOperatorName = data.getMetworkOperatorName;						
					}
				}
			};
			window.plugins.phoneinfoplugin.onError = function(data) { };
	    },
	    	    
	    // Man� prinicpal
	    menu: function() {
	    	app.activa(WIN_MENU);
	    },
	    
	    // Informaci� tel�fon
	    infoTelefon: function() {
	    	var div_res;
	    	
			window.plugins.phoneinfoplugin.getPhoneInfo();
			window.plugins.phoneinfoplugin.getSIMInfo();
			window.plugins.phoneinfoplugin.getNetworkInfo();
	
			div_res = _.template($("#infoTelefon_template").html());
			$("#infoTelefon").html(div_res({deviceName: device.name, 
			        deviceCordova: device.cordova, 
			        devicePlatform: device.platform, 
			        deviceUUID: device.uuid, 
			        deviceVersion: device.version, 
			        phoneType: phoneType,
			        deviceId: deviceId,
			        deviceSoftwareVersion: deviceSoftwareVersion, 
			        line1Number: line1Number,
			        subscriberId: subscriberId,
			        simState: simState,
			        simCountryIso: simCountryIso,
			        simOperatorName: simOperatorName,
			        simSerialNumber: simSerialNumber,
			        networkCountryIso: networkCountryIso,
			        networkOperator: networkOperator,
			        networkOperatorName: networkOperatorName} ));

			app.activa(WIN_INFO_TELEFON);
	    },
	    
	    activa: function(obj) {
	    	$("#botonera").hide();
	    	$("#infoTelefon").hide();
	    	
	    	$("#" + obj).show();
	    }
	    
	    
	}    
}());
