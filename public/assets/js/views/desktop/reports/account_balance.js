define([
    '/jsdata/hierarchy',
    '/jsdata/monthly_payments_2',
    'text!templates/desktop/reports/account_balances_report.html',
    'text!templates/desktop/reports/sidebar.html',
    'highcharts'
], function (hData, js_data, aTemplate, aSidebar) {
    var aView = Backbone.View.extend({
        events:{
            "click #report_balances_overview":"chart1",
            "click #report_balances_details":"chart2"
        },
        initialize:function () {
            this.render();
            _.bindAll(this, 'render', 'sa_format', 'chart1', 'chart2');
        },
        render:function () {
            $(this.el).html(_.template(aTemplate));
            $(this.options.sidebar_el).html(_.template(aSidebar));
            this.chart1();
        },
        test_click:function (e) {
            console.log('click!', e);
        },
        sa_format:function (number) {
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
        chart1:function () {
            $('#report_balances_details_li').removeClass('active');
            $('#report_balances_overview_li').removeClass('active');
            $('#report_balances_overview_li').addClass('active');
            var self = this;
            // lets do the math
            var bal_neg = hData.balance_negative;
            var bal_pos = hData.balance_positive;
            var bal_zer = hData.balance_zero;

            var colors = Highcharts.getOptions().colors;
            var my_colors = [colors[8], colors[2], colors[6]];
            var i = 0;
            _.each(js_data, function(item) {
                item.color = my_colors[i++];
            });

            var total = bal_neg + bal_pos + bal_zer;
            var p_neg = Math.round((bal_neg / total) * 100);
            var p_pos = Math.round((bal_pos / total) * 100);
            var p_zer = 100 - (p_neg + p_pos);


            var setChart = function (name, categories, data, level, type) {
//                console.log('level: ' + level);

//                if(level == 1) {
//                    chart.setTitle({ text: "Consumer Account Balances: Overall Summary" });
//                } else

                if (level == 1) {
                    chart.setTitle({ text: "Consumer Account Balances: Wings" });
                } else if (level == 2) {
                    chart.setTitle({ text: "Consumer Account Balances: Circles" });
                } else if (level == 3) {
                    chart.setTitle({ text: "Consumer Account Balances: Districts" });
                } else if (level == 4) {
                    chart.setTitle({ text: "Consumer Account Balances: Divisions" });
                } else if (level == 5) {
                    chart.setTitle({ text: "Consumer Account Balances: Subdivisions" });
                } else if (level == 6) {
                    chart.setTitle({ text: "Consumer Account Balances: Blocks" });
                } else if (level == 7) {
                    chart.setTitle({ text: "Consumer Account Balances: Panchayats" });
                } else {
                    chart.setTitle({ text: "Consumer Account Balances" });
                }
//                console.log('setChart(name, categories, data, level, type): ', name, categories, data, level, type);
                chart.xAxis[0].setCategories(categories);
                var dataLen = data.length;
//                var colors = ["#92A8CD", "#52A8CD", "#72A8CD"];

                for (var i = 0; i < chart.series.length; i++) {
                    chart.series[i].remove();
                }
                // why doesn't the first loop empty out the series? wtf.. figure out later
                for (var i = 0; i < chart.series.length; i++) {
                    chart.series[i].remove();
                }
//
                for (var i = 0; i < dataLen; i++) {
                    chart.addSeries({
                        type:type,
                        name:name[i],
                        stacking:'percent',
                        data:data[i],
                        level:level,
                        color:my_colors[i] || 'white'
                    });
                }
            };

            var chart = new Highcharts.Chart({
                chart:{
                    renderTo:'main_reports_div',
                    plotBackgroundColor:null,
                    plotBorderWidth:null,
                    plotShadow:false
                },
                title:{
                    text:'Account Balances'
                },

                yAxis:{
                    title:{
                        text:'Percent'
                    }
                },

                tooltip:{
//                    pointFormat:'{' + self.sa_format(point.balance) + '} {point.percentage}% of all accounts',
//                    percentageDecimals:2,
                    formatter:function () {

                        var point = this.point, s = '';
                        var hierarchy = "Overall";
                        if (typeof point.hierarchy !== 'undefined') {
                            hierarchy = point.hierarchy.charAt(0).toUpperCase() + point.hierarchy.substr(1);
                        }


                        if(this.point.config.type == "column") {
                            s = '<strong>' + hierarchy + ': ' + point.name + ' </strong> '+ point.y +'% <br/>';
                            s += this.series.name + ' ';
                        } else {
                            s = '<strong>' + hierarchy + ': ' + point.name + '</strong><br/>';
                        }

                        if(point.balance != 0.00) {
                            s += self.sa_format(point.balance) + ' Rs.';
                        }

                        return s;
                    }
                },
                plotOptions:{
                    pie:{
                        allowPointSelect:false,
                        cursor:'pointer',
                        point:{
                            events:{
                                click:function () {
//                                    console.log('pie click!: ', this);
                                    var drilldown = this.drilldown;
                                    d = drilldown.data;
                                    setChart(drilldown.series_names, d.names, [d.zero , d.advance, d.pending], drilldown.level, drilldown.type);
                                }
                            }
                        },
                        dataLabels:{
                            enabled:true,
                            color:'#000000',
                            connectorColor:'#000000',
                            formatter:function () {
                                return '<b>' + this.point.name + '</b>';
                            }
                        }
                    },
                    column:{
                        stacking:'percent',
                        cursor:'pointer',
                        point:{
                            events:{
                                click:function () {
                                    var drilldown = this.drilldown;
                                    if (drilldown) { // drill down
                                        this.series.chart.setTitle({
                                            text:drilldown.name
                                        });
//                                        console.log('Drilldown:', drilldown);
                                        d = drilldown.data;
                                        setChart(drilldown.series_names, drilldown.categories, [d.zero , d.advance, d.pending], drilldown.level, drilldown.type);
//                                        console.log('if');
                                    } else { // restore
//                                        console.log('else');
                                        self.chart1();
//                                        setChart(name, categories, [js_data.zero, js_data.advance, js_data.pending], null, level, 'column');
                                    }
                                }
                            }
                        },
                        dataLabels:{
                            enabled:true,
//                            color:colors[0],
                            style:{
                                fontWeight:'bold'
                            },
                            formatter:function () {
                                return this.y + '%';
                            }
                        }
                    }
                },
                series:[
                    {
                        type:'pie',
                        name:'Accounts',
                        data:js_data
//                        data:[
//                            {
//                                name:'Zero Balance: ' + p_zer + '%',
//                                balance:'',
//                                y:bal_zer,
//                                sliced:false,
//                                selected:false
//                            },
//                            {
//                                name:'Pending Payments: ' + p_pos + '% (' + self.sa_format(hData.balance_positive_total) + ')',
//                                balance:self.sa_format(hData.balance_positive_total) + '<br/>',
//                                y:bal_pos,
//                                sliced:true,
//                                selected:true
//                            },
//                            {
//                                name:'Advance Payments: ' + p_neg + '% (' + self.sa_format(hData.balance_negative_total) + ')',
//                                balance:self.sa_format(hData.balance_negative_total) + '<br/>',
//                                y:bal_neg,
//                                sliced:false,
//                                selected:false
//                            }
//                        ]
                    }
                ]
            });
//            console.log('js_data: ', js_data);
            return false;
        },
        chart3:function () {
            $('#report_balances_details_li').removeClass('active');
            $('#report_balances_overview_li').removeClass('active');
            $('#report_balances_details_li').addClass('active');
            var colors = Highcharts.getOptions().colors;
            wing_data = hData.hData;
            var self = this;

            console.log('hData:', hData);
            var categories = ['North', 'Central', 'South'];
            var charttitle = 'Wings';
            var level = 0;
            var data = wing_data;

            function setChart(name, categories, data, color, level) {
                chart.xAxis[0].setCategories(categories);
                chart.series[0].remove();

                chart.addSeries({
                    name:name,
                    data:data,
                    level:level,
                    color:color || 'white'
                });
            }

            chart = new Highcharts.Chart({
                chart:{
                    renderTo:'main_reports_div',
                    type:'column',
                    margin:[ 50, 50, 100, 80]
                },
                title:{
                    text:'PunjabWater.Net Account Balances'
                },
                subtitle:{
                    text:'Click the columns to drill-down.'
                },
                xAxis:{
                    categories:categories,
                    labels:{
                        rotation:-45,
                        align:'right',
                        style:{
                            fontSize:'13px',
                            fontFamily:'Verdana, sans-serif'
                        }
                    }
                },
                yAxis:{
                    title:{
                        text:'Total Balance'
                    }
                },
                plotOptions:{
                    column:{
                        stacking:'normal',
                        cursor:'pointer',
                        point:{
                            events:{
                                click:function () {

                                    var drilldown = this.drilldown;
                                    if (drilldown) { // drill down
                                        console.log('drilldown: (is true!) ', drilldown);
                                        this.series.chart.setTitle({
                                            text:drilldown.title
                                        });

                                        setChart(drilldown.title, drilldown.categories, drilldown.data, drilldown.color, drilldown.level);
                                    } else { // restore
                                        this.series.chart.setTitle({
                                            text:'Wings of Punjab'
                                        });
                                        console.log('drilldown: (is false!) ', drilldown);
//                                        debugger;
                                        setChart('', categories, data, null, level);
                                    }
                                }
                            }
                        },
                        dataLabels:{
                            enabled:true,
                            color:colors[0],
                            style:{
                                fontWeight:'bold'
                            },
                            formatter:function () {
                                return self.sa_format(this.y) + ' Rs.';
                            }
                        }
                    }
                },
                tooltip:{
                    formatter:function () {
                        var point = this.point, s = '';
                        console.log('LEVEL: ', this.series.options.level);

                        s = '<strong>' + point.hierarchy + ': ' + point.category + '</strong><br/>';
                        s += 'Balance: ' + self.sa_format(point.y);

//                        debugger;
//                        switch (this.series.options.level) {
//                            case 0:
//                                s = 'Wing: ' + point.category + '<br/>';
//                                s += ' Balance: ' + self.sa_format(point.y);
////                                debugger;
//                                break;
//                            case 1:
//                                s = 'Circle:' + point.category + '<br/>';
//                                s += ' something else here';
//                                break;
//                            case 2:
//                                s = '3<br/>';
//                                s += 'more stuff here';
//                                break;
//                            case 3:
//                                s = '3<br/>';
//                                s += 'more stuff here';
//                                break;
//                            case 4:
//                                s = '3<br/>';
//                                s += 'more stuff here';
//                                break;
//                            case 5:
//                                s = '3<br/>';
//                                s += 'more stuff here';
//                                break;
//                            case 6:
//                                s = '3<br/>';
//                                s += 'more stuff here';
//                                break;
//                            case 7:
//                                s = '3<br/>';
//                                s += 'more stuff here';
//                                break;
//                            case 8:
//                                s = '3<br/>';
//                                s += 'more stuff here';
//                                break;
//                        }


                        return s;
                    }
                },
                series:[
                    {
                        name:charttitle,
                        level:level,
                        data:data,
                        color:'white'
                    }
                ],
                legend:{
                    enabled:false
                },
                exporting:{
                    enabled:false
                }
            });
            return false;
            ///////////////////////////////////////////////////////////////////////////////
        },
        chart2:function () {
            console.log('js_data: ', js_data);
            $('#report_balances_details_li').removeClass('active');
            $('#report_balances_overview_li').removeClass('active');
            $('#report_balances_details_li').addClass('active');
            var self = this;
            var colors = Highcharts.getOptions().colors;
            var categories = [ 'Dhuri', 'MK 1', 'MK 2'];
            var level = 0;
            var name = "Some Name";
            var data_zero = [
                { y:40, balance:400000, name:'Dhuri',
                    drilldown:{
                        series_names:['Zero Balance', 'Pending Payments', 'Advance Payments'],
                        level:1,
                        type:'column',
                        categories:['Village 1', 'Village 2', 'Village 3'],
                        data1:[
                            {name:'Village 1', balance:400000, y:50},
                            {name:'Village 2', balance:400000, y:5},
                            {name:'Village 3', balance:400000, y:5}
                        ],
                        data2:[
                            {name:'Village 1', y:50},
                            {name:'Village 2', y:5},
                            {name:'Village 3', y:5}
                        ],
                        data3:[
                            {name:'Village 1', y:50},
                            {name:'Village 2', y:5},
                            {name:'Village 3', y:5}
                        ],
                        color:[colors[8], colors[2], colors[6]]
                    }
                },
                { y:40, balance:400000, name:'MK 1' },
                { y:40, balance:400000, name:'MK 2' }
            ];
//            var data_advance = [
//                // advance
//                { y:25, balance:250000, name:'Dhuri' },
//                { y:25, balance:250000, name:'MK 1' },
//                { y:25, balance:250000, name:'MK 2' }
//            ];
//            var data_pending = [
//                // pending
//                { y:35, balance:350000, name:'Dhuri' },
//                { y:35, balance:350000, name:'MK 1' },
//                { y:35, balance:350000, name:'MK 2' }
//            ];
//            var data_pending2 = [
//                // pending
//                { y:40, balance:340000, name:'Dhuri', color:colors[8] },
//                { y:40, balance:340000, name:'MK 1', color:colors[8] },
//                {
//                    y:40,
//                    name:'MK 2',
//                    balance:340000,
//                    drilldown:{
//                        series_names:['Zero Balance', 'Pending Payments', 'Advance Payments'],
//                        level:1,
//                        type:'column',
//                        categories:['Village 1', 'Village 2', 'Village 3'],
//                        data1:[
//                            {name:'Village 1', y:50},
//                            {name:'Village 2', y:5},
//                            {name:'Village 3', y:5}
//                        ],
//                        data2:[
//                            {name:'Village 1', y:50},
//                            {name:'Village 2', y:5},
//                            {name:'Village 3', y:5}
//                        ],
//                        data3:[
//                            {name:'Village 1', y:50},
//                            {name:'Village 2', y:5},
//                            {name:'Village 3', y:5}
//                        ],
//                        color:[colors[8], colors[2], colors[6]]
//                    }
//                }
//            ];

            var setChart = function (name, categories, data, colors, level, type) {
                console.log('setChart(name, categories, data, colors, level, type): ', name, categories, data, colors, level, type);
                chart.xAxis[0].setCategories(categories);
                var dataLen = data.length;

                chart.series[0].remove();
                chart.series[0].remove();
                if (dataLen === 1) {
                    chart.series[0].remove();
                } else {
                    for (var i = 0; i < chart.series.length; i++) {
                        chart.series[i].remove();
                    }
                }
                for (var i = 0; i < dataLen; i++) {

                    chart.addSeries({
                        type:type,
                        name:name[i],
                        stacking:'percent',
                        data:data[i],
                        level:level,
                        color:colors[i] || 'white'
                    });
                }
            };

            var chart = new Highcharts.Chart({
                chart:{
                    renderTo:'main_reports_div',
                    type:'column',
                    plotBackgroundColor:null,
                    plotBorderWidth:null,
                    plotShadow:false
                },
                title:{
                    text:'Account Balance Distribution'
                },
//                subtitle:{
//                    text:'Click the columns to view into bundles. Click again to go back.'
//                },
                xAxis:{
                    categories:categories
                },
                yAxis:{
                    title:{
                        text:'% of Accounts'
                    }
                },
                plotOptions:{
                    column:{
                        stacking:'percent',
                        cursor:'pointer',
                        point:{
                            events:{
                                click:function () {
                                    var drilldown = this.drilldown;
                                    if (drilldown) { // drill down
                                        this.series.chart.setTitle({
                                            text:drilldown.name
                                        });
                                        console.log('Drilldown:', drilldown);
                                        d = drilldown.data[0];
                                        setChart(drilldown.series_names, drilldown.categories, [d.zero , d.advance, d.pending], drilldown.colors, drilldown.level, drilldown.type);
                                        console.log('if');
                                    } else { // restore
                                        console.log('else');
                                        setChart(name, categories, [js_data.zero, js_data.advance, js_data.pending], null, level, 'column');
                                    }
                                }
                            }
                        },
                        dataLabels:{
                            enabled:true,
                            color:colors[0],
                            style:{
                                fontWeight:'bold'
                            },
                            formatter:function () {
                                return this.y + '%';
                            }
                        }
                    }
                },
                tooltip:{
                    formatter:function () {
                        var point = this.point,
                            s = this.x + ':<b>' + this.y + '% </b><br/>';
                        s += '' + this.point.num + ' accounts<br/>';
                        if ('undefined' !== typeof this.point.amount) {
                            s += '' + self.sa_format(this.point.amount) + ' Rs.<br/>';
                        }

//                        if (point.drilldown) {
//                            s += 'Click to view ' + point.category + ' what makes up this bundle';
//                        } else {
//                            s += 'Click to go to the bundles';
//                        }
                        return s;
                    }
                },
                series:[
                    {
                        name:"Pending Payments",
                        data:js_data.pending,
                        color:colors[6]
                    },
                    {
                        name:"Advance Payments",
                        data:js_data.advance,
                        color:colors[2]
                    },
                    {
                        name:"Zero Balance",
                        data:js_data.zero,
                        color:colors[8]
                    }
                ],
                exporting:{
                    enabled:false
                }
            });

            return false;
        }
    });
    return aView;
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// working template 2/17/2013
//define(function () {
//
//    var sd_data = {
//        "zero":[
//            {
//                "y":13, "num":1304,
//                "name":"Dhuri",
//                drilldown:{
//                    level:1,
//                    type:'column',
//                    series_names:['Zero Balance', 'Pending Payments', 'Advance Payments'],
//                    title:"Blocks",
//                    colors:['#92A8CD', '#52A8CD', '#72A8CD'],
//                    categories:['Block 0', 'Block 1', 'Block 2'],
//                    data:[
//                        {
//                            "zero":[
//                                { "y":13, "num":1304, "name":"Block 0" },
//                                { "y":13, "num":738, "name":"Block 1" },
//                                { "y":6, "num":282, "name":"Block 2" }
//                            ],
//                            "advance":[
//                                {"y":28, "num":2696, "amount":507907, "name":"Block 0"},
//                                {"y":25, "num":1412, "amount":192974, "name":"Block 1"},
//                                {"y":22, "num":978, "amount":123104, "name":"Block 2"}
//                            ],
//                            "pending":[
//                                {"y":59, "num":5787, "amount":13766933, "name":"Block 0"},
//                                {"y":62, "num":3567, "amount":10884247, "name":"Block 1"},
//                                {"y":72, "num":3111, "amount":11865814, "name":"Block 2"}
//                            ]
//                        }
//                    ]
//                }
//            },
//            {"y":13, "num":738, "name":"Malerkotla 1"},
//            {"y":6, "num":282, "name":"Malerkotla 2"}
//        ],
//        "advance":[
//            {"y":28, "num":2696, "amount":507907, "name":"Dhuri"},
//            {"y":25, "num":1412, "amount":192974, "name":"Malerkotla 1"},
//            {"y":22, "num":978, "amount":123104, "name":"Malerkotla 2"}
//        ],
//        "pending":[
//            {"y":59, "num":5787, "amount":13766933, "name":"Dhuri"},
//            {"y":62, "num":3567, "amount":10884247, "name":"Malerkotla 1"},
//            {"y":72, "num":3111, "amount":11865814, "name":"Malerkotla 2"}
//        ]
//    };
//
//    var overall_data = [
//        {
//            y:25, name:'Zero Balance: XX%', balance:'', sliced:false, selected:false, type:'pie',
//            drilldown:{
//                level:1,
//                type:'column',
//                series_names:['Zero Balance', 'Pending Payments', 'Advance Payments'],
//                title:"Subdivisions",
//                colors:['#92A8CD', '#52A8CD', '#72A8CD'],
//                categories:['Dhuri', 'MK 1', 'MK 2'],
//                data:sd_data
//            }
//        },
//        { y:25, name:'Pending Payments: XX%', balance:'', sliced:true, selected:true, type:'pie',
//            drilldown:{
//                level:1,
//                type:'column',
//                series_names:['Zero Balance', 'Pending Payments', 'Advance Payments'],
//                title:"Subdivisions",
//                colors:['#92A8CD', '#52A8CD', '#72A8CD'],
//                categories:['Dhuri', 'MK 1', 'MK 2'],
//                data:sd_data
//            }
//        },
//        { y:50, name:'Advance Payments: XX%', balance:'', sliced:false, selected:false, type:'pie',
//            drilldown:{
//                level:1,
//                type:'column',
//                series_names:['Zero Balance', 'Pending Payments', 'Advance Payments'],
//                title:"Subdivisions",
//                colors:['#92A8CD', '#52A8CD', '#72A8CD'],
//                categories:['Dhuri', 'MK 1', 'MK 2'],
//                data:sd_data
//            }
//        }
//    ];
//
//    return overall_data;
//});
//
