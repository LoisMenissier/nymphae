Template.admin.helpers({
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
    showModal:function(){
        return Session.get("show-my-modal");
    }
});

Template.updateMacAddressAdmin.events({
    "click .close, click .cancel":function(){
        Session.set("show-my-modal",false);
    },
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
    "click .show-my-modal-button":function(event, template){
        Session.set("show-my-modal",true);
    }
});