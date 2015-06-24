Template.profil.events({
	'click #logoutUser': function (event, template){
		Meteor.logout();
		Router.go('/');
	},

	'click #profil': function (event, template){
        Router.go('/profil/'+Meteor.userId());
    },

    'click #myPlants': function (event, template){
        Router.go('/profil/'+Meteor.userId()+'/mesPlantes');
    },
});
Template.allPlants.helpers({
	plants: function(){
		callBacks();
		return Session.get('plants');
	}
});

function callBacks() {
	Meteor.call('getAllModules', Meteor.userId(), function(err, response){
		
		if (err){
			console.log(err);
		} else {
			var arrayPlants = new Array();
			for (var i = 0; i < response.length; i++) {
				Meteor.call('getPlantPerModule', response[i].idModule, function(err, result){
					if (err){
						console.log(err);
					} else {
						Meteor.call('getInfosPerPlant', result, function(err, res){
							if (err){
								console.log(err);
							} else {
								arrayPlants.push(res);
								if(arrayPlants.length == response.length){
									Session.set('plants', arrayPlants);
								}
							}
						});

					}
				});
				
			};
		}
		
	});
	
}