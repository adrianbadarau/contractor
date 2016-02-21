/**
 * Created by adrianbadarau on 22/02/16.
 */

Template.contract_templates_manage_form.helpers({

});

Template.contract_templates_manage_form.events({
    'submit #contract_template_form': function (event, template) {
        event.preventDefault();
        var contract_template = {
            name: $('#t_name').val(),
            ctr_nr_field: $('#t_ctr_nr').val(),
            ctr_client_field: $('#t_ctr_client').val(),
            ctr_expiration_date_field: $('#t_ctr_expiration_d').val()
        };

        Meteor.call("create_contract_template", contract_template, function(err, rez){
            if(!err){
                Router.go('contract_templates_edit', {_id: rez})
            }
        })
    }
});

Template.contract_templates_manage_form.onCreated(function () {
    console.log(Template.parentData())
});