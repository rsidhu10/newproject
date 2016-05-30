// from home/main.js
define([
    'text!templates/desktop/account/main.html',
    'text!templates/desktop/account/sidebar.html',
    'text!templates/desktop/account/ledger.html',
    'backbone'
], function (aTemplate, aSidebar, ledgerTemplate) {

    var aView = Backbone.View.extend({
        initialize:function () {
            this.render();
            _.bindAll(this, 'render', 'TemplateClicked', 'KeyUpEvent','loadLedger','bindEvents','formatMoney');
            this.bindEvents();
        },
        bindEvents:function () {
            $('#input_account_num').keyup(this.KeyUpEvent);
        },
        render:function () {
            $(this.options.main_el).html(_.template(aTemplate));
            $(this.options.sidebar_el).html(_.template(aSidebar));
            $("#input_account_num").select();
        },
        TemplateClicked:function (e) {
            e.stopPropagation();
            console.log('TemplateClicked!');
            return false;
        },
        formatMoney: function(n, decPlaces, thouSeparator, decSeparator) {
//            var n = this,
            decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces;
            decSeparator = decSeparator == undefined ? "." : decSeparator;
            thouSeparator = thouSeparator == undefined ? "," : thouSeparator;
            sign = n < 0 ? "-" : "+";
            i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "";
            j = (j = i.length) > 3 ? j % 3 : 0;
            return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
        },
        loadLedger:function () {
            var value = $("#input_account_num").val();
//            console.log('loadledger');
            var mainView = this;
            require(['models/account'], function (accountModel) {
                //debugger;
                this.model = new accountModel();
                this.model.url = "/account/" + value;
//                    this.model.set({ 'id':value });
                this.model.fetch({
                    error:function (m, r) {
                        console.log("error, response: " + JSON.stringify(r));
                        // remove the success classes and add error
                        $("#ok_or_not_span").removeClass("badge-important");
                        $("#ok_or_not_span").removeClass("badge-success");
                        $("#ok_or_not_icon").removeClass("icon-ok");
                        $("#ok_or_not_icon").removeClass("icon-remove");
                        $("#ok_or_not_span").addClass("badge-important");
                        $("#ok_or_not_icon").addClass("icon-remove");

                        $("#account_info_div").html("Account not found.");
                    },
                    success:function (m, r) {

//                            console.log('Ok, account loaded, here it is:', m);
                        // model loaded, now render it!
                        // remove the error classes add success.
                        $("#ok_or_not_span").removeClass("badge-important");
                        $("#ok_or_not_span").removeClass("badge-success");
                        $("#ok_or_not_icon").removeClass("icon-ok");
                        $("#ok_or_not_icon").removeClass("icon-remove");
                        $("#ok_or_not_span").addClass("badge-success");
                        $("#ok_or_not_icon").addClass("icon-ok");

                        $("#account_info_div").html("loaded!");


                        var consumer = m.get('consumer');
//                        console.log('consumer:',consumer);
                        if(consumer.balance > 0) {
                            this.model.set('balance_color', "red");
                        } else {
                            this.model.set('balance_color', "green");
                        }
                        this.model.set('balance_formatted', mainView.formatMoney(consumer.balance,2,',','.'));

                        var deleted = consumer.deleted;
                        var disconnection_status = consumer.disconnection_status;

                        if (deleted == "1") {
                            this.model.set('div_alert', '<span class="badge badge-important label-important pull-left" style="margin-top: 20px; padding: 10px;">Account Deleted!</span>');
//                                this.model.set('div_class','alert alert-error');
                            this.model.set('div_style', 'background-color: #BBBBBB;');
                        } else if (disconnection_status == "1") {
                            this.model.set('div_alert', '<span class="badge badge-warning pull-left" style="margin-top: 20px; padding: 10px;">Account Disconnected!</span>');
//                                this.model.set('div_class','alert');
                            this.model.set('div_style', 'background-color: #fbd69b;');
                        } else {
                            this.model.set('div_alert', '');
//                                this.model.set('div_class','alert alert-info');
                            this.model.set('div_alert', '<span class="badge badge-success pull-left" style="margin-top: 20px; padding: 10px;">Account Active</span>');
                            this.model.set('div_style', 'background-color: #9cc1fd;');
                        }
                        // this temlate should define the structure of what the ledger should look like..
                        var myTemplate = _.template(ledgerTemplate);
                        $("#account_info_div").html(myTemplate(this.model.toJSON()));


                        var bills = consumer.bills;
                        var payments = consumer.payments;
//
//                            var mysqlTimeStampToDate = function (timestamp) {
//                                            //function parses mysql datetime string and returns javascript Date object
//                                //input has to be in this format: 2007-06-05 15:26:02
//                                var regex = /^([0-9]{2,4})-([0-1][0-9])-([0-3][0-9]) (?:([0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?$/;
//                                var parts = timestamp.replace(regex, "$1 $2 $3 $4 $5 $6").split(' ');
//                                return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
//                            };

                        console.log('requiring old ledger! this should be removed!');
                        require(['models/ledger', 'collections/ledgers', 'views/desktop/account/oldledger'], function (ledgerModel, ledgerCollection, aCollectionView) {

                            var myCollectionView = new aCollectionView({el:'#ledger_table', mainView: mainView,'consumer':consumer, 'bills':bills, 'payments':payments});
//
//                                var myCollectionView = new aCollectionView({el:'#ledger_table', 'collection':myCollection});
//                                myCollectionView.addAll();
                        });
                    }
                });
            });
        },
        KeyUpEvent:function (e) {
            e.stopPropagation();
            var value = parseInt($(e.target).val());
            if (isNaN(value)) {
                value = "";
            }
            $(e.target).val(value);
            if (value < 7654321) {
                $("#ok_or_not_span").removeClass("badge-important");
                $("#ok_or_not_span").removeClass("badge-success");
                $("#ok_or_not_icon").removeClass("icon-ok");
                $("#ok_or_not_icon").removeClass("icon-remove");
                $("#ok_or_not_span").addClass("badge-important");
                $("#ok_or_not_icon").addClass("icon-remove");
                $("#account_info_div").html("Invalid Account Number.");
                return false;
            } // if (value >= 7654321) {
            else {
                this.loadLedger();
            }
            return false;
        }

    });
    return aView;
});
