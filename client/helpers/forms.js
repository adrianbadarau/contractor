/**
 * Created by adrianbadarau on 22/02/16.
 */
UI.registerHelper('form_title', function () {
    return Template.parentData().title;
});
UI.registerHelper('is_create', function () {
    return Template.parentData().type === 'create'
});