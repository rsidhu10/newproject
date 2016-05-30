define([
    'models/user',
    'collections/collectioncenters',
    'text!templates/desktop/users/edit.html',
    'backbone'
], function (UserModel, CollectionCenterCollection, EditUserTemplate) {

    var EditUserView = Backbone.View.extend({
        template:_.template(EditUserTemplate),
        events: {
            "click #edit_user_save_btn": "updateUser"
        },
        initialize: function () {
            console.log('init');
            _.bindAll(this, 'render', 'createUser', 'collectioncenters_reset');
            this.user = new UserModel({
                id: this.options.user_id
            });
            this.user.fetch({
                reset: true,
                error:function (m, r) {
                    console.log("error creating new user, response: " + JSON.stringify(r));
                    alert('failed to create new user, error: ' + JSON.stringify(r));
                    $("#new_user_create_btn").button('reset');
                },
                success:function (m, r) {
                    console.log("success, response: " + JSON.stringify(r));
                    console.log('user created!');
//                    finalTemplate = _.template(aTemplate_step_final);
//                    myEl.html(finalTemplate());
                    $("#new_user_create_btn").button('reset');
                    //window.location.hash = "categories/edit/" + newModel.get('id');
                    //window.location.hash = "/po";
                    $('#new_user_div').html('User Added.');
                }
            });
            this.render();

            this.collectioncenters = new CollectionCenterCollection();
            this.collectioncenters.bind('reset', this.collectioncenters_reset);
            this.collectioncenters.fetch({reset: true});
        },
        updateUser: function() {
            console.log('createUser');
            $("#new_user_create_btn").button('loading');
            username = $("#inputUsername").val();
            name = $("#inputName").val();
            email = $("#inputEmail").val();
            password = $("#inputPassword").val();
            permission_group = $("#inputPermissionGroup").select2("val");
            collection_centers = $("#inputCollectionCenters").select2("val");
            console.log(collection_centers);
            var newUser = new UserModel({
                username: username,
                fullname: name,
                email: email,
                password: password,
                permission_group: permission_group,
                collection_centers: collection_centers
            });
            newUser.save({}, {
                error:function (m, r) {
                    console.log("error creating new user, response: " + JSON.stringify(r));
                    alert('failed to create new user, error: ' + JSON.stringify(r));
                    $("#new_user_create_btn").button('reset');
                },
                success:function (m, r) {
                    console.log("success, response: " + JSON.stringify(r));
                    console.log('user created!');
//                    finalTemplate = _.template(aTemplate_step_final);
//                    myEl.html(finalTemplate());
                    $("#new_user_create_btn").button('reset');
                    //window.location.hash = "categories/edit/" + newModel.get('id');
                    //window.location.hash = "/po";
                    $('#new_user_div').html('User Added.');
                }
            });


//            window.setTimeout(function() {
//                $("#new_user_create_btn").button('reset');
//            }, 3000);
            return false;
        },
        render:function () {
            console.log('render');
            var permission_groups = [];
            permission_groups.push({id:1, text:'User'});
            permission_groups.push({id:100, text:'Admin'});
            $("#inputPermissionGroup").select2({ placeholder: "Permission Group", data: permission_groups });

        },
        collectioncenters_reset: function() {
            var collection_centers = [];
            this.collectioncenters.each(function (cc) {
                collection_centers.push({id:cc.id, text:cc.get('name')});
            });
            $("#inputCollectionCenters").select2({ placeholder: "Collection Centers", data: collection_centers, multiple: true });
        }
    });

    return EditUserView;
});
