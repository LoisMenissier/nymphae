/**
 * @summary The events of a user profil
 */
Template.profil.events({
    /**
    * @summary Define the action on click to access to logout a user by id
    * @method 'click #logoutUser'
    * @memberOf Template.profil.events
    * @params event
    * @params template
    */
	'click #logoutUser': function (event, template){
		Meteor.logout();
		Session.keys={};
		Router.go('/');
	},
    /**
    * @summary Define the action on click to access to the profil of a user by id
    * @method 'click #profil'
    * @memberOf Template.profil.events
    * @params event
    * @params template
    */
	'click #profil': function (event, template){
        Router.go('/profil/'+Meteor.userId());
    },
    /**
    * @summary Define the action on click to access to the plants of a user by id
    * @method 'click #myPlants'
    * @memberOf Template.profil.events
    * @params event
    * @params template
    */
    'click #myPlants': function (event, template){
        Router.go('/profil/'+Meteor.userId()+'/mesPlantes');
    },
});
/**
 * @summary The helpers of a user profil
 */
Template.allPlants.helpers({
    /**
    * @summary Define the action on click to access to the plants of a user by id
    * @method 'click #myPlants'
    * @memberOf Template.allPlants.helpers
    * @returns {Object} Var of the plants of a user stocked in session  
    */
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
/**
 * @summary The helpers of the plants of a user
 */
Template.fichePlante.helpers({
    /**
    * @summary Define the action on click to access to the plants of a user by id
    * @method 'click #myPlants'
    * @memberOf Template.fichePlante.helpers
    * @params event
    * @params template
    */
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
/**
 * @summary The events of a plant of a user
 */
Template.plant.events({
    /**
    * @summary Define the action on click to access to the plant of a user by id on each
    * @method 'click .plant'
    * @memberOf Template.plant.events
    * @params event
    * @params template
    */
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
/**
 * @summary The callbacks to get all plants by modules
 */
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
    /**
    * @summary Update a profile of a user
    * @method "click #updateProfil"
    * @memberOf Template.profilUser.events
    * @params event
    * @params template
    */
    "click #updateProfil":function(event, template){
        Meteor.call('modifyUser', Meteor.userId(), template.$('#email').val(), template.$('#macAddress').val());
    }
});

/**
* @summary Create a plant
* @method Template.addPlant.created
*/
Template.addPlant.created=function(){
    Session.set("show-my-modal",false);
};

/**
* @summary Create a plant
*/
Template.addPlant.helpers({
    showModal:function(){
        return Session.get("show-my-modal");
    }
});

/**
* @summary Create a plant
*/
Template.addPlant.events({
    /**
    * @summary Close the slider (modal)
    * @method "click .close, click .cancel"
    * @memberOf Template.addPlant.events
    */
    "click .close, click .cancel":function(){
        Session.set("show-my-modal",false);
    },
    /**
    * @summary Update a profile of a user
    * @method "submit form"
    * @memberOf Template.addPlant.events
    * @params event
    * @params template
    */
    "submit form":function(event, template){
        event.preventDefault();
        //
        Session.set("show-my-modal",false);
    },
    /**
    * @summary Update a profile of a user
    * @method "click .show-my-modal-button"
    * @memberOf Template.addPlant.events
    * @params event
    * @params template
    */
    "click .show-my-modal-button":function(event, template){
        Session.set("show-my-modal",true);
    }
});
