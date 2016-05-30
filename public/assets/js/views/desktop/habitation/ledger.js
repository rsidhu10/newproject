define([
    'text!templates/desktop/habitation/ledger.html',
    'text!templates/desktop/habitation/ledger_transaction_model.html',
    'text!templates/desktop/data/sidebar.html',
    'text!templates/desktop/account/sidebar.html',
    'models/habitation',
    'models/habitationtransaction',
    'collections/habitationtransactions',
    'text!templates/desktop/habitation/ledger_transaction_modal_template.html',
    'text!templates/desktop/habitation/ledger_transaction_hover_revenue.html',
    'backbone',
    'backbone.bootstrap-modal'
], function (
        ledgerTemplate,
        modelTemplate,
        aSidebarAdmin,
        aSidebarUser,
        habitation,
        habitationtransaction,
        habitationtransactions,
        hoverModalTemplate,
        hoverModalRevenueContent
    ) {

    /////////////////////////////////////////////////////////////

    var TemplatesCollectionView = Backbone.View.extend({
        events: {
//            "click #details_toggle_btn": 'details_toggle'
        },
        initialize:function () {
            console.log('collection view');
            _.bindAll(this, 'render', 'addAll', 'addOne');
            this.collection = new habitationtransactions();
            this.collection.url = "/habitations/transactions/" + this.options.habitation_id;
            this.collection.bind('add', this.addOne);
            this.collection.bind('reset', this.addAll);

            this.collection.fetch({
                reset: true,
                error:function (model, response) {
                    console.log("error, response: " + JSON.stringify(response));
                },
                success:function (model, response) {
                    console.log("success! # of Templates: " + model.length);
                }
            });
        },
        render: function() {
            console.log('render, doing nothing');
        },
        addAll: function() {
            console.log('add all!');
            $(this.options.el).find("tr:gt(0)").remove();
            this.collection.each(this.addOne);
        },
        addOne: function(aModel) {
            var view = new TemplateModelView({model:aModel});
            var tbody = this.options.el + ' tbody';
            $(tbody).last().append(view.render().el);
        }
    });

    var TemplateModelView = Backbone.View.extend({
        tagName:'tr',
        detail_el:'',
        template:_.template(modelTemplate),
//        modal_template:_.template(myModalTemplate),
        //className:'alert-message warning',
        timer:'',
        events:{
            "click":'modelClicked'
        },
        initialize:function () {
            _.bindAll(this, 'render', 'remove', 'modelClicked');
//            console.log('initialize model: ', this.model.toJSON());
            details_template = _.template(hoverModalRevenueContent);
            var type = this.model.get('type');
            if(type == 1) {
                this.model.set('type_text', 'Expense');
            } else if(type == 2) {
                this.model.set('type_text', 'Revenue');
            } else if(type == 3) {
                this.model.set('type_text', 'Revenue');
            } else {
                this.model.set('type_text', 'Other');
            }

            if(this.model.get('credit_amount') == 0) {
                this.model.set('credit_amount', '');
            }
            if(this.model.get('debit_amount') == 0) {
                this.model.set('debit_amount', '');
            }

            options = {
                'animation':true,
                'html':true,
                'title':'Transaction Details',
                'content':details_template(this.model.toJSON()),
                'placement':'bottom',
                'trigger':'hover',
                'template':hoverModalTemplate,
                delay:{ show:1100, hide:1000 }
            };
            $(this.el).popover(options);
//            $(this.el).html(this.template(this.model.toJSON()));
//            return this;
        },
        render: function() {
//            console.log('render model: ', this.model.toJSON());
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        },
        remove: function() {},
        modelClicked: function(e) {}
    });

    var aView = Backbone.View.extend({
        template: _.template(ledgerTemplate),
        initialize: function () {
            _.bindAll(this, 'renderModel');
            _.bindAll(this, 'addTransaction');
            _.bindAll(this, 'saveTransaction');
            _.bindAll(this, 'loadHabitation');

            if(this.options.group == 100) {
                $(this.options.sidebar_el).html(_.template(aSidebarAdmin));
            } else {
                $(this.options.sidebar_el).html(_.template(aSidebarUser));
            }

            this.loadHabitation();
        },
        loadHabitation: function() {
            this.model = new habitation;
            this.model.set('id', this.options.parent_model_id);
            this.model.bind('change', this.renderModel);
            this.model.fetch({
                error: function (model, response) {
                    console.log("error, response: " + JSON.stringify(response));
                },
                success: function (model, response) {
                    console.log('success model: ', model.toJSON());
                }
            });
        },
        addTransaction: function() {
            console.log('add transaction');
//            require(['text!templates/desktop/habitation/ledger_new_transaction_modal.html'], function (modalTemplate) {
//                var m = $(document.createElement('div')).html(modalTemplate);
//
//                m.modal();
//                $("#transaction_modal_save").unbind('click');
//                $("#transaction_modal_save").bind('click', this.saveTransaction);
//            });

            $("#habitation_ledger_add_transaction_modal").modal();
            $("#transaction_modal_save").unbind('click');
            $("#transaction_modal_save").bind('click', this.saveTransaction);
            $("#transaction_date").datepicker('hide');
            return false;
        },
        saveTransaction: function() {
            var self = this;
            console.log('save transaction');
            var newTransaction = new habitationtransaction();
            var type = $("#transaction_type").val();
            var name = $("#transaction_name").val();
            var date = $("#transaction_date").val();
            var amount = $("#transaction_amount").val();
            var notes = $("#transaction_notes").val();
            var habitation_id = this.model.id;
            newTransaction.set({
                'type':type,
                'name':name,
                'date':date,
                'amount':amount,
                'notes':notes,
                'habitation_id': habitation_id
            });

            newTransaction.save({}, {
                error: function (m, r) {
                    var msg = r.responseText;
                    var retCode = r.status;
                    if(retCode == 401) {
                        $("#habitation_ledger_add_transaction_modal_body").html('<span style="color: red;">Access Denied!</span>');
                        $("#habitation_ledger_add_transaction_modal_footer").html('<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>');
                    } else {
                        $("#habitation_ledger_add_transaction_modal_body").html('<span style="color: red;">Oops!</span> An error occured while saving the new transaction.');
                        $("#habitation_ledger_add_transaction_modal_footer").html('<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>');
                    }
                },
                success: function (m, r) {
                    console.log("success, response: " + JSON.stringify(r));
                    console.log('model saved, model: ', m);

                    $("#habitation_ledger_add_transaction_modal").modal('hide');
                    $("#habitation_ledger_add_transaction_modal_success").modal('show');

                },
                wait: true
            });
        },
        renderModel: function() {
            var habitation_id = this.options.parent_model_id;
            console.log('renderModel model: ', this.model.toJSON());
            $(this.options.main_el).html(this.template(this.model.toJSON()));

            var transactions = new TemplatesCollectionView({
                el: '#collection_data_table',
                'habitation_id': habitation_id
            });
            $("#habitation_new_transaction").bind('click', this.addTransaction);

            var self = this;
            $('#habitation_ledger_add_transaction_modal_success').on('hidden', function () {
                console.log('hiding success modal');
                self.model.fetch({reset:true});
                self.loadHabitation();
            })
        }
    });

    return aView;
});
