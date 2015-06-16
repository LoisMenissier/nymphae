 Meteor.startup(function () {
    Users.insert({
    	name: "TestNymphae",
    	pwd: "admin",
    	email: "test@test.com",

    });

    Devices.insert({
    	id: "ER6R3",
    	idModule:[{
    		id:001
    	},{
    		id:002
    	}]
    });
  });