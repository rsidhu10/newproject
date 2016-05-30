requirejs.config({
    paths: {
        'jquery': 'libs/jquery-1.7.2',
        'underscore': 'libs/underscore',
        'backbone': 'libs/backbone',
        'text': 'libs/text',
        'json2': 'libs/json2',
        'bootstrap': 'libs/bootstrap'
    },
    shim: {
        'backbone': {
            deps: ['json2', 'underscore', 'jquery'],
            exports: 'Backbone'
        },
        'bootstrap': ['jquery']
    }
});


define(['backbone'], function () {
        if (
            navigator.userAgent.match(/Android/i) ||
                navigator.userAgent.match(/webOS/i) ||
                navigator.userAgent.match(/iPhone/i) ||
                navigator.userAgent.match(/iPod/i) ||
                navigator.userAgent.match(/iPad/i) ||
                navigator.userAgent.match(/BlackBerry/)
            ) {
            // Launch the mobile site
            //console.log('Mobile browser detected');
        } else {
            // Launch the full site
            //console.log('Desktop Browser: ' + navigator.userAgent);
        }


        $(document).ready(function () {
            $('#username').focus();
            //console.log('document is ready, login page');
            $('#login_button').click(function () {
                //debugger;
                $('#login_button').attr("disabled", "disabled");
                $('#login_button').attr("value", "Checking...");
                username = $('#username')[0].value;
                password = $('#password')[0].value;
                /*****************************************************/
                var target = '/check';
                // Request
                var data = {
                    username: username,
                    password: password
                };

                // Send
                $.ajax({
                    url: target,
                    dataType: 'json',
                    type: 'POST',
                    data: data,
                    success: function (data, textStatus, XMLHttpRequest) {
                        if (data.valid) {
                            $('#login_button').removeAttr("disabled");
                            //console.log("DATA");
                            console.log('login data:', data);
                            console.log('data.redirect:', data.redirect);
                            window.location.replace(data.redirect);
                        }
                        else {
                            // Message
                            // data.error || 'An unexpected error occured, please try again', {type: 'error'});
                            // submitBt.enableBt();

                            $('#login_button').attr("value", "Failed!").addClass('btn-danger');
                            setTimeout(function () {
                                $('#login_button').removeClass('btn-danger');
                                setTimeout(function () {
                                    $('#login_button').addClass('btn-danger');
                                    setTimeout(function () {
                                        $('#login_button').removeClass('btn-danger');

                                        $('#login_button').attr("value", "Login »");
                                        setTimeout(function () {
                                            $('#login_button').removeAttr("disabled");
                                        }, 150);

                                    }, 1000);
                                }, 250);
                            }, 1000);
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        // Message
                        //$('#login-block').removeBlockMessages().blockMessage('Error while contacting server, please try again', {type: 'error'});
                        console.log("Error: " + errorThrown);
                        alert('Login Failed. There was an error connecting to the server, error: ' + errorThrown);

                        $('#login_button').attr("value", "Failed!").addClass('btn-danger');
                        setTimeout(function () {
                            $('#login_button').removeClass('btn-danger');
                            setTimeout(function () {
                                $('#login_button').addClass('btn-danger');
                                setTimeout(function () {
                                    $('#login_button').removeClass('btn-danger');

                                    $('#login_button').attr("value", "Login »");
                                    setTimeout(function () {
                                        $('#login_button').removeAttr("disabled");
                                    }, 150);

                                }, 1000);
                            }, 250);
                        }, 1000);
                        //submitBt.enableBt();
                    }
                });
                /*****************************************************/
            });

            $(document).keypress(function (e) {
                if (e.which == 13) {
                    //console.log('You pressed enter!');
                    $('#login_button').click();
                }
            });

        });

    }

);



