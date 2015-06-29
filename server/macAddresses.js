Meteor.methods({
    /**
    * @summary Check the boolean firstTime of a record in the collection Devices
    * @method checkFirstTime
    * @memberOf Meteor.methods
    * @instance
    * @param {String} The Mac Address we want to validate
    * @returns {Boolean}
    */
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

    /**
    * @summary Update the mac address of a device of a user.
    * @method updateMacAddress
    * @memberOf Meteor.methods
    * @instance
    * @param {String} The old mac address
    * @param {String} The new mac address we want to set
    */
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