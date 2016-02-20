/**
 * Created by adrianbadarau on 20/02/16.
 */
Meteor.startup(function () {
    exec = Npm.require("child_process").exec;
    root_path = process.env.PWD;
    FS.HTTP.setBaseUrl('/uploads');
});