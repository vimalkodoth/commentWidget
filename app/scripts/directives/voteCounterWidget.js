(function(){
'use strict';
var voteCounterWidget = function($parse, $rootScope, $timeout) {
	return {
		restrict: 'E',
		templateUrl:"views/voteCounter.html",
		scope: true,
		transclude:false,
		controller:function($scope){
			$scope.count = 0;
			$scope.status = 'none';

			$scope.like = function(){
				if($scope.status === 'none'){
					$scope.count++;
				} else if($scope.status === 'unlike'){
					$scope.count += 2;
				}
				$scope.status = 'like';
			},
			$scope.unlike = function(){
				if($scope.status === 'none'){
					$scope.count--;
				} else if($scope.status === 'like'){
					$scope.count -= 2;
				}
				$scope.status = 'unlike';
			}
		},
		link: function(scope,ele, attrs){
			console.log('Link function of vote Counter Widget');


		}
	}
}
module.exports = voteCounterWidget;
})();