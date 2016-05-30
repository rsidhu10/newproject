<?php        scheme_reset:function () {
//            console.log('scheme_reset');
            var dd_array = [];
            this.schemes.each(function (aModel) {
                dd_array.push({id:aModel.id, text:aModel.get('name')});
            });
            $("#input_scheme_dd").select2(
                {
                    placeholder:"Schemes",
                    data:dd_array,
                    multiple:false,
                    initSelection:function (element, callback) {
                        for (current in dd_array) {
                            if (dd_array[current]['id'] == element.val()) {
                                callback({id:dd_array[current]['id'], text:dd_array[current]['text']});
                                break;
                            }
                        }
                    }
                });

            var scheme_id = this.consumer.get('scheme_id');
//            console.log('scheme_id', scheme_id);
            $("#input_scheme_dd").select2("val", scheme_id);
            $("#input_scheme_dd").bind('change', this.scheme_changed);
        },
        scheme_changed:function (e) {
            console.log('scheme_changed');

            var a = $(e.currentTarget).select2("val");
            this.habitations = new BlockCollection();
            this.habitations.url = "/habitations/scheme/" + $(e.currentTarget).select2("val");
            this.habitations.bind('reset', this.habitation_reset);
            this.habitations.fetch({reset: true});

            $("#input_village").val('');
            $("#input_panchayat").val('');
            $("#input_block").val('');
            $("#input_subdivision").val('');
        },
//        subdivisions_reset:function () {
////            console.log('subdivisions_reset');
//            var dd_array = [];
//            this.subdivisions.each(function (aModel) {
//                dd_array.push({id:aModel.id, text:aModel.get('name')});
//            });
//            $("#input_subdivision_dd").select2({ placeholder:"Subdivisions", data:dd_array, multiple:false });
//            $("#input_subdivision_dd").bind('change', this.subdivision_changed);
//        },
//        subdivision_changed:function (e) {
////            console.log('subdivision_changed');
//            var a = $(e.currentTarget).select2("val");
//            this.blocks = new BlockCollection();
//            this.blocks.url = "/blocks/subdivision/" + $(e.currentTarget).select2("val");
//            this.blocks.bind('reset', this.blocks_reset);
//            this.blocks.fetch();
//        },
//        blocks_reset:function () {
////            console.log('blocks_reset');
//            var dd_array = [];
//            this.blocks.each(function (aModel) {
//                dd_array.push({id:aModel.id, text:aModel.get('name')});
//            });
//            $("#input_block_dd").select2({ placeholder:"Blocks", data:dd_array, multiple:false });
//            $("#input_block_dd").bind('change', this.block_changed);
//        },
//        block_changed:function (e) {
////            console.log('block_changed');
//            var a = $(e.currentTarget).select2("val");
//            this.panchayats = new PanchayatCollection();
//            this.panchayats.url = "/panchayats/block/" + $(e.currentTarget).select2("val");
//            this.panchayats.bind('reset', this.panchayat_reset);
//            this.panchayats.fetch();
//        },
//        panchayat_reset:function () {
////            console.log('panchayat_reset');
//            var dd_array = [];
//            this.panchayats.each(function (aModel) {
//                dd_array.push({id:aModel.id, text:aModel.get('name')});
//            });
//            $("#input_panchayat_dd").select2({ placeholder:"Panchayats", data:dd_array, multiple:false });
//            $("#input_panchayat_dd").bind('change', this.panchayat_changed);
//        },
//        panchayat_changed:function (e) {
////            console.log('panchayat_changed');
//            var a = $(e.currentTarget).select2("val");
//            this.villages = new VillageCollection();
//            this.villages.url = "/villages/panchayat/" + $(e.currentTarget).select2("val");
//            this.villages.bind('reset', this.village_reset);
//            this.villages.fetch();
//        },
//        village_reset:function () {
////            console.log('village_reset');
//            var dd_array = [];
//            this.villages.each(function (aModel) {
//                dd_array.push({id:aModel.id, text:aModel.get('name')});
//            });
//            $("#input_village_dd").select2({ placeholder:"Villages", data:dd_array, multiple:false });
//            $("#input_village_dd").bind('change', this.village_changed);
//        },
//        village_changed:function (e) {
////            console.log('village_changed');
//            var a = $(e.currentTarget).select2("val");
//            this.habitations = new HabitationCollection();
//            this.habitations.url = "/habitations/village/" + $(e.currentTarget).select2("val");
//            this.habitations.bind('reset', this.habitation_reset);
//            this.habitations.fetch();
//        },
        habitation_reset:function () {
//            console.log('habitation_reset');
            var dd_array = [];
            this.habitations.each(function (aModel) {
                dd_array.push({id:aModel.id, text:aModel.get('name')});
            });
            $("#input_habitation_dd").select2({ placeholder:"Habitations", data:dd_array, multiple:false });
            $("#input_habitation_dd").bind('change', this.habitation_changed);
        },
        habitation_changed:function (e) {
            console.log('habitation_changed');
            this.habitation = new HabitationModel();
            this.habitation.url = "/habitation/" + $(e.currentTarget).select2("val");
            this.habitation.bind('change', this.habitation_loaded);
            this.habitation.fetch();
        },
?>