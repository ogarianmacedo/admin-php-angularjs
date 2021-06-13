angular.module('app')
    .controller('sliderCtrl', function ($scope, $http, $location, $state, SliderService) {
        $scope.texto = "Inicial";

        $scope.showForm = false;
        $scope.showFormulario = function () {
            $scope.showForm = !$scope.showForm;
            $scope.novoSlider = {};
        }

        $scope.novoSlider = {};
        $scope.insertSlider = function (novoSlider) {
            if (novoSlider.imagem == "") {
                swal("Ops", "Todos os dados são obrigatórios", "warning");
            } else {
                var input = document.getElementById('imagemSlider');
                var file = input.files[0];
                var nomeOriginal = file.name;
                var arr = nomeOriginal.split(".");
                var extensao = arr[arr.length - 1];
                var novoNome = geraNome() + "." + extensao;

                novoSlider.imagem = novoNome;
                var fd = new FormData();
                fd.append("file", file);
                fd.append("novo_nome", novoNome);

                $scope.uploading = true;

                SliderService.uploadFile(fd).success(function (result) {
                    $scope.uploading = false;
                    if (result.indexOf("salvo_com_sucesso") !== -1) {
                        SliderService.insert({ 'slider': novoSlider, }).success(function (result) {
                            if (result.indexOf('cadastrado_com_sucesso') !== -1) {
                                $scope.listarSlider();
                                $scope.showForm = false;

                                swal("Pronto!", "Slider salvo com sucesso", "success");
                            } else if (result.indexOf('nao_cadastrou') !== -1) {
                                swal("Ops", "Usuario não cadastrado", "warning");
                            } else {
                                swal("Ops", "Ocorreu um erro, tente novamente mais tarde", "error");
                            }
                        })
                    } else {
                        swal("Ops!", "Não foi possivel realizar esta ação!", "error");
                    }
                })
            }
        }

        function geraNome() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 10; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }

        $scope.listaSlider = [];
        $scope.listarSlider = function () {
            SliderService.selecionaSlider().success(function (result) {
                $scope.listaSlider = result;
            })
        }
        $scope.listarSlider();

        $scope.deletaSlider = function (slider) {
            swal({
                title: "",
                text: "Tem certeza que deseja excluir esta imagem?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#FF4436",
                confirmButtonText: "Sim!",
                closeOnConfirm: false
            },
                function (isConfirm) {
                    if (isConfirm) {
                        SliderService.delete({ 'id_slider': slider.id_slider }).success(function (result) {
                            resultJson = angular.toJson(result);
                            if (resultJson.indexOf("excluido_com_sucesso") !== -1) {
                                $scope.listarSlider();
                                swal('', 'Excluido com sucesso.', 'success');
                            } else if (resultJson.indexOf("nao_excluiu") !== -1) {
                                swal('Ops!', 'Não foi possível excluir.', 'warning');
                            } else {
                                swal('Ops!', 'Ocorreu algum erro, tente novamente.', 'error');
                            }
                        })
                    }
                })
        }

        $scope.exibirEditar = function (lista) {
            $scope.novoSlider = angular.copy(lista);
            $scope.novoSlider.editando = true;
            $scope.showForm = true;
        }

        $scope.editarSlider = function (slider) {
            SliderService.update({ 'slider': slider }).success(function (result) {
                resultJson = angular.toJson(result);
                if (resultJson.indexOf("alterado_com_sucesso") !== -1) {
                    swal('', 'Slider alterado com sucesso', 'success');
                    $scope.listarSlider();
                    $scope.showForm = false;
                } else if (resultJson.indexOf("nao_alterou") !== -1) {
                    swal('Ops', 'Não foi possível alterar', 'warning');
                } else {
                    swal('Ops', 'Ocorreu um erro, tente novamente', 'error');
                }
            });
        }
    });