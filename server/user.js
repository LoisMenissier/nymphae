Meteor.methods({
	//Add user
	 addUser: function (name, pwd, email) {
        Accounts.createUser({
             'name': name,
            'email': email,
            username: " ",
            password: pwd,
             profile: {
	            role: 'member'
	        }
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

    },
    
    //Find user by id
    findOneUserById: function (id){
        return Meteor.users.find({_id: id}).fetch();
    },
    
    //Find user by id and role
    findOneUserByIdAndRole: function(id, role){
        Meteor.users.find
    }
})