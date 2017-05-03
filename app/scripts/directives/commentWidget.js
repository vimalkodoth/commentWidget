(function(){
'use strict';
var commentWidget = function($parse, $rootScope, $timeout, $compile) {
	return {
		restrict: 'E',
		templateUrl:"views/comment.html",
		scope: true,
		transclude:false,
		controller:function($scope){
			$scope.commentContent = "";
			$scope.deleteText = "delete";
			$scope.editText = "edit";
			$scope.header = "Add Comment";
			$scope.nameHeader = "Your name";
			$scope.commentHeader="Your comment";
			$scope.commentLengthLimit = 500;
			$scope.comments = [];
			$scope.limitReached = function(){
				return $scope.commentContent.length >= $scope.commentLengthLimit;
			};
			$scope.delete = function(index){
				$scope.comments.splice(index, 1);
			}
			$scope.save = function(index){
				if(angular.isDefined(index)){
					$scope.comments[index] = {commentName : $scope.commentName, commentContent : $scope.commentContent};
				} else {
					$scope.comments.push({commentName : $scope.commentName, commentContent : $scope.commentContent});
				}
				$scope.commentWidgetIsActive = false;
			};
			$scope.edit = function(index){
				$scope.index = index;
				$scope.commentName = $scope.comments[index]['commentName'];
				$scope.commentContent = $scope.comments[index]['commentContent'];
				$scope.commentWidgetIsActive = true;
			}

		},
		link: function(scope,ele, attrs){
			scope.post_id = attrs['id'];
			var commentTemplate = '<div class="comments"><div ng-repeat="comment in comments" class="comment-{{$index}}"><div class="name"> {{comment.commentName }} </div><div class="content"> {{ comment.commentContent }} </div><div class="delete" ng-click="delete($index)">{{ deleteText }}</div><div class="edit" ng-click="edit($index)"> {{ editText }} </div></div></div>';
			var content = $compile(commentTemplate)(scope);
			angular.element(document.querySelector('#'+scope.post_id)).append(content);

			scope.$on('OPEN_COMMENT_WIDGET', function(evt, args){
				if(args.post_id === scope.post_id){
					$scope.index = undefined;
					scope.commentWidgetIsActive = true;
				}
			});

		}
	}

}
module.exports = commentWidget;
})();