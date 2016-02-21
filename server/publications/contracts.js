/**
 * Created by adrianbadarau on 21/02/16.
 */
Meteor.publish('contracts', function () {
    return Contracts.find({});
});

Meteor.methods({
    create_contract: function (contract) {
        return Contracts.insert(contract);
    }
});