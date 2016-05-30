define([
    'collections/schemes',
    'text!templates/desktop/scheme/collection.html',
    'text!templates/desktop/scheme/model.html',
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
            console.log('Model clicked :' + this.model.id + ': ' + this.model.get('name'));
            console.log(e);
            //debugger;
            var action = "";
            action_atrib = e.target.attributes.getNamedItem("name");
            if(action_atrib) {
                action = action_atrib.value;
            }
            console.log('action: ' + action);
            if(action == "consumers") {
                window.location.href = "#consumers/scheme/" + this.model.id;
            } else if(action == "habitations") {
                window.location.href = "#habitations/scheme/" + this.model.id;
            }
            //window.location.href = "#templates/edit/" + this.model.id;
            return false;
        }
    });

    var TemplatesCollectionView = Backbone.View.extend({
        //el: '#games_list_ul',
        template:_.template(aCollectionTemplate),
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
//                    console.log("success! # of Templates: " + model.length);
                    //console.log(model);
                }
            });
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
