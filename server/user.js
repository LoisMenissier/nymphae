Meteor.methods({
	//Add user
	 addUser: function (name, pwd, email) {
        Users.insert({
            'name': name,
            'pwd': pwd,
            'email': email
        });

        Accounts.createUser({
            username: " ",
            password: pwd
        });
    },
    
    //Remove user
    removeUser: function (email) {
        return Users.remove({
            'email': email
        });
    },

    //Modify user
    modifyUser: function(email, name, pwd){

    }
})