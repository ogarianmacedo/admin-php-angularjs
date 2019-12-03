angular.module('app')
.controller('videoCtrl', function($scope, VideoService, $http, $location, $state){

	$scope.texto = "Vídeos"

    $scope.showForm = false;
    $scope.showFormulario = function(){
        $scope.showForm = !$scope.showForm;
        $scope.novoVideo = {};
    }

    // Salva dados
	$scope.novoVideo = {};

	$scope.insertVideo = function(novoVideo){
		if (novoVideo.titulo == undefined || novoVideo.titulo == "" || novoVideo.url == undefined || novoVideo.url == "") {

			swal("Ops", "Todos os dados são obrigatórios", "warning");

		}else{

			VideoService.insert({'video': novoVideo}).success(function(result){
				if (result.indexOf('cadastrado_com_sucesso') !== -1) {

					$scope.listarVideo();
                    $scope.showForm = false;

					swal("Pronto!", "Video salvo com sucesso", "success");

				}else if(result.indexOf('nao_cadastrou') !== -1){
                    swal("Ops", "Não cadastrado", "warning");
                }else{
                    swal("Ops", "Ocorreu um erro, tente novamente mais tarde", "error");                    
                }
			})

		}
	}


    // Lista dados
	$scope.listagemVideo = [];

	$scope.listarVideo = function(){
		VideoService.seleciona().success(function(result){
			console.log(result);

            $scope.listagemVideo = result;

            setTimeout(function() {

    			$scope.listagemVideo.forEach(function(item, key) {
                    $("#td_video_"+key).html(" <iframe width='250' height='155' src='https://www.youtube.com/embed/"+ item.url +"' frameborder='0' gesture='media' allow='encrypted-media' allowfullscreen></iframe> ");
                });

            }, 100);

		})
	}

	$scope.listarVideo();

    // Deleta dados
	$scope.deletaVideo = function(video){
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
    			VideoService.delete({'id_video': video.id_video}).success(function(result){
    				console.log(result);
    				resultJson = angular.toJson(result);

    				if (resultJson.indexOf("excluido_com_sucesso") !== -1) {
    					$scope.listarVideo();
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

    // Edita dados
    $scope.exibirEditar = function(lista){
        $scope.novoVideo = angular.copy(lista);
        $scope.novoVideo.editando = true;
        $scope.showForm = true;
    }

    $scope.editarVideo = function(video){
        VideoService.update({'video': video}).success(function(result){
            console.log(result);

            resultJson = angular.toJson(result);

            if (resultJson.indexOf("alterado_com_sucesso") !== -1) {
                swal('', 'Video alterado com sucesso', 'success');
                $scope.listarVideo();
                $scope.showForm = false;
            }else if (resultJson.indexOf("nao_alterou") !== -1){
                swal ('Ops', 'Não foi possível alterar', 'warning');
            }else{
                 swal('Ops', 'Ocorreu algum erro, tente novamente', 'error');
            }
        })
    }

})