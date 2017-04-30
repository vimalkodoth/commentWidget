'use strict';

var WelcomeCtrl = function($scope) {
  $scope.openCommentWidget = function(post_id){
  	console.log('broadcasting');
  	$scope.$broadcast('OPEN_COMMENT_WIDGET', {post_id:post_id});
  }
};

module.exports = WelcomeCtrl;
