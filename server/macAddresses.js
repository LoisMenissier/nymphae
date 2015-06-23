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
    	macAddresses.update({
    		macAdress:oldMacAddress
    	},
    	{
    		$set:{
    			macAdress:newMacAddress
    		}
    	})
    }
})