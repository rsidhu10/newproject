define([
    'models/habitation',
    'backbone'
], function (Habitation) {

    var HabitationCollection = Backbone.Collection.extend({
        model:Habitation,
        comparator: function(item) {
            return item.get('name');
        },
        url:function () {
            return this.id ? '/habitation/' + this.id : '/habitation';
        }
    });

    return HabitationCollection;

});