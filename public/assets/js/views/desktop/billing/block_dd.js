define([
    'text!templates/desktop/billing/block_dd_model.html',
    'text!templates/desktop/billing/block_dd_collection.html',
    'collections/blocks',
    'text!templates/desktop/billing/block_dd_selected.html',
    'backbone'
], function (aModelTemplate, aCollectionTemplate, aCollection, aModelSelectedTemplate) {
    /*
     - main template, has the table #create_bill_wizard_table
     aCollectionTemplate - output to a tr, will be added to tbody of #create_bill_wizard_table
     aModelTemplate - output a bunch of li that go inside <ul> inside the tr above table
     */

    var BlockModelView = Backbone.View.extend({
        tagName:'li',
        template:_.template(aModelTemplate),
        events:{
            "click":'TemplateClicked'
        },
        initialize:function () {
//            console.log("BlockModelView: initialize");
            //_.bindAll(this, 'render');
            //this.model.bind('change', this.render);
        },
        render:function () {
//            console.log("BlockModelView: render");
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },
        TemplateClicked:function (e) {
//            console.log("BlockModelView: TemplateClicked");
            e.stopPropagation();
//            console.log('Model clicked :' + this.model.id + ': ' + this.model.get('name'));
            this.model.set('selected', true);
            return false;
        }
    });

    var BlockCollectionView = Backbone.View.extend({
        template:_.template(aCollectionTemplate),
        destination_el:"",
        initialize:function () {
            this.collection = new aCollection();
            _.bindAll(this, 'addOne', 'addAll', 'checkSelections', 'CreateJobClicked');
            this.collection.bind('add', this.addOne);
            this.collection.bind('reset', this.addAll);
            //this.collection.bind('change', this.checkSelections);
            this.collection.on("change:selected", this.checkSelections)

            //debugger;

            $('#create_bill_wizard_block_row').html(this.template());
            $('#create_bill_wizard_block_row').removeClass("hidden");
            $("#create_bill_wizard_block_row :button").button('loading');
            //$("#create_bill_wizard_block_row :button").button('reset');

            this.collection.url = "/blocks/subdivision/" + this.options.subdivision_id;
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
                    $("#create_bill_wizard_block_row :button").button('reset');
                }
            });
        },
        refresh:function () {
//            console.log("BlockCollectionView: refresh");
            //console.log('refresh(): Templates Collection View: refresh() - doesnt do anything');
        },
        render:function () {
//            console.log("BlockCollectionView: render");
            //console.log('render(): Templates Collection View: render() - doesnt do anything');
            //Todo: this is not working
            //console.log('collection render, template:');
            //console.log(this.template());
            //console.log('returning a tr hopefuly:');
            //console.log($(this.el));
//            $(this.el).append(this.template());
            //return this;
        },
        addAll:function () {
//            console.log("BlockCollectionView: addAll");

            var myCollection = new aCollection();
            //$(this.options.el).empty();
            //$(this.options.el).html(this.template);
            this.collection.each(this.addOne);
        },
        addOne:function (aModel) {
//            console.log("BlockCollectionView: addOne");
            var view = new BlockModelView({model:aModel});

            //console.log(view.render().el);
            $(this.options.el).find('#create_bill_wizard_block_dd').last().append(view.render().el);
        },
        checkSelections:function () {
//            console.log("BlockCollectionView: checkSelections");
//            console.log("checkSelections, items in collection: " + this.collection.length);
            athis = this;

            //console.log(aModel);
            //this.collection.each(this.addOne);
            this.collection.each(function (aBlock) {
                if (aBlock.has("selected")) {
                    $("#create_bill_wizard_subdivision_row :button").remove();
                    $('#create_bill_wizard_block_row').empty();
                    newTemplate = _.template(aModelSelectedTemplate);
                    $('#create_bill_wizard_block_row').html(newTemplate(aBlock.toJSON()));
                    $('#create_bill_wizard_block_row').addClass('success');
                    $("#create_bill_wizard_block_row :button").bind('click', athis.CreateJobClicked);
                    require(['views/desktop/billing/panchayat_dd'], function (aView) {
                        var myView = new aView({el:'#create_bill_wizard_panchayat_row', block_id:aBlock.id});
                    });

                }
            });
        },
        CreateJobClicked:function () {
            this.collection.each(function (aModel) {
                if (aModel.has("selected")) {
                    console.log('Create Billing Job for Subdivision: ' + aModel.get('name'));
                    require(['models/billjob', 'views/desktop/billing/new_step_2'], function (BillJobModel, aView) {
                        this.model = new BillJobModel();
                        // we need a start date, an end date, and due date.
                        // START DATE
                        var today = new Date();
                        var start_date = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0);
                        console.log('ok, start date is: ' + start_date);
                        // END DATE
                        var end_date_x = new Date(start_date.getFullYear(), start_date.getMonth() + 1, 1, 0, 0, 0, 0);
                        var end_date = new Date(end_date_x - 1);
                        // DUE DATE
                        var due_date = new Date(end_date.getFullYear(), end_date.getMonth(), end_date.getDate() + 10, 0, 0, 0, 0);
                        // END DATE CALCS

                        startDate = start_date.getMonth() + 1 + "/" + start_date.getFullYear();
                        endDate = end_date.getMonth() + 1 + "/" + end_date.getFullYear();
                        month = due_date.getMonth() + 1;
                        dueDate = due_date.getDate() + "/" + month + "/" + due_date.getFullYear();
                        issueDate = end_date.getDate() + "/" + (end_date.getMonth() + 1) + "/" + end_date.getFullYear();
                        this.model.set({
                            'block_id':aModel.id,
                            'model_id':aModel.id,
                            'name':aModel.get('name'),
                            'hierarchy':'Block',
                            'start_date':startDate,
                            'end_date':endDate,
                            'due_date':dueDate,
                            'start_date_real':start_date,
                            'end_date_real':end_date,
                            'due_date_real':due_date,
                            'issue_date':issueDate,
                            'issue_date_real':end_date
                        });
                        var myView = new aView({model:this.model, el:'#create_bill_wizard_div'});
                    });
                }
            });
        }
    });

    // executing this will load the subdivisions into our drop-down for new bill
    return BlockCollectionView;
});
