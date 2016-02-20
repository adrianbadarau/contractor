/**
 * Created by adrianbadarau on 20/02/16.
 */
Meteor.methods({
    get_root_path:function(){
        return root_path;
    },
    get_uploads_dir: function () {
        return root_path+"/public/uploads/files"
    }
});