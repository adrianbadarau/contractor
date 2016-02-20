/**
 * Created by adrianbadarau on 20/02/16.
 */
Contracts = new Mongo.Collection('contracts');
Contracts.allow({
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