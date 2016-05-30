define([
    '/jsdata/schemes',
    'text!templates/desktop/reports/schemes_report.html',
    'text!templates/desktop/reports/sidebar.html',
    'highcharts'
], function (schemes_data, aTemplate, aSidebar) {
    var aView = Backbone.View.extend({
        events:{
            "click #report_schemes_operated_by":"chart1",
            "click #report_schemes_consumers":"chart2",
            "click #report_schemes_connection_type":"chart3",
            "click #report_schemes_operational_status":"chart4"
        },
        initialize:function () {
            _.bindAll(this, 'render', 'chart1', 'chart2');
            this.render();
        },
        render:function () {
            $(this.el).html(_.template(aTemplate));
            $(this.options.sidebar_el).html(_.template(aSidebar));

            this.chart1();
        },
        chart1:function () {
            $('#report_schemes_operated_by_li').removeClass('active');
            $('#report_schemes_consumers_li').removeClass('active');
            $('#report_schemes_connection_type_li').removeClass('active');
            $('#report_schemes_operated_by_li').addClass('active');
            //////////////////////////////////////////////////////////////
            var operated_by = _.countBy(schemes_data, function (scheme) {
                return scheme.operated_by;
            });
            if (typeof operated_by.GP === 'undefined') {
                operated_by.GP = 0;
            }
            if (typeof operated_by.DWSS === 'undefined') {
                operated_by.DWSS = 0;
            }
            if (typeof operated_by.GPWSC === 'undefined') {
                operated_by.GPWSC = 0;
            }
            var chart = new Highcharts.Chart({
                chart:{
                    renderTo:'main_reports_div',
                    plotBackgroundColor:null,
                    plotBorderWidth:null,
                    plotShadow:false
                },
                title:{
                    text:'Schemes (Operated By)'
                },
                tooltip:{
                    pointFormat:'{point.percentage}%',
                    percentageDecimals:2
                },
                plotOptions:{
                    pie:{
                        allowPointSelect:true,
                        cursor:'pointer',
                        dataLabels:{
                            enabled:true,
                            color:'#000000',
                            connectorColor:'#000000',
                            formatter:function () {
                                return '<b>' + this.point.name + '</b>';
                            }
                        }
                    }
                },
                series:[
                    {
                        type:'pie',
                        name:'Accounts',
                        data:[
                            {
                                name:'GP',
                                y:operated_by.GP,
                                sliced:false,
                                selected:false
                            },
                            {
                                name:'DWSS',
                                y:operated_by.DWSS,
                                sliced:true,
                                selected:true
                            },
                            {
                                name:'GPWSC',
                                y:operated_by.GPWSC,
                                sliced:false,
                                selected:false
                            }
                        ]
                    }
                ]
            });
            //////////////////////////////////////////////////////////////
            return false;
        },
        chart2:function () {
            $('#report_schemes_operated_by_li').removeClass('active');
            $('#report_schemes_consumers_li').removeClass('active');
            $('#report_schemes_connection_type_li').removeClass('active');
            $('#report_schemes_consumers_li').addClass('active');
            //////////////////////////////////////////////////////////////

//            var consumers = _.countBy(schemes_data, function (scheme) {
//                return scheme.consumers;
//            });
            var consumers = _.countBy(schemes_data, function (scheme) {
                if(scheme.consumers >= 100) {
                    return "hundred_plus";
                } else if(scheme.consumers >= 50) {
                    return "fifty_to_99";
                } else if(scheme.consumers >= 10) {
                    return "ten_to_49";
                } else if(scheme.consumers >= 1) {
                    return "one_to_9";
                } else {
                    return "zero";
                }
                return "zero";
            });
            if (typeof consumers.hundred_plus === 'undefined') {
                consumers.hundred_plus = 0;
            }
            if (typeof consumers.fifty_to_99 === 'undefined') {
                consumers.fifty_to_99 = 0;
            }
            if (typeof consumers.ten_to_49 === 'undefined') {
                consumers.ten_to_49 = 0;
            }
            if (typeof consumers.one_to_9 === 'undefined') {
                consumers.one_to_9 = 0;
            }
            if (typeof consumers.zero === 'undefined') {
                consumers.zero = 0;
            }
            console.log(consumers);
            // we have 3 things in consumers
            var chart = new Highcharts.Chart({
                chart:{
                    renderTo:'main_reports_div',
                    plotBackgroundColor:null,
                    plotBorderWidth:null,
                    plotShadow:false
                },
                title:{
                    text:'# Of Consumers / Scheme'
                },
                tooltip:{
                    pointFormat:'{point.percentage}%',
                    percentageDecimals:2
                },
                plotOptions:{
                    pie:{
                        allowPointSelect:true,
                        cursor:'pointer',
                        dataLabels:{
                            enabled:true,
                            color:'#000000',
                            connectorColor:'#000000',
                            formatter:function () {
                                return '<b>' + this.point.name + '</b>';
                            }
                        }
                    }
                },
                series:[
                    {
                        type:'pie',
                        name:'Accounts',
                        data:[
                            {
                                name:'No Consumers',
                                balance:'',
                                y:consumers.zero,
                                sliced:true,
                                selected:true
                            },
                            {
                                name:'1 - 9 Consumers',
                                balance:'',
                                y:consumers.one_to_9,
                                sliced:false,
                                selected:false
                            },
                            {
                                name:'10 - 49 Consumers',
                                balance:'',
                                y:consumers.ten_to_49,
                                sliced:false,
                                selected:false
                            },
                            {
                                name:'50 - 99 Consumers',
                                balance:'',
                                y:consumers.fifty_to_99,
                                sliced:false,
                                selected:false
                            },
                            {
                                name:'100+ Consumers',
                                balance:'',
                                y:consumers.hundred_plus,
                                sliced:false,
                                selected:false
                            }
                        ]
                    }
                ]
            });
            //////////////////////////////////////////////////////////////
            return false;
        },
        chart3:function () {
            $('#report_schemes_operated_by_li').removeClass('active');
            $('#report_schemes_consumers_li').removeClass('active');
            $('#report_schemes_connection_type_li').removeClass('active');
            $('#report_schemes_connection_type_li').addClass('active');
            //////////////////////////////////////////////////////////////
            var scheme_type = _.countBy(schemes_data, function (scheme) {
                return scheme.type;
            });
            if (typeof scheme_type.TW === 'undefined') {
                scheme_type.TW = 0;
            }
            if (typeof scheme_type.HP === 'undefined') {
                scheme_type.HP = 0;
            }
            if (typeof scheme_type.CANAL === 'undefined') {
                scheme_type.CANAL = 0;
            }
            console.log(scheme_type);
            var chart = new Highcharts.Chart({
                chart:{
                    renderTo:'main_reports_div',
                    plotBackgroundColor:null,
                    plotBorderWidth:null,
                    plotShadow:false
                },
                title:{
                    text:'Schemes (Connection Type)'
                },
                tooltip:{
                    pointFormat:'{point.percentage}%',
                    percentageDecimals:2
                },
                plotOptions:{
                    pie:{
                        allowPointSelect:true,
                        cursor:'pointer',
                        dataLabels:{
                            enabled:true,
                            color:'#000000',
                            connectorColor:'#000000',
                            formatter:function () {
                                return '<b>' + this.point.name + '</b>';
                            }
                        }
                    }
                },
                series:[
                    {
                        type:'pie',
                        name:'Scheme Connection Types',
                        data:[
                            {
                                name:'CANAL',
                                y:scheme_type.CANAL,
                                sliced:false,
                                selected:false
                            },
                            {
                                name:'TW',
                                y:scheme_type.TW,
                                sliced:true,
                                selected:true
                            },
                            {
                                name:'HP',
                                y:scheme_type.HP,
                                sliced:false,
                                selected:false
                            }
                        ]
                    }
                ]
            });
            //////////////////////////////////////////////////////////////
            return false;
        },
        chart4:function () {
            $('#report_schemes_operated_by_li').removeClass('active');
            $('#report_schemes_consumers_li').removeClass('active');
            $('#report_schemes_connection_type_li').removeClass('active');
            $('#report_schemes_operational_status_li').removeClass('active');
            $('#report_schemes_operational_status_li').addClass('active');
            //////////////////////////////////////////////////////////////
            // types of statuses
            // OPERATIONAL
            // WORK IN PROGRESS
            // BORE FAIL

            var op_status = {};
            op_status.OPERATIONAL = 75;
            op_status.WIP = 20;
            op_status.BOREFAIL = 5;

            console.log(op_status);
            var chart = new Highcharts.Chart({
                chart:{
                    renderTo:'main_reports_div',
                    plotBackgroundColor:null,
                    plotBorderWidth:null,
                    plotShadow:false
                },
                title:{
                    text:'Schemes (Operational Status)'
                },
                tooltip:{
                    pointFormat:'{point.percentage}%',
                    percentageDecimals:2
                },
                plotOptions:{
                    pie:{
                        allowPointSelect:true,
                        cursor:'pointer',
                        dataLabels:{
                            enabled:true,
                            color:'#000000',
                            connectorColor:'#000000',
                            formatter:function () {
                                return '<b>' + this.point.name + '</b>';
                            }
                        }
                    }
                },
                series:[
                    {
                        type:'pie',
                        name:'Scheme Connection Types',
                        data:[
                            {
                                name:'Operational',
                                y:op_status.OPERATIONAL,
                                sliced:false,
                                selected:false
                            },
                            {
                                name:'Work in Progress',
                                y:op_status.WIP,
                                sliced:false,
                                selected:false
                            },
                            {
                                name:'Bore Fail',
                                y:op_status.BOREFAIL,
                                sliced:true,
                                selected:true
                            }
                        ]
                    }
                ]
            });
            //////////////////////////////////////////////////////////////
            return false;
        }
    });
    return aView;
});
