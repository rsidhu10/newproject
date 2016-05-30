define([
    'models/ledger',
    'collections/ledgers',
    'text!templates/desktop/account/ledger_collection.html',
    'text!templates/desktop/account/ledger_model.html',
    'text!templates/desktop/account/ledger_payment_hover.html',
    'text!templates/desktop/account/ledger_bill_hover.html',
    'text!templates/desktop/account/ledger_bill_hover_modal_template.html',
    'backbone'
], function (LedgerModel, LedgerCollection, aCollectionTemplate, aModelTemplate, PaymentTemplate, BillTemplate, myModalTemplate) {


    /** ************************************************ **/
    var TemplateModelView = Backbone.View.extend({
        tagName:'tr',
        template:_.template(aModelTemplate),
        modal_template:_.template(myModalTemplate),
        //className:'alert-message warning',
        timer:'',
        events:{
            "click":'TemplateClicked',
//            "mouseenter":'menter',
            "mouseleave":'mleave'
        },
        initialize:function () {
//            console.log('TemplateModelView: init()', this.model);
            _.bindAll(this, 'render', 'remove', 'TemplateClicked');
            this.model.bind('change', this.render);
            var details_template = _.template(PaymentTemplate);
            if (this.model.get('type') === 'Bill') {
                details_template = _.template(BillTemplate);
            }
            ////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//            var data = this.model.get('data');
//            if (this.model.get('type') == 'Payment') {
////                console.log('payment model', this.model);
//                this.model.set('status', '');
//            } else {
//
//                var past_balance = parseFloat(this.model.get('balance'));
//                if (data.late == "1") {
//                    if(!this.model.has('was_bill_late')) {
//                        this.model.set('was_bill_late', "Yes");
//                    }
//                    if(!this.model.has('late_fee_display')) {
//                        this.model.set('late_fee_display', data.late_fee_amount);
//                    }
//                    var amt = this.model.get('amount');
//                    this.model.set('amount', this.model.get('amount') + " + " + data.late_fee_amount);
//                    var amount_due = parseFloat(this.model.get('amount'), 10);
//                    var late_fee_amount = parseFloat(data.late_fee_amount, 10);
//                    var bill_total = parseFloat(amount_due + late_fee_amount + past_balance);
//                    if (bill_total < 0) {
//                        bill_total = 0.00;
//                    }
//                    this.model.set('bill_total', parseFloat(bill_total).toFixed(2));
//                } else {
//                    var amount_due = parseFloat(this.model.get('amount'), 10);
//                    var bill_total = parseFloat(amount_due + past_balance);
//                    if (bill_total < 0) {
//                        bill_total = 0.00;
//                    }
//                    this.model.set('was_bill_late', "No");
//                    this.model.set('late_fee_display', "0.00");
////                    console.log('bill model', this.model);
//                    this.model.set('bill_total', parseFloat(bill_total).toFixed(2));
//                }
//                if (data.processed === "1") {
//                    this.model.set('bill_paid', "Yes");
//                    this.model.set('status', '<span class="badge pull-right">Closed</span>');
//                } else {
//                    this.model.set('bill_paid', "No");
//                    this.model.set('status', '<span class="badge badge-success pull-right">Open</span>');
//                }
//            }
//
//            if (data.deleted == "1") {
//                this.model.set('is_deleted', "Yes");
//            } else {
//                this.model.set('is_deleted', "No");
//            }

            ////////////////////////////////////////////////////////////////////////////////////////////////////////

            options = {
                'animation':true,
                'html':true,
                'title':'Transaction Details',
                'content':details_template(this.model.toJSON()),
                'placement':'top',
                'trigger':'hover',
                'template':myModalTemplate,
                delay:{ show:1100, hide:900 }
            };
            $(this.el).popover(options);
        },

        mleave:function () {
//            console.log('hover end!');
//            clearTimeout(this.timer);
            setTimeout(function () {
                $(this.el).popover('hide');
            }, 1000);

        },
        render:function () {
            var data = this.model.get('data');
            if (this.model.get('type') == 'Payment') {
                var payment_type = data.payment_type;
                if (payment_type == 0) {
                    var notes = this.model.get('notes');
                    this.model.set('type', "Account Update");
                    this.model.set('status', '<span class="badge badge-important pull-right">Balance Correction</span>');
//                    $(this.el).addClass('error');
                } else if (payment_type == 1) {
                    this.model.set('type', "Payment");
                    //$(this.el).addClass('success');
                } else if (payment_type == 2) {
                    this.model.set('type', "Payment");
                    this.model.set('status', '<span class="badge badge-success pull-right">Automatic Payment</span>');
                    //$(this.el).addClass('success');
                } else if (payment_type == 3) {
                    this.model.set('type', "Account Update");
                    this.model.set('status', '<span class="badge badge-warning pull-right">Account Disconnection</span>');
                    //$(this.el).addClass('success');
                } else if (payment_type == 4) {
                    this.model.set('type', "Account Update");
                    this.model.set('status', '<span class="badge badge-success pull-right">Account Reconnection</span>');
                    //$(this.el).addClass('success');
                } else if (payment_type == 5) {
                    this.model.set('type', "New Account");
                    this.model.set('status', '<span class="badge badge-success pull-right">New Connection</span>');
                    //$(this.el).addClass('success');
                } else if (payment_type == 6) {
                    this.model.set('type', "Prorated");
                    this.model.set('status', '<span class="badge badge-success pull-right">Prorated</span>');
                    //$(this.el).addClass('success');
                } else if (payment_type == 7) {
                    this.model.set('type', "Fine");
                    this.model.set('status', '<span class="badge badge-warning pull-right">Reason: '+data.notes+'</span>');
                    //$(this.el).addClass('success');
                    console.log('data',data);
                } else {
                    this.model.set('type', "Unknown");
                    $(this.el).addClass('error');
                }
            } else if (this.model.get('type') == 'Bill') {
                if (data.processed == "1") {
                    //$(this.el).addClass('warning');
                } else {
                    $(this.el).addClass('info');
                }
            } else if (data.deleted == "1") {
                $(this.el).addClass('error');
            }
            $(this.el).attr("id", this.model.get('id'));
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
            console.log('xx Model clicked :' + this.model.id);
            return false;
        }
    });

    var TemplatesCollectionView = Backbone.View.extend({
        //el: '#games_list_ul',
        template:_.template(aCollectionTemplate),
        initialize:function () {
            console.log('collection init');
            $(this.options.el).empty();
            $(this.options.el).html(this.template);
            this.collection = new LedgerCollection;

//            this.collection.comparator = function (ledger) {
////                return ledger.get('timestamp');
//                return ledger.get('created_at');
//            };


            _.bindAll(this, 'addOne', 'addAll', 'render', 'mysqlTimeStampToDate', 'TemplateClick', 'sortOrderChanged', 'ConsumerFine');
            $("#consumer_disconnect_reconnect_account").click(this.TemplateClick);
            $("#consumer_fine_account").click(this.ConsumerFine);
            $("#ledger_sort_order").bind("change", this.sortOrderChanged);
            this.collection.bind('add', this.addOne);

            //collection = this.collection;

            var xconsumer = this.options.consumer;

            var bills = this.options.bills;
            var payments = this.options.payments;

            if (xconsumer.deleted == 1) {
                $("#consumer_disconnect_reconnect_account").hide();
            } else if (xconsumer.disconnection_status == 1) {
                // account disconnected, allow connection
                $("#consumer_disconnect_reconnect_account").addClass('btn-warning');
                $("#span_consumer_disconnect_reconnect_account").html('Reconnect Account');
            } else if (xconsumer.disconnection_status == 0) {
                $("#consumer_disconnect_reconnect_account").addClass('btn-success');
                $("#span_consumer_disconnect_reconnect_account").html('Disconnect Account');
            }

//            var a = ["one", "two", "three"];
//            console.log('creating collection for ledger');
//            console.log('adding bills: ' + bills.length);

            _.each(bills, function (bill) {
//                console.log('adding bill ' + bill.id);
                billjob = bill.billjob;
                var aModel = new LedgerModel();
                aModel.set({
                    'id':bill.id + 'b',
                    'type':'Bill',
                    'date':this.mysqlTimeStampToDate(bill.date_processed).toDateString(),
                    'timestamp':this.mysqlTimeStampToDate(bill.date_processed).getTime(),
                    'updated_at':this.mysqlTimeStampToDate(bill.updated_at).getTime(),
                    'created_at':this.mysqlTimeStampToDate(billjob.created_at).getTime(),
                    'amount':'',
                    'amount_due':bill.amount_due,
                    'balance':bill.balance,
                    'balance_before':bill.balance,
                    'balance_after':bill.balance,
                    'data':bill
                });
                this.collection.add(aModel, {silent:true});
            }, this);

//            console.log('adding payments: ' + payments.length);
            _.each(payments, function (payment) {
                var aModel = new LedgerModel();
//                console.log('adding payment ', payment.id);
                aModel.set({
                    'id':payment.id + 'p',
                    'type':'Payment',
                    'date':this.mysqlTimeStampToDate(payment.payment_date).toDateString(),
                    'timestamp':this.mysqlTimeStampToDate(payment.payment_date).getTime(),
                    'updated_at':this.mysqlTimeStampToDate(payment.updated_at).getTime(),
                    'created_at':this.mysqlTimeStampToDate(payment.date_created).getTime(),
                    'user_id':payment.user_id,
                    'notes':payment.notes,
                    'amount':payment.payment_amount,
                    'balance':payment.balance_after,
                    'balance_before':payment.balance_before,
                    'balance_after':payment.balance_after,
                    'amount_due':payment.amount_due,
                    'data':payment
                });
//                console.log('ok, we have the model created, add to collection');
//                console.log('collection before adding model: ', this.collection);
//                console.log('model: ', aModel);
                this.collection.add(aModel, {silent:true});
//                console.log('collection after adding model: ', this.collection);
            }, this);

            /////////////////////////////////////////////////////////////////////////

            this.collection.each(
                function (transaction)
                {
                    var data = transaction.get('data');
                    if (transaction.get('type') == 'Payment')
                    {
                        transaction.set('status', '');
                    } else
                    {
                        var past_balance = parseFloat(this.model.get('balance'));
                        if (data.late == "1") {
                            transaction.set('was_bill_late', "Yes");
                            transaction.set('late_fee_display', data.late_fee_amount);
                            var amt = transaction.get('amount');
                            transaction.set('amount', transaction.get('amount') + " + " + data.late_fee_amount);
                            var amount_due = parseFloat(transaction.get('amount'), 10);
                            var late_fee_amount = parseFloat(data.late_fee_amount, 10);
                            var bill_total = parseFloat(amount_due + late_fee_amount + past_balance);
                            if (bill_total < 0) {
                                bill_total = 0.00;
                            }
                            transaction.set('bill_total', parseFloat(bill_total).toFixed(2));
                        } else {
                            var amount_due = parseFloat(transaction.get('amount'), 10);
                            var bill_total = parseFloat(amount_due + past_balance);
                            if (bill_total < 0) {
                                bill_total = 0.00;
                            }
                            transaction.set('was_bill_late', "No");
                            transaction.set('late_fee_display', "0.00");
                            transaction.set('bill_total', parseFloat(bill_total).toFixed(2));
                        }
                        if (data.processed == "1") {
                            transaction.set('bill_paid', "Yes");
                            transaction.set('status', '<span class="badge pull-right">Closed</span>');
                        } else {
                            transaction.set('bill_paid', "No");
                            transaction.set('status', '<span class="badge badge-success pull-right">Open</span>');
                        }
                    }

                    if (data.deleted == "1")
                    {
                        transaction.set('is_deleted', "Yes");
                    } else
                    {
                        transaction.set('is_deleted', "No");
                    }
                }
            );


            this.collection.comparator = function (Model) {
                return -Model.get("created_at");
            };
            this.collection.sort();

            /////////////////////////////////////////////////////////////////////////

            this.addAll();

//            console.log('collection:',this.collection);
//            this.collection.sort();

        },
        sortOrderChanged:function (e) {
            var new_sort = $(e.currentTarget).val();
            console.log('sort order: ', new_sort);
            this.collection.comparator = function (Model) {
                return -Model.get(new_sort);
            };
            this.collection.sort();
            this.addAll();
        },
        mysqlTimeStampToDate:function (timestamp) {
            //function parses mysql datetime string and returns javascript Date object
            //input has to be in this format: 2007-06-05 15:26:02
//            console.log('trying to convert ' + timestamp);
            try {
                var regex = /^([0-9]{2,4})-([0-1][0-9])-([0-3][0-9]) (?:([0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?$/;
                var parts = timestamp.replace(regex, "$1 $2 $3 $4 $5 $6").split(' ');
                return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
            } catch (ex) {
                return "undefined";
            }
        },
        render:function () {
//            console.log('render(): Templates Collection View: render() - doesnt do anything');
        },
        addAll:function () {
//            console.log('addAll();');
            //var myCollection = new Collection();
//            console.log(this.options.collection);
//            this.collection.comparator = function(ledger) {
//                return ledger.get('timestamp');
//            };
//            this.collection.sort();
            $(this.options.el).empty();
            $(this.options.el).html(this.template);
            this.collection.each(this.addOne);
        },
        addOne:function (aModel) {
//            console.log('addOne,', aModel);
            var view = new TemplateModelView({model:aModel});
            $(this.options.el).find('#collection_data_table tbody').last().append(view.render().el);
        },
        ConsumerFine: function (e) {
            console.log('lets do it ConsumerFine!');
            var mainView = this.options.mainView;
            e.stopPropagation();
            console.log('Consumer Fine, Account #: ', this.options.consumer);

            var dt = new Date();
            var date_string = dt.getDate() + '-' + ((dt.getMonth() + 1)) + '-' + dt.getFullYear();
            var consumer_name = this.options.consumer.name;
            var account_number = this.options.consumer.account_number;

            // account is currently connected, the user wants to disconnect it
                $("#account_fine_name").html(consumer_name);
                $("#account_fine_account_number").html(account_number);
                $("#account_fine_date").val(date_string);
                $("#account_fine_date").datepicker().on('changeDate', function (ev) {
                    $("#account_fine_date").datepicker('hide');
                });
                $("#account_fine_modal_save").click(function (e) {
                    $("#account_fine_modal_save").button('loading');
                    var dt = $("#account_fine_date").val();
                    var amount = $("#account_fine_amount").val();
                    var notes = $("#account_fine_notes").val();
                    console.log('ok, you clicked save!');
                    var d = {
                        model:{
                            account_number:account_number,
                            date:dt,
                            amount:amount,
                            notes:notes
                        }
                    };
                    $.post("/accountfine", d,
                        function (data) {
                            console.log("Post Data: ", data);
                            console.log(data.result);
                            if (data.result == "ok") {
                                mainView.loadLedger();
                                $("#account_fine_modal").modal('hide');
                            } else {
                                alert("Error: " + data.message);
                            }
                            $("#account_fine_modal_save").button('reset');
                        });
                });
                $("#account_fine_modal").modal();
        },
        TemplateClick:function (e) {
            var mainView = this.options.mainView;
            e.stopPropagation();
            console.log('Account Disconnection / Reconnection, Consumer: ', this.options.consumer);
            var current_status = this.options.consumer.disconnection_status;

            var dt = new Date();
            var date_string = dt.getDate() + '-' + ((dt.getMonth() + 1)) + '-' + dt.getFullYear();
            var consumer_name = this.options.consumer.name;
            var account_number = this.options.consumer.account_number;

            if (current_status == "0") {
                // account is currently connected, the user wants to disconnect it
                $("#account_disconnection_name").html(consumer_name);
                $("#account_disconnection_account_number").html(account_number);
                $("#account_disconnection_date").val(date_string);
                $("#account_disconnection_date").datepicker().on('changeDate', function (ev) {
                    $("#account_disconnection_date").datepicker('hide');
                });
                $("#account_disconnection_modal_save").click(function (e) {
                    $("#account_disconnection_modal_save").button('loading');
                    $("#account_disconnection_modal_save").attr('disabled', 'disabled');
                    var dt = $("#account_disconnection_date").val();
                    console.log('ok, you clicked save!');
                    var d = {
                        model:{
                            account_number:account_number,
                            date:dt,
                            status:1
                        }
                    };
                    $.post("/accountstatus", d,
                        function (data) {
                            console.log("Post Data: ", data);
                            console.log(data.result);
                            if (data.result == "ok") {
//                                $("#consumer_disconnect_reconnect_account").removeClass("btn-success");
//                                $("#consumer_disconnect_reconnect_account").addClass("btn-warning");
//                                $("#span_consumer_disconnect_reconnect_account").html("Account Disconnected!");
                                mainView.loadLedger();
                                $("#account_disconnection_modal").modal('hide');
                            } else {
                                alert("Error: " + data.message);
                            }
                            $("#account_disconnection_modal_save").button('reset');
                            $("#account_disconnection_modal_save").removeAttr('disabled');
                        });
                });
                $("#account_disconnection_modal").modal();
            } else if (current_status == "1") {
                // account is currently disconnected, the user wants to re-connect it
                $("#account_reconnection_name").html(consumer_name);
                $("#account_reconnection_account_number").html(account_number);
                $("#account_reconnection_date").val(date_string);
                $("#account_reconnection_date").datepicker().on('changeDate', function (ev) {
                    $("#account_reconnection_date").datepicker('hide');
                });
                $("#account_reconnection_modal_save").click(function (e) {
                    $("#account_reconnection_modal_save").button('loading');
                    $("#account_reconnection_modal_save").attr('disabled', 'disabled');
                    var dt = $("#account_reconnection_date").val();
                    console.log('ok, you clicked save!');
                    var d = {
                        model:{
                            account_number:account_number,
                            date:dt,
                            status:0
                        }
                    };
                    $.post("/accountstatus", d,
                        function (data) {
                            console.log("Post Data: ", data);
                            console.log(data.result);
                            if (data.result == "ok") {
                                mainView.loadLedger();
                                $("#account_reconnection_modal").modal('hide');
                            } else {
                                alert("Error: " + data.message);
                            }
                            $("#account_reconnection_modal_save").button('reset');
                            $("#account_reconnection_modal_save").removeAttr('disabled');
                        });
                });
                $("#account_reconnection_modal").modal();
            }
        }
    });

    return TemplatesCollectionView;
});
