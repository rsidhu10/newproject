define([
    'collections/consumers',
    'text!templates/desktop/reports/overdue_collection.html',
    'text!templates/desktop/reports/overdue_model.html',
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
            $(this.el).html(this.template(this.model.toJSON()));
            var deleted = this.model.get('deleted');
            if (deleted === 1) {
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
//                    console.log('error: failed to delete model, error: ' + response);
//                    console.log(response);
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
//            console.log('xx Model clicked :' + this.model.id);
            window.app_router.navigate('accounts/edit/' + this.model.get('account_number'), {trigger: true});
            return false;
        }
    });

    var TemplatesCollectionView = Backbone.View.extend({
        //el: '#games_list_ul',
        template:_.template(aCollectionTemplate),
        events:{
            "click .pagination_list_item":'PaginationClicked',
            "click .sortable": 'SortableClicked'
        },
        initialize:function () {
            var self = this;
            _.bindAll(this, 'addOne', 'addAll', 'render', 'create_pagination', 'show_page', 'PaginationClicked', 'SortableClicked');

            this.current_sort = "account_number";
            this.collection.comparator = function(model) {
                return model.get(this.current_sort);
            };
            this.collection.sort();

            this.collection.bind('add', this.addOne);
            this.collection.bind('reset', this.addAll);

            this.pagination_models_per_page = 100;
            this.pagination_current_page = 1;
            this.show_page(this.pagination_current_page);

        },
        render:function () {
            //console.log('render(): Templates Collection View: render() - doesnt do anything');
        },
        addAll:function () {
//            $(this.options.el).empty();
//            $(this.options.el).html(this.template);
//            var counter = 1;
//            var self = this;
//            this.collection.every(function(m) {
//                self.addOne(m);
//                counter++;
//                return counter !== self.pagination_models_per_page;
//            });
            this.show_page(1);
//            this.create_pagination();
        },
        addOne:function (aModel) {
            var view = new TemplateModelView({model:aModel});
            $(this.options.el).find('#collection_data_table tbody').last().append(view.render().el);
        },
        show_page: function(page_number) {
//            console.log('showing page: ', page_number);
//            this.collection.comparator = function(chapter) {
//              return chapter.get("page");
//            };
//            this.collection.sort();

            this.create_pagination();
            if(page_number === "first") {
                page_number = 1;
            } else if (page_number === "previous") {
                page_number = this.pagination_current_page;
                page_number--;
                if(page_number < 1) {
                    page_number = 1;
                }
            } else if (page_number === "next") {
                page_number = this.pagination_current_page;
                page_number++;
                if(page_number > this.max_pages) {
                    page_number = this.max_pages;
                }
            } else if (page_number === "last") {
                page_number = this.max_pages;
            }
//            console.log('showing page after parse: ', page_number);
//            console.log('pagination_current_page: ', this.pagination_current_page);

            this.pagination_current_page = page_number;
            $(this.options.el).empty();
            $(this.options.el).html(this.template);
            var start_at = (page_number * this.pagination_models_per_page) - this.pagination_models_per_page + 0;
            var end_at = start_at + this.pagination_models_per_page - 1;

            console.log('start_at: ' + start_at);
            console.log('end_at: ' + end_at);

            var self = this;
            var items = self.collection.length;
//            console.log('length: ',items);
            for(counter = start_at; counter <= end_at; counter++) {
//                debugger;
                if(items > counter) {
//                    console.log('getting at ',counter-1);
                    self.addOne(self.collection.at(counter));
                }
            }
//            console.log("start_at: ", start_at);
//            console.log("end_at: ", end_at);
            if(this.max_pages > 0) {
                $("#page_info").html("Page " + page_number + " of " + this.max_pages);
            }

//            this.collection.every(function(m) {
//                self.addOne(m);
//                counter++;
//                return counter !== self.pagination_models_per_page;
//            });
        },
        create_pagination: function () {
            var full_pages = Math.floor(this.collection.length / this.pagination_models_per_page);
            var partial = this.collection.length % this.pagination_models_per_page;
            if(partial > 0) {
                full_pages++;
            }
//            console.log('Models: ' , this.collection.length);
//            console.log('Pages : ' , full_pages);
//            console.log('Models on last page : ' , partial);
            this.max_pages = full_pages;
        },
        PaginationClicked: function (event) {
//            console.log('PaginationClicked, target: ', event.target);
            goto_page = event.target.getAttribute('data-pagination');
//            console.log('ok, lets goto page ', goto_page);
            this.show_page(goto_page);
            return false;
        },
        SortableClicked: function (event) {
            var new_sort = event.target.getAttribute('data-sort');
            console.log('new sort: ' + new_sort);
            var old_sort = this.current_sort;
            if(new_sort === old_sort) {
                this.current_sort = '-'+new_sort;
                console.log('reverse sort');
            } else {
                this.current_sort = new_sort;
                console.log('new sort');
            }
            this.collection.comparator = function (Model) {
              var str = Model.get(new_sort).toLowerCase().split("");
              str = _.map(str, function(letter) {
                  if(new_sort === old_sort) {
                      return String.fromCharCode(-(letter.charCodeAt(0)));
                  } else {
                      return String.fromCharCode((letter.charCodeAt(0)));
                  }
              });
              return str;
            };
            this.collection.sort();
        }
    });

    return TemplatesCollectionView;
});
