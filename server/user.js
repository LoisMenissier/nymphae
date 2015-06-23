Meteor.methods({
    //Add user
    addUser: function (email, pwd, macAdress, username) {
        Accounts.createUser({
            password: pwd,
            'username': username,
            'email': email,
            profile: {
                macAdress: macAdress,
                role: 'member'
            }
        });
    },

    //Remove user
    removeUser: function (email) {
        Meteor.users.remove({
            'emails.address': email
        });
    },

    //Modify user
    modifyUser: function (email, name, pwd) {

    },

    //Find user by id
    findOneUserById: function (id) {
        return Meteor.users.find({
            _id: id
        }).fetch();
    },

    getAllUsers: function (){
        var user = Meteor.users.find({}).fetch();
        return user;
    }
})