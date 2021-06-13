'use strict';

angular
    .module('app', [
        'ui.router',
        'LocalStorageModule',
        'datatables',
        'ui.mask',
        'textAngular'
    ])
    // routes
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/login");

        $stateProvider
            .state('adm', {
                url: "/",
                templateUrl: "views/adm.html",
                controller: "AdmCtrl"
            })
            .state('login', {
                url: "/login",
                templateUrl: "views/login.html",
                controller: "LoginCtrl"
            })
            .state('adm.dashboard', {
                url: "dashboard",
                templateUrl: "views/dashboard.html",
                controller: "DashboardCtrl"
            })
            .state('adm.usuario', {
                url: 'usuario',
                cache: false,
                templateUrl: 'views/usuario/usuario.html',
                controller: 'usuarioCtrl'
            })
            .state('adm.novoUsuario', {
                url: 'novo-usuario',
                cache: false,
                templateUrl: 'views/usuario/novoUsuario.html',
                controller: 'usuarioCtrl'
            })
            .state('adm.editarUsuario', {
                url: 'editar-usuario',
                cache: false,
                templateUrl: 'views/usuario/editarUsuario.html',
                controller: 'usuarioCtrl'
            })
            .state('adm.slider', {
                url: 'slider',
                cache: false,
                templateUrl: 'views/slider.html',
                controller: 'sliderCtrl'
            })
            .state('adm.matricula', {
                url: 'matricula',
                templateUrl: 'views/matricula.html',
                cache: false,
                controller: 'matriculaCtrl'
            })
            .state('adm.contato', {
                url: 'contato',
                templateUrl: 'views/contato.html',
                cache: false,
                controller: 'contatoCtrl'
            })
            .state('adm.video', {
                url: 'video',
                templateUrl: 'views/video.html',
                cache: false,
                controller: 'videoCtrl'
            })
    }]);