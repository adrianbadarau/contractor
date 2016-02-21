/**
 * Created by adrianbadarau on 21/02/16.
 */
Meteor.publish('files', function () {
    return Files.find({});
});

Meteor.methods({
    update_file_path : function (file_id,new_path){
        return Files.update({_id:file_id},{
            $set:{
                "copies.files.key":new_path,
                "copies.files.type":"image/tiff",
                "copies.files.updatedAt": new Date()
            }
        });
    }
});