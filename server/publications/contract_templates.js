/**
 * Created by adrianbadarau on 22/02/16.
 */
Meteor.publish('contract_templates', function () {
    return ContractTemplates.find({})
});
