angular.module('app').controller('noticiaCtrl', function($scope, $http, $location, $state, NoticiaService){

    $scope.texto = "Notícias";

    $scope.showForm = false;
    $scope.showFormulario = function(){
        $scope.showForm = !$scope.showForm;
        $scope.novaNoticia = {};
    }

    // SALVA NOTICIA NO BANCO DE DADOS COM TITULO E NOME DA IMAGEM > FAZ UPLOAD IMAGEM NA PASTA UPLOAD/NOTICIA
    $scope.novaNoticia = {};

    $scope.insertNoticia = function(novaNoticia){
        if(novaNoticia.titulo == undefined || novaNoticia.titulo == "" || novaNoticia.descricao == undefined || novaNoticia.descricao == ""){

            swal("Ops", "Todos os dados são obrigatórios", "warning");

        }else{

            var input = document.getElementById('imagemNoticia');
        
            var file = input.files[0];
        
            var nomeOriginal = file.name;
        
            var arr = nomeOriginal.split(".");
        
            var extensao = arr[arr.length - 1];
        
            var novoNome = geraNome() +"."+ extensao;

            novaNoticia.imagem = novoNome;
        
            var fd = new FormData();
        
            fd.append("file", file);
            fd.append("novo_nome", novoNome);
        
            $scope.uploading = true;

            NoticiaService.uploadFile(fd).success(function(result){
        
                $scope.uploading = false;
        
                if(result.indexOf("deu_bom") !== -1){

                    //swal("Ok","Arquivo salvo com sucesso!", "success");

                    NoticiaService.insert({'noticia': novaNoticia, }).success(function(result){
                        console.log(result);

                        if (result.indexOf('cadastrado_com_sucesso') !== -1){

                            $scope.listarNoticia();
                            $scope.showForm = false;

                            swal("Pronto!", "Notícia salva com sucesso", "success");

                        }else if(result.indexOf('nao_cadastrou') !== -1){
                            swal("Ops", "Usuario não cadastrado", "warning");
                        }else{
                            swal("Ops", "Ocorreu um erro, tente novamente mais tarde", "error");                    
                        }
                    })

                }else{
                    swal("Ops!","Não foi possivel realizar esta ação!", "error");
                }
            })

        }
    }

    function geraNome(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
        for( var i=0; i < 10; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
    
        return text;
    }

    // LISTA NOTICIAS NA VIEW
    $scope.listaNoticia = [];

    $scope.listarNoticia = function(){
        NoticiaService.selecionaNoticia().success(function(result){
            $scope.listaNoticia = result;
        })
    } 

    $scope.listarNoticia();


    // Deleta Noticia
    $scope.deletaNoticia = function(noticia){
        swal({
            title: "",
            text: "Tem certeza que deseja excluir esta imagem?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FF4436",
            confirmButtonText: "Sim!",
            closeOnConfirm: false
        },
        function(isConfirm){
            if(isConfirm){
                NoticiaService.delete({'id_noticia': noticia.id_noticia}).success(function(result){
                    resultJson = angular.toJson(result);
                    
                    if(resultJson.indexOf("excluido_com_sucesso") !== -1){  
                        $scope.listarNoticia(); 
                        swal('', 'Excluido com sucesso.', 'success');                       
                    }else if(resultJson.indexOf("nao_excluiu") !== -1){             
                        swal('Ops!', 'Não foi possível excluir.', 'warning');
                    }else{
                        swal('Ops!', 'Ocorreu algum erro, tente novamente.', 'error');                      
                    }
                })
            }
        })
    }

    // Editar dados
    $scope.exibirEditar = function(lista){
        $scope.novaNoticia = angular.copy(lista);
        $scope.novaNoticia.editando = true;
        $scope.showForm = true;
    }

    $scope.editarNoticia = function(noticia){
        console.log(noticia);
        NoticiaService.update({'noticia': noticia}).success(function(result){

            resultJson = angular.toJson(result);
            if (resultJson.indexOf("alterado_com_sucesso") !== -1) {
                swal('', 'Notícia alterada com sucesso', 'success');
                $scope.listarNoticia();
                $scope.showForm = false;
            }else if (resultJson.indexOf("nao_alterou") !== -1){
                swal ('Ops', 'Não foi possível alterar', 'warning');
            }else{
                 swal('Ops', 'Ocorreu algum erro, tente novamente', 'error');
            }

        });

    }


    $scope.showDetalhe = false;

    $scope.modalNoticia = function(lista){
        $scope.detalhe = angular.copy(lista);
        $scope.showDetalhe = true;
    }

})