angular.module('app')
.controller('curriculoCtrl', function($scope, $http, $location, $state, CurriculoService){

	$scope.texto = "Currículos";

	$scope.showForm = false;
	$scope.showFormulario = function(){
		$scope.showForm = !$scope.showForm;
		$scope.novoCurriculo = {};
	}

	// Inserir dados
	$scope.novoCurriculo = {};

	$scope.insertCurriculo = function(novoCurriculo){

		if(novoCurriculo.nome == undefined || novoCurriculo.nome == "" || novoCurriculo.email == undefined || novoCurriculo.email == "" || novoCurriculo.telefone == undefined || novoCurriculo.telefone == "" ){

			swal("Ops", "Todos os dados são obrigatórios", "warning");

		}else{

			var input = document.getElementById('imagemCurriculo');

			var file = input.files[0];

			var nomeOriginal = file.name;

			var arr = nomeOriginal.split(".");

			var extensao = arr[arr.length - 1];

			var novoNome = geraNome() + "." + extensao;

			novoCurriculo.imagem = novoNome;

			var fd = new FormData();

			fd.append("file", file);
			fd.append("novo_nome", novoNome);

			$scope.uploading = true;

			CurriculoService.uploadFile(fd).success(function(result){

				$scope.uploading = false;

				console.log(result);

				if (result.indexOf("deu_bom") !== -1) {

					CurriculoService.insert({'curriculo': novoCurriculo}).success(function(result){
						console.log(result);

						if (result.indexOf('cadastrado_com_sucesso') !== -1) {

							$scope.listarCur();
							$scope.showForm = false;

							swal("Pronto!", "Curriculo enviado com sucesso", "success");
							
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

		for(var i = 0; i < 10; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	}

	// Listar dados
	$scope.listaCur = [];

	$scope.listarCur = function(){
		CurriculoService.seleciona().success(function(result){
			console.log(result);
			$scope.listaCur = result;
		})
	}

	$scope.listarCur();

	// Deletar dados
	$scope.deletaCur = function(curriculo){
        swal({
            title: "",
            text: "Tem certeza que deseja excluir este currículo?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FF4436",
            confirmButtonText: "Sim!",
            closeOnConfirm: false
        },
        function(isConfirm){
            if(isConfirm){
                CurriculoService.delete({'id_curriculo': curriculo.id_curriculo}).success(function(result){
                    console.log(result);
                    resultJson = angular.toJson(result);

                    if(resultJson.indexOf("excluido_com_sucesso") !== -1){  
                        $scope.listarCur(); 
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
		$scope.novoCurriculo = angular.copy(lista);
		$scope.novoCurriculo.editando = true;
		$scope.showForm = true;
	}

	$scope.editarCurriculo = function(curriculo){
		console.log(curriculo);
		CurriculoService.update({'curriculo': curriculo}).success(function(result){

			console.log(result);

			resultJson = angular.toJson(result);
			if (resultJson.indexOf("alterado_com_sucesso") !== -1) {
				swal('', 'Curriculo alterado com sucesso', 'success');
				$scope.listarCur();
				$scope.showForm = false;
			}else if (resultJson.indexOf("nao_alterou") !== -1){
                swal ('Ops', 'Não foi possível alterar', 'warning');
            }else{
                 swal('Ops', 'Ocorreu algum erro, tente novamente', 'error');
            }

		})
	}

})