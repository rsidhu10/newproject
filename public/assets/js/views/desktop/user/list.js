define([
    'collections/users',
    'text!templates/desktop/users/collection.html',
    'text!templates/desktop/users/model.html',
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
//            var monthNames = [ "January", "February", "March", "April", "May", "June",
//                "July", "August", "September", "October", "November", "December" ];
//            var payment_date = new Date(this.model.get('payment_date'));
//            var date_created = new Date(this.model.get('date_created'));
//            payment_date_string = monthNames[payment_date.getMonth()] + " " + payment_date.getDate() + ", " + payment_date.getFullYear();
//            date_created_string = monthNames[date_created.getMonth()] + " " + date_created.getDate() + ", " + date_created.getFullYear();
//            this.model.set("payment_date_string", payment_date_string);
//            this.model.set("date_created_string", date_created_string);

            $(this.el).html(this.template(this.model.toJSON()));
            var deleted = this.model.get('deleted');
            if (deleted == 1) {
                $(this.el).removeClass("success");
                $(this.el).removeClass("warning");
                $(this.el).removeClass("info");
                $(this.el).removeClass("error");
                $(this.el).addClass("error");
            }

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
            console.log('xx Model clicked :' + this.model.id);
            return false;
        }
    });

    var TemplatesCollectionView = Backbone.View.extend({
        //el: '#games_list_ul',
        template:_.template(aCollectionTemplate),
        initialize:function () {
            var self = this;

            _.bindAll(this, 'addOne', 'addAll', 'render', 'refreshJobs');
            this.collection = new Collection;
            this.collection.url = "/user/all";
            this.collection.bind('add', this.addOne);
            this.collection.bind('reset', this.addAll);
            //this.collection.bind("change", this.render, this);

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
            //$("#refresh_jobs").bind('click',this.refreshJobs);
//            console.log('binding click..');
//            $("#refresh_jobs").bind('click',function() {
//                console.log('ok, click!');
//            });
            //debugger;
            $('#refresh_jobs').live('click', function() {
                $('#refresh_jobs').addClass('disabled');

                self.collection.fetch({
                    reset: true,
                    error:function (model, response) {
                        $('#refresh_jobs').removeClass('disabled');
                        if (response.status == "404") {
                            console.log('error: no Templates found');
                        } else {
                            console.log("error, response: " + JSON.stringify(response));
                        }
                    },
                    success:function (model, response) {
                        $('#refresh_jobs').removeClass('disabled');
                        //console.log("success! # of Templates: " + model.length);
                        //console.log(model);
                    }
                });
            });
            // debugger;
//

        },
//        events: {
//            "click": this.refreshJobs
//        },
        refreshJobs: function() {
            console.log('refresh');
//            this.collection.fetch({
//                error:function (model, response) {
//                    if (response.status == "404") {
//                        console.log('error: no Templates found');
//                    } else {
//                        console.log("error, response: " + JSON.stringify(response));
//                    }
//                },
//                success:function (model, response) {
//                    console.log("success! # of Templates: " + model.length);
//                    //console.log(model);
//                }
//            });
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
