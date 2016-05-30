define([
    '/jsdata/payments',
    'text!templates/desktop/reports/payments_report.html',
    'text!templates/desktop/reports/sidebar.html',
    'highcharts'
], function (payments, aTemplate, aSidebar) {
    var aView = Backbone.View.extend({
        events: {
            "click #report_payments_ppd" : "chart1",
            "click #report_payments_amount" : "chart2"
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
            $('#report_payments_amount_li').removeClass('active');
            $('#report_payments_ppd_li').removeClass('active');
            $('#report_payments_ppd_li').addClass('active');
            var chart = new Highcharts.Chart({
                chart:{
                    renderTo:'main_reports_div',
                    type:'spline'
                },
                title:{
                    text:'Payments Per Day'
                },
                subtitle:{
                    text:'The number of payments recorded per day'
                },
                xAxis:{
                    type:'datetime',
                    dateTimeLabelFormats: {
                                    day: '%e of %b'
                                }
                },
                yAxis:{
                    title:{
                        text:'Number of payments'
                    },
                    min:0
                },
                tooltip:{
                    formatter:function () {
                        return '<b>' + this.series.name + '</b><br/>' +
                            Highcharts.dateFormat('%e. %b', this.x) + ': ' + this.y + ' m';
                    }
                },

                series:[
                    {
                        name:'# of Payments',
                        // Define the data points. All series have a dummy year
                        // of 1970/71 in order to be compared on the same x axis. Note
                        // that in JavaScript, months start at 0 for January, 1 for February etc.
                        data: payments.num_payments_per_day
                    }
                ]
            });
            return false;
        },
        chart2:function () {
            $('#report_payments_amount_li').removeClass('active');
            $('#report_payments_ppd_li').removeClass('active');
            $('#report_payments_amount_li').addClass('active');
            var chart = new Highcharts.Chart({
                chart:{
                    renderTo:'main_reports_div',
                    type:'spline'
                },
                title:{
                    text:'Amount Collected'
                },
                subtitle:{
                    text:'Amount collected per day'
                },
                xAxis:{
                    type:'datetime',
                    dateTimeLabelFormats:{ // don't display the dummy year
                        month:'%e. %b',
                        year:'%b'
                    }
                },
                yAxis:{
                    title:{
                        text:'Amount Collected'
                    },
                    min:0
                },
                tooltip:{
                    formatter:function () {
                        return '<b>' + this.series.name + '</b><br/>' +
                            Highcharts.dateFormat('%e. %b', this.x) + ': ' + this.y + ' m';
                    }
                },

                series:[
                    {
                        name:'Amount',
                        // Define the data points. All series have a dummy year
                        // of 1970/71 in order to be compared on the same x axis. Note
                        // that in JavaScript, months start at 0 for January, 1 for February etc.
                        data: payments.daily_payment_amounts
                    }
                ]
            });
            return false;
        }
    });
    return aView;
});
