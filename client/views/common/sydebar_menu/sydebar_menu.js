/**
 * Created by adrianbadarau on 21/02/16.
 */
Template.sydebar_menu.events({
    'click #sign_out': function (event, template) {
        event.preventDefault();
        AccountsTemplates.logout();
    }
});