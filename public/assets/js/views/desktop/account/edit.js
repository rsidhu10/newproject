define([
    'models/consumer',
    'text!templates/desktop/account/edit.html',
    'text!templates/desktop/account/sidebar.html',
    'collections/subdivisions',
    'models/subdivision',
    'collections/blocks',
    'models/block',
    'collections/panchayats',
    'models/panchayat',
    'collections/villages',
    'models/village',
    'collections/habitations',
    'models/habitation',
    'collections/schemes',
    'backbone'
], function (ConsumerModel, aTemplate, aSidebar, SubdivisionCollection, SubdivisionModel, BlockCollection, BlockModel, PanchayatCollection, PanchayatModel, VillageCollection, VillageModel, HabitationCollection, HabitationModel, SchemeCollection) {
    var aView = Backbone.View.extend({
        initialize:function () {
            _.bindAll(this, 'render', 'update_account', 'load_dds');
//            _.bindAll(this, 'subdivisions_reset', 'subdivision_changed');
//            _.bindAll(this, 'blocks_reset', 'block_changed');
//            _.bindAll(this, 'panchayat_reset', 'panchayat_changed');
//            _.bindAll(this, 'village_reset', 'village_changed');
            _.bindAll(this, 'subdivision_reset');
            _.bindAll(this, 'block_reset');
            _.bindAll(this, 'panchayat_reset');
            _.bindAll(this, 'village_reset');
            _.bindAll(this, 'habitation_reset', 'habitation_changed', 'habitation_loaded');
            _.bindAll(this, 'scheme_reset', 'scheme_changed');
            _.bindAll(this, 'consumer_reset');

            this.consumer = new ConsumerModel();
            this.consumer.url = "/consumer/" + this.options.consumer_id;
            this.consumer.bind('change', this.consumer_reset);
            this.consumer.fetch();
        },
        load_dds: function () {
            var consumer_type_array = [];
            consumer_type_array.push({id:0, text:"Residential"});
            consumer_type_array.push({id:1, text:"Commercial"});
            consumer_type_array.push({id:2, text:"Bulk"});
            $("#input_consumer_type").select2({ placeholder:"Consumer Type", data:consumer_type_array, multiple:false,
                initSelection:function (element, callback) {
                    for (current in consumer_type_array) {
                        if (consumer_type_array[current]['id'] == element.val()) {
                            callback({id:consumer_type_array[current]['id'], text:consumer_type_array[current]['text']});
                            break;
                        }
                    }
                }
            });
            $("#input_consumer_type").select2("val", this.consumer.get('consumer_type'));

            var dd_category_array = [];
            dd_category_array.push({id:0, text:"Gen"});
            dd_category_array.push({id:1, text:"SC"});
            dd_category_array.push({id:2, text:"BC"});
            $("#inputCategory").select2({ placeholder:"Category", data:dd_category_array, multiple:false,
                initSelection:function (element, callback) {
                    for (current in dd_category_array) {
                        if (dd_category_array[current]['id'] == element.val()) {
                            callback({id:dd_category_array[current]['id'], text:dd_category_array[current]['text']});
                            break;
                        }
                    }
                }
            });
//            console.log('setting category to ' + this.consumer.get('category'), this.consumer);
            $("#inputCategory").select2("val", this.consumer.get('category'));

            var dd_estatus_array = [];
            dd_estatus_array.push({id: 0, text: "BPL"});
            dd_estatus_array.push({id: 1, text: "APL"});
            $("#inputEconomicStatus").select2({ placeholder:"Economic Status", data:dd_estatus_array, multiple:false,
                initSelection: function (element, callback) {
                    for (current in dd_estatus_array) {
                        if (dd_estatus_array[current]['id'] == element.val()) {
                            callback({id:dd_estatus_array[current]['id'], text:dd_estatus_array[current]['text']});
                            break;
                        }
                    }
                }
            });
            $("#inputEconomicStatus").select2("val", this.consumer.get('economic_status'));
        },
        consumer_reset: function () {
//            console.log('consumer_reset!', this.consumer);
            this.render();
            $("#inputConnectionDate").datepicker().on('changeDate', function (ev) {
                $("#inputConnectionDate").datepicker('hide');
            });
//            this.subdivisions = new SubdivisionCollection();
//            this.subdivisions.bind('reset', this.subdivisions_reset);
//            this.subdivisions.fetch();
            this.schemes = new SchemeCollection();
            this.schemes.bind('reset', this.scheme_reset);
            this.schemes.fetch({'reset': true});
            $('#new_user_create_btn').bind('click', this.update_account);

            var h = this.consumer.get('habitation');
            var dd_array = [];
            dd_array.push({id:h.id, text:h.name});
            $("#input_habitation_dd").select2({ placeholder:"Habitations", data:dd_array, multiple:false,
                initSelection:function (element, callback) {
                    for (current in dd_array) {
                        if (dd_array[current]['id'] == element.val()) {
                            callback({id:dd_array[current]['id'], text:dd_array[current]['text']});
                            break;
                        }
                    }
                } });

            $("#input_habitation_dd").select2("val", h.id);
            this.load_dds();

            this.habitation = new HabitationModel();
            this.habitation.url = "/habitation/" + h.id;
            this.habitation.bind('change', this.habitation_loaded);
            this.habitation.fetch();
        },
        update_account: function () {
            $('#new_user_create_btn').attr('disabled', 'disabled');

            window.setTimeout(function () {
                $('#new_user_create_btn').removeAttr('disabled');
            }, 3000);
//            console.log('create account');
            var consumer_name = $("#inputName").val();
            var consumer_fathers_name = $("#inputFathersName").val();
            var consumer_address = $("#inputAddress").val();
            var consumer_connection_date = $("#inputConnectionDate").val();
            var consumer_old_account = $("#inputOldAccount").val();
            var consumer_new_account = $("#inputNewAccount").val();
            var consumer_scheme = $("#input_scheme_dd").select2('val');
            var consumer_habitation = $("#input_habitation_dd").select2('val');
            var consumer_category = $("#inputCategory").select2('val');
            var consumer_economic_status = $("#inputEconomicStatus").select2('val');
            var consumer_type = $("#input_consumer_type").select2('val');


//            this.consumer.bind('change', this.consumer_reset);
            this.consumer.unbind('change');
            console.log('consumer_type', consumer_type);
            this.consumer.set({
                name:consumer_name.toString(),
                fathers_name:consumer_fathers_name.toString(),
                address:consumer_address.toString(),
                connection_date:consumer_connection_date.toString(),
                old_account:consumer_old_account.toString(),
                new_account:consumer_new_account.toString(),
                scheme:consumer_scheme.toString(),
                habitation:consumer_habitation.toString(),
                category: consumer_category.toString(),
                economic_status: consumer_economic_status.toString(),
                consumer_type: consumer_type.toString()
            });
//            console.log('new consumer model before save', this.consumer);
            this.consumer.save({}, {
                error:function (m, r) {
                    console.log("error, response: " + r.responseText);
//                    alert('failed to update account!, error: ' + r.responseText);
                    $("#message_alert_div").addClass('alert-error');
                    $("#message_alert_strong").html('Error!');
                    $("#message_alert_text").html(r.responseText);
                    $("#message_alert_div").show();
                    window.setTimeout(function () {
                        $("#message_alert_div").hide();
                        $("#message_alert_div").removeClass('alert-error');
                    }, 3000);
                },
                success:function (m, r) {
//                    console.log("success, response: " + JSON.stringify(r));
//                    console.log('model saved, model: ', m);
//                    $("#message_alert_div").removeClass('hide');
                    $("#message_alert_strong").html('Ok!');
                    $("#message_alert_div").addClass('alert-success');
                    $("#message_alert_text").html('Consumer account updated.');
                    $("#message_alert_div").show();
                    window.setTimeout(function () {
                        $("#message_alert_div").hide();
                        $("#message_alert_div").removeClass('alert-success');
                    }, 3000);
//                    finalTemplate = _.template(aTemplate_step_final);
//                    myEl.html(finalTemplate());
//                    window.location.hash = "admin/billgroup/edit/" + newGroup.get('id');
                    //window.location.hash = "/po";
                }, wait:true
            });
        },
        scheme_reset:function () {
//            console.log('scheme_reset');
            var dd_array = [];
            this.schemes.each(function (aModel) {
                dd_array.push({id:aModel.id, text:aModel.get('name')});
            });
            $("#input_scheme_dd").select2(
                {
                    placeholder:"Schemes",
                    data:dd_array,
                    multiple:false,
                    initSelection:function (element, callback) {
                        for (current in dd_array) {
                            if (dd_array[current]['id'] == element.val()) {
                                callback({id:dd_array[current]['id'], text:dd_array[current]['text']});
                                break;
                            }
                        }
                    }
                });

            var scheme_id = this.consumer.get('scheme_id');
//            console.log('scheme_id', scheme_id);
            $("#input_scheme_dd").select2("val", scheme_id);
            $("#input_scheme_dd").bind('change', this.scheme_changed);
        },
        scheme_changed:function (e) {
            console.log('scheme_changed');

            var a = $(e.currentTarget).select2("val");
            this.habitations = new BlockCollection();
            this.habitations.url = "/habitations/scheme/" + $(e.currentTarget).select2("val");
            this.habitations.bind('reset', this.habitation_reset);
            this.habitations.fetch({reset: true});

            $("#input_village").val('');
            $("#input_panchayat").val('');
            $("#input_block").val('');
            $("#input_subdivision").val('');
        },
//        subdivisions_reset:function () {
////            console.log('subdivisions_reset');
//            var dd_array = [];
//            this.subdivisions.each(function (aModel) {
//                dd_array.push({id:aModel.id, text:aModel.get('name')});
//            });
//            $("#input_subdivision_dd").select2({ placeholder:"Subdivisions", data:dd_array, multiple:false });
//            $("#input_subdivision_dd").bind('change', this.subdivision_changed);
//        },
//        subdivision_changed:function (e) {
////            console.log('subdivision_changed');
//            var a = $(e.currentTarget).select2("val");
//            this.blocks = new BlockCollection();
//            this.blocks.url = "/blocks/subdivision/" + $(e.currentTarget).select2("val");
//            this.blocks.bind('reset', this.blocks_reset);
//            this.blocks.fetch();
//        },
//        blocks_reset:function () {
////            console.log('blocks_reset');
//            var dd_array = [];
//            this.blocks.each(function (aModel) {
//                dd_array.push({id:aModel.id, text:aModel.get('name')});
//            });
//            $("#input_block_dd").select2({ placeholder:"Blocks", data:dd_array, multiple:false });
//            $("#input_block_dd").bind('change', this.block_changed);
//        },
//        block_changed:function (e) {
////            console.log('block_changed');
//            var a = $(e.currentTarget).select2("val");
//            this.panchayats = new PanchayatCollection();
//            this.panchayats.url = "/panchayats/block/" + $(e.currentTarget).select2("val");
//            this.panchayats.bind('reset', this.panchayat_reset);
//            this.panchayats.fetch();
//        },
//        panchayat_reset:function () {
////            console.log('panchayat_reset');
//            var dd_array = [];
//            this.panchayats.each(function (aModel) {
//                dd_array.push({id:aModel.id, text:aModel.get('name')});
//            });
//            $("#input_panchayat_dd").select2({ placeholder:"Panchayats", data:dd_array, multiple:false });
//            $("#input_panchayat_dd").bind('change', this.panchayat_changed);
//        },
//        panchayat_changed:function (e) {
////            console.log('panchayat_changed');
//            var a = $(e.currentTarget).select2("val");
//            this.villages = new VillageCollection();
//            this.villages.url = "/villages/panchayat/" + $(e.currentTarget).select2("val");
//            this.villages.bind('reset', this.village_reset);
//            this.villages.fetch();
//        },
//        village_reset:function () {
////            console.log('village_reset');
//            var dd_array = [];
//            this.villages.each(function (aModel) {
//                dd_array.push({id:aModel.id, text:aModel.get('name')});
//            });
//            $("#input_village_dd").select2({ placeholder:"Villages", data:dd_array, multiple:false });
//            $("#input_village_dd").bind('change', this.village_changed);
//        },
//        village_changed:function (e) {
////            console.log('village_changed');
//            var a = $(e.currentTarget).select2("val");
//            this.habitations = new HabitationCollection();
//            this.habitations.url = "/habitations/village/" + $(e.currentTarget).select2("val");
//            this.habitations.bind('reset', this.habitation_reset);
//            this.habitations.fetch();
//        },
        habitation_reset:function () {
//            console.log('habitation_reset');
            var dd_array = [];
            this.habitations.each(function (aModel) {
                dd_array.push({id:aModel.id, text:aModel.get('name')});
            });
            $("#input_habitation_dd").select2({ placeholder:"Habitations", data:dd_array, multiple:false });
            $("#input_habitation_dd").bind('change', this.habitation_changed);
        },
        habitation_changed:function (e) {
            console.log('habitation_changed');
            this.habitation = new HabitationModel();
            this.habitation.url = "/habitation/" + $(e.currentTarget).select2("val");
            this.habitation.bind('change', this.habitation_loaded);
            this.habitation.fetch();
        },
        subdivision_reset: function(e) {
            console.log('sd reset');
            $("#input_subdivision").val(this.subdivision.get('name'));
        },
        block_reset: function(e) {
            console.log('block reset');
            $("#input_block").val(this.block.get('name'));
            this.subdivision = new SubdivisionModel();
            this.subdivision.url = "/subdivision/" + this.block.get('subdivision_id');
            this.subdivision.bind('change', this.subdivision_reset);
            this.subdivision.fetch();
        },
        panchayat_reset: function(e) {
            console.log('panchayat reset');
            $("#input_panchayat").val(this.panchayat.get('name'));
            this.block = new BlockModel();
            this.block.url = "/block/" + this.panchayat.get('block_id');
            this.block.bind('change', this.block_reset);
            this.block.fetch();
        },
        village_reset: function(e) {
            console.log('village reset');
            $("#input_village").val(this.village.get('name'));
            this.panchayat = new PanchayatModel();
            this.panchayat.url = "/panchayat/" + this.village.get('panchayat_id');
            this.panchayat.bind('change', this.panchayat_reset);
            this.panchayat.fetch();
        },
        habitation_loaded: function(e) {
            console.log('habitation loaded');
//            $("#input_village").val(this.village.get('name'));
            this.village = new VillageModel();
            this.village.url = "/village/" + this.habitation.get('village_id');
            this.village.bind('change', this.village_reset);
            this.village.fetch();
        },
        render:function () {
            var myTemplate = _.template(aTemplate);
            $(this.options.main_el).html(myTemplate(this.consumer.toJSON()));
            $(this.options.sidebar_el).html(_.template(aSidebar));

//            require(['views/desktop/billing/subdivision_dd'], function (aView) {
//                var myView = new aView({el:'#create_bill_wizard_table'});
//            });
        }
    });
    return aView;
});
