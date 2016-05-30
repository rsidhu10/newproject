define([
    'models/user',
    'desktop_router',
    'backbone'
], function (UserModel, DesktopRouter) {
    var Session = Backbone.View.extend({
        initialize:function () {
//            console.log('session init');
            _.bindAll(this, 'logout', 'authenticated', 'login_autocheck', 'login', 'groups', 'modal_login');
            if (!this.authenticated()) {
                this.login();
            }
        },
        logout:function () {
            this.model = new UserModel;
            window.location = "/logout";
        },
        isAdmin:function() {
            if(parseInt(this.model.get('groups')) == 100) {
                return true;
            }
            return false;
        },
        authenticated:function () {
            if (this.model) {
                var auth = this.model.get('authenticated');
                return Boolean(auth);
            } else {
                return false;
            }
        },
        login_autocheck:function () {
            var wait_minutes = 1;
            var timeout = wait_minutes * 60000; // milliseconds
            var self = this;
            var randomnumber = Math.floor(Math.random() * 10000);
//            console.log('Starting new timer, id: ' + randomnumber);
            var t = window.setInterval(function () {
//                console.log('-> autocheck, id: ' + randomnumber);
                self.model.fetch({
                    error: function (model, response) {
//                        console.log("error, we appear to be logged out");
                        self.modal_login();
                        clearInterval(t);
//                        alert('failed to fetch user, (' + response.status+ ')' +response.statusText + ': response: ' + response.responseText);
                    },
                    success:function (model, response) {
//                        console.log('ok, user fetched, model: ', model);
                        var logged_in = model.get('authenticated').toString();
//                        console.log('logged_in: ->"' + (logged_in.toLowerCase() !== 'true') + '"');
                        if (logged_in !== 'true') {
//                            console.log('User is not logged in!');
                            self.modal_login();
                            clearInterval(t);
                        } else {
//                            console.log('ok, user already authenticated');
                        }
                    }
                });
            }, timeout);


        },
        modal_login:function () {
            var self = this;
            $('#login_modal').on('hidden', function () {
                console.log('hiding!');
                self.logout();
            })
            $("#login_modal").modal({
                keyboard:false,
                backdrop:'static'
            });
            $('#modal_username').focus();
            //console.log('document is ready, login page');
            $('#login_modal_login_btn').click(function () {
                //debugger;
                $('#login_modal_login_btn').attr("disabled", "disabled");
                $('#login_modal_login_btn').attr("value", "Please wait, checking...");
                username = $('#modal_username')[0].value;
                password = $('#modal_password')[0].value;
                /*****************************************************/
                var target = '/check';
                // Request
                var data = {
                    username:username,
                    password:password
                };

                // Send
                $.ajax({
                    url:target,
                    dataType:'json',
                    type:'POST',
                    data:data,
                    success:function (data, textStatus, XMLHttpRequest) {
                        if (data.valid) {
                            $('#login_modal_login_btn').removeAttr("disabled");
                            self.login_autocheck();
                            $('#login_modal').unbind('hidden');
                            $('#login_modal').modal('hide');
                            console.log('ok, we good!');

                            //console.log("DATA");
                            //console.log(data);
                            //document.location.href = data.redirect;
                        }
                        else {
                            // Message
                            // data.error || 'An unexpected error occured, please try again', {type: 'error'});
                            // submitBt.enableBt();

                            $('#login_modal_login_btn').attr("value", "Error, Login Failed!").addClass('btn-danger');
                            setTimeout(function () {
                                $('#login_modal_login_btn').removeClass('btn-danger');
                                setTimeout(function () {
                                    $('#login_modal_login_btn').addClass('btn-danger');
                                    setTimeout(function () {
                                        $('#login_modal_login_btn').removeClass('btn-danger');

                                        $('#login_modal_login_btn').attr("value", "Login »");
                                        setTimeout(function () {
                                            $('#login_modal_login_btn').removeAttr("disabled");
                                        }, 150);

                                    }, 1000);
                                }, 250);
                            }, 1000);
                        }
                    },
                    error:function (XMLHttpRequest, textStatus, errorThrown) {
                        // Message
                        //$('#login-block').removeBlockMessages().blockMessage('Error while contacting server, please try again', {type: 'error'});
                        console.log("Error: " + errorThrown);
                        //submitBt.enableBt();
                    }
                });
                /*****************************************************/
            });

            $(document).keypress(function (e) {
                if (e.which == 13) {
                    //console.log('You pressed enter!');
                    $('#login_modal_login_btn').click();
                }
            });

        },
        login:function () {
//            console.log('login()');
            var self = this;
            this.model = new UserModel;
            this.model.fetch({
                error:function (model, response) {
                    console.log("error, response: " + response);
                    alert('failed to fetch user, (' + response.status + ')' + response.statusText + ': response: ' + response.responseText);
                },
                success:function (model, response) {
                    if (Boolean(model.get('authenticated')) == true) {
                        if (typeof window.app_router === 'undefined') {
                            window.app_router = DesktopRouter.initialize();
                            var last_page = $.cookie('last_page_visited'); // => null
                            if (self.groups() == 100) {
                                require(['text!templates/desktop/topbar_admin.html'], function (aTopbar) {
                                    $('#content_topbar').html(_.template(aTopbar));
                                    if (_.isNull(last_page)) {
                                        last_page = 'home';
                                    }
                                });
                            } else if (self.groups() == 10) {
                                require(['text!templates/desktop/topbar_report.html'], function (aTopbar) {
                                    $('#content_topbar').html(_.template(aTopbar));
                                    if (_.isNull(last_page)) {
                                        last_page = 'ledger';
                                    }
                                });
                            } else { //if (self.groups() == 1) {
                                require(['text!templates/desktop/topbar_user.html'], function (aTopbar) {
                                    $('#content_topbar').html(_.template(aTopbar));
                                    if (_.isNull(last_page)) {
                                        last_page = 'ledger';
                                    }
                                });
                            }
//                            console.log('Login: last page visited: ' + last_page);
//                            window.app_router.navigate(last_page, {trigger:true, replace:true});
                        } else {
//                            console.log('app router already exists!');
                        }
                        self.login_autocheck();
                    } else {
                        console.log('User is not logged in!');
                        window.location = "/login";
                    }
                }
            });
        },
        groups:function () {
            return this.model.get('groups');
        }

    });

    return Session;
});
