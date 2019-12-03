'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
 angular.module('app')
 .controller('LeadCtrl', function ( $scope, LeadService) {

 	$scope.listLeads = [];

 	setTimeout(function() {	
 		atualizaLeads();
 	}, 10);

 	function atualizaLeads(){
 		LeadService.select().success(function(result){ 
 			$scope.listLeads = result; 		
 		});
 	}
 	
 });