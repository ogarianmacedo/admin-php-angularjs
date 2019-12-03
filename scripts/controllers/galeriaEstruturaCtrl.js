angular.module('app').controller('galeriaEstruturaCtrl', function($scope, $http, $location, $state, GaleriaService){

    $scope.texto = "Galeria";

    $scope.showForm = false;
    $scope.showFormulario = function(){
        $scope.showForm = !$scope.showForm;
        $scope.novaGaleria = {};
    }

    // SALVA GALERIA NO BANCO DE DADOS COM TITULO E NOME DA IMAGEM > FAZ UPLOAD IMAGEM NA PASTA UPLOAD/GALERIA
    $scope.novaGaleria = {};

    $scope.insertGaleria = function(novaGaleria){
        if (novaGaleria.titulo == undefined || novaGaleria.titulo == "") {

            swal("Ops", "Todos os dados são obrigatórios", "warning");

        }else{

            var input = document.getElementById('imagemGaleria');
        
            var file = input.files[0];
        
            var nomeOriginal = file.name;
        
            var arr = nomeOriginal.split(".");
        
            var extensao = arr[arr.length - 1];
        
            var novoNome = geraNome() +"."+ extensao;

            novaGaleria.imagem = novoNome;
        
            var fd = new FormData();
        
            fd.append("file", file);
            fd.append("novo_nome", novoNome);
        
            $scope.uploading = true;
        
            GaleriaService.uploadFile(fd).success(function(result){
        
                $scope.uploading = false;
        
                console.log(result);
        
                if(result.indexOf("deu_bom") !== -1){

                    // swal("Ok","Arquivo salvo com sucesso!", "success");

                    GaleriaService.insert({'galeria': novaGaleria, }).success(function(result){
                        console.log(result);

                        if (result.indexOf('cadastrado_com_sucesso') !== -1){

                            $scope.listarGaleria();
                            $scope.showForm = false;
                            $scope.novaGaleria = {};

                            swal("Pronto!", "Imagem salva com sucesso", "success");

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

    // LISTA GALERIA NA VIEW
    $scope.listaGaleria = [];

    $scope.listarGaleria = function(){
        GaleriaService.selecionaGaleria().success(function(result){
            console.log(result);
            $scope.listaGaleria = result;
        })
    }

    $scope.listarGaleria();

    // DELETA GALERIA
    $scope.deletaGaleria = function(galeria){
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
                GaleriaService.delete({'id_galeria': galeria.id_galeria}).success(function(result){
                    console.log(result);
                    resultJson = angular.toJson(result);

                    if(resultJson.indexOf("excluido_com_sucesso") !== -1){
                        $scope.listarGaleria();

                        swal('', 'Excluido com sucesso.', 'success');
                    }else if(resultJson.indexOf("nao_excluiu") !== -1){
                        swal('Ops!', 'Não foi possível excluir', 'warning');
                    }else{
                        swal('Ops!', 'Ocorreu algum erro, tente novamente.', 'erro');
                    }

                })
            }
        })
    }

    // Editar dados
    $scope.exibirEditar = function(lista){
        $scope.novaGaleria = angular.copy(lista);
        $scope.novaGaleria.editando = true;
        $scope.showForm = true;
    }

    $scope.editarGaleria = function(galeria){
        console.log(galeria);
        GaleriaService.update({'galeria': galeria}).success(function(result){

            console.log(result);

            resultJson = angular.toJson(result);
            if (resultJson.indexOf("alterado_com_sucesso") !== -1) {
                swal('', 'Alteração realizada', 'success');
                $scope.listarGaleria();
                $scope.showForm = false;
            }else if(resultJson.indexOf("nao_alterou") !== -1){
                swal('Ops', 'Não foi possível alterar', 'warning');
            }else{
                swal('Ops', 'Ocorreu um erro, tente novamente', 'error');
            }

        })
    }


});