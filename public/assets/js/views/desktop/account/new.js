define([
    'models/consumer',
    'text!templates/desktop/account/new.html',
    'text!templates/desktop/account/sidebar.html',
    'collections/subdivisions',
    'collections/blocks',
    'collections/panchayats',
    'collections/villages',
    'collections/habitations',
    'collections/schemes',
    'backbone'
], function (ConsumerModel, aTemplate, aSidebar, SubdivisionCollection, BlockCollection, PanchayatCollection, VillageCollection, HabitationCollection, SchemeCollection) {
    var aView = Backbone.View.extend({
        initialize: function () {
            _.bindAll(this, 'render', 'create_account', 'load_dds', 'category_changed', 'updateAmounts', 'zeroAmounts');
//            _.bindAll(this, 'subdivisions_reset', 'subdivision_changed');
//            _.bindAll(this, 'blocks_reset', 'block_changed');
//            _.bindAll(this, 'panchayat_reset', 'panchayat_changed');
//            _.bindAll(this, 'village_reset', 'village_changed');
            _.bindAll(this, 'habitation_reset', 'habitation_changed');
            _.bindAll(this, 'scheme_reset', 'scheme_changed');
            _.bindAll(this, 'check_input', 'validate_inputs');
            this.render();
//            this.subdivisions = new SubdivisionCollection();
//            this.subdivisions.bind('reset', this.subdivisions_reset);
//            this.subdivisions.fetch({reset: true});

//            this.schemes = new SchemeCollection();
//            this.schemes.bind('reset', this.scheme_reset);
//            this.schemes.fetch({reset: true});
            $('#new_user_create_btn').bind('click', this.create_account);

            $("#inputConnectionDate").datepicker().on('changeDate', function (ev) {
                $("#inputConnectionDate").datepicker('hide');
            });
        },
        category_changed: function () {
            var cat = $("#inputCategory").select2('val');
            console.log('cat is ', cat);

            if ((typeof this.schemes == 'undefined')) {
                console.log('loading schemes');
                this.schemes = new SchemeCollection();
                this.schemes.bind('reset', this.scheme_reset);
                this.schemes.fetch({reset: true});
            } else {
                console.log('no need to load schemes');
                this.updateAmounts();
            }
//            if (cat > 0) {
//                $("#inputDue").val("360");
//            } else {
//                $("#inputDue").val("560");
//            }
        },
        load_dds: function () {
            var dd_category_array = [];
            dd_category_array.push({id: 0, text: "Gen"});
            dd_category_array.push({id: 1, text: "SC"});
            dd_category_array.push({id: 2, text: "BC"});
            $("#inputCategory").select2({ placeholder: "Category", data: dd_category_array, multiple: false });
            $("#inputCategory").bind('change', this.category_changed);

            var dd_estatus_array = [];
            dd_estatus_array.push({id: 0, text: "BPL"});
            dd_estatus_array.push({id: 1, text: "APL"});
            $("#inputEconomicStatus").select2({ placeholder: "Economic Status", data: dd_estatus_array, multiple: false });
        },
        validate_inputs: function () {

//            this.check_input("inputFathersName");
//            this.check_input("inputAddress");
//            this.check_input("inputConnectionDate");
////            this.check_input("inputCategory");
//            this.check_input("inputEconomicStatus");
//            this.check_input("inputDue");
////            this.check_input("inputCollected");
//            this.check_input("input_scheme_dd");
//            this.check_input("input_habitation_dd");
//            $("#div_inputName").show();


            if (this.check_input("inputName") && this.check_input("inputCategory") && this.check_input("inputBalance") &&
                this.check_input("input_scheme_dd") && this.check_input("input_habitation_dd")) {
                this.proceed = true;
                return true;
            } else {
                this.check_input("inputName");
                this.check_input("inputFathersName");
                this.check_input("inputAddress");
                this.check_input("inputConnectionDate");
                this.check_input("inputCategory");
                this.check_input("inputEconomicStatus");
                this.check_input("inputBalance");
                this.check_input("input_scheme_dd");
                this.check_input("input_habitation_dd");
                this.proceed = false;
                return false;
            }

//            this.check_input("inputName");
//            var consumer_name = $("#inputName").val();
//            var consumer_fathers_name = $("#inputFathersName").val();
//            var consumer_address = $("#inputAddress").val();
//            var consumer_connection_date = $("#inputConnectionDate").val();
//            var consumer_due = $("#inputDue").val();
//            var consumer_collected = $("#inputCollected").val();
//            var consumer_scheme = $("#input_scheme_dd").select2('val');
//            var consumer_habitation = $("#input_habitation_dd").select2('val');
//            var consumer_category = $("#inputCategory").select2('val');
//            var consumer_economic_status = $("#inputEconomicStatus").select2('val');
        },
        check_input: function (tag) {
            try {
//                var userInput = $("#" + tag).val();
                if ($("#" + tag).val() == "") {
                    $("#div_" + tag).show('');
                    return false;
                } else {
                    $("#div_" + tag).hide();
//                    $("#div_"+tag).addClass('success');
                    return true;
                }
            } catch (ex) {
                $("#div_" + tag).show();
                return false;
            }
        },
        create_account: function () {
            try {
                if (this.validate_inputs()) {
                    $('#new_user_create_btn').attr('disabled', 'disabled');
                    console.log('create account');
                    var consumer_name = $("#inputName").val();
                    var consumer_fathers_name = $("#inputFathersName").val();
                    var consumer_address = $("#inputAddress").val();
                    var consumer_connection_date = $("#inputConnectionDate").val();
//                var consumer_due = $("#inputDue").val();
//                var consumer_collected = $("#inputCollected").val();
                    var consumer_balance = $("#inputBalance").val();
                    var consumer_scheme = $("#input_scheme_dd").select2('val');
                    var consumer_habitation = $("#input_habitation_dd").select2('val');
                    var consumer_category = $("#inputCategory").select2('val');
                    var consumer_economic_status = $("#inputEconomicStatus").select2('val');

                    var newConsumer = new ConsumerModel();
                    newConsumer.set({
                        name: consumer_name,
                        fathers_name: consumer_fathers_name,
                        address: consumer_address,
                        connection_date: consumer_connection_date,
                        balance: consumer_balance,
                        scheme: consumer_scheme,
                        habitation: consumer_habitation,
                        category: consumer_category,
                        economic_status: consumer_economic_status
                    });
                    console.log('new consumer model before save', newConsumer);
                    newConsumer.save({}, {
                        error: function (m, r) {
                            var msg = r.responseText;
                            console.log("error, response: " + msg);
//                        alert('Failed to create new account, error: ' + msg);
                            $('#new_user_create_btn').removeAttr('disabled');
                            $("#message_alert_div").addClass('alert-error');
                            $("#message_alert_strong").html('Error!');
                            $("#message_alert_text").html(msg);
                            $("#message_alert_div").show();
                            window.setTimeout(function () {
                                $("#message_alert_div").hide();
                                $("#message_alert_div").removeClass('alert-error');
                            }, 3000);
                        },
                        success: function (m, r) {
                            console.log("success, response: " + JSON.stringify(r));
                            console.log('model saved, model: ', m);

                            $("#message_alert_strong").html('Ok!');
                            $("#message_alert_div").addClass('alert-success');
                            $("#message_alert_text").html('Consumer account updated.');
                            $("#message_alert_div").show();
                            window.setTimeout(function () {
                                $("#message_alert_div").hide();
                                $("#message_alert_div").removeClass('alert-success');
//                            window.app_router.navigate("xx", {trigger: true, replace: true});
//                            window.app_router.navigate("accounts/new", {trigger: true, replace: true});
                                window.app_router.navigate("accounts/edit/" + newConsumer.get('account_number'), {trigger: true, replace: true});
                            }, 1000);
                        },
                        wait: true
                    });

                } else {

                    $("#message_alert_div").addClass('alert-error');
                    $("#message_alert_strong").html('Error!');
                    $("#message_alert_text").html("Please check all of the inputs!");
                    $("#message_alert_div").show();
                    window.setTimeout(function () {
                        $("#message_alert_div").hide();
                        $("#message_alert_div").removeClass('alert-error');
                    }, 3000);
                }
            } catch (ex) {
                console.log('exception: ', ex);

                $('#new_user_create_btn').removeAttr('disabled');
                $("#message_alert_div").addClass('alert-error');
                $("#message_alert_strong").html('Error!');
                $("#message_alert_text").html('Please check all input fields.');
                $("#message_alert_div").show();
                window.setTimeout(function () {
                    $("#message_alert_div").hide();
                    $("#message_alert_div").removeClass('alert-error');
                }, 3000);
            }
        },
        scheme_reset: function () {
            console.log('scheme_reset');
            var dd_array = [];
            this.schemes.each(function (aModel) {
                dd_array.push({id: aModel.id, text: aModel.get('name')});
            });
            $("#input_scheme_dd").select2({ placeholder: "Schemes", data: dd_array, multiple: false });
            $("#input_scheme_dd").bind('change', this.scheme_changed);
        },
        scheme_changed: function (e) {
            console.log('scheme_changed');

            var a = $(e.currentTarget).select2("val");
            this.habitations = new BlockCollection();
            this.habitations.url = "/habitations/scheme/" + $(e.currentTarget).select2("val");
            this.habitations.bind('reset', this.habitation_reset);
            this.habitations.fetch({reset: true});
        },
//        subdivisions_reset:function () {
//            console.log('subdivisions_reset');
//            var dd_array = [];
//            this.subdivisions.each(function (aModel) {
//                dd_array.push({id:aModel.id, text:aModel.get('name')});
//            });
//            $("#input_subdivision_dd").select2({ placeholder:"Subdivisions", data:dd_array, multiple:false });
//            $("#input_subdivision_dd").bind('change', this.subdivision_changed);
//        },
//        subdivision_changed:function (e) {
//            console.log('subdivision_changed');
//            var a = $(e.currentTarget).select2("val");
//            this.blocks = new BlockCollection();
//            this.blocks.url = "/blocks/subdivision/" + $(e.currentTarget).select2("val");
//            this.blocks.bind('reset', this.blocks_reset);
//            this.blocks.fetch({reset: true});
//        },
//        blocks_reset:function () {
//            console.log('blocks_reset');
//            var dd_array = [];
//            this.blocks.each(function (aModel) {
//                dd_array.push({id:aModel.id, text:aModel.get('name')});
//            });
//            $("#input_block_dd").select2({ placeholder:"Blocks", data:dd_array, multiple:false });
//            $("#input_block_dd").bind('change', this.block_changed);
//        },
//        block_changed:function (e) {
//            console.log('block_changed');
//            var a = $(e.currentTarget).select2("val");
//            this.panchayats = new PanchayatCollection();
//            this.panchayats.url = "/panchayats/block/" + $(e.currentTarget).select2("val");
//            this.panchayats.bind('reset', this.panchayat_reset);
//            this.panchayats.fetch({reset: true});
//        },
//        panchayat_reset:function () {
//            console.log('panchayat_reset');
//            var dd_array = [];
//            this.panchayats.each(function (aModel) {
//                dd_array.push({id:aModel.id, text:aModel.get('name')});
//            });
//            $("#input_panchayat_dd").select2({ placeholder:"Panchayats", data:dd_array, multiple:false });
//            $("#input_panchayat_dd").bind('change', this.panchayat_changed);
//        },
//        panchayat_changed:function (e) {
//            console.log('panchayat_changed');
//            var a = $(e.currentTarget).select2("val");
//            this.villages = new VillageCollection();
//            this.villages.url = "/villages/panchayat/" + $(e.currentTarget).select2("val");
//            this.villages.bind('reset', this.village_reset);
//            this.villages.fetch({reset: true});
//        },
//        village_reset:function () {
//            console.log('village_reset');
//            var dd_array = [];
//            this.villages.each(function (aModel) {
//                dd_array.push({id:aModel.id, text:aModel.get('name')});
//            });
//            $("#input_village_dd").select2({ placeholder:"Villages", data:dd_array, multiple:false });
//            $("#input_village_dd").bind('change', this.village_changed);
//        },
//        village_changed:function (e) {
//            console.log('village_changed');
//            var a = $(e.currentTarget).select2("val");
//            this.habitations = new HabitationCollection();
//            this.habitations.url = "/habitations/village/" + $(e.currentTarget).select2("val");
//            this.habitations.bind('reset', this.habitation_reset);
//            this.habitations.fetch({reset: true});
//        },
        habitation_reset: function () {
            console.log('habitation_reset');
            var dd_array = [];
            this.habitations.each(function (aModel) {
                dd_array.push({id: aModel.id, text: aModel.get('name')});
            });
            $("#input_habitation_dd").select2({ placeholder: "Habitations", data: dd_array, multiple: false });
            $("#input_habitation_dd").bind('change', this.habitation_changed);
            this.zeroAmounts();
        },
        habitation_changed: function (e) {
            console.log('habitation_changed');
            this.updateAmounts();
        },
        updateAmounts: function () {

            this.validate_inputs();
            var category_ok = this.check_input("inputCategory");
            var habitation_id = $("#input_habitation_dd").select2('val');
            var habitation = this.habitations.get(habitation_id);


            if ((typeof habitation != 'undefined' && category_ok)) {
                var enable_new_connection_fee = habitation.get('enable_new_connection_fee');
                            var new_connection_fee = 0;

                            if (enable_new_connection_fee == 1) {
                                var consumer_category = $("#inputCategory").select2('val'); // 0=Gen, 1=SC, 2=BC
                                if (consumer_category == 1) { // SC
                                    new_connection_fee = habitation.get('new_connection_fee_sc');
                                } else if (consumer_category == 2) { // SC
                                    new_connection_fee = habitation.get('new_connection_fee_bc');
                                } else { // everyone else is GC
                                    new_connection_fee = habitation.get('new_connection_fee_bc');
                                }
                            }
                            var deposit = habitation.get('deposit');
                            $("#input_new_connection_fee").val(new_connection_fee);
                            $("#input_deposit").val(deposit);
                            $("#input_total_due").val(parseInt(new_connection_fee) + parseInt(deposit));
            } else {
                this.zeroAmounts();
            }



        },
        zeroAmounts: function() {
            $("#input_new_connection_fee").val(0.00);
            $("#input_deposit").val(0.00);
            $("#input_due").val(0.00);
        },
        render: function () {
            var t = _.template(aTemplate);
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();
            var today = dd + '-' + mm + '-' + yyyy;

            var data = {
                date: today
            };
            $(this.options.main_el).html(t(data));
            $(this.options.sidebar_el).html(_.template(aSidebar));

            this.load_dds();
//            require(['views/desktop/billing/subdivision_dd'], function (aView) {
//                var myView = new aView({el:'#create_bill_wizard_table'});
//            });
        }
    });
    return aView;
});
