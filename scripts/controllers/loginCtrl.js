'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('app')
    .controller('LoginCtrl', function ($scope, $timeout, LoginService, $state, localStorageService) {
        $scope.user = {email: "", senha: ""};

        $scope.loga = function (user) {
            if (user.email == undefined || user.email == "" || user.senha == undefined || user.senha == "") {
                swal("Ops", "Todos os campos são obrigatórios", "warning");
            } else {
                LoginService.login(user).success(function (result) {
                    try {
                        if (result[0].id_usuario > 0) {
                            $scope.setUsuario(result[0]);
                            $state.go("adm.dashboard");
                        } else {
                            swal("", "Dados incorretos", "error");
                        }
                    } catch (err) {
                        swal("", "Dados incorretos", "error");
                    }
                })

            }
        }

        $scope.setUsuario = function (user) {
            $scope.usuario = user;

            try {
                $scope.usuario.ligacao = angular.fromJson($scope.usuario.ligacao);
            } catch (err) {
                console.log(err);
            }

            localStorageService.set('usuario', angular.toJson(user));
        }

        $scope.getUsuario = function () {
            return angular.fromJson(localStorageService.get('usuario'));
        }
    });