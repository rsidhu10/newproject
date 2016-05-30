define([
    'collections/auditlogs',
    'backbone',
    'backgrid-text-cell'
], function (Collection) {
    var TemplatesCollectionView = Backbone.View.extend({
        initialize: function () {
            _.bindAll(this, 'test');
            this.collection = new Collection();

            var ShowCell = Backgrid.Cell.extend({
//                template: _.template(" PUT YOUR HTML BUTTON TEMPLATE HERE "),
                events: {
                    "click": "show",
                  "mouseenter": "show"
                },
                show: function (e) {
                  e.preventDefault();
//                    console.log('show, model: ', this.model.get('message_public'));
                },
                render: function () {
                  this.$el.html(this.model.get('message_public'));
//                  this.delegateEvents();
//                    options = {
//                        'animation':true,
//                        'html':true,
//                        'title':'Details',
//                        'content':this.model.get('message_public'),
//                        'placement':'top',
//                        'trigger':'hover',
//                        'template':'',
//                        delay:{ show:1100, hide:1000 }
//                    };
//                    $(this.el).popover(options);
                    return this;
                }
            });

            var columns = [
                {
                    name: "int_id",
                    label: "ID",
                    editable: false,
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ''
                    })
                },
                {
                    name: "datetime",
                    label: "Date",
                    editable: false,
                    cell: "datetime"
                },
                {
                    name: "activity_type",
                    label: "Type",
                    editable: false,
                    cell: "string"
                },
                {
                    name: "username",
                    label: "User",
                    editable: false,
                    cell: "string"
                },
                {
                    name: "message_public",
                    label: "Details",
                    cell: "text"
                }
            ];

            var grid = new Backgrid.Grid({
              columns: columns,
              collection: this.collection
            });

            $("#auditlog_backgrid").append(grid.render().$el);

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

        },
        test: function() {
            console.log('test stub');
        }
    });

    return TemplatesCollectionView;
});
