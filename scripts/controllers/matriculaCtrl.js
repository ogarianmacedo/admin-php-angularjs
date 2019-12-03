angular.module('app').controller('matriculaCtrl', function($scope, $http, $location, $state, MatriculaService){


    $scope.texto = "Pré-matrícula";

    $scope.showForm = false;
    $scope.showFormulario = function(){
        $scope.showForm = !$scope.showForm;
        $scope.novaMatricula = {};
    }

	// Inserir dados de pré-matrícula no banco
    $scope.novaMatricula = {};

    $scope.insertMatricula = function(novaMatricula){

    	if(novaMatricula.nome  == undefined || novaMatricula.nome == "" || novaMatricula.email == undefined || novaMatricula.email == "" || novaMatricula.telefone == undefined  || novaMatricula.telefone == "" || novaMatricula.idade == undefined ||novaMatricula.idade == ""){

    		swal("Ops", "Todos os dados são obrigatórios", "warning");

    	}else{

    		MatriculaService.insert({'matricula': novaMatricula}).success(function(result){

    			console.log(result);

    			if(result.indexOf('cadastrado_com_sucesso') !==  -1){

    				$scope.listarPre();
                    $scope.showForm = false;
                    $scope.novaMatricula = {};

                    swal("Muito bem!", "Inscrição realizada!", "success");

    			}else if(result.indexOf('nao_cadastrou') !== -1){
                    swal("Ops", "Inscrição não cadastrada", "warning");
                }else{
                    swal("Ops", "Ocorreu um erro, tente novamente mais tarde", "error");                    
                }

    		})

    	}

    }

    // Listar dados
    $scope.listagemPre = [];

    $scope.listarPre = function(){
    	MatriculaService.selecionaMatricula().success(function(result){
    		console.log(result);
    		$scope.listagemPre = result;
    	})
    }

    $scope.listarPre();

    // Deletar dados
    $scope.deletarPre = function(matricula){
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
    			MatriculaService.delete({'id_matricula': matricula.id_matricula}).success(function(result){
    				console.log(result);
    				resultJson = angular.toJson(result);

    				if (resultJson.indexOf("excluido_com_sucesso") !== -1) {
    					$scope.listarPre();
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
    $scope.exibirEditar = function(mat){
        $scope.novaMatricula = angular.copy(mat);
        $scope.novaMatricula.editando = true;
        $scope.showForm = true;
    }

    $scope.editarMatricula = function(matricula){
        console.log(matricula);
        MatriculaService.update({'matricula': matricula}).success(function(result){

            console.log(result);

            resultJson = angular.toJson(result);
            if(resultJson.indexOf("alterado_com_sucesso") !== -1){
                swal('', 'Pré-matrícula alterada com sucesso', 'success');
                $scope.listarPre();
                $scope.showForm = false;
            }else if(resultJson.indexOf("nao_alterou") !==-1){
                swal('Ops', 'Não foi possível alterar', 'warning');
            }else{
                swal('Ops', 'Ocorreu algum erro, tente novamente', 'error');
            }

        }); 
    }


    $scope.ordenarPor =  function(campo){
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    }

    $scope.camisas = [
        {tamanho: "P"},
        {tamanho: "M"},
        {tamanho: "G"},
        {tamanho: "GG"},
    ]

    $scope.equipes = [
        {modo: "Solo"},
        {modo: "Dupla"},
        {modo: "Trio"},
        {modo: "Quarteto"},
        {modo: "Quinteto"}       
    ]

    $scope.percursos = [
        {km: "51km"},
        {km: "21km"},
        {km: "10km"},
        {km: "6km"},
    ]

})