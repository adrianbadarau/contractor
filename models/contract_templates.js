/**
 * Created by adrianbadarau on 22/02/16.
 */
ContractTemplates = new Mongo.Collection('contract_templates');

ContractTemplates.allow({
    insert:function(userId, doc){
        return userId
    },
    update: function (userId, doc, fields, modifier){
        return userId
    },
    remove: function (userId, doc) {
        return userId
    }
});