angular.module('app').controller('rotinaCtrl', function($scope, $http, $location, $state, RotinaService){

    $scope.texto = "Rotina";

    // SALVA NO BANCO DE DADOS COM TITULO E NOME DA IMAGEM > FAZ UPLOAD IMAGEM NA PASTA UPLOAD/CARDAPIO
    $scope.novaRotina = {};

    $scope.insertRotina = function(novaRotina){

        if (novaRotina.imagem == "") {
            swal("Ops", "Selecione uma imagem", "warning");
        }else{

            var input = document.getElementById('imagemRotina');

            var file = input.files[0];

            var nomeOriginal = file.name;

            var arr = nomeOriginal.split(".");

            var extensao = arr[arr.length - 1];

            var novoNome = geraNome() + "." + extensao;

            novaRotina.imagem = novoNome;

            var fd = new FormData();

            fd.append("file", file);
            fd.append("novo_nome", novoNome);

            $scope.uploading = true;

            RotinaService.uploadFile(fd).success(function(result){
        
                $scope.uploading = false;
        
                console.log(result);
        
                if(result.indexOf("deu_bom") !== -1){

                    // swal("Ok","Arquivo salvo com sucesso!", "success");

                    RotinaService.insert({'rotina': novaRotina, }).success(function(result){
                        console.log(result);

                        if (result.indexOf('cadastrado_com_sucesso') !== -1){
                            $scope.listarRotina();

                            swal("Pronto!", "Rotina salvo com sucesso", "success");
                            
                        }else if(result.indexOf('nao_cadastrou') !== -1){
                            swal("Ops", "Rotina não cadastrado", "warning");
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
    $scope.listaRotina = [];

    $scope.listarRotina = function(){
        RotinaService.seleciona().success(function(result){
            console.log(result);
            $scope.listaRotina = result;
        })
    }

    $scope.listarRotina();


    // Deleta Cardapio
    $scope.deletaRotina = function(rotina){
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
                RotinaService.delete({'id_rotina': rotina.id_rotina}).success(function(result){
                    console.log(result); 
                    resultJson = angular.toJson(result);
                    
                    if(resultJson.indexOf("excluido_com_sucesso") !== -1){  
                        $scope.listarRotina(); 
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