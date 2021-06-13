'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('app')
    .controller('AdmCtrl', function ($scope, localStorageService, Utils, $state, $rootScope) {
        $scope.baseUrlImagem = 'http://localhost:8080/assets/upload';

        $scope.usuario = angular.fromJson(localStorageService.get('usuario'));

        $scope.routeName = $state.current.name;

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $scope.routeName = toState.name;
        })

        if (!$scope.usuario) {
            $state.go("login");
        }

        $scope.sairDashboard = function () {
            $scope.usuario = null;
            localStorageService.set('usuario', null);
            $state.go("login");

        }

        $scope.getUsuario = function () {
            return angular.fromJson(localStorageService.get('usuario'));
        }

        if ($scope.getUsuario() == null) {
            $state.go("login");
        }

        $scope.setUsuario = function (user) {
            $scope.usuario = user;

            try {
                $scope.usuario.ligacao = angular.fromJson($scope.usuario.ligacao);
            } catch (err) {
            }

            localStorageService.set('usuario', angular.toJson(user));
        }

        function isEmpty(val) {
            if (val == undefined || val.length == 0 || val == "") {
                return true;
            }
            return false;
        }
    });