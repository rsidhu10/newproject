define([
    'models/district',
    'backbone'
], function (District) {

    var DistrictCollection = Backbone.Collection.extend({
        model:District,
        comparator: function(item) {
            return item.get('name');
        },
        url:function () {
            return this.id ? '/district/' + this.id : '/district';
        }
    });

    return DistrictCollection;

});