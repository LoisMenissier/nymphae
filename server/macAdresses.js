Meteor.methods({
	//Check first_time
	 checkFirstTime: function (macAdress) {
        var mac= macAdresses.find({
        	numMac:macAdress
        }).fetch();
        if (mac.firstTime==true){
        	return true;
        } else {
        	return false;
        }
    },

    //Update macAdress
    updateMacAdress: function (macAdress) {
    	macAdresses.update({
    		numMac:macAdress
    	},
    	{
    		$set:{
    			firstTime:false
    		}
    	})
    }
})