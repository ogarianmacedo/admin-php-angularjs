'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */

angular
    .module('app', [
        'ui.router',
        'LocalStorageModule',
        'datatables',
        'ui.mask'
    ])
    // routes
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('landing-page', {
                url: "/",
                templateUrl: "index.html",
                controller: "LandingpageCtrl"
            })
    }]);
