// from home/main.js
define([
    'text!templates/desktop/account/ledger_edit.html',
    'text!templates/desktop/account/sidebar.html',
    'text!templates/desktop/account/ledger.html',
    'models/account',
    'backbone',
    'backgrid-text-cell'
], function (aTemplate, aSidebar, ledgerTemplate, accountModel) {

    var aView = Backbone.View.extend({
        initialize: function () {
            this.model = new accountModel();
            this.render();
            _.bindAll(this, 'render', 'TemplateClicked', 'loadLedger', 'bindEvents', 'formatMoney', 'loadLedger', 'handle_click_amount_process', 'renderLedger');
            _.bindAll(this, 'handle_date_change', 'handle_date_change_helper');
            this.bindEvents();
//            console.log('ledger_edit init');
        },
        bindEvents: function () {
//            $('#input_account_num').keyup(this.KeyUpEvent);
        },
        render: function () {
            $(this.options.main_el).html(_.template(aTemplate));
//            $(this.options.main_el).html(this.options.account_number);
            $(this.options.sidebar_el).html(_.template(aSidebar));
//            $("#input_account_num").select();
            this.loadLedger();
        },
        TemplateClicked: function (e) {
            e.stopPropagation();
            console.log('TemplateClicked!');
            return false;
        },
        formatMoney: function (n, decPlaces, thouSeparator, decSeparator) {
//            var n = this,
            decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces;
            decSeparator = decSeparator == undefined ? "." : decSeparator;
            thouSeparator = thouSeparator == undefined ? "," : thouSeparator;
            sign = n < 0 ? "-" : "+";
            i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "";
            j = (j = i.length) > 3 ? j % 3 : 0;
            var retval = (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
            if (sign == "+") {
                return "( " + retval + " )";
            }
            return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
        },
        loadLedger: function () {
//            console.log('loadLedger');
//            var value = $("#input_account_num").val();
            var account_number = this.options.account_number;
//            console.log('loadledger');
            var mainView = this;
//            require(['models/account'], function (accountModel) {
            this.model = new accountModel();
            this.model.url = "/account/" + account_number;
//            this.model.bind('change', this.renderLedger);
//                    this.model.set({ 'id':value });
            this.model.fetch({
                error: function (m, r) {
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
                success: function (m, r) {
//                    console.log('Ok, account loaded, here it is:', m);
                    // model loaded, now render it!
                    // remove the error classes add success.
                    $("#ok_or_not_span").removeClass("badge-important");
                    $("#ok_or_not_span").removeClass("badge-success");
                    $("#ok_or_not_icon").removeClass("icon-ok");
                    $("#ok_or_not_icon").removeClass("icon-remove");
                    $("#ok_or_not_span").addClass("badge-success");
                    $("#ok_or_not_icon").addClass("icon-ok");

                    $("#account_info_div").html("loaded!");
                    mainView.renderLedger();
//                        console.log('loaded: ', m);

                }
            });
//            });
        },
        renderLedger: function () {
            //console.log('renderLedger', this.model);
            var mainView = this;
            if (typeof this.model != 'undefined') {
//                console.log('ok, not undefined');
                var consumer = this.model.get('consumer');
                var snapshot = this.model.get('snapshot');
                //                        console.log('snapshot.arrears:',snapshot.arrears);
                if (snapshot.arrears > 0) {
                    this.model.set('balance_color', "red");
                } else {
                    this.model.set('balance_color', "green");
                }
                //                        this.model.set('balance_formatted', mainView.formatMoney(consumer.balance,2,',','.'));
                this.model.set('balance_formatted', this.formatMoney(snapshot.arrears, 2, ',', '.'));
                //                        this.model.set('minimum_deposit', mainView.formatMoney(consumer.balance,2,',','.'));

                var deleted = consumer.deleted;
                var disconnection_status = consumer.disconnection_status;

                if (deleted == "1") {
                    //                            this.model.set('div_alert', '<span class="badge badge-important label-important pull-left" style="margin-top: 20px; padding: 10px;">Account Deleted!</span>');
                    //                                this.model.set('div_class','alert alert-error');
                    this.model.set('div_style', 'background-color: #BBBBBB;');
                } else if (disconnection_status == "1") {
                    //                            this.model.set('div_alert', '<span class="badge badge-warning pull-left" style="margin-top: 20px; padding: 10px;">Account Disconnected!</span>');
                    //                                this.model.set('div_class','alert');
                    this.model.set('div_style', 'background-color: #fbd69b;');
                } else {
                    //                            this.model.set('div_alert', '');
                    //                                this.model.set('div_class','alert alert-info');
                    //                            this.model.set('div_alert', '<span class="badge badge-success pull-left" style="margin-top: 20px; padding: 10px;">Account Active</span>');
                    this.model.set('div_style', 'background-color: #9cc1fd;');
                }
                // this temlate should define the structure of what the ledger should look like..
                var myTemplate = _.template(ledgerTemplate);
                $("#account_info_div").html(myTemplate(this.model.toJSON()));

                var bills = consumer.bills;
                var payments = consumer.payments;
                //
                //                            var mysqlTimeStampToDate = function (timestamp) {
                //                                            //function parses mysql datetime string and returns javascript Date object
                //                                //input has to be in this format: 2007-06-05 15:26:02
                //                                var regex = /^([0-9]{2,4})-([0-1][0-9])-([0-3][0-9]) (?:([0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?$/;
                //                                var parts = timestamp.replace(regex, "$1 $2 $3 $4 $5 $6").split(' ');
                //                                return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
                //                            };

                require(['models/ledger', 'collections/ledgers', 'views/desktop/account/ledgerV2'], function (ledgerModel, ledgerCollection, aCollectionView) {
//                    console.log('mainView', mainView);
//                    console.log('consumer', consumer);
//                    console.log('bills', bills);
//                    console.log('payments', payments);

                    var myCollectionView = new aCollectionView({el: '#ledger_table', mainView: mainView, 'consumer': consumer, 'bills': bills, 'payments': payments});
                    //                                var myCollectionView = new aCollectionView({el:'#ledger_table', 'collection':myCollection});
                    //                                myCollectionView.addAll();
                });

                var current_payment_post_date = new Date();
                //                        var month = current_payment_post_date.getMonth() + 1;
                var month = ("0" + (current_payment_post_date.getMonth() + 1)).slice(-2);
                $("#payment_post_date").val(current_payment_post_date.getFullYear() + "-" + month + "-" + current_payment_post_date.getDate());
                $("#payment_post_date").datepicker('hide');

                $("#payment_post_date").datepicker().on('changeDate', mainView.handle_date_change);

                $("#payment_post_amount_btn").bind('click', mainView.handle_click_amount_process);
                mainView.handle_date_change_helper(new Date());
            }
        },
        handle_date_change_helper: function(newDate) {
//            console.log('snapshot: ', snapshot);
            var snapshot = this.model.get('snapshot');
            var due_date = new Date(snapshot.due_date);
            var display = snapshot.payable_by_due_date + ".00";
            if (newDate.getTime() > due_date.getTime()) {
//                        console.log('over due');
                if (newDate.getFullYear() == due_date.getFullYear()) {
//                            console.log('same year');
                    if (newDate.getMonth() == due_date.getMonth()) {
//                                console.log('same month');
                        if (newDate.getDate() == due_date.getDate()) {
                            // on due date, not overdue
//                                    console.log('same day, not overdue');
                        } else if (newDate.getDate() > due_date.getDate()) {
//                                    console.log('overdue, same month'); // THIS ONE
                            display = snapshot.amount_payable_after_due_date + ".00" + ' <small style="color: darkgray;">(' + snapshot.late_payment_surcharge + ' Late Fee)</small>';
                        } else {
//                                    console.log('not past due date, not overdue');
                        }
                    } else if (newDate.getMonth() > due_date.getMonth()) {
//                                console.log('overdue, not same month');  // THIS ONE
                        display = snapshot.amount_payable_after_due_date_2 + ".00" + ' <small style="color: darkgray;">(' + snapshot.late_payment_surcharge_2 + ' Late Fee)</small>';
                    } else {
                        // month less than due, not overdue
//                                console.log('same year, same month, not overdue');
                    }
                }
            }
            $("#snapshot_amount_due").html(display);
            $("#payment_post_date").datepicker('hide');
        },
        handle_date_change: function (ev) {
            newDate = new Date(ev.date);
            this.handle_date_change_helper(newDate);
        },
        handle_click_amount_process: function () {
            console.log('handle_click_amount_process, this.model: ', this.model);
            var consumer = this.model.get('consumer');

            var post_amount = $("#payment_post_amount").val();
            if (post_amount > 9999) {
                if (post_amount >= 7654321 && post_amount <= 9999999) {
                    var conf = confirm("Oops! Looks like you entered an account number in the payment entry box, would you like to open account " + post_amount + "?");
                    if (conf == true) {
                        console.log("OK..lets go!");
                        window.app_router.navigate("ledger/edit/" + post_amount, {trigger: true});
                        return false;
                    }
                }
                console.log('Amount not ok.');
                alert('Invalid payment amount entered, the amount is too high.');
                return false;
//                $("#payment_post_amount_btn").attr('disabled', 'disabled');
            }
            var current_payment_post_date = new Date($('#payment_post_date').data().datepicker.date);
            var account_num = consumer.account_number;
            var post_date = $("#payment_post_date").val();

            $('#confirm_payment_modal').modal();
            $("#confirm_post_account").html(account_num);
            $("#confirm_post_amount").html("&#8377; " + post_amount + ".00");
            $("#confirm_post_date").html(post_date);

            // this is the final balance
            // new_balance = Current Balance + Current Bill - Payment
//            $("#confirm_post_arrears").html("&#8377; " + new_balance + ".00");

            $("#final_payment_confirm_btn").unbind('click');
            $("#final_payment_confirm_btn").bind('click', function (cev) {
                $("#final_payment_confirm_btn").attr('disabled', 'disabled');
                //console.log(account_num);
                require(['models/payment'], function (paymentModel) {
                    var newPayment = new paymentModel;
                    newPayment.set({
                        'account_number': account_num,
                        'payment_amount': post_amount,
                        'payment_date': post_date
                    });
//                                        console.log('saving new payment');
                    console.log(newPayment);
                    newPayment.save({}, {
                        error: function (m, r) {
                            $("#final_payment_confirm_btn").removeClass('btn-primary');
                            $("#final_payment_confirm_btn").addClass('btn-warning');
                            $("#final_payment_confirm_btn").html('Failed!');
                            $("#confirm_post_notes").html("An error occurred while posting this payment!<br/>Please reload the ledger to verify this payment before retrying.<br/>Error: " + r.status + " Message: " + r.statusText);
//                            setTimeout(function () {
//                                //$("#final_payment_confirm_btn").removeAttr('disabled');
//                            }, 2000);
                            console.log("error, response: " + JSON.stringify(r));
                            alert("An error occured while posting this payment, please check the ledger.\n Error: " + r.status + " Message: " + r.statusText);
                        },
                        success: function (m, r) {
                            $("#final_payment_confirm_btn").removeClass('btn-primary');
                            $("#final_payment_confirm_btn").addClass('btn-success');
                            $("#final_payment_confirm_btn").text('Saved!');
                            var timeoutID = window.setTimeout(function () {
                                $('#confirm_payment_modal').modal('hide');
//                                require(['views/desktop/payment/main'], function (aView) {
//                                    var myView = new aView({
//                                        'main_el': '#content_body',
//                                        'sidebar_el': '#content_sidebar',
//                                        'topbar_el': '#content_topbar'
//                                    });
//                                });
                                window.app_router.navigate('#ledger/edit/' + account_num, true);
                                window.location.reload();// .replace("#payment");
//                                                    window.location.href = "#payment";
                            }, 1000);
                            //console.log("Payment saved to database, response: " + JSON.stringify(r));
                        }
                    });
                });
            });

        }

    });
    return aView;
});
