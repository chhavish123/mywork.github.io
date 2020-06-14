myApp.controller('submitController', ['$scope', function($scope){


myApp.controller('submitController', ['$scope', 'multipartForm', function($scope, multipartForm){
	$scope.customer = {};
	$scope.Submit = function(){
		var uploadUrl = '/upload';
		multipartForm.post(uploadUrl, $scope.customer);
	}
}]); 
