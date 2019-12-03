angular.module('app')
.controller('calendarioCtrl', function($scope, CalendarioService, $http, $location, $state){

	$scope.texto = "Calendário Escolar";

	$scope.showForm = false;
	$scope.showFormulario = function(){
		$scope.showForm = !$scope.showForm;
		$scope.novoCalendario = {};
	}

	// Insere dados
	$scope.novoCalendario = {};

	$scope.insertCalendario = function(novoCalendario){
		if(novoCalendario.curso == undefined || novoCalendario.curso == "" || novoCalendario.ano == undefined || novoCalendario.ano == ""){
			
			swal("Ops", "Todos os dados são obrigatórios", "warning");

		}else{

			var input = document.getElementById('imagemCalendario');

			var file = input.files[0];

			var nomeOriginal = file.name;

			var arr = nomeOriginal.split(".");

			var extensao = arr[arr.length - 1];

			var novoNome= geraNome() + "." + extensao;

			novoCalendario.imagem = novoNome;

			var fd = new FormData();

			fd.append("file", file);
			fd.append("novo_nome", novoNome);

			$scope.uploading = true;

			CalendarioService.uploadFile(fd).success(function(result){

				$scope.uploading = false;

				console.log(result);

				if (result.indexOf("deu_bom") !== -1) {

					CalendarioService.insert ({'calendario': novoCalendario,}).success(function(result){
						console.log(result);

						if (result.indexOf('cadastrado_com_sucesso') !== -1) {

							$scope.listarCalendar();
							$scope.showForm = false;

							swal("Pronto!", "Calendário salvo com sucesso", "success");

						}else if(result.indesOf('nao_cadastrou') !== -1){
							swal("Ops", "Calendário não cadastrado", "warning");
						}else{
							swal("Ops", "Ocorreu um erro, tente novamente mais tarde", "error");
						}
					})

				}else{
					swal("Ops!", "Não foi possível realizar esta ação!", "error");
				}
			})
		}
	}

	// gera nome para arquivo imagem
	function geraNome(){
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for(var i = 0; i < 10; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	}

	// Lista dados
	$scope.listaCalendar = [];

	$scope.listarCalendar = function(){
		CalendarioService.selecionaCalendario().success(function(result){
			console.log(result);
			$scope.listaCalendar = result;
		})
	}

	$scope.listarCalendar();

	// Deleta dados
	$scope.deletaCalendar = function(calendario){
		swal({
            title: "",
            text: "Tem certeza que deseja excluir este calendário?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FF4436",
            confirmButtonText: "Sim!",
            closeOnConfirm: false
        },
        function(isConfirm){
            if(isConfirm){
                CalendarioService.delete({'id_calendario': calendario.id_calendario}).success(function(result){
                    console.log(result);
                    resultJson = angular.toJson(result);

                    if(resultJson.indexOf("excluido_com_sucesso") !== -1){  
                        $scope.listarCalendar(); 
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

	// Edita dados
	$scope.exibirEditar = function(list){
		console.log(list);
		$scope.novoCalendario = angular.copy(list);
		$scope.novoCalendario.editando = true;
		$scope.showForm = true;
	}

	$scope.editarCalendario = function(calendario){
		console.log(calendario)

		CalendarioService.update({'calendario': calendario}).success(function(result){

			console.log(result);
			resultJson = angular.toJson(result);
			if(resultJson.indexOf("alterado_com_sucesso") !== -1){
				swal('', 'Calendário editado com sucesso', 'success');
				$scope.listarCalendar();
				$scope.showForm = false;
			}else if (resultJson.indexOf("nao_alterou") !== -1){
                swal ('Ops', 'Não foi possível alterar', 'warning');
            }else{
                 swal('Ops', 'Ocorreu algum erro, tente novamente', 'error');
            }

		})

	}
 
})