if (Meteor.isServer) {
  Meteor.startup(function () {

    // All values listed below are default
    collectionApi = new CollectionAPI({
      authToken: undefined,              // Require this string to be passed in on each request
      apiPath: 'api',          // API path prefix
      standAlone: false,                 // Run as a stand-alone HTTP(S) server
      allowCORS: false,                  // Allow CORS (Cross-Origin Resource Sharing)
      sslEnabled: false,                 // Disable/Enable SSL (stand-alone only)
      listenPort: 3005,                  // Port to listen to (stand-alone only)
      listenHost: undefined,             // Host to bind to (stand-alone only)
      privateKeyFile: 'privatekey.pem',  // SSL private key file (only used if SSL is enabled)
      certificateFile: 'certificate.pem' // SSL certificate key file (only used if SSL is enabled)
    });

    // Add the collection MacAdresses to the API "/macaddresses" path
    collectionApi.addCollection(MacAddresses, 'macaddresses', {
      // All values listed below are default
      authToken: undefined,     // Require this string to be passed in on each request
      methods: ['POST'],  // Allow creating
      before: {
      // This methods, if defined, will be called before the POST/GET/PUT/DELETE actions are performed on the collection.
      // If the function returns false the action will be canceled, if you return true the action will take place.
      // function(obj, requestMetadata, returnObject) {do everything you wanna; returnObject.success = true; returnObject.statusCode = 201; returnObject.body = {"satus": "success"}; return true;},
      // You must return true and set returnObject.success = true, if you want to return the statusCode and body to client! If you return false it will works like ordinary api.
        POST: function(obj, requestMetadata, returnObject) {
			// always set returnObject.success = true, if you want handle it by yourself!
			returnObject.success = true;
			if(obj.hasOwnProperty('numMac')){
				var foundMacAddr = MacAddresses.find({
		        	numMac:obj.numMac
		        }).fetch();
				if(foundMacAddr.length > 0){ // Is found
					returnObject.statusCode = 204;
				}
				else {
					MacAddresses.insert({
						numMac: obj.numMac,
						firstTime: false
					});
					returnObject.statusCode = 201;
				}
			} else {
				returnObject.statusCode = 500;
			}
			return true;
    	}
      },
      after: {  // This methods, if defined, will be called after the POST/GET/PUT/DELETE actions are performed on the collection.
                // Generally, you don't need this, unless you have global variable to reflect data inside collection.
                // The function doesn't need return value.
        		//POST: function() {console.log("After POST");},
      }
    });

    // Starts the API server
    collectionApi.start();
  });
}