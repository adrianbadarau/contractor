/**
 * Created by adrianbadarau on 20/02/16.
 */
Meteor.methods({
    get_root_path:function(){
        return root_path;
    },
    get_uploads_dir: function () {
        return root_path+"/.meteor/local/cfs/files/files/"
    },
    process_file: function (pdf_path) {
        this.unblock();
        var future = new Future;
        textract.fromFileWithPath(pdf_path, {preserveLineBreaks:true},function(err, text){
            if(err){
                throw new Meteor.Error(500, err);
            }
            future.return(text);
        });

        return future.wait();
    }
});