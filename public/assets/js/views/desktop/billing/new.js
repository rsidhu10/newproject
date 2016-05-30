define([
    'collections/billgroups',
    'text!templates/desktop/billing/new.html',
    'text!templates/desktop/billing/sidebar.html',
    'backbone'
], function (BillgroupCollection, aTemplate, aSidebar) {
    var aView = Backbone.View.extend({
        initialize:function () {

            $(this.options.main_el).html(_.template(aTemplate));
            $(this.options.sidebar_el).html(_.template(aSidebar));
            _.bindAll(this, 'render', 'billgroup_reset', 'CreateJobClicked');

            this.billgroup_collection = new BillgroupCollection();
            this.billgroup_collection.url = "/billgroups/all"
            this.billgroup_collection.bind('reset', this.billgroup_reset);
            this.billgroup_collection.fetch({reset: true});
            $("#create_new_bill_for_billgroup_btn").click(this.CreateJobClicked);
        },
        render:function () {
//            require(['views/desktop/billing/subdivision_dd'], function (aView) {
//                var myView = new aView({el:'#create_bill_wizard_table'});
//            });
        },
        billgroup_reset:function () {
            var bgh_data = [];
            this.billgroup_collection.each(function (bgh) {
                bgh_data.push({id:bgh.id, text:bgh.get('name')});
            });
            $("#billgroup_dd").select2({ placeholder:"Select a Bill Group", data:bgh_data });
        },
        CreateJobClicked:function () {
            //console.log('Create Billing Job for Subdivision: ' + aModel.get('name'));
            var selected_billgroup = $("#billgroup_dd").select2("data");
            console.log('creating new bill for ', selected_billgroup);
            if(selected_billgroup == null) {
                return false;
            }

            require(['models/billjob', 'views/desktop/billing/new_step_2'], function (BillJobModel, aView) {
                this.model = new BillJobModel();
                // we need a start date, an end date, and due date.
                // START DATE
                var today = new Date();
                var start_date = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1, 0, 0, 0, 0));
                console.log('ok, start date is: ' + start_date);
                // END DATE
                var end_date_x = new Date(Date.UTC(start_date.getUTCFullYear(), start_date.getUTCMonth() + 1, 1, 0, 0, 0, 0));
                var end_date = new Date(end_date_x - 1);
                // DUE DATE
                var due_date = new Date(Date.UTC(end_date.getUTCFullYear(), end_date.getUTCMonth(), end_date.getUTCDate() + 10, 0, 0, 0, 0));
                // END DATE CALCS

                startDate = start_date.getUTCMonth() + 1 + "/" + start_date.getFullYear();
                endDate = end_date.getUTCMonth() + 1 + "/" + end_date.getFullYear();
                month = due_date.getUTCMonth() + 1;
//                dueDate = due_date.getUTCDate() + "/" + month + "/" + due_date.getUTCFullYear();
                issueDate = end_date.getUTCDate() + "/" + (end_date.getUTCMonth() + 1) + "/" + end_date.getUTCFullYear();

                this.model.set({
                    'billgroup_id':selected_billgroup.id,
                    'model_id':selected_billgroup.id,
                    'name':selected_billgroup.text,
                    'hierarchy':'Billgroup',
                    'start_date':startDate,
                    'end_date':endDate,
//                    'due_date':dueDate,
                    'start_date_real':start_date,
                    'end_date_real':end_date,
                    'due_date_real':due_date,
                    'issue_date':issueDate,
                    'issue_date_real':end_date
                });
                var myView = new aView({model:this.model, el:'#main_big_div'});
            });

            return false;
        }
    });
    return aView;
});
