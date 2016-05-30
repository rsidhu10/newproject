define([
    'models/payment',
    'backbone'
], function (Payment) {

    var PaymentCollection = Backbone.Collection.extend({
        model:Payment,
        url:function () {
            return this.id ? '/payment/' + this.id : '/payment';
        },
        getLastPayment:function () {
            console.log('getLastPayment');
            var id = -1;
            this.each(function (payment) {
                var new_id = parseInt(payment.id);
                if(new_id > id) {
                    id = new_id;
                    console.log(id + ' ');
                }
            });
            if(id > -1) {
//                console.log('LAST PAYMENT: ', this.get(id));
                console.log('Returning ' + id);
                return this.get(id);
            } else {
//                console.log('LAST PAYMENT: NOTHING FOUND');
                console.log('Returning false');
                return false;
            }
        }
    });

    return PaymentCollection;

});