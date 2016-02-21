/**
 * Created by adrianbadarau on 22/02/16.
 */
Meteor.publish('contract_templates', function () {
    return ContractTemplates.find({})
});

Meteor.methods({
    create_contract_template: function (contract_template) {
        var now = new Date();
        contract_template.created_at = now;
        contract_template.updated_at = now;

        return ContractTemplates.insert(contract_template);
    }
});