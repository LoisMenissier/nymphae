Meteor.methods({
	//Check first_time
	 checkFirstTime: function (macAddress) {
        var mac= macAddresses.find({
        	numMac:macAddress
        }).fetch();
        if (mac.firstTime==true){
        	return true;
        } else {
        	return false;
        }
    },

    //Update macAddress
    updateMacAddress: function (oldMacAddress, newMacAddress) {
        var oldMac = oldMacAddress;
        var newMac = newMacAddress;
        var device = Devices.findOne({"macAddress": oldMac});
        console.log(device);

        Devices.update({
    		 "macAddress" : oldMac
    	},
    	{
    		$set:{
    			"macAddress" : newMac
    		}
    	}
        );

       Meteor.users.update({
             "profile.macAddress" : oldMac
        },
        {
            $set:{
                "profile.macAddress" : newMac
            }
        }
        );
    }
})