angular
.module('app')

.factory('LeadService', function ($http,Utils) {

    var data = {};

    data.select = function(params){
        return $http.post(Utils.baseUrlService+'lead/select.php', params)
    }   
    
    data.insert = function(params){
        return $http.post(Utils.baseUrlService+'lead/insert.php', params);
    }   

    data.update = function(params){
        return $http.post(Utils.baseUrlService+'lead/update.php', params);
    }

    data.delete = function(params){
        return $http.post(Utils.baseUrlService+'lead/delete.php', params)
    } 

    return data;

})

.factory("ColaboradorServices",  function($http, Utils) {

    this.selecionaUsuarios = function(params) {
        return $http.post(Utils.baseUrlService + 'usuario/selecionaUsuarios.php', params);
    };

    this.insert = function(params) {
        return $http.post(Utils.baseUrlService + 'usuario/insert.php', params);
    };

    this.delete = function(params) {
        return $http.post(Utils.baseUrlService + 'usuario/delete.php', params);
    };

    this.update = function(params){
        return $http.post(Utils.baseUrlService + 'usuario/update.php', params);
    }

    this.upload = function(fd){
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

.factory('Utils', function($http) {

    this.baseUrl = "http://localhost/adm_angularjs/";

    this.baseUrlService = this.baseUrl + "service/";

    this.paramsPost = {headers: {'Content-Type': undefined }, transformRequest: angular.identity};
    return this;

})

// ADICIONADOS
.factory("SliderService", function ($http, Utils, $state) {

    this.uploadFile = function(fd){
        return $http.post(Utils.baseUrlService+'slider/upload.php', fd, Utils.paramsPost);
    } 

    this.insert = function(params){
        return $http.post(Utils.baseUrlService + 'slider/insert.php', params);
    }

    this.selecionaSlider = function(params){
        return $http.post(Utils.baseUrlService + 'slider/selecionaSlider.php', params);
    }

    this.delete = function(params){
        return $http.post(Utils.baseUrlService + 'slider/delete.php', params);
    }

    this.update = function(params){
        return $http.post(Utils.baseUrlService + 'slider/update.php', params);
    }

    return this;
    
})

.factory("GaleriaService", function ($http, Utils, $state){

    this.uploadFile = function(fd){
        return $http.post(Utils.baseUrlService + 'galeria/upload.php', fd, Utils.paramsPost);
    }

    this.insert = function(params){
        return $http.post(Utils.baseUrlService + 'galeria/insert.php', params);
    }

    this.selecionaGaleria = function(params){
        return $http.post(Utils.baseUrlService + 'galeria/selecionaGaleria.php', params);
    }

    this.delete = function(params){
        return $http.post(Utils.baseUrlService + 'galeria/deleta.php', params);
    }

    this.update = function(params){
        return $http.post(Utils.baseUrlService + 'galeria/update.php', params);
    }

    return this;

})

.factory("EventoService", function($http, Utils, $state){

    this.uploadFile = function(fd){
        return $http.post(Utils.baseUrlService + 'evento/upload.php', fd, Utils.paramsPost);
    }

    this.insert = function(params){
        return $http.post(Utils.baseUrlService + 'evento/insert.php', params);
    }

    this.selecionaEvento = function(params){
        return $http.post(Utils.baseUrlService + 'evento/selecionaEvento.php', params);
    }

    this.delete = function(params){
        return $http.post(Utils.baseUrlService + 'evento/deleta.php', params);
    }

    this.update = function(params){
        return $http.post(Utils.baseUrlService + 'evento/update.php', params);
    }

    return this;

})

.factory("NoticiaService", function($http, Utils, $state){

    this.uploadFile = function(fd){
        return $http.post(Utils.baseUrlService + 'noticia/upload.php', fd, Utils.paramsPost);
    }

    this.insert = function(params){
        return $http.post(Utils.baseUrlService + 'noticia/insert.php', params);
    }

    this.selecionaNoticia = function(params){
        return $http.post(Utils.baseUrlService + 'noticia/selecionaNoticia.php', params);
    }

    this.delete = function(params){
        return $http.post(Utils.baseUrlService + 'noticia/deleta.php', params);
    }

    this.update = function(params){
        return $http.post(Utils.baseUrlService + 'noticia/update.php', params);
    }

    return this;

})

.factory("CardapioService", function($http, Utils, $state){

    this.uploadFile = function(fd){
        return $http.post(Utils.baseUrlService + 'cardapio/upload.php', fd, Utils.paramsPost);
    }

    this.insert = function(params){
        return $http.post(Utils.baseUrlService + 'cardapio/insert.php', params);
    }

    this.selecionaCardapio = function(params){
        return $http.post(Utils.baseUrlService + 'cardapio/selecionaCardapio.php', params);
    }

    this.delete = function(params){
        return $http.post(Utils.baseUrlService + 'cardapio/deleta.php', params);
    }
    
    return this;

})

.factory("MatriculaService", function ($http, Utils, $state){

    this.insert = function(params){
        return $http.post(Utils.baseUrlService + 'matricula/insert.php', params);
    }

    this.selecionaMatricula = function(params){
        return $http.post(Utils.baseUrlService + 'matricula/selecionaMatricula.php', params);
    }

    this.delete = function(params){
        return $http.post(Utils.baseUrlService + 'matricula/delete.php', params);
    }

    this.update = function(params){
        return $http.post(Utils.baseUrlService + 'matricula/update.php', params);
    }

    return this;

})

.factory("ContatoService", function($http, Utils, $state){

    this.insert = function(params){
        return $http.post(Utils.baseUrlService + 'contato/insert.php', params);
    }

    this.selecionaContato = function(params){
        return $http.post(Utils.baseUrlService + 'contato/selecionaContato.php', params);
    }

    this.delete = function(params){
        return $http.post(Utils.baseUrlService + 'contato/delete.php', params);
    }

    this.update = function(params){
        return $http.post(Utils.baseUrlService + 'contato/update.php', params);
    }

    return this;

})

.factory("CalendarioService", function($http, Utils, $state){

    this.uploadFile = function(fd){
        return $http.post(Utils.baseUrlService + 'calendario/upload.php', fd, Utils.paramsPost);
    }

    this.insert = function(params){
        return $http.post(Utils.baseUrlService + 'calendario/insert.php', params);
    }

    this.selecionaCalendario = function(params){
        return $http.post(Utils.baseUrlService + 'calendario/selecionaCalendario.php', params);
    }

    this.delete = function(params){
        return $http.post(Utils.baseUrlService + 'calendario/delete.php', params);
    }

    this.update = function(params){
        return $http.post(Utils.baseUrlService + 'calendario/update.php', params);
    }

    return this;

})

.factory("CurriculoService", function($http, Utils, $state){

    this.uploadFile = function(fd){
        return $http.post(Utils.baseUrlService + 'curriculo/upload.php', fd, Utils.paramsPost);
    }

    this.insert = function(params){
        return $http.post(Utils.baseUrlService + 'curriculo/insert.php', params);
    }

    this.seleciona = function(params){
        return $http.post(Utils.baseUrlService + 'curriculo/seleciona.php', params);
    }

    this.delete = function(params){
        return $http.post(Utils.baseUrlService + 'curriculo/delete.php', params);
    }

    this.update = function(params){
        return $http.post(Utils.baseUrlService + 'curriculo/update.php', params);
    }

    return this;
})

.factory("VideoService", function($http, Utils, $state){

    this.insert = function(params){
        return $http.post(Utils.baseUrlService + 'video/insert.php', params);
    }

    this.seleciona = function(params){
        return $http.post(Utils.baseUrlService + 'video/seleciona.php', params);
    }

    this.delete = function(params){
        return $http.post(Utils.baseUrlService + 'video/delete.php', params);
    }

    this.update = function(params){
        return $http.post(Utils.baseUrlService + 'video/update.php', params);
    }

    return this;

})

.factory("SenhaService", function($http, Utils, $state){

    this.inserty = function(params){
        return $http.post(Utils.baseUrlService + 'senha/insert.php', params);
    }

    this.seleciona = function(params){
        return $http.post(Utils.baseUrlService + 'senha/seleciona.php', params);
    }

    this.delete = function(params){
        return $http.post(Utils.baseUrlService + 'senha/delete.php', params);
    }

    return this;

})

.factory("RotinaService", function($http, Utils, $state){

    this.uploadFile = function(fd){
        return $http.post(Utils.baseUrlService + 'rotina/upload.php', fd, Utils.paramsPost);
    }

    this.insert = function(params){
        return $http.post(Utils.baseUrlService + 'rotina/insert.php', params);
    }

    this.seleciona = function(params){
        return $http.post(Utils.baseUrlService + 'rotina/seleciona.php', params);
    }

    this.delete = function(params){
        return $http.post(Utils.baseUrlService + 'rotina/deleta.php', params);
    }
    
    return this;

})