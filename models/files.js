/**
 * Created by adrianbadarau on 20/02/16.
 */
Files = new FS.Collection("files", {
    stores: [new FS.Store.FileSystem("files")]
});

Files.allow({
    insert:function(userId, doc){
        return userId
    },
    update: function (userId, doc, fields, modifier){
        return userId
    },
    remove: function (userId, doc) {
        return userId
    },
    download:function(){
        return true;
    }
});