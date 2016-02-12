angular.module('Hawks', ['ui.router']);
angular.module('Hawks').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            templateUrl: 'main.html'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            // we'll get to this in a bit       
        });
        
}]);

angular.module('Hawks').controller('MainCtrl', ['$scope','MainSrv',function($scope, MainSrv) {
	$scope.data = {};
	$scope.dataLoaded = false;

	MainSrv.getInitialData().then(function(data) {
		$scope.dataLoaded = true;
		$scope.data = data.data;
	});


}]);

angular.module('Hawks').service('MainSrv', ['$http', '$q', function($http, $q) {
	this.getInitialData = function() {
		var def = $q.defer();

		$http.get('/main/data', '').then(function(data) {
			def.resolve(data);
		}, function(err) {
			def.reject(err);
		});

		return def.promise;
	};
}]);
