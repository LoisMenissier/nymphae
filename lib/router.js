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