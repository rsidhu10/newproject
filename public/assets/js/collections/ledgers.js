define([
    'models/ledger',
    'backbone'
], function (Ledger) {

    var LedgerCollection = Backbone.Collection.extend({
        model: Ledger,
        comparator: function(item) {

//            console.log('tx: ', item);
            if((item.get('type').toLowerCase() == "bill") && (item.get('processed').toLowerCase() == "0")) {
                console.log('tx_id: ', item.get('tx_id'));
                return -99999999999;
            } else {
                console.log('tx_id: ', item.get('tx_id'));
                return item.get('tx_id') * -1;
            }
        },
        comparator_old: function (Model1, Model2) {

            var return_value = 0;

            var m1_id = Model1.get("id").toLowerCase();
            var m2_id = Model2.get("id").toLowerCase();
            var m1_created_at = parseInt(Model1.get("created_at_sort"));
            var m2_created_at = parseInt(Model2.get("created_at_sort"));
            var m1_type = Model1.get("type").toLowerCase();
            var m2_type = Model2.get("type").toLowerCase();

//            console.log('Comparing M1: ' + m1_type + " id: " + m1_id + " created_at: " + parseInt(Model1.get("created_at")).toString(), Model1);
//            console.log('Comparing M2: ' + m2_type + " id: " + m2_id + " created_at: " + parseInt(Model2.get("created_at")).toString(), Model2);
            if (m1_created_at > m2_created_at) {
                return_value = -1;
            } else if (m1_created_at < m2_created_at) {
//                return 1;
                return_value = 1;
            } else {
                // created_at is the same for both records.
//                console.log('created_at is same for both records: ');
//                console.log('Model 1: ', Model1);
//                console.log('Model 2: ', Model2);

                if ((m1_type == "bill") && (m2_type == "bill")) {
                    if (m1_id > m2_id) { // an id for two bills will never be a tie
//                        return -1;
                        return_value = -1;
                    } else {
//                        return 1;
                        return_value = 1;
                    }
                } else if ((m1_type == "bill") && (m2_type == "payment")) {
                    return_value = 1;
                } else if ((m1_type == "payment") && (m2_type == "bill")) {
                    return_value = -1;
                } else { // ((m1_type == "payment") && (m2_type == "payment"))
                    // look at payment_type and decide
                    /*
                     payment_type:
                     0 - Balance Correction
                     1 - Normal Payment
                     2 - Auto Pay
                     3 - Disconnect
                     4 - Reconnect
                     5 - New
                     6 - Prorated bill (when disconnecting)
                     7 - Fines - Notes contain the reason?
                     */
                    var m1_data = Model1.get('data');
                    var m2_data = Model2.get('data');
                    var m1_payment_type = parseInt(m1_data.payment_type);
                    var m2_payment_type = parseInt(m2_data.payment_type);
//                    console.log('model:',Model1);
//                    console.log("m1_payment_type: " + m1_payment_type);
//                    console.log("m2_payment_type: " + m2_payment_type);
                    if (m1_payment_type == 1) {
//                        return 1;
                        return_value = -1;
                    } else if (m2_payment_type == 1) {
//                        return -1;
                        return_value = 1;
                    } else if (m1_payment_type == 2) {
//                        return -1;
                        return_value = -1;
                    } else if (m2_payment_type == 2) {
//                        return -1;
                        return_value = -1;
                    } else {
                        return_value = 0;
//                        return 0;
                    }
                }
//                return 0;
//                return_value = 1;
            }

//            console.log("Returning " + return_value);
            return return_value;

        },
        url: function () {
            return this.id ? '/ledger/' + this.id : '/ledger';
        },
        record: function () {
            console.log('ledger record');
            var collection_json = this.toJSON();
            var d = {
                collection: collection_json
            };
            var self = this;
            $.post("/ledger/", d,
                function (data) {
                    console.log("post complete: ", data);
                    if(data.status == "ok") {
                        window.location.reload();
                    }
                }
            );
        }
    });

    return LedgerCollection;

})
;