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
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//

;
