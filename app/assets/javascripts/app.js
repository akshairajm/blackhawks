angular.module('Hawks', ['ui.router']);
angular.module('Hawks').run(['$templateCache', function($templateCache) {
  $templateCache.put('partial-home.html', ['<div ng-controller="MainCtrl">',
  		'<header class="hero"><h1> <figure class="clan-badge" data-level="{{data.clanLevel}}">',
  			'<img  src="{{data.badgeUrls.small}}" /></figure>',
  			' {{data.name}}</h1></header>',
  		'<section><ul>',
  			'<li ng-repeat="member in data.memberList">',
  			'<img src="{{member.league.iconUrls.tiny}}" />',
  			' {{member.name}} :-: {{member.role}} <> trophies: {{member.trophies}}</li>',
		'</ul></section>',
  		'</div>'].join(''));
}]);
angular.module('Hawks').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            templateUrl: 'partial-home.html'
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