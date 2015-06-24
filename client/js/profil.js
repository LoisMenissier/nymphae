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
		console.log(Session.get('plants'));
		return Session.get('plants');
	}
});

Template.fichePlante.helpers({
	infoPlant: function(event){
		var path = Router.current().location.get().path;
		path = path.split("/");
		path = path.pop();
		Meteor.call('getInfosPerPlant', path, function(err, res){
			if (err){
				console.log(err);
			} else {
				console.log(path);
				Session.set('info', res);
			}
		});
console.log(Session.get('info'));
		return Session.get('info');
	}
});

Template.plant.events({
	'click .plant': function(event, template){
		Router.go('/profil/'+Meteor.userId()+'/mesPlantes/' + template.data[0]._id);
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