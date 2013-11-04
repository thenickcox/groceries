'use strict';

angular
  .module('Grocerease', ['goinstant', 'ui.bootstrap'])
  .config(function(platformProvider) {
    platformProvider.set('https://goinstant.net/thenickcox/groceries');
  });

function ItemCtrl($scope, GoAngular) {

  $scope.items = [];

  var goAngular = new GoAngular($scope, 'ItemCtrl', { include: ['items'] });

  goAngular.initialize().then(
    function(){

      $scope.addItem = function() {
        $scope.items.push({text: $scope.itemText, bought:false});
        $scope.itemText = '';
      };

      $scope.clearAll = function(){
        $scope.items = [];
      };

      $scope.clearChecked = function(){
        var listPreChecked = $scope.items;
        $scope.items = [];
        angular.forEach(listPreChecked, function(item){
          if (!item.bought) $scope.items.push(item);
        });
      };

      $scope.remove = function(index){
        $scope.items.splice(index, 1);
      };

      $scope.totalRemaining = function(){
        var total = 0,
            remainingCount = 0,
            boughtCount = 0,
            pluralizeItem = '';

        angular.forEach($scope.items, function(item){
          total += 1;
          remainingCount += item.bought ? 0 : 1;
        });

        boughtCount = total - remainingCount;

        pluralizeItem = function(num){
          return num === 1 ? 'item' : 'items';
        };

        if (total === 0) {
          return "Let's go shopping!";
        }
        else if (total === boughtCount) {
          return 'Disco!';
        }

        return total + ' total ' + pluralizeItem(total) + ', ' +
               remainingCount + ' ' + pluralizeItem(remainingCount) + ' remaining';
      };


      $scope.totalItems = function(){
        var total = 0;
        angular.forEach($scope.items, function(){
          total += 1;
        });
        return total;
      };

      $scope.pluralizeRemaining = function(){
        return $scope.remainingItems() === 1 ? 'item' : 'items';
      };

      $scope.pluralizeItems = function(){
        return $scope.items.length === 1 ? 'item' : 'items';
      };

      $scope.remainingPercent = function(){
        var itemCount = 0;

        angular.forEach($scope.items, function(item){
          itemCount += item.bought ? 1 : 0;
        });

        return (itemCount / $scope.items.length) * 100;
      };

      $scope.remainingItems = function(){
        var remainingCount = 0;
        angular.forEach($scope.items, function(item){
          remainingCount += item.bought ? 0 : 1;
        });
        return remainingCount;
      };
    });
};
