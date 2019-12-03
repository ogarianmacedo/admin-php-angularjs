angular.module('app').controller('contatoCtrl',function($scope, ContatoService){

    $scope.texto = "Contato";

    $scope.showForm = false;
    $scope.showFormulario = function(){
        $scope.showForm = !$scope.showForm;
        $scope.novoContato = {};
    }

    // Adiciona dados
    $scope.novoContato = {};

    $scope.insertContato = function(novoContato){

    	if (novoContato.email == undefined || novoContato.email == "") {
    		
    		swal("Ops", "Todos os dados são obrigatórios", "warning");

    	}else{

    		ContatoService.insert({'contato': novoContato}).success(function(result){
    			console.log(result);

    			if (result.indexOf('cadastrado_com_sucesso') !== -1) {
    				$scope.listarCont();
                    $scope.showForm = false;

    				swal("Pronto!", "Pré-matrícula salva com sucesso", "success");

    			}else if(result.indexOf('nao_cadastrou') !== -1){
                    swal("Ops", "Não cadastrado", "warning");
                }else{
                    swal("Ops", "Ocorreu um erro, tente novamente mais tarde", "error");                    
                }
    		})

    	}

    }

    // Lista dados
    $scope.listagemCont = [];

    $scope.listarCont = function(){
    	ContatoService.selecionaContato().success(function(result){
    		console.log(result);
    		$scope.listagemCont = result;
    	})
    }

    $scope.listarCont();

    // Deleta dados
   $scope.deletarCont = function(contato){
    	swal({
    		title: "",
            text: "Tem certeza que deseja excluir?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FF4436",
            confirmButtonText: "Sim!",
            closeOnConfirm: false
    	}, function(isConfirm){
    		if(isConfirm){
    			ContatoService.delete({'id_contato': contato.id_contato}).success(function(result){
    				console.log(result);
    				resultJson = angular.toJson(result);

    				if (resultJson.indexOf("excluido_com_sucesso") !== -1) {
    					$scope.listarCont();
    					swal('', 'Excluido com sucesso', 'success');
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
    $scope.exibirEditar = function(cont){
        $scope.novoContato = angular.copy(cont);
        $scope.novoContato.editando = true;
        $scope.showForm = true;
    }

    $scope.editarContato = function(contato){
        console.log(contato);
        ContatoService.update({'contato': contato}).success(function(result){

            console.log(result);

            resultJson = angular.toJson(result);
            if(resultJson.indexOf("alterado_com_sucesso") !== -1){
                swal('', 'Contato alterado com sucesso', 'success');
                $scope.listarCont();
                $scope.showForm = false;
            }else if(resultJson.indexOf("nao_alterou") !== -1){
                swal('Ops', 'Não foi possível alterar', 'warning');
            }else{
                swal('Ops', 'Ocorreu um erro, tente novamnete', 'error');
            }

        });
    }

})