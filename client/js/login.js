Template.login.events({
	'click .valid': function (event, template){
		 Meteor.loginWithPassword($('#email').val(), $('#pwd').val(), function (err) {
                if (err) {
                    console.log(err);
                } else {
                    event.preventDefault();

                    var role = Meteor.users.find({
                    	'emails.address':$('#email').val()
                    }).fetch();
                    
                    
                    if(role[0].profile.role=='admin'){
                    	Router.go('/admin/' + role[0]._id);
                    } else {
                    	Router.go('/profile/' + role[0]._id);
                    }
		 			console.log("connected success");
                }
            });
	}
});