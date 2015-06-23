Meteor.methods({
	//Check first_time
	getAllDevices: function () {
        var macAdress = Meteor.http.call("GET", "http://localhost:3000/api/devices");
        return macAdress;
    },

    getDevice: function (macAdress) {
        var result = Devices.find({macAdress: {$in: [macAdress]}}).fetch();
        if (result.length >= 1){
        	return result;
        } else {
        	
        }
        console.log(result);
    },

    updateDevice: function (macAdress) {
    	Devices.update(
            { 
                macAdress : macAdress 
            },
            {
                $set: {
                    firstTime : false
                }
            }
        )
    }
})