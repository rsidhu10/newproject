define([
    'models/subdivision',
    'backbone'
], function (Subdivision) {

    var SubdivisionCollection = Backbone.Collection.extend({
        model:Subdivision,
        comparator: function(item) {
            return item.get('name');
        },
        url:function () {
            return this.id ? '/subdivision/' + this.id : '/subdivision';
        }
    });

    return SubdivisionCollection;

});