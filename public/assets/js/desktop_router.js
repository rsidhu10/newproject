define([
    'backbone'
], function () {

    var isUser = function () {
        if (window.app_session.groups() == 1) {
            return true;
        } else {
            return false;
        }
    }
    var isAdmin = function () {
        if (window.app_session.groups() == 100) {
            console.log('isAdmin: returning true, ', window.app_session.groups());
            return true;
        } else {
            console.log('isAdmin: returning false, ', window.app_session.groups());
//            $("#content_body").html("Access denied.");
            return false;
        }
    }

    var AppRouter = Backbone.Router.extend(
        {
            routes: {
                "home": "home",
                "login": "login",
                "logout": "logout",
                "schemes": "schemes",
                "activitylog": "admin_auditlog",
                "wings": "wings",
                "circles": "circles",
                "circles/wing/:id": "circles_wing",
                "districts": "districts",
                "districts/circle/:id": "districts_circle",
                "divisions": "divisions",
                "divisions/district/:id": "divisions_district",
                "subdivisions": "subdivisions",
                "subdivisions/division/:id": "subdivisions_division",
                "blocks": "blocks",
                "blocks/subdivision/:id": "blocks_subdivision",
                "panchayats": "panchayats",
                "panchayats/block/:id": "panchayats_block",
                "villages": "villages",
                "villages/panchayat/:id": "villages_panchayat",
                "habitations": "habitations",
                "habitations/edit/:id": "habitations_edit",
                "habitations/village/:id": "habitations_village",
                "habitations/scheme/:id": "habitations_scheme",
                "habitations/ledger/:id": "habitations_ledger",
                "consumers": "consumers",
                "consumers/habitation/:id": "consumers_habitation",
                "consumers/scheme/:id": "consumers_scheme",
                "data": "data",
                "billing/:filter/:page": "billing",
                "billing/new": "billing_new",
                "payment": "payment",
                "payments": "payments",
                "ledger": "ledger",
                "ledger/edit/:id": "ledger_edit",
                "xledger/edit/:id": "ledger_edit3",
                "account": "account",
                "accounts/edit/:id": "accounts_edit",
                "accounts/list": "accounts_list",
                "accounts/new": "accounts_new",
                "reports/dashboard": "reports_dashboard",
                "reports/billing": "reports_billing",
                "reports/account_balances": "reports_account_balances",
                "reports/paymentsChart": "reports_payments",
                "reports/payments": "reports_payments2",
                "reports/overdue": "reports_overdue",
                "reports/schemes": "reports_schemes",
                "reports/category-economic-status": "reports_category_economic_status",
                "admin": "admin",
                "admin/billgroup/new": "admin_billgroup_new",
                "admin/billgroup/edit/:id": "admin_billgroup_edit",
                "admin/billgroup/list": "admin_billgroup_list",
                "admin/collectioncenters/list": "admin_collectioncenters_list",
                "users": "users",
                "user/new": "user_new",
                "user/edit/:id": "user_edit",
                "user/payments": "user_payments2",
                "password": "user_password",
                "downloads/forms/new_connection": "downloads_forms_new_connection",
                "downloads/forms/affidavit": "downloads_forms_affidavit",
                "downloads/templates/consumer": "downloads_templates_consumer",
                "downloads/templates/habitation": "downloads_templates_habitation",
                "downloads/templates/scheme": "downloads_templates_scheme",
                "invoicing": "invoicing"
            },
            home: function () {
                require(['views/desktop/home/main'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar'
                    });
                    myView.render();
                    activeNav('nav_topbar', 'nav_topbar_home');
                });
            },
            schemes: function () {
                require(['views/desktop/scheme/main'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar'
                    });
                    myView.render();
                    activeNav('nav_sidebar_data', 'nav_sidebar_data_schemes');
                    activeNav('nav_topbar', 'nav_topbar_data');
                });
            },
            wings: function () {
                console.log('here');
                require(['views/desktop/wing/main'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar'
                    });
                    myView.render();
                    activeNav('nav_sidebar_data', 'nav_sidebar_data_wings');
                    activeNav('nav_topbar', 'nav_topbar_data');
                });
            },

            circles: function () {
                require(['views/desktop/circle/main'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar'
                    });
                    myView.render();
                    activeNav('nav_sidebar_data', 'nav_sidebar_data_circles');
                    activeNav('nav_topbar', 'nav_topbar_data');
                });
            },
            circles_wing: function (id) {
                require(['views/desktop/circle/wing'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar',
                        'parent_model_id': id
                    });
                    myView.render();

                    activeNav('nav_sidebar_data', 'nav_sidebar_data_circles');
                    activeNav('nav_topbar', 'nav_topbar_data');
                });
            },

            districts: function () {
                require(['views/desktop/district/main'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar'
                    });
                    myView.render();

                    activeNav('nav_sidebar_data', 'nav_sidebar_data_districts');
                    activeNav('nav_topbar', 'nav_topbar_data');
                });
            },
            districts_circle: function (id) {
                require(['views/desktop/district/circle'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar',
                        'parent_model_id': id
                    });
                    myView.render();

                    activeNav('nav_sidebar_data', 'nav_sidebar_data_districts');
                    activeNav('nav_topbar', 'nav_topbar_data');
                });
            },

            divisions: function () {
                require(['views/desktop/division/main'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar'
                    });
                    myView.render();
                    activeNav('nav_sidebar_data', 'nav_sidebar_data_divisions');
                    activeNav('nav_topbar', 'nav_topbar_data');
                });
            },
            divisions_district: function (id) {
                require(['views/desktop/division/district'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar',
                        'parent_model_id': id
                    });
                    myView.render();
                    activeNav('nav_sidebar_data', 'nav_sidebar_data_divisions');
                    activeNav('nav_topbar', 'nav_topbar_data');
                });
            },

            subdivisions: function () {
                require(['views/desktop/subdivision/main'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar'
                    });
                    myView.render();
                    activeNav('nav_sidebar_data', 'nav_sidebar_data_subdivisions');
                    activeNav('nav_topbar', 'nav_topbar_data');
                });
            },
            subdivisions_division: function (id) {
                require(['views/desktop/subdivision/division'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar',
                        'parent_model_id': id
                    });
                    myView.render();
                    activeNav('nav_sidebar_data', 'nav_sidebar_data_subdivisions');
                    activeNav('nav_topbar', 'nav_topbar_data');
                });
            },

            blocks: function () {
                require(['views/desktop/block/main'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar'
                    });
                    myView.render();
                    activeNav('nav_sidebar_data', 'nav_sidebar_data_blocks');
                    activeNav('nav_topbar', 'nav_topbar_data');
                });
            },
            blocks_subdivision: function (id) {
                require(['views/desktop/block/subdivision'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar',
                        'parent_model_id': id
                    });
                    myView.render();
                    activeNav('nav_sidebar_data', 'nav_sidebar_data_blocks');
                    activeNav('nav_topbar', 'nav_topbar_data');
                });
            },

            panchayats: function () {
                require(['views/desktop/panchayat/main'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar'
                    });
                    myView.render();
                    activeNav('nav_sidebar_data', 'nav_sidebar_data_panchayats');
                    activeNav('nav_topbar', 'nav_topbar_data');
                });
            },
            panchayats_block: function (id) {
                require(['views/desktop/panchayat/block'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar',
                        'parent_model_id': id
                    });
                    myView.render();
                    activeNav('nav_sidebar_data', 'nav_sidebar_data_panchayats');
                    activeNav('nav_topbar', 'nav_topbar_data');
                });
            },

            villages: function () {
                require(['views/desktop/village/main'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar'
                    });
                    myView.render();
                    activeNav('nav_sidebar_data', 'nav_sidebar_data_villages');
                    activeNav('nav_topbar', 'nav_topbar_data');
                });
            },
            villages_panchayat: function (id) {
                require(['views/desktop/village/panchayat'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar',
                        'parent_model_id': id
                    });
                    myView.render();
                    activeNav('nav_sidebar_data', 'nav_sidebar_data_villages');
                    activeNav('nav_topbar', 'nav_topbar_data');
                });
            },

            habitations: function () {
                var that = this;
                require(['views/desktop/habitation/main'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar',
                        'group': window.app_session.groups()
                    });
                    myView.render();
                    activeNav('nav_sidebar_data', 'nav_sidebar_data_habitations');
                    activeNav('nav_topbar', 'nav_topbar_data');
                });
            },
            habitations_village: function (id) {
                require(['views/desktop/habitation/village'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar',
                        'parent_model_id': id
                    });
                    myView.render();
                    activeNav('nav_sidebar_data', 'nav_sidebar_data_habitations');
                    activeNav('nav_topbar', 'nav_topbar_data');
                });
            },
            habitations_scheme: function (id) {
                require(['views/desktop/habitation/scheme'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar',
                        'parent_model_id': id
                    });
                    myView.render();
                    activeNav('nav_sidebar_data', 'nav_sidebar_data_habitations');
                    activeNav('nav_topbar', 'nav_topbar_data');
                });
            },
            habitations_edit: function (id) {
                require(['views/desktop/habitation/edit'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar',
                        'parent_model_id': id,
                        'group': window.app_session.groups()
                    });
                    myView.render();
                    activeNav('nav_sidebar_data', 'nav_sidebar_data_habitations');
                    activeNav('nav_topbar', 'nav_topbar_data');
                });
            },
            habitations_ledger: function(id) {
                console.log('lets get ledger for habitaiton ' + id);
                require(['views/desktop/habitation/ledger'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar',
                        'parent_model_id': id,
                        'group': window.app_session.groups()
                    });
                    myView.render();
                    activeNav('nav_sidebar_data', 'nav_sidebar_data_habitations');
                    activeNav('nav_topbar', 'nav_topbar_data');
                });
            },

            consumers: function () {
                require(['views/desktop/consumer/main'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar'
                    });
                    myView.render();
                    activeNav('nav_sidebar_data', 'nav_sidebar_data_consumers');
                    activeNav('nav_topbar', 'nav_topbar_data');
                });
            },
            consumers_habitation: function (id) {
                require(['views/desktop/consumer/habitation'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar',
                        'parent_model_id': id,
                        'group': window.app_session.groups()
                    });
                    myView.render();
                    activeNav('nav_sidebar_data', 'nav_sidebar_data_consumers');
                    activeNav('nav_topbar', 'nav_topbar_data');
                });
            },
            consumers_scheme: function (id) {
                require(['views/desktop/consumer/scheme'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar',
                        'parent_model_id': id
                    });
                    myView.render();
                    activeNav('nav_sidebar_data', 'nav_sidebar_data_consumers');
                    activeNav('nav_topbar', 'nav_topbar_data');
                });
            },

            data: function () {
                if (!window.app_session.groups() == 100) {
                    return false;
                }
                require(['views/desktop/data/main'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar'
                    });
                    myView.render();
                });
                activeNav('nav_topbar', 'nav_topbar_data');
            },

            billing: function (filter, page) {
                if (!window.app_session.groups() == 100) {
                    return false;
                }
                require(['views/desktop/billing/main'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar',
                        'filter': filter,
                        'page': page
                    });
                    myView.render();
                    activeNav('nav_sidebar_billing', 'nav_sidebar_billing_list');
                    activeNav('nav_topbar', 'nav_topbar_billing');
                });
            },
            billing_new: function () {
                if (!window.app_session.groups() == 100) {
                    return false;
                }
                require(['views/desktop/billing/new'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar'
                    });
//                    myView();
                    activeNav('nav_sidebar_billing', 'nav_sidebar_billing_new');
                    activeNav('nav_topbar', 'nav_topbar_billing');
                });
            },
            ledger: function () {
                require(['views/desktop/account/ledger'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar'
                    });
                    activeNav('nav_sidebar_payment', 'nav_sidebar_account_ledger');
                    activeNav('nav_topbar', 'nav_topbar_account');
                });
            },
            ledger_edit3: function (account_number) {
                require(['views/desktop/account/ledger_edit3'], function (aView) {
                    var myView = new aView({
                        'main_el':'#content_body',
                        'sidebar_el':'#content_sidebar',
                        'account_number': account_number
                    });
                    activeNav('nav_sidebar_payment', 'nav_sidebar_account_ledger');
                    activeNav('nav_topbar', 'nav_topbar_account');
                });
            },
            ledger_edit: function (account_number) {
                require(['views/desktop/account/ledger_edit'], function (aView) {
                    var myView = new aView({
                        'main_el':'#content_body',
                        'sidebar_el':'#content_sidebar',
                        'account_number': account_number
                    });
                    activeNav('nav_sidebar_payment', 'nav_sidebar_account_ledger');
                    activeNav('nav_topbar', 'nav_topbar_account');
                });
            },
            account: function () {
                require(['views/desktop/account/main'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar'
                    });
                    activeNav('nav_sidebar_payment', 'nav_sidebar_account_ledger');
                    activeNav('nav_topbar', 'nav_topbar_account');
                });
            },
            accounts_edit: function (id) {
                console.log('edit account ' + id);
                require(['views/desktop/account/edit'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar',
                        'consumer_id': id
                    });
                    activeNav('nav_sidebar_payment', 'nav_sidebar_accounts_edit');
                    activeNav('nav_topbar', 'nav_topbar_account');
                });
            },
            accounts_new: function () {
                require(['views/desktop/account/new'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar'
                    });
                    activeNav('nav_sidebar_payment', 'nav_sidebar_accounts_new');
                    activeNav('nav_topbar', 'nav_topbar_account');
                });
            },
            payment: function () {
                require(['views/desktop/payment/main'], function (aView) {
                    var myView = new aView({
                        'main_el': '#content_body',
                        'sidebar_el': '#content_sidebar'
                    });
                    activeNav('nav_sidebar_payment', 'nav_sidebar_payment_new');
                    activeNav('nav_topbar', 'nav_topbar_account');
                });
            },
            payments: function () {
                require([
                    'text!templates/desktop/payment/list.html',
                    'text!templates/desktop/account/sidebar.html'
                ], function (aTemplate, aSidebar) {
                    $("#content_body").html(_.template(aTemplate));
                    $('#content_sidebar').html(_.template(aSidebar));
                    activeNav('nav_sidebar_payment', 'nav_sidebar_payment_list');
                    activeNav('nav_topbar', 'nav_topbar_account');
                    require(['collections/payments', 'views/desktop/payment/list'], function (aCollection, aCollectionView) {
                        var myCollection = new aCollection;
                        var myCollectionView = new aCollectionView({el: '#collection_div', 'collection': myCollection});
                    });
                });
            },
            admin: function () {
                require([
                    'text!templates/desktop/admin/admin.html',
                    'text!templates/desktop/admin/sidebar.html'
                ], function (aTemplate, aSidebar) {
                    $("#content_body").html(_.template(aTemplate));
                    $('#content_sidebar').html(_.template(aSidebar));
                    activeNav('nav_sidebar_admin', 'nav_sidebar_admin_home');
                    activeNav('nav_topbar', 'nav_topbar_admin');
//                    require(['collections/users', 'views/desktop/user/list'], function (aCollection, aCollectionView) {
//                        var myCollectionView = new aCollectionView({el:'#collection_div'});
//                    });
                });
            },
            admin_billgroup_new: function () {
                require([
                    'text!templates/desktop/admin/billgroup/main.html',
                    'text!templates/desktop/admin/sidebar.html'
                ], function (aTemplate, aSidebar) {
                    $("#content_body").html(_.template(aTemplate));
                    $('#content_sidebar').html(_.template(aSidebar));
                    activeNav('nav_sidebar_admin', 'nav_sidebar_admin_new_billgroup');
                    activeNav('nav_topbar', 'nav_topbar_admin');
                    require(['views/desktop/admin/billgroup/new'], function (aBillGroupView) {
                        var myBillGroupView = new aBillGroupView({el: '#billgroup_div'});
                    });
                });
            },
            admin_billgroup_edit: function (id) {
                require([
                    'text!templates/desktop/admin/billgroup/main.html',
                    'text!templates/desktop/admin/sidebar.html'
                ], function (aTemplate, aSidebar) {
                    $("#content_body").html(_.template(aTemplate));
                    $('#content_sidebar').html(_.template(aSidebar));
                    activeNav('nav_sidebar_admin', 'nav_sidebar_admin_list_billgroups');
                    activeNav('nav_topbar', 'nav_topbar_admin');
                    require(['views/desktop/admin/billgroup/edit'], function (aBillGroupView) {
                        var myBillGroupView = new aBillGroupView({el: '#billgroup_div', model_id: id});
                    });
                });
            },
            admin_billgroup_list: function () {
                require([
                    'text!templates/desktop/admin/billgroup/main.html',
                    'text!templates/desktop/admin/sidebar.html'
                ], function (aTemplate, aSidebar) {
                    $("#content_body").html(_.template(aTemplate));
                    $('#content_sidebar').html(_.template(aSidebar));
                    activeNav('nav_sidebar_admin', 'nav_sidebar_admin_list_billgroups');
                    activeNav('nav_topbar', 'nav_topbar_admin');

                    require(['views/desktop/admin/billgroup/list'], function (aBillGroupView) {
                        var myBillGroupView = new aBillGroupView({el: '#billgroup_div'});
                    });
                });
            },
            admin_collectioncenters_list: function () {
                require([
                    'text!templates/desktop/admin/collectioncenters/main.html',
                    'text!templates/desktop/admin/sidebar.html'
                ], function (aTemplate, aSidebar) {
                    $("#content_body").html(_.template(aTemplate));
                    $('#content_sidebar').html(_.template(aSidebar));
                    activeNav('nav_sidebar_admin', 'nav_sidebar_admin_list_collectioncenters');
                    activeNav('nav_topbar', 'nav_topbar_admin');

                    require(['views/desktop/admin/collectioncenters/list'], function (aCollectionCentersView) {
                        var myCollectionCentersView = new aCollectionCentersView({el: '#collectioncenters_div'});
                    });
                });
            },
            users: function () {
                require([
                    'text!templates/desktop/users/list.html',
                    'text!templates/desktop/admin/sidebar.html'
                ], function (aTemplate, aSidebar) {
                    $("#content_body").html(_.template(aTemplate));
                    $('#content_sidebar').html(_.template(aSidebar));
                    activeNav('nav_sidebar_admin', 'nav_sidebar_admin_list_users');
                    activeNav('nav_topbar', 'nav_topbar_admin');

                    require(['collections/users', 'views/desktop/user/list'], function (aCollection, aCollectionView) {
                        var myCollectionView = new aCollectionView({el: '#collection_div'});
                    });
                });
            },
            user_new: function () {
                console.log('create a new user');
                require([
                    'text!templates/desktop/users/new.html',
                    'text!templates/desktop/admin/sidebar.html'
                ], function (aTemplate, aSidebar) {
                    $("#content_body").html(_.template(aTemplate));
                    $('#content_sidebar').html(_.template(aSidebar));
                    activeNav('nav_sidebar_admin', 'nav_sidebar_admin_new_user');
                    activeNav('nav_topbar', 'nav_topbar_admin');

                    require(['views/desktop/user/new'], function (aView) {
                        var newUserView = new aView({el: '#new_user_div'});
                    });
                });
            },
            user_password: function() {
                console.log("Change Password");
                require([
                    'text!templates/desktop/users/password.html',
                    'text!templates/desktop/admin/sidebar.html'
                ], function (aTemplate, aSidebar) {
                    $("#content_body").html(_.template(aTemplate));
                    $('#content_sidebar').html(_.template(aSidebar));
                    activeNav('nav_sidebar_admin', 'nav_sidebar_admin_list');
                    activeNav('nav_topbar', 'nav_topbar_admin');

                    require(['views/desktop/user/password'], function (aView) {
                        var editPasswordView = new aView({el: '#edit_password_div'});
                    });
                });
            },
            user_edit: function (user_id) {
                console.log('edit user ' + user_id);
                require([
                    'text!templates/desktop/users/edit.html',
                    'text!templates/desktop/admin/sidebar.html'
                ], function (aTemplate, aSidebar) {
                    $("#content_body").html(_.template(aTemplate));
                    $('#content_sidebar').html(_.template(aSidebar));
                    activeNav('nav_sidebar_admin', 'nav_sidebar_admin_list');
                    activeNav('nav_topbar', 'nav_topbar_admin');

                    $("#edit_user_div").html("Edit user id: " + user_id);

                    require(['views/desktop/user/edit'], function (aView) {
                        var editUserView = new aView({el: '#edit_user_div', user_id: user_id});
                    });
                });
            },
            reports_dashboard: function() {
                require(['views/desktop/reports/dashboard'], function (aView) {
                    var myView = new aView({
                        'el': '#content_body',
                        'sidebar_el': '#content_sidebar'
                    });
                    activeNav('nav_sidebar_reports', 'nav_sidebar_reports_dashboard');
                    activeNav('nav_topbar', 'nav_topbar_reports');
                });
            },
            reports_account_balances: function () {
                require(['views/desktop/reports/account_balance'], function (aView) {
                    var myView = new aView({
                        'el': '#content_body',
                        'sidebar_el': '#content_sidebar'
                    });
                    activeNav('nav_sidebar_reports', 'nav_sidebar_reports_balances');
                    activeNav('nav_topbar', 'nav_topbar_reports');
                });
            },
            reports_category_economic_status: function () {
                require(['views/desktop/reports/category_economic_status'], function (aView) {
                    var myView = new aView({
                        'el': '#content_body',
                        'sidebar_el': '#content_sidebar'
                    });
                    activeNav('nav_sidebar_reports', 'nav_sidebar_reports_category_economic_status');
                    activeNav('nav_topbar', 'nav_topbar_reports');
                });
            },
            reports_payments: function () {
                require(['views/desktop/reports/payments'], function (aView) {
                    var myView = new aView({
                        'el': '#content_body',
                        'sidebar_el': '#content_sidebar'
                    });
                    activeNav('nav_sidebar_reports', 'nav_sidebar_reports_payments');
                    activeNav('nav_topbar', 'nav_topbar_reports');
                });
            },
            reports_payments2: function () {
                require(['views/desktop/reports/payments2'], function (aView) {
                    var myView = new aView({
                        'el': '#content_body',
                        'sidebar_el': '#content_sidebar',
                        'group': window.app_session.groups()
                    });
                    activeNav('nav_sidebar_reports', 'nav_sidebar_reports_payments2');
                    activeNav('nav_topbar', 'nav_topbar_reports');
                });
            },
            reports_overdue: function () {
                require(['views/desktop/reports/overdue'], function (aView) {
                    var myView = new aView({
                        'el': '#content_body',
                        'sidebar_el': '#content_sidebar'
                    });
                    activeNav('nav_sidebar_reports', 'nav_sidebar_reports_overdue');
                    activeNav('nav_topbar', 'nav_topbar_reports');
                });
            },

            reports_billing: function () {
                require(['views/desktop/reports/billing'], function (aView) {
                    var myView = new aView({
                        'el': '#content_body',
                        'sidebar_el': '#content_sidebar'
                    });
                    activeNav('nav_sidebar_reports', 'nav_sidebar_reports_billing');
                    activeNav('nav_topbar', 'nav_topbar_reports');
                });
            },
            reports_schemes: function () {
                require(['views/desktop/reports/schemes'], function (aView) {
                    var myView = new aView({
                        'el': '#content_body',
                        'sidebar_el': '#content_sidebar'
                    });
                    activeNav('nav_sidebar_reports', 'nav_sidebar_reports_schemes');
                    activeNav('nav_topbar', 'nav_topbar_reports');
                });
            },
            user_payments2: function () {
                require(['views/desktop/reports/payments2', 'text!templates/desktop/account/sidebar.html'], function (aView, userSideBar) {
                    var myView = new aView({
                        'el': '#content_body',
                        'sidebar_el': '#content_sidebar',
                        'group': window.app_session.groups()
                    });
                    if(!window.app_session.groups()) {
                        $("#content_sidebar").html(_.template(userSideBar));
                    }
                    activeNav('nav_sidebar_payment', 'nav_sidebar_user_payment_report');
                    activeNav('nav_topbar', 'nav_topbar_reports');
                });
            },
            admin_auditlog: function () {
                require([
                    'text!templates/desktop/admin/auditlog/main.html',
                    'text!templates/desktop/admin/sidebar.html'
                ], function (aTemplate, aSidebar) {
                    $("#content_body").html(_.template(aTemplate));
                    $('#content_sidebar').html(_.template(aSidebar));
                    activeNav('nav_sidebar_admin', 'nav_sidebar_admin_auditlog');
                    activeNav('nav_topbar', 'nav_topbar_admin');

                    require(['views/desktop/admin/auditlog/list'], function (AuditLogView) {
                        var myAuditLogView = new AuditLogView({el: '#auditlog_div'});
                    });
                });
            },
            downloads_forms_new_connection: function () {
                require([
                    'text!templates/desktop/downloads/forms_new_connection.html',
                    'text!templates/desktop/downloads/sidebar.html'
                ], function (aTemplate, aSidebar) {
                    $("#content_body").html(_.template(aTemplate));
                    $('#content_sidebar').html(_.template(aSidebar));
                    activeNav('nav_sidebar_admin', 'nav_sidebar_downloads_new_connection');
                    activeNav('nav_topbar', 'nav_topbar_downloads');
                });
            },
            downloads_forms_affidavit: function () {
                require([
                    'text!templates/desktop/downloads/forms_affidavit.html',
                    'text!templates/desktop/downloads/sidebar.html'
                ], function (aTemplate, aSidebar) {
                    $("#content_body").html(_.template(aTemplate));
                    $('#content_sidebar').html(_.template(aSidebar));
                    activeNav('nav_sidebar_admin', 'nav_sidebar_downloads_affidavit');
                    activeNav('nav_topbar', 'nav_topbar_downloads');
                });
            },
            downloads_templates_consumer: function () {
                require([
                    'text!templates/desktop/downloads/templates_consumer.html',
                    'text!templates/desktop/downloads/sidebar.html'
                ], function (aTemplate, aSidebar) {
                    $("#content_body").html(_.template(aTemplate));
                    $('#content_sidebar').html(_.template(aSidebar));
                    activeNav('nav_sidebar_admin', 'nav_sidebar_downloads_consumer');
                    activeNav('nav_topbar', 'nav_topbar_downloads');
                });
            },
            downloads_templates_habitation: function () {
                require([
                    'text!templates/desktop/downloads/templates_habitation.html',
                    'text!templates/desktop/downloads/sidebar.html'
                ], function (aTemplate, aSidebar) {
                    $("#content_body").html(_.template(aTemplate));
                    $('#content_sidebar').html(_.template(aSidebar));
                    activeNav('nav_sidebar_admin', 'nav_sidebar_downloads_habitation');
                    activeNav('nav_topbar', 'nav_topbar_downloads');
                });
            },
            downloads_templates_scheme: function () {
                require([
                    'text!templates/desktop/downloads/templates_scheme.html',
                    'text!templates/desktop/downloads/sidebar.html'
                ], function (aTemplate, aSidebar) {
                    $("#content_body").html(_.template(aTemplate));
                    $('#content_sidebar').html(_.template(aSidebar));
                    activeNav('nav_sidebar_admin', 'nav_sidebar_downloads_scheme');
                    activeNav('nav_topbar', 'nav_topbar_downloads');
                });
            },
            invoicing: function () {
                require([
                    'text!templates/desktop/invoicing/invoicing.html',
                    'text!templates/desktop/invoicing/sidebar.html'
                ], function (aTemplate, aSidebar) {
                    $("#content_body").html(_.template(aTemplate));
                    $('#content_sidebar').html(_.template(aSidebar));
                    activeNav('nav_sidebar_admin', 'nav_sidebar_invoicing_home');
                    activeNav('nav_topbar', 'nav_topbar_invoicing');
//                    require(['collections/users', 'views/desktop/user/list'], function (aCollection, aCollectionView) {
//                        var myCollectionView = new aCollectionView({el:'#collection_div'});
//                    });
                });
            },
            logout: function () {
                window.app_session.logout();
            }
        });



    var initialize = function () {

        console.log('desktop_router init');
        var router = new AppRouter;
        Backbone.history.start({pushState: false});
//        Backbone.history.start({pushState: false, hashChange: true, silent: true, root: "/"   });

        router.bind("route", function (aroute, args) {
            console.log('aroute: ', aroute);
            console.log('args: ', args);
            var current_page = window.location.hash;
//            var routed_page_array = aroute.split(':', 2);
//            var current_page = args;
//            console.log("window.location.hash", window.location);
//            var current_page = routed_page_array[1];
//            console.log('aroute: ', aroute);
//            console.log('args: ', args);
//            console.log('routed_page_array: ', routed_page_array);
//            console.log('current_page: ', current_page);
//            debugger;
//            current_page = current_page.replace('_','/');
//            if (typeof args !== 'undefined') {
//                current_page = "#"+ current_page.replace(/_/g, "/");
////                current_page = current_page + "/" + args;
//                console.log('not undefined, current page: ', current_page);
//            }
            var ignore_pages = ["#login", "#logout", "#password"];
//                console.log("Different Page: " + current_page, routed_page_array);
            if (_.contains(ignore_pages, current_page)) {
//                console.log('page is in ignore list, not setting cookie');
            } else {
                $.cookie('last_page_visited', current_page);
//                console.log("setting cookie last_page_visited: ", current_page);
            }
            console.log('current_page: ', current_page);
        });
//        router.bind("all", function (aroute, args) {
//            var routed_page_array = aroute.split(':', 2);
//            var current_page = routed_page_array[1];
////            var current_page = args;
////            current_page = current_page.replace('_','/');
//            console.log('aroute: ', aroute);
//            console.log('routed_page_array: ', routed_page_array);
//            console.log('args: ', args);
//            if (typeof args !== 'undefined') {
//                current_page = current_page.replace(/_/g, "/");
//                current_page = current_page + "/" + args;
//                console.log('current page: ', current_page);
//            }
//            var ignore_pages = ["login", "logout"]
////                console.log("Different Page: " + current_page, routed_page_array);
//            if (!_.contains(ignore_pages, current_page)) {
//                $.cookie('last_page_visited', current_page);
////                console.log("Different Page: " + current_page, aroute, args);
//            }
//        });

        return router;
    };

    var activeNav = function (parent, navitem) {
        // remove class from all children of parent
        $("#" + parent + " li").removeClass("active");
        // add active class to navitem
        $("#" + navitem).addClass("active");
    };

    return {
        initialize: initialize
    };
});
