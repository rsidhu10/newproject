define([
    'collections/billjobs',
    'text!templates/desktop/billing/collection.html',
    'text!templates/desktop/billing/model.html',
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

//            var status = this.model.get('status');
//            if (status == "Queued") {
//                var model = this.model;
//                if ('undefined' !== typeof this.options.intervalID) {
//                    clearInterval(this.options.intervalID);
//                }
//                old_intervalID = this.options.intervalID;
//                this.options.intervalID = setInterval(function () {
//                    //console.log('calling fetch for model id ' + model.get('id'));
//                    model.fetch();
//                }, 5000);
//                new_intervalID = this.options.intervalID;
//                console.log("old_intervalID:" + old_intervalID + " new_intervalID:" + new_intervalID);
//            }
        },
        render:function () {
            var monthNames = [ "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December" ];
            var start_date = new Date(this.model.get('start_date'));
            var end_date = new Date(this.model.get('end_date'));
            var due_date = new Date(this.model.get('due_date'));
            var created_at = new Date(this.model.get('created_at'));
            var issue_date = new Date(this.model.get('issue_date'));
            start_date_string = start_date.getMonth()+1 + "/" + start_date.getFullYear();
            end_date_string = end_date.getMonth()+1 + "/" + end_date.getFullYear();
            due_date_string = monthNames[due_date.getMonth()] + " " + due_date.getDate() + ", " + due_date.getFullYear();
            created_at_string = monthNames[created_at.getMonth()] + " " + created_at.getDate() + ", " + created_at.getFullYear();
            issue_date_string = monthNames[issue_date.getMonth()] + " " + issue_date.getDate() + ", " + issue_date.getFullYear();
            this.model.set("start_date_string", start_date_string);
            this.model.set("end_date_string", end_date_string);
            this.model.set("due_date_string", due_date_string);
            this.model.set("created_at_string", created_at_string);
            this.model.set("issue_date_string", issue_date_string);


            var status = this.model.get('status');
            if (status == "Done") {
                this.model.set("status_icon", "icon-download");
                this.model.set("status_color", "green");
            } else if (status == "Error") {
                this.model.set("status_icon", "icon-warning-sign");
                this.model.set("status_color", "red");
            } else if (status == "Processing") {
                this.model.set("status_icon", "icon-refresh");
                this.model.set("status_color", "orange");
            } else if (status == "Queued") {
                this.model.set("status_icon", "icon-time");
                this.model.set("status_color", "blue");
            } else {
                this.model.set("status_icon", "icon-question-sign");
                this.model.set("status_color", "pink");
            }

            var deleted = this.model.get('deleted');
            if (deleted == 1) {
                this.model.set("status", "Deleted");
                this.model.set("status_icon", "icon-ban-circle");
            }

            $(this.el).html(this.template(this.model.toJSON()));

            //debugger;

//            if (status == "Done") {
//                //$(this.el).addClass("success");
//            } else if (status == "Error") {
//                $(this.el).addClass("error");
//            } else if (status == "Processing") {
//                $(this.el).addClass("warning");
//            } else if (status == "Queued") {
//                $(this.el).addClass("info");
//            }

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
//            console.log('xx Model clicked :' + this.model.id + ': ' + this.model.get('name'));
            var tname = e.target.attributes.getNamedItem("name");
            action = "";
            if (tname) {
                action = tname.value.toLowerCase();
            }
//            console.log('action' + action);
            if (action == "done") {
                //window.location.replace("/export/billingjobs/" + this.model.get('export_file'));
                window.location.href = "/billingexport/" + this.model.get('export_file');
            }
//            console.log(e.target.name);
//            if (e.target.name == "blocks") {
//                window.location.href = "#blocks/subdivision/" + this.model.id;
//            }
            return false;
        }
    });

    var TemplatesCollectionView = Backbone.View.extend({
        events:{
            "click #refresh_jobs": "refreshJobs",
            "click #previous_page": "previous_page",
            "click #next_page": "next_page",
            "click #checkbox_partial_bills": "billjob_filter",
            "click #checkbox_full_bills": "billjob_filter"
        },
        template:_.template(aCollectionTemplate),
        initialize:function () {
            var self = this;

            $(this.options.el).empty();
            $(this.options.el).html(this.template);

            _.bindAll(this, 'addOne', 'addAll', 'render', 'refreshJobs', 'previous_page', 'next_page', 'billjob_filter');

            this.collection.bind('add', this.addOne);
            this.collection.bind('reset', this.addAll);
//            this.collection.bind("change", this.render);
            console.log("Filter: " + this.options.filter + " Page: " + this.options.page);

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
        billjob_filter: function() {
            console.log('here we go');
            var partial = $('#checkbox_partial_bills').is(":checked");
            var full = $('#checkbox_full_bills').is(":checked");
            var filter = "all";

            if(full && partial) {
                filter = "all";
            } else if(partial) {
                filter = "partial";
            } else if(full) {
                filter = "full";
            }

            this.options.filter = filter;
            console.log('URL:' + "/billjob/" + this.options.filter + "/" + this.options.page);
            this.collection.url = "/billjob/" + this.options.filter + "/" + this.options.page;
//            window.app_router.navigate("/billing/" + this.options.filter + "/" + this.options.page, {trigger: false});
            $("#collection_data_table").find("tr:gt(0)").remove();
            this.collection.fetch({'reset': true, error: function(){
                console.log('error');
            }, success:function() {
                console.log('Success!');
            }});
//            this.collection.each(this.addOne);
        },
        previous_page: function() {
            if(this.options.page > 1) {
                this.options.page--;
                console.log('Previous Page: ' + this.options.page);
                url_path = "/billjob/" + this.options.filter + "/" + this.options.page;
                this.collection.url = "/billjob/" + this.options.filter + "/" + this.options.page;
                window.app_router.navigate("/billing/" + this.options.filter + "/" + this.options.page, {trigger: false});
                this.collection.fetch({ reset: true });
            } else {
                console.log('Failed to go to Previous Page: ' + this.options.page);
            }
        },
        next_page: function() {
            this.options.page++;
            url_path = "/billjob/" + this.options.filter + "/" + this.options.page;
            this.collection.url = "/billjob/" + this.options.filter + "/" + this.options.page;
            window.app_router.navigate("/billing/" + this.options.filter + "/" + this.options.page, {trigger: false});
            console.log('Next Page: ' + this.options.page);
            this.collection.fetch({ reset: true });
        },
        refreshJobs: function() {
            console.log('refresh');
            $('#refresh_jobs').addClass('disabled');

            this.collection.fetch({
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
        },
        refresh:function () {
            //console.log('refresh(): Templates Collection View: refresh() - doesnt do anything');
        },
        render:function () {
            console.log('render(): Templates Collection View: render() - doesnt do anything');
//            this.refreshJobs();
        },
        addAll:function () {
            console.log('addAll();');
            $("#collection_data_table").find("tr:gt(0)").remove();
            var myCollection = new Collection();
            this.collection.each(this.addOne);
        },
        addOne:function (aModel) {
            var view = new TemplateModelView({model:aModel});
            $(this.options.el).find('#collection_data_table tbody').last().append(view.render().el);
        }
    });

    return TemplatesCollectionView;
});
