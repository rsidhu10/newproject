define([
    'text!templates/desktop/reports/payments2_subdivision_dd_model.html',
    'text!templates/desktop/reports/payments2_subdivision_dd_collection.html',
    'collections/subdivisions',
    'text!templates/desktop/reports/payments2_subdivision_dd_selected.html',
    'backbone'
], function (aModelTemplate, aCollectionTemplate, aCollection, aModelSelectedTemplate) {
    var SubdivisionModelView = Backbone.View.extend({
        tagName:'li',
        template:_.template(aModelTemplate),
        events:{
            "click":'TemplateClicked'
        },
        initialize:function () {
        },
        render:function () {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },
        TemplateClicked:function (e) {
            //console.log("SubdivisionModelView: TemplateClicked");
            e.stopPropagation();
            //console.log('Model clicked :' + this.model.id + ': ' + this.model.get('name'));
            this.model.set('selected', true);
//            require(['views/desktop/billing/subdivision_dd'], function (aView) {
//                var myView = new aView({});
//                $("#create_bill_wizard_table > tbody:last").empty();
//                $("#create_bill_wizard_table > tbody:last").append(myView.render().el);
//            });
//            debugger;
            //$(this.el).parent().parent().parent().parent().empty()
            return false;
        }
    });

    var SubdivisionCollectionView = Backbone.View.extend({
        //tagName: 'tr',
        template:_.template(aCollectionTemplate),
        destination_el:"",
        initialize:function () {
            //debugger;
            //console.log("PanchayatCollectionView: initialize");
            this.collection = new aCollection();
            _.bindAll(this, 'addOne', 'addAll', 'checkSelections', 'CreateJobClicked');
            this.collection.bind('add', this.addOne);
            this.collection.bind('reset', this.addAll);
            //this.collection.bind('change', this.checkSelections);
            this.collection.on("change:selected", this.checkSelections)

            //debugger;

            $('#create_bill_wizard_subdivision_row').html(this.template());
            $('#create_bill_wizard_subdivision_row').removeClass("hidden");
            $("#create_bill_wizard_subdivision_row :button").button('loading');
            //$("#create_bill_wizard_subdivision_row :button").button('reset');

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
                    //console.log("success! # of Templates: " + model.length);
                    $("#create_bill_wizard_subdivision_row :button").button('reset');
                    //console.log(model);
                }
            });
        },
        refresh:function () {
//            console.log("SubdivisionCollectionView: refresh");
            //console.log('refresh(): Templates Collection View: refresh() - doesnt do anything');
        },
        render:function () {
//            console.log("SubdivisionCollectionView: render");
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
//            console.log("SubdivisionCollectionView: addAll");

            var myCollection = new aCollection();
            //$(this.options.el).empty();
            //$(this.options.el).html(this.template);
            this.collection.each(this.addOne);
        },
        addOne:function (aModel) {
//            console.log("SubdivisionCollectionView: addOne");
            var view = new SubdivisionModelView({model:aModel});

            //console.log(view.render().el);
            $('#create_bill_wizard_subdivision_dd').last().append(view.render().el);
        },
        checkSelections:function () {
//            console.log("SubdivisionCollectionView: checkSelections");
//            console.log("checkSelections, items in collection: " + this.collection.length);
            athis = this;

            //console.log(aModel);
            //this.collection.each(this.addOne);
            this.collection.each(function (aSubdivision) {
                //console.log(aSubdivision);
                if (aSubdivision.has("selected")) {
                    $('#create_bill_wizard_subdivision_row').empty();
                    //$('#create_bill_wizard_subdivision_row').html("<td>Division: </td><td>" + aSubdivision.get("name") + " <span class='label label-success'>Selected</span></td>");
                    newTemplate = _.template(aModelSelectedTemplate);
                    $('#create_bill_wizard_subdivision_row').html(newTemplate(aSubdivision.toJSON()));
                    $('#create_bill_wizard_subdivision_row').addClass('success');
                    $("#create_bill_wizard_subdivision_row :button").bind('click', athis.CreateJobClicked);
                    // at this time, we need to start the blockmodel stuff
                    require(['views/desktop/billing/block_dd'], function (aView) {
                        var myView = new aView({el:'#create_bill_wizard_block_row', subdivision_id:aSubdivision.id});
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
                        var end_date_x = new Date(start_date.getFullYear(), start_date.getMonth()+1, 1, 0, 0, 0, 0);
                        var end_date = new Date(end_date_x - 1);
                        // DUE DATE
                        var due_date = new Date(end_date.getFullYear(), end_date.getMonth(), end_date.getDate()+10, 0, 0, 0, 0);
                        // END DATE CALCS

                        startDate = start_date.getMonth()+1 + "/" + start_date.getFullYear();
                        endDate = end_date.getMonth()+1 + "/" + end_date.getFullYear();
                        month = due_date.getMonth()+1;
                        dueDate = due_date.getDate() + "/" + month + "/" + due_date.getFullYear();
                        issueDate = end_date.getDate() + "/" + (end_date.getMonth()+1) + "/" + end_date.getFullYear();

                        this.model.set({
                            'subdivision_id':aModel.id,
                            'model_id':aModel.id,
                            'name': aModel.get('name'),
                            'hierarchy':'Subdivision',
                            'start_date': startDate,
                            'end_date': endDate,
                            'due_date': dueDate,
                            'start_date_real': start_date,
                            'end_date_real':end_date,
                            'due_date_real':due_date,
                            'issue_date': issueDate,
                            'issue_date_real':end_date
                        });
                        var myView = new aView({model: this.model, el: '#create_bill_wizard_div'});
                    });
                }
            });
        }
    });

    // executing this will load the subdivisions into our drop-down for new bill
    return SubdivisionCollectionView;
});
