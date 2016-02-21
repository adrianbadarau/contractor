/**
 * Created by adrianbadarau on 21/02/16.
 */
Template.contracts_manage_form.onCreated(function(){
    this.data.ocr_text = new ReactiveVar('');
});

Template.contracts_manage_form.helpers({
    form_title: function () {
        return Template.parentData().title
    },
    is_create: function () {
        return Template.parentData().type === 'create';
    },
    is_able_to_process: function () {
        return Session.get("last_uploaded_file");
    },
    contract_text : function(){
        return this.ocr_text.get();
    }
});

Template.contracts_manage_form.events({
    'change #file_upload': function (event, template) {
        event.preventDefault();
        FS.Utility.eachFile(event, function (file) {
            Files.insert(file, function (err, fileObj) {
                console.log(fileObj);
                Session.set("last_uploaded_file", fileObj._id);
            });
        });
    },
    'click #process_image':function(event, template){
        event.preventDefault();
        var file = Files.findOne({_id: Session.get("last_uploaded_file")});
        var pdf_url = Session.get('uploads_path') + file.copies.files.key;
        Meteor.call("process_img", pdf_url, function(err, rez){
            console.log(err, rez);
            if(rez){
                var img_to_prcess = rez;
                Meteor.call("delete_old_img", pdf_url, function(err, rez){
                    console.log("Delet img: ",err, rez);
                    if(rez){
                        Meteor.call("process_pdf", img_to_prcess, function (err, rez) {
                            console.log(rez);
                            Session.set("OCRR", rez);
                            template.data.ocr_text.set('<pre id="contract_text">'+ rez +'</pre>');
                        })
                    }
                });
            }
        });
    }
});
