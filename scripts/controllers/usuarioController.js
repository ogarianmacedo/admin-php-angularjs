angular.module('app').controller('usuarioController', function($scope, $http, $location, ColaboradorServices, $state) {

	$scope.listaColaborador = [];
	$scope.novoUsuario = {};
	
	$scope.listarColaborador = function () {
		ColaboradorServices.selecionaUsuarios().success(function(result){
			console.log(result);
			$scope.listaColaborador = result;
		});
	}
	
	$scope.listarColaborador();

	$scope.novoColaborador = function(){
		$state.go("adm.novoUsuario");	
	}

	$scope.deletaUsuario = function(usuario){
		swal({
			title: "",
			text: "Tem certeza que deseja excluir este usuário?",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#FF4436",
			confirmButtonText: "Sim!",
			closeOnConfirm: false
		},
		function(isConfirm){
			if (isConfirm) {
				ColaboradorServices.delete({'id_usuario': usuario.id_usuario}).success(function(result){
					 console.log(result); 
					resultJson = angular.toJson(result);
					
					if(resultJson.indexOf("excluido_com_sucesso") !== -1){	
						$scope.listarColaborador();	
						swal('', 'Excluido com sucesso.', 'success');						
					}else if(resultJson.indexOf("nao_excluiu") !== -1){				
						swal('Ops!', 'Não foi possível excluir.', 'warning');
					}else{
						swal('Ops!', 'Ocorreu algum erro, tente novamente.', 'error');						
					}
				});
			}
		});			
	}

	$scope.insertColaborador = function(novoUsuario){

		if(novoUsuario.nome == undefined || novoUsuario.nome == "" || novoUsuario.email == undefined || novoUsuario.email == "" || novoUsuario.senha == undefined || novoUsuario.senha == ""){

			swal("Ops", "Todos os dados são obrigatórios", "warning");

		}else if(novoUsuario.senha != novoUsuario.confirmaSenha){

			swal("Ops", "As senhas não conferem", "warning");

		// }else{		

		// 	var input = document.getElementById('imagemUsuario');
        
  //           var file = input.files[0];
        
  //           var nomeOriginal = file.name;
        
  //           var arr = nomeOriginal.split(".");
        
  //           var extensao = arr[arr.length - 1];
        
  //           var novoNome = geraNome() +"."+ extensao;

  //           novoUsuario.imagem = novoNome;
        
  //           var fd = new FormData();
        
  //           fd.append("file", file);
  //           fd.append("novo_nome", novoNome);
        
  //           $scope.uploading = true;    

		// 	ColaboradorServices.upload(fd).success(function(result){

		// 		$scope.uploading = false;

		// 		console.log(result);

		// 		if (result.indexOf("deu_bom") !== -1) {

					ColaboradorServices.insert({'usuario': novoUsuario}).success(function(result){
						console.log(result);
						console.log(novoUsuario);

						if(result.indexOf('cadastrado_com_sucesso') !== -1){
							swal('', 'Usuário cadastrado com sucesso', 'success');
							$state.go("adm.usuario");
							console.log(result);

						}else if(result.indexOf('nao_cadastrou') !== -1){
							swal("Ops", "Usuario não cadastrado", "warning");
							console.log(result);

						}else{
							swal("Ops", "Ocorreu um erro, tente novamente mais tarde", "error");					
						}
					})

			// 	}else{
   //                  swal("Ops!","Não foi possível realizar esta ação!", "error");
			// 	}

			// })
		}
	}

    function geraNome(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
        for( var i=0; i < 10; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
    
        return text;
    }

	$scope.showForm = false;
	$scope.hideAdd = true;

	$scope.exibirEditar = function(col){
		$scope.novoUsuario = angular.copy(col);
		$scope.showForm = true;
		$scope.hideAdd = false;
		console.log(col);
	}

	$scope.editarUsuario = function(usuario){
		console.log(usuario);

		ColaboradorServices.update({'usuario': usuario}).success(function(result){
			console.log(result);
			resultJson = angular.toJson(result);
			if (resultJson.indexOf("alterado_com_sucesso") !== -1) {
				swal('', 'Usuário alterado com sucesso', 'success');
				$scope.listarColaborador();
				$scope.showForm = false;
				$scope.hideAdd = true;
			}else if (resultJson.indexOf("nao_alterou") !== -1){
                swal ('Ops', 'Não foi possível alterar', 'warning');
            }else{
                 swal('Ops', 'Ocorreu algum erro, tente novamente', 'error');
            }
		})
	}

});
