Template.admin.helpers({
    /**
    * @summary Get all users who are admin
    * @method users
    * @memberOf Template.admin.helpers
    */
	users: function(){
		console.log("function begin");
		Meteor.call('getAllUsers', function(err, response){
			if(err){ console.log(err); }
			//console.log(response);
			Session.set('t',response);
		});

		return Session.get('t');
	}
});

Template.admin.events({
    /**
    * @summary Delete a admin
    * @method 'click #delete'
    * @memberOf Template.admin.events
    * @params event
    * @params template
    */
	'click #delete': function (event, template){
		Meteor.call('removeUser', this.emails[0].address);
		console.log(this.emails[0].address);
		window.location.reload();
	}
});

Template.updateMacAddressAdmin.created=function(){
    Session.set("show-my-modal",false);
};

Template.updateMacAddressAdmin.helpers({
    /**
    * @summary Update a profile of a user
    * @method "submit form"
    * @returns {Boolean} The modal status 
    */
    showModal:function(){
        return Session.get("show-my-modal");
    }
});

Template.updateMacAddressAdmin.events({
    /**
    * @summary Close the modal on click on close
    * @method "click .close, click .cancel"
    * @memberOf Template.updateMacAddressAdmin.events
    */
    "click .close, click .cancel":function(){
        Session.set("show-my-modal",false);
    },
    /**
    * @summary Submit the update of mac addresses from the admin
    * @method "submit form"
    * @memberOf Template.updateMacAddressAdmin.events
    * @params event
    * @params template
    */
    "submit form":function(event, template){
        event.preventDefault();
        //
        Session.set("show-my-modal",false);

        
        //Call updateMacAddress server's method
        Meteor.call('updateMacAddress', template.data.profile.macAddress, template.$('#updatingMAC').val(), function(err){
        	if (err){
        		console.log(err);
        	}
        });
    }
});

Template.data.events({
    /**
    * @summary Update a profile of a user
    * @method "submit form"
    * @memberOf Template.addPlant.events
    * @params event
    * @params template
    */
    "click .show-my-modal-button":function(event, template){
        Session.set("show-my-modal",true);
    }
});