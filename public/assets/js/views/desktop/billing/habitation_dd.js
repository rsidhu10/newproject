define([
    'text!templates/desktop/billing/habitation_dd_model.html',
    'text!templates/desktop/billing/habitation_dd_collection.html',
    'collections/habitations',
    'text!templates/desktop/billing/habitation_dd_selected.html',
    'backbone'
], function (aModelTemplate, aCollectionTemplate, aCollection, aModelSelectedTemplate) {
    /*
     - main template, has the table #create_bill_wizard_table
     aCollectionTemplate - output to a tr, will be added to tbody of #create_bill_wizard_table
     aModelTemplate - output a bunch of li that go inside <ul> inside the tr above table
     */

    var HabitationModelView = Backbone.View.extend({
        tagName:'li',
        template:_.template(aModelTemplate),
        events:{
            "click":'TemplateClicked'
        },
        initialize:function () {
//            console.log("HabitationModelView: initialize");
            //_.bindAll(this, 'render');
            //this.model.bind('change', this.render);
        },
        render:function () {
//            console.log("HabitationModelView: render");
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },
        TemplateClicked:function (e) {
//            console.log("HabitationModelView: TemplateClicked");
            e.stopPropagation();
//            console.log('Model clicked :' + this.model.id + ': ' + this.model.get('name'));
            this.model.set('selected', true);
            return false;
        }
    });

    var HabitationCollectionView = Backbone.View.extend({
        template:_.template(aCollectionTemplate),
        destination_el:"",
        initialize:function () {
            //debugger;
//            console.log("HabitationCollectionView: initialize");
            this.collection = new aCollection();
            _.bindAll(this, 'addOne', 'addAll', 'checkSelections', 'CreateJobClicked');
            this.collection.bind('add', this.addOne);
            this.collection.bind('reset', this.addAll);
            //this.collection.bind('change', this.checkSelections);
            this.collection.on("change:selected", this.checkSelections)

            //debugger;

            $('#create_bill_wizard_habitation_row').html(this.template());
            $('#create_bill_wizard_habitation_row').removeClass("hidden");
            $("#create_bill_wizard_habitation_row :button").button('loading');
            //$("#create_bill_wizard_habitation_row :button").button('reset');

            this.collection.url = "/habitations/village/" + this.options.village_id;
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
                    $("#create_bill_wizard_habitation_row :button").button('reset');
                    //console.log(model);
                }
            });
        },
        refresh:function () {
//            console.log("HabitationCollectionView: refresh");
            //console.log('refresh(): Templates Collection View: refresh() - doesnt do anything');
        },
        render:function () {
//            console.log("HabitationCollectionView: render");
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
//            console.log("HabitationCollectionView: addAll");

            var myCollection = new aCollection();
            //$(this.options.el).empty();
            //$(this.options.el).html(this.template);
            this.collection.each(this.addOne);
        },
        addOne:function (aModel) {
//            console.log("HabitationCollectionView: addOne");
            var view = new HabitationModelView({model:aModel});

            //console.log(view.render().el);
            $(this.options.el).find('#create_bill_wizard_habitation_dd').last().append(view.render().el);
        },
        checkSelections:function () {
//            console.log("HabitationCollectionView: checkSelections");
//            console.log("checkSelections, items in collection: " + this.collection.length);
            athis = this;
            //console.log(aModel);
            //this.collection.each(this.addOne);
            this.collection.each(function (aHabitation) {
                if (aHabitation.has("selected")) {
                    $("#create_bill_wizard_village_row :button").remove();
                    $('#create_bill_wizard_habitation_row').empty();
                    newTemplate = _.template(aModelSelectedTemplate);
                    $('#create_bill_wizard_habitation_row').html(newTemplate(aHabitation.toJSON()));
                    $('#create_bill_wizard_habitation_row').addClass('success');
                    $("#create_bill_wizard_habitation_row :button").bind('click', athis.CreateJobClicked);
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
                            'habitation_id':aModel.id,
                            'name':aModel.get('name'),
                            'model_id':aModel.id,
                            'hierarchy':'Habitation',
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

    return HabitationCollectionView;
});
