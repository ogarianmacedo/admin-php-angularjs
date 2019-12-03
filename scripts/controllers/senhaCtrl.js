angular.module('app')
.controller('senhaCtrl', function($scope, SenhaService){

	$scope.texto = "Alterar Senha";

	$scope.novaSenha = {};

	$scope.insertSenha = function(novaSenha){

		if(novaSenha.senha == undefined || novaSenha.senha == ""){
			swal("Ops", "Obrigatório senha", "warning");
		}else{
			SenhaService.insert({'contato': novoContato}).success(function(result){
				console.log(result);

				if (result.indexOf('cadastrado_com_sucesso') !== -1) {
					$scope.listarSenha();
					swal("Pronto!", "Senha ok", "success");
				}else if(result.indexOf('nao_cadastrou') !== -1){
                    swal("Ops", "Não cadastrado", "warning");
                }else{
                    swal("Ops", "Ocorreu um erro, tente novamente mais tarde", "error");                    
                }
			})
		}

	}

	$scope.listagemSenha = [];

	$scope.listarSenha = function(){
		SenhaService.seleciona().success(function(result){
			console.log(result);
			$scope.listagemSenha = result;
		})
	}

	$scope.listarSenha();

})