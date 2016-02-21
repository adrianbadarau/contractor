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
    process_pdf: function (file_path) {
        this.unblock();
        console.log("SERVER: ", file_path);
        var txt = Async.runSync(function (done) {
            options = {
                binary: Meteor.settings.ocr_bin
            };
            tesseract.process(file_path, options, function (err, text) {
                if (err) {
                    console.log(err);
                } else {
                    done(null, text)
                }
            });
        });
        return txt.result;
    },
    process_img:function(img){
        this.unblock();
        var rez = Async.runSync(function(done){
            var command = "convert "+img+" -resize 400% -type Grayscale "+img.slice(0,-3)+"tif";
            exec(command,function(error,stdout,stderr){
                if(error){
                    console.log(error);
                    throw new Meteor.Error(500,command+" failed");

                }
                if(stderr){
                    console.log(stderr);
                    throw new Meteor.Error(500,command+" failed");
                }
                console.log(stdout);
                done(null,img.slice(0,-3)+"tif");
            });
        });
        return rez.result;
    },
    delete_old_img:function(img){
        this.unblock();
        var rez = Async.runSync(function (done) {
            var command = "rm "+img;
            exec(command, function(error, stdout, stderr){
                if(error){
                    console.log(error);
                    throw new Meteor.Error(500, command+" failed");
                }
                if(stderr){
                    console.log(stderr);
                    throw new Meteor.Error(500, command+" failed");
                }
                done(null, "Success");
            });
        });
        return rez.result;
    }
});