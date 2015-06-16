Template.home.events({
	'click #valid': function (e, template){
		 Meteor.loginWithPassword(" ", $('#pwd').val(), function (err) {
                if (err) {
                    console.log(err);
                    template.$("#pwd").addClass('error');
                } else {
                    event.preventDefault();
                    // Meteor.call("findOneUserByIdentify", template.$("#identify")[0].value, function (err, response) {
                    //     $('.cd-popup').removeClass('is-visible');
                    //     console.log(response);
                    //     Router.go("/dashboard/" + response._id);
                    // });
		 			console.log("connected success");
                }
            });
	}
});

Template.admin.events({
	'click #create': function (e){
		console.log($('#pwdUser').val());
		Meteor.call('addUser', "aze", $('#pwdUser').val(), "gdsg@dfs.com", function(err){
			if (err) {console.log(err)}
				else{console.log("created success")}
		});
	}
})
