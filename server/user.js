Meteor.methods({
    /**
    * @summary Add a user to the meteor database
    * @method addUser
    * @memberOf Meteor.methods
    * @instance
    * @param {String} The mail address of the user
    * @param {String} The password of the user
    * @param {String} The mac address currently associated to the user
    * @param {String} The uername
    */
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

    /**
    * @summary Delete a user from email
    * @method removeUser
    * @memberOf Meteor.methods
    * @instance
    * @param {String} The mail address of the user
    */
    removeUser: function (email) {
        Meteor.users.remove({
            'emails.address': email
        });
    },

    /**
    * @summary Modify a user by id
    * @method modifyUser
    * @memberOf Meteor.methods
    * @instance
    * @param {String} The id of the user
    * @param {String} The email of the user
    * @param {String} The mac address currently associated to the user
    */
    modifyUser: function (id, email, macAddress) {
        Meteor.users.update({_id : id}, {$set: {'emails.0.address': email, 'profile.macAddress': macAddress}});
    },

    /**
    * @summary Find a user by id
    * @method findOneUserById
    * @memberOf Meteor.methods
    * @instance
    * @param {String} The id of the user
    * @returns {Mixed} Array of objects Users
    */
    findOneUserById: function (id) {
        return Meteor.users.find({
            _id: id
        }).fetch();
    },

    /**
    * @summary Get all users
    * @method getAllUsers
    * @memberOf Meteor.methods
    * @instance
    * @returns {Mixed} Array of objects Users
    */
    getAllUsers: function (){
        var user = Meteor.users.find({}).fetch();
        return user;
    },

    /**
    * @summary Get the modules of a user by user id
    * @method getAllModules
    * @memberOf Meteor.methods
    * @instance
    * @param {String} The id of the user
    * @returns {Mixed} Array of objects Modules
    */
    getAllModules: function(id){
        var modules = Meteor.users.find({_id: id}).fetch();
        //console.log(modules[0].profile.modules);
        return modules[0].profile.modules;
    },

    /**
    * @summary Get the plants by modules
    * @method getPlantPerModule
    * @memberOf Meteor.methods
    * @instance
    * @param {String} The id of a module
    * @returns {String} The id of the plants associated to a module
    */
    getPlantPerModule: function (idModule){
        var module = Modules.find({_id: idModule}, {fields: {'idPlant':1, '_id': 0}}).fetch();
        //console.log(module[0].idPlant);
        return module[0].idPlant;
    },

    /**
    * @summary Get all infos by plant id
    * @method getInfosPerPlant
    * @memberOf Meteor.methods
    * @instance
    * @param {String} The id of the plant
    * @returns {Mixed} Array of objects
    */
    getInfosPerPlant: function (idPlant){
        var plante = Plants.find({_id: idPlant}).fetch();
        return plante;
    },

    /**
    * @summary Find a user by id
    * @method getAllPlantsNames
    * @memberOf Meteor.methods
    * @instance
    * @returns {Mixed} Array of objects
    */
    getAllPlantsNames: function(){
        var plants = Plants.find({}, {fields: {'name':1}});
    },

    /**
    * @summary Check the presence of a plant in a module
    * @method checkIfIdPlantExist
    * @memberOf Meteor.methods
    * @instance
    * @param {String} The id of the user
    * @param {String} The id of the module
    * @returns {Boolean}
    */
    checkIfIdPlantExist: function(idUser, idModule){
        var idPlant = Meteor.users.findOne({'_id': idUser, 'modules.0.idModule': idModule, 'modules.0.idPlant': {$exists: true}});
    }
})