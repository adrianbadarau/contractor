/**
 * Created by adrianbadarau on 21/02/16.
 */
Meteor.publish('files', function () {
    return Files.find({});
});