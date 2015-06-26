Template.profil.events({
	'click #logoutUser': function (event, template){
		Meteor.logout();
		Session.keys={};
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
/*	noExist: function(){
		console.log(check());

		console.log(Session.get('noExist'));
		return Session.get("noExist");
	}*/
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
		return Session.get('info');
	}
});

Template.plant.events({
	'click .plant': function(event, template){
		Router.go('/profil/'+Meteor.userId()+'/mesPlantes/' + template.data[0]._id);
	}
});

/*function check(){
	Session.set("noExist", undefined);
	Meteor.call('getAllModules', Meteor.userId(), function(err, response){
			if(err) console.log(err);
			else{
				var arrayExist = new Array();
				for (var i = 0; i < response.length; i++) {
					if(typeof response[i].idPlant == "undefined"){
						arrayExist.push(response[0].idModule);
						if(arrayExist.length == response.length){
							console.log("test");
						}
					}
				}
			return arrayExist;

			}
		});
}*/

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


Template.profilUser.events({
    "click #updateProfil":function(event, template){
        Meteor.call('modifyUser', Meteor.userId(), template.$('#email').val(), template.$('#macAddress').val());
    }
});

Template.addPlant.created=function(){
    Session.set("show-my-modal",false);
};

Template.addPlant.helpers({
    showModal:function(){
        return Session.get("show-my-modal");
    }
});

Template.addPlant.events({
    "click .close, click .cancel":function(){
        Session.set("show-my-modal",false);
    },

    "submit form":function(event, template){
        event.preventDefault();
        //
        Session.set("show-my-modal",false);
    },

    "click .show-my-modal-button":function(event, template){
        Session.set("show-my-modal",true);
    }
});
