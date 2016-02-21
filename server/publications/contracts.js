/**
 * Created by adrianbadarau on 21/02/16.
 */
Meteor.publish('contracts', function () {
    return Contracts.find({});
});
