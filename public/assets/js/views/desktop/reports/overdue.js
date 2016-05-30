define([
    'text!templates/desktop/reports/overdue_report.html',
    'text!templates/desktop/reports/sidebar.html',
    'collections/subdivisions',
    'collections/blocks',
    'collections/panchayats',
    'collections/villages',
    'collections/habitations',
    'collections/consumers',
    'views/desktop/reports/overdue_list',
    'highcharts'
], function (aTemplate, aSidebar, SubDivisions, Blocks, Panchayats, Villages, Habitations, Consumers, ConsumerListView) {
    var aView = Backbone.View.extend({
        events:{
//            "click #report_payments_ppd":"chart1",
            "click #update_payments2_report_btn":"update_report",
            "click #update_payments2_report_btn_download":"download_report",
            "change #payments2_subdivision_dd":"sdChanged",
            "change #payments2_block_dd":"blockChanged",
            "change #payments2_panchayat_dd":"panchayatChanged",
            "change #payments2_village_dd":"villageChanged"
        },
        initialize:function () {
            this.render();
            _.bindAll(this, 'render');
            _.bindAll(this, 'sd_reset', 'block_reset', 'panchayat_reset', 'village_reset', 'habitation_reset');
            _.bindAll(this, 'sdChanged', 'blockChanged', 'panchayatChanged', 'villageChanged', "download_report", "update_report");

//            $("#filter_from_date").datepicker().on('changeDate', function (ev) {
//                $("#filter_from_date").datepicker('hide');
//            });
//            $("#filter_to_date").datepicker().on('changeDate', function (ev) {
//                $("#filter_to_date").datepicker('hide');
//            });

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
        sdChanged:function (e) {
            var a = $(e.currentTarget).select2("val");
            if (a != 0) {
                this.block_collection.url = "/blocks/subdivision/" + $(e.currentTarget).select2("val");
                this.block_collection.fetch({reset: true});
            } else {
                $("#payments2_block_dd").select2({data:{}});
                $("#payments2_panchayat_dd").select2({data:{}});
                $("#payments2_village_dd").select2({data:{}});
                $("#payments2_habitation_dd").select2({data:{}});
            }
        },
        blockChanged:function (e) {
            var a = $(e.currentTarget).select2("val");
            if (a != 0) {
                this.panchayat_collection.url = "/panchayats/block/" + $(e.currentTarget).select2("val");
                this.panchayat_collection.fetch({reset: true});
            } else {
                $("#payments2_panchayat_dd").select2({data:{}});
                $("#payments2_village_dd").select2({data:{}});
                $("#payments2_habitation_dd").select2({data:{}});
            }
        },
        panchayatChanged:function (e) {
            var a = $(e.currentTarget).select2("val");
            if (a != 0) {
                this.village_collection.url = "/villages/panchayat/" + $(e.currentTarget).select2("val");
                this.village_collection.fetch({reset: true});
            } else {
                $("#payments2_village_dd").select2({data:{}});
                $("#payments2_habitation_dd").select2({data:{}});
            }
        },
        villageChanged:function (e) {
            var a = $(e.currentTarget).select2("val");
            if (a != 0) {
                this.habitation_collection.url = "/habitations/village/" + $(e.currentTarget).select2("val");
                this.habitation_collection.fetch({reset: true});
            } else {
                $("#payments2_habitation_dd").select2({data:{}});
            }
        },
        sd_reset:function () {
            var sd_data = [];
            sd_data.push({id:0, text:'All Subdivisions'});
            this.sd_collection.each(function (sd) {
                sd_data.push({id:sd.id, text:sd.get('name')});
            });
            $("#payments2_subdivision_dd").select2({ placeholder:"Subdivisions", data:sd_data });
        },
        block_reset:function () {
            var block_data = [];
            block_data.push({id:0, text:'All Blocks'});
            this.block_collection.each(function (sd) {
                block_data.push({id:sd.id, text:sd.get('name')});
            });
            $("#payments2_block_dd").select2({ placeholder:"Blocks", data:block_data });
        },
        panchayat_reset:function () {
            var panchayat_data = [];
            panchayat_data.push({id:0, text:'All Panchayats'});
            this.panchayat_collection.each(function (sd) {
                panchayat_data.push({id:sd.id, text:sd.get('name')});
            });
            $("#payments2_panchayat_dd").select2({ placeholder:"Panchayats", data:panchayat_data });
        },
        village_reset:function () {
            var village_data = [];
            village_data.push({id:0, text:'All Villages'});
            this.village_collection.each(function (sd) {
                village_data.push({id:sd.id, text:sd.get('name')});
            });
            $("#payments2_village_dd").select2({ placeholder:"Villages", data:village_data });
        },
        habitation_reset:function () {
            var habitation_data = [];
            habitation_data.push({id:0, text:'All Habitations'});
            this.habitation_collection.each(function (sd) {
                habitation_data.push({id:sd.id, text:sd.get('name')});
            });
            $("#payments2_habitation_dd").select2({ placeholder:"Habitations", data:habitation_data });
        },
        render:function () {
            var now = new Date();
            var last_month = new Date();
            last_month.setDate(now.getDate() - 30);
//            var filter_from_date = last_month.getDate() + "-" + (last_month.getMonth() + 1) + "-" + last_month.getFullYear();
//            var filter_to_date = now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear();
            var template_data = {filter_from_date:'', filter_to_date:''};
            myTemplate = _.template(aTemplate);
            $(this.el).html(_.template(myTemplate(template_data)));
            $(this.options.sidebar_el).html(_.template(aSidebar));

            this.ConsumerCollection = new Consumers();
            this.ConsumerCollectionView = new ConsumerListView({el:'#collection_div', 'collection':this.ConsumerCollection});
            //this.chart1();
        },
        download_report:function () {
            $("#update_payments2_report_btn_download").button('loading');
            //            var search_by = $("#payments2_search_by .active").data("value");
            var from_amount = parseInt($('#filter_from_amount').val());
            var to_amount = parseInt($('#filter_to_amount').val());

            var subdivision = "";
            var block = "";
            var panchayat = "";
            var village = "";
            var habitation = "";

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

            var d = {
                model:{
                    min:from_amount,
                    max:to_amount,
                    subdivision:subdivision,
                    block:block,
                    panchayat:panchayat,
                    village:village,
                    habitation:habitation,
                    csv:true
                }
            };

            console.log('about to post this for download:', d);

//            $.post('/create_binary_file.php', postData, function (retData) {
//                $("body").append("<iframe src='" + retData.url;
//                +"' style='display: none;' ></iframe>"
//                )
//                ;
//            });


//            var myCollection = this.ConsumerCollection;
            $.post("/reports/overdue", d,
                function (data) {
                    console.log("Ok, download should have started!: ", data);
//                    window.open(data);
//                    myCollection.reset(data);
                    $("#update_payments2_report_btn_download").button('reset');
                    $("body").append("<iframe src='" + data.url +"' style='display: none;' ></iframe>");
                }
            );

        },
        update_report:function (download) {
//            console.log('ok, posting data to our controller');
            $("#update_payments2_report_btn").button('loading');
//            var search_by = $("#payments2_search_by .active").data("value");
            var from_amount = parseInt($('#filter_from_amount').val());
            var to_amount = parseInt($('#filter_to_amount').val());

            var subdivision = "";
            var block = "";
            var panchayat = "";
            var village = "";
            var habitation = "";

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


            var d = {
                model:{
                    min:from_amount,
                    max:to_amount,
                    subdivision:subdivision,
                    block:block,
                    panchayat:panchayat,
                    village:village,
                    habitation:habitation,
                    csv:false
                }
            };

            console.log('about to post this:', d);

            var myCollection = this.ConsumerCollection;
            $.post("/reports/overdue", d,
                function (data) {
//                    console.log("Post Data: ", data);
                    myCollection.reset(data.data);
                    $("#total_amount").html("Total Amount: &#8377; " + data.total_amount);
                    $("#update_payments2_report_btn").button('reset');
                }
            );

//            require(['collections/consumers', 'views/desktop/reports/overdue_list'], function (aCollection, aCollectionView) {
//                var myCollection = new aCollection;
//                var myCollectionView = new aCollectionView({el:'#collection_div', 'collection':myCollection});
//            });

//            console.log('FROM: ' + from_date);
//            console.log('TO: ' + to_date);

//            var d = {
//                model:
//                {
//                    search_by:search_by,
//                    from_date:from_date,
//                    to_date:to_date,
//                    subdivision:subdivision,
//                    block:block,
//                    panchayat:panchayat,
//                    village:village,
//                    habitation:habitation
//                }
//            };
//            console.log('d',d);
//            $.post("/reports/payments2", d,
//                function (data) {
//                    console.log("Data Loaded: ", data);
//                    $("#payments2_schemes").html(data.schemes);
//                    $("#payments2_habitations").html(data.habitations);
//                    $("#payments2_amount").html(data.amount);
//                    $("#payments2_payments").html(data.payments);
//                    $("#update_payments2_report_btn").button('reset');
//                });
        }
    });
    return aView;
});
