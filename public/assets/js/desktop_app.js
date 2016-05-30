define([
    'views/session',
    'backbone'
], function(Session){

    var initialize = function() {
        if (typeof window.app_session === 'undefined') {
            window.app_session = new Session();
        }
    };

    return {
        initialize: initialize
    };
});
