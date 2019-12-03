angular.module('app').controller('eventoCtrl', function($scope, $http, $location, $state, EventoService){

    $scope.texto = "Eventos";

    $scope.showForm = false;
    $scope.showFormulario = function(){
        $scope.showForm = !$scope.showForm;
        $scope.novoEvento = {};
    }

    // SALVA EVENTO NO BANCO DE DADOS COM TITULO E NOME DA IMAGEM > FAZ UPLOAD IMAGEM NA PASTA UPLOAD/EVENTO
    $scope.novoEvento = {};

    $scope.insertEvento = function(novoEvento){
        if (novoEvento.titulo == undefined || novoEvento.titulo == "" || novoEvento.descricao == undefined || novoEvento.descricao == "") {

            swal("Ops", "Todos os dados são obrigatórios", "warning");

        }else{

            var input = document.getElementById('imagemEvento');
        
            var file = input.files[0];
        
            var nomeOriginal = file.name;
        
            var arr = nomeOriginal.split(".");
        
            var extensao = arr[arr.length - 1];
        
            var novoNome = geraNome() +"."+ extensao;

            novoEvento.imagem = novoNome;
        
            var fd = new FormData();
        
            fd.append("file", file);
            fd.append("novo_nome", novoNome);
        
            $scope.uploading = true;    

            EventoService.uploadFile(fd).success(function(result){
        
                $scope.uploading = false;
        
                console.log(result);
        
                if(result.indexOf("deu_bom") !== -1){

                    // swal("Ok","Arquivo salvo com sucesso!", "success");

                    EventoService.insert({'evento': novoEvento, }).success(function(result){
                        console.log(result);

                        if (result.indexOf('cadastrado_com_sucesso') !== -1){

                            $scope.listarEvento();
                            $scope.showForm = false;

                            swal("Pronto!", "Evento salvo com sucesso", "success");

                        }else if(result.indexOf('nao_cadastrou') !== -1){
                            swal("Ops", "Evento não cadastrado", "warning");
                        }else{
                            swal("Ops", "Ocorreu um erro, tente novamente mais tarde", "error");                    
                        }
                    })

                }else{
                    swal("Ops!","Não foi possível realizar esta ação!", "error");
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

    // LISTA EVENTOS NA VIEW
    $scope.listaEvento = [];

    $scope.listarEvento = function(){
        EventoService.selecionaEvento().success(function(result){
            console.log(result);
            $scope.listaEvento = result;
        })
    }

    $scope.listarEvento();


    // Exclui Evento
    $scope.deletaEvento = function(evento){
        swal({
            title: "",
            text: "Tem certeza que deseja excluir este evento?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FF4436",
            confirmButtonText: "Sim!",
            closeOnConfirm: false
        },
        function(isConfirm){
            if(isConfirm){
                EventoService.delete({'id_evento': evento.id_evento}).success(function(result){
                    console.log(result);
                    resultJson = angular.toJson(result);

                    if(resultJson.indexOf("excluido_com_sucesso") !== -1){  
                        $scope.listarEvento(); 
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

    // Edita evento
    $scope.exibirEditar = function(list){
        $scope.novoEvento = angular.copy(list);
        $scope.novoEvento.editando = true;
        $scope.showForm = true;
    }

    $scope.editarEvento = function(evento){

        EventoService.update({'evento': evento}).success(function(result){

            resultJson = angular.toJson(result);
            if (resultJson.indexOf("alterado_com_sucesso") !== -1) {
                swal('', 'Evento alterado com sucesso', 'success');
                $scope.listarEvento();
                $scope.showForm = false;
            }else if (resultJson.indexOf("nao_alterou") !== -1){
                swal ('Ops', 'Não foi possível alterar', 'warning');
            }else{
                 swal('Ops', 'Ocorreu algum erro, tente novamente', 'error');
            }

        })
    }

    $scope.showModal = false;

    $scope.modalEvento = function(lista){
        $scope.detalhe = angular.copy(lista)
        $scope.showModal = true;
    }

})