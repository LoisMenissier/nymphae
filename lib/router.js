//Configuration
Router.configure({
    layoutTemplate: 'layout',
    //loadingTemplate: 'loading',
    // notFoundTemplate: 'notFound'
});

//Main route
Router.route('/', {
    name: 'home',
});

//Route login
Router.route('/login', {
    name: 'login'
});

//Route register
Router.route('/register', {
    name: 'register'
});

//Profile user
Router.route('/profile/:_id', {
    name: 'profile',
    data: function () {
        var id = this.params._id;

        Meteor.call('findOneUserByIdAndRole', id, function (err, response) {
            Session.set('user', response);
        });
        return Session.get('user');
    }
});

//Profile admin
Router.route('/admin/:_id', {
    name: 'admin',
    data: function () {
        var id = this.params._id;

        Meteor.call('findOneUserByIdAndRole', id, function (err, response) {
            Session.set('user', response);
        });
        return Session.get('user');
    }
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
