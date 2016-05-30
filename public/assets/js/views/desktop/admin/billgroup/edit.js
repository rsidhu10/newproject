define([
    'models/billgroup',
    'collections/subdivisions',
    'collections/blocks',
    'collections/habitations',
    'text!templates/desktop/admin/billgroup/edit.html',
    'text!templates/desktop/admin/billgroup/bghabitation_model.html',
    'backbone'
], function (BillGroupModel, SubDivisions, Blocks, Habitations, aTemplate, aModelTemplate) {

    var BGHabitationModelView = Backbone.View.extend({
        tagName:'tr',
        template:_.template(aModelTemplate),
        events:{
            "click .BGH_Remove":'BGHabitationClicked'
        },
        initialize:function () {
            _.bindAll(this, 'render', 'BGHabitationClicked');
            this.model.bind('change', this.render);
        },
        render:function () {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },
        remove:function () {
            var myEl = this.el;
            this.model.url = "/bghabitations/" + this.model.get('group_id') + '/' + this.model.id;
            this.model.destroy({
                error:function (model, response) {
                    console.log('error: failed to delete model, error: ' + response);
                    console.log(response);
                    alert('failed to delete model, error: ' + response);
                },
                success:function (model, response) {
                    $(myEl).remove();
                }
            });
        },
        BGHabitationClicked:function (e) {
            e.stopPropagation();
            console.log('xx Model clicked :' + this.model.id + ': ' + this.model.get('name'), this.model.toJSON());
            this.remove();
            //window.location.hash = "admin/billgroup/edit/" +this.model.id;
            //window.app_router.navigate("admin/billgroup/edit/" + this.model.id, {trigger:true});
            return false;
        }
    });

    var aView = Backbone.View.extend({
        template:_.template(aTemplate),
        events:{
            "click #billgroup_add_habitation_selected":'AddSelected',
            "click #billgroup_add_habitation_all":'AddAll',
            "change #billgroup_subdivision_dd":"sdChanged",
            "change #billgroup_block_dd":"blockChanged",
//            "click input.late_fee_radio[type=radio]": "late_fee_changed",
//            "click input.new_connection_fee_radio[type=radio]": "new_connection_fee_changed",
//            "click input.reconnection_fee_radio[type=radio]": "reconnection_fee_changed",
//            "click input.disconnection_fee_radio[type=radio]": "disconnection_fee_changed",
            "click #update_billgroup_settings": "save_settings"
        },
        initialize:function () {
            _.bindAll(this, 'render', 'AddSelected', 'AddAll', 'postData');
            _.bindAll(this, 'sd_reset', 'block_reset', 'habitation_reset');
            _.bindAll(this, 'sdChanged', 'blockChanged', 'save_settings');
            _.bindAll(this, 'billgroup_habitations_reset', 'BGH_addAll', 'BGH_addOne');
//            _.bindAll(this, 'late_fee_changed', 'new_connection_fee_changed', 'reconnection_fee_changed', 'disconnection_fee_changed');
            this.model = new BillGroupModel({id:this.options.model_id});
//            this.model.url = "/billgroup/" + this.options.model_id;
            this.model.once('change', this.render);
            this.model.fetch({reset: true});

            this.sd_collection = new SubDivisions();
            this.block_collection = new Blocks();
            this.habitation_collection = new Habitations();
//            this.render();
            this.sd_collection.bind('reset', this.sd_reset);
            this.block_collection.bind('reset', this.block_reset);
            this.habitation_collection.bind('reset', this.habitation_reset);
            this.sd_collection.fetch({reset: true});

            ///////////////
            // all of the member habitations
            this.billgroup_habitations = new Habitations();
            this.billgroup_habitations.url = "/billgroup/habitations/" + this.options.model_id;
            this.billgroup_habitations.fetch({reset: true});
            this.billgroup_habitations.bind('reset', this.billgroup_habitations_reset);


        },
        save_settings: function(e) {
            console.log('save settings');
//            var late_fee_type_text = $("input.late_fee_radio[type=radio]:checked").val();
//            var late_fee_type = 0; // 0=disabled, 1=percent, 2=fixed
//            if(late_fee_type_text == "percent") {
//                late_fee_type = 1;
//            } else if(late_fee_type_text == "fixed") {
//                late_fee_type = 2;
//            } else {
//                late_fee_type = 0; // disabled
//            }
//            var late_fee_percent = $("#input_late_fee").val();
//            var late_fee_fixed = $("#input_late_fee_fixed").val();
//            var late_fee_fixed_month = $("#input_late_fee_fixed_month").val();
//            var new_connection_fee_enabled = $("input.new_connection_fee_radio[type=radio]:checked").val();
//            var reconnection_fee_enabled = $("input.reconnection_fee_radio[type=radio]:checked").val();
//            var disconnection_fee_enabled = $("input.disconnection_fee_radio[type=radio]:checked").val();
//            var new_connection_fee_gen = $("#input_new_connection_fee_gen").val();
//            var new_connection_fee_sc = $("#input_new_connection_fee_sc").val();
//            var new_connection_fee_bc = $("#input_new_connection_fee_bc").val();
//            var reconnection_fee_gen = $("#input_reconnection_fee_gen").val();
//            var reconnection_fee_sc = $("#input_reconnection_fee_sc").val();
//            var reconnection_fee_bc = $("#input_reconnection_fee_bc").val();
//            var disconnection_fee_gen = $("#input_disconnection_fee_gen").val();
//            var disconnection_fee_sc = $("#input_disconnection_fee_sc").val();
//            var disconnection_fee_bc = $("#input_disconnection_fee_bc").val();

            var input_d_lpcd_compare = $("#input_d_lpcd_compare").val();
            var input_rate_lt_d_lpcd = $("#input_rate_lt_d_lpcd").val();
            var input_rate_gt_d_lpcd = $("#input_rate_gt_d_lpcd").val();
            var input_rate_eq_d_lpcd = $("#input_rate_eq_d_lpcd").val();
            var input_cutoff_date = $("#input_cutoff_date").val();
//            var input_deposit = $("#input_deposit").val();

//            this.model.set('late_fee_type',late_fee_type);
//            this.model.set('late_fee',late_fee_percent);
//            this.model.set('late_fee_fixed',late_fee_fixed);
//            this.model.set('late_fee_fixed_month',late_fee_fixed_month);
//            this.model.set('enable_new_connection_fee',new_connection_fee_enabled);
//            this.model.set('enable_reconnection_fee',reconnection_fee_enabled);
//            this.model.set('enable_disconnection_fee',disconnection_fee_enabled);
//            this.model.set('new_connection_fee',new_connection_fee_gen);
//            this.model.set('new_connection_fee_sc',new_connection_fee_sc);
//            this.model.set('new_connection_fee_bc',new_connection_fee_bc);
//            this.model.set('reconnection_fee',reconnection_fee_gen);
//            this.model.set('reconnection_fee_sc',reconnection_fee_sc);
//            this.model.set('reconnection_fee_bc',reconnection_fee_bc);
//            this.model.set('disconnection_fee',disconnection_fee_gen);
//            this.model.set('disconnection_fee_sc',disconnection_fee_sc);
//            this.model.set('disconnection_fee_bc',disconnection_fee_bc);
            this.model.set('d_lpcd_compare',input_d_lpcd_compare);
            this.model.set('rate_lt_d_lpcd',input_rate_lt_d_lpcd);
            this.model.set('rate_gt_d_lpcd',input_rate_gt_d_lpcd);
            this.model.set('rate_eq_d_lpcd',input_rate_eq_d_lpcd);
            this.model.set('cutoff_date',input_cutoff_date);
//            this.model.set('deposit',input_deposit);


            console.log('saving model: ', this.model);
            this.model.save({}, {
                silent: true,
                error: function (m, r) {
                    console.log("error, response: " + JSON.stringify(r));
                    alert('Failed to save settings, error: ' + JSON.stringify(r));
                },
                success: function (m, r) {
                    console.log("success, response: " + JSON.stringify(r));
                    console.log('model saved, TODO: redirect to queue');
                    $("#billgroup_settings").collapse('hide');
                }
            });

        },
//        new_connection_fee_changed: function(e) {
//            var type = e.target.value;
//            if(type == "enabled") {
//                // show fixed
//                $("#input_new_connection_fee_enabled_settings").collapse('show');
//            } else {
//                $("#input_new_connection_fee_enabled_settings").collapse('hide');
//            }
//        },
//        reconnection_fee_changed: function(e) {
//            var type = e.target.value;
//            if(type == "enabled") {
//                // show fixed
//                $("#input_reconnection_fee_enabled_settings").collapse('show');
//            } else {
//                $("#input_reconnection_fee_enabled_settings").collapse('hide');
//            }
//        },
//        disconnection_fee_changed: function(e) {
//            var type = e.target.value;
//            if(type == "enabled") {
//                // show fixed
//                $("#input_disconnection_fee_enabled_settings").collapse('show');
//            } else {
//                $("#input_disconnection_fee_enabled_settings").collapse('hide');
//            }
//        },
//        late_fee_changed: function(e) {
//            console.log('late_fee_changed, e:', e);
//            var type = e.target.value;
//            if(type == "fixed") {
//                // show fixed
////                $("#input_late_fee_type_percent_settings").collapse('hide');
//                $("#input_late_fee_type_fixed_settings").collapse('show');
//            } else if(type == "percent") {
//                // show percent
////                $("#input_late_fee_type_fixed_settings").collapse('hide');
//                $("#input_late_fee_type_percent_settings").collapse('show');
//            } else {
//                $("#input_late_fee_type_fixed_settings").collapse('hide');
//                $("#input_late_fee_type_percent_settings").collapse('hide');
//            }
//        },
        sdChanged:function (e) {
            this.block_collection.url = "/blocks/subdivision/" + $(e.currentTarget).select2("val");
            this.block_collection.fetch({reset: true});
            // clear the habitation
            $("#billgroup_habitation_dd").select2("val", "");
            $("#billgroup_add_habitation_selected").attr('disabled', 'disabled');
            $("#billgroup_add_habitation_all").attr('disabled', 'disabled');
        },
        blockChanged:function (e) {
            this.habitation_collection.url = "/habitations/block/" + $(e.currentTarget).select2("val");
            this.habitation_collection.fetch({reset: true});
        },
        render:function () {
            console.log('once render, model:', this.model);
            $(this.options.el).html(this.template(this.model.toJSON()));

//            $("#input_late_fee_type_percent_settings").collapse({toggle:false}).on('show', function () {
//                $("#input_late_fee_type_fixed_settings").collapse('hide');
//            });
//            $("#input_late_fee_type_fixed_settings").collapse({toggle:false}).on('show', function () {
//                $("#input_late_fee_type_percent_settings").collapse('hide');
//            });
        },
        AddAll:function () {
            console.log('Add All');
            var habitations = [];
            this.habitation_collection.each(function (m) {
                habitations.push(m.id);
            });
            var d = {
                model:{
                    group_id:this.model.id,
                    group_name:this.model.get('name'),
                    habitations:habitations,
                    deleted:0
                }
            };
            this.postData(d);
        },
        AddSelected:function () {
            console.log('Add Selected');
            var habitations = $("#billgroup_habitation_dd").select2('val');
            if (habitations.length > 0) {
                console.log('adding the following habitations: ', habitations);
                var d = {
                    model:{
                        group_id:this.model.id,
                        group_name:this.model.get('name'),
                        habitations:habitations,
                        deleted:0
                    }
                };
                this.postData(d);
            } else {
                console.log("Please select atleast one habitation");
            }
        },
        postData:function (d) {
            console.log('adding habitations to billgroup, data model d:', d);
            var self = this;
            $.post("/billgroup/habitations/", d,
                function (data) {
                    console.log("Data Loaded: ", data);
                    self.billgroup_habitations.fetch({reset: true});
//                    $("#payments2_schemes").html(data.schemes);
//                    $("#payments2_habitations").html(data.habitations);
//                    $("#payments2_amount").html(data.amount);
//                    $("#payments2_payments").html(data.payments);
//                    $("#update_payments2_report_btn").button('reset');
                }
            );
        },
        billgroup_habitations_reset:function () {
//            this.billgroup_habitations.each(function (bgh) {
//                console.log('bgh: ', bgh);
//            });
            this.BGH_addAll();
        },
        sd_reset:function () {
            var sd_data = [];
            this.sd_collection.each(function (sd) {
                sd_data.push({id:sd.id, text:sd.get('name')});
            });
            $("#billgroup_subdivision_dd").select2({ placeholder:"Subdivisions", data:sd_data });
        },
        block_reset:function () {
            var block_data = [];
            this.block_collection.each(function (sd) {
                block_data.push({id:sd.id, text:sd.get('name')});
            });
            $("#billgroup_block_dd").select2({ placeholder:"Blocks", data:block_data });
        },
        habitation_reset:function () {
            console.log('habitation reset');
            var habitation_data = [];
            this.habitation_collection.each(function (sd) {
                habitation_data.push({id:sd.id, text:sd.get('name')});
            });
            $("#billgroup_habitation_dd").select2({ placeholder:"Habitations", data:habitation_data, multiple:true, allowClear:true});
            $("#billgroup_add_habitation_selected").removeAttr('disabled');
            $("#billgroup_add_habitation_all").removeAttr('disabled');
        },

        BGH_addAll:function () {
//            $(this.options.el).empty();
//            $(this.options.el).html(this.template);
            $('#collection_data_table tbody').find("tr:gt(0)").remove();
            $('#collection_data_table tbody').find("tr:lt(1)").remove();
            this.billgroup_habitations.each(this.BGH_addOne);
        },
        BGH_addOne:function (aModel) {
            var view = new BGHabitationModelView({model:aModel});
            $('#collection_data_table tbody').last().append(view.render().el);
        }
    });
    return aView;
});



