define([
    'models/habitationtransaction',
    'backbone'
], function (Habitationtransaction) {

    var HabitationtransactionCollection = Backbone.Collection.extend({
        model:Habitationtransaction,
        url:function () {
            return this.id ? '/habitationtransactions/' + this.id : '/habitationtransactions';
        }
    });

    return HabitationtransactionCollection;

});