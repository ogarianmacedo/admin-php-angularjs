angular
    .module('app')
    .factory("ColaboradorServices", function ($http, Utils) {
        this.selecionaUsuarios = function (params) {
            return $http.post(Utils.baseUrlService + 'usuario/selecionaUsuarios.php', params);
        };

        this.insert = function (params) {
            return $http.post(Utils.baseUrlService + 'usuario/insert.php', params);
        };

        this.delete = function (params) {
            return $http.post(Utils.baseUrlService + 'usuario/delete.php', params);
        };

        this.update = function (params) {
            return $http.post(Utils.baseUrlService + 'usuario/update.php', params);
        }

        this.upload = function (fd) {
            return $http.post(Utils.baseUrlService + 'usuario/upload.php', fd, Utils.paramsPost);
        }

        return this;
    })
    .factory("LoginService", function ($http, Utils, $state) {
        this.login = function (params) {
            return $http.post(Utils.baseUrlService + 'login.php', params);
        }

        return this;
    })
    .factory('Utils', function ($http) {
        this.baseUrl = "/";

        this.baseUrlService = this.baseUrl + "service/";

        this.paramsPost = {headers: {'Content-Type': undefined}, transformRequest: angular.identity};

        return this;
    })
    .factory("SliderService", function ($http, Utils, $state) {
        this.uploadFile = function (fd) {
            return $http.post(Utils.baseUrlService + 'slider/upload.php', fd, Utils.paramsPost);
        }

        this.insert = function (params) {
            return $http.post(Utils.baseUrlService + 'slider/insert.php', params);
        }

        this.selecionaSlider = function (params) {
            return $http.post(Utils.baseUrlService + 'slider/selecionaSlider.php', params);
        }

        this.delete = function (params) {
            return $http.post(Utils.baseUrlService + 'slider/delete.php', params);
        }

        this.update = function (params) {
            return $http.post(Utils.baseUrlService + 'slider/update.php', params);
        }

        return this;
    })
    .factory("MatriculaService", function ($http, Utils, $state) {
        this.insert = function (params) {
            return $http.post(Utils.baseUrlService + 'matricula/insert.php', params);
        }

        this.selecionaMatricula = function (params) {
            return $http.post(Utils.baseUrlService + 'matricula/selecionaMatricula.php', params);
        }

        this.delete = function (params) {
            return $http.post(Utils.baseUrlService + 'matricula/delete.php', params);
        }

        this.update = function (params) {
            return $http.post(Utils.baseUrlService + 'matricula/update.php', params);
        }

        return this;
    })
    .factory("ContatoService", function ($http, Utils, $state) {
        this.insert = function (params) {
            return $http.post(Utils.baseUrlService + 'contato/insert.php', params);
        }

        this.selecionaContato = function (params) {
            return $http.post(Utils.baseUrlService + 'contato/selecionaContato.php', params);
        }

        this.delete = function (params) {
            return $http.post(Utils.baseUrlService + 'contato/delete.php', params);
        }

        this.update = function (params) {
            return $http.post(Utils.baseUrlService + 'contato/update.php', params);
        }

        return this;
    })
    .factory("VideoService", function ($http, Utils, $state) {
        this.insert = function (params) {
            return $http.post(Utils.baseUrlService + 'video/insert.php', params);
        }

        this.seleciona = function (params) {
            return $http.post(Utils.baseUrlService + 'video/seleciona.php', params);
        }

        this.delete = function (params) {
            return $http.post(Utils.baseUrlService + 'video/delete.php', params);
        }

        this.update = function (params) {
            return $http.post(Utils.baseUrlService + 'video/update.php', params);
        }

        return this;
    })
    