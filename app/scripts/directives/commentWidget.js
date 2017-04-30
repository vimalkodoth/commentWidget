(function(){
'use strict';
var commentWidget = function($parse, $rootScope, $timeout) {
	return {
		restrict: 'E',
		templateUrl:"views/comment.html",
		scope: true,
		transclude:false,
		controller:function($scope){
			$scope.commentContent = "";
			$scope.header = "Add Comment";
			$scope.nameHeader = "Your name";
			$scope.commentHeader="Your comment";
			$scope.commentLengthLimit = 500;
			$scope.limitReached = function(){
				return $scope.commentContent.length >= $scope.commentLengthLimit;
			};
			$scope.save = function(){
				angular.element(document.querySelector('#'+$scope.post_id)).append('<div><div>'+$scope.commentName+'</div><div>'+$scope.commentContent+'</div></div>');
				$scope.commentWidgetIsActive = false;
			};

		},
		link: function(scope,ele, attrs){
			scope.post_id = attrs['id'];
			console.log('commentWidget in Link');
			scope.$on('OPEN_COMMENT_WIDGET', function(evt, args){
				if(args.post_id === scope.post_id){
					scope.commentWidgetIsActive = true;
				}
			});

		}
	}

}
module.exports = commentWidget;
})();