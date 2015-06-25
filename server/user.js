Meteor.methods({
    //Add user
    addUser: function (email, pwd, macAddress, username) {
        Accounts.createUser({
            password: pwd,
            'username': username,
            'email': email,
            profile: {
                macAddress: macAddress,
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
    modifyUser: function (id, email, macAddress) {
        Meteor.users.update({_id : id}, {$set: {'emails.0.address': email, 'profile.macAddress': macAddress}});
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
    },

    getAllModules: function(id){
        var modules = Meteor.users.find({_id: id}).fetch();
        //console.log(modules[0].profile.modules);
        return modules[0].profile.modules;
    },

    getPlantPerModule: function (idModule){
        var module = Modules.find({_id: idModule}, {fields: {'idPlant':1, '_id': 0}}).fetch();
        //console.log(module[0].idPlant);
        return module[0].idPlant;
    },

    getInfosPerPlant: function (idPlant){
        var plante = Plants.find({_id: idPlant}).fetch();
        console.log(plante);
        return plante;
    },

    getAllPlantsNames: function(){
        var plants = Plants.find({}, {fields: {'name':1}});
        console.log(plants);
    }
})