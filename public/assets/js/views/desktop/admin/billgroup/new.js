define([
    'models/billgroup',
    'text!templates/desktop/admin/billgroup/new.html',
    'backbone'
], function (BillGroupModel, aTemplate) {
    var aView = Backbone.View.extend({
        template:_.template(aTemplate),
        events:{
            "click #create_new_billgroup_btn":'CreateBillGroup'
        },
        initialize:function () {
            _.bindAll(this, 'render', 'CreateBillGroup');
            this.render();
        },
        render:function () {
            $(this.options.el).html(this.template());
        },
        CreateBillGroup: function() {
            console.log('create bill group');
            var groupName = $("#new_billgroup_name_input").val();
            if(groupName.length < 5) {
                alert('Group name must be longer than 5 characters.');
            } else {
            var newGroup = new BillGroupModel({name: groupName});
            newGroup.save({}, {
                error:function (m, r) {
                    if(r.status == 409) {
                        console.log('Duplicate!');
                        alert('Error, there is already a billing group with the same name.');
                    } else {
                    console.log("error, response: " + JSON.stringify(r));
                    alert('failed to create new bill group!, error: ' + JSON.stringify(r));
                    }
                },
                success:function (m, r) {
                    console.log("success, response: " + JSON.stringify(r));
                    console.log('model saved, model: ', m);
//                    finalTemplate = _.template(aTemplate_step_final);
//                    myEl.html(finalTemplate());
                    window.location.hash = "admin/billgroup/edit/" + newGroup.get('id');
                    //window.location.hash = "/po";
                }
            });
            }
            return false;
        }
    });
    return aView;
});
