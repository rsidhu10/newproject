// from home/main.js
define([
    'collections/payments',
    'text!templates/desktop/payment/main.html',
    'text!templates/desktop/account/sidebar.html',
    'text!templates/desktop/payment/account.html',
    'text!templates/desktop/payment/collection.html',
    'text!templates/desktop/payment/model.html',
    'backbone'
], function (Collection, aTemplate, aSidebar, accountTemplate, aCollectionTemplate, aModelTemplate) {

    var aView = Backbone.View.extend({
        initialize:function () {
            this.render();
            this.bindEvents();
            _.bindAll(this, 'render', 'TemplateClicked');

        },
        bindEvents:function () {
            $('#input_account_num').keyup(this.KeyUpEvent);
        },
        render:function () {
            $(this.options.main_el).html(_.template(aTemplate));
            $(this.options.sidebar_el).html(_.template(aSidebar));
            $("#input_account_num").select();
            $("#nav_sidebar_payment li").removeClass("active");
            $("#nav_sidebar_payment_new").addClass("active");
        },
        TemplateClicked:function (e) {
            e.stopPropagation();
            console.log('TemplateClicked!');
            return false;
        },
        KeyUpEvent:function (e) {
            e.stopPropagation();
            self = this.model;
            var value = parseInt($(e.target).val());
            if (isNaN(value)) {
                value = "";
            }
            $(e.target).val(value);
            if (value < 7654321) {
                $("#ok_or_not_span").removeClass("badge-important");
                $("#ok_or_not_span").removeClass("badge-success");
                $("#ok_or_not_icon").removeClass("icon-ok");
                $("#ok_or_not_icon").removeClass("icon-remove");
                $("#ok_or_not_span").addClass("badge-important");
                $("#ok_or_not_icon").addClass("icon-remove");
                $("#account_info_div").html("Invalid Account Number.");
                return false;
            } // if (value >= 7654321) {
            else {
                //console.log("ok, 7 chars!");
                // create new model...
                require(['models/account'], function (accountModel) {
                    //;
                    this.model = new accountModel();
                    this.model.url = "/account/" + value;
//                    this.model.set({ 'id':value });
                    this.model.fetch({
                        error:function (m, r) {
                            console.log("error, response: " + JSON.stringify(r));
                            // remove the success classes and add error
                            $("#ok_or_not_span").removeClass("badge-important");
                            $("#ok_or_not_span").removeClass("badge-success");
                            $("#ok_or_not_icon").removeClass("icon-ok");
                            $("#ok_or_not_icon").removeClass("icon-remove");
                            $("#ok_or_not_span").addClass("badge-important");
                            $("#ok_or_not_icon").addClass("icon-remove");

                            $("#account_info_div").html("Account not found.");
                        },
                        success:function (m, r) {

                            console.log('Ok, account loaded, here it is:');
                            console.log(m);
                            // model loaded, now render it!
                            // remove the error classes add success.
                            $("#ok_or_not_span").removeClass("badge-important");
                            $("#ok_or_not_span").removeClass("badge-success");
                            $("#ok_or_not_icon").removeClass("icon-ok");
                            $("#ok_or_not_icon").removeClass("icon-remove");
                            $("#ok_or_not_span").addClass("badge-success");
                            $("#ok_or_not_icon").addClass("icon-ok");

                            $("#account_info_div").html("loaded!");
                            var myTemplate = _.template(accountTemplate);
                            $("#account_info_div").html(myTemplate(this.model.toJSON()));

                            var current_payment_post_date = new Date();
                            var month = current_payment_post_date.getMonth() + 1;
                            $("#payment_post_date").val(current_payment_post_date.getFullYear() + "-" + month + "-" + current_payment_post_date.getDate());
                            $("#payment_post_date").datepicker('hide');


                            var snapshot = this.model.get('snapshot');
                            var dueDate = new Date(snapshot.due_date);
                            console.log("XXXXXXXXXXXXXX Consumer Account Loaded, MODEL", this.model);

                            if (current_payment_post_date > dueDate) {
                                is_late = true;
                                $("#payment_post_due").val(snapshot.amount_payable_after_due_date);
//                                current_bill_total_due = snapshot.current_charges + snapshot.late_payment_surcharge;
                            } else {
//                                current_bill_total_due = snapshot.current_charges;
                                $("#payment_post_due").val(snapshot.payable_by_due_date);
                            }
                            $("#payment_post_amount").select();

                            var handle_click_amount_process = function (evx) {
                                console.log('myCollection: ',myCollection);
                                var last_payment = myCollection.getLastPayment();

                                var current_bill_total_due = 0;
                                var is_late = false;
                                var current_payment_post_date = new Date($('#payment_post_date').data().datepicker.date);
                                if (current_payment_post_date > dueDate) {
                                    is_late = true;
                                    $("#payment_post_due").val(snapshot.amount_payable_after_due_date);
                                    current_bill_total_due = snapshot.current_charges + snapshot.late_payment_surcharge;
                                } else {
                                    current_bill_total_due = snapshot.current_charges;
                                    $("#payment_post_due").val(snapshot.payable_by_due_date);
                                }

                                var account_num = parseInt($("#input_account_num").val());
                                var post_date = $("#payment_post_date").val();
                                var post_amount = $("#payment_post_amount").val();

                                var total_due = parseInt($("#payment_post_due").val());

                                var arrears = 0;
                                if (isNaN(total_due)) {
                                    total_due = 0;
                                    alert('Total Due is invalid, can not proceed!');
                                    return false;
                                }
                                if (isNaN(post_amount)) {
                                    post_amount = 0;
                                    alert('Payment amount is invalid, can not proceed!');
                                    return false;
                                }



                                // arrears is negative if person has positive balance
                                // arrars is positive is person owes money
                                //
                                var current_balance = snapshot.arrears;
                                var new_balance = current_balance + current_bill_total_due - post_amount;
                                console.log('Previous Balance: ' + current_balance);
                                console.log('Current Bill   : ' + current_bill_total_due);
                                console.log('Current Payment: ' + post_amount);
                                console.log('New Balance: ' + new_balance);

                                if (is_late) {
                                    $("#confirm_post_notes").show();
                                    console.log('payment is late.');
//                                    new_balance = new_balance + snapshot.late_payment_surcharge;
                                    $("#confirm_post_notes").html("Late Fee &#8377; " + snapshot.late_payment_surcharge + ".00 was applied to this account.");
                                }
                                else if ((!is_late) && new_balance > 10) {
                                    $("#confirm_post_notes").show();
                                    console.log('payment is not late, but its not paid in full.');
                                    new_balance = new_balance + snapshot.late_payment_surcharge;
                                    $("#confirm_post_notes").html("Late Fee &#8377; " + snapshot.late_payment_surcharge + ".00 is applied for balances greater than &#8377; 10");
                                } else {
                                    console.log("payment is not late and paid in full or balance < 10.");
                                    $("#confirm_post_notes").hide();
                                }
                                if(last_payment !== false) {
                                    var last_payment_amount_paid = parseInt(last_payment.get('amount_paid'), 10);
                                    var last_payment_payment_date = last_payment.get('payment_date_ymd');

                                    var this_payment_amount_paid = Math.abs(parseInt(post_amount, 10));


                                    if( (this_payment_amount_paid == Math.abs(last_payment_amount_paid)) && (last_payment_payment_date == post_date) ) {
                                        alert('Duplicate payment, please check your records!');
//                                        return false;
//
                                        $("#confirm_post_notes").show();
                                        console.log('Duplicate payment!');
                                        $("#confirm_post_notes").html("<strong>Possible duplicate payment, please check your records before submitting!</strong>");
                                    }
                                }


                                $('#confirm_payment_modal').modal();
                                $("#confirm_post_account").html(account_num);
                                $("#confirm_post_amount").html("&#8377; " + post_amount + ".00");
                                $("#confirm_post_date").html(post_date);
                                // this is the final balance
                                // new_balance = Current Balance + Current Bill - Payment
                                $("#confirm_post_arrears").html("&#8377; " + new_balance + ".00");

                                $("#final_payment_confirm_btn").unbind('click');
                                $("#final_payment_confirm_btn").bind('click', function (cev) {
                                    $("#final_payment_confirm_btn").attr('disabled', 'disabled');
                                    //console.log(account_num);
                                    require(['models/payment'], function (paymentModel) {
                                        var newPayment = new paymentModel;
                                        newPayment.set({
                                            'account_number':account_num,
                                            'payment_amount':post_amount,
                                            'payment_date':post_date
                                        });
//                                        console.log('saving new payment');
                                        console.log(newPayment);
                                        newPayment.save({}, {
                                            error:function (m, r) {
                                                $("#final_payment_confirm_btn").removeClass('btn-primary');
                                                $("#final_payment_confirm_btn").addClass('btn-warning');
                                                $("#final_payment_confirm_btn").val('Failed!');
                                                setTimeout(function () {
                                                    $("#final_payment_confirm_btn").removeAttr('disabled');
                                                }, 2000);
                                                console.log("error, response: " + JSON.stringify(r));
                                            },
                                            success:function (m, r) {
                                                $("#final_payment_confirm_btn").removeClass('btn-primary');
                                                $("#final_payment_confirm_btn").addClass('btn-success');
                                                $("#final_payment_confirm_btn").text('Saved!');
                                                var timeoutID = window.setTimeout(function () {
                                                    $('#confirm_payment_modal').modal('hide');
                                                    require(['views/desktop/payment/main'], function (aView) {
                                                        var myView = new aView({
                                                            'main_el':'#content_body',
                                                            'sidebar_el':'#content_sidebar',
                                                            'topbar_el':'#content_topbar'
                                                        });
                                                    });
                                                    window.app_router.navigate('#payment', {trigger:true});
//                                                    window.location.replace("#payment");
//                                                    window.location.href = "#payment";
                                                }, 1000);
                                                //console.log("Payment saved to database, response: " + JSON.stringify(r));
//
//
                                            }
                                        });
                                    });
                                });
                            };

                            $('#payment_post_amount').keyup(function (ev) {
                                //console.log(ev.keyCode);
                                if (ev.keyCode == 13) {
                                    handle_click_amount_process();
                                }
                                //console.log('ok, keyup on price');
                                var amount = parseInt($('#payment_post_amount').val());
                                if (amount.toString() == "NaN") {
                                    amount = "";
//                                    console.log('NaN Nan!')
                                }
                                if (amount > 0) {
                                    $("#payment_post_amount_btn").removeAttr('disabled');
                                    //console.log(amount + ' is > 0, removed disabled attr');
                                } else {
                                    $("#payment_post_amount_btn").attr('disabled', 'disabled');
                                    //console.log(amount + ' is <= 0, disabled btn');
                                }
                                $('#payment_post_amount').val(amount);
                            });

                            $("#payment_post_date").datepicker().on('changeDate', function (ev) {
                                console.log("Date Changed: " + ev.date.valueOf());
                                newDate = new Date(ev.date);
                                $('#payment_post_date').text($('#inputStartDate').data('date'));
                                $("#payment_post_date").datepicker('hide');
                                if (newDate > dueDate) {
                                    $("#payment_post_due").val(snapshot.amount_payable_after_due_date);
                                } else {
                                    $("#payment_post_due").val(snapshot.payable_by_due_date);
                                }
                            });


//                            $("#payment_post_amount_btn").bind('click', handle_click_amount_process);


//                            require(['collections/payments', 'views/desktop/payment/list'], function (aCollection, aCollectionView) {
                            var myCollection = new Collection;
                            var account_number = m.attributes.consumer.account_number;
                            console.log('account: ', account_number);
                            myCollection.url = "/payments/consumer/" + account_number;
                            var myCollectionView = new TemplatesCollectionView({el:'#collection_div', 'collection':myCollection});
//                            });
                            $("#payment_post_amount_btn").bind('click', handle_click_amount_process);

                        }
                    });
                });
            }
//            console.log('KeyUpEvent!');

            return false;
        }

    });

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
            var payment_date = new Date(this.model.get('payment_date'));
            var date_created = new Date(this.model.get('date_created'));
            payment_date_string = monthNames[payment_date.getMonth()] + " " + payment_date.getDate() + ", " + payment_date.getFullYear();
            date_created_string = monthNames[date_created.getMonth()] + " " + date_created.getDate() + ", " + date_created.getFullYear();
            this.model.set("payment_date_string", payment_date_string);
            this.model.set("date_created_string", date_created_string);

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
            console.log('inside init');
            var self = this;
            _.bindAll(this, 'addOne', 'addAll', 'render', 'refreshJobs');

            this.collection.bind('add', this.addOne);
            this.collection.bind('reset', this.addAll);
            //this.collection.bind("change", this.render, this);

            console.log('calling fetch');
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
                    console.log("success! # of Templates: " + model.length);
                    //console.log(model);
                }
            });
            //$("#refresh_jobs").bind('click',this.refreshJobs);
//            console.log('binding click..');
//            $("#refresh_jobs").bind('click',function() {
//                console.log('ok, click!');
//            });
            //;
            $('#refresh_jobs').live('click', function () {
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
//

        },
//        events: {
//            "click": this.refreshJobs
//        },
        refreshJobs:function () {
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

    return aView;
});
