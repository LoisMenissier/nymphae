Template.login.events({
	'click .valid': function (){
		 Meteor.loginWithPassword($('#email').val(), $('#pwd').val(), function (err) {
                if (err) {
                    console.log(err);
                } else {
                    event.preventDefault();
                    //todo: Check role
                    var role=Meteor.users.find({
                    	'emails':email,
                    	'password':pwd
                    }).fetch();
                    if(role.profile.role=='admin'){
                    	Router.go('/admin/' + role._id);
                    } else {
                    	Router.go('/profile/' + role._id);
                    }
		 			console.log("connected success");
                }
            });
	}
});