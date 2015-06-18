Meteor.methods({
	//Add user
	 addUser: function (name, pwd, email) {
         var ussername = Meteor.users.find().count() + 1;
        Accounts.createUser({
             'name': name,
            'email': email,
            username: "Nymphi"+ussername,
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
        var user = Meteor.users.find({_id: id, role: role});
        if(user.profile.role == "admin"){ return true }else{ return false }
    }
})