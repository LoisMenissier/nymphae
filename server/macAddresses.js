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
    updateMacAddress: function (macAddress) {
    	macAddresses.update({
    		numMac:macAddress
    	},
    	{
    		$set:{
    			firstTime:false
    		}
    	})
    }
})