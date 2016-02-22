/**
 * Created by adrianbadarau on 22/02/16.
 */
Template.select_contract_templates.onCreated(function () {
    var instance = this;
    this.data.ctr_temps = new ReactiveVar([]);
    instance.autorun(function () {
        var subscription = instance.subscribe('contract_templates');
        if(subscription.ready()){
            instance.data.ctr_temps.set(ContractTemplates.find({}))
        }
    })
});
Template.select_contract_templates.helpers({
    ctr_templates: function () {
        return this.ctr_temps.get()
    }
});
Template.select_contract_templates.events({
    'change #contract_templates_select': function (event, template) {
        event.preventDefault();
        $this = $(event.target);
        Session.set("selected_template", $this.val())
    }
});