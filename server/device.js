Meteor.methods({
	//Check first_time
	getAllDevices: function () {
        var macAddress = Meteor.http.call("GET", "http://localhost:3000/api/devices");
        return macAddress;
    },

    getDevice: function (macAddress) {
        var result = Devices.find({macAddress: {$in: [macAddress]}}).fetch();
        if (result.length >= 1){
        	return result;
        } else {
        	
        }
        console.log(result);
    },

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
    }
})