/**
 * @summary Configuration of the router
 */
Router.configure({
    layoutTemplate: 'layout',
    //loadingTemplate: 'loading',
    // notFoundTemplate: 'notFound'
});

/**
 * @summary Route for home
 */
Router.route('/', {
    name: 'home'
});

/**
 * @summary Route the profile by id
 */
Router.route('/profil/:_id', {
    name: 'profilUser',
    layoutTemplate: 'profil',
    data: function() {
        /*templateData = { 
            user : Meteor.users.find({_id : this.params._id})
        };*/
        return Meteor.users.findOne({_id : this.params._id});
    }
});

/**
 * @summary Route an admin by id
 */
Router.route('/admin/:_id', {
    name: 'admin',
});

/**
 * @summary Route by id to the page to handle SAV == After-sales service in french 
 */
Router.route('/profile/:_id/sav', {
    name: 'aftss'
});

/**
 * @summary Route to the history by id 
 */
Router.route('/profile/:_id/historique', {
    name: 'history',
});

/**
 * @summary Route to the contact page
 */
Router.route('/contact', {
    name: 'contact',
});

/**
 * @summary Route Route to the plants of a user 
 */
Router.route('/profil/:_id/mesPlantes', {
    name: 'allPlants',
    layoutTemplate: 'profil'
});

/**
 * @summary Route to a plant of a user
 */
Router.route('/profil/:_id/mesPlantes/:plante', {
    name: 'fichePlante',
    layoutTemplate: 'profil'
});


//Evolution
/*Router.route('/profile/:_id/evolution', {
    name: 'home',
});*/


var requireLogin = function () {
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('notFound');
        }
    } else {
        this.next();
    }
}

var requireLoginAdmin = function () {
    if (!Meteor.user()) {
        if (Meteor.loggingIn() && Meteor.user().profile.role == 'admin') {
            this.render(this.loadingTemplate);
        } else {
            this.render('notFound');
        }
    } else {
        this.next();
    }
}

Router.onBeforeAction(requireLoginAdmin, {
    only: 'admin'
});

Router.onBeforeAction(requireLogin, {
    only: ['profile','aftss', 'history']
});

Router.onBeforeAction('dataNotFound', {
    only: ['profile', 'admin']
});
