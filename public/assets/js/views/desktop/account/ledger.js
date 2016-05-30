// from home/main.js
define([
    'text!templates/desktop/account/main.html',
    'text!templates/desktop/account/sidebar.html',
    'text!templates/desktop/account/ledger.html',
    'collections/subdivisions',
    'collections/blocks',
    'collections/panchayats',
    'collections/villages',
    'collections/habitations',
    'backbone'
], function (aTemplate, aSidebar, ledgerTemplate, SubDivisions, Blocks, Panchayats, Villages, Habitations) {

    var aView = Backbone.View.extend({
        initialize: function () {
            this.render();
            _.bindAll(this, 'render', 'TemplateClicked', 'KeyUpEvent', 'loadLedger', 'bindEvents', 'formatMoney', 'adv_search');
            _.bindAll(this, 'sd_reset', 'block_reset', 'panchayat_reset', 'village_reset', 'habitation_reset');
            _.bindAll(this, 'sdChanged', 'blockChanged', 'panchayatChanged', 'villageChanged');
            this.bindEvents();

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
        },
        bindEvents: function () {
            $('#input_account_num').keyup(this.KeyUpEvent);
            $('#adv_search_btn').click(this.adv_search);
            $('#subdivision_dd').change(this.sdChanged);
            $('#block_dd').change(this.blockChanged);
            $('#panchayat_dd').change(this.panchayatChanged);
            $('#village_dd').change(this.villageChanged);
        },
        sdChanged: function (e) {
            if ($(e.currentTarget).select2("val") != '') {
                this.block_collection.url = "/blocks/subdivision/" + $(e.currentTarget).select2("val");
                this.block_collection.fetch({reset: true});
            }
            $("#block_dd").select2('val', '');
            $("#panchayat_dd").select2('val', '');
            $("#village_dd").select2('val', '');
            $("#habitation_dd").select2('val', '');
        },
        blockChanged: function (e) {
            if ($(e.currentTarget).select2("val") != '') {
                this.panchayat_collection.url = "/panchayats/block/" + $(e.currentTarget).select2("val");
                this.panchayat_collection.fetch({reset: true});
            }
            $("#panchayat_dd").select2('val', '');
            $("#village_dd").select2('val', '');
            $("#habitation_dd").select2('val', '');
        },
        panchayatChanged: function (e) {
            if ($(e.currentTarget).select2("val") != '') {
                this.village_collection.url = "/villages/panchayat/" + $(e.currentTarget).select2("val");
                this.village_collection.fetch({reset: true});
            }
            $("#village_dd").select2('val', '');
            $("#habitation_dd").select2('val', '');
        },
        villageChanged: function (e) {
            if ($(e.currentTarget).select2("val") != '') {
                this.habitation_collection.url = "/habitations/village/" + $(e.currentTarget).select2("val");
                this.habitation_collection.fetch({reset: true});
            }
            $("#habitation_dd").select2('val', '');
        },
        sd_reset: function () {
            var sd_data = [];
            this.sd_collection.each(function (sd) {
                sd_data.push({id: sd.id, text: sd.get('name')});
            });
            $("#subdivision_dd").select2(
                {
                    placeholder: "Subdivisions",
                    allowClear: true,
                    data: sd_data,
                    initSelection: function (element, callback) {
                        var data = {id: element.val(), text: element.val()
                        };
                        callback(data);
                    }
                }
            );
            this.block_reset();
            this.panchayat_reset();
            this.village_reset();
            this.habitation_reset();
        },
        block_reset: function () {
            var block_data = [];
            this.block_collection.each(function (sd) {
                block_data.push({id: sd.id, text: sd.get('name')});
            });
            $("#block_dd").select2({ placeholder: "Blocks", allowClear: true, data: block_data,
                initSelection: function (element, callback) {
                    var data = {id: element.val(), text: element.val()
                    };
                    callback(data);
                } });
        },
        panchayat_reset: function () {
            var panchayat_data = [];
            this.panchayat_collection.each(function (sd) {
                panchayat_data.push({id: sd.id, text: sd.get('name')});
            });
            $("#panchayat_dd").select2({ placeholder: "Panchayats", allowClear: true, data: panchayat_data,
                initSelection: function (element, callback) {
                    var data = {id: element.val(), text: element.val()
                    };
                    callback(data);
                } });
        },
        village_reset: function () {
            var village_data = [];
            this.village_collection.each(function (sd) {
                village_data.push({id: sd.id, text: sd.get('name')});
            });
            $("#village_dd").select2({ placeholder: "Villages", allowClear: true, data: village_data,
                initSelection: function (element, callback) {
                    var data = {id: element.val(), text: element.val()
                    };
                    callback(data);
                } });
        },
        habitation_reset: function () {
            var habitation_data = [];
            this.habitation_collection.each(function (sd) {
                habitation_data.push({id: sd.id, text: sd.get('name')});
            });
            $("#habitation_dd").select2({ placeholder: "Habitations", allowClear: true, data: habitation_data,
                initSelection: function (element, callback) {
                    var data = {id: element.val(), text: element.val()
                    };
                    callback(data);
                } });
        },
        adv_search: function (e) {
            console.log('adv search, event:', e);

            var search_name = $("#search_name").val();
            var search_old_account_number = $("#search_old_account_number").val();
            var search_new_account_number = $("#search_new_account_number").val();
            var search_bill_number = $("#search_bill_number").val();

            var subdivision_dd = $("#subdivision_dd").select2('val');
            var block_dd = $("#block_dd").select2('val');
            var panchayat_dd = $("#panchayat_dd").select2('val');
            var village_dd = $("#village_dd").select2('val');
            var habitation_dd = $("#habitation_dd").select2('val');
            if(subdivision_dd == "") {
                block_dd = '';
                panchayat_dd = '';
                village_dd = '';
                habitation_dd = '';
            }
            if(block_dd == "") {
                panchayat_dd = '';
                village_dd = '';
                habitation_dd = '';
            }
            if(panchayat_dd == "") {
                village_dd = '';
                habitation_dd = '';
            }
            if(village_dd == "") {
                village_dd = '';
                habitation_dd = '';
            }

            var d = {
                model:{
                    name: search_name,
                    old_account_number:search_old_account_number,
                    new_account_number: search_new_account_number,
                    bill_number: search_bill_number,
                    subdivision_dd: subdivision_dd,
                    block_dd: block_dd,
                    panchayat_dd: panchayat_dd,
                    village_dd: village_dd,
                    habitation_dd: habitation_dd
                }
            };
            console.log('about to post to /accountsearch, model d: ', d);
            $.post("/accountsearch", d,
                function (data) {
                    console.log("Post Data: ", data);
                    console.log(data.result);
                    if (data.result == "ok") {
                        console.log('ok, we have search results', data);
                        var mySearchResultsCollection = data.collection;
//                        mainView.loadLedger();
//                        $("#account_fine_modal").modal('hide');

                        // we'll call it this way:
//                        var parent_model_id = this.options.parent_model_id;
                        require(['models/consumer', 'collections/consumers', 'views/desktop/account/results'], function (ConsumerModel, ConsumerCollection, CollectionView) {
//                            var myJSON = JSON.parse(mySearchResultsCollection);
                            var results = [];
                            _.each(mySearchResultsCollection,function(m) {
                                results.push(m);
                            });
                            var aCollection = new ConsumerCollection(results, { model: ConsumerModel});
                            console.log('results: ', results);
                            console.log('aCollection: ', aCollection);
//                            aCollection.url = '/consumers/habitation/' + parent_model_id;
                            var aCollectionView = new CollectionView({el:'#collection_div', 'collection':aCollection});
                            $("#advanced_search").collapse('hide');
                        });
                        ///
                    } else {
                        alert("Error: " + data.message);
                    }
                }
            );
            return false;
        },
        render: function () {
            $(this.options.main_el).html(_.template(aTemplate));
            $(this.options.sidebar_el).html(_.template(aSidebar));
            $("#input_account_num").select();
        },
        TemplateClicked: function (e) {
            e.stopPropagation();
            console.log('TemplateClicked!');
            return false;
        },
        formatMoney: function (n, decPlaces, thouSeparator, decSeparator) {
            decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces;
            decSeparator = decSeparator == undefined ? "." : decSeparator;
            thouSeparator = thouSeparator == undefined ? "," : thouSeparator;
            sign = n < 0 ? "-" : "+";
            i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "";
            j = (j = i.length) > 3 ? j % 3 : 0;
            return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
        },
        loadLedger: function () {
            var value = $("#input_account_num").val();
//            console.log('loadledger');
            var mainView = this;
//            require(['models/account'], function (accountModel) {
//                //debugger;
//                this.model = new accountModel();
//                this.model.url = "/account/" + value;
////                    this.model.set({ 'id':value });
//                this.model.fetch({
//                    error:function (m, r) {
//                        console.log("error, response: " + JSON.stringify(r));
//                        // remove the success classes and add error
//                        $("#ok_or_not_span").removeClass("badge-important");
//                        $("#ok_or_not_span").removeClass("badge-success");
//                        $("#ok_or_not_icon").removeClass("icon-ok");
//                        $("#ok_or_not_icon").removeClass("icon-remove");
//                        $("#ok_or_not_span").addClass("badge-important");
//                        $("#ok_or_not_icon").addClass("icon-remove");
//
//                        $("#account_info_div").html("Account not found.");
//                    },
//                    success:function (m, r) {
//
////                            console.log('Ok, account loaded, here it is:', m);
//                        // model loaded, now render it!
//                        // remove the error classes add success.
//                        $("#ok_or_not_span").removeClass("badge-important");
//                        $("#ok_or_not_span").removeClass("badge-success");
//                        $("#ok_or_not_icon").removeClass("icon-ok");
//                        $("#ok_or_not_icon").removeClass("icon-remove");
//                        $("#ok_or_not_span").addClass("badge-success");
//                        $("#ok_or_not_icon").addClass("icon-ok");
//
//                        $("#account_info_div").html("loaded!");
//
//
//                        var consumer = m.get('consumer');
//                        console.log('the account has been loaded');
//                        window.app_router.navigate("ledger/edit/" + value, {trigger: true});
//                    }
//                });
//            });
//
            window.app_router.navigate("ledger/edit/" + value, {trigger: true});
        },
        KeyUpEvent: function (e) {
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
//                $("#account_info_div").html("Invalid Account Number.");
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
