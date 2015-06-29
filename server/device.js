Meteor.methods({
	//Check first_time

    /**
    * @summary Get all the devices from the API.
    * @method getAllDevices
    * @memberOf Meteor.methods
    * @instance
    * @returns {String} JSON from the API of all listed devices.
    */
	getAllDevices: function () {
        var macAddress = Meteor.http.call("GET", "http://localhost:3000/api/devices");
        return macAddress;
    },

    /**
    * @summary Update the mac address of a device of a user.
    * @method getDevice
    * @memberOf Meteor.methods
    * @instance
    * @param {String} The mac address
    * @returns {Object} All the datas associated to the mac addresse.
    */
    getDevice: function (macAddress) {
        var result = Devices.find({macAddress: {$in: [macAddress]}}).fetch();
        if (result.length >= 1){
        	return result;
        } else {
        	
        }
        console.log(result);
    },

    /**
    * @summary Update the mac address of a device.
    * @method updateDevice
    * @memberOf Meteor.methods
    * @instance
    * @param {String} The new mac address we want to set.
    */
    updateDevice: function (macAddress) {
    	Devices.update(
            { 
                macAddress : macAddress 
            },
            {
                $set: {
                    firstTime : false
                }
            }
        )
    },

    /**
    * ?????
    * @summary Update the mac address of a device.
    * @method changeMacAddressDevice
    * @memberOf Meteor.methods
    * @instance
    * @param {String} The new mac address we want to set
    */
    changeMacAddressDevice: function (macAddress) {
        Devices.update(
            { 
                macAddress : macAddress 
            },
            {
                $set: {
                    firstTime : false
                }
            }
        )
    }
})