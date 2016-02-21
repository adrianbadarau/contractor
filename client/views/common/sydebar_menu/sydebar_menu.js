/**
 * Created by adrianbadarau on 21/02/16.
 */
Template.sydebar_menu.events({
    'click #sign_out': function (event, template) {
        event.preventDefault();
        AccountsTemplates.logout();
    }
});

AccountsTemplates.configure({
    onLogoutHook: function(){
        Router.go('/');
    },
    onSubmitHook: function (error, state) {
        if (!error) {
            if (state === "signIn") {
                // Successfully logged in
                Router.go('/');
            }
            if (state === "signUp") {
                // Successfully registered
                Router.go('/');
            }
        }
    }
});