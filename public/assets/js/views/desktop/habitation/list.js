define([
    'collections/habitations',
    'text!templates/desktop/habitation/collection.html',
    'text!templates/desktop/habitation/model.html',
    'backbone.bootstrap-modal'
], function (Collection, aCollectionTemplate, aModelTemplate) {

    /** ************************************************ **/
    var TemplateModelView = Backbone.View.extend({
        tagName:'tr',
        template:_.template(aModelTemplate),
        //className:'alert-message warning',
        events:{
            "click":'TemplateClicked'
        },
        initialize:function () {
            _.bindAll(this, 'render');
            this.model.bind('change', this.render);
        },
        render:function () {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },
        remove:function () {
            var myEl = this.el;
            this.model.destroy({
                error:function (model, response) {
                    console.log('error: failed to delete model, error: ' + response);
                    console.log(response);
                    alert('failed to delete model, error: ' + response);
                    //$(myEl).remove();
                },
                success:function (model, response) {
                    //window.location.hash = "admin/users";
                    //this.remove();
                    $(myEl).remove();
                }
            });
        },
        TemplateClicked:function (e) {
            e.stopPropagation();
//            console.log('Model clicked :' + this.model.id + ': ' + this.model.get('name'));
            var action = "None";
            if (typeof e.target.name != 'undefined') {
                action = e.target.name;
//                console.log('xAction: ' + action);
            } else if (e.target.attributes.item('name') != null) {
                action = e.target.attributes.item('name').value;
            }

//            console.log('Action: ' + action);
            if (action == "consumers") {
                window.location.href = "#consumers/habitation/" + this.model.id;
            } else if (action == "setup") {
                window.location.href = "#habitations/edit/" + this.model.id;
            } else if(action == "edit") {
                console.log('ok, lets edit model id#' + this.model.id, this.model);

                var myModel = this.model;
                require(['views/desktop/habitation/editModal'], function (editView) {
                    var myView = new editView({
                        'model':myModel
                    });
                    var modal = new Backbone.BootstrapModal({ content: myView }).open();

                    modal.on('ok', function() {
                        console.log('you said ok!');
                        // now we gather all the updated values
                        var name = $('#input_name').val();
                        var type = $('#input_type').val();
                        var status = $('#input_status').val();
                        var p_lpcd = $('#input_p_lpcd').val();
                        var latitude = $('#input_latitude').val();
                        var longitude = $('#input_longitude').val();
                        var changed1 = myModel.hasChanged();

                        myModel.set({
                            name:name,
                            type:type,
                            status:status,
                            p_lpcd:p_lpcd,
                            latitude:latitude,
                            longitude:longitude
                        });
                        var changed2 = myModel.hasChanged();
                        // TODO: DID ANYTHING CHANGE? SAVE???
                    });
                });
            } else if (action == "ledger") {
                window.location.href = "#habitations/ledger/" + this.model.id;
            } else {
                console.log('no action defined for ' + action );
            }
            return false;
        }
    });

    var TemplatesCollectionView = Backbone.View.extend({
        //el: '#games_list_ul',
        template:_.template(aCollectionTemplate),
        events: {
            "click #import_data_btn": "import_data",
            "click #export_data_btn": "export_data"
        },
        initialize:function () {
            _.bindAll(this, 'addOne', 'addAll', 'render');
            this.collection.bind('add', this.addOne);
            this.collection.bind('reset', this.addAll);

            this.collection.fetch({
                reset: true,
                error:function (model, response) {
                    if (response.status == "404") {
                        console.log('error: no Templates found');
                    } else {
                        console.log("error, response: " + JSON.stringify(response));
                    }
                },
                success:function (model, response) {
                    if(window.app_session.isAdmin()) {
                        $('button[name="setup"]').show();
                        $('button[name="ledger"]').show();
                    }
//                    console.log("success! # of Templates: " + model.length);
                    //console.log(model);
                }
            });
        },
        import_data: function() {
            console.log('import data');
            id = "all";
            if(! _.isObject(this.collection.url)) {
                url = this.collection.url.split('/');
                id = url[3];
            }
        },
        export_data: function() {
            console.log('export data');
            id = "all";
            if(! _.isObject(this.collection.url)) {
                url = this.collection.url.split('/');
                id = url[3];
            }
            window.location.href = "/export/habitations/village/" + id;
        },
        refresh:function () {
            //console.log('refresh(): Templates Collection View: refresh() - doesnt do anything');
        },
        render:function () {
            //console.log('render(): Templates Collection View: render() - doesnt do anything');
        },
        addAll:function () {
            //console.log('addAll();');

            var myCollection = new Collection();
            $(this.options.el).empty();
            $(this.options.el).html(this.template);
            this.collection.each(this.addOne);
        },
        addOne:function (aModel) {
            var view = new TemplateModelView({model:aModel});
            $(this.options.el).find('#collection_data_table tbody').last().append(view.render().el);
        }
    });

    return TemplatesCollectionView;
});
