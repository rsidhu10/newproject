define([
    'collections/billgroups',
    'text!templates/desktop/admin/billgroup/collection.html',
    'text!templates/desktop/admin/billgroup/model.html',
    'backbone'
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
//            console.log('xx Model clicked :' + this.model.id + ': ' + this.model.get('name'));
//            window.location.hash = "admin/billgroup/edit/" +this.model.id;
            window.app_router.navigate("admin/billgroup/edit/" +this.model.id, {trigger: true});
            return false;
        }
    });

    var TemplatesCollectionView = Backbone.View.extend({
        //el: '#games_list_ul',
        template:_.template(aCollectionTemplate),
        initialize:function () {
            _.bindAll(this, 'addOne', 'addAll', 'render');
            this.collection = new Collection();
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
//                    console.log("success! # of Templates: " + model.length);
                    //console.log(model);
                }
            });
        },
        render:function () {
            console.log('render(): Templates Collection View: render() - doesnt do anything');
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
