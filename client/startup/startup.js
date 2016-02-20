/**
 * Created by adrianbadarau on 20/02/16.
 */
Meteor.startup(function () {
    Meteor.call("get_uploads_dir", function(err, rez){
        if(err){
            throw Meteor.Error(500,"Could not call path method");
        }
        Session.set('uploads_path',rez);
    });
    FS.HTTP.setBaseUrl('/uploads');
    Accounts.ui.config({
        passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL"
    });
});
