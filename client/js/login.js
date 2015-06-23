Template.login.events({
	'click #connexion': function (event, template){
		 Meteor.loginWithPassword($('#email').val(), $('#pwd').val(), function (err) {
                if (err) {
                    console.log(err);
                } else {
                    event.preventDefault();

                    var role = Meteor.users.find({
                    	'emails.address':$('#email').val()
                    }).fetch();
                    $('.popup').hide();
                    $('.modal-backdrop').hide();
                    
                    
                    if(role[0].profile.role=='admin'){
                    	Router.go('/admin/' + role[0]._id);
                    } else {
                    	Router.go('/profil/' + role[0]._id);
                    }
		 			console.log("connected success");
                }
            });
	},

    'click #suivant': function (event, template){
        Meteor.call('getDevice', $('#macAddress').val(), function(err, result) {
            if (err){
                console.log(err);
            } else {
                console.log(result);
                if (typeof result == 'undefined' || result[0].firstTime == false){
                    $('#macAddress').addClass('Error');
                } else {
                    $('.corps').append('<span>Prénom :</span><input type="text" id="username" placeholder="Ex : Toto"><span>Nom :</span><input type="text" id="name" placeholder="Ex : Tata"></span><span>Email :</span><input type="text" id="mail" placeholder="Ex : nymphae@nymphae.fr"><span>Mot de passe :</span><input type="password" id="password" placeholder="****************">');
                    $('.corps').append("<button id='register'>S'enregistrer</button>");
                    $('#suivant').remove();
                }
            }
        });
        $('.modal-backdrop').css('opacity', 0);
    },

    'click #register': function (event, template){
        Accounts.createUser({
            password: $('#password').val(),
            name: $('#name').val(),
            'username': $('#username').val(),
            'email': $('#mail').val(),
            profile: {
                macAdress: $('#macAddress').val(),
                role: 'member'
            }
        });
        
        Meteor.call('updateDevice', $('#macAddress').val());

        Meteor.loginWithPassword($('#mail').val(), $('#password').val(), function (err) {
            if (err) {
                console.log(err);
            } else {
                event.preventDefault();

                var user = Meteor.users.find({
                    'emails.address':$('#mail').val()
                }).fetch();
                $('.popup').hide();
                $('.modal-backdrop').hide();
                Router.go('/profil/' + user[0]._id);
                console.log("connected success");
            }
        });
    }
});

Template.navProfil.events({
    'click #logout': function (event, template){
        Meteor.logout();
        Router.go('/');
    }
});