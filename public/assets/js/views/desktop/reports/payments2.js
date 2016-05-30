define([
    'text!templates/desktop/reports/payments2_report.html',
    'text!templates/desktop/reports/payments2_report_chart1.html',
    'text!templates/desktop/reports/payments2_report_chart2.html',
    'text!templates/desktop/reports/sidebar.html',
    'collections/subdivisions',
    'collections/blocks',
    'collections/panchayats',
    'collections/villages',
    'collections/habitations',
    'backgrid-select-all',
    'highcharts'
], function (aTemplate, aTemplate1, aTemplate2, aSidebar, SubDivisions, Blocks, Panchayats, Villages, Habitations) {
    var aView = Backbone.View.extend({
        events: {
            "click #report_payments_amount_collected": "chart1",
            "click #report_payments_payment_details": "chart2",
            "click .report_setting": 'column_hide_show_chart2',
//            "click #report_payments_ppd":"chart1",
            "click #update_payments2_report_btn": "update_report",
            "click #update_payments2_report_btn_download": "download_report",
            "change #payments2_subdivision_dd": "sdChanged",
            "change #payments2_block_dd": "blockChanged",
            "change #payments2_panchayat_dd": "panchayatChanged",
            "change #payments2_village_dd": "villageChanged"
        },
        initialize: function () {
            this.render();
            _.bindAll(this, 'chart1', "chart2");
            _.bindAll(this, 'update_table_chart2', 'column_hide_show_chart2', 'show_graph_chart2');
            _.bindAll(this, 'render', "download_report", "update_report");
            _.bindAll(this, 'sd_reset', 'block_reset', 'panchayat_reset', 'village_reset', 'habitation_reset');
            _.bindAll(this, 'sdChanged', 'blockChanged', 'panchayatChanged', 'villageChanged');
            this.chart1();
        },
        chart2: function () {
            $("#payment_reports").html(_.template(aTemplate2));
            console.log('CHART 2');
            var statModel = Backbone.Model.extend({});
            var statCollection = Backbone.Collection.extend({model: statModel});
            this.collection = new statCollection();
            var that = this;
            var jqxhr = $.get("/statmonths")
                .done(function (data) {
                    that.months_array = [];
//                alert( "second success" );
                    console.log(data);
                    that.months_array.push({ id: "Current Month", text: "Current Month" });
                    _.each(data, function (month) {
                        that.months_array.push({ id: month, text: month });
                    });

                    console.log('months: ', that.months_array);
                    $("#stats_months").select2({ placeholder: "Date", data: that.months_array, multiple: false,
                        initSelection: function (element, callback) {
                            for (current in that.months_array) {
                                if (that.months_array[current]['id'] == element.val()) {
                                    callback({id: that.months_array[current]['id'], text: that.months_array[current]['text']});
                                    break;
                                }
                            }
                        }
                    }).on('change', that.update_table_chart2);

                    $("#stats_months").select2("val", that.months_array[0].text);

//                    that.update_table_chart2();
                }).fail(function () {
                    alert("error fetching data from the server.");
                });

            var NumberStringFormatter = function () {
                Backgrid.NumberFormatter.apply(this, arguments);
            };
            NumberStringFormatter.prototype = new Backgrid.NumberFormatter();
            _.extend(NumberStringFormatter.prototype, {
                fromRaw: function (rawValue) {
                    var num = parseInt(rawValue, 10);
                    var args = [].slice.call(arguments, 1);
                    args.unshift(num);
                    return Backgrid.NumberFormatter.prototype.fromRaw.apply(this, args);
                },
                toRaw: function () {
                    return Backgrid.NumberFormatter.prototype.toRaw.apply(this, arguments) + '';
                }
            });

//            var ShowCell = Backgrid.Cell.extend({
//                events: {
//                    "click": "show",
//                    "mouseenter": "show"
//                },
//                show: function (e) {
//                    e.preventDefault();
//                    console.log('show, model: ', this.model.get('message_public'));
//                },
//                render: function () {
//                    this.$el.html(this.model.get('message_public'));
//                    return this;
//                }
//            });
            this.columns = [
                {
                    name: "id",
                    label: "ID",
                    editable: false,
//                    cell: Backgrid.IntegerCell.extend({
//                        orderSeparator: ''
//                    }),
//                    formatter: NumberStringFormatter
                    cell: Backgrid.UriCell.extend({
                        events: {"click": function (e) {
                            e.preventDefault();
                            that.show_graph_chart2(this.model);
                        }
                        }
                    })
                },
                {
                    name: "name",
                    label: "Name",
                    editable: false,
//                    cell: "string",
                    cell: Backgrid.UriCell.extend({
                        events: {"click": function (e) {
                            e.preventDefault();
                            that.update_table_chart2(this.model);
                        }
                        }
                    })
                },
                {
                    name: "payments",
                    label: "Transactions",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "payments_amount",
                    label: "Amount",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "payments_type_0",
                    label: "Correction",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "payments_type_0_amount",
                    label: "Correction Amount",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "payments_type_1",
                    label: "Payment",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "payments_type_1_amount",
                    label: "Payment Amount",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "payments_type_2",
                    label: "Autopay",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "payments_type_2_amount",
                    label: "Autopay Amount",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "payments_type_3",
                    label: "Disconnected",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "payments_type_3_amount",
                    label: "Disconnected Amount",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "payments_type_4",
                    label: "Reconnected",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "payments_type_4_amount",
                    label: "Reconnected Amount",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "payments_type_5",
                    label: "New Accounts",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "payments_type_5_amount",
                    label: "New Account Amount",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "payments_type_6",
                    label: "Prorated",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "payments_type_6_amount",
                    label: "Prorated Amount",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "payments_type_7",
                    label: "Fines",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "payments_type_7_amount",
                    label: "Fines Amount",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "payments_type_8",
                    label: "Prepay",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "payments_type_8_amount",
                    label: "Prepay Amount",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                }
            ];

            var ZebraStrippingRow = Backgrid.Row.extend({
//              events: {
//                'hover' : function() {
//                    console.log('hover model', this.model);
//                    that.show_graph_chart2(this.model);
//                }
//              }
            });

            this.grid = new Backgrid.Grid({
                columns: that.columns,
                row: ZebraStrippingRow,
                collection: this.collection
            });

            this.grid.columns.on("change:renderable", function (col, colAttr) {
                console.log('renderable changed', colAttr);
                if (!colAttr) {
                    // hide the column
                }
            });
            this.collection.url = "/wingstats/Current Month";
            $("#backgrid").append(this.grid.render().$el);
            this.collection.fetch({
                reset: true,
                error: function (model, response) {
                    if (response.status == "404") {
                        console.log('no logs found');
                    } else {
                        console.log("error, response: " + JSON.stringify(response));
                    }
                },
                success: function (model, response) {
                    //                    console.log("success! # of Templates: " + model.length);
                    //                    console.log(model);
                }
            });
//

        },
        update_table_chart2: function (model) {
//            debugger;
            $("#graphs").empty();
            var month = $("#stats_months").select2("val");
            var title = $("#hierarchy_title");
            if (typeof model.get != 'undefined') {
                var aCol = this.grid.columns.where({name: "name"})[0];
//            aCol.set('renderable', false);
                console.log('model: ', model);
                console.log("OLD URL: ", this.collection.url);
                var id = 1;
                if (this.collection.url.indexOf("/wingstats/") != -1) {
                    this.collection.url = "/circlestats/" + model.get('wing_id') + "/" + month;
                    title.text("Circles");
                } else if (this.collection.url.indexOf("/circlestats/") != -1) {
                    this.collection.url = "/districtstats/" + model.get('circle_id') + "/" + month;
                    title.text("Districts");
                } else if (this.collection.url.indexOf("/districtstats/") != -1) {
                    this.collection.url = "/divisionstats/" + model.get('district_id') + "/" + month;
                    title.text("Divisions");
                } else if (this.collection.url.indexOf("/divisionstats/") != -1) {
                    this.collection.url = "/subdivisionstats/" + model.get('division_id') + "/" + month;
                    title.text("Subdivisions");
                } else if (this.collection.url.indexOf("/subdivisionstats/") != -1) {
                    this.collection.url = "/blockstats/" + model.get('subdivision_id') + "/" + month;
                    title.text("Blocks");
                } else if (this.collection.url.indexOf("/blockstats/") != -1) {
                    this.collection.url = "/panchayatstats/" + model.get('block_id') + "/" + month;
                    title.text("Panchayats");
                } else if (this.collection.url.indexOf("/panchayatstats/") != -1) {
                    this.collection.url = "/villagestats/" + model.get('panchayat_id') + "/" + month;
                    title.text("Villages");
                } else if (this.collection.url.indexOf("/villagestats/") != -1) {
                    this.collection.url = "/habitationstats/" + model.get('village_id') + "/" + month;
                    title.text("Habitations");
                } else {
                    this.collection.url = "/wingstats/" + month;
                    title.text("Wings");
                }
            } else {
                this.collection.url = "/wingstats/" + month;
                title.text("Wings");
            }
            console.log("OLD URL: ", this.collection.url);
            console.log('update_table_chart2 changed', month);
            this.collection.fetch({
                reset: true,
                error: function (model, response) {
                    if (response.status == "404") {
                        console.log('no logs found');
                    } else {
                        console.log("error, response: " + JSON.stringify(response));
                    }
                },
                success: function (model, response) {
                    //                    console.log("success! # of Templates: " + model.length);
                    //                    console.log(model);
                }
            });
            return false;
        },
        column_hide_show_chart2: function (e) {
            console.log('x,y: ', e.target.id);
            var aCol = this.grid.columns.where({name: e.target.id})[0];
            console.log('acol:', aCol.get('renderable'));
            var renderable = aCol.get('renderable');
            if (renderable) {
                console.log('renderable setting to false');
                aCol.set('renderable', false);
            } else {
                console.log('renderable setting to true');
                aCol.set('renderable', true);
            }
        },
        show_graph_chart2: function (model) {
            console.log('this is show_graph_chart2, model:', model);
            var columns = this.grid.columns.models;
            var data = [];
//            _.each(columns, function(column){
//                var item = {};
//                item.name = column.attributes.label;
//                item.y = model.get(column.attributes.name);
//                item.sliced = true;
//                if(item.name != "ID" && item.name != "Name") {
//                    data.push(item);
//                }
//            });
            var payments_type_0 = parseInt(model.get('payments_type_0'));
            var payments_type_1 = parseInt(model.get('payments_type_1'));
            var payments_type_2 = parseInt(model.get('payments_type_2'));
            var payments_type_3 = parseInt(model.get('payments_type_3'));
            var payments_type_4 = parseInt(model.get('payments_type_4'));
            var payments_type_5 = parseInt(model.get('payments_type_5'));
            var payments_type_6 = parseInt(model.get('payments_type_6'));
            var payments_type_7 = parseInt(model.get('payments_type_7'));
            var payments_type_8 = parseInt(model.get('payments_type_8'));
            var item = {};
            item.name = "Corrections";
            item.y = payments_type_0;
            item.sliced = true;
            data.push(item);
            //////////////////////////////
            var item = {};
            item.name = "Payments";
            item.y = payments_type_1;
            item.sliced = true;
            data.push(item);
            ////////////////////////////// 1=balance, 2=partial prepay, 3=full_prepay, 4=payment, 5=unpaid
            var item = {};
            item.name = "Autopay";
            item.y = payments_type_2;
            item.sliced = true;
            data.push(item);
            ////////////////////////////// 1=balance, 2=partial prepay, 3=full_prepay, 4=payment, 5=unpaid
            var item = {};
            item.name = "Disconnected";
            item.y = payments_type_3;
            item.sliced = true;
            data.push(item);
            ////////////////////////////// 1=balance, 2=partial prepay, 3=full_prepay, 4=payment, 5=unpaid
            var item = {};
            item.name = "Reconnected";
            item.y = payments_type_4;
            item.sliced = true;
            data.push(item);
            ////////////////////////////// 1=balance, 2=partial prepay, 3=full_prepay, 4=payment, 5=unpaid
            var item = {};
            item.name = "New Accounts";
            item.y = payments_type_5;
            item.sliced = true;
            data.push(item);
            ////////////////////////////// 1=balance, 2=partial prepay, 3=full_prepay, 4=payment, 5=unpaid
            var item = {};
            item.name = "Prorated";
            item.y = payments_type_6;
            item.sliced = true;
            data.push(item);
            ////////////////////////////// 1=balance, 2=partial prepay, 3=full_prepay, 4=payment, 5=unpaid
            var item = {};
            item.name = "Fines";
            item.y = payments_type_7;
            item.sliced = true;
            data.push(item);
            ////////////////////////////// 1=balance, 2=partial prepay, 3=full_prepay, 4=payment, 5=unpaid
            var item = {};
            item.name = "Prepay";
            item.y = payments_type_8;
            item.sliced = true;
            data.push(item);

            console.log('data: ', data);
            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'graphs',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: 'Bills'
                },
                tooltip: {
                    pointFormat: '{point.percentage:.1f}%'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            color: '#000000',
                            connectorColor: '#000000',
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        }
                    }
                },
                series: [
                    {
                        type: 'pie',
                        name: model.get('name'),
                        data: data
                    }
                ]
            });
        },
        chart1: function () {

            var now = new Date();
            var last_month = new Date();
            last_month.setDate(now.getDate() - 30);
            var filter_from_date = last_month.getDate() + "-" + (last_month.getMonth() + 1) + "-" + last_month.getFullYear();
            var filter_to_date = now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear();

            var template_data = {filter_from_date: filter_from_date, filter_to_date: filter_to_date};
            myTemplate = _.template(aTemplate1);
            $("#payment_reports").html(_.template(myTemplate(template_data)));
            if (this.options.isAdmin) {
                $(this.options.sidebar_el).html(_.template(aSidebar));
            } else {
                // the user sidebar is handled in the router method
            }
            //this.chart1();

            $("#filter_from_date").datepicker().on('changeDate', function (ev) {
                $("#filter_from_date").datepicker('hide');
            });
            $("#filter_to_date").datepicker().on('changeDate', function (ev) {
                $("#filter_to_date").datepicker('hide');
            });

            this.sd_collection = new SubDivisions();
            this.block_collection = new Blocks();
            this.panchayat_collection = new Panchayats();
            this.village_collection = new Villages();
            this.habitation_collection = new Habitations();

            this.sd_collection.bind('reset', this.sd_reset);
            this.block_collection.bind('reset', this.block_reset);
            this.panchayat_collection.bind('reset', this.panchayat_reset);
            this.village_collection.bind('reset', this.village_reset);
            this.habitation_collection.bind('reset', this.habitation_reset);

            this.sd_collection.fetch({reset: true});


            var operated_by_data = [
                { id: 'DWSS', text: 'DWSS' },
                { id: 'GP', text: 'GP' },
                { id: 'GPWSC', text: 'GPWSC' }
            ];
            $("#payments2_scheme_operated_by").select2(
                {
                    placeholder: 'All Schemes',
                    allowClear: true,
                    data: operated_by_data
                }
            );
        },
        sdChanged: function (e) {
            var a = $(e.currentTarget).select2("val");
            this.block_collection.url = "/blocks/subdivision/" + $(e.currentTarget).select2("val");
            this.block_collection.fetch({reset: true});
        },
        blockChanged: function (e) {
            this.panchayat_collection.url = "/panchayats/block/" + $(e.currentTarget).select2("val");
            this.panchayat_collection.fetch({reset: true});
        },
        panchayatChanged: function (e) {
            this.village_collection.url = "/villages/panchayat/" + $(e.currentTarget).select2("val");
            this.village_collection.fetch({reset: true});
        },
        villageChanged: function (e) {
            this.habitation_collection.url = "/habitations/village/" + $(e.currentTarget).select2("val");
            this.habitation_collection.fetch({reset: true});
        },
        sd_reset: function () {
            var sd_data = [];
            this.sd_collection.each(function (sd) {
                sd_data.push({id: sd.id, text: sd.get('name')});
            });
            $("#payments2_subdivision_dd").select2({ placeholder: "Subdivisions", allowClear: true, data: sd_data });
        },
        block_reset: function () {
            var block_data = [];
            this.block_collection.each(function (sd) {
                block_data.push({id: sd.id, text: sd.get('name')});
            });
            $("#payments2_block_dd").select2({ placeholder: "Blocks", allowClear: true, data: block_data });
        },
        panchayat_reset: function () {
            var panchayat_data = [];
            this.panchayat_collection.each(function (sd) {
                panchayat_data.push({id: sd.id, text: sd.get('name')});
            });
            $("#payments2_panchayat_dd").select2({ placeholder: "Panchayats", allowClear: true, data: panchayat_data });
        },
        village_reset: function () {
            var village_data = [];
            this.village_collection.each(function (sd) {
                village_data.push({id: sd.id, text: sd.get('name')});
            });
            $("#payments2_village_dd").select2({ placeholder: "Villages", allowClear: true, data: village_data });
        },
        habitation_reset: function () {
            var habitation_data = [];
            this.habitation_collection.each(function (sd) {
                habitation_data.push({id: sd.id, text: sd.get('name')});
            });
            $("#payments2_habitation_dd").select2({ placeholder: "Habitations", allowClear: true, data: habitation_data });
        },
        render: function () {
            $(this.el).html(_.template(aTemplate));
            if (this.options.isAdmin) {
                $(this.options.sidebar_el).html(_.template(aSidebar));
            } else {
                // the user sidebar is handled in the router method
            }
            //this.chart1();
        },
        download_report: function () {
            console.log('ok, posting data to our controller');
            $("#update_payments2_report_btn_download").button('loading');
            var search_by = $("#payments2_search_by .active").data("value");
            var from_date = $('#filter_from_date').val();
            var to_date = $('#filter_to_date').val();

            var subdivision = "";
            var block = "";
            var panchayat = "";
            var village = "";
            var habitation = "";
            var scheme_operated_by = "";

            if ($("#payments2_scheme_operated_by").length && $("#payments2_scheme_operated_by").select2("val") != "") {
                scheme_operated_by = $("#payments2_scheme_operated_by").select2("val");
            }

            if ($("#payments2_subdivision_dd").length && $("#payments2_subdivision_dd").select2("val") != "") {
                subdivision = $("#payments2_subdivision_dd").select2("val");
                if ($("#payments2_block_dd").length && $("#payments2_block_dd").select2("val") != "") {
                    block = $("#payments2_block_dd").select2("val");
                    if ($("#payments2_panchayat_dd").length && $("#payments2_panchayat_dd").select2("val") != "") {
                        panchayat = $("#payments2_panchayat_dd").select2("val");
                        if ($("#payments2_village_dd").length && $("#payments2_village_dd").select2("val") != "") {
                            village = $("#payments2_village_dd").select2("val");
                            if ($("#payments2_habitation_dd").length && $("#payments2_habitation_dd").select2("val") != "") {
                                habitation = $("#payments2_habitation_dd").select2("val");
                            }
                        }
                    }
                }
            }


            console.log('FROM: ' + from_date);
            console.log('TO: ' + to_date);

            var d = {
                model: {
                    search_by: search_by,
                    from_date: from_date,
                    to_date: to_date,
                    subdivision: subdivision,
                    block: block,
                    panchayat: panchayat,
                    village: village,
                    habitation: habitation,
                    scheme_operated_by: scheme_operated_by,
                    csv: true
                }
            };
            console.log('d', d);
            $.post("/reports/payments2", d,
                function (data) {
                    console.log("Data Loaded: ", data);
//                    $("#payments2_schemes").html(data.schemes);
//                    $("#payments2_habitations").html(data.habitations);
//                    $("#payments2_amount").html(data.amount);
//                    $("#payments2_payments").html(data.payments);
                    $("body").append("<iframe src='" + data.url + "' style='display: none;' ></iframe>");
                    $("#update_payments2_report_btn_download").button('reset');
                });
        },
        update_report: function () {
            console.log('ok, posting data to our controller');
            $("#update_payments2_report_btn").button('loading');
            var search_by = $("#payments2_search_by .active").data("value");
            var from_date = $('#filter_from_date').val();
            var to_date = $('#filter_to_date').val();

            var subdivision = "";
            var block = "";
            var panchayat = "";
            var village = "";
            var habitation = "";
            var scheme_operated_by = "";

            if ($("#payments2_scheme_operated_by").length && $("#payments2_scheme_operated_by").select2("val") != "") {
                scheme_operated_by = $("#payments2_scheme_operated_by").select2("val");
            }

            if ($("#payments2_subdivision_dd").length && $("#payments2_subdivision_dd").select2("val") != "") {
                subdivision = $("#payments2_subdivision_dd").select2("val");
                if ($("#payments2_block_dd").length && $("#payments2_block_dd").select2("val") != "") {
                    block = $("#payments2_block_dd").select2("val");
                    if ($("#payments2_panchayat_dd").length && $("#payments2_panchayat_dd").select2("val") != "") {
                        panchayat = $("#payments2_panchayat_dd").select2("val");
                        if ($("#payments2_village_dd").length && $("#payments2_village_dd").select2("val") != "") {
                            village = $("#payments2_village_dd").select2("val");
                            if ($("#payments2_habitation_dd").length && $("#payments2_habitation_dd").select2("val") != "") {
                                habitation = $("#payments2_habitation_dd").select2("val");
                            }
                        }
                    }
                }
            }

            console.log('FROM: ' + from_date);
            console.log('TO: ' + to_date);

            var d = {
                model: {
                    search_by: search_by,
                    from_date: from_date,
                    to_date: to_date,
                    subdivision: subdivision,
                    block: block,
                    panchayat: panchayat,
                    village: village,
                    habitation: habitation,
                    scheme_operated_by: scheme_operated_by,
                    csv: false
                }
            };
            console.log('d', d);
            $.post("/reports/payments2", d,
                function (data) {
                    console.log("Data Loaded: ", data);
                    $("#payments2_schemes").html(data.schemes);
                    $("#payments2_habitations").html(data.habitations);
                    $("#payments2_amount").html(data.amount);
                    $("#payments2_payments").html(data.payments);
                    $("#update_payments2_report_btn").button('reset');
                });
        }
    });
    return aView;
});
