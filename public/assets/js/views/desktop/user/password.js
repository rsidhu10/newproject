define([
    'text!templates/desktop/users/password.html',
    'backbone'
], function (EditUserTemplate) {

    var EditUserView = Backbone.View.extend({
        template:_.template(EditUserTemplate),
        events: {
            "click #button_save_password": "updatePassword"
        },
        initialize: function () {
            console.log('init');
            _.bindAll(this, 'render', 'updatePassword');
            this.render();
        },
        updatePassword: function() {
            console.log('updatePassword');
            $("#button_save_password").button('Please wait');

            input_current_password = $("#input_current_password").val();
            input_password_1 = $("#input_password_1").val();
            input_password_2 = $("#input_password_2").val();

            var ChangePasswordModel = Backbone.Model.extend({
                defaults : {
                },
                url : function() {
                    return '/changepassword';
                }
            });

            var newPassword = new ChangePasswordModel({
                input_current_password: input_current_password,
                input_password_1: input_password_1,
                input_password_2: input_password_2
            });

            newPassword.save({}, {
                error:function (m, r) {
                    console.log("error changing password, response: " + JSON.stringify(r));
//                    $("#new_user_create_btn").button('reset');
                },
                success:function (m, r) {
                    console.log("password changed: " + JSON.stringify(r));
//                    finalTemplate = _.template(aTemplate_step_final);
//                    myEl.html(finalTemplate());
                    $("#new_user_create_btn").button('reset');
                    //window.location.hash = "categories/edit/" + newModel.get('id');
                    //window.location.hash = "/po";
//                    $('#new_user_div').html('User Added.');
                    $("#edit_password_div").html("Password changed.");
                    window.app_router.navigate("account", {trigger: true});

                }
            });


//            window.setTimeout(function() {
//                $("#new_user_create_btn").button('reset');
//            }, 3000);
            return false;
        },
        render:function () {
            console.log('render');
//            var permission_groups = [];
//            permission_groups.push({id:1, text:'User'});
//            permission_groups.push({id:100, text:'Admin'});
//            $("#inputPermissionGroup").select2({ placeholder: "Permission Group", data: permission_groups });

        }
//        collectioncenters_reset: function() {
//            var collection_centers = [];
//            this.collectioncenters.each(function (cc) {
//                collection_centers.push({id:cc.id, text:cc.get('name')});
//            });
//            $("#inputCollectionCenters").select2({ placeholder: "Collection Centers", data: collection_centers, multiple: true });
//        }
    });

    return EditUserView;
});
