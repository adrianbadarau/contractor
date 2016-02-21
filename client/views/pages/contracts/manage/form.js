/**
 * Created by adrianbadarau on 21/02/16.
 */
Template.contracts_manage_form.helpers({
    form_title: function(){
        return Template.parentData().title
    },
    is_create: function(){
        return Template.parentData().type === 'create' ;
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
        })
    }
});
