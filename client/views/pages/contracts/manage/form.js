/**
 * Created by adrianbadarau on 21/02/16.
 */
Template.contracts_manage_form.onCreated(function(){
    this.data.ocr_text = new ReactiveVar('');
    this.data.can_save = new ReactiveVar(0);
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
    },
    can_save : function(){
        return !this.can_save.get();
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
                    Meteor.call("update_file_path",Session.get("last_uploaded_file"), file.copies.files.key.slice(0,-3)+"tif", function(err,rez){console.log(err, rez)});
                    if(rez){
                        Meteor.call("process_pdf", img_to_prcess, function (err, rez) {
                            console.log(rez);
                            Session.set("OCRR", rez);
                            template.data.ocr_text.set('<pre id="contract_text">'+ rez +'</pre>');
                            template.data.can_save.set(1);
                        })
                    }
                });
            }
        });
    },
    'submit #contract_create_form' : function(event, template){
        event.preventDefault();
        var contract = {
            nr: $("#c_number").val(),
            client: $("#c_client").val(),
            expiration_date: $('#c_expiration_date').val(),
            text: $("#contract_text").text()
        };
        Meteor.call("create_contract",contract,function(err, rez){
            if(! err ){
                Router.go("/")
            }
        })
    }
});
