define([
    'models/circle',
    'backbone'
], function (Circle) {

    var CircleCollection = Backbone.Collection.extend({
        model:Circle,
        comparator: function(item) {
            return item.get('name');
        },
        url:function () {
            return this.id ? '/circle/' + this.id : '/circle/all';
        }
    });

    return CircleCollection;

});