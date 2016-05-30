define([
    'collections/wings',
    'collections/circles',
    'collections/districts',
    'collections/divisions',
    'collections/subdivisions',
    'collections/blocks',
    'collections/panchayats',
    'collections/villages',
    'collections/habitations',
    'text!templates/desktop/reports/billing_report.html',
    'text!templates/desktop/reports/sidebar.html',
    'backgrid-select-all',
    'highcharts'
], function (wings, circles, districts, divisions, subdivisions, blocks, panchayats, villages, habitations, aTemplate, aSidebar) {
    var aView = Backbone.View.extend({
        events: {
            "click .report_setting": 'column_hide_show'
        },
        initialize: function () {
            _.bindAll(this, 'update_table', 'column_hide_show', 'show_graph');

            $(this.el).html(_.template(aTemplate));
            $(this.options.sidebar_el).html(_.template(aSidebar));
            var statModel = Backbone.Model.extend({});
            var statCollection = Backbone.Collection.extend({model: statModel});
            this.collection = new statCollection();
            this.months_array = [];
            var that = this;
            var jqxhr = $.get("/statmonths")
                .done(function (data) {
//                alert( "second success" );
                    console.log(data);
                    that.months_array.push({ id: "Current Month", text: "Current Month" });
                    _.each(data, function (month) {
                        that.months_array.push({ id: month, text: month });
                    });

                    console.log('months: ', that.months_array);
                    $("#billing_stats_months").select2({ placeholder: "Date", data: that.months_array, multiple: false,
                        initSelection: function (element, callback) {
                            for (current in that.months_array) {
                                if (that.months_array[current]['id'] == element.val()) {
                                    callback({id: that.months_array[current]['id'], text: that.months_array[current]['text']});
                                    break;
                                }
                            }
                        }
                    }).on('change', that.update_table);

                    $("#billing_stats_months").select2("val", that.months_array[0].text);

//                    that.update_table();
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
                            that.show_graph(this.model);
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
                            that.update_table(this.model);
                        }
                        }
                    })
                },
                {
                    name: "bills_created",
                    label: "Bills Created",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "bills_created_amount",
                    label: "Amount Billed",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "bills_processed",
                    label: "Bills Processed",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "bills_processed_amount",
                    label: "Amount Collected",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "bills_late",
                    label: "Bills Late",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "bills_late_amount",
                    label: "Late Fee Amount",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "bills_processed_type_1",
                    label: "Auto Closed",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "bills_processed_type_1_amount",
                    label: "Auto Closed Amount",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "bills_processed_type_2",
                    label: "Partial Prepay",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "bills_processed_type_2_amount",
                    label: "Partial Prepay Amount",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "bills_processed_type_3",
                    label: "Prepay",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "bills_processed_type_3_amount",
                    label: "Prepay Amount",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "bills_processed_type_4",
                    label: "Payment",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "bills_processed_type_4_amount",
                    label: "Payment Amount",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "bills_processed_type_5",
                    label: "Unpaid",
                    editable: false,
                    renderable: true,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ','
                    }),
                    formatter: NumberStringFormatter
                },
                {
                    name: "bills_processed_type_5_amount",
                    label: "Unpaid Amount",
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
//                    that.show_graph(this.model);
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

            ////////////////////////////////////////////////////////////////////////////////
        },
        update_table: function (model) {
//            debugger;
            $("#graphs").empty();
            var month = $("#billing_stats_months").select2("val");
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
            console.log('update_table changed', month);
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
        column_hide_show: function (e) {
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
        show_graph: function (model) {
            console.log('this is show_graph, model:', model);
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
            var bills_total = parseInt(model.get('bills_created'));
            var bills_late = parseInt(model.get('bills_late'));
            var bills_processed = parseInt(model.get('bills_processed'));
            var bills_unprocessed = bills_total - bills_processed;
            var bills_processed_type_1 = parseInt(model.get('bills_processed_type_1'));
            var bills_processed_type_2 = parseInt(model.get('bills_processed_type_2'));
            var bills_processed_type_3 = parseInt(model.get('bills_processed_type_3'));
            var bills_processed_type_4 = parseInt(model.get('bills_processed_type_4'));
            var bills_processed_type_5 = parseInt(model.get('bills_processed_type_5'));
            var item = {};
            item.name = "Open";
            item.y = bills_unprocessed;
            item.sliced = true;
            data.push(item);
            //////////////////////////////
            var item = {};
            item.name = "Late";
            item.y = bills_late;
            item.sliced = true;
            data.push(item);
            ////////////////////////////// 1=balance, 2=partial prepay, 3=full_prepay, 4=payment, 5=unpaid
            var item = {};
            item.name = "Paid with Balance";
            item.y = bills_processed_type_1;
            item.sliced = true;
            data.push(item);
            ////////////////////////////// 1=balance, 2=partial prepay, 3=full_prepay, 4=payment, 5=unpaid
            var item = {};
            item.name = "Partial Prepay";
            item.y = bills_processed_type_2;
            item.sliced = true;
            data.push(item);
            ////////////////////////////// 1=balance, 2=partial prepay, 3=full_prepay, 4=payment, 5=unpaid
            var item = {};
            item.name = "Prepay";
            item.y = bills_processed_type_3;
            item.sliced = true;
            data.push(item);
            ////////////////////////////// 1=balance, 2=partial prepay, 3=full_prepay, 4=payment, 5=unpaid
            var item = {};
            item.name = "Payment";
            item.y = bills_processed_type_4;
            item.sliced = true;
            data.push(item);
            ////////////////////////////// 1=balance, 2=partial prepay, 3=full_prepay, 4=payment, 5=unpaid
            var item = {};
            item.name = "Closed Unpaid";
            item.y = bills_processed_type_5;
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
                    pointFormat: '{point.percentage:.1f}%',
                    percentageDecimals: 2
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
        }
    });
    return aView;
});
