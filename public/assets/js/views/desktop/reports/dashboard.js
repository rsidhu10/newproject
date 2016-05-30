define([
    'collections/wings',
    'collections/circles',
    'collections/districts',
    'collections/divisions',
    'collections/subdivisions',
    'collections/blocks',
    'text!templates/desktop/reports/dashboard_report.html',
    'text!templates/desktop/reports/sidebar.html',
    'highcharts'
], function (wings, circles, districts, divisions, subdivisions, blocks, aTemplate, aSidebar) {
    var aView = Backbone.View.extend({
        initialize: function () {
            this.render();
            _.bindAll(this, 'render', 'sa_format');
            _.bindAll(this, 'graph_wings');
            _.bindAll(this, 'drilldown_chart1', 'graph_chart1');
            _.bindAll(this, 'drilldown_chart2', 'graph_chart2');
            _.bindAll(this, 'drilldown_chart3', 'graph_chart3');
            _.bindAll(this, 'drilldown_chart4', 'graph_chart4');
            _.bindAll(this, 'drilldown_chart5', 'graph_chart5');
            _.bindAll(this, 'drilldown_chart6', 'graph_chart6');
            _.bindAll(this, 'drilldown_chart7', 'graph_chart7');
            _.bindAll(this, 'drilldown_chart8', 'graph_chart8');
            _.bindAll(this, 'drilldown_chart9', 'graph_chart9');
            this.collection = new wings();
            this.collection.bind('reset', this.graph_wings);
            this.collection.fetch({ reset: true });
        },
        render: function () {
            $(this.el).html(_.template(aTemplate));
            $(this.options.sidebar_el).html(_.template(aSidebar));
        },
        sa_format: function (number) {
            neg_sign = '';
            if (number < 0) {
                neg_sign = '-';
                number = number * -1;
            }

            if (number >= 10000000) {
                return neg_sign + (number / 10000000).toFixed(2) + " Crore";
            } else if (number >= 100000) {
                return neg_sign + (number / 100000).toFixed(2) + " Lakh";
            } else {
                return neg_sign + (number / 100000).toFixed(2) + "";
            }
        },
        graph_wings: function () {
            var self = this;
            console.log('collection: ', this.collection);
            var graph_data_account_balance_amount = [];
            var graph_data_account_balance_number = [];
            var graph_data_account_status = [];
            var graph_data_account_category = [];
            var graph_data_account_economic_status = [];
            var graph_data_account_prepay = [];
            var graph_data_account_prepay_stats = [];
            var graph_data_account_pop = [];
            var graph_data_account_hh = [];
            this.collection.each(function (aModel) {
                var id = parseInt(aModel.get('id'));
                var neg = parseInt(aModel.get('consumers_total_negative_balance'));
                var pos = parseInt(aModel.get('consumers_total_positive_balance'));
                var zero = parseInt(aModel.get('consumers_num_accounts_zero_balance'));
                var n = aModel.get('name');
                graph_data_account_balance_number.push({ model_id: id, name: n, data: [neg, pos, zero], hierarchy: 'wing' });

                var neg_amt = parseInt(aModel.get('consumers_num_accounts_negative_balance'));
                var pos_amt = parseInt(aModel.get('consumers_num_accounts_positive_balance'));
                graph_data_account_balance_amount.push({ model_id: id, name: n, data: [neg_amt, pos_amt], hierarchy: 'wing' });

                var status_connected = parseInt(aModel.get('consumers_num_accounts_connected'));
                var status_disconnected = parseInt(aModel.get('consumers_num_accounts_disconnected'));
                var habitations_total_connections = parseInt(aModel.get('habitations_total_connections'));
                var total_connections = status_connected + status_disconnected;
                graph_data_account_status.push({ model_id: id, name: n, data: [status_connected, status_disconnected, total_connections, habitations_total_connections ], hierarchy: 'wing' });

                var gen = parseInt(aModel.get('consumers_num_accounts_category_gen'));
                var sc = parseInt(aModel.get('consumers_num_accounts_category_sc'));
                var bc = parseInt(aModel.get('consumers_num_accounts_category_bc'));
                graph_data_account_category.push({ model_id: id, name: n, data: [gen,sc,bc], hierarchy: 'wing' });

                var apl = parseInt(aModel.get('consumers_num_accounts_economic_status_apl'));
                var bpl = parseInt(aModel.get('consumers_num_accounts_economic_status_bpl'));
                graph_data_account_economic_status.push({ model_id: id, name: n, data: [apl,bpl], hierarchy: 'wing' });
                ////////////////////////////////////////////////////////////////////////////////////////////////////////
                var accounts_prepaid = parseInt(aModel.get('consumers_num_accounts_prepaid'));
                var months_prepaid = parseInt(aModel.get('consumers_total_months_prepaid'));
                graph_data_account_prepay_stats.push({ model_id: id, name: n, data: [accounts_prepaid,months_prepaid], hierarchy: 'wing' });
                ////////////////////////////////////////////////////////////////////////////////////////////////////////
                var prepay_enabled = parseInt(aModel.get('habitations_prepay_enabled'));
                var prepay_disabled = parseInt(aModel.get('habitations_prepay_disabled'));
                graph_data_account_prepay.push({ model_id: id, name: n, data: [prepay_enabled,prepay_disabled], hierarchy: 'wing' });
                ////////////////////////////////////////////////////////////////////////////////////////////////////////
                var gen_pop = parseInt(aModel.get('habitations_total_gen_pop'));
                var sc_pop = parseInt(aModel.get('habitations_total_sc_pop'));
                graph_data_account_pop.push({ model_id: id, name: n, data: [gen_pop,sc_pop], hierarchy: 'wing' });
                ////////////////////////////////////////////////////////////////////////////////////////////////////////
                var gen_hh = parseInt(aModel.get('habitations_total_gen_hh'));
                var sc_hh = parseInt(aModel.get('habitations_total_sc_hh'));
                graph_data_account_hh.push({ model_id: id, name: n, data: [gen_pop,sc_pop], hierarchy: 'wing' });
            });
            this.chart1 = new Highcharts.Chart({
                chart: {
                    renderTo: 'chart1',
                    type: 'bar'
                },
                title: {
                    text: 'Account Balances: Wings'
                },
                xAxis: {
                    categories: ['Negative', 'Positive', 'Zero']
                },
                yAxis: {
                    title: {
                        text: 'Amount'
                    }
                },
                plotOptions: {
                    bar: {
                        events: {
                            legendItemClick: function (e) {
                                console.log('legend clicked, e:', e);
                            }
                        },
                        point: {
                            events: {
                                click: function (e) {
                                    console.log('point click!, this: ', this);
                                    var id = this.series.options.model_id;
                                    var hierarchy = this.series.options.hierarchy;
                                    console.log('model_id: ', hierarchy);
                                    self.drilldown_chart1(id, hierarchy);
                                }
                            }
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold'
                        },
                        formatter: function () {
                            return this.y + '%';
                        }
                    }
                },
                series: graph_data_account_balance_number
            });
            this.chart2 = new Highcharts.Chart({
                chart: {
                    renderTo: 'chart2',
                    type: 'bar'
                },
                title: {
                    text: 'Account Balances: Wings'
                },
                xAxis: {
                    categories: ['Negative', 'Positive']
                },
                yAxis: {
                    title: {
                        text: 'Number of Accounts'
                    }
                },
                plotOptions: {
                    bar: {
                        events: {
                            legendItemClick: function (e) {
                                console.log('legend clicked, e:', e);
                            }
                        },
                        point: {
                            events: {
                                click: function (e) {
                                    console.log('point click!, this: ', this);
                                    var id = this.series.options.model_id;
                                    var hierarchy = this.series.options.hierarchy;
                                    console.log('model_id: ', hierarchy);
                                    self.drilldown_chart2(id, hierarchy);
                                }
                            }
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold'
                        },
                        formatter: function () {
                            return this.y + '%';
                        }
                    }
                },
                series: graph_data_account_balance_amount
            });
            this.chart3 = new Highcharts.Chart({
                chart: {
                    renderTo: 'chart3',
                    type: 'bar'
                },
                title: {
                    text: 'Account Status: Wings'
                },
                xAxis: {
                    categories: ['Connected', 'Disconnected', 'Total', 'MIS Total']
                },
                yAxis: {
                    title: {
                        text: 'Number of Accounts'
                    }
                },
                plotOptions: {
                    bar: {
                        events: {
                            legendItemClick: function (e) {
                                console.log('legend clicked, e:', e);
                            }
                        },
                        point: {
                            events: {
                                click: function (e) {
                                    console.log('point click!, this: ', this);
                                    var id = this.series.options.model_id;
                                    var hierarchy = this.series.options.hierarchy;
                                    console.log('model_id: ', hierarchy);
                                    self.drilldown_chart3(id, hierarchy);
                                }
                            }
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold'
                        },
                        formatter: function () {
                            return this.y + '%';
                        }
                    }
                },
                series: graph_data_account_status
            });
            this.chart4 = new Highcharts.Chart({
                chart: {
                    renderTo: 'chart4',
                    type: 'bar'
                },
                title: {
                    text: 'Category: Wings'
                },
                xAxis: {
                    categories: ['GEN', 'SC', 'BC']
                },
                yAxis: {
                    title: {
                        text: 'Number of Accounts'
                    }
                },
                plotOptions: {
                    bar: {
                        events: {
                            legendItemClick: function (e) {
                                console.log('legend clicked, e:', e);
                            }
                        },
                        point: {
                            events: {
                                click: function (e) {
                                    console.log('point click!, this: ', this);
                                    var id = this.series.options.model_id;
                                    var hierarchy = this.series.options.hierarchy;
                                    console.log('model_id: ', hierarchy);
                                    self.drilldown_chart4(id, hierarchy);
                                }
                            }
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold'
                        },
                        formatter: function () {
                            return this.y + '%';
                        }
                    }
                },
                series: graph_data_account_category
            });
            this.chart5 = new Highcharts.Chart({
                chart: {
                    renderTo: 'chart5',
                    type: 'bar'
                },
                title: {
                    text: 'Economic Status: Wings'
                },
                xAxis: {
                    categories: ['APL', 'BPL']
                },
                yAxis: {
                    title: {
                        text: 'Number of Accounts'
                    }
                },
                plotOptions: {
                    bar: {
                        events: {
                            legendItemClick: function (e) {
                                console.log('legend clicked, e:', e);
                            }
                        },
                        point: {
                            events: {
                                click: function (e) {
                                    console.log('point click!, this: ', this);
                                    var id = this.series.options.model_id;
                                    var hierarchy = this.series.options.hierarchy;
                                    console.log('model_id: ', hierarchy);
                                    self.drilldown_chart5(id, hierarchy);
                                }
                            }
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold'
                        },
                        formatter: function () {
                            return this.y + '%';
                        }
                    }
                },
                series: graph_data_account_economic_status
            });
            //////////////////////////////////////////////
            this.chart6 = new Highcharts.Chart({
                chart: {
                    renderTo: 'chart6',
                    type: 'bar'
                },
                title: {
                    text: 'Prepay Stats - Consumer: Wings'
                },
                xAxis: {
                    categories: ['Accounts Prepaid', 'Months Prepaid']
                },
                yAxis: {
                    title: {
                        text: ''
                    }
                },
                plotOptions: {
                    bar: {
                        events: {
                            legendItemClick: function (e) {
                                console.log('legend clicked, e:', e);
                            }
                        },
                        point: {
                            events: {
                                click: function (e) {
                                    console.log('point click!, this: ', this);
                                    var id = this.series.options.model_id;
                                    var hierarchy = this.series.options.hierarchy;
                                    console.log('model_id: ', hierarchy);
                                    self.drilldown_chart6(id, hierarchy);
                                }
                            }
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold'
                        },
                        formatter: function () {
                            return this.y + '%';
                        }
                    }
                },
                series: graph_data_account_prepay_stats
            });
            this.chart7 = new Highcharts.Chart({
                chart: {
                    renderTo: 'chart7',
                    type: 'bar'
                },
                title: {
                    text: 'Prepay Stats - Habitation: Wings'
                },
                xAxis: {
                    categories: ['Enabled', 'Disabled']
                },
                yAxis: {
                    title: {
                        text: 'Number of Habitations'
                    }
                },
                plotOptions: {
                    bar: {
                        events: {
                            legendItemClick: function (e) {
                                console.log('legend clicked, e:', e);
                            }
                        },
                        point: {
                            events: {
                                click: function (e) {
                                    console.log('point click!, this: ', this);
                                    var id = this.series.options.model_id;
                                    var hierarchy = this.series.options.hierarchy;
                                    console.log('model_id: ', hierarchy);
                                    self.drilldown_chart7(id, hierarchy);
                                }
                            }
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold'
                        },
                        formatter: function () {
                            return this.y + '%';
                        }
                    }
                },
                series: graph_data_account_prepay
            });
            this.chart8 = new Highcharts.Chart({
                chart: {
                    renderTo: 'chart8',
                    type: 'bar'
                },
                title: {
                    text: 'Population: Wings'
                },
                xAxis: {
                    categories: ['Gen', 'SC']
                },
                yAxis: {
                    title: {
                        text: 'Number of Accounts'
                    }
                },
                plotOptions: {
                    bar: {
                        events: {
                            legendItemClick: function (e) {
                                console.log('legend clicked, e:', e);
                            }
                        },
                        point: {
                            events: {
                                click: function (e) {
                                    console.log('point click!, this: ', this);
                                    var id = this.series.options.model_id;
                                    var hierarchy = this.series.options.hierarchy;
                                    console.log('model_id: ', hierarchy);
                                    self.drilldown_chart8(id, hierarchy);
                                }
                            }
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold'
                        },
                        formatter: function () {
                            return this.y + '%';
                        }
                    }
                },
                series: graph_data_account_pop
            });
            this.chart9 = new Highcharts.Chart({
                chart: {
                    renderTo: 'chart9',
                    type: 'bar'
                },
                title: {
                    text: 'Households: Wings'
                },
                xAxis: {
                    categories: ['Gen', 'SC']
                },
                yAxis: {
                    title: {
                        text: 'Number of Accounts'
                    }
                },
                plotOptions: {
                    bar: {
                        events: {
                            legendItemClick: function (e) {
                                console.log('legend clicked, e:', e);
                            }
                        },
                        point: {
                            events: {
                                click: function (e) {
                                    console.log('point click!, this: ', this);
                                    var id = this.series.options.model_id;
                                    var hierarchy = this.series.options.hierarchy;
                                    console.log('model_id: ', hierarchy);
                                    self.drilldown_chart9(id, hierarchy);
                                }
                            }
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold'
                        },
                        formatter: function () {
                            return this.y + '%';
                        }
                    }
                },
                series: graph_data_account_hh
            });
        },
        graph_chart1: function (aCollection) {
            var self = this;
            aCollection.each(function (aModel) {
                var id = parseInt(aModel.get('id'));
                var neg = parseInt(aModel.get('consumers_total_negative_balance'));
                var pos = parseInt(aModel.get('consumers_total_positive_balance'));
                var zero = parseInt(aModel.get('consumers_num_accounts_zero_balance'));
                var n = aModel.get('name');
                self.chart1.addSeries({ model_id: id, name: n, data: [neg, pos, zero], hierarchy: aCollection.hierarchy });
            });
        },
        graph_chart2: function (aCollection) {
            var self = this;
            aCollection.each(function (aModel) {
                var id = parseInt(aModel.get('id'));
                var neg = parseInt(aModel.get('consumers_num_accounts_negative_balance'));
                var pos = parseInt(aModel.get('consumers_num_accounts_positive_balance'));
                var n = aModel.get('name');
                self.chart2.addSeries({ model_id: id, name: n, data: [neg, pos], hierarchy: aCollection.hierarchy });
            });
        },
        drilldown_chart1: function (model_id, hierarchy, x) {
            var self = this;

            if (hierarchy == 'wing') {
                this.chart1.setTitle({ text: "Account Balances: Circles" });
                this.collection = new circles();
                this.collection.hierarchy = "circle";
                this.collection.url = "/circles/wing/" + model_id;
                this.collection.bind('reset', this.graph_chart1);
                this.collection.fetch({ reset: true });

            } else if (hierarchy == 'circle') {
                this.chart1.setTitle({ text: "Account Balances: Districts" });
                this.collection = new districts();
                this.collection.hierarchy = "district";
                this.collection.url = "/districts/circle/" + model_id;
                this.collection.bind('reset', this.graph_chart1);
                this.collection.fetch({ reset: true });
            } else if (hierarchy == 'district') {
                this.chart1.setTitle({ text: "Account Balances: Divisions" });
                this.collection = new districts();
                this.collection.hierarchy = "division";
                this.collection.url = "/divisions/district/" + model_id;
                this.collection.bind('reset', this.graph_chart1);
                this.collection.fetch({ reset: true });
            } else if (hierarchy == 'division') {
                this.chart1.setTitle({ text: "Account Balances: Subdivisions" });
                this.collection = new districts();
                this.collection.hierarchy = "subdivision";
                this.collection.url = "/subdivisions/division/" + model_id;
                this.collection.bind('reset', this.graph_chart1);
                this.collection.fetch({ reset: true });
            } else if (hierarchy == 'subdivision') {
                this.chart1.setTitle({ text: "Account Balances: Blocks" });
                this.collection = new districts();
                this.collection.hierarchy = "block";
                this.collection.url = "/blocks/subdivision/" + model_id;
                this.collection.bind('reset', this.graph_chart1);
                this.collection.fetch({ reset: true });
            } else {
                this.chart1.setTitle({ text: "Account Balances: Wings" });
                this.collection = new wings();
                this.collection.hierarchy = "wing";
                this.collection.url = "/wing/all";
                this.collection.bind('reset', this.graph_chart1);
                this.collection.fetch({ reset: true });
            }

            while(this.chart1.series.length > 0)
                this.chart1.series[0].remove(true);

//            for (var i = 0; i < this.chart1.series.length; i++) {
//                console.log('cleaning searies ' + i,this.chart1.series[i]);
//                this.chart1.series[i].remove();
//            }
//            // why doesn't the first loop empty out the series? wtf.. figure out later
//            for (var i = 0; i < this.chart1.series.length; i++) {
//                console.log('cleaning searies ' + i,this.chart1.series[i]);
//                this.chart1.series[i].remove();
//            }

        },
        drilldown_chart2: function (model_id, hierarchy) {
            var self = this;

            if (hierarchy == 'wing') {
                this.chart2.setTitle({ text: "Account Balances: Circles" });
                this.collection = new circles();
                this.collection.hierarchy = "circle";
                this.collection.url = "/circles/wing/" + model_id;
                this.collection.bind('reset', this.graph_chart2);
                this.collection.fetch({ reset: true });
            } else if (hierarchy == 'circle') {
                this.chart2.setTitle({ text: "Account Balances: Districts" });
                this.collection = new districts();
                this.collection.hierarchy = "district";
                this.collection.url = "/districts/circle/" + model_id;
                this.collection.bind('reset', this.graph_chart2);
                this.collection.fetch({ reset: true });
            } else if (hierarchy == 'district') {
                this.chart2.setTitle({ text: "Account Balances: Divisions" });
                this.collection = new districts();
                this.collection.hierarchy = "division";
                this.collection.url = "/divisions/district/" + model_id;
                this.collection.bind('reset', this.graph_chart2);
                this.collection.fetch({ reset: true });
            } else if (hierarchy == 'division') {
                this.chart2.setTitle({ text: "Account Balances: Subdivisions" });
                this.collection = new districts();
                this.collection.hierarchy = "subdivision";
                this.collection.url = "/subdivisions/division/" + model_id;
                this.collection.bind('reset', this.graph_chart2);
                this.collection.fetch({ reset: true });
            } else if (hierarchy == 'subdivision') {
                this.chart2.setTitle({ text: "Account Balances: Blocks" });
                this.collection = new districts();
                this.collection.hierarchy = "block";
                this.collection.url = "/blocks/subdivision/" + model_id;
                this.collection.bind('reset', this.graph_chart2);
                this.collection.fetch({ reset: true });
            } else {
                this.chart2.setTitle({ text: "Account Balances: Wings" });
                this.collection = new wings();
                this.collection.hierarchy = "wing";
                this.collection.url = "/wing/all";
                this.collection.bind('reset', this.graph_chart2);
                this.collection.fetch({ reset: true });
            }

            while(this.chart2.series.length > 0)
                this.chart2.series[0].remove(true);
        },
        graph_chart3: function (aCollection) {
            var self = this;
            aCollection.each(function (aModel) {
                var id = parseInt(aModel.get('id'));
                var status_connected = parseInt(aModel.get('consumers_num_accounts_connected'));
                var status_disconnected = parseInt(aModel.get('consumers_num_accounts_disconnected'));
                var habitations_total_connections = parseInt(aModel.get('habitations_total_connections'));
                var total_connections = status_connected + status_disconnected;
                var n = aModel.get('name');
                self.chart3.addSeries({ model_id: id, name: n, data: [status_connected, status_disconnected, total_connections, habitations_total_connections], hierarchy: aCollection.hierarchy });
            });
        },
        drilldown_chart3: function (model_id, hierarchy) {
            var self = this;
            var aChart = this.chart3;
            var title = "Account Status";
            if (hierarchy == 'wing') {
                aChart.setTitle({ text: title + ": Circles" });
                this.collection = new circles();
                this.collection.hierarchy = "circle";
                this.collection.url = "/circles/wing/" + model_id;
                this.collection.bind('reset', this.graph_chart3);
                this.collection.fetch({ reset: true });
            } else if (hierarchy == 'circle') {
                aChart.setTitle({ text: title + ": Districts" });
                this.collection = new districts();
                this.collection.hierarchy = "district";
                this.collection.url = "/districts/circle/" + model_id;
                this.collection.bind('reset', this.graph_chart3);
                this.collection.fetch({ reset: true });
            } else if (hierarchy == 'district') {
                aChart.setTitle({ text: title + ": Divisions" });
                this.collection = new districts();
                this.collection.hierarchy = "division";
                this.collection.url = "/divisions/district/" + model_id;
                this.collection.bind('reset', this.graph_chart3);
                this.collection.fetch({ reset: true });
            } else if (hierarchy == 'division') {
                aChart.setTitle({ text: title + ": Subdivisions" });
                this.collection = new districts();
                this.collection.hierarchy = "subdivision";
                this.collection.url = "/subdivisions/division/" + model_id;
                this.collection.bind('reset', this.graph_chart3);
                this.collection.fetch({ reset: true });
            } else if (hierarchy == 'subdivision') {
                aChart.setTitle({ text: title + ": Blocks" });
                this.collection = new districts();
                this.collection.hierarchy = "block";
                this.collection.url = "/blocks/subdivision/" + model_id;
                this.collection.bind('reset', this.graph_chart3);
                this.collection.fetch({ reset: true });
            } else {
                aChart.setTitle({ text: title + ": Wings" });
                this.collection = new wings();
                this.collection.hierarchy = "wing";
                this.collection.url = "/wing/all";
                this.collection.bind('reset', this.graph_chart3);
                this.collection.fetch({ reset: true });
            }

            while(aChart.series.length > 0)
                aChart.series[0].remove(true);
        },

        graph_chart4: function (aCollection) {
            var self = this;
            aCollection.each(function (aModel) {
                var id = parseInt(aModel.get('id'));
                var gen = parseInt(aModel.get('consumers_num_accounts_category_gen'));
                var sc = parseInt(aModel.get('consumers_num_accounts_category_sc'));
                var bc = parseInt(aModel.get('consumers_num_accounts_category_bc'));
                var n = aModel.get('name');
                self.chart4.addSeries({ model_id: id, name: n, data: [gen,sc,bc], hierarchy: aCollection.hierarchy });
            });
        },
        drilldown_chart4: function (model_id, hierarchy) {
            var self = this;
            var aChart = this.chart4;
            var title = "Category";
            if (hierarchy == 'wing') {
                aChart.setTitle({ text: title + ": Circles" });
                this.collection = new circles();
                this.collection.hierarchy = "circle";
                this.collection.url = "/circles/wing/" + model_id;
                this.collection.bind('reset', this.graph_chart4);
                this.collection.fetch({ reset: true });
            } else if (hierarchy == 'circle') {
                aChart.setTitle({ text: title + ": Districts" });
                this.collection = new districts();
                this.collection.hierarchy = "district";
                this.collection.url = "/districts/circle/" + model_id;
                this.collection.bind('reset', this.graph_chart4);
                this.collection.fetch({ reset: true });
            } else if (hierarchy == 'district') {
                aChart.setTitle({ text: title + ": Divisions" });
                this.collection = new districts();
                this.collection.hierarchy = "division";
                this.collection.url = "/divisions/district/" + model_id;
                this.collection.bind('reset', this.graph_chart4);
                this.collection.fetch({ reset: true });
            } else if (hierarchy == 'division') {
                aChart.setTitle({ text: title + ": Subdivisions" });
                this.collection = new districts();
                this.collection.hierarchy = "subdivision";
                this.collection.url = "/subdivisions/division/" + model_id;
                this.collection.bind('reset', this.graph_chart4);
                this.collection.fetch({ reset: true });
            } else if (hierarchy == 'subdivision') {
                aChart.setTitle({ text: title + ": Blocks" });
                this.collection = new districts();
                this.collection.hierarchy = "block";
                this.collection.url = "/blocks/subdivision/" + model_id;
                this.collection.bind('reset', this.graph_chart4);
                this.collection.fetch({ reset: true });
            } else {
                aChart.setTitle({ text: title + ": Wings" });
                this.collection = new wings();
                this.collection.hierarchy = "wing";
                this.collection.url = "/wing/all";
                this.collection.bind('reset', this.graph_chart4);
                this.collection.fetch({ reset: true });
            }

            while(aChart.series.length > 0)
                aChart.series[0].remove(true);
        },

        graph_chart5: function (aCollection) {
            var self = this;
            aCollection.each(function (aModel) {
                var id = parseInt(aModel.get('id'));
                var apl = parseInt(aModel.get('consumers_num_accounts_economic_status_apl'));
                var bpl = parseInt(aModel.get('consumers_num_accounts_economic_status_bpl'));
                var n = aModel.get('name');
                self.chart5.addSeries({ model_id: id, name: n, data: [apl,bpl], hierarchy: aCollection.hierarchy });
            });
        },
        drilldown_chart5: function (model_id, hierarchy) {
            var self = this;
            var aChart = this.chart5;
            var title = "Economic Status";
            if (hierarchy == 'wing') {
                aChart.setTitle({ text: title + ": Circles" });
                this.collection = new circles();
                this.collection.hierarchy = "circle";
                this.collection.url = "/circles/wing/" + model_id;
                this.collection.bind('reset', this.graph_chart5);
                this.collection.fetch({ reset: true });
            } else if (hierarchy == 'circle') {
                aChart.setTitle({ text: title + ": Districts" });
                this.collection = new districts();
                this.collection.hierarchy = "district";
                this.collection.url = "/districts/circle/" + model_id;
                this.collection.bind('reset', this.graph_chart5);
                this.collection.fetch({ reset: true });
            } else if (hierarchy == 'district') {
                aChart.setTitle({ text: title + ": Divisions" });
                this.collection = new districts();
                this.collection.hierarchy = "division";
                this.collection.url = "/divisions/district/" + model_id;
                this.collection.bind('reset', this.graph_chart5);
                this.collection.fetch({ reset: true });
            } else if (hierarchy == 'division') {
                aChart.setTitle({ text: title + ": Subdivisions" });
                this.collection = new districts();
                this.collection.hierarchy = "subdivision";
                this.collection.url = "/subdivisions/division/" + model_id;
                this.collection.bind('reset', this.graph_chart5);
                this.collection.fetch({ reset: true });
            } else if (hierarchy == 'subdivision') {
                aChart.setTitle({ text: title + ": Blocks" });
                this.collection = new districts();
                this.collection.hierarchy = "block";
                this.collection.url = "/blocks/subdivision/" + model_id;
                this.collection.bind('reset', this.graph_chart5);
                this.collection.fetch({ reset: true });
            } else {
                aChart.setTitle({ text: title + ": Wings" });
                this.collection = new wings();
                this.collection.hierarchy = "wing";
                this.collection.url = "/wing/all";
                this.collection.bind('reset', this.graph_chart5);
                this.collection.fetch({ reset: true });
            }


            while(aChart.series.length > 0)
                aChart.series[0].remove(true);
        },

        graph_chart6: function (aCollection) {
            var self = this;
            aCollection.each(function (aModel) {
                var id = parseInt(aModel.get('id'));
                var accounts_prepaid = parseInt(aModel.get('consumers_num_accounts_prepaid'));
                var months_prepaid = parseInt(aModel.get('consumers_total_months_prepaid'));
                var n = aModel.get('name');
                self.chart6.addSeries({ model_id: id, name: n, data: [accounts_prepaid,months_prepaid], hierarchy: aCollection.hierarchy });
            });
        },
        graph_chart7: function (aCollection) {
            var self = this;
            aCollection.each(function (aModel) {
                var id = parseInt(aModel.get('id'));
                var prepay_enabled = parseInt(aModel.get('habitations_prepay_enabled'));
                var prepay_disabled = parseInt(aModel.get('habitations_prepay_disabled'));
                var n = aModel.get('name');
                self.chart7.addSeries({ model_id: id, name: n, data: [prepay_enabled,prepay_disabled], hierarchy: aCollection.hierarchy });
            });
        },
        graph_chart8: function (aCollection) {
            var self = this;
            aCollection.each(function (aModel) {
                var id = parseInt(aModel.get('id'));
                var gen_pop = parseInt(aModel.get('habitations_total_gen_pop'));
                var sc_pop = parseInt(aModel.get('habitations_total_sc_pop'));
                var n = aModel.get('name');
                self.chart8.addSeries({ model_id: id, name: n, data: [gen_pop,sc_pop], hierarchy: aCollection.hierarchy });
            });
        },
        graph_chart9: function (aCollection) {
            var self = this;
            aCollection.each(function (aModel) {
                var id = parseInt(aModel.get('id'));
                var gen_hh = parseInt(aModel.get('habitations_total_gen_hh'));
                var sc_hh = parseInt(aModel.get('habitations_total_sc_hh'));
                var n = aModel.get('name');
                self.chart9.addSeries({ model_id: id, name: n, data: [gen_hh,sc_hh], hierarchy: aCollection.hierarchy });
            });
        },

        drilldown_chart6: function (model_id, hierarchy) {
            var self = this;
            var aChart = this.chart6;
            var title = "Prepay Stats - Consumer";
            if (hierarchy == 'wing') {
                aChart.setTitle({ text: title + ": Circles" });
                this.collection = new circles();
                this.collection.hierarchy = "circle";
                this.collection.url = "/circles/wing/" + model_id;
            } else if (hierarchy == 'circle') {
                aChart.setTitle({ text: title + ": Districts" });
                this.collection = new districts();
                this.collection.hierarchy = "district";
                this.collection.url = "/districts/circle/" + model_id;
            } else if (hierarchy == 'district') {
                aChart.setTitle({ text: title + ": Divisions" });
                this.collection = new districts();
                this.collection.hierarchy = "division";
                this.collection.url = "/divisions/district/" + model_id;
            } else if (hierarchy == 'division') {
                aChart.setTitle({ text: title + ": Subdivisions" });
                this.collection = new districts();
                this.collection.hierarchy = "subdivision";
                this.collection.url = "/subdivisions/division/" + model_id;
            } else if (hierarchy == 'subdivision') {
                aChart.setTitle({ text: title + ": Blocks" });
                this.collection = new districts();
                this.collection.hierarchy = "block";
                this.collection.url = "/blocks/subdivision/" + model_id;
            } else {
                aChart.setTitle({ text: title + ": Wings" });
                this.collection = new wings();
                this.collection.hierarchy = "wing";
                this.collection.url = "/wing/all";
            }
            this.collection.bind('reset', this.graph_chart6);
            this.collection.fetch({ reset: true });


            while(aChart.series.length > 0)
                aChart.series[0].remove(true);
        },
        drilldown_chart7: function (model_id, hierarchy) {
            var self = this;
            var aChart = this.chart7;
            var title = "Prepay Stats - Habitation";
            if (hierarchy == 'wing') {
                aChart.setTitle({ text: title + ": Circles" });
                this.collection = new circles();
                this.collection.hierarchy = "circle";
                this.collection.url = "/circles/wing/" + model_id;
            } else if (hierarchy == 'circle') {
                aChart.setTitle({ text: title + ": Districts" });
                this.collection = new districts();
                this.collection.hierarchy = "district";
                this.collection.url = "/districts/circle/" + model_id;
            } else if (hierarchy == 'district') {
                aChart.setTitle({ text: title + ": Divisions" });
                this.collection = new districts();
                this.collection.hierarchy = "division";
                this.collection.url = "/divisions/district/" + model_id;
            } else if (hierarchy == 'division') {
                aChart.setTitle({ text: title + ": Subdivisions" });
                this.collection = new districts();
                this.collection.hierarchy = "subdivision";
                this.collection.url = "/subdivisions/division/" + model_id;
            } else if (hierarchy == 'subdivision') {
                aChart.setTitle({ text: title + ": Blocks" });
                this.collection = new districts();
                this.collection.hierarchy = "block";
                this.collection.url = "/blocks/subdivision/" + model_id;
            } else {
                aChart.setTitle({ text: title + ": Wings" });
                this.collection = new wings();
                this.collection.hierarchy = "wing";
                this.collection.url = "/wing/all";
            }
            this.collection.bind('reset', this.graph_chart7);
            this.collection.fetch({ reset: true });


            while(aChart.series.length > 0)
                aChart.series[0].remove(true);
        },
        drilldown_chart8: function (model_id, hierarchy) {
            var self = this;
            var aChart = this.chart8;
            var title = "Population";
            if (hierarchy == 'wing') {
                aChart.setTitle({ text: title + ": Circles" });
                this.collection = new circles();
                this.collection.hierarchy = "circle";
                this.collection.url = "/circles/wing/" + model_id;
            } else if (hierarchy == 'circle') {
                aChart.setTitle({ text: title + ": Districts" });
                this.collection = new districts();
                this.collection.hierarchy = "district";
                this.collection.url = "/districts/circle/" + model_id;
            } else if (hierarchy == 'district') {
                aChart.setTitle({ text: title + ": Divisions" });
                this.collection = new districts();
                this.collection.hierarchy = "division";
                this.collection.url = "/divisions/district/" + model_id;
            } else if (hierarchy == 'division') {
                aChart.setTitle({ text: title + ": Subdivisions" });
                this.collection = new districts();
                this.collection.hierarchy = "subdivision";
                this.collection.url = "/subdivisions/division/" + model_id;
            } else if (hierarchy == 'subdivision') {
                aChart.setTitle({ text: title + ": Blocks" });
                this.collection = new districts();
                this.collection.hierarchy = "block";
                this.collection.url = "/blocks/subdivision/" + model_id;
            } else {
                aChart.setTitle({ text: title + ": Wings" });
                this.collection = new wings();
                this.collection.hierarchy = "wing";
                this.collection.url = "/wing/all";
            }
            this.collection.bind('reset', this.graph_chart8);
            this.collection.fetch({ reset: true });


            while(aChart.series.length > 0)
                aChart.series[0].remove(true);
        },
        drilldown_chart9: function (model_id, hierarchy) {
            var self = this;
            var aChart = this.chart9;
            var title = "Households";
            if (hierarchy == 'wing') {
                aChart.setTitle({ text: title + ": Circles" });
                this.collection = new circles();
                this.collection.hierarchy = "circle";
                this.collection.url = "/circles/wing/" + model_id;
            } else if (hierarchy == 'circle') {
                aChart.setTitle({ text: title + ": Districts" });
                this.collection = new districts();
                this.collection.hierarchy = "district";
                this.collection.url = "/districts/circle/" + model_id;
            } else if (hierarchy == 'district') {
                aChart.setTitle({ text: title + ": Divisions" });
                this.collection = new districts();
                this.collection.hierarchy = "division";
                this.collection.url = "/divisions/district/" + model_id;
            } else if (hierarchy == 'division') {
                aChart.setTitle({ text: title + ": Subdivisions" });
                this.collection = new districts();
                this.collection.hierarchy = "subdivision";
                this.collection.url = "/subdivisions/division/" + model_id;
            } else if (hierarchy == 'subdivision') {
                aChart.setTitle({ text: title + ": Blocks" });
                this.collection = new districts();
                this.collection.hierarchy = "block";
                this.collection.url = "/blocks/subdivision/" + model_id;
            } else {
                aChart.setTitle({ text: title + ": Wings" });
                this.collection = new wings();
                this.collection.hierarchy = "wing";
                this.collection.url = "/wing/all";
            }
            this.collection.bind('reset', this.graph_chart9);
            this.collection.fetch({ reset: true });

            while(aChart.series.length > 0)
                aChart.series[0].remove(true);
        }

    });
    return aView;
});

