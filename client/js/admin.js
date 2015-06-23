Template.admin.helpers({
	users: function(){
		console.log("function begin");
		Meteor.call('getAllUsers', function(err, response){
			if(err){ console.log(err); }
			console.log(response);
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
})