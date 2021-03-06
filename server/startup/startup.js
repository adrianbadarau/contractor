/**
 * Created by adrianbadarau on 20/02/16.
 */
Meteor.startup(function () {
    Future = Npm.require('fibers/future')
    exec = Npm.require("child_process").exec;
    textract = Npm.require('textract');
    root_path = process.env.PWD;

    if(Meteor.users.find({profile:{userType: 'admin'}}).count() === 0){
        Accounts.createUser({
            password: 'admin',
            email: 'admin@admin',
            profile: {
                userType: 'admin'
            }
        });

        Accounts.createUser({
            password: 'admin',
            email: 'staff@staff',
            profile: {
                userType: 'staff'
            }
        });
    }
});