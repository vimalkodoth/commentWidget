'use strict';

var angular = require('angular'); // That's right! We can just require angular as if we were in node

var WelcomeCtrl = require('./controllers/WelcomeCtrl'); // We can use our WelcomeCtrl.js as a module. Rainbows.
var commentWidget = require('./directives/commentWidget');
var voteCounterWidget = require('./directives/voteCounterWidget');

var app = angular.module('myApp', []);
app.controller('WelcomeCtrl', ['$scope', WelcomeCtrl]);
app.directive('commentWidget', commentWidget);
app.directive('voteCounterWidget', voteCounterWidget);
