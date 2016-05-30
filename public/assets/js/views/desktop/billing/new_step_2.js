define([
    'models/billjob',
    'text!templates/desktop/billing/new_step_2.html',
    'text!templates/desktop/billing/new_step_3.html',
    'text!templates/desktop/billing/new_step_final.html',
    'backbone'
], function (aModel, aTemplate_step_2, aTemplate_step_3, aTemplate_step_final) {
    var aView = Backbone.View.extend({
        // this.model.set({ 'subdivision_id':aModel.id, 'name': aModel.get('name'), 'type':'Subdivision' });
        template: _.template(aTemplate_step_2),
        events: {
            //"click .datepicker":'datePick'
        },
        initialize: function () {
            _.bindAll(this, 'monthDiff');
            console.log('Ok, this is the new view, we\'re messing with this model:');
            console.log(this.options.model);
            $(this.options.el).html(this.template(this.options.model.toJSON()));

            myModel = this.options.model;

            myEl = $(this.options.el);
            var that = this;
            $("#submit_job_step_3").click(function (e) {
                e.stopPropagation();
                console.log('ok, step 3 coming up!');

                var sd = myModel.get('start_date').split('/', 2);
                var ed = myModel.get('end_date').split('/', 2);

                startDate = new Date(Date.UTC(sd[1], sd[0]));
                endDate = new Date(Date.UTC(ed[1], ed[0]));
//                endDate = new Date(myModel.get('end_date'));
//                dueDate = new Date(myModel.get('due_date_real'));
//                issueDate = new Date(myModel.get('issue_date_real'));

                duration = that.monthDiff(startDate, endDate);
                if (duration <= 1) {
                    duration = duration + " Month";
                } else {
                    duration = duration + " Months";
                }


                myModel.set('duration', duration);
                myModel.set('notes', "");
//                console.log('due date: ', dueDate.toDateString());

                step3template = _.template(aTemplate_step_3);
                myEl.html(step3template(myModel.toJSON()));
                console.log('Model for step 3: ', myModel.toJSON());
                $("#submit_job_step_4").click(function (e2) {
                    $("#submit_job_step_4").attr('disabled', 'disabled');
                    e2.stopPropagation();
                    console.log('Step #4');
                    console.log('mymdel', myModel);

                    // lets try to save this model
                    myModel.save({}, {
                        error: function (m, r) {
                            console.log("error, response: " + JSON.stringify(r));
                            alert('failed to create new bill job!, error: ' + JSON.stringify(r));
                        },
                        success: function (m, r) {
                            console.log("success, response: " + JSON.stringify(r));
                            console.log('model saved, TODO: redirect to queue');
                            finalTemplate = _.template(aTemplate_step_final);
                            myEl.html(finalTemplate());
                            //window.location.hash = "categories/edit/" + newModel.get('id');
                            //window.location.hash = "/po";
                        }
                    });
                    return false;
                });
                return false;
            });

            $("#inputStartDate").datepicker({
                format: 'm/yyyy',
                startView: 'month',
                minViewMode: 'months'
            }).on('changeDate', function (ev) {
                    console.log("Start Date Changed: " + ev.date.valueOf());
                    console.log("    Old STart Date: " + startDate.valueOf());
                    startDate = new Date(ev.date);
                    $('#inputStartDate').text($('#inputStartDate').data('date'));

                    myModel.set('start_date', (startDate.getUTCMonth() + 1) + '/' + startDate.getUTCFullYear());
                    myModel.set('start_date_real', startDate.toUTCString());

                    $("#inputStartDate").datepicker('hide');
                    $("#inputStartDate").datepicker('update');

                });
            $("#inputEndDate").datepicker({
                format: 'm/yyyy',
                startView: 'month',
                minViewMode: 'months'
            }).on('changeDate', function (ev) {
                    console.log("End Date Changed: " + ev.date.valueOf(), ev.date);
                    console.log("      End Date: " + endDate.valueOf());

                    endDate = new Date(ev.date);
//                    dueDate = new Date(Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth() + 1, 10));

//                    var new_duedate_string = "10" + "/" + (dueDate.getUTCMonth() + 1) + "/" + dueDate.getFullYear();
//                    $("#inputDueDate").datepicker('update', new_duedate_string);

                    myModel.set('end_date', (endDate.getUTCMonth() + 1) + '/' + endDate.getUTCFullYear());
                    myModel.set('end_date_real', endDate.toUTCString());

//                    myModel.set('due_date', dueDate.getUTCDate() + "/" + (dueDate.getUTCMonth()+1) + "/" + dueDate.getUTCFullYear());
//                    myModel.set('due_date_real', dueDate.toUTCString());
                    $("#inputEndDate").datepicker('hide');
                });
//            $("#inputDueDate").datepicker({
//                format: 'd/m/yyyy',
//                minViewMode: 'days'
//            }).on('changeDate', function (ev) {
//                    console.log("Due Date Changed: " + ev.date.valueOf());
//                    console.log("        End Date: " + endDate.valueOf());
//                    if (ev.date.valueOf() < endDate.valueOf()) {
//                        alert('The due date can not be less then the end date');
//                    } else {
//                        dueDate = new Date(ev.date);
//                        $('#inputDueDate').text($('#inputDueDate').data('date'));
////                    myModel.set('due_date',dueDate.getUTCFullYear() + '-' + ("0" + (dueDate.getUTCMonth() + 1)).slice(-2) + '-' + ("0" + dueDate.getUTCDate()).slice(-2));
////                        myModel.set('due_date', dueDate.getUTCFullYear() + '-' + (dueDate.getUTCMonth() + 1) + '-' + dueDate.getUTCDate());
//                        myModel.set('due_date', dueDate.getUTCDate() + '/' + (dueDate.getUTCMonth() + 1) + '/' + dueDate.getUTCFullYear());
//                        myModel.set('due_date_real', dueDate.toUTCString());
//
//                    }
//                    $("#inputDueDate").datepicker('hide');
//                });
            $("#inputIssueDate").datepicker({
                format: 'd/m/yyyy',
                todayBtn: true,
                minViewMode: 'days'
            }).on('changeDate', function (ev) {
                    console.log("Issue Date Changed: " + ev.date.valueOf());
                    issueDate = new Date(ev.date);
                    $("#inputIssueDate").datepicker('hide');
                    myModel.set('issue_date_real', issueDate.toUTCString());
                    myModel.set('issue_date', issueDate.getUTCDate() + "/" + (issueDate.getUTCMonth() + 1) + "/" + issueDate.getUTCFullYear());
                });


            $("#inputStartDate").datepicker('update');
            $("#inputEndDate").datepicker('update');
//            $("#inputDueDate").datepicker('update');
            $("#inputIssueDate").datepicker('update');


            var billgroup_id = this.options.model.attributes.billgroup_id;
            require(['collections/billjobs', 'views/desktop/billing/list'], function (BillJobsCollection, CollectionView) {
                var aCollection = new BillJobsCollection;
                aCollection.url = "/billjobs/billgroup/" + billgroup_id;
                var aCollectionView = new CollectionView({el: '#previous_billjobs_data_table', 'collection': aCollection});
            });

        },
        monthDiff: function (d1, d2) {
            var d1Y = d1.getFullYear();
            var d2Y = d2.getFullYear();
            var d1M = d1.getMonth();
            var d2M = d2.getMonth();

            var duration = (d2M + 12 * d2Y) - (d1M + 12 * d1Y) + 1;
            console.log('Duration: ' + duration + " Months");
            return duration;
        }
    });
    return aView;
});
