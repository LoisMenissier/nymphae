//Configuration
Router.configure({
    layoutTemplate: 'layout',
    //loadingTemplate: 'loading',
    // notFoundTemplate: 'notFound'
});

//Main route
Router.route('/', {
    name: 'home'
});

//Profile user
Router.route('/profil/:_id', {
    name: 'profilUser',
    layoutTemplate: 'profil'
});

//Profile admin
Router.route('/admin/:_id', {
    name: 'admin',
});

//SAV == After-sales service in french
Router.route('/profile/:_id/sav', {
    name: 'aftss'
});

//History
Router.route('/profile/:_id/historique', {
    name: 'history',
});

//Contact
Router.route('/contact', {
    name: 'contact',
});

//Plantes user
Router.route('/profil/:_id/mesPlantes', {
    name: 'allPlants',
    layoutTemplate: 'profil'
});

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
