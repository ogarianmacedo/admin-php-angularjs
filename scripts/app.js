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
.config(['$stateProvider','$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider,$locationProvider) {
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

  .state('adm.lead', {
    url: "lead",
    templateUrl: "views/lead.html",
    controller: "LeadCtrl"
  })  
  
  .state('adm.usuario', {
    url: 'usuario',
    cache: false,
    templateUrl : 'views/usuario/usuario.html',
    controller  : 'usuarioController'
  })

  .state('adm.novoUsuario', {
    url: 'novo-usuario',
    cache: false,
    templateUrl : 'views/usuario/novoUsuario.html',
    controller  : 'usuarioController'
  })

  .state('adm.editarUsuario',{
    url: 'editar-usuario',
    cache: false,
    templateUrl: 'views/usuario/editarUsuario.html',
    controller: 'usuarioController'
  })

  // Adicionado
  .state('adm.slider',{
    url: 'slider',
    cache: false,
    templateUrl: 'views/slider.html',
    controller: 'sliderCtrl'
  })

  .state('adm.galeriaEstrutura',{
    url:  'galeriaEstrutura',
    templateUrl: 'views/galeriaEstrutura.html',
    cache:  false,
    controller: 'galeriaEstruturaCtrl'
  })

  .state('adm.matricula',{
    url:  'matricula',
    templateUrl: 'views/matricula.html',
    cache:  false,
    controller: 'matriculaCtrl'
  })

  .state('adm.evento',{
    url:  'evento',
    templateUrl: 'views/evento.html',
    cache:  false,
    controller: 'eventoCtrl'
  })

  .state('adm.noticia',{
    url:'noticia',
    templateUrl: 'views/noticia.html',
    cache: false,
    controller: 'noticiaCtrl'
  })

  .state('adm.cardapio',{
    url: 'cardapio',
    templateUrl: 'views/cardapio.html',
    cache: false,
    controller: 'cardapioCtrl'
  })

  .state('adm.contato',{
    url: 'contato',
    templateUrl: 'views/contato.html',
    cache: false,
    controller: 'contatoCtrl'
  })

  .state('adm.calendario',{
    url: 'calendario',
    templateUrl: 'views/calendario.html',
    cache: false,
    controller: 'calendarioCtrl'
  })

  .state('adm.curriculo',{
    url: 'curriculo',
    templateUrl: 'views/curriculo.html',
    cache: false,
    controller: 'curriculoCtrl'
  })

  .state('adm.video',{
    url: 'video',
    templateUrl: 'views/video.html',
    cache: false,
    controller: 'videoCtrl'
  })

  .state('adm.senha',{
    url: 'senha',
    templateUrl: 'views/senha.html',
    cache: false,
    controller: 'senhaCtrl'
  })

  .state('adm.rotina',{
    url: 'rotina',
    templateUrl: 'views/rotina.html',
    cache: false,
    controller: 'rotinaCtrl'
  })

}]);