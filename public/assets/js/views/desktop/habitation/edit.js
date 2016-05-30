define([
    'text!templates/desktop/habitation/edit.html',
    'text!templates/desktop/habitation/editView.html',
    'text!templates/desktop/data/sidebar.html',
    'text!templates/desktop/account/sidebar.html',
    'models/habitation',
    'backbone',
    'backbone.bootstrap-modal'
], function (editTemplate, editViewTemplate, aSidebarAdmin, aSidebarUser, habitationModel) {
    var aView = Backbone.View.extend({
        template: _.template(editViewTemplate),
        habitation_el: '#habitation_details',
        events: {
//            "click input.late_fee_radio[type=radio]": "late_fee_changed",
//            "click input.new_connection_fee_radio[type=radio]": "new_connection_fee_changed",
//            "click input.reconnection_fee_radio[type=radio]": "reconnection_fee_changed",
//            "click input.disconnection_fee_radio[type=radio]": "disconnection_fee_changed",
//            "click #update_habitation_settings": "save_settings"
        },
        initialize: function () {
            _.bindAll(this, 'renderModel', 'save_settings');
            _.bindAll(this, 'prepay_changed', 'late_fee_changed', 'new_connection_fee_changed', 'reconnection_fee_changed', 'disconnection_fee_changed');

            $(this.options.main_el).html(_.template(editTemplate));

            console.log('this.options.group', this.options.group);
            if (this.options.group == 100) {
                console.log('admin sidebar');
                $(this.options.sidebar_el).html(_.template(aSidebarAdmin));
            } else {
                console.log('user sidebar');
                $(this.options.sidebar_el).html(_.template(aSidebarUser));
            }

            this.model = new habitationModel;

            this.model.set('id', this.options.parent_model_id);
            this.model.once('change', this.renderModel);
            this.model.fetch({
                error: function (model, response) {
                    if (response.status == "404") {
                        console.log('error: no Templates found');
                    } else {
                        console.log("error, response: " + JSON.stringify(response));
                    }
                },
                success: function (model, response) {
                    console.log("success!");
                }
            });

        },
        prepay_changed: function (e) {
            var type = e.target.value;
            if (type == "enabled") {
                $("#input_prepay_enabled_settings").collapse('show');
            } else {
                $("#input_prepay_enabled_settings").collapse('hide');
            }
        },
        late_fee_changed: function (e) {
            console.log('late_fee_changed, e:');
            var type = e.target.value;
            if (type == "fixed") {
                // show fixed
//                $("#input_late_fee_type_percent_settings").collapse('hide');
                $("#input_late_fee_type_fixed_settings").collapse('show');
            } else if (type == "percent") {
                // show percent
//                $("#input_late_fee_type_fixed_settings").collapse('hide');
                $("#input_late_fee_type_percent_settings").collapse('show');
            } else {
                $("#input_late_fee_type_fixed_settings").collapse('hide');
                $("#input_late_fee_type_percent_settings").collapse('hide');
            }
        },
        save_settings: function (e) {
            $('#update_habitation_settings').attr('disabled', 'disabled');
            $('#update_habitation_settings').text('Saving...');

            this.model.set('name', $("#inputName").val());
            this.model.set('type', $("#inputType").val());
            this.model.set('status', $("#inputStatus").val());
            this.model.set('p_lpcd', $("#inputp_lpcd").val());
            this.model.set('latitude', $("#inputLatitude").val());
            this.model.set('longitude', $("#inputLongitude").val());
            this.model.set('mis_id', $("#inputMISID").val());
            this.model.set('gen_pop', $("#inputGenPop").val());
            this.model.set('sc_pop', $("#inputSCPop").val());
            this.model.set('gen_hh', $("#inputGenHH").val());
            this.model.set('sc_hh', $("#inputSCHH").val());
            this.model.set('connections', $("#inputConnections").val());
            this.model.set('deposit', $("#inputDeposit").val());
            this.model.set('due_date_days', $("#inputDueDateDays").val());

            this.model.set('rate_residential_monthly', $("#inputResidentialRate").val());
            this.model.set('rate_commercial_monthly', $("#inputCommercialRate").val());
            this.model.set('rate_bulk_monthly', $("#inputBulkRate").val());
            this.model.set('cutoff_date', $("#inputCutoffDate").val());

            var late_fee_type_text = $("input.late_fee_radio[type=radio]:checked").val();
            var late_fee_type = 0; // 0=disabled, 1=percent, 2=fixed
            if (late_fee_type_text == "percent") {
                late_fee_type = 1;
            } else if (late_fee_type_text == "fixed") {
                late_fee_type = 2;
            } else {
                late_fee_type = 0; // disabled
            }
            var late_fee_percent = $("#input_late_fee").val();
            var late_fee_fixed = $("#input_late_fee_fixed").val();
            var late_fee_fixed_month = $("#input_late_fee_fixed_month").val();


            var prepay_enabled = ($("input.prepay_radio[type=radio]:checked").val() == "enabled") ? 1 : 0;
            var new_connection_fee_enabled = ($("input.new_connection_fee_radio[type=radio]:checked").val() == "enabled") ? 1 : 0;
            var reconnection_fee_enabled = ($("input.reconnection_fee_radio[type=radio]:checked").val() == "enabled") ? 1 : 0;
            var disconnection_fee_enabled = ($("input.disconnection_fee_radio[type=radio]:checked").val() == "enabled") ? 1 : 0;

//            var new_connection_fee_enabled = $("input.new_connection_fee_radio[type=radio]:checked").val();
//            var reconnection_fee_enabled = $("input.reconnection_fee_radio[type=radio]:checked").val();
//            var disconnection_fee_enabled = $("input.disconnection_fee_radio[type=radio]:checked").val();

            var prepay_months = $("#input_prepay_months").val();
            var prepay_amount = $("#input_prepay_amount").val();

            var new_connection_fee_gc = $("#input_new_connection_fee_gc").val();
            var new_connection_fee_sc = $("#input_new_connection_fee_sc").val();
            var new_connection_fee_bc = $("#input_new_connection_fee_bc").val();
            var reconnection_fee_gc = $("#input_reconnection_fee_gc").val();
            var reconnection_fee_sc = $("#input_reconnection_fee_sc").val();
            var reconnection_fee_bc = $("#input_reconnection_fee_bc").val();
            var disconnection_fee_gc = $("#input_disconnection_fee_gc").val();
            var disconnection_fee_sc = $("#input_disconnection_fee_sc").val();
            var disconnection_fee_bc = $("#input_disconnection_fee_bc").val();

            this.model.set('late_fee_type', late_fee_type);
            this.model.set('late_fee_percent', late_fee_percent);
            this.model.set('late_fee_fixed', late_fee_fixed);
            this.model.set('late_fee_fixed_month', late_fee_fixed_month);
            this.model.set('enable_new_connection_fee', new_connection_fee_enabled);
            this.model.set('enable_disconnection_fee', disconnection_fee_enabled);
            this.model.set('enable_reconnection_fee', reconnection_fee_enabled);
            this.model.set('disconnection_fee_gc', disconnection_fee_gc);
            this.model.set('disconnection_fee_bc', disconnection_fee_bc);
            this.model.set('disconnection_fee_sc', disconnection_fee_sc);
            this.model.set('reconnection_fee_gc', reconnection_fee_gc);
            this.model.set('reconnection_fee_bc', reconnection_fee_bc);
            this.model.set('reconnection_fee_sc', reconnection_fee_sc);
            this.model.set('new_connection_fee_gc', new_connection_fee_gc);
            this.model.set('new_connection_fee_bc', new_connection_fee_bc);
            this.model.set('new_connection_fee_sc', new_connection_fee_sc);

            this.model.set('prepay_enabled', prepay_enabled);
            this.model.set('prepay_months', prepay_months);
            this.model.set('prepay_amount', prepay_amount);

//            this.model.save();

            this.model.save({}, {
                error: function (m, r) {
                    console.log("error, response: " + r.responseText);
                    $('#update_habitation_settings').text('Failed');
                    alert('failed to update habitation, error: ' + r.responseText);
                    $('#update_habitation_settings').removeClass('btn-primary');
                    $('#update_habitation_settings').addClass('btn-danger');
                    window.setTimeout(function () {
                        $('#update_habitation_settings').removeClass('btn-danger');
                        $('#update_habitation_settings').addClass('btn-primary');
                        $('#update_habitation_settings').removeAttr('disabled');
                        $('#update_habitation_settings').text('Update');
                    }, 3000);
//                    $("#message_alert_div").addClass('alert-error');
//                    $("#message_alert_strong").html('Error!');
//                    $("#message_alert_text").html(r.responseText);
//                    $("#message_alert_div").show();
//                    window.setTimeout(function () {
//                        $("#message_alert_div").hide();
//                        $("#message_alert_div").removeClass('alert-error');
//                    }, 3000);
                },
                success: function (m, r) {
                    console.log("success, response: " + JSON.stringify(r));
                    console.log('model saved, model: ', m);
                    $('#update_habitation_settings').text('Saved');
                    $('#update_habitation_settings').removeClass('btn-primary');
                    $('#update_habitation_settings').addClass('btn-success');
//                    alert('Habitation Updated');
                    window.setTimeout(function () {
                        $('#update_habitation_settings').removeClass('btn-success');
                        $('#update_habitation_settings').addClass('btn-primary');
                        $('#update_habitation_settings').removeAttr('disabled');
                        $('#update_habitation_settings').text('Update');
                    }, 3000);
//                    $("#message_alert_strong").html('Ok!');
//                    $("#message_alert_div").addClass('alert-success');
//                    $("#message_alert_text").html('Consumer account updated.');
//                    $("#message_alert_div").show();
//                    window.setTimeout(function () {
//                        $("#message_alert_div").hide();
//                        $("#message_alert_div").removeClass('alert-success');
//                    }, 3000);
                },
                wait: true
            });
        },
        new_connection_fee_changed: function (e) {
            var type = e.target.value;
            if (type == "enabled") {
                // show fixed
                $("#input_new_connection_fee_enabled_settings").collapse('show');
            } else {
                $("#input_new_connection_fee_enabled_settings").collapse('hide');
            }
        },
        reconnection_fee_changed: function (e) {
            var type = e.target.value;
            if (type == "enabled") {
                // show fixed
                $("#input_reconnection_fee_enabled_settings").collapse('show');
            } else {
                $("#input_reconnection_fee_enabled_settings").collapse('hide');
            }
        },
        disconnection_fee_changed: function (e) {
            var type = e.target.value;
            if (type == "enabled") {
                // show fixed
                $("#input_disconnection_fee_enabled_settings").collapse('show');
            } else {
                $("#input_disconnection_fee_enabled_settings").collapse('hide');
            }
        },
        renderModel: function () {
            console.log('renderModel:', this.model);
            /////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////
            /// PREPARE THE CHECKBOX DATA: LATE FEES
            /////////////////////////////////////////////////////////////////////
            var late_fee_type = this.model.get('late_fee_type'); // 0=disable 1=percent 2=fixed
            var late_fee_percent_checked = (late_fee_type == 1) ? "checked" : "";
            var late_fee_fixed_checked = (late_fee_type == 2) ? "checked" : "";
            var late_fee_disabled_checked = (late_fee_type < 1 || late_fee_type > 2) ? "checked" : "";
            this.model.set('late_fee_percent_checked', late_fee_percent_checked);
            this.model.set('late_fee_fixed_checked', late_fee_fixed_checked);
            this.model.set('late_fee_disabled_checked', late_fee_disabled_checked);

            /////////////////////////////////////////////////////////////////////
            /// PREPARE THE CHECKBOX DATA: Prepay
            /////////////////////////////////////////////////////////////////////
            var prepay_enable = this.model.get('prepay_enabled'); // 0=disable 1=percent 2=fixed
            var prepay_enable_enabled_checked = (prepay_enable == 1) ? "checked" : "";
            var prepay_enable_disabled_checked = (prepay_enable != 1) ? "checked" : "";

            this.model.set('prepay_disabled_checked', prepay_enable_disabled_checked);
            this.model.set('prepay_enabled_checked', prepay_enable_enabled_checked);
            this.model.set('prepay_months', this.model.get('prepay_months'));
            this.model.set('prepay_amount', this.model.get('prepay_amount'));

            /////////////////////////////////////////////////////////////////////
            /// PREPARE THE CHECKBOX DATA: New Connection Fees
            /////////////////////////////////////////////////////////////////////
            var enable_new_connection_fee = this.model.get('enable_new_connection_fee'); // 0=disable 1=percent 2=fixed
            var new_connection_fee_enabled_checked = (enable_new_connection_fee == 1) ? "checked" : "";
            var new_connection_fee_disabled_checked = (enable_new_connection_fee != 1) ? "checked" : "";
            this.model.set('new_connection_fee_enabled_checked', new_connection_fee_enabled_checked);
            this.model.set('new_connection_fee_disabled_checked', new_connection_fee_disabled_checked);
            /////////////////////////////////////////////////////////////////////
            /// PREPARE THE CHECKBOX DATA: Disonnection Fees
            /////////////////////////////////////////////////////////////////////
            var enable_disconnection_fee = this.model.get('enable_disconnection_fee'); // 0=disable 1=percent 2=fixed
            var disconnection_fee_enabled_checked = (enable_disconnection_fee == 1) ? "checked" : "";
            var disconnection_fee_disabled_checked = (enable_disconnection_fee != 1) ? "checked" : "";
            this.model.set('disconnection_fee_enabled_checked', disconnection_fee_enabled_checked);
            this.model.set('disconnection_fee_disabled_checked', disconnection_fee_disabled_checked);
            /////////////////////////////////////////////////////////////////////
            /// PREPARE THE CHECKBOX DATA: Reonnection Fees
            /////////////////////////////////////////////////////////////////////
            var enable_reconnection_fee = this.model.get('enable_reconnection_fee'); // 0=disable 1=percent 2=fixed
            var reconnection_fee_enabled_checked = (enable_reconnection_fee == 1) ? "checked" : "";
            var reconnection_fee_disabled_checked = (enable_reconnection_fee != 1) ? "checked" : "";
            this.model.set('reconnection_fee_enabled_checked', reconnection_fee_enabled_checked);
            this.model.set('reconnection_fee_disabled_checked', reconnection_fee_disabled_checked);

            //////////////////////////////////////////
            // RENDER THE Template
            $(this.habitation_el).html(this.template(this.model.toJSON()));

            //////////////////////////////////
            // POST RENDER
            //////////////////
            // late fees - bind multiple options
            $("#input_late_fee_type_percent_settings").collapse({toggle: false}).on('show', function () {
                $("#input_late_fee_type_fixed_settings").collapse('hide');
            });
            $("#input_late_fee_type_fixed_settings").collapse({toggle: false}).on('show', function () {
                $("#input_late_fee_type_percent_settings").collapse('hide');
            });

            ///////////////////////
            // setup the default view according to setting value
            ////////////////
            // late fees
            if (late_fee_type == 1) {
                $("#input_late_fee_type_percent_settings").collapse('show');
            } else if (late_fee_type == 2) {
                $("#input_late_fee_type_fixed_settings").collapse('show');
            }
            if (enable_new_connection_fee == 1) {
                $("#input_new_connection_fee_enabled_settings").collapse('show');
            }
            if (enable_disconnection_fee == 1) {
                $("#input_disconnection_fee_enabled_settings").collapse('show');
            }
            if (enable_reconnection_fee == 1) {
                $("#input_reconnection_fee_enabled_settings").collapse('show');
            }
            if (prepay_enable == 1) {
                $("#input_prepay_enabled_settings").collapse('show');
            }
            ////////////////////////////////////////////
            /// Bind Checkbox Events
            ////////////////////////////////////////////
            $("input.late_fee_radio[type=radio]").bind('click', this.late_fee_changed);
            $("input.new_connection_fee_radio[type=radio]").bind('click', this.new_connection_fee_changed);
            $("input.prepay_radio[type=radio]").bind('click', this.prepay_changed);
            $("input.reconnection_fee_radio[type=radio]").bind('click', this.reconnection_fee_changed);
            $("input.disconnection_fee_radio[type=radio]").bind('click', this.disconnection_fee_changed);

            $("#update_habitation_settings").on('click', this.save_settings);

//            $.bind("click input.late_fee_radio[type=radio]", this.late_fee_changed);
//            "click input.late_fee_radio[type=radio]": "late_fee_changed",
//            "click input.new_connection_fee_radio[type=radio]": "new_connection_fee_changed",
//            "click input.reconnection_fee_radio[type=radio]": "reconnection_fee_changed",
//            "click input.disconnection_fee_radio[type=radio]": "disconnection_fee_changed",
//            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }
    });

    return aView;
});
