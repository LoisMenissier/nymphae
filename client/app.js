    $('head').prepend('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">');


    Template.home.events({
        'click #valid': function (event, template) {
            Meteor.loginWithPassword($('#email').val(), $('#pwd').val(), function (err, result) {
                console.log(result)
                if (err) {
                    console.log(err);
                    template.$("#pwd").addClass('error');
                } else {
                    event.preventDefault();
                    // Meteor.call("findOneUserByIdentify", template.$("#identify")[0].value, function (err, response) {
                    //     $('.cd-popup').removeClass('is-visible');
                    //     console.log(response);
                    //     Router.go("/dashboard/" + response._id);
                    // });
                    console.log("connected success");
                }
            });
        }
    });

    Template.admin.events({
        'click #create': function (e) {
            console.log($('#pwdUser').val());
            Meteor.call('addUser', "", $('#pwdUser').val(), "", function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("created success")
                }
            });
        }
    })