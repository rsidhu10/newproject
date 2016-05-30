define([
    'models/division',
    'backbone'
], function (Division) {

    var DivisionCollection = Backbone.Collection.extend({
        model:Division,
        comparator: function(item) {
            return item.get('name');
        },
        url:function () {
            return this.id ? '/division/' + this.id : '/division';
        }
    });

    return DivisionCollection;

});