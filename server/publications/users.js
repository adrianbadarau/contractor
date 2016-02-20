/**
 * Created by adrianbadarau on 21/02/16.
 */
Meteor.publish('users', function () {
    console.log("Server Log: publishing all users");
    return Meteor.users.find();
});
