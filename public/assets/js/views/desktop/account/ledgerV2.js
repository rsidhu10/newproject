define([
    'models/ledger',
    'collections/ledgers',
    'text!templates/desktop/account/ledger_collection.html',
    'text!templates/desktop/account/ledger_model.html',
    'text!templates/desktop/account/ledger_payment_hover.html',
    'text!templates/desktop/account/ledger_bill_hover.html',
    'text!templates/desktop/account/ledger_bill_hover_modal_template.html',
    'text!templates/desktop/account/ledger_fine_hover.html',
    'text!templates/desktop/account/ledger_reconnect_hover.html',
    'text!templates/desktop/account/ledger_disconnect_hover.html',
    'text!templates/desktop/account/ledger_balance_correction_hover.html',
    'backbone',
    'backgrid-text-cell'
], function (LedgerModel, LedgerCollection, aCollectionTemplate, aModelTemplate, PaymentTemplate, BillTemplate, myModalTemplate, fineTemplate, reconnectTemplate, disconnectTemplate, bcTemplate) {

    $.fn.pulse = function (options) {

        var options = $.extend({
            times: 3,
            duration: 1000
        }, options);

        var period = function (callback) {
            $(this).animate({opacity: 0}, options.duration, function () {
                $(this).animate({opacity: 1}, options.duration, callback);
            });
        };
        return this.each(function () {
            var i = +options.times, self = this,
                repeat = function () {
                    --i && period.call(self, repeat)
                };
            period.call(this, repeat);
        });
    };

    /** ************************************************ **/
    var TemplateModelView = Backbone.View.extend({
        tagName: 'tr',
        detail_el: '',
        template: _.template(aModelTemplate),
        modal_template: _.template(myModalTemplate),
        //className:'alert-message warning',
        timer: '',
        events: {
            "click": 'TemplateClicked'
//            "mouseenter":'menter',
//            "mouseleave":'mleave'
        },
        initialize: function () {
//            console.log('ledgerV2 TemplateModelView init');
//            console.log('TemplateModelView: init()', this.model);
            _.bindAll(this, 'render', 'remove', 'TemplateClicked', 'fixthedate', 'saveTransaction', 'updateFields', 'updateBillFields', 'renderModel', 'updateAbove', 'updateBelow', 'deleteModel', 'handle_bill_date_change', 'explodeDate');
//            this.model.once('change', this.render);
        },
        fixthedate: function (d) {
            var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

            function pad(n) {
                return n < 10 ? '0' + n : n
            }

            var return_string = monthNames[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
            return return_string;
        },
        explodeDate: function (d) {
            var parts = d.split('-');
            var dateObject = {};
            dateObject.year = parseInt(parts[0]);
            dateObject.month = parseInt(parts[1]);
            dateObject.day = parseInt(parts[2]);
            return dateObject;
        },
        mleave: function () {
//            console.log('hover end!');
//            clearTimeout(this.timer);
            setTimeout(function () {
                $(this.el).popover('hide');
            }, 1000);
        },
        renderModel: function (model, highlight) {

            if (model.get('deleted') == 1) {
                $("#" + model.id).css('text-decoration', 'line-through');
                $("#" + model.id).css('color', '#ccc');
                $("#" + model.id).css('background-color', '#eee');
                $("#" + model.id).css('font-style', 'italic');
            } else {
                var bal_before_old = this.model.get('balance_before_old');
                var bal_before_new = this.model.get('balance_before');
                var bal_before_string = "";
                if (bal_before_old == bal_before_new) {
                    bal_before_string = model.get('balance_before');
                } else {
                    bal_before_string = "<span style='text-decoration: line-through;color:#ccc;'>" + model.get('balance_before_old') * -1 + "</span> " + model.get('balance_before');
                }
                $("#" + model.id + " [name=balance_before]").html(bal_before_string);
                if (highlight) {
                    $("#" + model.id + " [name=balance_before]").css('backgroundColor', '#ffa');
                }
                $("#" + model.id + " [name=balance_before]").css('color', '#F00');

                var type_status = model.get('type_status');
                var bill_debit = "";
                if (type_status == "Bill" || type_status == "Bill (Open)") {
                    var late_fee_amount = parseInt(model.get('late_fee_amount'));
                    if (!isNaN(late_fee_amount) && late_fee_amount > 0) {
                        bill_debit = model.get('amount_due') + ' + ' + model.get('late_fee_amount') + ' Late Fee';
                    } else {
                        bill_debit = model.get('amount_due');
                    }
                    $("#" + model.id + " [name=debit]").html(bill_debit);
                }

                if (type_status == "Bill (Open)") {
                    if (model.get('processed') == 1) {
                        $("#" + model.id + " [name=status]").html("<span style='color:#ccc;'>Bill </span><span style='color:#ccc;text-decoration: line-through;'>(Open)</span> Closed");
                        $("#" + model.id + " [name=status]").css('color', '#F00');
                        $("#" + model.id + " [name=balance_after]").html(model.get('balance_after'));
                        $("#" + model.id + " [name=balance_after]").css('color', '#F00');
                    } else {
                        $("#" + model.id + " [name=status]").html("Bill (Open)");
                        $("#" + model.id + " [name=status]").css('color', '#000');
                        $("#" + model.id + " [name=balance_after]").html('');
//                        $("#"+model.id+" [name=balance_after]").css('color', '#F00');
                    }
                } else {
                    $("#" + model.id + " [name=balance_after]").html("<span style='color:#ccc;text-decoration: line-through;'>" + model.get('balance_after_old') * -1 + "</span> " + model.get('balance_after'));
                    $("#" + model.id + " [name=balance_after]").css('color', '#F00');
                }

                // credit
                if (model.has('credit_old')) {
                    if (model.get('credit') != model.get('credit_old')) {
                        var credit_string = "";
                        if (!isNaN(model.get('credit_old'))) {
                            credit_string += "<span style='text-decoration: line-through;color:#ccc;'>" + model.get('credit_old') * -1 + "</span> ";
                        }
                        if (!isNaN(model.get('credit'))) {
                            credit_string += model.get('credit');
                        }
                        $("#" + model.id + " [name=credit]").html(credit_string);
//                        $("#" + model.id + " [name=credit]").html("<span style='text-decoration: line-through;color:#ccc;'>" + model.get('credit_old') * -1 + "</span> " + model.get('credit'));
                    }

                }
                if (model.has('debit_old')) {
                    if (model.get('debit') != model.get('debit_old')) {
                        var debit_string = "";
                        if (!isNaN(model.get('debit_old'))) {
                            debit_string += "<span style='text-decoration: line-through;color:#ccc;'>" + model.get('debit_old') * -1 + "</span> ";
                        }
                        if (!isNaN(model.get('debit'))) {
                            debit_string += model.get('debit');
                        }
                        $("#" + model.id + " [name=debit]").html(debit_string);
//                        $("#" + model.id + " [name=debit]").html("<span style='text-decoration: line-through;color:#ccc;'>" + model.get('debit_old') * -1 + "</span> " + model.get('debit'));
                    }
                }
            }
        },
        render: function () {
//            console.log('render model', this.model);
            var that = this;
            var data = this.model.get('data');
//            console.log('row type: ', this.model);
            this.model.set('debit_details', '');
            var details_template = _.template(PaymentTemplate);
            if (this.model.get('type') == 'Payment') {
                /*
                 payment_type:
                 0 - Balance Correction
                 1 - Normal Payment
                 2 - Auto Pay
                 3 - Disconnect
                 4 - Reconnect
                 5 - New
                 6 - Prorated bill (when disconnecting)
                 7 - Fines - Notes contain the reason?
                 8 - Prepay

                 <td><%= type %></td>
                 <td><%= created_at %></td>
                 <td><%= details %></td>
                 <td><%= debit %></td>
                 <td><%= credit %></td>
                 <td><%= ending_balance %></td>
                 */
                this.model.set('description', "");
                var payment_type = data.payment_type;

                this.model.set('payment_date_display', that.fixthedate(new Date(data.payment_date)));

                if (payment_type == 0) {
                    var notes = this.model.get('notes');
                    this.model.set('type_status', "Balance Correction");
                    $(this.el).addClass('balance-correction');
                    var amt = parseFloat(this.model.get('amount'));
                    if (amt > 0) {
                        this.model.set('debit', '');
                        this.model.set('credit', amt);
                    } else {
                        amt = amt * -1;
                        this.model.set('debit', amt.toFixed(2));
                        this.model.set('credit', '');
                    }
                    this.model.set('description', that.fixthedate(new Date(data.payment_date)));

                    details_template = _.template(bcTemplate);

//                    this.model.set('status', '<span class="badge badge-important pull-right">Balance Correction</span>');
//                    $(this.el).addClass('error');
                } else if (payment_type == 1) {
                    this.model.set('type_status', "Payment");
                    $(this.el).addClass('payment');
                    this.model.set('debit', '');
                    this.model.set('credit', this.model.get('amount'));
                    var balance_after = parseFloat(this.model.get('balance_after'));
                    var balance_before = parseFloat(this.model.get('balance_before'));
                    var amount = parseFloat(this.model.get('amount'));
                    balance_before = balance_after + amount;
//                    this.model.set('balance_before', balance_before);
                    this.model.set('description', that.fixthedate(new Date(data.payment_date)));
                    //$(this.el).addClass('success');
                } else if (payment_type == 2) {
                    this.model.set('type_status', "Payment (Auto)");
                    this.model.set('debit', '');
                    this.model.set('credit', this.model.get('amount'));
                    this.model.set('description', that.fixthedate(new Date(data.payment_date)));
                    return false;
//                    this.model.set('status', '<span class="badge badge-success pull-right">Automatic Payment</span>');
                    //$(this.el).addClass('success');
                } else if (payment_type == 3) {
                    this.model.set('type_status', "Account Disconnected");
                    this.model.set('debit', this.model.get('amount_due'));
                    $(this.el).addClass('account-disconnected');
                    this.model.set('description', that.fixthedate(new Date(data.payment_date)));
                    this.model.set('credit', '');
                    details_template = _.template(disconnectTemplate);
//                    this.model.set('status', '<span class="badge badge-warning pull-right">Account Disconnection</span>');
                    //$(this.el).addClass('success');
                } else if (payment_type == 4) {
                    this.model.set('type_status', "Account Reconnected");
                    $(this.el).addClass('account-reconnected');
                    this.model.set('debit', this.model.get('amount_due'));
                    this.model.set('description', that.fixthedate(new Date(data.payment_date)));
                    this.model.set('credit', '');
                    details_template = _.template(reconnectTemplate);
//                    this.model.set('status', '<span class="badge badge-success pull-right">Account Reconnection</span>');
                    //$(this.el).addClass('success');
                } else if (payment_type == 5) {
                    this.model.set('type_status', "New Connection");
                    $(this.el).addClass('new-connection');
                    this.model.set('debit', this.model.get('amount_due'));
                    this.model.set('description', that.fixthedate(new Date(data.payment_date)));
                    this.model.set('credit', '');
//                    this.model.set('status', '<span class="badge badge-success pull-right">New Connection</span>');
                    //$(this.el).addClass('success');
                } else if (payment_type == 6) {
                    this.model.set('debit', this.model.get('amount_due'));
                    this.model.set('credit', '');
                    this.model.set('type_status', "Prorated Bill (Disconnection)");
                    $(this.el).addClass('prorated-bill');
                    this.model.set('description', that.fixthedate(new Date(data.payment_date)));
//                    this.model.set('status', '<span class="badge badge-success pull-right">Prorated</span>');
                    //$(this.el).addClass('success');
                } else if (payment_type == 7) {
                    this.model.set('type_status', "Fine");
                    $(this.el).addClass('fine');
                    this.model.set('debit', this.model.get('amount_due'));
                    this.model.set('credit', '');
                    var notes = this.model.get('notes');
                    if (notes == null) {
                        notes = '';
                    }
                    this.model.set('description', notes + ' ' + that.fixthedate(new Date(data.payment_date)));
                    details_template = _.template(fineTemplate);
//                    this.model.set('status', '<span class="badge badge-warning pull-right">Reason: '+data.notes+'</span>');
                    //$(this.el).addClass('success');
//                    console.log('data',data);
                } else if (payment_type == 8) {
                    this.model.set('type_status', "Prepay");
                    $(this.el).addClass('prepay');
                    this.model.set('debit', this.model.get('amount_due'));
                    this.model.set('credit', '');
                    var notes = this.model.get('notes');
                    if (notes == null) {
                        notes = '';
                    }
                    this.model.set('description', notes + ' ' + that.fixthedate(new Date(data.payment_date)));
                    details_template = _.template(fineTemplate);
//                    this.model.set('status', '<span class="badge badge-warning pull-right">Reason: '+data.notes+'</span>');
                    //$(this.el).addClass('success');
//                    console.log('data',data);
                } else {
                    this.model.set('debit', this.model.get('amount_due'));
                    this.model.set('credit', this.model.get('payment_amount'));
                    this.model.set('type_status', "Unknown");
                    $(this.el).addClass('error');
                }
            } else if (this.model.get('type') == 'Bill') {
//                console.log('bill');

                details_template = _.template(BillTemplate);
                var net_amt = parseFloat(this.model.get('amount_due')) + parseFloat(this.model.get('late_fee_display'));
                if (parseFloat(this.model.get('late_fee_display')) > 0) {
                    this.model.set('debit_details', this.model.get('amount_due') + ' ' + this.model.get('amount') + ' (Late Fee)');
                }
                this.model.set('debit', net_amt.toFixed(2));
                this.model.set('credit', '');
                if (data.processed == "1") {
                    this.model.set('type_status', "Bill");
                    var b_before = parseFloat(this.model.get('balance_before'));
                    this.model.set('balance_after', (b_before + net_amt).toFixed(2));
                    $(this.el).addClass('bill-closed');
                } else {
                    this.model.set('type_status', "Bill (Open)");
                    this.model.set('balance_after', "");
//                    this.model.set('balance_after', parseFloat(this.options.consumer.balance).toFixed(2));
                    $(this.el).addClass('bill-open');

//                    this.model.set('type', "Bill")
                }

                var start_date = this.explodeDate(data.billjob.start_date);
                var end_date = this.explodeDate(data.billjob.end_date);
//                console.log('Bill: ', this.model.id);
//                console.log('start date: ', start_date);
//                console.log('end date  : ', end_date);
                var period = "";
                var monthNames = [ 'Zero', "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
                if ((start_date.year == end_date.year) && (start_date.month == end_date.month)) {
                    var m = monthNames[start_date.month];
                    var y = start_date.year.toString().slice(2);
                    period = m + ' ' + y;
                } else {
                    var m = monthNames[start_date.month];
                    var n = monthNames[end_date.month];
                    var y = start_date.year.toString().slice(2);
                    period = m + '-' + n + ' ' + y;
                }
                var description = period;
                if (this.model.get("processed") == 1) {
                    description = description + " | " + this.model.get('processed_type');
                }
                this.model.set('description', description);
//                console.log('start/end:', start_date, end_date);
                this.detail_el = "<tr class='details_row' style='display:none;'>" +
                    "<td></td>" +
                    "<td colspan='5' style='font-size: 70%;'>Period: " + period + "</td>" +
                    "</tr>";

//                console.log('due_date: ', data);
                this.model.set('date_due_display', that.fixthedate(new Date(data.due_date)));
//                console.log('render model 3');
            } else if (data.deleted == "1") {
                this.model.set('debit', '');
                this.model.set('credit', '');
                $(this.el).addClass('error');
            } else {
                console.log('why are we here? model: ', this.model);
            }
            var created_at = this.model.get('created_at');
            this.model.set('created_at_display', that.fixthedate(new Date(created_at)));
            this.model.set('date_processed_display', that.fixthedate(new Date(data.date_processed)));
            this.model.set('details', "details");

            // fix for display
            var balance_before_display = parseFloat(this.model.get('balance_before'));
            if (balance_before_display > 0) {
                balance_before_display = '( ' + balance_before_display.toFixed(2) + ' )';
            } else {
                balance_before_display = (balance_before_display * -1).toFixed(2);
            }
//            console.log('Settings models balance_before_display to: ', balance_before_display, this.model);
            this.model.set('balance_before_display', balance_before_display);


            var balance_after_display = parseFloat(this.model.get('balance_after'));
            if (isNaN(balance_after_display)) {
                balance_after_display = '';
            } else {
                if (balance_after_display > 0) {
                    balance_after_display = '( ' + balance_after_display.toFixed(2) + ' )';
                } else {
                    balance_after_display = (balance_after_display * -1).toFixed(2);
                }
            }
            this.model.set('balance_after_display', balance_after_display);


//            var details_template = _.template(PaymentTemplate);
//            if (this.model.get('type') === 'Bill') {
//                details_template = _.template(BillTemplate);
//            }

            options = {
                'animation': true,
                'html': true,
                'title': 'Transaction Details',
                'content': details_template(this.model.toJSON()),
                'placement': 'top',
                'trigger': 'hover',
                'template': myModalTemplate,
                delay: { show: 1100, hide: 1000 }
            };
            $(this.el).popover(options);

            $(this.el).attr("id", this.model.get('id'));
            $(this.el).html(this.template(this.model.toJSON()));
//            console.log('row: ' + this.model.id + ': ', this.model);
//            console.log('this',this);
//            console.log('returning this: ', this);

//            debugger;
            if ($("#" + this.model.id).length) {
                console.log('row exists, need ot update it');
//                debugger;
//                $("#"+this.model.id).el = this.el;
            } else {
                $('#collection_data_table tbody').last().append(this.el);
                $('#collection_data_table tbody').last().append(this.detail_el);
            }

            return this;
        },
        remove: function () {
            var myEl = this.el;
            this.model.destroy({
                error: function (model, response) {
                    console.log('error: failed to delete model, error: ' + response);
                    console.log(response);
                    alert('failed to delete model, error: ' + response);
                    //$(myEl).remove();
                },
                success: function (model, response) {
                    //window.location.hash = "admin/users";
                    //this.remove();
                    $(myEl).remove();
                }
            });
        },
        deleteModel: function () {
//            var new_prior_balance = parseFloat($("#row_edit_prior_balance").val());
//            if(old_prior_balance == new_prior_balance) {
//                console.log('nothing changed');
//                $("#ledger_row_edit_modal").modal('hide');
//                return false;
//            }
//            var type_status = this.model.get('type_status');
//            var credit = parseFloat(this.model.get('credit')) || 0;
//            var debit = parseFloat(this.model.get('debit')) || 0;
//            var new_ending_balance = new_prior_balance - credit + debit;
//            console.log("new_ending_balance = new_prior_balance - credit + debit");
//            console.log(new_ending_balance + "=" + new_prior_balance + "-" + credit +"+" +debit);

            this.model.set('deleted', 1);
//            this.model.set('balance_after', new_ending_balance);
//            this.model.set('balance_before_old',old_prior_balance);
//            this.model.set('balance_before',new_prior_balance);
            this.model.set('notes', notes);

            if ($("#row_edit_recursive").is(':checked')) {
//                console.log('recursive update requested');
//                var me = this.model.collection.indexOf(this.model) + 1;
//                var total = this.model.collection.models.length;
//                console.log('there are ' + total + ' models, saving #' + me);
                this.updateAbove();
                this.updateBelow();
            } else {
                console.log('recursive disable');
            }

            $("#ledger_row_edit_modal").modal('hide');
            this.renderModel(this.model, true);
            $("#save_ledger_button").removeClass('hidden');
            $("#reload_ledger_button").removeClass('hidden');
        },
        updateAbove: function () {
            // update models above this one
            var me = this.model.collection.indexOf(this.model);
            var total = this.model.collection.models.length;
            var new_prior_balance = parseFloat(this.model.get('balance_after'));
//            console.log('UpdateAbove Model: ' + this.model.id + ' new_prior_balance: ' + new_prior_balance);
            for (var i = me - 1; i >= 0; i--) {
                var m = this.model.collection.at(i);
                var type_status = m.get('type_status');
                if (type_status == "Bill (Open)") {
//                    debugger;
                }
//                console.log('UpdateAbove: ' + m.id + ' new_prior_balance: ' + new_prior_balance);
//                console.log(i, m);
                m.set('notes', this.model.get('notes'));
                var old_prior_balance = parseFloat(m.get('balance_before'));
                var credit = parseFloat(m.get('credit')) || 0;
                var debit = parseFloat(m.get('debit')) || 0;
                var new_ending_balance = new_prior_balance - credit + debit;
//                console.log("new_ending_balance = new_prior_balance - credit + debit");
//                console.log("new_prior_balance "+new_ending_balance + " = new_prior_balance " + new_prior_balance + " - credit" + credit + " + debit" + debit);
                m.set('balance_after_old', m.get('balance_after'));
                m.set('balance_after', new_ending_balance);
                m.set('balance_before_old', old_prior_balance);
                m.set('balance_before', new_prior_balance);
//                console.log('',XXXXXXXXX);

                var type_status = m.get('type_status');
                if (type_status == "Bill (Open)") {
//                    console.log('inside save tx, bill is open');
//                    debugger;
                    var deposit = parseFloat(this.options.consumer.habitation.deposit);
                    var short = parseFloat(this.options.consumer.habitation.short_amount);
                    var amount = parseFloat(m.get('amount_due'));
                    var bal_bef = parseFloat(m.get('balance_before'));
                    if (bal_bef + deposit + amount <= short) {
                        m.set('processed', 1);
                        m.set('balance_after', bal_bef + amount);
                    } else {
                        m.set('processed', 0);
                    }
                }

                this.renderModel(m, false);
//                console.log('Model: ' + m.id + ' new_ending_balance: ' + new_ending_balance);
                new_prior_balance = new_ending_balance;
            }
        },
        updateBelow: function () {
//            console.log('updateBelow');
            var me = this.model.collection.indexOf(this.model);
            var total = this.model.collection.models.length;
            var new_ending_balance = parseFloat(this.model.get('balance_before'));
            for (var i = me + 1; i < total; i++) {
                var m = this.model.collection.at(i);
//                console.log('updateBelow: ' + m.id + ' new_ending_balance: ' + new_ending_balance);
//                console.log(i, m);
                m.set('notes', this.model.get('notes'));
//                console.log(i, m);
                var old_prior_balance = parseFloat(m.get('balance_before'));
                var credit = parseFloat(m.get('credit')) || 0;
                var debit = parseFloat(m.get('debit')) || 0;
                var new_prior_balance = new_ending_balance + credit - debit;
//                console.log("new_ending_balance = new_prior_balance - credit + debit");
//                console.log(new_ending_balance + "=" + new_prior_balance + "-" + credit +"+" +debit);
                m.set('balance_after_old', m.get('balance_after'));
                m.set('balance_after', new_ending_balance);
                m.set('balance_before_old', old_prior_balance);
                m.set('balance_before', new_prior_balance);

                var type_status = m.get('type_status');
                if (type_status == "Bill (Open)") {
                    console.log('inside save tx, bill is open');
                    var deposit = parseFloat(this.options.consumer.habitation.deposit);
                    var short = parseFloat(this.options.consumer.habitation.short_amount);
                    var amount = parseFloat(m.get('amount_due'));
                    var bal_bef = parseFloat(m.get('balance_before'));
                    if (bal_bef + deposit + amount <= short) {
                        m.set('processed', 1);
                        m.set('balance_after', bal_bef + amount);
                    } else {
                        m.set('processed', 0);
                    }
                }

                this.model.set('notes', $("#row_edit_notes").val());
                new_ending_balance = new_prior_balance;
                this.renderModel(m, false);
            }
        },
        saveTransaction: function (event) {
            if (this.model.get('type_status') == 'Bill' || this.model.get('type_status') == 'Bill (Open)') {
//                console.log('saveTx for bill');
                $("#ledger_row_edit_bill_modal").modal('hide');
                var notes = $("#row_edit_bill_notes").val();
                this.model.set('notes', notes);
                this.model.set('tx_id', $("#row_edit_tx_id").val());
                if ($("#row_edit_bill_delete").is(':checked')) {
                    $("#row_edit_bill_delete").prop("checked", false);
                    this.model.set('deleted', 1);
                    this.model.set('balance_after_old', this.model.get('balance_after'));
                    this.model.set('balance_after', this.model.get('balance_before'));
                }
            } else {
//                console.log('saving tx');
                var notes = $("#row_edit_notes").val();
                this.model.set('notes', notes);
                this.model.set('tx_id', $("#row_edit_tx_id").val());

                if ($("#row_edit_delete").is(':checked')) {
                    $("#row_edit_delete").prop("checked", false);
                    this.model.set('deleted', 1);
                    this.model.set('balance_after_old', this.model.get('balance_after'));
                    this.model.set('balance_after', this.model.get('balance_before'));
                } else {
                    var new_prior_balance = parseFloat($("#row_edit_prior_balance").val());
                    var old_prior_balance = parseFloat(this.model.get('balance_before'));

                    var type_status = this.model.get('type_status').toLowerCase();
                    var amt = $("#row_edit_amount").val();
                    if (type_status == "payment" || type_status == "payment (auto)" || type_status == "prepay") {
//                        console.log('++++++++++payments, setting credit_old');
                        this.model.set('credit_old', this.model.get('credit'));
                        this.model.set('credit', amt);
                    } else {
//                        console.log('---------------payments, setting debit_old');
                        this.model.set('debit_old', this.model.get('debit'));
                        this.model.set('debit', amt);
                    }

                    var credit = parseFloat(this.model.get('credit')) || 0;
                    var debit = parseFloat(this.model.get('debit')) || 0;
                    var new_ending_balance = new_prior_balance - credit + debit;

                    this.model.set('balance_after_old', this.model.get('balance_after'));
                    this.model.set('balance_after', new_ending_balance);
                    this.model.set('balance_before_old', old_prior_balance);
                    this.model.set('balance_before', new_prior_balance);

                    if (type_status == "bill (open)") {
                        console.log('inside save tx, bill is open');
                        var deposit = parseFloat(this.options.consumer.habitation.deposit);
                        var short = parseFloat(this.options.consumer.habitation.short_amount);
                        var amount = parseFloat(this.model.get('amount_due'));
                        var bal_bef = parseFloat(this.model.get('balance_before'));
                        if (bal_bef + deposit + amount <= short) {
                            this.model.set('processed', 1);
                            this.model.set('balance_after', bal_bef + amount);
                        } else {
                            this.model.set('processed', 0);
                        }
                    }
                }
                $("#ledger_row_edit_modal").modal('hide');
            }
            if ($("#row_edit_recursive").is(':checked')) {
                this.updateAbove();
                this.updateBelow();
            } else {
                console.log('recursive disable');
            }
            this.renderModel(this.model, true);
            $("#save_ledger_button").removeClass('hidden');
            $("#reload_ledger_button").removeClass('hidden');
        },
        TemplateClicked: function (e) {
            e.stopPropagation();
//            console.log('e: ', e);
//            console.log('xx Model clicked :', e.target.attributes.getNamedItem("name").value);
//            var action = e.target.attributes.getNamedItem("name").value;
//            if(action == "balance_before") {
            if (window.app_session.groups() < 100) {
//                console.log('ledger edit disabled.');
                return false;
            }
            if (this.model.get('type_status') == 'Bill' || this.model.get('type_status') == 'Bill (Open)') {
//                console.log('bill clicked.');
                console.log('setting tx', this.model.get('tx_id'));
                $("#row_edit_tx_id").val(this.model.get('tx_id'));
                $("#row_edit_bill_prior_balance").val(this.model.get('balance_before'));
                $("#row_edit_bill_amount").val(Math.abs(parseFloat(this.model.get('debit'))));
                var avail = parseFloat(this.model.get('balance_before')) + parseFloat(this.options.consumer.habitation.deposit);
                $("#row_edit_bill_available_balance").val(avail);
                var bill_data = this.model.get('data');
//                console.log('bill model', this.model);
//                console.log('-- checking if closed, processed: ', bill_data.processed);
                if (bill_data.processed == "1") {
//                    $("#row_edit_bill_processed").prop("checked", true);
                    $("#row_edit_bill_processed").val("Paid");
//                    console.log('balance after: ' + this.model.get('balance_after'));
//                    $("#row_edit_bill_ending_balance").val(this.model.get('balance_after'));
                } else {
//                    $("#row_edit_bill_processed").prop("checked", false);
                    $("#row_edit_bill_processed").val("Unpaid");
                }
                $("#row_edit_bill_notes").val('');
                $("#ledger_row_edit_bill_modal").modal();
                $("#ledger_row_edit_bill_modal_save").unbind('click');
                $("#ledger_row_edit_bill_modal_save").bind('click', {event: e}, this.saveTransaction);
                $("#row_edit_bill_prior_balance").unbind('keyup');
                $("#row_edit_bill_prior_balance").keyup(this.updateBillFields);

                $("#row_edit_bill_delete").prop("checked", false);
                var d = this.model.get('data');
                var date_processed = new Date(d.date_processed);
//                console.log('data: ', d.date_processed);
                $("#row_edit_bill_date_processed").val(date_processed.getFullYear() + "-" + (date_processed.getMonth() + 1) + "-" + date_processed.getDate());
                $("#row_edit_bill_date_processed").datepicker('hide');
                $("#row_edit_bill_date_processed").datepicker().on('changeDate', this.handle_bill_date_change);
            } else {
                $("#row_edit_transaction_type").val(this.model.get('type_status'));
//                console.log('type, ', this.model);
                var type_status = this.model.get('type_status').toLowerCase();
                if (type_status == "fine") {

                }

                $("#row_edit_tx_id").val(this.model.get('tx_id'));
                $("#row_edit_prior_balance").val(this.model.get('balance_before'));

                $("#row_edit_amount").prop("readonly", false);
                if (type_status == "payment" || type_status == "payment (auto)" || type_status == "prepay") {
                    $("#row_edit_amount").val(this.model.get('amount'));
                } else if (type_status == "fine" || type_status == "account disconnected" || type_status == "account reconnected" || type_status == "new connection" || type_status == "prorated bill (disconnection)") {
                    $("#row_edit_amount").val(parseFloat(this.model.get('debit')));
                } else {
//                    $("#row_edit_amount").val(parseFloat(this.model.get('debit')));
                    $("#row_edit_amount").prop("readonly", true);
                }

//                if (type_status == 'fine') {
//                    $("#row_edit_amount").val(parseFloat(this.model.get('debit')));
//                } else if (type_status == 'new connection') {
//                    $("#row_edit_amount").val(parseFloat(this.model.get('amount_due')) * -1);
//                } else {
//                    $("#row_edit_amount").val(this.model.get('amount'));
//                }
                $("#row_edit_ending_balance").val(this.model.get('balance_after'));
                $("#row_edit_notes").val('');
                $("#ledger_row_edit_modal").modal();
                $("#ledger_row_edit_modal_save").unbind('click');
                $("#ledger_row_edit_modal_save").bind('click', {event: e}, this.saveTransaction);
                $("#row_edit_prior_balance").unbind('keyup');
                $("#row_edit_prior_balance").keyup(this.updateFields);
                $("#row_edit_amount").unbind('keyup');
                $("#row_edit_amount").keyup(this.updateFields);
            }
//            }
            return false;
        },
        handle_bill_date_change: function () {
//            console.log('handle_bill_date_change');
            var date_processed = new Date($('#row_edit_bill_date_processed').data().datepicker.date);
//            console.log('new date: ', date_processed);
            $("#row_edit_bill_date_processed").datepicker('hide');
            this.updateBillFields();
        },
        updateFields: function () {
//            $("#row_edit_prior_balance").val(this.model.get('balance_before'));
//            console.log('updateFields');
            var prior_bal = $("#row_edit_prior_balance").val();
            var amt = $("#row_edit_amount").val();
            var end_bal = $("#row_edit_ending_balance").val();
            end_bal = parseFloat(prior_bal) - parseFloat(amt);
            var type_status = this.model.get('type_status').toLowerCase();
//            console.log('type_status: ', type_status);
            if (type_status == "payment" || type_status == "payment (auto)" || type_status == "prepay") {
                end_bal = parseFloat(prior_bal) - parseFloat(amt);
//            } else if(type_status == "fine" || type_status == "account disconnected" || type_status == "account reconnected" || type_status == "new connection" || type_status == "prorated bill (disconnection)") {
            } else {
                end_bal = parseFloat(prior_bal) + parseFloat(amt);
            }
            $("#row_edit_ending_balance").val(end_bal);
        },
        updateBillFields: function () {
//            $("#row_edit_prior_balance").val(this.model.get('balance_before'));
            console.log('updateBillFields');
            var prior_bal = $("#row_edit_bill_prior_balance").val();
            var old_prior_bal = this.model.get('balance');
            var old_ending_bal = this.model.get('balance_after');
            var avail = parseFloat(prior_bal) + parseFloat(this.options.consumer.habitation.deposit);
            $("#row_edit_bill_available_balance").val(avail);
            var date_processed = new Date($('#row_edit_bill_date_processed').data().datepicker.date);
            var d = this.model.get('data');
            var due_date = d.billjob.due_date.split('-');
            var dd_year = due_date[0];
            var dd_month = due_date[1];
            var dd_day = due_date[2];

            console.log(date_processed.getFullYear(), dd_year, date_processed.getMonth(), dd_month, date_processed.getDate(), dd_day);
            var is_late = 0;
            if (date_processed.getFullYear() < parseInt(dd_year)) {
                // not late
            } else if (date_processed.getFullYear() > parseInt(dd_year)) {
                // late fee #2
                is_late = 2;
            } else { // equal
                if ((date_processed.getMonth() + 1) < parseInt(dd_month)) {
                    // not late
                } else if ((date_processed.getMonth() + 1) > parseInt(dd_month)) {
                    // late fee #2
                    is_late = 2;
                } else {
                    if (date_processed.getDate() < parseInt(dd_day)) {
                        // not late
                    } else if (date_processed.getDate() > parseInt(dd_day)) {
                        // late fee #1
                        is_late = 1;
                    } else {
                        // not late
                    }
                }
            }

            var late_fee_type = d.late_fee_type;
            var late_fee_amt = 0;
            if (is_late == 1) {
                if (late_fee_type == 1) {
                    late_fee_amt = d.late_fee_percent;
                } else if (late_fee_type == 2) {
                    late_fee_amt = d.late_fee_fixed_month;
                }
                this.model.set('late', 1);
//                this.model.set('processed',1);
                this.model.set('date_processed', date_processed.getFullYear() + "-" + (date_processed.getMonth() + 1) + "-" + date_processed.getDate());

            } else if (is_late == 2) {
                if (late_fee_type == 1) {
                    late_fee_amt = d.late_fee_percent;
                } else if (late_fee_type == 2) {
                    late_fee_amt = d.late_fee_fixed;
                }
                this.model.set('late', 1);
//                this.model.set('processed',1);
                this.model.set('date_processed', date_processed.getFullYear() + "-" + (date_processed.getMonth() + 1) + "-" + date_processed.getDate());
            } else {
                this.model.set('late', 0);
            }
//            debugger;
            var amount_due = parseInt(d.amount_due);
            console.log('amount_due', amount_due);
            var total = parseInt(amount_due) + parseInt(late_fee_amt);
            console.log('Is Late: ', is_late);
            console.log('Avail: ', avail);
            console.log('Late Fee: ', late_fee_amt);
            var ending_bal = parseInt(avail) + parseInt(total);
            console.log('Ending Balance: ', ending_bal);
//            if(ending_bal <= this.options.consumer.)
            var short_amount = this.options.consumer.habitation.short_amount;
            var late_fee_display = "";
            this.model.set('late_fee_amount', late_fee_amt);
            if (late_fee_amt > 0) {
                late_fee_display = "+ " + late_fee_amt;
                this.model.set('bill_amount_display', amount_due);
            }
            var editable_bill = this.options.consumer.editable_bill;
//            var this_id = parseInt(this.model.get('id').toString().substr(0,-1));
            var this_id = this.model.id.substring(0, this.model.id.length - 1)
            console.log('editable: ', editable_bill);
            console.log('this bills id: ', this_id);
            var ending_balance = ending_bal;
            $("#row_edit_bill_amount").val(amount_due + ' ' + late_fee_display);
            if (editable_bill == this_id) {
                console.log('this bill is editable');
                console.log('ending bal and short amount:', ending_bal, short_amount);
                if (ending_bal <= short_amount) {
                    // this bill is ok to be closed.
                    var p = this.model.get('processed');
                    console.log('p=', p);
                    if (p != "1") {
                        $("#row_edit_bill_processed").pulse({times: 2, duration: 75});
                        this.model.set('processed', 1);
                        //                    $("#row_edit_bill_processed").prop("checked", true);
                        $("#row_edit_bill_processed").val("Paid");
                        $("#row_edit_bill_processed").css("color", "green");
                    }
                } else {
                    ending_balance = this.model.get('balance_after');
                    var p = this.model.get('processed');
                    if (p != "0") {
                        $("#row_edit_bill_processed").pulse({times: 2, duration: 75});
                        this.model.set('processed', 0);
                        //                    $("#row_edit_bill_processed").prop("checked", false);
                        $("#row_edit_bill_processed").val("Unpaid");
                        $("#row_edit_bill_processed").css("color", "red");
                    }
                }
            } else {
                console.log('this bill is uneditable, so we cannot reopen it, but prior, late fee, ending balance should be updated');
            }
            console.log('ending: ', ending_balance);
            ending_balance = parseInt(prior_bal) + parseInt(total);
            console.log('ending: ', ending_balance);
            this.model.set('balance_after_old', old_ending_bal);
            this.model.set('balance_after', ending_balance);
            this.model.set('balance_before_old', old_prior_bal);
            this.model.set('balance_before', prior_bal);
//            var amt = $("#row_edit_bill_amount").val();
//            var end_bal = $("#row_edit_bill_ending_balance").val();
//            end_bal = parseFloat(prior_bal) - parseFloat(amt);
//            $("#row_edit_ending_balance").val(end_bal);
        }
    });

    var TemplatesCollectionView = Backbone.View.extend({
        //el: '#games_list_ul',
        template: _.template(aCollectionTemplate),
        hidden: true,
        events: {
            "click #details_toggle_btn": 'details_toggle',
            "click #save_ledger_button": 'saveLedger',
            "click #show_activity_log": 'show_activity_log'
        },
        initialize: function () {
//            console.log('ledgerV2 TemplatesCollectionView init');
//            console.log('collection init');
            $(this.options.el).empty();
            $(this.options.el).html(this.template);
            this.collection = new LedgerCollection;
            console.log(this.collection);
//            this.collection.comparator = function (Model) {
//            //                return -Model.get("created_at");
//                var my_id = Model.get("id");
//                var my_id_int =  -1 * parseInt(my_id.substring(0, my_id.length - 1));
//                var created_at = -1 * parseInt(Model.get("created_at"));
//                console.log('Comparator, Model id:' + my_id_int + ' created_at: ' +created_at);
////                return created_at;
//                return [my_id_int, created_at];
//            };
//            this.collection.sort();

            _.bindAll(this, 'addOne', 'addAll', 'render', 'mysqlTimeStampToDate', 'TemplateClick', 'sortOrderChanged', 'ConsumerFine', 'saveLedger', 'reloadLedger', 'show_activity_log');
            _.bindAll(this, 'details_toggle');
//
//            var s = "0000-00-00 00:00:00";
//            var t = this.mysqlTimeStampToDate(s);
//            console.log('s: ', s);
//            console.log('t: ', t);
            $("#consumer_disconnect_reconnect_account").off('click');
            $("#consumer_disconnect_reconnect_account").on('click',this.TemplateClick);
            $("#consumer_fine_account").off('click');
            $("#consumer_fine_account").on('click', this.ConsumerFine);
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

//            console.log('creating collection for ledger');

//            console.log('adding payments: ' + payments.length);
            _.each(payments, function (payment) {
                var aModel = new LedgerModel();
//                console.log('adding transaction ' + payment.id, payment);
                aModel.set({
                    'id': payment.id + 'p',
                    'type': 'Payment',
                    'date': this.mysqlTimeStampToDate(payment.payment_date).toDateString(),
                    'timestamp': this.mysqlTimeStampToDate(payment.payment_date).getTime(),
                    'updated_at': this.mysqlTimeStampToDate(payment.updated_at).getTime(),
                    'created_at_sort': this.mysqlTimeStampToDate(payment.payment_date).getTime(),
                    'user_id': payment.user_id,
                    'notes': payment.notes,
                    'amount': payment.payment_amount,
                    'balance': payment.balance_after,
                    'balance_before': payment.balance_before,
                    'balance_after': payment.balance_after,
                    'amount_due': payment.amount_due,
                    'tx_id': payment.tx_id,
                    'data': payment
                });
//                console.log('adding transaction ' + payment.id, aModel);
//                console.log('ok, we have the model created, add to collection');
//                console.log('collection before adding model: ', this.collection);
//                console.log('model: ', aModel);
                if (payment.payment_type != 2) {
                    this.collection.add(aModel, {silent: true});
                }
//                console.log('collection after adding model: ', this.collection);
            }, this);

//            console.log('adding bills: ' + bills.length);
            _.each(bills, function (bill) {
//                console.log('adding bill ' + bill.id, bill);
                billjob = bill.billjob;
                var aModel = new LedgerModel();

                var created_date = billjob.created_at;
                if (bill.processed == 1) {
                    created_date = bill.date_processed;
                } else {
                    created_date = "2999-12-31 00:36:48"
                }
                var processed_type = "";
                // 0=Admin notes, 1=balance, 2=partial prepay, 3=full_prepay 4=payment
                var p_type = parseInt(bill.processed_type);
                if (p_type == 1) {
                    processed_type = "Balance";
                } else if (p_type == 2) {
                    processed_type = "Partial Prepay";
                } else if (p_type == 3) {
                    processed_type = "Prepay";
                } else if (p_type == 4) {
                    processed_type = "Payment";
                } else if (p_type == 5) {
                    processed_type = "Unpaid";
                } else if (p_type == 6) {
                    processed_type = "Not Active";
                }

                aModel.set({
                    'id': bill.id + 'b',
                    'type': 'Bill',
                    'date': this.mysqlTimeStampToDate(bill.date_processed).toDateString(),
                    'timestamp': this.mysqlTimeStampToDate(bill.date_processed).getTime(),
                    'updated_at': this.mysqlTimeStampToDate(bill.updated_at).getTime(),
                    'created_at_sort': this.mysqlTimeStampToDate(created_date).getTime(),
                    'amount': '',
                    'amount_due': bill.amount_due,
                    'balance': bill.balance,
                    'balance_before': bill.balance,
                    'balance_after': bill.balance,
                    'processed': bill.processed,
                    'late': bill.late,
                    'date_processed': bill.date_processed,
                    'late_fee_amount': bill.late_fee_amount,
                    'data': bill,
                    'processed_type': processed_type,
                    'tx_id': bill.tx_id
                });
//                console.log('adding transaction ' + bill.id, aModel);
                this.collection.add(aModel, {silent: true});
            }, this);


            /////////////////////////////////////////////////////////////////////////
            this.collection.each(
                function (transaction) {
                    var data = transaction.get('data');
                    if (transaction.get('type') == 'Payment') {
                        transaction.set('status', '');
                    } else {
//                        console.log('failing here getting balance, model:', this.model);
//                        var past_balance = parseFloat(this.model.get('balance'));
                        var past_balance = parseFloat(transaction.get('balance'));
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

                    if (data.deleted == "1") {
                        transaction.set('is_deleted', "Yes");
                    } else {
                        transaction.set('is_deleted', "No");
                    }

                }
            , this);
// MOVED to top
//            this.collection.comparator = function (Model) {
////                return -Model.get("created_at");
//                console.log('Comparator, Model id:' + Model.get('id') + ' created_at: ' + Model.get('created_at'));
//                return [Model.get("created_at"), Model.get("id")];
//            };
//            this.collection.sort();

            /////////////////////////////////////////////////////////////////////////

//            console.log('adding all');
//            var count = 0;
//            this.collection.each(function(tx) {
//                console.log(count++ + ' )' + tx.id);
//            });
            this.addAll();

//            console.log('collection:',this.collection);
//            this.collection.sort();
            $("#save_ledger_button").bind('click', this.saveLedger);
            $("#reload_ledger_button").bind('click', this.reloadLedger);
//            console.log('consumer: ', this.options.consumer);
//            console.log('auditlogs: ', this.options.consumer.auditlogs);

            var columns = [
                {
                    name: "id",
                    label: "ID",
                    editable: false,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ''
                    })
                },
                {
                    name: "created_at",
                    label: "Date",
                    editable: false,
                    cell: "datetime"
                },
                {
                    name: "message_public",
                    label: "Details",
                    cell: "text"
                }
            ];
            var AuditLog = Backbone.Model.extend({});
            var AuditLogs = Backbone.Collection.extend({
                model: AuditLog,
                comparator: function (Model1, Model2) {
                    if (Model2.id > Model1.id) {
                        return 1;
                    } else {
                        return -1;
                    }
                }
            });

            var logs = new AuditLogs;
            _.each(this.options.consumer.auditlogs, function (alog) {
//                console.log('alog', alog);
                var log_id = alog.id;
                var log_created_at = alog.created_at;
                var log_message_public = alog.message_public;
                var log = new AuditLog;
                log.set('id', parseInt(log_id));
                log.set('created_at', log_created_at);
                log.set('message_public', log_message_public);
                logs.add(log);
            });

            var grid = new Backgrid.Grid({
                columns: columns,
                collection: logs
            });

            $("#auditlog_backgrid_consumer").append(grid.render().$el);

            $("#auditlog_backgrid_consumer").hide();
            $("#show_activity_log").bind('click', this.show_activity_log);

//            this.collection.fetch({
//                reset: true,
//                error: function (model, response) {
//                    if (response.status == "404") {
//                        console.log('no logs found');
//                    } else {
//                        console.log("error, response: " + JSON.stringify(response));
//                    }
//                },
//                success: function (model, response) {
////                    console.log("success! # of Templates: " + model.length);
////                    console.log(model);
//                }
//            });
        },
        show_activity_log: function () {
            console.log('show_activity_log');
            if (this.hidden) {
                this.hidden = false;
                $("#auditlog_backgrid_consumer").show();
            } else {
                this.hidden = true;
                $("#auditlog_backgrid_consumer").hide();
            }
        },
        saveLedger: function () {
            console.log('save ledger', this.collection);
//            alert('not working yet');
            this.collection.record();
        },
        reloadLedger: function () {
            console.log('reloadLedger');
            window.location.reload();
            return false;
        },
        details_toggle: function () {
//            console.log('details toggle');
            $("#collection_data_table tbody tr.details_row").toggle();
        },
        sortOrderChanged: function (e) {
            var new_sort = $(e.currentTarget).val();
//            console.log('sort order: ', new_sort);
            this.collection.comparator = function (Model) {
                return -Model.get(new_sort);
            };
            this.collection.sort();
            this.addAll();
        },
        mysqlTimeStampToDate: function (timestamp) {
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
        render: function () {
//            console.log('render(): Templates Collection View: render() - doesnt do anything');
        },
        addAll: function () {
//            console.log('addAll();');
            //var myCollection = new Collection();
//            console.log(this.options.collection);
//            this.collection.comparator = function(ledger) {
//                return ledger.get('timestamp');
//            };
//            this.collection.sort();
            $(this.options.el).empty();
            $(this.options.el).html(this.template);
//            console.log('adding all, collection:',this.collection);
            this.collection.each(this.addOne);
//            console.log('collection: ', this.collection);
        },
        addOne: function (aModel) {
//            console.log('addOne,', aModel);
            var aConsumer = this.options.consumer;
            var view = new TemplateModelView({model: aModel, consumer: aConsumer });
            var view_rendered = view.render();
////            console.log('view_rendered', view_rendered);
//            $(this.options.el).find('#collection_data_table tbody').last().append(view_rendered.el);
//            $(this.options.el).find('#collection_data_table tbody').last().append(view_rendered.detail_el);
        },
        ConsumerFine: function (e) {
//            console.log('lets do it ConsumerFine!');
            var mainView = this.options.mainView;
            e.stopPropagation();
//            console.log('Consumer Fine, Account #: ', this.options.consumer);

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
            $("#account_fine_modal_save").unbind();
            $("#account_fine_modal_save").click(function (e) {
                $("#account_fine_modal_save").button('loading');
                var dt = $("#account_fine_date").val();
                var amount = $("#account_fine_amount").val();
                var notes = $("#account_fine_notes").val();
                console.log('ok, you clicked save!');
                var d = {
                    model: {
                        account_number: account_number,
                        date: dt,
                        amount: amount,
                        notes: notes
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
        TemplateClick: function (e) {
            e.preventDefault();
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
                $("#account_disconnection_modal_save").unbind();
                $("#account_disconnection_modal_save").click(function (e) {
                    $("#account_disconnection_modal_save").button('loading');
                    $("#account_disconnection_modal_save").attr('disabled', 'disabled');
                    var dt = $("#account_disconnection_date").val();
                    console.log('ok, you clicked save!');
                    var d = {
                        model: {
                            account_number: account_number,
                            date: dt,
                            status: 1
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
                $("#account_reconnection_modal_save").unbind();
                $("#account_reconnection_modal_save").click(function (e) {
                    $("#account_reconnection_modal_save").button('loading');
                    $("#account_reconnection_modal_save").attr('disabled', 'disabled');
                    var dt = $("#account_reconnection_date").val();
                    console.log('ok, you clicked save!');
                    var d = {
                        model: {
                            account_number: account_number,
                            date: dt,
                            status: 0
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
