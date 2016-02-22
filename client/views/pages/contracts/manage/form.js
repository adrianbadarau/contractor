/**
 * Created by adrianbadarau on 21/02/16.
 */
Template.contracts_manage_form.onCreated(function(){
    this.data.ocr_text = new ReactiveVar('');
    this.data.can_save = new ReactiveVar(0);
});

Template.contracts_manage_form.helpers({
    is_able_to_process: function () {
        return Session.get("last_uploaded_file");
    },
    contract_text : function(){
        return this.ocr_text.get();
    },
    cant_save : function(){
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
        Meteor.call("process_file",pdf_url,function(err, rez){
            console.log(err, rez);
            template.data.ocr_text.set('<pre id="contract_text">' + rez + '</pre>');
            template.data.can_save.set(1);
            var tep_id = Session.get('selected_template');
            if( tep_id!== 'undefined'){
                var ctnr = getPosition(tep_id,rez,'ctr_nr_field');
                Session.set('ctnr',ctnr);
                $('#c_number').val(ctnr);
                var ctclf = getPosition(tep_id,rez,'ctr_client_field');
                Session.set('ctclf',ctclf);
                $('#c_client').val(ctclf);
                var ctexp = getPosition(tep_id,rez,'ctr_expiration_date_field');
                Session.set('ctexp',ctexp);
                $('#c_expiration_date').val(ctexp);
            }
        });
    },
    'submit #contract_create_form' : function(event, template){
        event.preventDefault();
        var contract = {
            nr: $("#c_number").val(),
            client: $("#c_client").val(),
            expiration_date: $('#c_expiration_date').val(),
            text: $("#contract_text").text(),
            file_id: Session.get("last_uploaded_file")
        };
        Meteor.call("create_contract",contract,function(err, rez){
            if(! err ){
                delete Session.keys.last_uploaded_file;
                delete Session.keys.OCCR;
                Router.go("/")
            }
        })
    },
    'click .choose_type_btn': function (event, template) {
        event.preventDefault();
        var $this = $(event.target);
        this.document_type.set($this.data('type'));
        console.log($this.data('type'), this.document_type);
        Session.set("new_page",0);
    }
});

function getPosition(template_id, string, field_name){
    var c_template = ContractTemplates.findOne({_id:template_id});
    var nr_poz = string.indexOf(c_template[field_name])+c_template[field_name].length;
    console.log("Position",nr_poz);
    var c_t_nr = '';
    var max_nl = 0;
    for(var i= nr_poz; i< string.length;i++){
        if(max_nl > 1){
            break;
        }
        if(string[i] == "\n"){
            max_nl++;
        }
        c_t_nr+=string[i];
    }
    return c_t_nr;
}
