angular.module('app').controller('cardapioCtrl', function($scope, $http, $location, $state, CardapioService){

    $scope.texto = "Cardápio Semanal";

    // SALVA CARDAPIO NO BANCO DE DADOS COM TITULO E NOME DA IMAGEM > FAZ UPLOAD IMAGEM NA PASTA UPLOAD/CARDAPIO
    $scope.novoCardapio = {};

    $scope.insertCardapio = function(novoCardapio){

        if (novoCardapio.imagem == "") {
            swal("Ops", "Selecione uma imagem", "warning");
        }else{

            var input = document.getElementById('imagemCardapio');

            var file = input.files[0];

            var nomeOriginal = file.name;

            var arr = nomeOriginal.split(".");

            var extensao = arr[arr.length - 1];

            var novoNome = geraNome() + "." + extensao;

            novoCardapio.imagem = novoNome;

            var fd = new FormData();

            fd.append("file", file);
            fd.append("novo_nome", novoNome);

            $scope.uploading = true;

            CardapioService.uploadFile(fd).success(function(result){
        
                $scope.uploading = false;
        
                console.log(result);
        
                if(result.indexOf("deu_bom") !== -1){

                    // swal("Ok","Arquivo salvo com sucesso!", "success");

                    CardapioService.insert({'cardapio': novoCardapio, }).success(function(result){
                        console.log(result);

                        if (result.indexOf('cadastrado_com_sucesso') !== -1){
                            $scope.listarCardapio();

                            swal("Pronto!", "Cardápio salvo com sucesso", "success");
                            
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

    // LISTA CARDAPIOS NA VIEW
    $scope.listaCardapio = [];

    $scope.listarCardapio = function(){
        CardapioService.selecionaCardapio().success(function(result){
            console.log(result);
            $scope.listaCardapio = result;
        })
    }

    $scope.listarCardapio();


    // Deleta Cardapio
    $scope.deletaCardapio = function(cardapio){
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
                CardapioService.delete({'id_cardapio': cardapio.id_cardapio}).success(function(result){
                    console.log(result); 
                    resultJson = angular.toJson(result);
                    
                    if(resultJson.indexOf("excluido_com_sucesso") !== -1){  
                        $scope.listarCardapio(); 
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

})